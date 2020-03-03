export interface Target {
	distanceUnits: string; // 'Yards' or 'Meters'
	distance: number;
	chartStepping: number;
	sizeInches?: number;
	slantDegrees: number;
	speedMPH: number;
}
