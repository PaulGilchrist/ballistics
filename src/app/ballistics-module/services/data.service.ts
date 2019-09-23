import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Firearm } from '../models/firearm.model';
import { LengthEnum } from '../models/length-enum.model';
import { Range } from '../models/range.model';
import { Round } from '../models/round.model';
import { StatusEnum } from '../models/status-enum.model';
import { Store } from '../models/store.model';
import { Target } from '../models/target.model';
import { Weather } from '../models/weather.model';

import { FIREARMS } from '../data/firearms.data';

import { AtmosphericService } from './atmospheric.service';
import { ConversionService } from './conversion.service';
import { DragService } from './drag.service';


@Injectable()
export class DataService {
	// Public variables
    public store: Store = {
        firearmId: null,
        firearms: null,
        roundId: null,
        target: null,
        weather: null
    };

    private firearmId = new BehaviorSubject<string>(null);
    firearmId$ = this.firearmId.asObservable();

    private firearms = new BehaviorSubject<Firearm[]>(FIREARMS);
    firearms$ = this.firearms.asObservable();

    private ranges = new BehaviorSubject<Range[]>(null);
    ranges$ = this.ranges.asObservable();

    private roundId = new BehaviorSubject<string>(null);
    roundId$ = this.roundId.asObservable();

    private status = new BehaviorSubject<StatusEnum>(StatusEnum.SelectFirearm);
    status$ = this.status.asObservable();

    private target = new BehaviorSubject<Target>({
        distanceUnits: LengthEnum.Yards,
        distance: 1000,
        chartStepping: 50,
        sizeInches: 40,
        slantDegrees: 45,
        speedMPH: 3
    });
    target$ = this.target.asObservable();

    private weather = new BehaviorSubject<Weather>({
        altitudeFeet: 0,
        temperatureDegreesFahrenheit: 59,
        barometericPressureInchesHg: 29.53,
        relativeHumidityPercent: 78,
        windVelocityMPH: 10,
        windAngleDegrees: 90
    });
    weather$ = this.weather.asObservable();

	public rangeData: Range[] = null;

	public minRangeDataRows = 6;
	public maxRangeDataRows = 20;

	constructor(private _atmosphericService: AtmosphericService, private _conversionService: ConversionService, private _dragService: DragService) {}

	public export(): Store {
        return {
            firearmId: this.firearmId.getValue(),
            firearms: this.firearms.getValue(),
            roundId: this.roundId.getValue(),
            target: this.target.getValue(),
            weather: this.weather.getValue()
        };
	}

	public import(store: Store) {
        this.firearmId.next(store.firearmId);
        this.firearms.next(store.firearms);
        this.roundId.next(store.roundId);
        this.target.next(store.target);
        this.weather.next(store.weather);
	}

	public getFirearmId(): Observable<string> {
		const firearmIdJson = localStorage.getItem('firearmId');
		if(firearmIdJson) {
            const firearmId = JSON.parse(firearmIdJson);
            this.firearmId.next(firearmId);
		}
		return this.firearmId$;
	}

	public getFirearms(): Observable<Firearm[]> {
		const firearmsJson = localStorage.getItem('firearms');
		if(firearmsJson) {
            this.firearms.next(JSON.parse(firearmsJson));
		}
		return this.firearms$;
	}

