import { Injectable } from '@angular/core';

import { AtmosphericService } from './atmospheric.service';
import { ConversionService } from './conversion.service';

import { INGALS } from '../data/ingals.data'

@Injectable()
export class DragService {

	gravity = 32.176;     // Feet Per Second Per Second

	constructor(public atmosphericService: AtmosphericService, public conversionService: ConversionService) {}

	clicksToReachMaximumPointBlankRangeZero(ballisticCoefficient: number, scopeHeightInches: number, scopeElevationClicksPerMOA: number, maximumOrdinate: number, muzzleVelocityFPS: number, muzzleAngleDegrees: number) {
		// Calculates how many up or down clicks to adjust the scope to change from the current zero to the maximum point blank range zero.  Maximum point blank range is the maximum range at
		//     which the user can shoot, without holdover or scope adjustment, while not exceeding a pre-determined maximum ordinate (target radius).
		// Calculate the range you need to zero the rifle to obtain a maximum point blank range
		let maxPointBlankRangeZeroYards = this.maximumPointBlankRangeZero(ballisticCoefficient, muzzleVelocityFPS, maximumOrdinate);
		// Calculate the velocity (feet per second) of the bullet at the new zero
		let velocityAtMaxPointBlankRangeZero = this.velocityFromRange(ballisticCoefficient, muzzleVelocityFPS, maxPointBlankRangeZeroYards);
		// Calculate the time (seconds) of flight of the bullet at the new velocity
		let timeAtMaxPointBlankRangeZero = this.time(ballisticCoefficient, muzzleVelocityFPS, velocityAtMaxPointBlankRangeZero);
		// Calculate the drop (inches) of the bullet at the new time and velocity
		let dropAtMaxPointBlankRangeZero = this.drop(muzzleVelocityFPS, velocityAtMaxPointBlankRangeZero, timeAtMaxPointBlankRangeZero);
		// Calculate the vertical position (inches) of the bullet at the given drop
		let verticalPositionAtMaxPointBlankRangeZero = (-scopeHeightInches / 12) + ((dropAtMaxPointBlankRangeZero / 12) + (maxPointBlankRangeZeroYards * 3) * Math.tan(this.conversionService.degreesToRadians(muzzleAngleDegrees))) * 12;
		// Calculate the number of scope clicks needed to correct the above calculated vertical position making the new vertical position zero.
		return -(this.conversionService.inchesToMinutesOfAngle(verticalPositionAtMaxPointBlankRangeZero, maxPointBlankRangeZeroYards) * scopeElevationClicksPerMOA);
	}

	crossWindDrift(currentRangeYards: number, currentTimeSeconds: number, crossWindAngleDegrees: number, crossWindVelocityMPH: number, muzzleAngleDegrees: number, muzzleVelocityFPS: number) {
		// Calculates how far the bullet drifts (inches) due to wind.
		return (Math.sin(this.conversionService.degreesToRadians(crossWindAngleDegrees)) * this.conversionService.milesPerHourToInchesPerSecond(crossWindVelocityMPH) / 12 * (currentTimeSeconds - (currentRangeYards * 3) / (muzzleVelocityFPS * Math.cos(this.conversionService.degreesToRadians(muzzleAngleDegrees))))) * 12;
	}

	drop(muzzleVelocityFPS: number, currentVelocityFPS: number, currentTimeSeconds: number) {
		// Calculates how far the bullet falls (inches) due to gravity, if their were no angle at the muzzle.
		let falls = this.atmosphericService.dropTable[Math.floor((currentVelocityFPS / muzzleVelocityFPS) * 100 + 0.5)];
		return -(falls * Math.pow(currentTimeSeconds, 2));
	}

	energy(bulletWeightGrains: number, currentVelocityFPS: number) {
		// Calculates the kinetic energy (foot pounds) retained in the bullet.
		return bulletWeightGrains * Math.pow(currentVelocityFPS, 2) / (this.gravity * 7000 * 2);
	}

