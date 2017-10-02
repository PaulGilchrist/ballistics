import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Firearm } from '../../models/firearm.model'

@Component({
     moduleId: module.id.toString(),
     selector: 'firearm',
     styleUrls: ['firearm.component.css'],
     templateUrl: 'firearm.component.html'
})
export class FirearmComponent {

    public editedFirearm: Firearm = null;
    public isViewOnly: boolean = true;

    public _isOpen: boolean = true;
    @Input()
    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
    }

    _firearm: Firearm = null;
    @Input()
    set firearm(firearm: Firearm) {
        if (firearm) {
            this._firearm = firearm;
            let editedFirearm = {
                id: firearm.id,
                userId: firearm.userId,
                name: firearm.name,
                elevationTurretGradients: firearm.elevationTurretGradients,
                reticleUnits: firearm.reticleUnits,
                rounds: firearm.rounds,
                sightHeightInches: firearm.sightHeightInches,
                turretUnits: firearm.turretUnits,
                windageTurretGradients:firearm.windageTurretGradients,
                zeroRangeYards: firearm.zeroRangeYards,
            }
            this.editedFirearm = editedFirearm;
        }
    }

    @Output() onChange = new EventEmitter();
    @Output() onSave = new EventEmitter<Firearm>();

    change() {
        this.isOpen = false;
        this.onChange.emit();
    }

    edit() {
        this.isViewOnly = false;
    }

    save(): void {
        this.onSave.emit(this.editedFirearm);
        this.isViewOnly = true;
    }

    cancel(): void {
        // Reset the form back to the original object
        this.firearm = this._firearm;
        this.isViewOnly = true;
    }
}