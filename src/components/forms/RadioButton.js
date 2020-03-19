import React from 'react';
import { useFormContext } from './Form';
import { Form } from 'react-bootstrap';

function RadioButton({ name, value, label, validationSchema, ...rest }) {
    const { register, errors } = useFormContext();

    return (
        <label {...rest}>
            <input
                type="radio"
                name={name}
                value={value}
                ref={register(validationSchema)}
            />
            {label}
        </label>
    );
}

export default RadioButton;
