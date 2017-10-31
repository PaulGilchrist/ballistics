import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Round } from '../../models/round.model';

@Component({
		selector: 'rounds',
		styleUrls: ['./rounds.component.css'],
		templateUrl: './rounds.component.html'
})
export class RoundsComponent {

	public currentRound: Round = null;
	public isOpen = true;

	public _rounds: Array<Round> = [];
	@Input()
	set rounds(rounds: Array<Round>) {
		if (rounds) {
			this._rounds = rounds;
		} else {
			this._rounds = [];
		}
	}

	@Output() onAdd = new EventEmitter();
	@Output() onSelect = new EventEmitter<Round>();

	add() {
		this.onAdd.emit();
	}

	select(round: Round) {
		this.currentRound = round;
		this.onSelect.emit(this.currentRound);
	}

}
