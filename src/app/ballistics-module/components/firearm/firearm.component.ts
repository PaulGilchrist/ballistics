import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { Firearm } from '../../models/firearm.model';
import { Round } from '../../models/round.model';

@Component({
	selector: 'app-firearm',
	styleUrls: ['./firearm.component.css'],
	templateUrl: './firearm.component.html'
})
export class FirearmComponent implements OnInit {

	public editedFirearm: Firearm = null;
	public isOpen = true;
	public isPristine = true;

	private _firearm: Firearm = null;
	@Input()
	set firearm(firearm: Firearm) {
		if (firearm) {
			this.editedFirearm = {
				id: firearm.id,
				name: firearm.name,
				elevationTurretGradients: firearm.elevationTurretGradients,
				reticleUnits: firearm.reticleUnits,
				rounds: firearm.rounds,
				sightHeightInches: firearm.sightHeightInches,
				turretUnits: firearm.turretUnits,
				windageTurretGradients: firearm.windageTurretGradients,
				zeroRangeYards: firearm.zeroRangeYards,
			};
		} else {
			// Setup defaults
			this.editedFirearm = {
				id: null,
				name: null,
				elevationTurretGradients: null,
				reticleUnits: null,
				rounds: [],
				sightHeightInches: null,
				turretUnits: null,
				windageTurretGradients: null,
				zeroRangeYards: null,
			};
		}
		// Save the initial settings so we can reset if requested
		this._firearm = firearm;
	}

	private _mode = 'add';
	@Input()
	set mode(mode: string) {
		// Acceptable modes are 'add' or 'edit'
		this._mode = mode;
	}

	@Output() onChange = new EventEmitter<Firearm>();
	@Output() onClose = new EventEmitter();
	@Output() onDelete = new EventEmitter<Firearm>();
	@Output() onSave = new EventEmitter<Firearm>();

	ngOnInit() {
		// Initialize tooltips just for this component
		// $(document).ready(() => {
		// 	$('firearm [data-toggle="tooltip"]').tooltip({ container: 'body' });
		// });
	}


	cancel(form: any): void {
		// Reset the form back to the original object
		this.firearm = this._firearm;
		this.isPristine = true;
	}

	change(isValid: boolean) {
		if(isValid) {
			this.onChange.emit(this.editedFirearm);
		}
		this.isPristine = false;
	}

	close(isDirty: boolean = false) {
		this.onClose.emit();
	}

	delete() {
		this.onDelete.emit(this._firearm);
	}

	save(): void {
		// Save changes to this firearm
		this.onSave.emit(this.editedFirearm);
		this.isPristine = true;
	}

}
