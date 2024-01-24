import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './form.css'

import conversions from 'pg-conversions';

const Target = ({targetData, onSubmit}) => {
    const {distanceUnits, distance, chartStepping, sizeInches, sizeMils, slantDegrees, speedMPH} = targetData;
    const { register, getValues, handleSubmit, setValue, formState: { errors } } = useForm({ mode: 'onBlur' });
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
        <div className="bal-form">
            <div className="card">
                <div className="card-heading d-flex p-2">
                    Target
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`card-body`}>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="distance"
                                data-toggle="tooltip"
                                title="Distance measured from the muzzle to the target."
                            >
                                Distance
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-bullseye fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={distance}
                                    max="5000"
                                    min="0"
                                    onBlur={() => setValue('sizeMils', '')}
                                    placeholder="Distance"
                                    {...register("distance", {
                                        max: { value: 5000, message: "Distance has a maximum value of 5000" },
                                        min: { value: 0, message: "Distance has a minimum value of 0" },
                                        required: "Distance is required to determine how far out to calculate ballistics data"
                                    })}
                                    required
                                    type="number"
                                />
                                <select
                                    className="form-control"
                                    defaultValue={distanceUnits}
                                    {...register("distanceUnits", {
                                        required: true
                                    })}
                                >
                                    <option value='Yards'>Yards</option>
                                    <option value='Meters'>Meters</option>
                                </select>
                            </div>
                            {errors.distance && errors.distance.message ?
                                <div className="alert alert-danger">
                                    {errors.distance.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="sizeInches"
                                data-toggle="tooltip"
                                title="The size of the target in inches (optional).  Used in combination with the size of the target in Mils to determine the distance."
                            >
                                Size (Inches / Mils) - optional
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-ellipsis-v fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={sizeInches}
                                    max="120"
                                    min="1"
                                    placeholder="Size (inches)"
                                    onBlur={async () => setDistance()}
                                    {...register("sizeInches", {
                                        max: { value: 120, message: "Size (inches) has a maximum value of 120" },
                                        min: { value: 1, message: "Size (inches) has a minimum value of 1" },
                                    })}
                                    type="number"
                                />
                                <input
                                    className="form-control"
                                    defaultValue={sizeMils}
                                    max="100"
                                    min="0.1"
                                    onBlur={() => setDistance()}
                                    placeholder="Size (mils)"
                                    {...register("sizeMils", {
                                        max: { value: 100, message: "Size (mils) has a maximum value of 100" },
                                        min: { value: 0.1, message: "Size (mils) has a minimum value of 0.1" },
                                    })}
                                    step="0.1"
                                    type="number"
                                />
                            </div>
                            {errors.sizeInches && errors.sizeInches.message ?
                                <div className="alert alert-danger">
                                    {errors.sizeInches.message}
                                </div>
                                : null
                            }
                            {errors.sizeMils && errors.sizeMils.message ?
                                <div className="alert alert-danger">
                                    {errors.sizeMils.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="chartStepping"
                                data-toggle="tooltip"
                                title="Chart stepping is required to determine how many rows to calculate."
                            >
                                Chart Stepping (yards)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-bars fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={chartStepping}
                                    max="500"
                                    min="1"
                                    placeholder="Chart Stepping (yards)"
                                    {...register("chartStepping", {
                                        max: { value: 500, message: "Chart Stepping has a maximum value of 500" },
                                        min: { value: 1, message: "Chart Stepping has a minimum value of 1" },
                                        required: "Chart Stepping is required to determine how many rows to calculate"
                                    })}
                                    required
                                    type="number"
                                />
                            </div>
                            {errors.chartStepping && errors.chartStepping.message ?
                                <div className="alert alert-danger">
                                    {errors.chartStepping.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="slantDegrees"
                                data-toggle="tooltip"
                                title="The angle versus horizontal as measured between the muzzle and target.  Slant degrees is required to determine vertical hold over or angle scope adjustments needed.  Both up and down slant angles result in the need to aim low."
                            >
                                Slant (degrees)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-location-arrow fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={slantDegrees}
                                    max="500"
                                    min="10"
                                    placeholder="Slant (degrees)"
                                    {...register("slantDegrees", {
                                        max: { value: 500, message: "Slant has a maximum value of 500" },
                                        min: { value: 10, message: "Slant has a minimum value of 10" },
                                        required: "Slant is required to determine vertical hold over or angle scope adjustments needed.  Both up and down slant angles result in the need to aim low."
                                    })}
                                    required
                                    type="number"
                                />
                            </div>
                            {errors.slantDegrees && errors.slantDegrees.message ?
                                <div className="alert alert-danger">
                                    {errors.slantDegrees.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="speedMPH"
                                data-toggle="tooltip"
                                title="The speed the target is moving perpendicular to the line between the muzzle and target.  Target speed is required to determine horizontal lead hold or scope adjustments needed."
                            >
                                Speed (MPH)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-car fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={speedMPH}
                                    max="500"
                                    min="1"
                                    placeholder="Speed (MPH)"
                                    {...register("speedMPH", {
                                        max: { value: 500, message: "Speed has a maximum value of 500" },
                                        min: { value: 1, message: "Speed has a minimum value of 1" },
                                        required: "Target speed is required to determine horizontal lead hold or scope adjustments needed."
                                    })}
                                    required
                                    type="number"
                                />
                            </div>
                            {errors.speedMPH && errors.speedMPH.message ?
                                <div className="alert alert-danger">
                                    {errors.speedMPH.message}
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

export default Target;
