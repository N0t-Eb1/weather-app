import { emit } from "./helpers";

const actions = {
    closeDropdown(_, e) {
        const openDropdowns = document.querySelectorAll(".dropdown.open");

        if (openDropdowns)
            openDropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target))
                    dropdown.classList.remove("open");
            });
    },

    toggleDropdown(target) {
        target.closest(".dropdown").classList.toggle("open");
    },

    changeUnits(target) {
        if (target.classList.contains("selected")) return;

        const unit = target.closest(".unit-category").dataset.unit;
        const value = target.dataset.option;

        emit("unit change", { [unit]: value });
    },

    switchPreset() {
        emit("preset switch");
    },
};

window.addEventListener("click", e => {
    let target = e.target.closest("[data-action-click]");

    while (target) {
        actions[target.dataset.actionClick](target, e);
        target = target.parentNode.closest("[data-action-click]");
    }
});
