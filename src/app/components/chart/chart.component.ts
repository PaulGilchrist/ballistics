import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import { TARGET, WEATHER } from '../../data/conditions.data'

import { Firearm } from '../../models/firearm.model'
import { Range } from '../../models/range.model'
import { Round } from '../../models/round.model'
import { Target } from '../../models/target.model'
import { Weather } from '../../models/weather.model'

import { AtmosphericService } from '../../services/atmospheric.service'
import { ConversionService } from '../../services/conversion.service'
import { DataService } from '../../services/data.service'
import { DragService } from '../../services/drag.service'

@Component({
     moduleId: module.id.toString(),
     selector: 'chart',
     styleUrls: ['chart.component.css'],
     templateUrl: 'chart.component.html'
})
export class ChartComponent implements OnInit {

	showMil: boolean = true;
	showMoA: boolean = true;
	showIPHY: boolean = true;
	rangeData: Array<any>;

	public _isOpen: boolean = true;
    @Input()
    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
    }

    constructor(private _atmosphericService: AtmosphericService, private _conversionService: ConversionService, public dataService: DataService, private _dragService: DragService) {}

    ngOnInit() {
		//Assumes this component is not loaded until after we have a dataService with currentFirearm, currentRound, currentTarget, and currentWeather
		this.showMil = this.dataService.currentFirearm.turretUnits==0 || this.dataService.currentFirearm.reticleUnits==0;
		this.showMoA = this.dataService.currentFirearm.turretUnits==1 || this.dataService.currentFirearm.reticleUnits==1;
		this.showIPHY = this.dataService.currentFirearm.turretUnits==3 || this.dataService.currentFirearm.reticleUnits==3;
		this.rangeData = this.getRangeData();
		while(this.rangeData.length < 6) {
			//Reduce the stepping to ensure we have a good sample of data between muzzle and subsonic
			this.dataService.currentTarget.chartStepping = Math.floor(this.dataService.currentTarget.chartStepping / 2);
			this.rangeData = this.getRangeData();
		}
		if(this.rangeData.length > 20) {
			//Reset chart stepping back to the default value to prevent excessive run times and long graphs
			this.dataService.currentTarget.chartStepping = 50;
			this.rangeData = this.getRangeData();
		}
	}

	back() {
		console.log('back() not implemented');
	};

	graphBar() {
		console.log('graphBar() not implemented');
	};

	graphLine() {
		console.log('graphLine() not implemented');
	};

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
        //Loop through from Range = 0 to the maximum range and display the ballistics table at each chart stepping range.
        var currentBallisticCoefficient = this._dragService.modifiedBallisticCoefficient(this.dataService.currentRound.bulletBC, this.dataService.currentWeather.altitudeFeet, this.dataService.currentWeather.temperatureDegreesFahrenheit, this.dataService.currentWeather.barometericPressureInchesHg, this.dataService.currentWeather.relativeHumidityPercent);
        var muzzleAngleDegrees = this._dragService.muzzleAngleDegreesForZeroRange(this.dataService.currentRound.muzzleVelocityFPS, this.dataService.currentFirearm.zeroRangeYards, this.dataService.currentFirearm.sightHeightInches, currentBallisticCoefficient);
        var currentCrossWindDriftInches, currentDropInches, currentEnergyFtLbs, currentLeadInches, currentTimeSeconds, currentVelocityFPS, currentVerticalPositionInches;
        //Skip the first row
        var currentRangeYards = this.dataService.currentTarget.chartStepping;
		var rangeData: Array<Range> = [];
        while ((currentVelocityFPS == null) || (currentVelocityFPS > this._atmosphericService.speedOfSoundAtSeaLevel)) {
			currentVelocityFPS = this._dragService.velocityFromRange(currentBallisticCoefficient, this.dataService.currentRound.muzzleVelocityFPS, currentRangeYards);
			currentEnergyFtLbs = this._dragService.energy(this.dataService.currentRound.bulletWeightGrains, currentVelocityFPS);
			currentTimeSeconds = this._dragService.time(currentBallisticCoefficient, this.dataService.currentRound.muzzleVelocityFPS, currentVelocityFPS);
			currentDropInches = this._dragService.drop(this.dataService.currentRound.muzzleVelocityFPS, currentVelocityFPS, currentTimeSeconds);
			currentVerticalPositionInches = this._dragService.verticalPosition(this.dataService.currentFirearm.sightHeightInches, muzzleAngleDegrees, currentRangeYards, currentDropInches);
			//Cross Winds take on full range value regardless of Slant To Target
			currentCrossWindDriftInches = this._dragService.crossWindDrift(currentRangeYards, currentTimeSeconds, this.dataService.currentWeather.windAngleDegrees, this.dataService.currentWeather.windVelocityMPH, muzzleAngleDegrees, this.dataService.currentRound.muzzleVelocityFPS);
			currentLeadInches = this._dragService.lead(this.dataService.currentTarget.speedMPH, currentTimeSeconds);
			let slantDropInches: number = currentDropInches * (1-Math.cos(this._conversionService.degreesToRadians(this.dataService.currentTarget.slantDegrees)));
			let range: Range = {
				rangeYards: currentRangeYards,
				velocityFPS: currentVelocityFPS,
				energyFtLbs: currentEnergyFtLbs,
				timeSeconds: currentTimeSeconds,
				dropInches: currentDropInches,
				verticalPositionInches: -currentVerticalPositionInches,  //Go negative to reflect how much scope dial up is needed
				crossWindDriftInches: currentCrossWindDriftInches,
				leadInches: currentLeadInches,
				slantDegrees: this.dataService.currentTarget.slantDegrees,
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
			currentRangeYards += this.dataService.currentTarget.chartStepping;
        }
		return rangeData;
	};
}