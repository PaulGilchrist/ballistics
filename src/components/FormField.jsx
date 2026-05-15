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

    // Convert defaultValue to string to match previous DOM-coercion behavior
    // (e.g., number inputs expect string values in jsdom tests)
    const safeDefault = defaultValue != null ? String(defaultValue) : defaultValue;

    const renderInput = () => {
        if (type === 'select' || options) {
            return (
                <select
                    className="form-control"
                    name={name}
                    {...register(name, { defaultValue: safeDefault, ...(rules || {}) })}
                >
                    {options && options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        }

        const inputProps = {
            className: 'form-control',
            name,
            placeholder,
            type,
            ...(required && { required }),
            ...(step && { step }),
            ...(max && { max }),
            ...(min && { min }),
            ...(onBlur && { onBlur }),
            ...register(name, { defaultValue: safeDefault, ...(rules || {}) })
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
