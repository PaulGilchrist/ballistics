import { Firearm } from '../models/firearm.model'
export let FIREARMS: Array<Firearm> = [
	{
		id: 1,
		userId: 1,
		name: 'SPR',
		elevationTurretGradients: 10,
		reticleUnits: 0,
		rounds: [
			{
				id: 1,
				firearmId: 1,
				name: 'TAP 5.56',
				bulletBC: 0.354,
				bulletDiameterInches: 0.224,
				bulletWeightGrains: 75,
				muzzleVelocityFPS: 2821
			},
			{
				id: 2,
				firearmId: 1,
				name: 'FGMM 69',
				bulletBC: 0.301,
				bulletDiameterInches: 0.224,
				bulletWeightGrains: 69,
				muzzleVelocityFPS: 2950
			},
			{
				id: 3,
				firearmId: 1,
				name: 'FGMM 77',
				bulletBC: 0.372,
				bulletDiameterInches: 0.224,
				bulletWeightGrains: 77,
				muzzleVelocityFPS: 2720
			},
			{
				id: 4,
				firearmId: 1,
				name: 'Handload 77',
				bulletBC: 0.372,
				bulletDiameterInches: 0.224,
				bulletWeightGrains: 77,
				muzzleVelocityFPS: 2823
			}
		],
		sightHeightInches: 2,
		turretUnits: 0,
		windageTurretGradients: 10,
		zeroRangeYards: 100
	},
	{
		id: 2,
		userId: 1,
		name: 'CTR',
		elevationTurretGradients: 10,
		reticleUnits: 0,
		rounds: [
			{
				id: 5,
				firearmId: 2,
				name: 'TAP 5.56',
				bulletBC: 0.354,
				bulletDiameterInches: 0.224,
				bulletWeightGrains: 75,
				muzzleVelocityFPS: 2680
			},
			{
				id: 6,
				firearmId: 2,
				name: 'FGMM 69',
				bulletBC: 0.301,
				bulletDiameterInches: 0.224,
				bulletWeightGrains: 69,
				muzzleVelocityFPS: 2810
			},
			{
				id: 7,
				firearmId: 2,
				name: 'FGMM 77',
				bulletBC: 0.372,
				bulletDiameterInches: 0.224,
				bulletWeightGrains: 77,
				muzzleVelocityFPS: 2580
			},
			{
				id: 8,
				firearmId: 2,
				name: 'Handload 77',
				bulletBC: 0.372,
				bulletDiameterInches: 0.224,
				bulletWeightGrains: 77,
				muzzleVelocityFPS: 2680
			}
				],
		sightHeightInches: 2,
		turretUnits: 0,
		windageTurretGradients: 10,
		zeroRangeYards: 100
	},
	{
		id: 3,
		userId: 1,
		name: 'OBR',
		elevationTurretGradients: 10,
		reticleUnits: 0,
		rounds: [
			{
				id: 9,
				firearmId: 3,
				name: 'FGGM 168',
				bulletBC: 0.462,
				bulletDiameterInches: 0.308,
				bulletWeightGrains: 168,
				muzzleVelocityFPS: 2650
			},
			{
				id: 10,
				firearmId: 3,
				name: 'FGMM 175',
				bulletBC: 0.505,
				bulletDiameterInches: 0.308,
				bulletWeightGrains: 175,
				muzzleVelocityFPS: 2600
			}
		],
		sightHeightInches: 2,
		turretUnits: 0,
		windageTurretGradients: 10,
		zeroRangeYards: 100
	},
	{
		id: 4,
		userId: 1,
		name: '10/22',
		elevationTurretGradients: 2,
		reticleUnits: 1,
		rounds: [
			{
				id: 11,
				firearmId: 4,
				name: 'Federal',
				bulletBC: 0.13,
				bulletDiameterInches: 0.22,
				bulletWeightGrains: 40,
				muzzleVelocityFPS: 1255
			}
		],
		sightHeightInches: 1.5,
		turretUnits: 1,
		windageTurretGradients: 2,
		zeroRangeYards: 50
	}
]
