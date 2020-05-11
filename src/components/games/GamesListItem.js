import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import moment from 'moment';

function GamesListItem({ game }) {
    const getColor = () => {
        if (game.hasWon) return '#68b684';
        else if (game.hasLost) return '#eb4646';
        else return '#d2d2d2';
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row className="align-items-center">
                    <Col
                        xs={2}
                        className="text-center"
                        style={{
                            textTransform: 'uppercase',
                            color: getColor()
                        }}
                    >
                        {game.hasWon
                            ? 'Victoire'
                            : game.hasLost
                            ? 'Défaite'
                            : 'Égalité'}
                    </Col>

                    <Col xs={10}>
                        <Card.Title>
                            <span className="priority">{game.Game.name}</span>
                            {' - '}
                            <span className="redirect">
                                {game.Game.gameMode}
                            </span>
                        </Card.Title>
                        <Card.Subtitle className="subtitle">
                            {moment(game.createdAt).format(
                                'DD/MM/YYYY à HH:mm'
                            )}
                        </Card.Subtitle>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default GamesListItem;
