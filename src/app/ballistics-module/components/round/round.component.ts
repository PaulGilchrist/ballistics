import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { Round } from '../../models/round.model';

@Component({
	selector: 'app-round',
	styleUrls: ['./round.component.css'],
	templateUrl: './round.component.html'
})
export class RoundComponent implements OnInit {

	public editedRound: Round = null;
	public isOpen = true;
	public isPristine = true;

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

	ngOnInit() {
		// Initialize tooltips just for this component
		// $(document).ready(() => {
		// 	$('round [data-toggle="tooltip"]').tooltip({ container: 'body' });
		// });
	}

	change(isValid: boolean) {
		if(isValid) {
			this.onChange.emit(this.editedRound);
		}
	}

	cancel(): void {
		// Reset the form back to the original object
		this.round = this._round;
		this.isPristine = true;
	}

	close(isDirty: boolean = false) {
		// Change to another firearm
		if(isDirty) {
			toastr.error('Round not saved');
		}
		this.onClose.emit();
	}

	delete() {
		this.onDelete.emit(this._round);
	}

	save(): void {
		// Save changes to this round
		this.onSave.emit(this.editedRound);
	}

}
