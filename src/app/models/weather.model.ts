export interface Weather {
    id?: number,
    altitudeFeet: number,
    temperatureDegreesFahrenheit: number,
    barometericPressureInchesHg: number,
    relativeHumidityPercent: number,
    windVelocityMPH: number,
    windAngleDegrees: number
}

/*
    Validation messages and info

m.id = ko.observable(data.id);  //id is not required unless later we decide to server store weather data
'Altitude is required to determine atmospheric density.'
    min: 0,
    max: 50000
'Temperature is required to determine atmospheric density.'
    min: 0,
    max: 200
'Barometeric Pressure is required to determine atmospheric density.'
    min: 0,
    max: 100
'Relative Humidity is required to determine atmospheric density.'
    min: 0,
    max: 100
'Wind Velocity is required to calculate bullet drift.'
    min: 0,
    max: 200
'Wind Angle is required to determine the winds vector impact on bullet drift.  Allowed values are 0-90 degrees.'
    min: 0,
    max: 90

*/
