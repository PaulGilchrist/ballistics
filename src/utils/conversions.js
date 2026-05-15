import config from '../config';

const conversions = {
    degreesToRadians: (degrees) => {
        // Converts from a degree to a radian angle.
        return degrees * config.CONVERSIONS.PI / 180;
    },
    inchesToIPHY: (inches, currentRange) => {
        // Converts from inches to inches per 100 yards
        return (inches * 100 / currentRange);
    },
    inchesToMil: (inches, currentRange) => {
        // Converts from inches to milliradians.
        return (inches * 100 / config.CONVERSIONS.MIL_INCHES_AT_100_YARDS / currentRange);
    },
    inchesToMinutesOfAngle: (inches, currentRange) => {
        // Converts from inches to minutes of angle (MoA).
        return (inches * 100 / config.CONVERSIONS.MOA_INCHES_AT_100_YARDS / currentRange);
    },
    isEven: (input) => {
        // Returns true if the inputed integer is an even number.
        if (input / 2 * 2 === input) {
            return true;
        } else {
            return false;
        }
    },
    metersToYards: (meters) => {
        return (meters * config.CONVERSIONS.YARDS_PER_METER);
    },
    milesPerHourToInchesPerSecond: (inputVelocityMph) => {
        // Converts from a miles per hour (MPH) to inches per second.
        return inputVelocityMph * config.CONVERSIONS.MPH_TO_INCHES_PER_SECOND;
    },
    radiansToDegrees: (radians) => {
        // Converts from a radian ro a degree angle.
        return radians * 180 / config.CONVERSIONS.PI;
    },
    sec: (angle) => {
        // Secant
        return 1 / Math.cos(angle);
    },
    sizeToDistance: (actualTargetSizeInches, reticleViewedTargetSizeMils) => {
        return Math.round((actualTargetSizeInches / config.PHYSICS.INCHES_PER_YARD) * 1000 / reticleViewedTargetSizeMils);
    },
    yardsToMeters: (yards) => {
        return (yards * config.CONVERSIONS.METERS_PER_YARD);
    }
};

export default conversions;
