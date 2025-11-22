const defaultUnits = {
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    precipitation_unit: "mm",
};

const units = (() => {
    const savedUnits = localStorage.getItem("units");
    if (savedUnits) return JSON.parse(savedUnits);

    localStorage.setItem("units", JSON.stringify(defaultUnits));
    return defaultUnits;
})();

export function changeUnits(unit, value) {
    units[unit] = value;
    localStorage.setItem("units", JSON.stringify(units));
}

export function getUnitsParams() {
    return structuredClone(units);
}
