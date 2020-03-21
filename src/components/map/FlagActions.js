import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faTrashAlt,
    faChevronDown,
    faChevronUp,
    faDice
} from '@fortawesome/free-solid-svg-icons';
import { useFlag } from '../../utils/useFlag';
import { useForm } from 'react-hook-form';

function FlagActions({ action, setAction }) {
    const { register, handleSubmit, reset } = useForm();
    const { removeAll, createRandom } = useFlag();
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
                <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronUp} />
            </Row>
            {isOpen && (
                <Row className="mt-3 ml-1">
                    <Col
                        xs="auto"
                        className={`mr-3 actions-item ${action === 'flags' &&
                            'actions-item-selected'}`}
                        onClick={() => setAction('flags')}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Col>
                    <Col xs="auto" className="mr-3 actions-item">
                        <form onSubmit={handleSubmit(_createRandom)}>
                            <input
                                style={{ width: '75px' }}
                                type="number"
                                name="nbFlags"
                                ref={register}
                                required
                                min={1}
                                max={100}
                            />

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
                        </form>
                    </Col>
                    <Col xs="auto" className="actions-item" onClick={removeAll}>
                        <FontAwesomeIcon icon={faTrashAlt} className="danger" />
                    </Col>
                </Row>
            )}
        </>
    );
}

export default FlagActions;
