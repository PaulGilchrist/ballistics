import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Firearm } from '../../models/firearm.model';

@Component({
	selector: 'app-firearm',
	styleUrls: ['./firearm.component.css'],
	templateUrl: './firearm.component.html'
})
export class FirearmComponent {

	public editedFirearm: Firearm = null;
	public isOpen = true;

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

    constructor(private toastrService: ToastrService) { }

	change(isValid: boolean) {
		if(isValid) {
			this.onChange.emit(this.editedFirearm);
		}
	}

	close() {
		this.onClose.emit();
	}

	delete() {
		this.onDelete.emit(this._firearm);
	}

	save(): void {
		// Save changes to this firearm
        this.toastrService.success('Firearm Saved', 'State Changed');
		this.onSave.emit(this.editedFirearm);
	}

}
