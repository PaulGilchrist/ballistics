import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { Round } from '../../models/round.model';
import { Store } from '../../models/store.model';

import { Firearm } from '../../models/firearm.model';
import { Range } from '../../models/range.model';
import { StatusEnum } from '../../models/status-enum.model';

import { DataService } from '../../services/data.service';

declare var toastr: any;

@Component({
	selector: 'app-home',
	styleUrls: ['./home.component.css'],
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

	firearmId: string = null;
	firearms: Firearm[] = null;
    ranges: Range[] = null;
	roundId: string = null;
    status: StatusEnum = null;
    get statusEnum() { return StatusEnum; }
	public graphHeight = 300;
	public graphType = 'line';
	public graphWidth = 300;

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getFirearmId().subscribe(firearmId => {
            this.firearmId = firearmId;
        });
		this.dataService.getFirearms().subscribe(firearms => {
            this.firearms = firearms;
        });
		this.dataService.getRoundId().subscribe(roundId => {
            this.roundId = roundId;
        });
		this.dataService.getStatus().subscribe(status => {
            this.status = status;
        });
		this.dataService.getRanges().subscribe(ranges => {
            this.ranges = ranges;
        });
	}

    exportData() {
        const store = this.dataService.export();
        const json = JSON.stringify(store);
        const blob = new Blob([json],{type:'application/json'});
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'ballisticsData.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    importData(event) {
        if (event.target.files.length !== 1) {
            console.error('No file selected');
        } else {
            const reader = new FileReader();
            reader.onloadend = (e) => {
                // handle data processing
                const store: Store = JSON.parse(reader.result.toString());
                this.dataService.import(store);
            };
            reader.readAsText(event.target.files[0]);
        }
    }

}
