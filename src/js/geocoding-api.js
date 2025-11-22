const url = "https://geocoding-api.open-meteo.com/v1/search";

export default async function getCordinates(locationName) {
    const response = await fetch(`${url}?name=${locationName}`);
    const data = await response.json();

    return data.results.map(result => ({
        name: result.name,
        country: result.country,
        admin: `${result.country}, ${result.admin1}`,
        latitude: result.latitude,
        longitude: result.longitude,
    }));
}
