import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import history from '../../utils/history';
import { getUsers, addMember } from '../../service/configuration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const AddMember = ({ configurationId, teamId, members, setMembers }) => {
    const [valid, setValid] = useState(false);
    const [name, setName] = useState('');
    const [member, setMember] = useState([]);
    const [loading, setLoading] = useState(false);
    const isValid = () => {
        setValid(!valid);
    };
    const handleClick = () => {
        addMember(configurationId, teamId, name)
            .then(res => setMembers([...members, res.data]))
            .catch(err => {
                setName('');
            });
        setValid(!valid);
    };

    const handleSearch = username => {
        setLoading(true);
        getUsers(username)
            .then(res => setMember(res.data))
            .finally(() => setLoading(false));
    };

    return (
        <>
            <Card className="dark-back">
                <Card.Body>
                    <Row>
                        <Col md="9">
                            <Card.Title>
                                <span className="redirect">
                                    Entrez un nom d'utilisateur
                                </span>
                            </Card.Title>
                        </Col>
                        <Col>
                            <FontAwesomeIcon
                                icon={faPlusSquare}
                                size="lg"
                                onClick={() => isValid()}
                            />
                        </Col>
                        {valid && (
                            <>
                                <Col md="9">
                                    <AsyncTypeahead
                                        id="concerned_member_typehead"
                                        labelKey="username"
                                        allowNew={false}
                                        multiple={false}
                                        minLength={2}
                                        onSearch={handleSearch}
                                        placeholder="Sélectionnez un membre à ajouter"
                                        isLoading={loading}
                                        options={member}
                                        renderMenuItemChildren={option => (
                                            <p key={option.id}>
                                                {option.username}
                                            </p>
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        variant="success"
                                        type="button"
                                        onClick={() => handleClick()}
                                    >
                                        Ajouter{' '}
                                    </Button>
                                </Col>
                            </>
                        )}
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default AddMember;
