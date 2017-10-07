import { Component, OnInit } from '@angular/core';

import { Firearm } from '../../models/firearm.model'
import { Round } from '../../models/round.model'

import { DataService } from '../../services/data.service'

declare var toastr: any;
declare var _: any;

@Component({
	moduleId: module.id.toString(),
	selector: 'app-home',
	styleUrls: ['home.component.css'],
	templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

	public firearm: Firearm = null;
	public firearmMode: string = 'select'; // Valid modes are 'add', 'edit', or 'select'
	public roundMode: string = 'select'; // Valid modes are 'add', 'edit', or 'select'

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getFirearms().subscribe(firearms => {
			if(firearms && firearms.length > 0) {
				this.firearmMode = 'select';
			} else {
				this.firearmMode = 'add';
			}
		});
	}

	addFirearm() {
		this.firearmMode = 'add';
	}

	addRound() {
		this.roundMode = 'add';
	}

	changeFirearm(firearm: Firearm) {
		this.dataService.currentFirearm = firearm;
		this.dataService.getRangeData();
	}

	changeRound(round: Round) {
		this.dataService.currentRound = round;
		this.dataService.getRangeData();
	}

	closeFirearm() {
		// Reset the selected round and firearm to null
		this.closeRound();
		this.dataService.currentFirearm = this.firearm = null;
		this.firearmMode = 'select';
	}

	closeRound() {
		this.dataService.currentRound = null;
		this.dataService.getRangeData();
	}

	deleteFirearm(firearm: Firearm) {
		console.log('Home - deleteFirearm');
		if(this.dataService.deleteFirearm(firearm)) {
			toastr.info('Firearm deleted');
			this.closeFirearm();
		}
	}

	deleteRound(round: Round) {
		console.log(round);
		if(this.dataService.deleteRound(this.dataService.currentFirearm, round)) {
			toastr.info('Round deleted');
			this.closeRound();
		}
	}
	saveFirearm(firearm: Firearm) {
		if(this.firearmMode==='add') {
			if(this.dataService.insertFirearm(firearm)) {
				toastr.info('Firearm added');
				this.selectFirearm(firearm);
			}
		} else {
			if(this.dataService.updateFirearm(firearm)) {
				toastr.info('Firearm updated');
			}
		}
	}

	saveRound(round: Round) {
		if(this.roundMode==='add') {
			if(this.dataService.insertRound(this.dataService.currentFirearm, round)) {
				toastr.info('Round added');
				this.selectRound(round);
			}
		} else {
			if(this.dataService.updateRound(this.dataService.currentFirearm, round)) {
				toastr.info('Round updated');
			}
		}
	}

	selectFirearm(firearm: Firearm) {
		this.dataService.currentFirearm = this.firearm = firearm;
		this.firearmMode = 'edit';
		if(firearm.rounds && firearm.rounds.length > 0) {
			this.roundMode = 'select';
		} else {
			this.roundMode = 'add';
		}
	}

	selectRound(round: Round) {
		this.dataService.currentRound = round;
		this.roundMode = 'edit';
		this.dataService.getRangeData();
	}

	changeTarget() {
		this.dataService.getRangeData();
	}

	changeWeather() {
		this.dataService.getRangeData();
	}

}
