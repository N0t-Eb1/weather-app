import { emit, listen } from "./helpers";
import unitPresets from "../data/units.json";

const units =
    JSON.parse(localStorage.getItem("units")) ||
    structuredClone(unitPresets.metric);

function changeUnits(newValues) {
    for (const unit in newValues) units[unit] = newValues[unit];

    localStorage.setItem("units", JSON.stringify(units));
    emit("units changed", getUnits());
    emit("preset update", isMetric());
}
listen("unit change", changeUnits);

function switchPresets() {
    changeUnits(isMetric() ? unitPresets.imperial : unitPresets.metric);
}
listen("preset switch", switchPresets);

export const getUnits = () => structuredClone(units);

const metricPresetString = JSON.stringify(unitPresets.metric);
export const isMetric = () => JSON.stringify(units) === metricPresetString;
