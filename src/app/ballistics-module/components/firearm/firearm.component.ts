import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Firearm } from '../../models/firearm.model';
import { StatusEnum } from '../../models/status-enum.model';

import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-firearm',
	styleUrls: ['./firearm.component.css'],
	templateUrl: './firearm.component.html'
})
export class FirearmComponent implements OnInit {

	firearms: Firearm[] = null;
	firearm: Firearm = null;
    firearmId: string = null;
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
            if(this.firearms != null && firearmId != null) {
                this.firearm = this.firearms.find(f => f.id===firearmId);
            } else {
               this.resetForm();
            }
        });
		this.dataService.getStatus().subscribe(status => {
            this.status = status;
        });
	}

	close(): void {
		this.dataService.selectFirearm(null);
		this.dataService.updateStatus(StatusEnum.selectFirearm);
	}

	delete(): void {
		this.dataService.deleteFirearm(this.firearm.id);
        this.toastrService.success('Deleted','Firearm Status');
        this.close();
	}

    resetForm(): void {
        this.firearm = {
            id: null,
            name: null,
            elevationTurretGradients: null,
            reticleUnits: 'Mil',
            rounds: [],
            sightHeightInches: null,
            turretUnits: 'Mil',
            windageTurretGradients: null,
            zeroRangeUnits: 'Yards',
            zeroRange: null
        };
    }

	save(): void {
        if(this.status===StatusEnum.addFirearm) {
		    this.dataService.insertFirearm(this.firearm);
        } else {
		    this.dataService.updateFirearm(this.firearm);
        }
		this.dataService.updateStatus(StatusEnum.selectRound);
        this.toastrService.success('Saved','Firearm Status');
	}

}
