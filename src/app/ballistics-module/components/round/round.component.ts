import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Firearm } from '../../models/firearm.model';
import { Round } from '../../models/round.model';
import { Status } from '../../models/status.model';

import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-round',
	styleUrls: ['./round.component.css'],
	templateUrl: './round.component.html'
})
export class RoundComponent implements OnInit {

	firearmId: string = null;
	firearms: Firearm[] = null;
	round: Round = {
        id: null,
        name: null,
        bulletBC: null,
        bulletDiameterInches: null,
        bulletWeightGrains: null,
        muzzleVelocityFPS: null
	};
	isOpen = true;
    status: Status = null;
    get statusEnum() { return Status; }

    constructor(private dataService: DataService, private toastrService: ToastrService) { }

	ngOnInit() {
		this.dataService.getFirearms().subscribe(firearms => {
            this.firearms = firearms;
        });
		this.dataService.getFirearmId().subscribe(firearmId => {
            this.firearmId = firearmId;
        });
		this.dataService.getRoundId().subscribe(roundId => {
            if(this.firearms != null && this.firearmId != null && roundId != null) {
                this.round = this.firearms.find(f => f.id===this.firearmId).rounds.find(r => r.id===roundId);
            }
        });
		this.dataService.getStatus().subscribe(status => {
            this.status = status;
        });
	}

	close() {
		this.dataService.selectRound(null);
		this.dataService.updateStatus(Status.SelectRound);
	}

	delete() {
		this.dataService.deleteRound(this.firearmId, this.round.id);
        this.toastrService.success('Deleted','Round Status');
        this.close();
	}

	save(): void {
        if(this.status===Status.AddRound) {
		    this.dataService.insertRound(this.firearmId, this.round);
        } else {
		    this.dataService.updateRound(this.firearmId, this.round);
        }
        this.toastrService.success('Saved','Round Status');
	}

}
