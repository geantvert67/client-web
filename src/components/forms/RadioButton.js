import React from 'react';
import { useFormContext } from './Form';

function RadioButton({
    name,
    value,
    label,
    checked,
    validationSchema,
    ...rest
}) {
    const { register } = useFormContext();

    return (
        <label {...rest}>
            {label}
            <input
                type="radio"
                name={name}
                value={value}
                defaultChecked={checked}
                ref={register(validationSchema)}
            />
            <span className="checkmark"></span>
        </label>
    );
}

export default RadioButton;
