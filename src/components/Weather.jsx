import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import config from '../config';
import weatherApi from '../utils/weatherApi';
import FormField from './FormField';
import FormCard from './FormCard';

const Weather = ({weatherData, onSubmit}) => {
    const { altitudeFeet, _temperatureDegreesFahrenheit, _barometricPressureInchesHg, _relativeHumidityPercent, _windVelocityMph, _windAngleDegrees, latitudeDegrees } = weatherData;
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: weatherData });
    const [isFetching, setIsFetching] = useState(false);

    const handleGetLocalWeather = () => {
        setIsFetching(true);
        weatherApi.getLocalWeather()
            .then((data) => {
                const updatedWeather = {
                    ...weatherData,
                    altitudeFeet: data.altitudeFeet ?? altitudeFeet,
                    latitudeDegrees: data.latitudeDegrees ?? latitudeDegrees,
                    temperatureDegreesFahrenheit: data.temperatureDegreesFahrenheit,
                    barometricPressureInchesHg: data.barometricPressureInchesHg,
                    relativeHumidityPercent: data.relativeHumidityPercent,
                    windVelocityMph: data.windVelocityMph
                };
                onSubmit(updatedWeather);
                reset(updatedWeather);
                toast.success('Local weather data loaded', config.TOAST_OPTIONS);
            })
            .catch((error) => {
                toast.error(error.message, config.TOAST_OPTIONS);
            })
            .finally(() => {
                setIsFetching(false);
            });
    };

    return (
        <FormCard
            title="Weather"
            cardClassName="weather"
            onSubmit={handleSubmit(onSubmit)}
            footer={
                <>
                    <button className="btn btn-info" type="button" onClick={handleGetLocalWeather} disabled={isFetching}>
                        {isFetching ? <><i className="fa fa-spinner fa-spin"></i> Loading...</> : <><i className="fa fa-map-marker"></i> Get Local Weather</>}
                    </button>
                    {'\u00A0'}
                    <button className="btn btn-success" type="submit"><span className="fa fa-check"></span> Save</button>
                </>
            }
        >
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
                name="latitudeDegrees"
                label="Latitude (degrees)"
                icon="fa fa-map-marker fa-fw"
                type="number"
                placeholder="Latitude (degrees)"
                tooltip="Shooter's latitude is required to calculate the Coriolis effect on the bullet. Positive for Northern Hemisphere, negative for Southern Hemisphere."
                step="1"
                min={config.VALIDATION_LIMITS.WEATHER.LATITUDE_DEGREES.min}
                max={config.VALIDATION_LIMITS.WEATHER.LATITUDE_DEGREES.max}
                rules={{
                    required: "Latitude is required to calculate the Coriolis effect",
                    min: { value: config.VALIDATION_LIMITS.WEATHER.LATITUDE_DEGREES.min, message: "Latitude has a minimum value of -90" },
                    max: { value: config.VALIDATION_LIMITS.WEATHER.LATITUDE_DEGREES.max, message: "Latitude has a maximum value of 90" }
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
        </FormCard>
    );
}

export default Weather;
