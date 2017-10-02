import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Firearm } from '../models/firearm.model'
import { Round } from '../models/round.model'
import { Target } from '../models/target.model'
import { Weather } from '../models/weather.model'

import { FIREARMS } from '../data/firearms.data'
import { TARGET, WEATHER } from '../data/conditions.data'

@Injectable()
export class DataService {
    // Public variables
    public firearms: Array<Firearm> = null;
    public currentFirearm: Firearm = null;
    public currentRound: Round = null;
    public currentTarget: Target = null;
    public currentWeather: Weather = null;

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

    goToFirearm(firearm: Firearm) {
        console.log('goToFirearm() not implemented');
    }
}
