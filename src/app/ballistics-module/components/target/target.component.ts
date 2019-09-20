import { Component, OnInit } from '@angular/core';

import { Target } from '../../models/target.model';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-target',
	styleUrls: ['./target.component.css'],
	templateUrl: './target.component.html'
})
export class TargetComponent implements OnInit {

	isOpen = true;
    target: Target = null;

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.dataService.getTarget().subscribe(target => {
            this.target = target;
        });
	}

	change(isValid: boolean) {
		if(isValid) {
            this.dataService.updateTarget(this.target);
		}
	}

}
