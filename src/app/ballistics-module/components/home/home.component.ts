import { Component, OnInit } from '@angular/core';

import { Firearm } from '../../models/firearm.model';
import { Round } from '../../models/round.model';
import { Store } from '../../models/store.model';

import { DataService } from '../../services/data.service';

declare var toastr: any;

@Component({
	selector: 'app-home',
	styleUrls: ['./home.component.css'],
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

	public firearm: Firearm = null;
	public firearmMode = 'select'; // Valid modes are 'add', 'edit', or 'select'
	public graphHeight = 300;
	public graphType = 'line';
	public graphWidth = 300;
	public roundMode = 'select'; // Valid modes are 'add', 'edit', or 'select'

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getFirearms().subscribe(firearms => {
			if(firearms && firearms.length > 0) {
				this.firearmMode = 'select';
			} else {
				this.firearmMode = 'add';
			}
		});
	}

    exportData() {
        const json = JSON.stringify({
            firearms: this.dataService.firearms,
            target: this.dataService.currentTarget,
            weather: this.dataService.currentWeather
        });
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
                this.closeFirearm();
                // handle data processing
                const store: Store = JSON.parse(reader.result.toString());
                this.dataService.firearms = store.firearms;
                this.dataService.currentTarget = store.target;
                this.dataService.currentWeather = store.weather;
                console.log(store);
            };
            reader.readAsText(event.target.files[0]);
        }
    }

	addFirearm() {
		this.firearmMode = 'add';
	}

	addRound() {
		this.roundMode = 'add';
	}

	changeFirearm(firearm: Firearm) {
		this.dataService.currentFirearm = firearm;
		this.dataService.getRangeData();
	}

	changeRound(round: Round) {
		this.dataService.currentRound = round;
		this.dataService.getRangeData();
	}

	closeFirearm() {
		// Reset the selected round and firearm to null
		this.closeRound();
		this.dataService.currentFirearm = this.firearm = null;
		this.firearmMode = 'select';
	}

	closeRound() {
		this.dataService.currentRound = null;
		this.roundMode = 'select';
		this.dataService.getRangeData();
	}

	deleteFirearm(firearm: Firearm) {
		console.log('Home - deleteFirearm');
		if(this.dataService.deleteFirearm(firearm)) {
			toastr.info('Firearm deleted');
			this.closeFirearm();
		}
	}

	deleteRound(round: Round) {
		console.log(round);
		if(this.dataService.deleteRound(this.dataService.currentFirearm, round)) {
			toastr.info('Round deleted');
			this.closeRound();
		}
	}
	saveFirearm(firearm: Firearm) {
		if(this.firearmMode==='add') {
			if(this.dataService.insertFirearm(firearm)) {
				toastr.info('Firearm added');
				this.selectFirearm(firearm);
			}
		} else {
			if(this.dataService.updateFirearm(firearm)) {
				toastr.info('Firearm updated');
			}
		}
	}

	saveRound(round: Round) {
		if(this.roundMode==='add') {
			if(this.dataService.insertRound(this.dataService.currentFirearm, round)) {
				toastr.info('Round added');
				this.selectRound(round);
			}
		} else {
			if(this.dataService.updateRound(this.dataService.currentFirearm, round)) {
				toastr.info('Round updated');
			}
		}
	}

	selectFirearm(firearm: Firearm) {
		this.dataService.currentFirearm = this.firearm = firearm;
		this.firearmMode = 'edit';
		if(firearm.rounds && firearm.rounds.length > 0) {
			this.roundMode = 'select';
		} else {
			this.roundMode = 'add';
		}
	}

	selectRound(round: Round) {
		this.dataService.currentRound = round;
		this.roundMode = 'edit';
		this.dataService.getRangeData();
	}

	changeTarget() {
		this.dataService.updateTarget();
		this.dataService.getRangeData();
	}

	changeWeather() {
		this.dataService.updateWeather();
		this.dataService.getRangeData();
	}

}
