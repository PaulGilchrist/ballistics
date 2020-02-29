import { conversions } from './conversions';

const ballistics = {
	computeRange: (range) => {
		range.verticalPositionMil = conversions.inchesToMil(range.verticalPositionInches(), range.rangeYards());
		range.verticalPositionMoA = conversions.inchesToMinutesOfAngle(range.verticalPositionInches(), range.rangeYards());
		range.verticalPositionIPHY = conversions.inchesToIPHY(range.verticalPositionInches(), range.rangeYards());
		range.crossWindDriftMil = conversions.inchesToMil(range.crossWindDriftInches(), range.rangeYards());
		range.crossWindDriftMoA = conversions.inchesToMinutesOfAngle(range.crossWindDriftInches(), range.rangeYards());
		range.crossWindDriftIPHY = conversions.inchesToIPHY(range.crossWindDriftInches(), range.rangeYards());
		range.leadMil = conversions.inchesToMil(range.leadInches(), range.rangeYards());
		range.leadMoA = conversions.inchesToMinutesOfAngle(range.leadInches(), range.rangeYards());
		range.leadIPHY = conversions.inchesToIPHY(range.leadInches(), range.rangeYards());
		range.slantDropInches = range.dropInches() * (1-Math.cos(conversions.degreesToRadians(range.slantDegrees())));
		range.slantMil = conversions.inchesToMil(range.slantDropInches(), range.rangeYards());
		range.slantMoA = conversions.inchesToMinutesOfAngle(range.slantDropInches(), range.rangeYards());
		range.slantIPHY = conversions.inchesToIPHY(range.slantDropInches(), range.rangeYards());
	},
	getDefaultTurretGradients: (turretUnits) => {
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

export default ballistics;
