import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Target } from '../../models/target.model'
import { DataService } from '../../services/data.service'

@Component({
	moduleId: module.id.toString(),
	selector: 'target',
	styleUrls: ['target.component.css'],
	templateUrl: 'target.component.html'
})
export class TargetComponent implements OnInit {

	public isOpen = true;

	@Output() onChange = new EventEmitter();

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getTarget().subscribe();
	}

	change(isValid: boolean) {
		if(isValid) {
			this.onChange.emit();
		}
	}

}
