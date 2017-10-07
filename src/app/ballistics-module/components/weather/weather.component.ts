import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Weather } from '../../models/weather.model'
import { DataService } from '../../services/data.service'

@Component({
	moduleId: module.id.toString(),
	selector: 'weather',
	styleUrls: ['weather.component.css'],
	templateUrl: 'weather.component.html'
})
export class WeatherComponent implements OnInit {

	public isOpen = true;

	@Output() onChange = new EventEmitter();

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getWeather().subscribe();
	}

	change(isValid: boolean) {
		if(isValid) {
			this.onChange.emit();
		}
	}


}
