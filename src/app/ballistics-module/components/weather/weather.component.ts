import { Component, OnInit } from '@angular/core';

import { Weather } from '../../models/weather.model';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-weather',
	styleUrls: ['./weather.component.css'],
	templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit {

    isOpen = true;
    weather: Weather = null;

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.dataService.getWeather().subscribe(weather => {
            this.weather = weather;
        });
	}

	change(isValid: boolean) {
		if(isValid) {
            this.dataService.updateWeather(this.weather);
		}
	}


}
