import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import { TARGET, WEATHER } from '../../data/conditions.data'

import { Firearm } from '../../models/firearm.model'
import { Range } from '../../models/range.model'
import { Round } from '../../models/round.model'
import { Target } from '../../models/target.model'
import { Weather } from '../../models/weather.model'

import { AtmosphericService } from '../../services/atmospheric.service'
import { ConversionService } from '../../services/conversion.service'
import { DataService } from '../../services/data.service'
import { DragService } from '../../services/drag.service'

@Component({
	moduleId: module.id.toString(),
	selector: 'chart',
	styleUrls: ['chart.component.css'],
	templateUrl: 'chart.component.html'
})
export class ChartComponent implements OnInit {

	showMil = true;
	showMoA = true;
	showIPHY = true;
	rangeData: Array<any>;

	public _isOpen = true;
	@Input()
	set isOpen(isOpen: boolean) {
		this._isOpen = isOpen;
	}

	constructor(private _atmosphericService: AtmosphericService, private _conversionService: ConversionService, public dataService: DataService, private _dragService: DragService) {}

	ngOnInit() {
		// Assumes this component is not loaded until after we have a dataService with currentFirearm, currentRound, currentTarget, and currentWeather
		this.showMil = this.dataService.currentFirearm.turretUnits===0 || this.dataService.currentFirearm.reticleUnits===0;
		this.showMoA = this.dataService.currentFirearm.turretUnits===1 || this.dataService.currentFirearm.reticleUnits===1;
		this.showIPHY = this.dataService.currentFirearm.turretUnits===3 || this.dataService.currentFirearm.reticleUnits===3;
		this.rangeData = this.dataService.getRangeData();
	}

}
