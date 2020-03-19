import React from 'react';
import { useFormContext } from './Form';
import { Form } from 'react-bootstrap';

function Input({ children, name, validationSchema, ...rest }) {
    const { register, errors } = useFormContext();

    return (
        <Form.Group>
            <Form.Control
                name={name}
                ref={register(validationSchema)}
                {...rest}
            >
                {children}
            </Form.Control>
            <div className="danger mt-2">
                {errors[name] && errors[name].message}
            </div>
        </Form.Group>
    );
}

export default Input;
