import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import InputGroup from 'react-bootstrap/InputGroup';

function ConfigsFilter({ setName }) {
    const [search, setSearch] = useState('');
    const debounceSearch = useCallback(
        _.debounce(s => setName(s), 300),
        []
    );

    return (
        <Row className="mb-5">
            <Col>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            <FontAwesomeIcon icon={faSearch} color="white" />
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        type="text"
                        placeholder="Rechercher par nom"
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            debounceSearch(e.target.value);
                        }}
                    />
                </InputGroup>
            </Col>
        </Row>
    );
}

export default ConfigsFilter;
