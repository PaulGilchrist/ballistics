import { Component, OnInit } from '@angular/core';

import { Firearm } from '../../models/firearm.model';
import { Round } from '../../models/round.model';
import { Status } from '../../models/status.model';

import { DataService } from '../../services/data.service';

@Component({
		selector: 'app-rounds',
		styleUrls: ['./rounds.component.css'],
		templateUrl: './rounds.component.html'
})
export class RoundsComponent implements OnInit {

	firearms: Firearm[] = null;
	rounds: Round[] = null;
	isOpen = true;
    status: Status = null;
    get statusEnum() { return Status; }

    constructor(private dataService: DataService) { }

	ngOnInit() {
		this.dataService.getFirearms().subscribe(firearms => {
            this.firearms = firearms;
        });
		this.dataService.getFirearmId().subscribe(firearmId => {
            if(this.firearms != null && firearmId != null) {
                this.rounds = this.firearms.find(f => f.id===firearmId).rounds;
            }
        });
		this.dataService.getStatus().subscribe(status => {
            this.status = status;
        });
	}

	add() {
		this.dataService.updateStatus(Status.AddRound);
	}

	select(round: Round) {
		this.dataService.selectRound(round.id);
	}

}
