import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useDataFromUrl } from '../../utils/data';
import GamesListItem from './GamesListItem';

function GamesWrapper() {
    const { loading, error, data: games } = useDataFromUrl('/user/history');

    return (
        <Container className="my-5">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h3 className="mb-5">Historique des parties</h3>

                    {loading ? (
                        <Row className="justify-content-center">
                            <Col xs="auto">
                                <Spinner animation="border" variant="light" />
                            </Col>
                        </Row>
                    ) : error ? (
                        <p>Une erreur est survenue.</p>
                    ) : (
                        games.map(game => (
                            <GamesListItem key={game.id} game={game} />
                        ))
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default GamesWrapper;
