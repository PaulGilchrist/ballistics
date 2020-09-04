import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

declare const require: any;
import { jsPDF } from 'jspdf';
require('jspdf-autotable');

import { Firearm } from '../../models/firearm.model';
import { Range } from '../../models/range.model';
import { Round } from '../../models/round.model';
import { Target } from '../../models/target.model';
import { Weather } from '../../models/weather.model';

import atmospherics from 'pg-atmospherics';
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
    tableHtml = null;
	target: Target = null;
	weather: Weather = null;

	constructor(public dataService: DataService) {}

    print() {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.text([`Range Chart - Firearm (${this.firearm.name}) - Round (${this.round.name})`, ``], 104, 10, { align: 'center'});
        // @ts-ignore 2339
        pdf.autoTable({ html: '#ballisticsTable', margin: 1, startY: 20, styles: { fontSize: 9, cellPadding: 1 }});
        pdf.save(`Range Chart - Firearm (${this.firearm.name}) - Round (${this.round.name}).pdf`);
    }

	ngOnInit() {
		this.dataService.getWeather().subscribe(weather => {
            this.weather = weather;
            this.speedOfSound = atmospherics.speedOfSound(this.weather.altitudeFeet);
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
                this.showMil = this.firearm.turretUnits==='Mil' || this.firearm.reticleUnits==='Mil';
                this.showMoA = this.firearm.turretUnits==='MoA' || this.firearm.reticleUnits==='MoA';
                this.showIPHY = this.firearm.turretUnits==='IPHY' || this.firearm.reticleUnits==='IPHY';
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
