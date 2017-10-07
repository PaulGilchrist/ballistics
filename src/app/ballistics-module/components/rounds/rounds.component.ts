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
	public isOpen = true;

	private _rounds: Array<Round> = [];
	@Input()
	set rounds(rounds: Array<Round>) {
		if (rounds) {
			this._rounds = rounds;
		} else {
			this._rounds = [];
		}
	}

	@Output() onAdd = new EventEmitter();
	add() {
		this.onAdd.emit();
	}

	@Output() onSelect = new EventEmitter<Round>();
	select(round: Round) {
		this.currentRound = round;
		this.onSelect.emit(this.currentRound);
	}

}
