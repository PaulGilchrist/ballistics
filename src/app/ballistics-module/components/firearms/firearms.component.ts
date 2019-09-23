import { Component, OnInit } from '@angular/core';

import { Firearm } from '../../models/firearm.model';
import { StatusEnum } from '../../models/status-enum.model';

import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-firearms',
	styleUrls: ['./firearms.component.css'],
	templateUrl: './firearms.component.html'
})
export class FirearmsComponent implements OnInit {

	isOpen = true;
	firearms: Firearm[] = null;
	firearmId: string = null;
    status: StatusEnum = null;
    get statusEnum() { return StatusEnum; }

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.dataService.getFirearms().subscribe(firearms => {
            this.firearms = firearms;
        });
		this.dataService.getFirearmId().subscribe(firearmId => {
            this.firearmId = firearmId;
        });
		this.dataService.getStatus().subscribe(status => {
            this.status = status;
        });
	}

	add() {
		this.dataService.updateStatus(StatusEnum.AddFirearm);
	}

	select(firearm: Firearm) {
		this.dataService.selectFirearm(firearm.id);
		this.dataService.updateStatus(StatusEnum.SelectRound);
	}

}
