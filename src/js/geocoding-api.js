const url = "https://geocoding-api.open-meteo.com/v1/search";

export async function getCordinates(locationName, signal) {
    const response = await fetch(`${url}?name=${locationName}`, { signal });
    const data = await response.json();

    if (!data.results) return "";

    return data.results.map(result => ({
        name: result.name,
        country: result.country,
        admin: result.admin1,
        latitude: result.latitude,
        longitude: result.longitude,
    }));
}
