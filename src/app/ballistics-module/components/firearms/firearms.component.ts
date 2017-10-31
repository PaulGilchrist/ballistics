import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Firearm } from '../../models/firearm.model'

@Component({
	selector: 'firearms',
	styleUrls: ['./firearms.component.css'],
	templateUrl: './firearms.component.html'
})
export class FirearmsComponent {

	public currentFirearm: Firearm = null;
	public isOpen = true;

	private _firearms: Array<Firearm> = null;
	@Input()
	set firearms(firearms: Array<Firearm>) {
		if (firearms) {
			this._firearms = firearms;
		} else {
			this.firearms = [];
		}
	}

	@Output() onAdd = new EventEmitter();
	add() {
		this.onAdd.emit();
	}

	@Output() onSelect = new EventEmitter<Firearm>();
	select(firearm: Firearm) {
		this.currentFirearm = firearm;
		this.onSelect.emit(this.currentFirearm);
	}

}