	getRanges(): Observable<Range[]> {
        return combineLatest([
            this.getWeather(),
            this.getTarget(),
            this.getFirearms(),
            this.getFirearmId(),
            this.getRoundId()
        ]).pipe(
            map(([weather, target, firearms, firearmId, roundId]) => {
                let rangeData: Range[] = null;
                let firearm = null;
                let round = null;
                if(firearms) {
                    if(firearmId) {
                        firearm = firearms.find(f => f.id===firearmId);
                        if(firearm) {
                            if(roundId) {
                                round = firearm.rounds.find(r => r.id===roundId);
                            }
                        }
                    }
                }
                if(weather && target && firearm && round) {
                    rangeData = [];
                    // Loop through from Range = 0 to the maximum range and display the ballistics table at each chart stepping range.
                    const currentBallisticCoefficient = this._dragService.modifiedBallisticCoefficient(round.bulletBC, weather.altitudeFeet, weather.temperatureDegreesFahrenheit, weather.barometericPressureInchesHg, weather.relativeHumidityPercent);
                    const zeroRangeYards = firearm.zeroRangeUnits===LengthEnum.Yards ? firearm.zeroRange: this._conversionService.metersToYards(firearm.zeroRange);
                    const muzzleAngleDegrees = this._dragService.muzzleAngleDegreesForZeroRange(round.muzzleVelocityFPS, zeroRangeYards, firearm.sightHeightInches, currentBallisticCoefficient);
                    let currentCrossWindDriftInches: number, currentDropInches: number, currentEnergyFtLbs: number, currentLeadInches: number,  currentRangeMeters: number, currentRangeYards: number, currentTimeSeconds: number, currentVelocityFPS: number, currentVerticalPositionInches: number;
                    // Skip the first row
                    let currentRange = target.chartStepping;
                    /*
                        Here is a method that auto determines the maximum distance based on when the round goes subsonic, but takes control away from user
                        while ((currentVelocityFPS == null) || (currentVelocityFPS > this._atmosphericService.speedOfSoundAtSeaLevel)) {
                    */
                    while (currentRange <= target.distance) {
                        currentRangeMeters = target.distanceUnits===LengthEnum.Yards ? this._conversionService.yardsToMeters(currentRange): currentRange,
                        currentRangeYards = target.distanceUnits===LengthEnum.Yards ? currentRange: this._conversionService.metersToYards(currentRange),
                        currentVelocityFPS = this._dragService.velocityFromRange(currentBallisticCoefficient, round.muzzleVelocityFPS, currentRangeYards);
                        currentEnergyFtLbs = this._dragService.energy(round.bulletWeightGrains, currentVelocityFPS);
                        currentTimeSeconds = this._dragService.time(currentBallisticCoefficient, round.muzzleVelocityFPS, currentVelocityFPS);
                        currentDropInches = this._dragService.drop(round.muzzleVelocityFPS, currentVelocityFPS, currentTimeSeconds);
                        currentVerticalPositionInches = this._dragService.verticalPosition(firearm.sightHeightInches, muzzleAngleDegrees, currentRangeYards, currentDropInches);
                        // Cross Winds take on full range value regardless of Slant To Target
                        currentCrossWindDriftInches = this._dragService.crossWindDrift(currentRangeYards, currentTimeSeconds, weather.windAngleDegrees, weather.windVelocityMPH, muzzleAngleDegrees, round.muzzleVelocityFPS);
                        currentLeadInches = this._dragService.lead(target.speedMPH, currentTimeSeconds);
                        const slantDropInches: number = currentDropInches * (1-Math.cos(this._conversionService.degreesToRadians(target.slantDegrees)));
                        const range: Range = {
                            rangeMeters: currentRangeMeters,
                            rangeYards: currentRangeYards,
                            velocityFPS: currentVelocityFPS,
                            energyFtLbs: currentEnergyFtLbs,
                            timeSeconds: currentTimeSeconds,
                            dropInches: currentDropInches,
                            verticalPositionInches: -currentVerticalPositionInches,  // Go negative to reflect how much scope dial up is needed
                            crossWindDriftInches: currentCrossWindDriftInches,
                            leadInches: currentLeadInches,
                            slantDegrees: target.slantDegrees,
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
                        currentRange += target.chartStepping;
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
                return rangeData;
            })
        );
        // return this.ranges$;
	}

	public getRoundId(): Observable<string> {
		const roundIdJson = localStorage.getItem('roundId');
		if(roundIdJson) {
            this.roundId.next(JSON.parse(roundIdJson));
		}
		return this.roundId$;
	}

	public getStatus(): Observable<StatusEnum> {
		const statusJson = localStorage.getItem('status');
		if(statusJson) {
            this.status.next(JSON.parse(statusJson));
		}
		return this.status$;
	}

	public getTarget(): Observable<Target> {
		const targetJson = localStorage.getItem('target');
		if(targetJson) {
            this.target.next(JSON.parse(targetJson));
		}
		return this.target$;
	}

	public getWeather(): Observable<Weather> {
		const weatherJson = localStorage.getItem('weather');
		if(weatherJson) {
            this.weather.next(JSON.parse(weatherJson));
		}
		return this.weather$;
	}

	public deleteFirearm(firearmId: string): boolean {
		let deleted = false;
        const firearms = this.firearms.getValue();
		for(let i = 0; i < firearms.length; i++) {
			if(firearms[i].id === firearmId) {
				firearms.splice(i, 1);
				deleted = true;
				break;
			}
		}
		if(deleted) {
            this.updateFirearms(firearms);
		}
		return deleted;
	}

	public deleteRound(firearmId: string, roundId: string): boolean {
		let deleted = false;
        const firearms = this.firearms.getValue();
		for(let i = 0; i < firearms.length; i++) {
			if(firearms[i].id === firearmId) {
				const rounds = firearms[i].rounds;
                for(let j = 0; j < firearms[i].rounds.length; j++) {
                    if(firearms[i].rounds[j].id === roundId) {
                        firearms[i].rounds.splice(j, 1);
                        deleted = true;
                        break;
                    }
                }
				break;
			}
		}
		if(deleted) {
            this.updateFirearms(firearms);
		}
		return deleted;
	}

	public insertFirearm(firearm: Firearm): boolean {
		// Gernerate new unique id
		firearm.id = this.guid();
        const firearms = this.firearms.getValue();
		firearms.push(firearm);
		firearms.sort(this.nameSort);
        this.updateFirearms(firearms);
        return true;
	}

	public insertRound(firearmId: string, round: Round): boolean {
		// Gernerate new unique id
		round.id = this.guid();
        const firearms = this.firearms.getValue();
        const firearm = firearms.find(f => f.id === firearmId);
        firearm.rounds.push(round);
		firearm.rounds.sort(this.nameSort);
        this.updateFirearms(firearms);
        return true;
	}

	public selectFirearm(firearmId: string) {
        this.selectRound(null);
        localStorage.setItem('firearmId', JSON.stringify(firearmId));
        this.firearmId.next(firearmId);
	}

	public selectRound(roundId: string) {
        localStorage.setItem('roundId', JSON.stringify(roundId));
        this.roundId.next(roundId);
	}

	public updateFirearm(firearm: Firearm): boolean {
		let updated = false;
        let found = false;
        let nameChanged = false;
        const firearms = this.firearms.getValue();
        for(let i = 0; i < firearms.length; i++) {
            if(firearms[i].id === firearm.id) {
                nameChanged = (firearms[i].name !== firearm.name);
                firearms[i] = firearm;
                found = true;
                break;
            }
        }
        if(found) {
            if(nameChanged) {
                // Name may have been changed
                firearms.sort(this.nameSort);
            }
            updated = this.updateFirearms(firearms);
        }
		return updated;
	}

	public updateFirearms(firearms: Firearm[]): boolean {
        localStorage.setItem('firearms', JSON.stringify(firearms));
        this.firearms.next(firearms);
        return true;
	}

	public updateRound(firearmId: string, round: Round): boolean {
		let updated = false;
        let found = false;
        let nameChanged = false;
        const firearms = this.firearms.getValue();
        for(let i = 0; i < firearms.length; i++) {
            if(firearms[i].id === firearmId) {
                for(let j = 0; j < firearms[i].rounds.length; j++) {
                    if(firearms[i].rounds[j].id === round.id) {
                        nameChanged = (firearms[i].rounds[j].name !== round.name);
                        firearms[i].rounds[j] = round;
                        found = true;
                        break;
                    }
                }
                if(nameChanged) {
                    // Name may have been changed
                    firearms[i].rounds.sort(this.nameSort);
                }
                break;
            }
        }
        if(found) {
            updated = this.updateFirearms(firearms);
        }
		return updated;
	}

	public updateStatus(status: StatusEnum): boolean {
        localStorage.setItem('status', JSON.stringify(status));
        this.status.next(status);
        return true;
	}

	public updateTarget(target: Target): boolean {
        localStorage.setItem('target', JSON.stringify(target));
        this.target.next(target);
        return true;
	}

	public updateWeather(weather: Weather): boolean {
        localStorage.setItem('weather', JSON.stringify(weather));
        this.weather.next(weather);
        return true;
	}

	guid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
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

}
