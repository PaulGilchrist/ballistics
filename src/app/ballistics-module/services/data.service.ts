import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Firearm } from '../models/firearm.model';
import { Range } from '../models/range.model';
import { Round } from '../models/round.model';
import { Target } from '../models/target.model';
import { Weather } from '../models/weather.model';

import { FIREARMS } from '../data/firearms.data';
import { TARGET, WEATHER } from '../data/conditions.data';

import { AtmosphericService } from './atmospheric.service';
import { ConversionService } from './conversion.service';
import { DragService } from './drag.service';


@Injectable()
export class DataService {
	// Public variables
	public firearms: Array<Firearm> = null;
	public currentFirearm: Firearm = null;
	public currentRound: Round = null;
	public currentTarget: Target = null;
	public rangeData: Array<Range> = null;

	public currentWeather: Weather = null;
	public minRangeDataRows = 6;
	public maxRangeDataRows = 20;

	constructor(private _atmosphericService: AtmosphericService, private _conversionService: ConversionService, private _dragService: DragService) {}

	public getFirearms(): Observable<Array<Firearm>> {
		// Check to see if firearms are stored in localstorage before getting from API or mock data
		const firearmsJson = localStorage.getItem('firearms');
		if(firearmsJson) {
			this.firearms = JSON.parse(firearmsJson);
		} else {
			// We already have the data so simulate an async call
			this.firearms = FIREARMS;
		}
		return Observable.of(this.firearms);
	}

