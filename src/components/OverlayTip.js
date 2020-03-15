import React from 'react';
import { OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
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
    const src = '../img/' + tip.image;

    return (
        <>
            <OverlayTrigger
                placement={tip.placement}
                overlay={
                    <Tooltip>
                        <Image src={src} rounded />
                        {tip.tip}
                    </Tooltip>
                }
            >
                <span>{model.name}</span>
            </OverlayTrigger>{' '}
        </>
    );
}
