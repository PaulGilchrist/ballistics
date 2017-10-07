import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Round } from '../../models/round.model'

declare var $: any;
declare var toastr: any;

@Component({
	moduleId: module.id.toString(),
	selector: 'round',
	styleUrls: ['round.component.css'],
	templateUrl: 'round.component.html'
})
export class RoundComponent {

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
			}
		} else {
			// Setup defaults
			this.editedRound = {
				id: null,
				name: null,
				bulletBC: null,
				bulletDiameterInches: null,
				bulletWeightGrains: null,
				muzzleVelocityFPS: null
			}
		}
		//Save the initial settings so we can reset if requested
		this._round = round;
	}

	@Output() onChange = new EventEmitter<Round>();
	change(isValid: boolean) {
		if(isValid) {
			this.onChange.emit(this.editedRound);
		}
	}

	@Output() onClose = new EventEmitter();
	close(isDirty: boolean) {
		// Change to another firearm
		if(isDirty) {
			toastr.error('Round not saved');
		}
		this.onClose.emit();
	}

	@Output() onDelete = new EventEmitter<Round>();
	delete() {
		//Confirm before delete
		let self = this;
		$.confirm({
			title: 'Confirm!',
			content: 'Delete round?',
			icon: 'fa fa-warning',
			buttons: {
				confirm: {
					text: 'Confirm',
					btnClass: 'btn-success',
					action: function () {
						self.onDelete.emit(self._round);
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

	@Output() onSave = new EventEmitter<Round>();
	save(): void {
		// Save changes to this round
		this.onSave.emit(this.editedRound);
	}

	cancel(): void {
		// Reset the form back to the original object
		this.round = this._round;
	}

}
