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

export default function useTarget() {
    const [target, setTarget] = useState(() => {
        const targetJson = localStorage.getItem('target');
        if (targetJson) {
            return utilities.jsonParseNumbers(targetJson);
        }
        const defaults = { ...convertConfigToCamelCase(config.DEFAULTS.TARGET), sizeMils: null };
        localStorage.setItem('target', JSON.stringify(defaults));
        return defaults;
    });

    const updateTarget = (target) => {
        setTarget(target);
        localStorage.setItem('target', JSON.stringify(target));
    };

    return { target, updateTarget };
}
