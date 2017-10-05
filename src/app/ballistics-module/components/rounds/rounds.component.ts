import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Round } from '../../models/round.model'

@Component({
		moduleId: module.id.toString(),
		selector: 'rounds',
		styleUrls: ['rounds.component.css'],
		templateUrl: 'rounds.component.html'
})
export class RoundsComponent {

	public currentRound: Round = null;

	public _isOpen = true;
	@Input()
	set isOpen(isOpen: boolean) {
		this._isOpen = isOpen;
	}

	private _rounds: Array<Round> = null;
	@Input()
	set rounds(rounds: Array<Round>) {
		if (rounds && rounds.length > 0) {
			this._rounds = rounds;
		}
	}

	// Bubble up that the form was saved
	@Output() onSelect = new EventEmitter<Round>();

	addRound() {
		console.log('addRound() not implemented');
	}

	select(round: Round) {
		this.currentRound = round;
		this.onSelect.emit(this.currentRound);
	}

}
