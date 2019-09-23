export interface Range {
	rangeMeters: number;
	rangeYards: number;
	velocityFPS: number;
	energyFtLbs: number;
	timeSeconds: number;
	dropInches: number;
	verticalPositionInches: number;
	// Cross Winds take on full range value regardless of Slant To Target
	crossWindDriftInches: number;
	leadInches: number;
	slantDegrees: number;
	// All the remaining properties are computed
	verticalPositionMil: number;
	verticalPositionMoA: number;
	verticalPositionIPHY: number;
	crossWindDriftMil: number;
	crossWindDriftMoA: number;
	crossWindDriftIPHY: number;
	leadMil: number;
	leadMoA: number;
	leadIPHY: number;
	slantDropInches: number;
	slantMil: number;
	slantMoA: number;
	slantIPHY: number;
}
