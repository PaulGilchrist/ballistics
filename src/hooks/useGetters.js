import config from '../config';

const convertConfigToCamelCase = (configObj) => {
    const camelCaseObj = {};
    for (const [key, value] of Object.entries(configObj)) {
        const camelKey = key.toLowerCase().replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
        camelCaseObj[camelKey] = value;
    }
    return camelCaseObj;
}

const getFirearm = (firearms, firearmId) => {
    // Get firearm from firearms array using firearmId
    let firearm = null;
    if (firearmId != null) {
        if (firearmId === 'Add') {
            firearm = {
                id: 'Add',
                name: '',
                rounds: [],
                ...convertConfigToCamelCase(config.DEFAULTS.FIREARM)
            }
        } else {
            firearm = firearms.find((f) => f.id === firearmId);
        }
    }
    return firearm;
}

const getRound = (firearm, roundId) => {
    // Get round from firearm.rounds array using roundId
    let round = null;
    if (firearm != null && roundId != null) {
        if (roundId === 'Add') {
            round = {
                id: 'Add',
                name: '',
                bulletDiameterInches: null,
                bulletWeightGrains: null,
                muzzleVelocityFPS: null,
                dragModel: 'G1'
            }
        } else if (firearm.rounds && firearm.rounds.length > 0) {
            round = firearm.rounds.find((r) => r.id === roundId);
        }
    }
    return round;
}

export default function useGetters() {
    return { getFirearm, getRound };
}
