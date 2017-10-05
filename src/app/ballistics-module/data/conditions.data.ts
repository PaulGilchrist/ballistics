import { Target } from '../models/target.model'
import { Weather } from '../models/weather.model'

export let TARGET: Target = {
	distanceYards: 100,
	chartStepping: 50,
	slantDegrees: 45,
	speedMPH: 3
}

export let WEATHER: Weather = {
	altitudeFeet: 0,
	temperatureDegreesFahrenheit: 59,
	barometericPressureInchesHg: 29.53,
	relativeHumidityPercent: 78,
	windVelocityMPH: 10,
	windAngleDegrees: 90
}
