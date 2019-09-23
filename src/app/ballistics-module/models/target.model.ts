import { LengthEnum } from './length-enum.model';

export interface Target {
	distanceUnits: LengthEnum;
	distance: number;
	chartStepping: number;
	sizeInches?: number;
	slantDegrees: number;
	speedMPH: number;
}
