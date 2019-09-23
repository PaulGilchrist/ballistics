import { Component, OnInit } from '@angular/core';

import { Firearm } from '../../models/firearm.model';
import { Round } from '../../models/round.model';
import { StatusEnum } from '../../models/status-enum.model';

import { DataService } from '../../services/data.service';

@Component({
		selector: 'app-rounds',
		styleUrls: ['./rounds.component.css'],
		templateUrl: './rounds.component.html'
})
export class RoundsComponent implements OnInit {

	firearmId: string = null;
	firearms: Firearm[] = null;
	roundId: string = null;
	rounds: Round[] = null;
	isOpen = true;
    status: StatusEnum = null;
    get statusEnum() { return StatusEnum; }

    constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.getFirearms().subscribe(firearms => {
            this.firearms = firearms;
        });
		this.dataService.getFirearmId().subscribe(firearmId => {
            this.firearmId = firearmId;
            if(this.firearms != null && firearmId != null) {
                this.rounds = this.firearms.find(f => f.id===firearmId).rounds;
            }
        });
		this.dataService.getRoundId().subscribe(roundId => {
            this.roundId = roundId;
        });
        this.dataService.getStatus().subscribe(status => {
            this.status = status;
        });
	}

	add() {
		this.dataService.updateStatus(StatusEnum.AddRound);
	}

	select(round: Round) {
		this.dataService.selectRound(round.id);
	}

}
