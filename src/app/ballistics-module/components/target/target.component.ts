import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import { Target } from '../../models/target.model'
import { DataService } from '../../services/data.service'

@Component({
	moduleId: module.id.toString(),
	selector: 'target',
	styleUrls: ['target.component.css'],
	templateUrl: 'target.component.html'
})
export class TargetComponent implements OnInit {

	public isViewOnly = false;

	public _isOpen = true;
	@Input()
	set isOpen(isOpen: boolean) {
		this._isOpen = isOpen;
	}

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getTarget().subscribe();
	}

}
