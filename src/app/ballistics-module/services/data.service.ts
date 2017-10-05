import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Firearm } from '../models/firearm.model'
import { Range } from '../models/range.model'
import { Round } from '../models/round.model'
import { Target } from '../models/target.model'
import { Weather } from '../models/weather.model'

import { FIREARMS } from '../data/firearms.data'
import { TARGET, WEATHER } from '../data/conditions.data'

import { AtmosphericService } from './atmospheric.service'
import { ConversionService } from './conversion.service'
import { DragService } from './drag.service'


@Injectable()
export class DataService {
    // Public variables
    public firearms: Array<Firearm> = null;
    public currentFirearm: Firearm = null;
    public currentRound: Round = null;
    public currentTarget: Target = null;
    public currentWeather: Weather = null;
    public minRangeDataRows: number = 6;
    public maxRangeDataRows: number = 20;

    constructor(private _atmosphericService: AtmosphericService, private _conversionService: ConversionService, private _dragService: DragService) {}

    public getFirearms(): Observable<Array<Firearm>> {
        // We already have the data so simulate an async call
        this.firearms = FIREARMS;
        return Observable.of(this.firearms);
    }

    public getTarget(force: boolean = false): Observable<Target> {
        // We already have the data so simulate an async call
        if(force || !this.currentTarget) {
            this.currentTarget = {
                distanceYards: TARGET.distanceYards,
                chartStepping: TARGET.chartStepping,
                slantDegrees: TARGET.slantDegrees,
                speedMPH: TARGET.speedMPH
            };
        }
        return Observable.of(this.currentTarget);
    }

    public getWeather(force: boolean = false): Observable<Weather> {
        // We already have the data so simulate an async call
        if(force || !this.currentWeather) {
            this.currentWeather = {
                altitudeFeet: WEATHER.altitudeFeet,
                temperatureDegreesFahrenheit: WEATHER.temperatureDegreesFahrenheit,
                barometericPressureInchesHg: WEATHER.barometericPressureInchesHg,
                relativeHumidityPercent: WEATHER.relativeHumidityPercent,
                windVelocityMPH: WEATHER.windVelocityMPH,
                windAngleDegrees: WEATHER.windAngleDegrees
            };
        }
        return Observable.of(this.currentWeather);
    }

    getDistanceYards(actualTargetSizeInches: number, reticleViewedTargetSizeMils: number) {
        return Math.round((actualTargetSizeInches/36) * 1000 / reticleViewedTargetSizeMils);
    }

