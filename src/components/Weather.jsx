import React from 'react';
import { useForm } from "react-hook-form";
import config from '../config';
import './form.css'

const WEATHER_FIELD_CONFIG = {
    altitudeFeet: 'ALTITUDE_FEET',
    temperatureDegreesFahrenheit: 'TEMPERATURE_DEGREES_FAHRENHEIT',
    barometricPressureInchesHg: 'BAROMETRIC_PRESSURE_INCHES_HG',
    relativeHumidityPercent: 'RELATIVE_HUMIDITY_PERCENT',
    windVelocityMPH: 'WIND_VELOCITY_MPH',
    windAngleDegrees: 'WIND_ANGLE_DEGREES',
};

const Weather = ({weatherData, onSubmit}) => {
    const { altitudeFeet, temperatureDegreesFahrenheit, barometricPressureInchesHg, relativeHumidityPercent, windVelocityMPH, windAngleDegrees } = weatherData;
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
    return (
        <div className="bal-form">
            <div className="card weather">
                <div className="card-heading d-flex p-2">
                    Weather
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`card-body`}>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="altitudeFeet"
                                data-toggle="tooltip"
                                title="Distance above sea level. Altitude is used to determine atmospheric density."
                            >
                                Altitude (feet)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-globe fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={altitudeFeet}
                                    max={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.altitudeFeet].max}
                                    min={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.altitudeFeet].min}
                                    name="altitudeFeet"
                                    placeholder="Altitude (feet)"
                                    {...register("altitudeFeet", {
                                        max: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.altitudeFeet].max, message: "Altitude has a maximum value of 50000" },
                                        min: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.altitudeFeet].min, message: "Altitude has a minimum value of 0" },
                                        required: "Altitude is required to determine atmospheric density"
                                    })}
                                    required
                                    type="number"
                                />
                                {errors.altitudeFeet && errors.altitudeFeet.message ?
                                    <div className="alert alert-danger">
                                        {errors.altitudeFeet.message}
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="temperatureDegreesFahrenheit"
                                data-toggle="tooltip"
                                title="Degree or intensity of heat in the atmosphere."
                            >
                                Temperature (fahrenheit)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-snowflake-o fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={temperatureDegreesFahrenheit}
                                    max={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.temperatureDegreesFahrenheit].max}
                                    min={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.temperatureDegreesFahrenheit].min}
                                    placeholder="Temperature (fahrenheit)"
                                    {...register("temperatureDegreesFahrenheit", {
                                        max: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.temperatureDegreesFahrenheit].max, message: "Temperature has a maximum value of 200" },
                                        min: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.temperatureDegreesFahrenheit].min, message: "Temperature has a minimum value of 0" },
                                        required: "Temperature is required to determine atmospheric density"
                                    })}
                                    required
                                    type="number"
                                />
                            </div>
                            {errors.temperatureDegreesFahrenheit && errors.temperatureDegreesFahrenheit.message ?
                                <div className="alert alert-danger">
                                    {errors.temperatureDegreesFahrenheit.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="barometricPressureInchesHg"
                                data-toggle="tooltip"
                                title="Air pressure in the atmosphere measured in inches Hg."
                            >
                                Barometric Pressure (in Hg)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-cloud fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={barometricPressureInchesHg}
                                    max={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.barometricPressureInchesHg].max}
                                    min={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.barometricPressureInchesHg].min}
                                    placeholder="Barometric Pressure (in Hg)"
                                    {...register("barometricPressureInchesHg", {
                                        max: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.barometricPressureInchesHg].max, message: "Barometric Pressure has a maximum value of 100" },
                                        min: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.barometricPressureInchesHg].min, message: "Barometric Pressure has a minimum value of 0" },
                                        required: "Barometric Pressure is required to determine atmospheric density"
                                    })}
                                    required
                                    step="0.01"
                                    type="number"
                                />
                            </div>
                            {errors.barometricPressureInchesHg && errors.barometricPressureInchesHg.message ?
                                <div className="alert alert-danger">
                                    {errors.barometricPressureInchesHg.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="relativeHumidityPercent"
                                data-toggle="tooltip"
                                title="The percentage of moisture in the atmosphere."
                            >
                                Relative Humidity (%)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-tint fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={relativeHumidityPercent}
                                    max={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.relativeHumidityPercent].max}
                                    min={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.relativeHumidityPercent].min}
                                    placeholder="Relative Humidity (%)"
                                    {...register("relativeHumidityPercent", {
                                        max: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.relativeHumidityPercent].max, message: "Relative Humidity has a maximum value of 100" },
                                        min: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.relativeHumidityPercent].min, message: "Relative Humidity has a minimum value of 0" },
                                        required: "Relative Humidity is required to determine atmospheric density"
                                    })}
                                    required
                                    type="number"
                                />
                            </div>
                            {errors.relativeHumidityPercent && errors.relativeHumidityPercent.message ?
                                <div className="alert alert-danger">
                                    {errors.relativeHumidityPercent.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="windVelocityMPH"
                                data-toggle="tooltip"
                                title="Wind velocity is required to calculate bullet drift."
                            >
                                Wind Velocity (MPH)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-flag fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={windVelocityMPH}
                                    max={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.windVelocityMPH].max}
                                    min={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.windVelocityMPH].min}
                                    placeholder="Wind Velocity (MPH)"
                                    {...register("windVelocityMPH", {
                                        max: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.windVelocityMPH].max, message: "Wind Velocity has a maximum value of 200" },
                                        min: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.windVelocityMPH].min, message: "Wind Velocity has a minimum value of 0" },
                                        required: "Wind Velocity is required to calculate bullet drift"
                                    })}
                                    required
                                    type="number"
                                />
                            </div>
                            {errors.windVelocityMPH && errors.windVelocityMPH.message ?
                                <div className="alert alert-danger">
                                    {errors.windVelocityMPH.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="windAngleDegrees"
                                data-toggle="tooltip"
                                title="Wind velocity is required to calculate bullet drift."
                            >
                                Wind Angle (degrees)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-line-chart fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={windAngleDegrees}
                                    max={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.windAngleDegrees].max}
                                    min={config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.windAngleDegrees].min}
                                    placeholder="Wind Angle (degrees)"
                                    {...register("windAngleDegrees", {
                                        max: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.windAngleDegrees].max, message: "windVelocity has a maximum value of 90" },
                                        min: { value: config.VALIDATION_LIMITS.WEATHER[WEATHER_FIELD_CONFIG.windAngleDegrees].min, message: "windVelocity has a minimum value of 0" },
                                        required: "Wind Angle is required to determine the winds vector impact on bullet drift"
                                    })}
                                    required
                                    type="number"
                                />
                            </div>
                            {errors.windAngleDegrees && errors.windAngleDegrees.message ?
                                <div className="alert alert-danger">
                                    {errors.windAngleDegrees.message}
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    <div className={`card-footer`}>
                        <button className="btn btn-success" type="submit"><span className="fa fa-check"></span> Save</button>&nbsp;
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Weather;
