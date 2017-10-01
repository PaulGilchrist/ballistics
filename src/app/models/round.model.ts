export interface Round {
    id: number,
    firearmId: number,
    name: string,
    bulletBC: number,
    bulletDiameterInches: number,
    bulletWeightGrains: number,
    muzzleVelocityFPS: number,
}

/*
    Validation messages and info

    'Round must be associated with a firearm'
    'Name is required'
        maxLength: 50
    'Bullet diameter is required so wind resistance can be calculated.  Common diameters are 0.022 to 0.050 inches'
        min: 0.010,
        max: 1
    'Bullet weight is required, so bullet drop can be calculated properly'
        min: 10,
        max: 1000
    'Muzzle velocity is required, so bullet drop can be calculated properly'
        min: 100,
        max: 5000
    'Bullet ballistic cooefficient is required, so wind resistance can be calculated properly'

*/