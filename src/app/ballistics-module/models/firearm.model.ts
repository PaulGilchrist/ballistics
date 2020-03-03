import { Round } from './round.model';

export interface Firearm {
	id: string;
	name: string;
	// Gradients are clicks required to match 1 full turret unit.
	// MoA and IPHY are 1, 2 or 4 displayed in select as 1, 1/2, 1/4 per click
	// Mil scopes are always 10 clicks per Mil shown as 1/10
	elevationTurretGradients: number;
	reticleUnits: string; // 'Mil', 'MoA', or 'IPHY'
	rounds: Array<Round>;
	sightHeightInches: number;
	turretUnits: string; // 'Mil', 'MoA', or 'IPHY'
	windageTurretGradients: number;
	zeroRangeUnits: string; // 'Yards' or 'Meters'
	zeroRange: number;
}
