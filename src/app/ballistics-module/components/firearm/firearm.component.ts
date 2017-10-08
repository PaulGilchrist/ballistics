import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Firearm } from '../../models/firearm.model'
import { Round } from '../../models/round.model'

declare var $: any;
declare var toastr: any;

@Component({
	moduleId: module.id.toString(),
	selector: 'firearm',
	styleUrls: ['firearm.component.css'],
	templateUrl: 'firearm.component.html'
})
export class FirearmComponent {

	public editedFirearm: Firearm = null;
	public isOpen = true;
	public isPristine = true;

	ngOnInit() {
		//Initialize tooltips just for this component
		$(document).ready(() => {
			$('firearm [data-toggle="tooltip"]').tooltip({ container: 'body' });
		});
	}

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
	change(isValid: boolean) {
		if(isValid) {
			this.onChange.emit(this.editedFirearm);
		}
		this.isPristine = false;
	}

	@Output() onClose = new EventEmitter();
	close(isDirty: boolean = false) {
		this.onClose.emit();
	}

	@Output() onDelete = new EventEmitter<Firearm>();
	delete() {
		let self = this;
		$.confirm({
			title: 'Confirm!',
			content: 'Delete firearm?',
			icon: 'fa fa-warning',
			buttons: {
				confirm: {
					text: 'Confirm',
					btnClass: 'btn-success',
					action: function () {
						self.onDelete.emit(self._firearm);
					}
				},
				cancel: {
					text: 'Cancel',
					btnClass: 'btn-danger',
					action: function () {
						// $.alert('Canceled!');
					}
				},
			}
		});
	}

	@Output() onSave = new EventEmitter<Firearm>();
	save(): void {
		// Save changes to this firearm
		this.onSave.emit(this.editedFirearm);
		this.isPristine = true;
	}

	cancel(form: any): void {
		// Reset the form back to the original object
		this.firearm = this._firearm;
		this.isPristine = true;
	}
}
