import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Firearm } from '../models/firearm.model';
import { Range } from '../models/range.model';
import { Round } from '../models/round.model';
import { StatusEnum } from '../models/status-enum.model';
import { Store } from '../models/store.model';
import { Target } from '../models/target.model';
import { Weather } from '../models/weather.model';

import { FIREARMS } from '../data/firearms.data';

import ballistics from 'pg-ballistics';
import utilities from 'pg-utilities';

@Injectable()
export class DataService {
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
        distanceUnits: 'Yards',
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
        barometricPressureInchesHg: 29.53,
        relativeHumidityPercent: 78,
        windVelocityMPH: 10,
        windAngleDegrees: 90
    });
    weather$ = this.weather.asObservable();

	public rangeData: Range[] = null;

	public export(): Store {
        return {
            firearmId: this.firearmId.getValue(),
            firearms: this.firearms.getValue(),
            roundId: this.roundId.getValue(),
            status: this.status.getValue(),
            target: this.target.getValue(),
            weather: this.weather.getValue()
        };
	}

	public import(store: Store) {
        this.firearmId.next(store.firearmId);
        this.firearms.next(store.firearms);
        this.roundId.next(store.roundId);
        this.status.next(store.status);
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
                return ballistics.getRangeData(weather, target, firearm, round);
            })
        );
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
		firearm.id = utilities.guid();
        const firearms = this.firearms.getValue();
		firearms.push(firearm);
        utilities.sort(firearms, 'name');
        this.updateFirearms(firearms);
        return true;
	}

	public insertRound(firearmId: string, round: Round): boolean {
		// Gernerate new unique id
		round.id = utilities.guid();
        const firearms = this.firearms.getValue();
        const firearm = firearms.find(f => f.id === firearmId);
        firearm.rounds.push(round);
        utilities.sort(firearm.rounds, 'name');
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
                utilities.sort(firearms, 'name');
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
                    utilities.sort(firearms[i].rounds, 'name');
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

}
