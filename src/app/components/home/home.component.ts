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

    isFirearmOpen: boolean = true;
    isFirearmsOpen: boolean = true;
    isRoundOpen: boolean = true;
    isRoundsOpen: boolean = true;

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

    onFirearmSelected(firearm: Firearm) {
        this.dataService.currentFirearm = firearm;
        this.isFirearmsOpen = false;
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
        this.dataService.currentRound = round;
        //this.isFirearmsOpen = false;
        this.isFirearmOpen = false;
        this.isRoundsOpen = false;
    }

}
