import React from 'react';
import { useForm } from "react-hook-form";

import config from '../config';
import conversions from './../utils/conversions';
import FormField from './FormField';
import FormCard from './FormCard';

const Target = ({targetData, onSubmit}) => {
    const {_distanceUnits, _distance, _chartStepping, _sizeInches, _sizeMils, _slantDegrees, _speedMph} = targetData;
    const { register, getValues, handleSubmit, setValue, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: targetData });
    const setDistance = () => {
        const values = getValues();
        // Given the size of a target in both inches and mils, will calculate and update the distance
        if(values.sizeInches !== '' && values.sizeMils !== '') {
            const distanceYards = conversions.sizeToDistance(values.sizeInches, values.sizeMils);
            const distance = Math.round(values.distanceUnits==="Yards" ? distanceYards : conversions.yardsToMeters(distanceYards));
            setValue('distance', distance);
        }
    }
    return (
        <FormCard
            title="Target"
            onSubmit={handleSubmit(onSubmit)}
            footer={
                <button className="btn btn-success" type="submit"><span className="fa fa-check"></span> Save</button>
            }
        >
            <FormField
                name="distance"
                label="Distance"
                icon="fa fa-bullseye fa-fw"
                type="number"
                placeholder="Distance"
                tooltip="Distance measured from the muzzle to the target."
                rules={{
                    max: { value: config.VALIDATION_LIMITS.TARGET.DISTANCE.max, message: "Distance has a maximum value of 5000" },
                    min: { value: config.VALIDATION_LIMITS.TARGET.DISTANCE.min, message: "Distance has a minimum value of 0" },
                    required: "Distance is required to determine how far out to calculate ballistics data"
                }}
                required
                onBlur={() => setValue('sizeMils', '')}
                rightElement={
                    <select
                        className="form-control"
                        {...register("distanceUnits", {
                            required: true
                        })}
                    >
                        <option value='Yards'>Yards</option>
                        <option value='Meters'>Meters</option>
                    </select>
                }
                register={register}
                errors={errors}
            />
            <FormField
                name="sizeInches"
                label="Size (Inches / Mils) - optional"
                icon="fa fa-ellipsis-v fa-fw"
                type="number"
                placeholder="Size (inches)"
                tooltip="The size of the target in inches (optional).  Used in combination with the size of the target in Mils to determine the distance."
                rules={{
                    max: { value: config.VALIDATION_LIMITS.TARGET.SIZE_INCHES.max, message: "Size (inches) has a maximum value of 120" },
                    min: { value: config.VALIDATION_LIMITS.TARGET.SIZE_INCHES.min, message: "Size (inches) has a minimum value of 1" },
                }}
                onBlur={async () => setDistance()}
                rightElement={
                    <div>
                        <input
                            className="form-control"
                            max={config.VALIDATION_LIMITS.TARGET.SIZE_MILS.max}
                            min={config.VALIDATION_LIMITS.TARGET.SIZE_MILS.min}
                            onBlur={() => setDistance()}
                            placeholder="Size (mils)"
                            {...register("sizeMils", {
                                max: { value: config.VALIDATION_LIMITS.TARGET.SIZE_MILS.max, message: "Size (mils) has a maximum value of 100" },
                                min: { value: config.VALIDATION_LIMITS.TARGET.SIZE_MILS.min, message: "Size (mils) has a minimum value of 0.1" },
                            })}
                            step="0.1"
                            type="number"
                        />
                        {errors.sizeMils && errors.sizeMils.message ?
                            <div className="alert alert-danger">
                                {errors.sizeMils.message}
                            </div>
                            : null
                        }
                    </div>
                }
                register={register}
                errors={errors}
            />
            <FormField
                name="chartStepping"
                label="Chart Stepping (yards)"
                icon="fa fa-bars fa-fw"
                type="number"
                placeholder="Chart Stepping (yards)"
                tooltip="Chart stepping is required to determine how many rows to calculate."
                rules={{
                    max: { value: config.VALIDATION_LIMITS.TARGET.CHART_STEPPING.max, message: "Chart Stepping has a maximum value of 500" },
                    min: { value: config.VALIDATION_LIMITS.TARGET.CHART_STEPPING.min, message: "Chart Stepping has a minimum value of 1" },
                    required: "Chart Stepping is required to determine how many rows to calculate"
                }}
                required
                register={register}
                errors={errors}
            />
            <FormField
                name="slantDegrees"
                label="Slant (degrees)"
                icon="fa fa-location-arrow fa-fw"
                type="number"
                placeholder="Slant (degrees)"
                tooltip="The angle versus horizontal as measured between the muzzle and target.  Slant degrees is required to determine vertical hold over or angle scope adjustments needed.  Both up and down slant angles result in the need to aim low."
                rules={{
                    max: { value: config.VALIDATION_LIMITS.TARGET.SLANT_DEGREES.max, message: "Slant has a maximum value of 500" },
                    min: { value: config.VALIDATION_LIMITS.TARGET.SLANT_DEGREES.min, message: "Slant has a minimum value of 10" },
                    required: "Slant is required to determine vertical hold over or angle scope adjustments needed.  Both up and down slant angles result in the need to aim low."
                }}
                required
                register={register}
                errors={errors}
            />
            <FormField
                name="speedMph"
                label="Speed (MPH)"
                icon="fa fa-car fa-fw"
                type="number"
                placeholder="Speed (MPH)"
                tooltip="The speed the target is moving perpendicular to the line between the muzzle and target.  Target speed is required to determine horizontal lead hold or scope adjustments needed."
                rules={{
                    max: { value: config.VALIDATION_LIMITS.TARGET.SPEED_MPH.max, message: "Speed has a maximum value of 500" },
                    min: { value: config.VALIDATION_LIMITS.TARGET.SPEED_MPH.min, message: "Speed has a minimum value of 1" },
                    required: "Target speed is required to determine horizontal lead hold or scope adjustments needed."
                }}
                required
                register={register}
                errors={errors}
            />
        </FormCard>
    );
}

export default Target;
