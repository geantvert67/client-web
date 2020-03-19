import React from 'react';
import { useFormContext } from './Form';
import { Form } from 'react-bootstrap';

function RadioButton({ name, value, label, validationSchema, ...rest }) {
    const { register, errors } = useFormContext();

    return (
        <label {...rest}>
            {label}
            <input
                type="radio"
                name={name}
                value={value}
                ref={register(validationSchema)}
            />
            <span class="checkmark"></span>
        </label>
    );
}

export default RadioButton;
