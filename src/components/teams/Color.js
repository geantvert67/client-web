import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Color = ({ c, color, setColor }) => {
    return (
        <div
            className="div-color"
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
        >
            {c === color && <FontAwesomeIcon icon={faCheck} size="lg" />}
        </div>
    );
};

export default Color;
