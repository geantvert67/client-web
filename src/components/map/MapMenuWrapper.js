import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import MapMenu from './MapMenu';

function MapMenuWrapper({ action, setAction }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={`map-menu map-menu-${isOpen ? 'open' : 'closed'}`}>
                <MapMenu action={action} setAction={setAction} />
            </div>
            <div className="map-menu-angle" onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon
                    icon={isOpen ? faAngleRight : faAngleLeft}
                    size="2x"
                />
            </div>
        </>
    );
}

export default MapMenuWrapper;
