import { emit, listen } from "./helpers";
import unitPresets from "../data/units.json";

const units = JSON.parse(localStorage.getItem("units")) || unitPresets.metric;
let presetToSwitch = localStorage.getItem("presetToSwitch") || "Imperial";

function changeUnits(newValues) {
    for (const unit in newValues) units[unit] = newValues[unit];

    localStorage.setItem("units", JSON.stringify(units));
    updatePresetToSwitch();
    emit("units changed", getUnits());
}
listen("unit change", changeUnits);

function updatePresetToSwitch() {
    const unitsString = JSON.stringify(units);

    if (unitsString === JSON.stringify(unitPresets.metric))
        presetToSwitch = "Imperial";
    else if (unitsString === JSON.stringify(unitPresets.imperial))
        presetToSwitch = "Metric";

    localStorage.setItem("presetToSwitch", presetToSwitch);
    emit("preset update", presetToSwitch);
}

function switchPreset() {
    changeUnits(
        presetToSwitch === "Imperial"
            ? unitPresets.imperial
            : unitPresets.metric,
    );
}
listen("preset switch", switchPreset);

export const getUnits = () => structuredClone(units);
export const getPresetToSwitch = () => presetToSwitch;
