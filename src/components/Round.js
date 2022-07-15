import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './form.css'

const Round = ({round, onClose, onDelete, onSubmit}) => {
    const { id, name, bulletBC, bulletDiameterInches, bulletWeightGrains, muzzleVelocityFPS } = round;
    const [isOpen, setIsOpen] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
    if(!round) {
        return null;
    }
    return (
        <div className="bal-form">
            <div className="card">
                <div className="card-heading bg-dark text-light d-flex p-2">
                    { id==='Add' ? `Add Round` : `Round - ${name}`}
                    <i className={`fa fa-fw ml-auto ${isOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`} onClick={() => setIsOpen(!isOpen)}></i>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`card-body ${!isOpen ? 'collapse' : null}`}>
                        <input hidden name="id" defaultValue={id} type="text" {...register("id")}/>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="name"
                                data-toggle="tooltip"
                                title="Name used to identify this round unique to the firearm."
                            >
                                Name
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-text-o fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={name}
                                    maxLength="50"
                                    minLength="3"
                                    name="name"
                                    placeholder="Name"
                                    {...register("name", {
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
                                htmlFor="bulletDiameterInches"
                                data-toggle="tooltip"
                                title="Bullet diameter is required so wind resistance can be calculated properly.  Common diameters are 0.022 to 0.050 inches."
                            >
                                Bullet Diameter (inches)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-superpowers fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={bulletDiameterInches}
                                    max="1"
                                    min="0.010"
                                    name="bulletDiameterInches"
                                    placeholder="Bullet Diameter (inches)"
                                    {...register("bulletDiameterInches", {
                                        max: { value: 1, message: "Bullet Diameter has a maximum value of 1" },
                                        min: { value: 0.010, message: "Bullet Diameter has a minimum value of 0.010" },
                                        required: "Bullet diameter is required so wind resistance can be calculated."
                                    })}
                                    required
                                    step="0.001"
                                    type="number"
                                />
                            </div>
                            {errors.bulletDiameterInches && errors.bulletDiameterInches.message ?
                                <div className="alert alert-danger">
                                    {errors.bulletDiameterInches.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="bulletWeightGrains"
                                data-toggle="tooltip"
                                title="Bullet weight is required, so inertia can be calculated properly."
                            >
                                Bullet Weight (grains)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-balance-scale fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={bulletWeightGrains}
                                    max="1000"
                                    min="10"
                                    name="bulletWeightGrains"
                                    placeholder="Bullet Weight (grains)"
                                    {...register("bulletWeightGrains", {
                                        max: { value: 1000, message: "Bullet Weight has a maximum value of 1000" },
                                        min: { value: 10, message: "Bullet Weight has a minimum value of 10" },
                                        required: "Bullet Weight is required, so bullet drop can be calculated properly."
                                    })}
                                    required
                                    step="1"
                                    type="number"
                                />
                            </div>
                            {errors.bulletWeightGrains && errors.bulletWeightGrains.message ?
                                <div className="alert alert-danger">
                                    {errors.bulletWeightGrains.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="muzzleVelocityFPS"
                                data-toggle="tooltip"
                                title="Muzzle velocity is required, so bullet deceleration can be calculated properly."
                            >
                                Muzzle Velocity (FPS)
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-signal fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={muzzleVelocityFPS}
                                    max="5000"
                                    min="100"
                                    name="muzzleVelocityFPS"
                                    placeholder="Muzzle Velocity (FPS)"
                                    {...register("muzzleVelocityFPS", {
                                        max: { value: 5000, message: "Muzzle Velocity has a maximum value of 5000" },
                                        min: { value: 100, message: "Muzzle Velocity has a minimum value of 100" },
                                        required: "Muzzle Velocity is required, so bullet drop can be calculated properly."
                                    })}
                                    required
                                    step="1"
                                    type="number"
                                />
                            </div>
                            {errors.muzzleVelocityFPS && errors.muzzleVelocityFPS.message ?
                                <div className="alert alert-danger">
                                    {errors.muzzleVelocityFPS.message}
                                </div>
                                : null
                            }
                        </div>
                        <div className="form-group">
                            <label
                                className="control-label"
                                htmlFor="bulletBC"
                                data-toggle="tooltip"
                                title="Bullet ballistic cooefficient is the aerodynamics of the bullet's ability to resist atmospheric density related deceleration."
                            >
                                Bullet Ballistic Cooefficient
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-google-wallet fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={bulletBC}
                                    max="1"
                                    min="0.010"
                                    name="bulletBC"
                                    placeholder="Bullet Ballistic Cooefficient"
                                    {...register("bulletBC", {
                                        max: { value: 1, message: "Bullet ballistic cooefficient has a maximum value of 1" },
                                        min: { value: 0.010, message: "Bullet ballistic cooefficient has a minimum value of 0.010" },
                                        required: "Bullet ballistic cooefficient is required, so wind resistance can be calculated properly."
                                    })}
                                    required
                                    step="0.001"
                                    type="number"
                                />
                            </div>
                            {errors.bulletBC && errors.bulletBC.message ?
                                <div className="alert alert-danger">
                                    {errors.bulletBC.message}
                                </div>
                                : null
                            }
                        </div>
                    </div>
                    <div className={`card-footer ${!isOpen ? 'collapse' : null}`}>
                        <button className="btn btn-success" type="submit"><span className="fa fa-check"></span> Save</button>&nbsp;
                        <button className="btn btn-warning" onClick={() => onClose()}> Close</button>&nbsp;
                        <button className="btn btn-danger" onClick={() => onDelete(round)}> Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Round;
