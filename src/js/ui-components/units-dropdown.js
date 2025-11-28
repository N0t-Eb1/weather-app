import { listen, emit } from "../helpers";
import { addClickAction } from "../ui-action-handler";
import { getUnits, isMetric } from "../weather-units";

const unitCategories = document.querySelectorAll(".menu-units .unit-category");
const presetToSwitchBtn = document.querySelector(".meteric-switch");

function feedUnits(units) {
    unitCategories.forEach(category => {
        const unitName = category.dataset.unit;
        const options = category.querySelectorAll("button");

        options.forEach(option => {
            if (units[unitName] === option.dataset.option)
                option.classList.add("selected");
            else option.classList.remove("selected");
        });
    });
}
listen("units changed", feedUnits);

function updatePresetToSwitchText(isMetric) {
    presetToSwitchBtn.textContent = `Switch to ${isMetric ? "Imperial" : "Metric"}`;
}
listen("preset update", updatePresetToSwitchText);

addClickAction("change-units", unit => {
    if (unit.classList.contains("selected")) return;

    const unitName = unit.closest(".unit-category").dataset.unit;
    const value = unit.dataset.option;

    emit("unit change", { [unitName]: value });
});

addClickAction("switch-preset", () => {
    emit("preset switch");
});

feedUnits(getUnits());
updatePresetToSwitchText(isMetric());
