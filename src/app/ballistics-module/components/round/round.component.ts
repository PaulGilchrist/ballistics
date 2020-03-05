import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Firearm } from '../../models/firearm.model';
import { Round } from '../../models/round.model';
import { StatusEnum } from '../../models/status-enum.model';

import { DataService } from '../../services/data.service';
import drag from 'pg-drag';

@Component({
	selector: 'app-round',
	styleUrls: ['./round.component.css'],
	templateUrl: './round.component.html'
})
export class RoundComponent implements OnInit {

	firearmId: string = null;
	firearms: Firearm[] = null;
    optimalRiflingTwist: number;
	round: Round = null;
	roundId: string = null;
	isOpen = true;
    status: StatusEnum = null;
    get statusEnum() { return StatusEnum; }

    constructor(private dataService: DataService, private toastrService: ToastrService) { }

	ngOnInit(): void {
        this.resetForm();
		this.dataService.getFirearms().subscribe(firearms => {
            this.firearms = firearms;
        });
		this.dataService.getFirearmId().subscribe(firearmId => {
            this.firearmId = firearmId;
        });
		this.dataService.getRoundId().subscribe(roundId => {
            this.roundId = roundId;
            if(this.firearms != null && this.firearmId != null && roundId != null) {
                this.round = this.firearms.find(f => f.id===this.firearmId).rounds.find(r => r.id===roundId);
                // optimalBarrelTwist = this.dragService.optimalRiflingTwist(this.round.bulletDiameterInches, this.round.bulletLengthInches);
            } else {
                this.resetForm();
            }

        });
		this.dataService.getStatus().subscribe(status => {
            this.status = status;
        });
	}

	close(): void {
		this.dataService.selectRound(null);
		this.dataService.updateStatus(StatusEnum.SelectRound);
	}

	delete(): void {
		this.dataService.deleteRound(this.firearmId, this.round.id);
        this.toastrService.success('Deleted','Round Status');
        this.close();
	}

    resetForm(): void {
        this.round = {
            id: null,
            name: null,
            bulletBC: null,
            bulletDiameterInches: null,
            bulletWeightGrains: null,
            muzzleVelocityFPS: null
        };
    }

	save(): void {
        if(this.status===StatusEnum.AddRound) {
		    this.dataService.insertRound(this.firearmId, this.round);
        } else {
		    this.dataService.updateRound(this.firearmId, this.round);
        }
        this.toastrService.success('Saved','Round Status');
	}

}
