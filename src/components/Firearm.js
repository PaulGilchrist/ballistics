import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './form.css'

const Firearm = ({firearm, onClose, onDelete, onSubmit}) => {
    const { id, name, elevationTurretGradients, reticleUnits, sightHeightInches, turretUnits, windageTurretGradients, zeroRangeUnits, zeroRange } = firearm;
    const [isOpen, setIsOpen] = useState(true);
    const { register, errors, handleSubmit } = useForm({ mode: 'onBlur' });
    return (
        <div className="bal-form">
            <div className="card">
                <div className="card-heading bg-dark text-light d-flex p-2">
                    { id==='Add' ? `Add Firearm` : `Firearm - ${name}`}
                    <i className={`fa fa-fw ml-auto ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} onClick={() => setIsOpen(!isOpen)}></i>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`card-body ${!isOpen ? 'collapse' : null}`}>
                        <input hidden name="id" defaultValue={id} type="text" ref={register}/>
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
                                <div className="input-group-prepend"><div className="input-group-text"><i className="fa fa-file-o fa-fw"></i></div></div>
                                <input
                                    className="form-control"
                                    defaultValue={name}
                                    maxLength="50"
                                    minLength="3"
                                    name="name"
                                    placeholder="Name"
                                    ref={register({
                                        maxLength: { value: 50, message: "Name has a maximum length of 50" },
                                        minLength: { value: 3, message: "Name has a minimum length of 3" },
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
                                title="Measured form bore centerline to scope centerline. Common heights are 1.5 to 2 inches."
                            >
                                Sight Height (inches)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <div className="input-group-prepend"><div className="input-group-text"><i className="fa fa-crosshairs fa-fw"></i></div></div>
                                <input
                                    className="form-control"
                                    defaultValue={sightHeightInches}
                                    max="5"
                                    min="0.25"
                                    name="sightHeightInches"
                                    placeholder="Sight Height (inches)"
                                    ref={register({
                                        max: { value: 5, message: "Sight Height has a maximum value of 5" },
                                        min: { value: 0.25, message: "Sight Height has a minimum value of 0.25" },
                                        required: "Sight Height is required"
                                    })}
                                    required
                                    step="0.05"
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
                                <div className="input-group-prepend"><div className="input-group-text"><i className="fa fa-circle-o fa-fw"></i></div></div>
                                <input
                                    className="form-control"
                                    defaultValue={zeroRange}
                                    max="3000"
                                    min="25"
                                    name="zeroRange"
                                    placeholder="Zero Range"
                                    ref={register({
                                        max: { value: 3000, message: "Zero Range has a maximum value of 3000" },
                                        min: { value: 10, message: "Zero Range has a minimum value of 10" },
                                        required: "Zero Range is required, so bullet drop can be calculated properly"
                                    })}
                                    required
                                    type="number"
                                />
                                <select
                                    className="form-control"
                                    defaultValue={zeroRangeUnits}
                                    name="zeroRangeUnits"
                                    ref={register({
                                        required: true
                                    })}
                                >
                                    <option value='Yards'>Yards</option>
                                    <option value='Meters'>Meters</option>
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
                                <div className="input-group-prepend"><div className="input-group-text"><i className="fa fa-spinner fa-fw"></i></div></div>
                                <select
                                    className="form-control"
                                    defaultValue={reticleUnits}
                                    name="reticleUnits"
                                    ref={register({
                                        required: true
                                    })}
                                >
                                    <option value='Mil'>Mil</option>
                                    <option value='MoA'>MoA</option>
                                    <option value='IPHY'>IPHY</option>
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
                                <div className="input-group-prepend"><div className="input-group-text"><i className="fa fa-align-center fa-fw"></i></div></div>
                                <select
                                    className="form-control"
                                    defaultValue={elevationTurretGradients}
                                    name="elevationTurretGradients"
                                    ref={register({
                                        required: true
                                    })}
                                >
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='10'>10</option>
                                </select>
                                <select
                                    className="form-control"
                                    defaultValue={turretUnits}
                                    name="turretUnits"
                                    ref={register({
                                        required: true
                                    })}
                                >
                                    <option value='Mil'>Mil</option>
                                    <option value='MoA'>MoA</option>
                                    <option value='IPHY'>IPHY</option>
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
                                <div className="input-group-prepend"><div className="input-group-text"><i className="fa fa-repeat fa-fw"></i></div></div>
                                <select
                                    className="form-control"
                                    defaultValue={windageTurretGradients}
                                    name="windageTurretGradients"
                                    ref={register({
                                        required: true
                                    })}
                                >
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='10'>10</option>
                                </select>
                                <select
                                    className="form-control"
                                    defaultValue={turretUnits}
                                    name="turretUnits"
                                    ref={register({
                                        required: true
                                    })}
                                >
                                    <option value='Mil'>Mil</option>
                                    <option value='MoA'>MoA</option>
                                    <option value='IPHY'>IPHY</option>
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
                    <div className={`card-footer ${!isOpen ? 'collapse' : null}`}>
                        <button className="btn btn-success" type="submit"><span className="fa fa-check"></span> Save</button>&nbsp;
                        <button className="btn btn-warning" onClick={onClose}> Close</button>&nbsp;
                        <button className="btn btn-danger" onClick={onDelete}> Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Firearm;
