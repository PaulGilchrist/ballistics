import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Firearm } from '../../models/firearm.model';

@Component({
	selector: 'app-firearms',
	styleUrls: ['./firearms.component.css'],
	templateUrl: './firearms.component.html'
})
export class FirearmsComponent {

	public isOpen = true;
	public currentFirearm: Firearm = null;

	public _firearms: Array<Firearm> = null;
	@Input()
	set firearms(firearms: Array<Firearm>) {
		if (firearms) {
			this._firearms = firearms;
		} else {
			this.firearms = [];
		}
	}

	@Output() onAdd = new EventEmitter();
	@Output() onSelect = new EventEmitter<Firearm>();

	add() {
		this.onAdd.emit();
	}

	select(firearm: Firearm) {
		this.currentFirearm = firearm;
		this.onSelect.emit(this.currentFirearm);
	}

}
