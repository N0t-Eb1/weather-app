import { getUnitsParams } from "./weather-units";

const url = "https://api.open-meteo.com/v1/forecast";

const params = {
    timezone: "auto",
    current: [
        "temperature_2m",
        "apparent_temperature",
        "relative_humidity_2m",
        "wind_speed_10m",
        "precipitation",
        "weather_code",
    ],
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
    hourly: ["temperature_2m", "weather_code"],
};

export default async function getWeather(location) {
    const fetchUrl = new URL(url);

    fetchUrl.search = new URLSearchParams({
        latitude: location.latitude,
        longitude: location.longitude,
        ...params,
        ...getUnitsParams(),
    });

    const response = await fetch(fetchUrl);
    const data = await response.json();

    return {
        location: `${location.name}, ${location.country}`,
        date: getFormattedDate(data.current.time),
        current: getFormattedCurrent(data.current),
        daily: getFormattedDaily(data.daily),
        hourly: getFormattedHourly(data.hourly, data.current.time),
    };
}

function getFormattedDate(timestamp) {
    return new Date(timestamp).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function getFormattedCurrent(current) {
    return {
        temperature: current.temperature_2m,
        appearentTemp: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        wind: current.wind_speed_10m,
        precipitation: current.precipitation,
        weatherCode: current.weather_code,
    };
}

function getFormattedDaily(daily) {
    const formattedDaily = [];

    const dateFormat = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
    });

    for (let i = 0; i < daily.time.length; i++) {
        const day = {
            weekday: dateFormat.format(new Date(`${daily.time[i]}T00:00`)),
            minTemp: daily.temperature_2m_min[i],
            maxTemp: daily.temperature_2m_max[i],
            weatherCode: daily.weather_code[i],
        };

        formattedDaily.push(day);
    }

    return formattedDaily;
}

function getFormattedHourly(hourly, currentTime) {
    const weekdays = {};
    const todaysTime = new Date(currentTime);

    const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
    });
    const hourFormatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
    });

    for (let i = 0; i < hourly.time.length; i++) {
        const time = new Date(hourly.time[i]);

        if (time < todaysTime) continue;

        const weatherDetails = {
            hour: hourFormatter.format(time),
            temp: hourly.temperature_2m[i],
            weatherCode: hourly.weather_code[i],
        };

        const weekday = weekdayFormatter.format(time);
        if (weekday in weekdays) weekdays[weekday].push(weatherDetails);
        else weekdays[weekday] = [weatherDetails];
    }

    return weekdays;
}
