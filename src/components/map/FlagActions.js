import React, { useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faChevronDown,
    faChevronUp,
    faDice,
    faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import { useFlag } from '../../utils/useFlag';
import { useForm } from 'react-hook-form';
import { IconOverlay } from '../OverlayTip';

function FlagActions({ action, setAction, setSleepingAction }) {
    const iconFlag = require('../../img/cristal.png');
    const { register, handleSubmit, reset } = useForm();
    const { removeAll, createRandom, showFlags, setShowFlags } = useFlag();
    const [isOpen, setIsOpen] = useState(false);

    const _createRandom = ({ nbFlags }) => {
        reset({ nbFlags: null });
        createRandom(nbFlags);
    };

    return (
        <>
            <Row
                className="mt-4 ml-1 mr-1 justify-content-between align-items-center pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3>Cristaux</h3>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
            </Row>
            {isOpen && (
                <Row className="mt-3 ml-1">
                    <IconOverlay tipKey="crystal" icon={iconFlag}>
                        <Col
                            xs="auto"
                            className={`mb-3 mr-3 actions-item ${action ===
                                'flags' && 'actions-item-selected'}`}
                            onClick={() =>
                                action === 'showPopup'
                                    ? setSleepingAction('flags')
                                    : setAction('flags')
                            }
                        >
                            <Image
                                style={{ maxWidth: '25px', maxHeight: '25px' }}
                                src={iconFlag}
                            />
                        </Col>
                    </IconOverlay>
                    <Col xs="auto" className="mb-3 mr-3 actions-item">
                        <form onSubmit={handleSubmit(_createRandom)}>
                            <input
                                className="input-map"
                                style={{ width: '75px' }}
                                type="number"
                                name="nbFlags"
                                ref={register}
                                required
                                min={1}
                                max={100}
                            />
                            <IconOverlay tipKey="dice">
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        padding: '0'
                                    }}
                                >
                                    <FontAwesomeIcon
                                        className="ml-2"
                                        icon={faDice}
                                        color="white"
                                    />
                                </button>
                            </IconOverlay>
                        </form>
                    </Col>
                    <IconOverlay tipKey="delete">
                        <Col
                            xs="auto"
                            className="mb-3 mr-3 actions-item"
                            onClick={removeAll}
                        >
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="danger"
                            />
                        </Col>
                    </IconOverlay>
                    <IconOverlay tipKey={showFlags ? 'mask' : 'unmask'}>
                        <Col
                            xs="auto"
                            className="mb-3 actions-item"
                            onClick={() => setShowFlags(!showFlags)}
                        >
                            <FontAwesomeIcon
                                icon={showFlags ? faEyeSlash : faEye}
                            />
                        </Col>
                    </IconOverlay>
                </Row>
            )}
        </>
    );
}

export default FlagActions;
