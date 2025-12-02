import { addClickAction } from "../ui-action-handler";
import { getCordinates } from "../geocoding-api";

const savedSearchResults = new Map();

let currentController;
let searchInProgress;

function handleInput(string) {
    clearTimeout(searchInProgress);
    if (currentController) currentController.abort();
    if (string.length < 2) {
        renderResults(notEnoughLetters_comp());
        return;
    }

    if (savedSearchResults.has(string)) {
        const data = savedSearchResults.get(string);
        renderResults(results_comp(data));
    } else {
        searchInProgress = setTimeout(async () => {
            if (!isSpinning()) renderResults(await searching_comp());

            currentController = new AbortController();

            try {
                const data = await getCordinates(
                    string,
                    currentController.signal,
                );

                casheResult(string, data);
                renderResults(results_comp(data));
            } catch {
                /* empty */
            } finally {
                currentController = null;
            }
        }, 333);
    }
}

function renderResults(element) {
    const resultsContainer = document.querySelector(".search-results");
    resultsContainer.replaceChildren(element);
}

function casheResult(string, data) {
    savedSearchResults.set(string, data);
}

function notEnoughLetters_comp() {
    const container = document.createElement("div");
    container.innerHTML = `
        <div class="results-list">
            <div class="general-result">
                Please enter at least 2 characters
            </div>
        </div>
    `;

    return container.firstElementChild;
}

async function searching_comp() {
    const container = document.createElement("div");
    container.innerHTML = `
        <div class="results-list" data-is-spinning>
            <div class="general-result">
                <img
                    src=""
                    alt="loading spinner"
                />
                <span>Search in progress</span>
            </div>
        </div>
    `;

    const img = container.querySelector("img");
    const spinnerImg = await import("../../assets/icon-loading.svg");

    img.src = spinnerImg.default;

    return container.firstElementChild;
}

function results_comp(data) {
    const container = document.createElement("div");
    if (!data)
        container.innerHTML = `
        <div class="results-list">
            <div class="general-result">
                No results found
            </div>
        </div>
    `;
    else
        container.innerHTML = `
        <div class="results-list">
            ${data
                .map(
                    (location, i) => `
                    <button class="location-item" data-index="${i}">
                        <span class="location-item__name">${location.name}</span>
                        <span class="location-item__admin"
                            >${location.country}, ${location.admin}</span
                        >
                    </button>
                `,
                )
                .join("")}
        </div>
    `;

    return container.firstElementChild;
}

function isSpinning() {
    return document.querySelector(".search-results [data-is-spinning]");
}

addClickAction("search-focus", (searchBox, e) => {
    if (!e.target.closest(".search-results"))
        searchBox.querySelector("input").focus();
});

window.addEventListener("click", e => {
    const searchResults = document.querySelector(".search-results");

    if (e.target.closest(".search-input"))
        searchResults.classList.add("visible");
    else searchResults.classList.remove("visible");
});

window.addEventListener("input", e => {
    handleInput(e.target.value);
});