	ingalsSpaceFromVelocity(currentVelocity: number) {
		// Returns the space value from the Ingals table at the given velocity.
		let counter = 0;
		while(INGALS.v[counter] > currentVelocity) {
			counter++;
		}
		let spaceFromVelocity;
		if(INGALS.v[counter] === currentVelocity) {
			spaceFromVelocity = INGALS.s[counter];
		} else {
			// Interoperlate Array
			let differenceBetweenVelocityIndexes = INGALS.v[counter - 1] - INGALS.v[counter];
			let distanceFromVelocityIndex = currentVelocity - INGALS.v[counter];
			let differenceBetweenSpaceIndexes = INGALS.s[counter] - INGALS.s[counter - 1];
			let percentage = distanceFromVelocityIndex / differenceBetweenVelocityIndexes;
			spaceFromVelocity = INGALS.s[counter] - (differenceBetweenSpaceIndexes * percentage);
		}
		return spaceFromVelocity;
	}

	ingalsTimeFromVelocity(currentVelocity: number) {
		// Returns the Time value from the Ingals table at the given Velocity.
		let counter = 0;
		while(INGALS.v[counter] > currentVelocity) {
			counter++;
		}
		let timeFromVelocity;
		if(INGALS.v[counter] === currentVelocity) {
			timeFromVelocity = INGALS.t[counter];
		} else {
			// Interoperlate Array
			let differenceBetweenVelocityIndexes = INGALS.v[counter - 1] - INGALS.v[counter];
			let distanceFromVelocityIndex = currentVelocity - INGALS.v[counter];
			let differenceBetweenTimeIndexes = INGALS.t[counter] - INGALS.t[counter - 1];
			let percentage = distanceFromVelocityIndex / differenceBetweenVelocityIndexes;
			timeFromVelocity = INGALS.t[counter] - (differenceBetweenTimeIndexes * percentage);
		}
		return timeFromVelocity;
	}

	ingalsVelocityFromSpace(currentSpace: number) {
		// Returns the Velocity value from the Ingals table at the given Space.
		let counter = 0;
		while(INGALS.s[counter] < currentSpace) {
			counter++;
		}
		let velocityFromSpace;
		if(INGALS.s[counter] === currentSpace) {
			velocityFromSpace = INGALS.v[counter];
		} else {
			// Interoperlate Array
			let differenceBetweenSpaceIndexes = INGALS.s[counter] - INGALS.s[counter - 1];
			let distanceFromSpaceIndex = INGALS.s[counter] - currentSpace;
			let differenceBetweenVelocityIndexes = INGALS.v[counter - 1] - INGALS.v[counter];
			let percentage = distanceFromSpaceIndex / differenceBetweenSpaceIndexes;
			velocityFromSpace = INGALS.v[counter] + (differenceBetweenVelocityIndexes * percentage);
		}
		return velocityFromSpace;
	}

	ingalsVelocityFromTime(currentTime: number) {
		// Returns the Velocity value from the Ingals table at the given Time.
		let counter = 0;
		while(INGALS.t[counter] < currentTime) {
			counter++;
		}
		let velocityFromTime;
		if(INGALS.t[counter] === currentTime) {
			velocityFromTime = INGALS.v[counter];
		} else {
			// Interoperlate Array
			let differenceBetweenTimeIndexes = INGALS.t[counter] - INGALS.t[counter - 1];
			let distanceFromTimeIndex = INGALS.t[counter] - currentTime;
			let differenceBetweenVelocityIndexes = INGALS.v[counter - 1] - INGALS.v[counter];
			let percentage = distanceFromTimeIndex / differenceBetweenTimeIndexes;
			velocityFromTime = INGALS.v[counter] + (differenceBetweenVelocityIndexes * percentage);
		}
		return velocityFromTime;
	}

	lead(targetSpeedMPH: number, currentTimeSeconds: number) {
		// Calculates how far the user needs to lead (inches) a moving target.
		return this.conversionService.milesPerHourToInchesPerSecond(targetSpeedMPH) * currentTimeSeconds;
	}

