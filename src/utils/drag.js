// All functions are pure functions

import config from '../config';
import atmospherics from './atmospherics';
import conversions from './conversions';
import INGALS from './ingals.data';
import G7 from './g7.data';

const getTable = (dragModel) => {
    // Returns the drag table for the given drag model. Defaults to G1 (INGALS).
    return dragModel === 'G7' ? G7 : INGALS;
};

const drag = {
    clicksToReachMaximumPointblankRangeZero: (ballisticCoefficient, scopeHeightInches, scopeElevationClicksPerMOA, maximumOrdinate, muzzleVelocityFPS, muzzleAngleDegrees, dragModel = 'G1') => {
        // Calculates how many up or down clicks to adjust the scope to change from the current zero to the maximum point blank range zero.  Maximum point blank range is the maximum range at
        //     which the user can shoot, without holdover or scope adjustment, while not exceeding a pre-determined maximum ordinate (target radius).
        // Calculate the range you need to zero the rifle to obtain a maximum point blank range
        const maxPointBlankRangeZeroYards = drag.maximumPointBlankRangeZero(ballisticCoefficient, muzzleVelocityFPS, maximumOrdinate, dragModel);
        // Calculate the velocity (feet per second) of the bullet at the new zero
        const velocityAtMaxPointBlankRangeZero = drag.velocityFromRange(ballisticCoefficient, muzzleVelocityFPS, maxPointBlankRangeZeroYards, dragModel);
        // Calculate the time (seconds) of flight of the bullet at the new velocity
        const timeAtMaxPointBlankRangeZero = drag.time(ballisticCoefficient, muzzleVelocityFPS, velocityAtMaxPointBlankRangeZero, dragModel);
        // Calculate the drop (inches) of the bullet at the new time and velocity
        const dropAtMaxPointBlankRangeZero = drag.drop(muzzleVelocityFPS, velocityAtMaxPointBlankRangeZero, timeAtMaxPointBlankRangeZero);
        // Calculate the vertical position (inches) of the bullet at the given drop
        const verticalPositionAtMaxPointBlankRangeZero = (-scopeHeightInches / config.PHYSICS.INCHES_PER_FOOT) + ((dropAtMaxPointBlankRangeZero / config.PHYSICS.INCHES_PER_FOOT) + (maxPointBlankRangeZeroYards * config.PHYSICS.FEET_PER_YARD) * Math.tan(conversions.degreesToRadians(muzzleAngleDegrees))) * config.PHYSICS.INCHES_PER_FOOT;
        // Calculate the number of scope clicks needed to correct the above calculated vertical position making the new vertical position zero.
        return -(conversions.inchesToMinutesOfAngle(verticalPositionAtMaxPointBlankRangeZero, maxPointBlankRangeZeroYards) * scopeElevationClicksPerMOA);
    },
    crossWindDrift: (currentRangeYards, currentTimeSeconds, crossWindAngleDegrees, crossWindVelocityMph, muzzleAngleDegrees, muzzleVelocityFPS) => {
        // Calculates how far the bullet drifts (inches) due to wind.
        return (Math.sin(conversions.degreesToRadians(crossWindAngleDegrees)) * conversions.milesPerHourToInchesPerSecond(crossWindVelocityMph) / config.PHYSICS.INCHES_PER_FOOT * (currentTimeSeconds - (currentRangeYards * config.PHYSICS.FEET_PER_YARD) / (muzzleVelocityFPS * Math.cos(conversions.degreesToRadians(muzzleAngleDegrees))))) * config.PHYSICS.INCHES_PER_FOOT;
    },
    drop: (muzzleVelocityFPS, currentVelocityFPS, currentTimeSeconds) => {
        // Calculates how far the bullet falls (inches) due to gravity, if their were no angle at the muzzle.
        const index = Math.min(99, Math.max(0, Math.floor((currentVelocityFPS / muzzleVelocityFPS) * 100 + 0.5)));
        const falls = config.ATMOSPHERIC_TABLES.DROP_TABLE[index];
        return -(falls * Math.pow(currentTimeSeconds, 2));
    },
    energy: (bulletWeightGrains, currentVelocityFPS) => {
        // Calculates the kinetic energy (foot pounds) retained in the bullet.
        return bulletWeightGrains * Math.pow(currentVelocityFPS, 2) / (config.PHYSICS.GRAVITY_FPS * config.PHYSICS.BULLET_WEIGHT_GRAINS_PER_POUND * 2);
    },
    ingalsSpaceFromVelocity: (currentVelocity, dragModel = 'G1') => {
        // Returns the space value from the drag table at the given velocity.
        const table = getTable(dragModel);
        let counter = 0;
        while(table.v[counter] > currentVelocity) {
            counter++;
        }
        let spaceFromVelocity;
        if(table.v[counter] === currentVelocity) {
            spaceFromVelocity = table.s[counter];
        } else {
            // Interoperlate Array
            const differenceBetweenVelocityIndexes = table.v[counter - 1] - table.v[counter];
            const distanceFromVelocityIndex = currentVelocity - table.v[counter];
            const differenceBetweenSpaceIndexes = table.s[counter] - table.s[counter - 1];
            const percentage = distanceFromVelocityIndex / differenceBetweenVelocityIndexes;
            spaceFromVelocity = table.s[counter] - (differenceBetweenSpaceIndexes * percentage);
        }
        return spaceFromVelocity;
    },
    ingalsTimeFromVelocity: (currentVelocity, dragModel = 'G1') => {
        // Returns the Time value from the drag table at the given Velocity.
        const table = getTable(dragModel);
        let counter = 0;
        while(table.v[counter] > currentVelocity) {
            counter++;
        }
        let timeFromVelocity;
        if(table.v[counter] === currentVelocity) {
            timeFromVelocity = table.t[counter];
        } else {
            // Interoperlate Array
            const differenceBetweenVelocityIndexes = table.v[counter - 1] - table.v[counter];
            const distanceFromVelocityIndex = currentVelocity - table.v[counter];
            const differenceBetweenTimeIndexes = table.t[counter] - table.t[counter - 1];
            const percentage = distanceFromVelocityIndex / differenceBetweenVelocityIndexes;
            timeFromVelocity = table.t[counter] - (differenceBetweenTimeIndexes * percentage);
        }
        return timeFromVelocity;
    },
    ingalsVelocityFromSpace: (currentSpace, dragModel = 'G1') => {
        // Returns the Velocity value from the drag table at the given Space.
        const table = getTable(dragModel);
        let counter = 0;
        while(table.s[counter] < currentSpace) {
            counter++;
        }
        let velocityFromSpace;
        if(table.s[counter] === currentSpace) {
            velocityFromSpace = table.v[counter];
        } else {
            // Interoperlate Array
            const differenceBetweenSpaceIndexes = table.s[counter] - table.s[counter - 1];
            const distanceFromSpaceIndex = table.s[counter] - currentSpace;
            const differenceBetweenVelocityIndexes = table.v[counter - 1] - table.v[counter];
            const percentage = distanceFromSpaceIndex / differenceBetweenSpaceIndexes;
            velocityFromSpace = table.v[counter] + (differenceBetweenVelocityIndexes * percentage);
        }
        return velocityFromSpace;
    },
    ingalsVelocityFromTime: (currentTime, dragModel = 'G1') => {
        // Returns the Velocity value from the drag table at the given Time.
        const table = getTable(dragModel);
        let counter = 0;
        while(table.t[counter] < currentTime) {
            counter++;
        }
        let velocityFromTime;
        if(table.t[counter] === currentTime) {
            velocityFromTime = table.v[counter];
        } else {
            // Interoperlate Array
            const differenceBetweenTimeIndexes = table.t[counter] - table.t[counter - 1];
            const distanceFromTimeIndex = table.t[counter] - currentTime;
            const differenceBetweenVelocityIndexes = table.v[counter - 1] - table.v[counter];
            const percentage = distanceFromTimeIndex / differenceBetweenTimeIndexes;
            velocityFromTime = table.v[counter] + (differenceBetweenVelocityIndexes * percentage);
        }
        return velocityFromTime;
    },
    lead: (targetSpeedMph, currentTimeSeconds) => {
        // Calculates how far the user needs to lead (inches) a moving target.
        return conversions.milesPerHourToInchesPerSecond(targetSpeedMph) * currentTimeSeconds;
    },
    maximumPointBlankRange: (ballisticCoefficient, muzzleVelocityFPS, maximumOrdinate, dragModel = 'G1') => {
        // Calculate the maximum range at which the user can shoot, without holdover or scope adjustment, while not exceeding a pre-determined maximum ordinate (target radius).
        // Time (seconds)it takes to reach the range having a maximum ordinate supplied above
        const timeToMaximumOrdinate = 0.25 * Math.pow(maximumOrdinate / config.PHYSICS.FEET_PER_YARD, 0.5);
        // Velocity (feet per second) of the bullet at the above calculated time
        const velocityAtTimeToMaximumOrdinate = drag.velocityFromTime(ballisticCoefficient, muzzleVelocityFPS, timeToMaximumOrdinate, dragModel);
        // Drop (inches) of the bullet at the above given time and velocity***
        const dropAtMaximumPointBlankRangeZero = drag.drop(muzzleVelocityFPS, velocityAtTimeToMaximumOrdinate, timeToMaximumOrdinate);
        // The bullet may drop the radius of the target below zero at the true maximum point blank range
        const dropAtMaximumPointBlankRange = dropAtMaximumPointBlankRangeZero - maximumOrdinate;
        // Loop through dropping velocity until Drop = DropAtMaximumPointBlankRange to find the velocity at the true point blank range
        let velocityAtMaximumPointBlankRange = velocityAtTimeToMaximumOrdinate;
        while(drag.drop(muzzleVelocityFPS, velocityAtMaximumPointBlankRange, drag.time(ballisticCoefficient, muzzleVelocityFPS, velocityAtMaximumPointBlankRange, dragModel)) > dropAtMaximumPointBlankRange) {
            velocityAtMaximumPointBlankRange -= 0.1;
        }
        // Given the velocity at the point blank range, calculate the actual range
        return drag.range(ballisticCoefficient, muzzleVelocityFPS, velocityAtMaximumPointBlankRange, dragModel);
    },
    maximumPointBlankRangeZero: (ballisticCoefficient, muzzleVelocityFPS, maximumOrdinate, dragModel = 'G1') => {
        // Maximum Point Blank Range Zero (yards) is the range that the user should zero his/her rifle to obtain their maximum point blank range.
        // This range allows a user to shoot, without holdover or scope adjustment, while not exceeding a pre-determined maximum ordinate (target radius).
        // Time (seconds)it takes to reach the range having a maximum ordinate supplied above
        const timeToMaximumOrdinate = 0.25 * Math.pow(maximumOrdinate / config.PHYSICS.FEET_PER_YARD, 0.5);
        // Velocity (feet per second) of the bullet at the above calculated time
        const velocityAtTimeToMaximumOrdinate = drag.velocityFromTime(ballisticCoefficient, muzzleVelocityFPS, timeToMaximumOrdinate, dragModel);
        // Given the velocity at the point blank range zero, calculate the actual range to zero the rifle
        return drag.range(ballisticCoefficient, muzzleVelocityFPS, velocityAtTimeToMaximumOrdinate, dragModel);
    },
    modifiedBallisticCoefficient: (ballisticCoefficient, altitudeFeet, temperatureFahrenheit, barometricPressureInchesHg, relativeHumidityPercent) => {
        // Takes the bullets ballistic coefficient at standard atmospheric conditions (sea level), and converts it to a new ballistic coefficient at the current altitudeFeet and conditions.
        const altitudeAdjustmentFactor = atmospherics.altitudeAdjustmentFactor(altitudeFeet);
        const temperatureAdjustmentFactor = atmospherics.temperatureAdjustmentFactor(altitudeFeet, temperatureFahrenheit);
        const barometricPressureAdjustmentFactor = atmospherics.barometricPressureAdjustmentFactor(altitudeFeet, barometricPressureInchesHg);
        const relativeHumidityAdjustmentFactor = atmospherics.relativeHumidityAdjustmentFactor(temperatureFahrenheit, barometricPressureInchesHg, relativeHumidityPercent / 100);
        return ballisticCoefficient * (altitudeAdjustmentFactor * (1 + temperatureAdjustmentFactor - barometricPressureAdjustmentFactor) * relativeHumidityAdjustmentFactor);
    },
    muzzleAngleDegreesForZeroRange: (muzzleVelocityFPS, zeroRangeYards, scopeHeightInches, ballisticCoefficient, dragModel = 'G1') => {
        // Calculates the neccessary angle (degrees) of the muzzle to obtain the requested zero range.
        // This is done by looping through vertical position with different muzzle angles at the given range until a muzzle angle is found that produces a vertical position of 0.
        const velocityAtZeroRange = drag.velocityFromRange(ballisticCoefficient, muzzleVelocityFPS, zeroRangeYards, dragModel);
        const timeAtZeroRange = drag.time(ballisticCoefficient, muzzleVelocityFPS, velocityAtZeroRange, dragModel);
        const dropAtZeroRange = drag.drop(muzzleVelocityFPS, velocityAtZeroRange, timeAtZeroRange);
        let muzzleAngleDegreesForZeroRange = 0;
        while(drag.verticalPosition(scopeHeightInches, muzzleAngleDegreesForZeroRange, zeroRangeYards, dropAtZeroRange) < 0) {
            muzzleAngleDegreesForZeroRange += 0.00001;
        }
        return muzzleAngleDegreesForZeroRange;
    },
    optimalRiflingTwist: (bulletDiameterInches, bulletLengthInches) => {
        // Calculates the best rifling twist rate (inches per twist) to stabalize the length of bullet being used.
        return bulletDiameterInches * 150 / (bulletLengthInches / bulletDiameterInches);
    },
    range: (ballisticCoefficient, muzzleVelocityFPS, currentVelocityFPS, dragModel = 'G1') => {
        // Calculates the range (yards) of the bullet at a given velocity.
        return ballisticCoefficient * (drag.ingalsSpaceFromVelocity(currentVelocityFPS, dragModel) - drag.ingalsSpaceFromVelocity(muzzleVelocityFPS, dragModel)) / config.PHYSICS.FEET_PER_YARD;
    },
    rifleRecoilVelocity: (bulletWeightGrains, muzzleVelocityFPS, powderWeightGrains, rifleWeightPounds) => {
        // Calculates the amount of rearward velocity (feet per second) of the rifle upon firing.
        return (bulletWeightGrains * muzzleVelocityFPS + powderWeightGrains * config.PHYSICS.POWDER_VELOCITY_FPS) / (rifleWeightPounds * config.PHYSICS.BULLET_WEIGHT_GRAINS_PER_POUND);
    },
    rifleRecoilEnergy: (bulletWeightGrains, muzzleVelocityFPS, powderWeightGrains, rifleWeightPounds) => {
        // Calculates the amount of rearward force (foot pounds) of the rifle upon firing.
        return rifleWeightPounds * Math.pow(drag.rifleRecoilVelocity(bulletWeightGrains, muzzleVelocityFPS, powderWeightGrains, rifleWeightPounds), 2) / (config.PHYSICS.GRAVITY_FPS * 2);
    },
    sectionalDensity: (bulletWeightGrains, bulletDiameterInches) => {
        // Calculates the mass per given diameter of the bullet.  Used in determining form factor.
        return bulletWeightGrains / (config.PHYSICS.BULLET_WEIGHT_GRAINS_PER_POUND * Math.pow(bulletDiameterInches, 2));
    },
    time: (ballisticCoefficient, muzzleVelocityFPS, currentVelocityFPS, dragModel = 'G1') => {
        // Calculates the amount of time (seconds) it takes the bullet to slow from the initial velocity to a specific lower velocity.
        return ballisticCoefficient * (drag.ingalsTimeFromVelocity(currentVelocityFPS, dragModel) - drag.ingalsTimeFromVelocity(muzzleVelocityFPS, dragModel));
    },
    velocityFromRange: (ballisticCoefficient, muzzleVelocityFPS, currentRangeYards, dragModel = 'G1') => {
        // Calculates the velocity (feet per second) remaining in the bullet at a given range (yards).
        const currentSpace = drag.ingalsSpaceFromVelocity(muzzleVelocityFPS, dragModel) + ((currentRangeYards * config.PHYSICS.FEET_PER_YARD) / ballisticCoefficient);
        return drag.ingalsVelocityFromSpace(currentSpace, dragModel);
    },
    velocityFromTime: (ballisticCoefficient, muzzleVelocityFPS, currentTimeSeconds, dragModel = 'G1') => {
        // Calculates the velocity (feet per second) remaining in the bullet at a given time (seconds).
        return drag.ingalsVelocityFromTime(currentTimeSeconds / ballisticCoefficient + drag.ingalsTimeFromVelocity(muzzleVelocityFPS, dragModel), dragModel);
    },
    verticalPosition: (scopeHeightInches, muzzleAngleDegrees, currentRangeYards, currentDropInches) => {
        // Calculates how far the bullet falls (inches) due to gravity, taking into account the angle of the muzzle.
        return (currentDropInches+(currentRangeYards*config.PHYSICS.INCHES_PER_YARD)*Math.tan(conversions.degreesToRadians(muzzleAngleDegrees)))-scopeHeightInches;
    },
    spinDrift: (timeSeconds, muzzleVelocityFPS, riflingTwistInches, ballisticCoefficient) => {
        // Calculates the lateral drift (inches) caused by the gyroscopic spin of the bullet.
        const rpm = (muzzleVelocityFPS / riflingTwistInches) * 60;
        return (timeSeconds * timeSeconds) * (rpm / 1000) * (1 / ballisticCoefficient) * 0.00012;
    },
    coriolisDrift: (latitudeDegrees, timeSeconds, currentVelocityFPS, muzzleAngleDegrees) => {
        // Calculates the lateral drift (inches) caused by the Earth's rotation (Coriolis effect).
        const omega = 0.000072921159;
        const latitudeRadians = conversions.degreesToRadians(latitudeDegrees);
        const coriolisDriftFeet = 2 * omega * currentVelocityFPS * timeSeconds * Math.sin(latitudeRadians);
        return coriolisDriftFeet * config.PHYSICS.INCHES_PER_FOOT;
    }
}

export default drag;
