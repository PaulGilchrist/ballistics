import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import { TARGET, WEATHER } from '../../data/conditions.data'

import { Target } from '../../models/target.model'
import { Weather } from '../../models/weather.model'

import { DataService } from '../../services/data.service'

@Component({
     moduleId: module.id.toString(),
     selector: 'conditions',
     styleUrls: ['conditions.component.css'],
     templateUrl: 'conditions.component.html'
})
export class ConditionsComponent implements OnInit {

    public isViewOnly: boolean = false;

    public _isOpen: boolean = true;
    @Input()
    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
    }

    constructor(public dataService: DataService) {}

    ngOnInit() {
        let targetObservable = this.dataService.getTarget();
        let weatherObservable = this.dataService.getWeather();
        Observable.forkJoin(targetObservable, weatherObservable).subscribe();
    }

}