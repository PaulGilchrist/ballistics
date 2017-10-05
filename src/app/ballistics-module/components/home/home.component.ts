import { Component, OnInit } from '@angular/core';

import { Firearm } from '../../models/firearm.model'
import { Round } from '../../models/round.model'

import { DataService } from '../../services/data.service'



@Component({
	moduleId: module.id.toString(),
	selector: 'app-home',
	styleUrls: ['home.component.css'],
	templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

	isConditionsOpen = true;
	isFirearmOpen = true;
	isFirearmsOpen = true;
	isRoundOpen = true;
	isRoundsOpen = true;

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getFirearms().subscribe();
	}

	onFirearmEdited(firearm: Firearm) {
		let currentFirearm = this.dataService.currentFirearm;
		this.dataService.currentFirearm = firearm;
		currentFirearm.id = firearm.id;
		currentFirearm.userId = firearm.userId;
		currentFirearm.name = firearm.name;
		currentFirearm.elevationTurretGradients = firearm.elevationTurretGradients;
		currentFirearm.reticleUnits = firearm.reticleUnits;
		currentFirearm.rounds = firearm.rounds;
		currentFirearm.sightHeightInches = firearm.sightHeightInches;
		currentFirearm.turretUnits = firearm.turretUnits;
		currentFirearm.windageTurretGradients =firearm.windageTurretGradients;
		currentFirearm.zeroRangeYards = firearm.zeroRangeYards;
	}

	onFirearmChange() {
		// Close everything except the firearm selection panel
		this.isConditionsOpen = this.isFirearmsOpen = this.isRoundOpen = this.isRoundsOpen = false;
		// Reset the selected round and firearm to null
		this.dataService.currentRound = this.dataService.currentFirearm = null;
		// Open the firearm selection panel so a new firearm can be selected
		this.isFirearmsOpen = true;
	}

	onFirearmSelected(firearm: Firearm) {
		// Close everything except the firearm selected and the round selection panel for that firearm
		this.isConditionsOpen = this.isFirearmsOpen = this.isRoundOpen = false;
		this.dataService.currentFirearm = firearm;
		this.isFirearmOpen = this.isRoundsOpen = true;
	}

	onRoundChange() {
		// Close the selected firearm, and open the list of firearms for a new one to be selected
		this.isConditionsOpen = this.isFirearmsOpen = this.isFirearmOpen = this.isRoundOpen = false;
		this.dataService.currentRound = null;
		this.isRoundsOpen = true;
		console.log(this.isRoundsOpen);
	}

	onRoundEdited(round: Round) {
		let currentRound = this.dataService.currentRound;
		this.dataService.currentRound = round;
		currentRound.id = round.id;
		currentRound.firearmId = round.firearmId;
		currentRound.name = round.name;
		currentRound.bulletBC = round.bulletBC;
		currentRound.bulletDiameterInches = round.bulletDiameterInches;
		currentRound.bulletWeightGrains = round.bulletWeightGrains;
		currentRound.muzzleVelocityFPS = round.muzzleVelocityFPS;
	}

	onRoundSelected(round: Round) {
		// Close everything except the round selected
		this.isConditionsOpen = this.isFirearmsOpen = this.isFirearmOpen = this.isRoundsOpen = false;
		this.dataService.currentRound = round;
		this.isRoundOpen = true;
	}

}
