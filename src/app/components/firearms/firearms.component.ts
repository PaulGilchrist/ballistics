import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Firearm } from '../../models/firearm.model'

@Component({
     moduleId: module.id.toString(),
     selector: 'firearms',
     styleUrls: ['firearms.component.css'],
     templateUrl: 'firearms.component.html'
})
export class FirearmsComponent {

    public currentFirearm: Firearm = null;

    public _isOpen: boolean = true;
    @Input()
    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
    }

    private _firearms: Array<Firearm> = null;
    @Input()
    set firearms(firearms: Array<Firearm>) {
        if (firearms && firearms.length > 0) {
            this._firearms = firearms;
        }
    }

    // Bubble up that the form was saved
    @Output() onSelect = new EventEmitter<Firearm>();

    addFirearm() {
        console.log('addFirearm() not implemented');
    }

    select(firearm: Firearm) {
        this.currentFirearm = firearm;
        this.onSelect.emit(this.currentFirearm);
    }

}