	maximumPointBlankRange(ballisticCoefficient: number, muzzleVelocityFPS: number, maximumOrdinate: number) {
		// Calculate the maximum range at which the user can shoot, without holdover or scope adjustment, while not exceeding a pre-determined maximum ordinate (target radius).
		// Time (seconds)it takes to reach the range having a maximum ordinate supplied above
		let timeToMaximumOrdinate = 0.25 * Math.pow(maximumOrdinate / 3, 0.5);
		// Velocity (feet per second) of the bullet at the above calculated time
		let velocityAtTimeToMaximumOrdinate = this.velocityFromTime(ballisticCoefficient, muzzleVelocityFPS, timeToMaximumOrdinate);
		// Drop (inches) of the bullet at the above given time and velocity***
		let dropAtMaximumPointBlankRangeZero = this.drop(muzzleVelocityFPS, velocityAtTimeToMaximumOrdinate, timeToMaximumOrdinate);
		// The bullet may drop the radius of the target below zero at the true maximum point blank range
		let dropAtMaximumPointBlankRange = dropAtMaximumPointBlankRangeZero - maximumOrdinate;
		// Loop through dropping velocity until Drop = DropAtMaximumPointBlankRange to find the velocity at the true point blank range
		let velocityAtMaximumPointBlankRange = velocityAtTimeToMaximumOrdinate;
		while(this.drop(muzzleVelocityFPS, velocityAtMaximumPointBlankRange, this.time(ballisticCoefficient, muzzleVelocityFPS, velocityAtMaximumPointBlankRange)) > dropAtMaximumPointBlankRange) {
		velocityAtMaximumPointBlankRange -= 0.1;
		}
		// Given the velocity at the point blank range, calculate the actual range
		return this.range(ballisticCoefficient, muzzleVelocityFPS, velocityAtMaximumPointBlankRange);
	}

	maximumPointBlankRangeZero(ballisticCoefficient: number, muzzleVelocityFPS: number, maximumOrdinate: number) {
		// Maximum Point Blank Range Zero (yards) is the range that the user should zero his/her rifle to obtain their maximum point blank range.
		// This range allows a user to shoot, without holdover or scope adjustment, while not exceeding a pre-determined maximum ordinate (target radius).
		// Time (seconds)it takes to reach the range having a maximum ordinate supplied above
		let timeToMaximumOrdinate = 0.25 * Math.pow(maximumOrdinate / 3, 0.5);
		// Velocity (feet per second) of the bullet at the above calculated time
		let velocityAtTimeToMaximumOrdinate = this.velocityFromTime(ballisticCoefficient, muzzleVelocityFPS, timeToMaximumOrdinate);
		// Given the velocity at the point blank range zero, calculate the actual range to zero the rifle
		return this.range(ballisticCoefficient, muzzleVelocityFPS, velocityAtTimeToMaximumOrdinate);
	}

	modifiedBallisticCoefficient(ballisticCoefficient: number, altitudeFeet: number, temperatureFahrenheit: number, barometricPressureInchesHg: number, relativeHumidityPercent: number) {
		// Takes the bullets ballistic coefficient at standard atmospheric conditions (sea level), and converts it to a new ballistic coefficient at the current altitudeFeet and conditions.
		let altitudeAdjustmentFactor = this.atmosphericService.altitudeAdjustmentFactor(altitudeFeet);
		let temperatureAdjustmentFactor = this.atmosphericService.temperatureAdjustmentFactor(altitudeFeet, temperatureFahrenheit);
		let barometricPressureAdjustmentFactor = this.atmosphericService.barometricPressureAdjustmentFactor(altitudeFeet, barometricPressureInchesHg);
		let relativeHumidityAdjustmentFactor = this.atmosphericService.relativeHumidityAdjustmentFactor(altitudeFeet, temperatureFahrenheit, barometricPressureInchesHg, relativeHumidityPercent / 100);
		return ballisticCoefficient * (altitudeAdjustmentFactor * (1 + temperatureAdjustmentFactor - barometricPressureAdjustmentFactor) * relativeHumidityAdjustmentFactor);
	}

