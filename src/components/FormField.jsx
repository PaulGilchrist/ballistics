import React from 'react';

const FormField = ({
    name,
    label,
    icon,
    type = 'text',
    defaultValue,
    placeholder,
    tooltip,
    rules,
    step,
    max,
    min,
    required,
    onBlur,
    options,
    rightElement,
    register,
    errors
}) => {
    const isError = errors && errors[name] && errors[name].message;

    const renderInput = () => {
        if (type === 'select' || options) {
            return (
                <select
                    className="form-control"
                    defaultValue={defaultValue}
                    name={name}
                    {...register(name, rules)}
                >
                    {options && options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        }

        const inputProps = {
            className: 'form-control',
            defaultValue,
            name,
            placeholder,
            type,
            ...(required && { required }),
            ...(step && { step }),
            ...(max && { max }),
            ...(min && { min }),
            ...(onBlur && { onBlur }),
            ...register(name, rules)
        };

        return <input {...inputProps} />;
    };

    return (
        <div className="form-group">
            <label
                className="control-label"
                htmlFor={name}
                data-toggle="tooltip"
                title={tooltip}
            >
                {label}
            </label>
            <div className="input-group margin-bottom-sm">
                {icon && <span className="input-group-text"><i className={icon}></i></span>}
                {renderInput()}
                {rightElement}
            </div>
            {isError ? <div className="alert alert-danger">{isError}</div> : null}
        </div>
    );
};

export default FormField;
