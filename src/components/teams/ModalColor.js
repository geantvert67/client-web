import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import Color from './Color';

const ModalColor = ({
    show,
    setShow,
    color,
    setColor,
    colorChange,
    setColorChange
}) => {
    const [c, setC] = useState('#ff0000');
    const handleClose = () => setShow(false);
    const handleAdd = () => {
        setColorChange([...colorChange, c]);
        setShow(false);
    };
    return (
        <Modal show={show} onHide={handleClose} animation size="sm">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body centered>
                <SketchPicker
                    color={c}
                    onChangeComplete={color => setC(color.hex)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAdd}>
                    Ajouter la couleur
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalColor;
