import { useState } from 'react';
import utilities from '../utils/utilities';
import config from '../config';

const convertConfigToCamelCase = (configObj) => {
    const camelCaseObj = {};
    for (const [key, value] of Object.entries(configObj)) {
        const camelKey = key.toLowerCase().replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
        camelCaseObj[camelKey] = value;
    }
    return camelCaseObj;
}

export default function useWeather() {
    const [weather, setWeather] = useState(() => {
        const weatherJson = localStorage.getItem('weather');
        if (weatherJson) {
            return utilities.jsonParseNumbers(weatherJson);
        }
        const defaults = convertConfigToCamelCase(config.DEFAULTS.WEATHER);
        localStorage.setItem('weather', JSON.stringify(defaults));
        return defaults;
    });

    const updateWeather = (weather) => {
        setWeather(weather);
        localStorage.setItem('weather', JSON.stringify(weather));
    };

    return { weather, updateWeather };
}
