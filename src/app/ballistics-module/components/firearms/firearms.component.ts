import { Component, OnInit } from '@angular/core';

import { Firearm } from '../../models/firearm.model';
import { Status } from '../../models/status.model';

import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-firearms',
	styleUrls: ['./firearms.component.css'],
	templateUrl: './firearms.component.html'
})
export class FirearmsComponent implements OnInit {

	isOpen = true;
	firearms: Firearm[] = null;

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.dataService.getFirearms().subscribe(firearms => {
            this.firearms = firearms;
        });
	}

	add() {
		this.dataService.updateStatus(Status.AddFirearm);
	}

	select(firearm: Firearm) {
		this.dataService.selectFirearm(firearm.id);
		this.dataService.updateStatus(Status.SelectRound);
	}

}
