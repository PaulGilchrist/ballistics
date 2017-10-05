import { Injectable } from '@angular/core';

import { ConversionService } from './conversion.service';

@Injectable()
export class BallisticsService {

	constructor(public conversionService: ConversionService) {}

	computeRange(range: any) {
		range.verticalPositionMil = this.conversionService.inchesToMil(range.verticalPositionInches(), range.rangeYards());
		range.verticalPositionMoA = this.conversionService.inchesToMinutesOfAngle(range.verticalPositionInches(), range.rangeYards());
		range.verticalPositionIPHY = this.conversionService.inchesToIPHY(range.verticalPositionInches(), range.rangeYards());
		range.crossWindDriftMil = this.conversionService.inchesToMil(range.crossWindDriftInches(), range.rangeYards());
		range.crossWindDriftMoA = this.conversionService.inchesToMinutesOfAngle(range.crossWindDriftInches(), range.rangeYards());
		range.crossWindDriftIPHY = this.conversionService.inchesToIPHY(range.crossWindDriftInches(), range.rangeYards());
		range.leadMil = this.conversionService.inchesToMil(range.leadInches(), range.rangeYards());
		range.leadMoA = this.conversionService.inchesToMinutesOfAngle(range.leadInches(), range.rangeYards());
		range.leadIPHY = this.conversionService.inchesToIPHY(range.leadInches(), range.rangeYards());
		range.slantDropInches = range.dropInches() * (1-Math.cos(this.conversionService.degreesToRadians(range.slantDegrees())));
		range.slantMil = this.conversionService.inchesToMil(range.slantDropInches(), range.rangeYards());
		range.slantMoA = this.conversionService.inchesToMinutesOfAngle(range.slantDropInches(), range.rangeYards());
		range.slantIPHY = this.conversionService.inchesToIPHY(range.slantDropInches(), range.rangeYards());
	}

	getDefaultTurretGradients(turretUnits: number): number {
		// TurretUnits 0=Mil, 1=MoA, 2=IPHY
		if(turretUnits === 0) {
			// Mils turrets are usually 1/10 mil per gradient
			return 10;
		} else {
			// MoA and IPHY turrets are usually 1/4 MoA per gradient
			return 4;
		}
	}

}
