import React from 'react';
import { OverlayTrigger, Tooltip, Image, Row, Col } from 'react-bootstrap';
import { CONFIG_TIPS, ITEMS_TIPS, GENERAL_TIPS } from '../utils/tips';
import { getItemImage } from '../utils/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

export function HelpButton({ tipKey }) {
    const tip = CONFIG_TIPS[tipKey];

    return (
        <>
            <OverlayTrigger
                placement={tip.placement}
                overlay={<Tooltip>{tip.tip}</Tooltip>}
            >
                <FontAwesomeIcon
                    className="ml-2"
                    icon={faQuestionCircle}
                    size="sm"
                />
            </OverlayTrigger>{' '}
        </>
    );
}

export function ItemOverlay({
    item,
    setAction,
    setSelectedModelItem,
    selectedModelItem,
    action,
    index
}) {
    console.log(item);
    const tip = ITEMS_TIPS[item.name];
    const iconUrl = getItemImage(item);

    return (
        <>
            {tip && (
                <OverlayTrigger
                    placement={tip.placement}
                    overlay={
                        <Tooltip>
                            <Row className="justify-content-md-center">
                                <Image src={iconUrl} />
                            </Row>
                            <Row>
                                <Col md={{ offset: 1, span: 10 }}>
                                    {tip.tip}
                                </Col>
                            </Row>
                        </Tooltip>
                    }
                >
                    <Col
                        xs="auto"
                        className={`mr-3 mb-3 actions-item ${action ===
                            'items' &&
                            selectedModelItem === index &&
                            'actions-item-selected'}`}
                        onClick={() => {
                            setAction('items');
                            setSelectedModelItem(index);
                        }}
                    >
                        <Image
                            style={{
                                maxWidth: '25px',
                                maxHeight: '25px'
                            }}
                            src={iconUrl}
                        />
                    </Col>
                </OverlayTrigger>
            )}
        </>
    );
}

export function IconOverlay(props) {
    const tip = GENERAL_TIPS[props.tipKey];
    const iconUrl = props.icon || null;

    console.log(props);
    return (
        <>
            <OverlayTrigger
                placement={tip.placement}
                overlay={
                    iconUrl ? (
                        <Tooltip>
                            <Row className="justify-content-md-center">
                                <Image src={iconUrl} />
                            </Row>
                            <Row>
                                <Col md={{ offset: 1, span: 10 }}>
                                    {tip.tip}
                                </Col>
                            </Row>
                        </Tooltip>
                    ) : (
                        <Tooltip>{tip.tip}</Tooltip>
                    )
                }
            >
                {props.children}
            </OverlayTrigger>{' '}
        </>
    );
}
