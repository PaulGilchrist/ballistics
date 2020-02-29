import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import './target.css';
import conversions from './../common/conversions'

const Target = (props) => {
    // console.log(`Rendering Target`);
    /*
    props = {
        values: {
            distanceUnits // 0=Yards, 1=Meters
            distance
            chartStepping
            sizeInches
            slantDegrees
            speedMPH
        }
        onSubmit()
    }
    */
    const [isOpen, setIsOpen] = useState(true);
    const { register, errors, getValues, handleSubmit, setValue  } = useForm({ mode: 'onBlur' });
    const setDistance = () => {
        const values = getValues();
        console.log(values);
        // Given the size of a target in both inches and mils, will calculate and update the distance
        if(values.sizeInches !== '' && values.sizeMils !== '') {
            const distanceYards = conversions.sizeToDistance(values.sizeInches, values.sizeMils);
            const distance = Math.round(values.distanceUnits==="0" ? distanceYards : conversions.yardsToMeters(distanceYards));
            console.log(distance);
            setValue('distance', distance);
        }
    }
    return (
        <div className="card">
            <div className="card-heading bg-dark text-light d-flex p-2">
                Target
                <i className={`fa fa-fw ml-auto ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} onClick={() => setIsOpen(!isOpen)}></i>
            </div>
            <div className={`card-body ${!isOpen ? 'collapse' : null}`}>
                <form onSubmit={handleSubmit(props.onSubmit)}>
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
                            <div className="input-group-prepend"><div className="input-group-text"><i className="fa fa-bullseye fa-fw"></i></div></div>
                            <input
                                className="form-control"
                                defaultValue={props.values.distance}
                                name="distance"
                                onBlur={() => setValue('sizeMils', '')}
                                placeholder="Distance"
                                ref={register({
                                    max: { value: 5000, message: "Distance has a maximum value of 5000" },
                                    min: { value: 0, message: "Distance has a minimum value of 0" },
                                    required: "Distance is required to determine how far out to calculate ballistics data"
                                })}
                                step="1"
                                type="number"
                            />
                            <select
                                className="form-control"
                                defaultValue={props.values.distanceUnits}
                                name="distanceUnits"
                                ref={register({
                                    required: true
                                })}
                            >
                                <option value='0'>Yards</option>
                                <option value='1'>Meters</option>
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
                            <div className="input-group-prepend"><div className="input-group-text"><i className="fa fa-ellipsis-v fa-fw"></i></div></div>
                            <input
                                className="form-control"
                                defaultValue={props.values.sizeInches}
                                name="sizeInches"
                                placeholder="Size (inches)"
                                onBlur={() => setDistance()}
                                ref={register({
                                    max: { value: 120, message: "Size (inches) has a maximum value of 120" },
                                    min: { value: 0, message: "Size (inches) has a minimum value of 0.1" },
                                })}
                                type="number"
                            />
                            {errors.sizeInches && errors.sizeInches.message ?
                                <div className="alert alert-danger">
                                    {errors.sizeInches.message}
                                </div>
                                : null
                            }
                            <input
                                className="form-control"
                                defaultValue={props.values.sizeMils}
                                name="sizeMils"
                                onBlur={() => setDistance()}
                                placeholder="Size (mils)"
                                ref={register({
                                    max: { value: 100, message: "Size (mils) has a maximum value of 100" },
                                    min: { value: 0.1, message: "Size (mils) has a minimum value of 0.1" },
                                })}
                                step="0.1"
                                type="number"
                            />
                        </div>
                        {errors.sizeMils && errors.sizeMils.message ?
                            <div className="alert alert-danger">
                                {errors.sizeMils.message}
                            </div>
                            : null
                        }
                    </div>
                    <div className={`card-footer ${!isOpen ? 'collapse' : null}`}>
                        <button className="btn btn-success" type="submit"><span className="fa fa-check"></span> Save</button>&nbsp;
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Target;