	muzzleAngleDegreesForZeroRange(muzzleVelocityFPS: number, zeroRangeYards: number, scopeHeightInches: number, ballisticCoefficient: number) {
		// Calculates the neccessary angle (degrees) of the muzzle to obtain the requested zero range.
		// This is done by looping through vertical position with different muzzle angles at the given range until a muzzle angle is found that produces a vertical position of 0.
		let velocityAtZeroRange = this.velocityFromRange(ballisticCoefficient, muzzleVelocityFPS, zeroRangeYards);
		let timeAtZeroRange = this.time(ballisticCoefficient, muzzleVelocityFPS, velocityAtZeroRange);
		let dropAtZeroRange = this.drop(muzzleVelocityFPS, velocityAtZeroRange, timeAtZeroRange);
		let muzzleAngleDegreesForZeroRange = 0;
		while(this.verticalPosition(scopeHeightInches, muzzleAngleDegreesForZeroRange, zeroRangeYards, dropAtZeroRange) < 0) {
		muzzleAngleDegreesForZeroRange += 0.00001;
		}
		return muzzleAngleDegreesForZeroRange;
	}

	optimalRiflingTwist(bulletDiameterInches: number, bulletLengthInches: number) {
		// Calculates the best rifling twist rate (inches per twist) to stabalize the length of bullet being used.
		return bulletDiameterInches * 150 / (bulletLengthInches / bulletDiameterInches);
	}

	range(ballisticCoefficient: number, muzzleVelocityFPS: number, currentVelocityFPS: number) {
		// Calculates the range (yards) of the bullet at a given velocity.
		return ballisticCoefficient * (this.ingalsSpaceFromVelocity(currentVelocityFPS) - this.ingalsSpaceFromVelocity(muzzleVelocityFPS)) / 3;
	}

	rifleRecoilVelocity (bulletWeightGrains: number, muzzleVelocityFPS: number, powderWeightGrains: number, rifleWeightPounds: number) {
		// Calculates the amount of rearward velocity (feet per second) of the rifle upon firing.
		return (bulletWeightGrains * muzzleVelocityFPS + powderWeightGrains * 4000) / (rifleWeightPounds * 7000);
	}

	rifleRecoilEnergy(bulletWeightGrains: number, muzzleVelocityFPS: number, powderWeightGrains: number, rifleWeightPounds: number) {
		// Calculates the amount of rearward force (foot pounds) of the rifle upon firing.
		return rifleWeightPounds * Math.pow(this.rifleRecoilVelocity(bulletWeightGrains, muzzleVelocityFPS, powderWeightGrains, rifleWeightPounds), 2) / (this.gravity * 2);
	}

	sectionalDensity(bulletWeightGrains: number, bulletDiameterInches: number) {
		// Calculates the mass per given diameter of the bullet.  Used in determining form factor.
		return bulletWeightGrains / (7000 * Math.pow(bulletDiameterInches, 2));
	}

	time(ballisticCoefficient: number, muzzleVelocityFPS: number, currentVelocityFPS: number) {
		// Calculates the amount of time (seconds) it takes the bullet to slow from the initial velocity to a specific lower velocity.
		return ballisticCoefficient * (this.ingalsTimeFromVelocity(currentVelocityFPS) - this.ingalsTimeFromVelocity(muzzleVelocityFPS));
	}

	velocityFromRange(ballisticCoefficient: number, muzzleVelocityFPS: number, currentRangeYards: number) {
		// Calculates the velocity (feet per second) remaining in the bullet at a given range (yards).
		let currentSpace = this.ingalsSpaceFromVelocity(muzzleVelocityFPS) + ((currentRangeYards * 3) / ballisticCoefficient);
		return this.ingalsVelocityFromSpace(currentSpace);
	}

	velocityFromTime(ballisticCoefficient: number, muzzleVelocityFPS: number, currentTimeSeconds: number) {
		// Calculates the velocity (feet per second) remaining in the bullet at a given time (seconds).
		return this.ingalsVelocityFromTime(currentTimeSeconds / ballisticCoefficient + this.ingalsTimeFromVelocity(muzzleVelocityFPS));
	}

	verticalPosition(scopeHeightInches: number, muzzleAngleDegrees: number, currentRangeYards: number, currentDropInches: number) {
		// Calculates how far the bullet falls (inches) due to gravity, taking into account the angle of the muzzle.
		return (currentDropInches+(currentRangeYards*36)*Math.tan(this.conversionService.degreesToRadians(muzzleAngleDegrees)))-scopeHeightInches;
	}


}