	public getTarget(force = false): Observable<Target> {
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

	public getWeather(force = false): Observable<Weather> {
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
		let rangeData: Array<Range> = null;
		if(this.currentFirearm && this.currentRound && this.currentTarget && this.currentWeather) {
			rangeData = [];
			// Loop through from Range = 0 to the maximum range and display the ballistics table at each chart stepping range.
			const currentBallisticCoefficient = this._dragService.modifiedBallisticCoefficient(this.currentRound.bulletBC, this.currentWeather.altitudeFeet, this.currentWeather.temperatureDegreesFahrenheit, this.currentWeather.barometericPressureInchesHg, this.currentWeather.relativeHumidityPercent);
			const muzzleAngleDegrees = this._dragService.muzzleAngleDegreesForZeroRange(this.currentRound.muzzleVelocityFPS, this.currentFirearm.zeroRangeYards, this.currentFirearm.sightHeightInches, currentBallisticCoefficient);
			let currentCrossWindDriftInches, currentDropInches, currentEnergyFtLbs, currentLeadInches, currentTimeSeconds, currentVelocityFPS, currentVerticalPositionInches;
			// Skip the first row
			let currentRangeYards = this.currentTarget.chartStepping;
			/*
				Here is a method that auto determines the maximum distance based on when the round goes subsonic, but takes control away from user
				while ((currentVelocityFPS == null) || (currentVelocityFPS > this._atmosphericService.speedOfSoundAtSeaLevel)) {
			*/
			while (currentRangeYards <= this.currentTarget.distanceYards) {
				currentVelocityFPS = this._dragService.velocityFromRange(currentBallisticCoefficient, this.currentRound.muzzleVelocityFPS, currentRangeYards);
				currentEnergyFtLbs = this._dragService.energy(this.currentRound.bulletWeightGrains, currentVelocityFPS);
				currentTimeSeconds = this._dragService.time(currentBallisticCoefficient, this.currentRound.muzzleVelocityFPS, currentVelocityFPS);
				currentDropInches = this._dragService.drop(this.currentRound.muzzleVelocityFPS, currentVelocityFPS, currentTimeSeconds);
				currentVerticalPositionInches = this._dragService.verticalPosition(this.currentFirearm.sightHeightInches, muzzleAngleDegrees, currentRangeYards, currentDropInches);
				// Cross Winds take on full range value regardless of Slant To Target
				currentCrossWindDriftInches = this._dragService.crossWindDrift(currentRangeYards, currentTimeSeconds, this.currentWeather.windAngleDegrees, this.currentWeather.windVelocityMPH, muzzleAngleDegrees, this.currentRound.muzzleVelocityFPS);
				currentLeadInches = this._dragService.lead(this.currentTarget.speedMPH, currentTimeSeconds);
				const slantDropInches: number = currentDropInches * (1-Math.cos(this._conversionService.degreesToRadians(this.currentTarget.slantDegrees)));
				const range: Range = {
					rangeYards: currentRangeYards,
					velocityFPS: currentVelocityFPS,
					energyFtLbs: currentEnergyFtLbs,
					timeSeconds: currentTimeSeconds,
					dropInches: currentDropInches,
					verticalPositionInches: -currentVerticalPositionInches,  // Go negative to reflect how much scope dial up is needed
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
			/*
				Below is methods to ensure the table is neither too short or too long, but takes control away from user
			*/
			// if(rangeData.length < this.minRangeDataRows) {
			// 	// Reduce the stepping to ensure we have a good sample of data between muzzle and subsonic
			// 	this.currentTarget.chartStepping = Math.floor(this.currentTarget.chartStepping / 2);
			// 	rangeData = this.getRangeData();
			// } else if(rangeData.length > this.maxRangeDataRows) {
			// 	// Increase the stepping to ensure we do not have too large of a chart
			// 	this.currentTarget.chartStepping = this.currentTarget.chartStepping * 2;
			// 	rangeData = this.getRangeData();
			// }
		}
		this.rangeData = rangeData;
		return rangeData;
	}

	guid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	public deleteFirearm(firearm: Firearm): boolean {
		let deleted = false;
		for(let i = 0; i < this.firearms.length; i++) {
			if(this.firearms[i].id === firearm.id) {
				this.firearms.splice(i, 1);
				deleted = true;
				break;
			}
		}
		if(deleted) {
			localStorage.setItem('firearms', JSON.stringify(this.firearms));
		}
		return deleted;
	}

	public deleteRound(firearm: Firearm, round: Round): boolean {
		let deleted = false;
		for(let i = 0; i < firearm.rounds.length; i++) {
			if(firearm.rounds[i].id === round.id) {
				firearm.rounds.splice(i, 1);
				deleted = true;
				break;
			}
		}
		if(deleted) {
			localStorage.setItem('firearms', JSON.stringify(this.firearms));
		}
		return deleted;
	}

	public insertFirearm(firearm: Firearm): boolean {
		// Gernerate new id
		firearm.id = this.guid();
		this.firearms.push(firearm);
		this.firearms.sort(this.nameSort);
		localStorage.setItem('firearms', JSON.stringify(this.firearms));
		return true;
	}

	public insertRound(firearm: Firearm, round: Round): boolean {
		// Gernerate new id
		round.id = this.guid();
		firearm.rounds.push(round);
		firearm.rounds.sort(this.nameSort);
		localStorage.setItem('firearms', JSON.stringify(this.firearms));
		return true;
	}

	public nameSort(a: any, b: any) {
		if(a.name < b.name) {
			return -1;
		} else if (b.name < a.name) {
			return 1;
		} else {
			return 0;
		}
	}

	public updateFirearm(firearm: Firearm) {
		let updated = false;
		let nameChanged = false;
		for(let i = 0; i < this.firearms.length; i++) {
			if(this.firearms[i].id === firearm.id) {
				nameChanged = (this.firearms[i].name !== firearm.name);
				this.firearms[i] = firearm;
				updated = true;
				break;
			}
		}
		if(updated) {
			if(nameChanged) {
				// Name may have been changed
				this.firearms.sort(this.nameSort);
			}
			localStorage.setItem('firearms', JSON.stringify(this.firearms));
		}
		return updated;
	}

	public updateRound(firearm: Firearm, round: Round) {
		let updated = false;
		let nameChanged = false;
		for(let i = 0; i < firearm.rounds.length; i++) {
			if(firearm.rounds[i].id === round.id) {
				nameChanged = (firearm.rounds[i].name !== round.name);
				firearm.rounds[i] = round;
				updated = true;
				break;
			}
		}
		if(updated) {
			if(nameChanged) {
				// Name may have been changed
				firearm.rounds.sort(this.nameSort);
			}
			localStorage.setItem('firearms', JSON.stringify(this.firearms));
		}
		return updated;
	}


}
