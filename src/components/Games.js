import React from 'react';
import { Link } from 'react-router-dom';
import history from '../utils/history';
import { useDataFromUrl } from '../utils/data';
import DownloadButton from './DownloadButton';
import { cloneConfiguration } from '../service/configuration';
import GamesListItem from './GamesListItem';
import { Row, Col } from 'react-bootstrap';
import GamesButtons from './GamesButtons';

const Games = () => {
    const { data: configurations, setData: setConfigurations } = useDataFromUrl(
        `/user/configs`
    );

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <GamesButtons privateConfig={true} />

                    {configurations !== null &&
                        configurations.map(config => (
                            <GamesListItem
                                configuration={config}
                                privateConfig={true}
                            />
                        ))}
                </Col>
            </Row>
        </>
    );
};

export default Games;
