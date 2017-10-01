import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Firearm } from '../models/firearm.model'
import { Round } from '../models/round.model'

import { FIREARMS } from '../data/firearms.data'

@Injectable()
export class DataService {
    // Public variables
    public firearms: Array<Firearm> = null;
    public currentFirearm: Firearm = null;
    public currentRound: Round = null;

    public getFirearms(): Observable<Array<Firearm>> {
        // We already have the data so simulate an async call
        this.firearms = FIREARMS;
        return Observable.of(this.firearms);
    }

    goToFirearm(firearm: Firearm) {
        console.log('goToFirearm() not implemented');
    }
}
