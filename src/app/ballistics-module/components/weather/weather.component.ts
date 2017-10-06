import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import { Weather } from '../../models/weather.model'
import { DataService } from '../../services/data.service'

@Component({
	moduleId: module.id.toString(),
	selector: 'weather',
	styleUrls: ['weather.component.css'],
	templateUrl: 'weather.component.html'
})
export class WeatherComponent implements OnInit {

	public isViewOnly = false;

	public _isOpen = true;
	@Input()
	set isOpen(isOpen: boolean) {
		this._isOpen = isOpen;
	}

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getWeather().subscribe();
	}

}
