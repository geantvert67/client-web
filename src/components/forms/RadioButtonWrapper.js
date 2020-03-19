import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useFormContext } from './Form';

function RadioButtonWrapper({ name, children }) {
    const { errors } = useFormContext();

    return (
        <Row>
            <Col>{children}</Col>
            <Col xs={12}>
                <div className="danger mt-2">
                    {errors[name] && errors[name].message}
                </div>
            </Col>
        </Row>
    );
}

export default RadioButtonWrapper;
