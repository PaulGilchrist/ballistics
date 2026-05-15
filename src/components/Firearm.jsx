import React from 'react';
import { useForm } from "react-hook-form";
import config from '../config';
import FormField from './FormField';
import FormCard from './FormCard';

const Firearm = ({firearm, onClose, onSubmit, onDelete}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', defaultValues: firearm });
    if(!firearm) {
        return null;
    }

    const zeroRangeUnitsSelect = (
        <select
            className="form-control"
            name="zeroRangeUnits"
            {...register("zeroRangeUnits", { required: true })}
        >
            {config.OPTIONS.DISTANCE_UNITS.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
            ))}
        </select>
    );

    const turretUnitsSelect = (
        <select
            className="form-control"
            name="turretUnits"
            {...register("turretUnits", { required: true })}
        >
            {config.OPTIONS.TURRET_UNITS.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
            ))}
        </select>
    );

    return (
        <FormCard
            title={firearm.id === 'Add' ? 'Add Firearm' : `Firearm - ${firearm.name}`}
            onSubmit={handleSubmit(onSubmit)}
            footer={
                <span>
                    <button className="btn btn-success" type="submit"><span className="fa fa-check"></span> Save</button>&nbsp;
                    <button className="btn btn-warning" onClick={() => onClose()}> Close</button>&nbsp;
                    <button className="btn btn-danger" onClick={() => onDelete(firearm)}> Delete</button>
                </span>
            }
        >
            <input hidden name="id" type="text" {...register("id")}/>
            <FormField
                name="name"
                label="Name"
                icon="fa fa-file-o fa-fw"
                placeholder="Name"
                tooltip="Name used to uniquely identify this firearm."
                rules={{
                    maxLength: { value: config.VALIDATION_LIMITS.FIREARM.NAME.maxLength, message: `Name has a maximum length of ${config.VALIDATION_LIMITS.FIREARM.NAME.maxLength}` },
                    minLength: { value: config.VALIDATION_LIMITS.FIREARM.NAME.minLength, message: `Name has a minimum length of ${config.VALIDATION_LIMITS.FIREARM.NAME.minLength}` },
                    required: "Name is required"
                }}
                register={register}
                errors={errors}
            />
            <FormField
                name="sightHeightInches"
                label="Sight Height (inches)"
                icon="fa fa-crosshairs fa-fw"
                placeholder="Sight Height (inches)"
                tooltip="Measured from bore centerline to scope centerline. Common heights are 1.5 to 2 inches."
                rules={{
                    max: { value: config.VALIDATION_LIMITS.FIREARM.SIGHT_HEIGHT_INCHES.max, message: `Sight Height has a maximum value of ${config.VALIDATION_LIMITS.FIREARM.SIGHT_HEIGHT_INCHES.max}` },
                    min: { value: config.VALIDATION_LIMITS.FIREARM.SIGHT_HEIGHT_INCHES.min, message: `Sight Height has a minimum value of ${config.VALIDATION_LIMITS.FIREARM.SIGHT_HEIGHT_INCHES.min}` },
                    required: "Sight Height is required"
                }}
                register={register}
                errors={errors}
            />
            <FormField
                name="riflingTwistInches"
                label="Rifling Twist (1:X)"
                icon="fa fa-cog fa-fw"
                type="number"
                placeholder="Rifling Twist (1:X)"
                tooltip="The rifling twist rate (inches per rotation) is required to calculate spin drift. Common values are 7 to 12 inches. A 1:10 twist means the bullet completes one full rotation every 10 inches."
                step="0.5"
                rules={{
                    max: { value: config.VALIDATION_LIMITS.FIREARM.RIFLING_TWIST_INCHES.max, message: `Rifling Twist has a maximum value of ${config.VALIDATION_LIMITS.FIREARM.RIFLING_TWIST_INCHES.max}` },
                    min: { value: config.VALIDATION_LIMITS.FIREARM.RIFLING_TWIST_INCHES.min, message: `Rifling Twist has a minimum value of ${config.VALIDATION_LIMITS.FIREARM.RIFLING_TWIST_INCHES.min}` },
                    required: "Rifling Twist is required for spin drift calculations"
                }}
                register={register}
                errors={errors}
            />
            <FormField
                name="zeroRange"
                label="Zero Range"
                icon="fa fa-circle-o fa-fw"
                placeholder="Zero Range"
                tooltip="Range at which scope has been adjusted for point of aim = point of impact."
                rules={{
                    max: { value: config.VALIDATION_LIMITS.FIREARM.ZERO_RANGE.max, message: `Zero Range has a maximum value of ${config.VALIDATION_LIMITS.FIREARM.ZERO_RANGE.max}` },
                    min: { value: config.VALIDATION_LIMITS.FIREARM.ZERO_RANGE.min, message: `Zero Range has a minimum value of ${config.VALIDATION_LIMITS.FIREARM.ZERO_RANGE.min}` },
                    required: "Zero Range is required, so bullet drop can be calculated properly"
                }}
                register={register}
                errors={errors}
                rightElement={zeroRangeUnitsSelect}
            />
            <FormField
                name="reticleUnits"
                label="Reticle Units"
                icon="fa fa-spinner fa-fw"
                tooltip="Scope crosshair hash mark separation. Usually Minutes of Angle (MoA), Milliradian (Mil), or Inch Per Hundred Yards (IPHY)."
                options={config.OPTIONS.RETICLE_UNITS}
                rules={{ required: true }}
                register={register}
                errors={errors}
            />
            <FormField
                name="elevationTurretGradients"
                label="Elevation Turret (clicks per unit)"
                icon="fa fa-align-center fa-fw"
                tooltip="Number of elevation (up/down) turret clicks per turret unit. Usually refered to as a fraction (ex: 1/4 MoA = 4 clicks per MoA)."
                options={config.OPTIONS.TURRET_GRADIENTS}
                rules={{ required: true }}
                register={register}
                errors={errors}
                rightElement={turretUnitsSelect}
            />
            <FormField
                name="windageTurretGradients"
                label="Windage Turret (clicks per unit)"
                icon="fa fa-repeat fa-fw"
                tooltip="Number of windage (up/down) turret clicks per turret unit. Usually refered to as a fraction (ex: 1/4 MoA = 4 clicks per MoA)."
                options={config.OPTIONS.TURRET_GRADIENTS}
                rules={{ required: true }}
                register={register}
                errors={errors}
                rightElement={turretUnitsSelect}
            />
        </FormCard>
    );
}

export default Firearm;
