// All functions are pure functions

import config from '../config';

const atmospherics = {
    interpolateArray: (array, arrayIndex) => {
        // Takes the nearest 2 numbers in a lookup table and returns a number between them.
        const maxIndex = array.length;
        const minIndex = 0;
        let result = 0;
        if (arrayIndex <= minIndex) {
            result = array[minIndex];
        } else if (arrayIndex >= maxIndex) {
            result = array[maxIndex];
        } else {
            const integerPartOfArrayIndex = Math.floor(arrayIndex);
            const decimalPartOfArrayIndex = arrayIndex - integerPartOfArrayIndex;
            const rangeSpread = array[integerPartOfArrayIndex + 1] - array[integerPartOfArrayIndex];
            result = array[integerPartOfArrayIndex] + (rangeSpread * decimalPartOfArrayIndex);
        }
        return result;
    },
    altitudeAdjustmentFactor: (altitude) => {
        // Adjusts from the standard altitude (sea level) to the current altitude.
        return atmospherics.interpolateArray(config.ATMOSPHERIC_TABLES.ALTITUDE_ADJUSTMENT_FACTOR_TABLE, altitude / 1000);
    },
    barometricPressureAdjustmentFactor: (altitude, barometricPressure) => {
        // Compares the barometric pressure (inches Hg) at a given altitude (feet) to the standard barometric pressure at that altitude.
        const standardBarometricPressure = atmospherics.interpolateArray(config.ATMOSPHERIC_TABLES.BAROMETRIC_PRESSURE_TABLE, altitude / 1000);
        return (barometricPressure - standardBarometricPressure) / standardBarometricPressure;
    },
    relativeHumidityAdjustmentFactor: (temperature, barometricPressure, relativeHumidity) => {
        // Compares the relative humidity (percentage) at a given altitude (feet) to the standard relative humidity at that altitude.
        const standardVaporPressureOfWater = atmospherics.interpolateArray(config.ATMOSPHERIC_TABLES.VAPOR_PRESSURE_OF_WATER_TABLE, temperature / 2);
        return 0.995 * (barometricPressure / (barometricPressure - 0.3783 * relativeHumidity * standardVaporPressureOfWater));
    },
    speedOfSound: (altitude) => {
        // Speed of sound (feet per second) at a given altitude (feet).
        return atmospherics.speedOfSoundFactor(altitude) * config.PHYSICS.SPEED_OF_SOUND_AT_SEA_LEVEL;
    },
    speedOfSoundFactor: (altitude) => {
        // The speed of sound factor compares the speed of sound (feet per second) at a given altitude (feet) to the standard speed of sound at sea level.
        return 1 - 0.00001126666 * altitude - 0.00000000006753074 * Math.pow(altitude, 2);
    },
    standardRelativeHumidity: (altitude) => {
        // Compares the relative humidity (percentage) at a given altitude (feet) to the standard relative humidity at that altitude.
        const standardTemperature = atmospherics.interpolateArray(config.ATMOSPHERIC_TABLES.TEMPERATURE_TABLE, altitude / 1000);
        const standardVaporPressureOfWater = atmospherics.interpolateArray(config.ATMOSPHERIC_TABLES.VAPOR_PRESSURE_OF_WATER_TABLE, standardTemperature / 2);
        const standardBarometricPressure = atmospherics.interpolateArray(config.ATMOSPHERIC_TABLES.BAROMETRIC_PRESSURE_TABLE, altitude / 1000);
        return (standardBarometricPressure - (0.995 * standardBarometricPressure)) / (0.3783 * standardVaporPressureOfWater);
    },
    temperatureAdjustmentFactor: (altitude, temperature) => {
        // Compares the temperature (degrees F) at a given altitude (feet) to the standard temperature at that altitude.
        const standardTemperature = atmospherics.interpolateArray(config.ATMOSPHERIC_TABLES.TEMPERATURE_TABLE, altitude / 1000);
        return (temperature - standardTemperature) / (config.PHYSICS.ABSOLUTE_ZERO_FAHRENHEIT + standardTemperature);
    },
    weightDensityOfAir: (altitude) => {
        // Barometric pressure (inches Hg) at a given altitude (feet)
        return config.PHYSICS.WEIGHT_DENSITY_OF_AIR_AT_SEA_LEVEL * Math.exp(-0.0000302149 * altitude);
    }
}

export default atmospherics;
