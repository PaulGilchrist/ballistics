import React from 'react';
import { useForm } from "react-hook-form";
import config from '../config';
import './form.css'
import FormField from './FormField';

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
                        <FormField
                            name="name"
                            label="Name"
                            icon="fa fa-text-o fa-fw"
                            type="text"
                            defaultValue={name}
                            placeholder="Name"
                            tooltip="Name used to identify this round unique to the firearm."
                            rules={{
                                maxLength: { value: config.VALIDATION_LIMITS.ROUND.NAME.maxLength, message: "Name has a maximum length of 50" },
                                minLength: { value: config.VALIDATION_LIMITS.ROUND.NAME.minLength, message: "Name has a minimum length of 3" },
                                required: "Name is required"
                            }}
                            register={register}
                            errors={errors}
                        />
                        <FormField
                            name="bulletDiameterInches"
                            label="Bullet Diameter (inches)"
                            icon="fa fa-superpowers fa-fw"
                            type="number"
                            defaultValue={bulletDiameterInches}
                            placeholder="Bullet Diameter (inches)"
                            tooltip="Bullet diameter is required so wind resistance can be calculated properly.  Common diameters are 0.022 to 0.050 inches."
                            step="0.001"
                            max={config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.max}
                            min={config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.min}
                            rules={{
                                max: { value: config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.max, message: "Bullet Diameter has a maximum value of 1" },
                                min: { value: config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.min, message: "Bullet Diameter has a minimum value of 0.010" },
                                required: "Bullet diameter is required so wind resistance can be calculated."
                            }}
                            register={register}
                            errors={errors}
                        />
                        <FormField
                            name="bulletWeightGrains"
                            label="Bullet Weight (grains)"
                            icon="fa fa-balance-scale fa-fw"
                            type="number"
                            defaultValue={bulletWeightGrains}
                            placeholder="Bullet Weight (grains)"
                            tooltip="Bullet weight is required, so inertia can be calculated properly."
                            step="1"
                            max={config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.max}
                            min={config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.min}
                            rules={{
                                max: { value: config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.max, message: "Bullet Weight has a maximum value of 1000" },
                                min: { value: config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.min, message: "Bullet Weight has a minimum value of 10" },
                                required: "Bullet Weight is required, so bullet drop can be calculated properly."
                            }}
                            register={register}
                            errors={errors}
                        />
                        <FormField
                            name="muzzleVelocityFPS"
                            label="Muzzle Velocity (FPS)"
                            icon="fa fa-signal fa-fw"
                            type="number"
                            defaultValue={muzzleVelocityFPS}
                            placeholder="Muzzle Velocity (FPS)"
                            tooltip="Muzzle velocity is required, so bullet deceleration can be calculated properly."
                            step="1"
                            max={config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.max}
                            min={config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.min}
                            rules={{
                                max: { value: config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.max, message: "Muzzle Velocity has a maximum value of 5000" },
                                min: { value: config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.min, message: "Muzzle Velocity has a minimum value of 100" },
                                required: "Muzzle Velocity is required, so bullet drop can be calculated properly."
                            }}
                            register={register}
                            errors={errors}
                        />
                        <FormField
                            name="bulletBC"
                            label="Bullet Ballistic Coefficient"
                            icon="fa fa-google-wallet fa-fw"
                            type="number"
                            defaultValue={bulletBC}
                            placeholder="Bullet Ballistic Coefficient"
                            tooltip="Bullet ballistic coefficient is the aerodynamics of the bullet's ability to resist atmospheric density related deceleration."
                            step="0.001"
                            max={config.VALIDATION_LIMITS.ROUND.BULLET_BC.max}
                            min={config.VALIDATION_LIMITS.ROUND.BULLET_BC.min}
                            rules={{
                                max: { value: config.VALIDATION_LIMITS.ROUND.BULLET_BC.max, message: "Bullet ballistic coefficient has a maximum value of 1" },
                                min: { value: config.VALIDATION_LIMITS.ROUND.BULLET_BC.min, message: "Bullet ballistic coefficient has a minimum value of 0.010" },
                                required: "Bullet ballistic coefficient is required, so wind resistance can be calculated properly."
                            }}
                            register={register}
                            errors={errors}
                        />
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
