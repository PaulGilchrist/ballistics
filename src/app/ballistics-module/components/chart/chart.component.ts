import { Component, Input, OnInit } from '@angular/core';

import { Firearm } from '../../models/firearm.model';
import { LengthEnum } from '../../models/length-enum.model';
import { Range } from '../../models/range.model';
import { Round } from '../../models/round.model';
import { Target } from '../../models/target.model';
import { Weather } from '../../models/weather.model';

import { AtmosphericService } from '../../services/atmospheric.service';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-chart',
	styleUrls: ['./chart.component.css'],
	templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {

	firearms: Firearm[] = null;
	firearm: Firearm = null;
	isOpen = true;
    ranges: Range[] = null;
	round: Round = null;
	showMil = true;
	showMoA = true;
	showIPHY = true;
    speedOfSound = 0;
	target: Target = null;
	weather: Weather = null;
    get lengthEnum() { return LengthEnum; }


	constructor(public dataService: DataService, private atmosphericService: AtmosphericService) {}

	ngOnInit() {
		this.dataService.getWeather().subscribe(weather => {
            this.weather = weather;
            this.speedOfSound = this.atmosphericService.speedOfSound(this.weather.altitudeFeet);
        });
		this.dataService.getTarget().subscribe(target => {
            this.target = target;
        });
		this.dataService.getFirearms().subscribe(firearms => {
            this.firearms = firearms;
        });
		this.dataService.getFirearmId().subscribe(firearmId => {
            if(this.firearms != null && firearmId != null) {
                this.firearm = this.firearms.find(f => f.id===firearmId);
                this.showMil = this.firearm.turretUnits===0 || this.firearm.reticleUnits===0;
                this.showMoA = this.firearm.turretUnits===1 || this.firearm.reticleUnits===1;
                this.showIPHY = this.firearm.turretUnits===3 || this.firearm.reticleUnits===3;
            }
        });
		this.dataService.getRoundId().subscribe(roundId => {
            if(this.firearm != null && roundId != null) {
                this.round = this.firearm.rounds.find(r => r.id===roundId);
            }
        });
		this.dataService.getRanges().subscribe(ranges => {
            this.ranges = ranges;
        });
	}
}
