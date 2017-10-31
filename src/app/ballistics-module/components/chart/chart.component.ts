import { Component, Input, OnInit } from '@angular/core';

import { Firearm } from '../../models/firearm.model'
import { Range } from '../../models/range.model'
import { Round } from '../../models/round.model'
import { Target } from '../../models/target.model'
import { Weather } from '../../models/weather.model'

import { DataService } from '../../services/data.service'

declare var $: any;

@Component({
	selector: 'chart',
	styleUrls: ['./chart.component.css'],
	templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {

	public isOpen = true;
	public showMil = true;
	public showMoA = true;
	public showIPHY = true;

	constructor(public dataService: DataService) {}

	ngOnInit() {
		// Assumes this component is not loaded until after we have a dataService with currentFirearm
		this.showMil = this.dataService.currentFirearm.turretUnits===0 || this.dataService.currentFirearm.reticleUnits===0;
		this.showMoA = this.dataService.currentFirearm.turretUnits===1 || this.dataService.currentFirearm.reticleUnits===1;
		this.showIPHY = this.dataService.currentFirearm.turretUnits===3 || this.dataService.currentFirearm.reticleUnits===3;
		this.dataService.getRangeData();
		//Initialize tooltips just for this component
		$(document).ready(() => {
			$('chart [data-toggle="tooltip"]').tooltip({
				container: 'body',
				trigger: 'hover click'
			});
		});
	}
}