	getRangeData(): Array<Range> {
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// What other calculations exist in drag.js that are not yet on the chart?
		//		clicksToReachMaximumPointBlankRangeZero
		//		maxPointBlankRangeZeroYards
		//		maximumPointBlankRange
		//		optimalRiflingTwist
		//		rifleRecoilVelocity
		//		rifleRecoilEnergy
		//		sectionalDensity
		// What about making all the calculators available?
		//		getDistanceYards
		//		degreesToRadians
		//		inchesToIPHY
		//		inchesToMil
		//		inchesToMinutesOfAngle
		//		milesPerHourToInchesPerSecond
		//		radiansToDegrees
		//		secant
		//		speedOfSound (at different altitudes)
		//		weightDensityOfAir (at different altitudes)
		//		standardRelativeHumidity (at different altitudes)
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var rangeData: Array<Range> = [];
		if(this.currentFirearm && this.currentRound && this.currentTarget && this.currentWeather) {
			//Loop through from Range = 0 to the maximum range and display the ballistics table at each chart stepping range.
			var currentBallisticCoefficient = this._dragService.modifiedBallisticCoefficient(this.currentRound.bulletBC, this.currentWeather.altitudeFeet, this.currentWeather.temperatureDegreesFahrenheit, this.currentWeather.barometericPressureInchesHg, this.currentWeather.relativeHumidityPercent);
			var muzzleAngleDegrees = this._dragService.muzzleAngleDegreesForZeroRange(this.currentRound.muzzleVelocityFPS, this.currentFirearm.zeroRangeYards, this.currentFirearm.sightHeightInches, currentBallisticCoefficient);
			var currentCrossWindDriftInches, currentDropInches, currentEnergyFtLbs, currentLeadInches, currentTimeSeconds, currentVelocityFPS, currentVerticalPositionInches;
			//Skip the first row
			var currentRangeYards = this.currentTarget.chartStepping;
			while ((currentVelocityFPS == null) || (currentVelocityFPS > this._atmosphericService.speedOfSoundAtSeaLevel)) {
				currentVelocityFPS = this._dragService.velocityFromRange(currentBallisticCoefficient, this.currentRound.muzzleVelocityFPS, currentRangeYards);
				currentEnergyFtLbs = this._dragService.energy(this.currentRound.bulletWeightGrains, currentVelocityFPS);
				currentTimeSeconds = this._dragService.time(currentBallisticCoefficient, this.currentRound.muzzleVelocityFPS, currentVelocityFPS);
				currentDropInches = this._dragService.drop(this.currentRound.muzzleVelocityFPS, currentVelocityFPS, currentTimeSeconds);
				currentVerticalPositionInches = this._dragService.verticalPosition(this.currentFirearm.sightHeightInches, muzzleAngleDegrees, currentRangeYards, currentDropInches);
				//Cross Winds take on full range value regardless of Slant To Target
				currentCrossWindDriftInches = this._dragService.crossWindDrift(currentRangeYards, currentTimeSeconds, this.currentWeather.windAngleDegrees, this.currentWeather.windVelocityMPH, muzzleAngleDegrees, this.currentRound.muzzleVelocityFPS);
				currentLeadInches = this._dragService.lead(this.currentTarget.speedMPH, currentTimeSeconds);
				let slantDropInches: number = currentDropInches * (1-Math.cos(this._conversionService.degreesToRadians(this.currentTarget.slantDegrees)));
				let range: Range = {
					rangeYards: currentRangeYards,
					velocityFPS: currentVelocityFPS,
					energyFtLbs: currentEnergyFtLbs,
					timeSeconds: currentTimeSeconds,
					dropInches: currentDropInches,
					verticalPositionInches: -currentVerticalPositionInches,  //Go negative to reflect how much scope dial up is needed
					crossWindDriftInches: currentCrossWindDriftInches,
					leadInches: currentLeadInches,
					slantDegrees: this.currentTarget.slantDegrees,
					// //Al the remaining properties are computed
					verticalPositionMil: this._conversionService.inchesToMil(-currentVerticalPositionInches, currentRangeYards),
					verticalPositionMoA: this._conversionService.inchesToMinutesOfAngle(-currentVerticalPositionInches, currentRangeYards),
					verticalPositionIPHY: this._conversionService.inchesToIPHY(-currentVerticalPositionInches, currentRangeYards),
					crossWindDriftMil: this._conversionService.inchesToMil(currentCrossWindDriftInches, currentRangeYards),
					crossWindDriftMoA: this._conversionService.inchesToMinutesOfAngle(currentCrossWindDriftInches, currentRangeYards),
					crossWindDriftIPHY: this._conversionService.inchesToIPHY(currentCrossWindDriftInches, currentRangeYards),
					leadMil: this._conversionService.inchesToMil(currentLeadInches, currentRangeYards),
					leadMoA: this._conversionService.inchesToMinutesOfAngle(currentLeadInches, currentRangeYards),
					leadIPHY: this._conversionService.inchesToIPHY(currentLeadInches, currentRangeYards),
					slantDropInches: slantDropInches,
					slantMil: this._conversionService.inchesToMil(slantDropInches, currentRangeYards),
					slantMoA: this._conversionService.inchesToMinutesOfAngle(slantDropInches, currentRangeYards),
					slantIPHY: this._conversionService.inchesToIPHY(slantDropInches, currentRangeYards)
				};
				rangeData.push(range);
				currentRangeYards += this.currentTarget.chartStepping;
			}
        }
        while(rangeData.length < this.minRangeDataRows) {
			//Reduce the stepping to ensure we have a good sample of data between muzzle and subsonic
			this.currentTarget.chartStepping = Math.floor(this.currentTarget.chartStepping / 2);
			rangeData = this.getRangeData();
		}
		if(rangeData.length > this.maxRangeDataRows) {
			//Reset chart stepping back to the default value to prevent excessive run times and long graphs
			this.currentTarget.chartStepping = 50;
			rangeData = this.getRangeData();
		}
		return rangeData;
	};

}
