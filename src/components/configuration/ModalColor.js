import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="color"
                    value={c}
                    onChange={e => setC(e.target.value)}
                    id="colorWell"
                ></input>
                <Color c={c} color={color} setColor={setColor} />
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
