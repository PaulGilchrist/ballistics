export interface Target {
    id?: number,
    distanceYards: number,
    chartStepping: number,
    slantDegrees: number,
    speedMPH: number,
}

/*
    Validation messages and info

    'Distance is required to determine how far out to calculate ballistics data'
        min: 0,
        max: 5000
    'Chart stepping is required to determine how many rows to calculate'
        min: 10,
        max: 500
    'Slant degrees is required to determine vertical hold over or angle scope adjustments needed.  Both up and down slant angles result in the need to aim low.'
        min: 0,
        max: 90
    'Target speed is required to determine horizontal lead hold or scope adjustments needed.'

*/