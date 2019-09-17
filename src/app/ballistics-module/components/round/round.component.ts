import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Round } from '../../models/round.model';

@Component({
	selector: 'app-round',
	styleUrls: ['./round.component.css'],
	templateUrl: './round.component.html'
})
export class RoundComponent {

	public editedRound: Round = null;
	public isOpen = true;

	private _mode = 'add';
	@Input()
	set mode(mode: string) {
		// Acceptable modes are 'add' and 'edit'
		this._mode = mode;
	}

	private _round: Round = null;
	@Input()
	set round(round: Round) {
		if (round) {
			this.editedRound = {
				id: round.id,
				name: round.name,
				bulletBC: round.bulletBC,
				bulletDiameterInches: round.bulletDiameterInches,
				bulletWeightGrains: round.bulletWeightGrains,
				muzzleVelocityFPS: round.muzzleVelocityFPS
			};
		} else {
			// Setup defaults
			this.editedRound = {
				id: null,
				name: null,
				bulletBC: null,
				bulletDiameterInches: null,
				bulletWeightGrains: null,
				muzzleVelocityFPS: null
			};
		}
		// Save the initial settings so we can reset if requested
		this._round = round;
	}

	@Output() onChange = new EventEmitter<Round>();
	@Output() onClose = new EventEmitter();
	@Output() onDelete = new EventEmitter<Round>();
	@Output() onSave = new EventEmitter<Round>();

    constructor(private toastrService: ToastrService) { }

	change(isValid: boolean) {
		if(isValid) {
			this.onChange.emit(this.editedRound);
		}
	}

	close() {
		this.onClose.emit();
	}

	delete() {
		this.onDelete.emit(this._round);
	}

	save(): void {
		// Save changes to this round
        this.toastrService.success('Round Saved', 'State Changed');
		this.onSave.emit(this.editedRound);
	}

}
