import React from 'react';
import { useForm } from "react-hook-form";
import config from '../config';
import './form.css'

const Firearm = ({firearm, onClose, onSubmit, onDelete}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
    if(!firearm) {
        return null;
    }
    return (
        <div className="bal-form">
            <div className="card">
                <div className="card-heading d-flex p-2">
                    { firearm.id==='Add' ? `Add Firearm` : `Firearm - ${firearm.name}`}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`card-body`}>
                        <input hidden name="id" defaultValue={firearm.id} type="text" {...register("id")}/>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="name"
                                data-toggle="tooltip"
                                title="Name used to uniquely identify this firearm."
                            >
                                Name
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-file-o fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={firearm.name}
                                    name="name"
                                    placeholder="Name"
                                    {...register("name", {
                                        maxLength: { value: config.VALIDATION_LIMITS.FIREARM.NAME.maxLength, message: `Name has a maximum length of ${config.VALIDATION_LIMITS.FIREARM.NAME.maxLength}` },
                                        minLength: { value: config.VALIDATION_LIMITS.FIREARM.NAME.minLength, message: `Name has a minimum length of ${config.VALIDATION_LIMITS.FIREARM.NAME.minLength}` },
                                        required: "Name is required"
                                    })}
                                    required
                                    type="text"
                                />
                            </div>
                            {errors.name && errors.name.message ?
                                <div className="alert alert-danger">
                                    {errors.name.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="sightHeightInches"
                                data-toggle="tooltip"
                                title="Measured from bore centerline to scope centerline. Common heights are 1.5 to 2 inches."
                            >
                                Sight Height (inches)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-crosshairs fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={firearm.sightHeightInches}
                                    name="sightHeightInches"
                                    placeholder="Sight Height (inches)"
                                    {...register("sightHeightInches", {
                                        max: { value: config.VALIDATION_LIMITS.FIREARM.SIGHT_HEIGHT_INCHES.max, message: `Sight Height has a maximum value of ${config.VALIDATION_LIMITS.FIREARM.SIGHT_HEIGHT_INCHES.max}` },
                                        min: { value: config.VALIDATION_LIMITS.FIREARM.SIGHT_HEIGHT_INCHES.min, message: `Sight Height has a minimum value of ${config.VALIDATION_LIMITS.FIREARM.SIGHT_HEIGHT_INCHES.min}` },
                                        required: "Sight Height is required"
                                    })}
                                    required
                                    step="0.0005"
                                    type="number"
                                />
                            </div>
                            {errors.sightHeightInches && errors.sightHeightInches.message ?
                                <div className="alert alert-danger">
                                    {errors.sightHeightInches.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="zeroRange"
                                data-toggle="tooltip"
                                title="Range at which scope has been adjusted for point of aim = point of impact."
                            >
                                Zero Range
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-circle-o fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={firearm.zeroRange}
                                    name="zeroRange"
                                    placeholder="Zero Range"
                                    {...register("zeroRange", {
                                        max: { value: config.VALIDATION_LIMITS.FIREARM.ZERO_RANGE.max, message: `Zero Range has a maximum value of ${config.VALIDATION_LIMITS.FIREARM.ZERO_RANGE.max}` },
                                        min: { value: config.VALIDATION_LIMITS.FIREARM.ZERO_RANGE.min, message: `Zero Range has a minimum value of ${config.VALIDATION_LIMITS.FIREARM.ZERO_RANGE.min}` },
                                        required: "Zero Range is required, so bullet drop can be calculated properly"
                                    })}
                                    required
                                    type="number"
                                />
                                <select
                                    className="form-control"
                                    defaultValue={firearm.zeroRangeUnits}
                                    name="zeroRangeUnits"
                                    {...register("zeroRangeUnits", {
                                        required: true
                                    })}
                                >
                                    {config.OPTIONS.DISTANCE_UNITS.map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.zeroRange && errors.zeroRange.message ?
                                <div className="alert alert-danger">
                                    {errors.zeroRange.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="reticleUnits"
                                data-toggle="tooltip"
                                title="Scope crosshair hash mark separation.  Usually Minutes of Angle (MoA), Milliradian (Mil), or Inch Per Hundred Yards (IPHY)."
                            >
                                Reticle Units
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-spinner fa-fw"></i></span>
                                <select
                                    className="form-control"
                                    defaultValue={firearm.reticleUnits}
                                    name="reticleUnits"
                                    {...register("reticleUnits", {
                                        required: true
                                    })}
                                >
                                    {config.OPTIONS.RETICLE_UNITS.map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.reticleUnits && errors.reticleUnits.message ?
                                <div className="alert alert-danger">
                                    {errors.reticleUnits.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="elevationTurretGradients"
                                data-toggle="tooltip"
                                title="Number of elevation (up/down) turret clicks per turret unit.  Usually refered to as a fraction (ex: 1/4 MoA = 4 clicks per MoA)."
                            >
                                Elevation Turret (clicks per unit)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-align-center fa-fw"></i></span>
                                <select
                                    className="form-control"
                                    defaultValue={firearm.elevationTurretGradients}
                                    name="elevationTurretGradients"
                                    {...register("elevationTurretGradients", {
                                        required: true
                                    })}
                                >
                                    {config.OPTIONS.TURRET_GRADIENTS.map(gradient => (
                                        <option key={gradient} value={gradient}>{gradient}</option>
                                    ))}
                                </select>
                                <select
                                    className="form-control"
                                    defaultValue={firearm.turretUnits}
                                    name="turretUnits"
                                    {...register("turretUnits", {
                                        required: true
                                    })}
                                >
                                    {config.OPTIONS.TURRET_UNITS.map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.elevationTurretGradients && errors.elevationTurretGradients.message ?
                                <div className="alert alert-danger">
                                    {errors.elevationTurretGradients.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="windageTurretGradients"
                                data-toggle="tooltip"
                                title="Number of windage (up/down) turret clicks per turret unit.  Usually refered to as a fraction (ex: 1/4 MoA = 4 clicks per MoA)."
                            >
                                Windage Turret (clicks per unit)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-repeat fa-fw"></i></span>
                                <select
                                    className="form-control"
                                    defaultValue={firearm.windageTurretGradients}
                                    name="windageTurretGradients"
                                    {...register("windageTurretGradients", {
                                        required: true
                                    })}
                                >
                                    {config.OPTIONS.TURRET_GRADIENTS.map(gradient => (
                                        <option key={gradient} value={gradient}>{gradient}</option>
                                    ))}
                                </select>
                                <select
                                    className="form-control"
                                    defaultValue={firearm.turretUnits}
                                    name="turretUnits"
                                    {...register("turretUnits", {
                                        required: true
                                    })}
                                >
                                    {config.OPTIONS.TURRET_UNITS.map(unit => (
                                        <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.windageTurretGradients && errors.windageTurretGradients.message ?
                                <div className="alert alert-danger">
                                    {errors.windageTurretGradients.message}
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    <div className={`card-footer`}>
                        <button className="btn btn-success" type="submit"><span className="fa fa-check"></span> Save</button>&nbsp;
                        <button className="btn btn-warning" onClick={() => onClose()}> Close</button>&nbsp;
                        <button className="btn btn-danger" onClick={() => onDelete(firearm)}> Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Firearm;
