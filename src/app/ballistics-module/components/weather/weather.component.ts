import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Weather } from '../../models/weather.model';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'weather',
	styleUrls: ['./weather.component.css'],
	templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {

	@Output() onChange = new EventEmitter();

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getWeather().subscribe();
		// Initialize tooltips just for this component
		// $(document).ready(() => {
		// 	$('weather [data-toggle="tooltip"]').tooltip({ container: 'body' });
		// });
	}

	change(isValid: boolean) {
		if(isValid) {
			this.onChange.emit();
		}
	}


}
