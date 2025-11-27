import { listen } from "../helpers";
import { getUnits, getPresetToSwitch } from "../weather-units";

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
feedUnits(getUnits());

function updatePresetToSwitchText(preset) {
    presetToSwitchBtn.textContent = `Switch to ${preset}`;
}
listen("preset update", updatePresetToSwitchText);
updatePresetToSwitchText(getPresetToSwitch());
