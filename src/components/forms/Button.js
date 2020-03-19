import React, { useState, useRef, useEffect } from 'react';
import { useFormContext } from './Form';
import { Spinner, Button as B } from 'react-bootstrap';

function Button({ children, loading = false, ...props }) {
    const { errors } = useFormContext();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current && ref.current.getBoundingClientRect().width) {
            setWidth(ref.current.getBoundingClientRect().width);
        }
        if (ref.current && ref.current.getBoundingClientRect().height) {
            setHeight(ref.current.getBoundingClientRect().height);
        }
    }, [children]);

    return (
        <B
            {...props}
            ref={ref}
            style={
                width && height
                    ? {
                          width: `${width}px`,
                          height: `${height}px`
                      }
                    : {}
            }
            disabled={Object.entries(errors).length > 0 || loading}
        >
            {loading ? (
                <Spinner animation="border" variant="light" />
            ) : (
                children
            )}
        </B>
    );
}

export default Button;
