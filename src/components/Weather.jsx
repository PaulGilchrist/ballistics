import React from 'react';
import { useForm } from "react-hook-form";
import config from '../config';
import './form.css'
import FormField from './FormField';

const Weather = ({weatherData, onSubmit}) => {
    const { altitudeFeet, temperatureDegreesFahrenheit, barometricPressureInchesHg, relativeHumidityPercent, windVelocityMph, windAngleDegrees } = weatherData;
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: weatherData });
    return (
        <div className="bal-form">
            <div className="card weather">
                <div className="card-heading d-flex p-2">
                    Weather
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                        <FormField
                            name="altitudeFeet"
                            label="Altitude (feet)"
                            icon="fa fa-globe fa-fw"
                            type="number"
                            placeholder="Altitude (feet)"
                            tooltip="Distance above sea level. Altitude is used to determine atmospheric density."
                            min={config.VALIDATION_LIMITS.WEATHER.ALTITUDE_FEET.min}
                            max={config.VALIDATION_LIMITS.WEATHER.ALTITUDE_FEET.max}
                            rules={{
                                required: "Altitude is required to determine atmospheric density",
                                min: { value: config.VALIDATION_LIMITS.WEATHER.ALTITUDE_FEET.min, message: "Altitude has a minimum value of 0" },
                                max: { value: config.VALIDATION_LIMITS.WEATHER.ALTITUDE_FEET.max, message: "Altitude has a maximum value of 50000" }
                            }}
                            register={register}
                            errors={errors}
                        />
                        <FormField
                            name="temperatureDegreesFahrenheit"
                            label="Temperature (fahrenheit)"
                            icon="fa fa-snowflake-o fa-fw"
                            type="number"
                            placeholder="Temperature (fahrenheit)"
                            tooltip="Degree or intensity of heat in the atmosphere."
                            min={config.VALIDATION_LIMITS.WEATHER.TEMPERATURE_DEGREES_FAHRENHEIT.min}
                            max={config.VALIDATION_LIMITS.WEATHER.TEMPERATURE_DEGREES_FAHRENHEIT.max}
                            rules={{
                                required: "Temperature is required to determine atmospheric density",
                                min: { value: config.VALIDATION_LIMITS.WEATHER.TEMPERATURE_DEGREES_FAHRENHEIT.min, message: "Temperature has a minimum value of 0" },
                                max: { value: config.VALIDATION_LIMITS.WEATHER.TEMPERATURE_DEGREES_FAHRENHEIT.max, message: "Temperature has a maximum value of 200" }
                            }}
                            register={register}
                            errors={errors}
                        />
                        <FormField
                            name="barometricPressureInchesHg"
                            label="Barometric Pressure (in Hg)"
                            icon="fa fa-cloud fa-fw"
                            type="number"
                            placeholder="Barometric Pressure (in Hg)"
                            tooltip="Air pressure in the atmosphere measured in inches Hg."
                            step="0.01"
                            min={config.VALIDATION_LIMITS.WEATHER.BAROMETRIC_PRESSURE_INCHES_HG.min}
                            max={config.VALIDATION_LIMITS.WEATHER.BAROMETRIC_PRESSURE_INCHES_HG.max}
                            rules={{
                                required: "Barometric Pressure is required to determine atmospheric density",
                                min: { value: config.VALIDATION_LIMITS.WEATHER.BAROMETRIC_PRESSURE_INCHES_HG.min, message: "Barometric Pressure has a minimum value of 0" },
                                max: { value: config.VALIDATION_LIMITS.WEATHER.BAROMETRIC_PRESSURE_INCHES_HG.max, message: "Barometric Pressure has a maximum value of 100" }
                            }}
                            register={register}
                            errors={errors}
                        />
                        <FormField
                            name="relativeHumidityPercent"
                            label="Relative Humidity (%)"
                            icon="fa fa-tint fa-fw"
                            type="number"
                            placeholder="Relative Humidity (%)"
                            tooltip="The percentage of moisture in the atmosphere."
                            min={config.VALIDATION_LIMITS.WEATHER.RELATIVE_HUMIDITY_PERCENT.min}
                            max={config.VALIDATION_LIMITS.WEATHER.RELATIVE_HUMIDITY_PERCENT.max}
                            rules={{
                                required: "Relative Humidity is required to determine atmospheric density",
                                min: { value: config.VALIDATION_LIMITS.WEATHER.RELATIVE_HUMIDITY_PERCENT.min, message: "Relative Humidity has a minimum value of 0" },
                                max: { value: config.VALIDATION_LIMITS.WEATHER.RELATIVE_HUMIDITY_PERCENT.max, message: "Relative Humidity has a maximum value of 100" }
                            }}
                            register={register}
                            errors={errors}
                        />
                        <FormField
                            name="windVelocityMph"
                            label="Wind Velocity (MPH)"
                            icon="fa fa-flag fa-fw"
                            type="number"
                            placeholder="Wind Velocity (MPH)"
                            tooltip="Wind velocity is required to calculate bullet drift."
                            min={config.VALIDATION_LIMITS.WEATHER.WIND_VELOCITY_MPH.min}
                            max={config.VALIDATION_LIMITS.WEATHER.WIND_VELOCITY_MPH.max}
                            rules={{
                                required: "Wind Velocity is required to calculate bullet drift",
                                min: { value: config.VALIDATION_LIMITS.WEATHER.WIND_VELOCITY_MPH.min, message: "Wind Velocity has a minimum value of 0" },
                                max: { value: config.VALIDATION_LIMITS.WEATHER.WIND_VELOCITY_MPH.max, message: "Wind Velocity has a maximum value of 200" }
                            }}
                            register={register}
                            errors={errors}
                        />
                        <FormField
                            name="windAngleDegrees"
                            label="Wind Angle (degrees)"
                            icon="fa fa-line-chart fa-fw"
                            type="number"
                            placeholder="Wind Angle (degrees)"
                            tooltip="Wind velocity is required to calculate bullet drift."
                            min={config.VALIDATION_LIMITS.WEATHER.WIND_ANGLE_DEGREES.min}
                            max={config.VALIDATION_LIMITS.WEATHER.WIND_ANGLE_DEGREES.max}
                            rules={{
                                required: "Wind Angle is required to determine the winds vector impact on bullet drift",
                                min: { value: config.VALIDATION_LIMITS.WEATHER.WIND_ANGLE_DEGREES.min, message: "Wind Angle has a minimum value of 0" },
                                max: { value: config.VALIDATION_LIMITS.WEATHER.WIND_ANGLE_DEGREES.max, message: "Wind Angle has a maximum value of 90" }
                            }}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-success" type="submit"><span className="fa fa-check"></span> Save</button>&nbsp;
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Weather;
