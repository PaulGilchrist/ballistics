import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { ConversionService } from '../../services/conversion.service';

import { Target } from '../../models/target.model';

@Component({
	selector: 'app-target',
	styleUrls: ['./target.component.css'],
	templateUrl: './target.component.html'
})
export class TargetComponent implements OnInit {

	isOpen = true;
    target: Target = null;
    targetSizeMils: number = null;

	constructor(private dataService: DataService, private conversionService: ConversionService) {}

	ngOnInit(): void {
		this.dataService.getTarget().subscribe(target => {
            this.target = target;
        });
	}

	change(isValid: boolean): void {
		if(isValid) {
            this.dataService.updateTarget(this.target);
		}
	}

    getDistance(): void {
        // Given the size of a target in both inches and mils, will calculate and update the distance
        if(this.target != null && this.target.sizeInches != null && this.targetSizeMils != null) {
            const distanceYards = this.conversionService.sizeToDistance(this.target.sizeInches, this.targetSizeMils);
            this.target.distance = this.target.distanceUnits==='Yards' ? distanceYards : this.conversionService.yardsToMeters(distanceYards);
        }
    }

}
