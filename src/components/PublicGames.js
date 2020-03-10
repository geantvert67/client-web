import React from 'react';
import { useDataFromUrl } from '../utils/data';
import history from '../utils/history';
import DownloadButton from './DownloadButton';
import { cloneConfiguration } from '../service/configuration';
import GamesListItem from './GamesListItem';
import { Row, Col } from 'react-bootstrap';
import GamesButtons from './GamesButtons';

const PublicGames = () => {
    const { data: configurations, setData: setConfigurations } = useDataFromUrl(
        `/configs`
    );

    return (
        <>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <GamesButtons privateConfig={false} />

                    {configurations !== null &&
                        configurations.map(config => (
                            <GamesListItem
                                configuration={config}
                                privateConfig={false}
                            />
                        ))}
                </Col>
            </Row>
        </>
    );
};

export default PublicGames;
