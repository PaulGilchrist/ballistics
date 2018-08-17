import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Target } from '../../models/target.model';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'target',
	styleUrls: ['./target.component.css'],
	templateUrl: './target.component.html'
})
export class TargetComponent implements OnInit {

	@Output() onChange = new EventEmitter();

	constructor(public dataService: DataService) {}

	ngOnInit() {
		this.dataService.getTarget().subscribe();
		// Initialize tooltips just for this component
		// $(document).ready(() => {
		// 	$('target [data-toggle="tooltip"]').tooltip({ container: 'body' });
		// });
	}

	change(isValid: boolean) {
		if(isValid) {
			this.onChange.emit();
		}
	}

}
