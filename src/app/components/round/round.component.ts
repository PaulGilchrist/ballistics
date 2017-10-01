import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Round } from '../../models/round.model'

@Component({
     moduleId: module.id.toString(),
     selector: 'round',
     styleUrls: ['round.component.css'],
     templateUrl: 'round.component.html'
})
export class RoundComponent {

    public editedRound: Round = null;
    public isViewOnly: boolean = true;

    public _isOpen: boolean = true;
    @Input()
    set isOpen(isOpen: boolean) {
        this._isOpen = isOpen;
    }

    private _firearmName:string = '';
    @Input()
    set firearmName(name: string) {
        if (name) {
            this._firearmName = name;
        }
    }

    _round: Round = null;
    @Input()
    set round(round: Round) {
        if (round) {
            this._round = round;
            let editedRound = {
                id: round.id,
                firearmId: round.firearmId,
                name: round.name,
                bulletBC: round.bulletBC,
                bulletDiameterInches: round.bulletDiameterInches,
                bulletWeightGrains: round.bulletWeightGrains,
                muzzleVelocityFPS: round.muzzleVelocityFPS
            }
            this.editedRound = editedRound;
        }
    }

    // Bubble up that the form was saved
    @Output() onSave = new EventEmitter<Round>();

    edit() {
        this.isViewOnly = false;
    }

    save(): void {
        this.onSave.emit(this.editedRound);
        this.isViewOnly = true;
    }

    cancel(): void {
        // Reset the form back to the original object
        this.round = this._round;
        this.isViewOnly = true;
    }

}
