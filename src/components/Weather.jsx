import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './form.css'

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
                                    max="50000"
                                    min="0"
                                    name="altitudeFeet"
                                    placeholder="Altitude (feet)"
                                    {...register("altitudeFeet", {
                                        max: { value: 50000, message: "Altitude has a maximum value of 50000" },
                                        min: { value: 0, message: "Altitude has a minimum value of 0" },
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
                                    max="200"
                                    min="0"
                                    placeholder="Temperature (fahrenheit)"
                                    {...register("temperatureDegreesFahrenheit", {
                                        max: { value: 200, message: "Temperature has a maximum value of 200" },
                                        min: { value: 0, message: "Temperature has a minimum value of 0" },
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
                                    max="100"
                                    min="0"
                                    placeholder="Barometric Pressure (in Hg)"
                                    {...register("barometricPressureInchesHg", {
                                        max: { value: 100, message: "Barometric Pressure has a maximum value of 100" },
                                        min: { value: 0, message: "Barometric Pressure has a minimum value of 0" },
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
                                    max="100"
                                    min="0"
                                    placeholder="Relative Humidity (%)"
                                    {...register("relativeHumidityPercent", {
                                        max: { value: 100, message: "Relative Humidity has a maximum value of 100" },
                                        min: { value: 0, message: "Relative Humidity has a minimum value of 0" },
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
                                    max="200"
                                    min="0"
                                    placeholder="Wind Velocity (MPH)"
                                    {...register("windVelocityMPH", {
                                        max: { value: 200, message: "Wind Velocity has a maximum value of 200" },
                                        min: { value: 0, message: "Wind Velocity has a minimum value of 0" },
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
                                    max="90"
                                    min="0"
                                    placeholder="Wind Angle (degrees)"
                                    {...register("windAngleDegrees", {
                                        max: { value: 90, message: "windVelocity has a maximum value of 90" },
                                        min: { value: 0, message: "windVelocity has a minimum value of 0" },
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
