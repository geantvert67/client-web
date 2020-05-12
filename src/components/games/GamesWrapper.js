import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import GamesListItem from './GamesListItem';
import { getGames } from '../../service/user';

const PAGE_SIZE = 15;

function GamesWrapper() {
    const [hasMore, setHasMore] = useState(true);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGames()
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    const fetchGames = () => {
        return getGames(games.length / PAGE_SIZE, PAGE_SIZE).then(res => {
            if (res.data.length < PAGE_SIZE) {
                setHasMore(false);
            }
            setGames([...games, ...res.data]);
        });
    };

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
                        <InfiniteScroll
                            dataLength={games.length}
                            next={fetchGames}
                            hasMore={hasMore}
                            loader={
                                <Row className="mt-3 justify-content-center">
                                    <Col xs="auto">
                                        <Spinner
                                            animation="border"
                                            variant="light"
                                        />
                                    </Col>
                                </Row>
                            }
                        >
                            {games.map(game => (
                                <GamesListItem key={game.id} game={game} />
                            ))}
                        </InfiniteScroll>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default GamesWrapper;
