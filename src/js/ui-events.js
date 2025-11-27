import { emit } from "./helpers";

const actions = {
    closeDropdown(_, e) {
        const openDropdown = document.querySelector(".dropdown.open");

        if (openDropdown && !openDropdown.contains(e.target))
            openDropdown.classList.remove("open");
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
    const target = e.target.closest("[data-action-click]");

    if (target) actions[target.dataset.actionClick](target, e);
});
