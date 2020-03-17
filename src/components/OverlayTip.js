import React from 'react';
import { OverlayTrigger, Tooltip, Image, Row, Col } from 'react-bootstrap';
import { TIPS } from '../utils/tips';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export function HelpButton({ tipKey }) {
    const tip = TIPS[tipKey];

    return (
        <>
            <OverlayTrigger
                placement={tip.placement}
                overlay={<Tooltip>{tip.tip}</Tooltip>}
            >
                <FontAwesomeIcon icon={faQuestionCircle} size="lg" />
            </OverlayTrigger>{' '}
        </>
    );
}

export function ItemModelName({ model }) {
    const tip = TIPS[model.tipKey];
    const src = require('../img/' + tip.image);

    return (
        <>
            <OverlayTrigger
                placement={tip.placement}
                overlay={
                    <Tooltip>
                        <Row className="justify-content-md-center">
                            <Image src={src} rounded />
                        </Row>
                        <Row>
                            <Col md={{ offset: 1, span: 10 }}>{tip.tip}</Col>
                        </Row>
                    </Tooltip>
                }
            >
                <span>{model.name}</span>
            </OverlayTrigger>{' '}
        </>
    );
}
