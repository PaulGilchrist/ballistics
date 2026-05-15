import React from 'react';
import { useForm } from "react-hook-form";
import config from '../config';
import FormField from './FormField';
import FormCard from './FormCard';

const Round = ({round, onClose, onDelete, onSubmit}) => {
    const { id, name, bulletBC, bulletDiameterInches, bulletWeightGrains, muzzleVelocityFPS, dragModel } = round;
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: round });
    if(!round) {
        return null;
    }
    return (
        <FormCard
            title={id === 'Add' ? 'Add Round' : `Round - ${name}`}
            onSubmit={handleSubmit(onSubmit)}
            footer={
                <span>
                    <button className="btn btn-success" type="submit"><span className="fa fa-check"></span> Save</button>&nbsp;
                    <button className="btn btn-warning" onClick={() => onClose()}> Close</button>&nbsp;
                    <button className="btn btn-danger" onClick={() => onDelete(round)}> Delete</button>
                </span>
            }
        >
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
                    maxLength: { value: config.VALIDATION_LIMITS.ROUND.NAME.maxLength, message: config.VALIDATION_LIMITS.ROUND.NAME.messages.maxLength },
                    minLength: { value: config.VALIDATION_LIMITS.ROUND.NAME.minLength, message: config.VALIDATION_LIMITS.ROUND.NAME.messages.minLength },
                    required: config.VALIDATION_LIMITS.ROUND.NAME.messages.required
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
                    max: { value: config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.max, message: config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.messages.max },
                    min: { value: config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.min, message: config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.messages.min },
                    required: config.VALIDATION_LIMITS.ROUND.BULLET_DIAMETER_INCHES.messages.required
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
                    max: { value: config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.max, message: config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.messages.max },
                    min: { value: config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.min, message: config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.messages.min },
                    required: config.VALIDATION_LIMITS.ROUND.BULLET_WEIGHT_GRAINS.messages.required
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
                    max: { value: config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.max, message: config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.messages.max },
                    min: { value: config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.min, message: config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.messages.min },
                    required: config.VALIDATION_LIMITS.ROUND.MUZZLE_VELOCITY_FPS.messages.required
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
                    max: { value: config.VALIDATION_LIMITS.ROUND.BULLET_BC.max, message: config.VALIDATION_LIMITS.ROUND.BULLET_BC.messages.max },
                    min: { value: config.VALIDATION_LIMITS.ROUND.BULLET_BC.min, message: config.VALIDATION_LIMITS.ROUND.BULLET_BC.messages.min },
                    required: config.VALIDATION_LIMITS.ROUND.BULLET_BC.messages.required
                }}
                register={register}
                errors={errors}
            />
            <FormField
                name="dragModel"
                label="Drag Model"
                icon="fa fa-arrows-h fa-fw"
                type="select"
                defaultValue={dragModel || 'G1'}
                tooltip="G1 is standard for spitzer bullets; G7 is better for modern low-drag boat-tail bullets."
                options={['G1', 'G7']}
                register={register}
                errors={errors}
            />
        </FormCard>
    );
}

export default Round;
