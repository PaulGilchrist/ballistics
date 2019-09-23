import { Injectable } from '@angular/core';

@Injectable()
export class ConversionService {

	minuteOfAngle = 1.04719755119; // Inches at 100 yards
	mil = 3.6; // Inches at 100 yards
	pi = 3.14159265358979;

	degreesToRadians(degrees: number) {
	  // Converts from a Degree To A Radian Angle.
		return degrees * this.pi / 180;
	}

	inchesToIPHY(inches: number, currentRange: number) {
	  // Converts from Inches ToInches per 100 Yards
	  return (inches * 100 / currentRange);
	}

	inchesToMil(inches: number, currentRange: number) {
	  // Converts from Inches To MinutesOfAngle.
	  return (inches * 100 / this.mil / currentRange);
	}

	inchesToMinutesOfAngle(inches: number, currentRange: number) {
	  // Converts from Inches To MinutesOfAngle.
	  return (inches * 100 / this.minuteOfAngle / currentRange);
	}

	isEven(input: number) {
	  // Returns true if the inputed integer is an even number
	  if(input / 2 * 2 === input) {
		return true;
	  } else {
		return false;
	  }
	}

	metersToYards(meters: number) {
	  return (meters / 0.9144);
	}

	milesPerHourToInchesPerSecond(inputVelocityMPH: number) {
	  // Converts from a Miles Per Hour To Inches Per Second.
	  return inputVelocityMPH * 17.6004;
	}

	radiansToDegrees(radians: number) {
	  // Converts from a Radian To A Degree Angle.
	  return radians * 180 / this.pi;
	}

	sec(angle: number) {
	  // Secant
	  return 1 / Math.cos(angle);
	}

	sizeToDistance(actualTargetSizeInches: number, reticleViewedTargetSizeMils: number) {
		return Math.round((actualTargetSizeInches/36) * 1000 / reticleViewedTargetSizeMils);
	}

	yardsToMeters(yards: number) {
	  return (yards * 0.9144);
	}

}
