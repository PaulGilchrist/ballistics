import React from 'react';
import { useForm } from "react-hook-form";
import config from '../config';
import './form.css'

const Round = ({round, onClose, onDelete, onSubmit}) => {
    const { id, name, bulletBC, bulletDiameterInches, bulletWeightGrains, muzzleVelocityFPS } = round;
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' });
    if(!round) {
        return null;
    }
    return (
        <div className="bal-form">
            <div className="card">
                <div className="card-heading d-flex p-2">
                    { id==='Add' ? `Add Round` : `Round - ${name}`}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`card-body`}>
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
                                    maxLength={config.VALIDATION_LIMITS.ROUND.NAME.maxLength}
                                    minLength={config.VALIDATION_LIMITS.ROUND.NAME.minLength}
                                    name="name"
                                    placeholder="Name"
                                    {...register("name", {
                                        maxLength: { value: config.VALIDATION_LIMITS.ROUND.NAME.maxLength, message: "Name has a maximum length of 50" },
                                        minLength: { value: config.VALIDATION_LIMITS.ROUND.NAME.minLength, message: "Name has a minimum length of 3" },
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
                                    max={config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.max}
                                    min={config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.min}
                                    name="bulletDiameterInches"
                                    placeholder="Bullet Diameter (inches)"
                                    {...register("bulletDiameterInches", {
                                        max: { value: config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.max, message: "Bullet Diameter has a maximum value of 1" },
                                        min: { value: config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.min, message: "Bullet Diameter has a minimum value of 0.010" },
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
                                    max={config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.max}
                                    min={config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.min}
                                    name="bulletWeightGrains"
                                    placeholder="Bullet Weight (grains)"
                                    {...register("bulletWeightGrains", {
                                        max: { value: config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.max, message: "Bullet Weight has a maximum value of 1000" },
                                        min: { value: config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.min, message: "Bullet Weight has a minimum value of 10" },
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
                                    max={config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.max}
                                    min={config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.min}
                                    name="muzzleVelocityFPS"
                                    placeholder="Muzzle Velocity (FPS)"
                                    {...register("muzzleVelocityFPS", {
                                        max: { value: config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.max, message: "Muzzle Velocity has a maximum value of 5000" },
                                        min: { value: config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.min, message: "Muzzle Velocity has a minimum value of 100" },
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
                                title="Bullet ballistic coefficient is the aerodynamics of the bullet's ability to resist atmospheric density related deceleration."
                            >
                                Bullet Ballistic Coefficient
                            </label>
                            <div className="input-group margin-bottom-sm">
                                <span className="input-group-text"><i className="fa fa-google-wallet fa-fw"></i></span>
                                <input
                                    className="form-control"
                                    defaultValue={bulletBC}
                                    max={config.VALIDATION_LIMITS.ROUND.BULLET_BC.max}
                                    min={config.VALIDATION_LIMITS.ROUND.BULLET_BC.min}
                                    name="bulletBC"
                                    placeholder="Bullet Ballistic Coefficient"
                                    {...register("bulletBC", {
                                        max: { value: config.VALIDATION_LIMITS.ROUND.BULLET_BC.max, message: "Bullet ballistic coefficient has a maximum value of 1" },
                                        min: { value: config.VALIDATION_LIMITS.ROUND.BULLET_BC.min, message: "Bullet ballistic coefficient has a minimum value of 0.010" },
                                        required: "Bullet ballistic coefficient is required, so wind resistance can be calculated properly."
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
                    <div className={`card-footer`}>
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
