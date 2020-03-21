import React, { useState, createContext, useContext } from 'react';

const MainZoneContext = createContext();

export const MainZoneProvider = ({ children }) => {
    const [position, setPosition] = useState([]);

    const create = e => {
        const newPositon = {
            lat: e.latlng.lat,
            lng: e.latlng.lng
        };
        setPosition(position.concat(newPositon));
    };

    const move = (e, point) => {
        const otherPoints = position.filter(f => f !== point);
        const newPositon = {
            lat: e.target.getLatLng().lat,
            lng: e.target.getLatLng().lng
        };

        otherPoints.splice(position.indexOf(point), 0, newPositon);

        setPosition(otherPoints);
    };

    const remove = point => {
        setPosition(position.filter(p => p !== point));
    };

    const removeAll = () => {
        setPosition([]);
    };

    return (
        <MainZoneContext.Provider
            value={{ position, setPosition, create, move, remove, removeAll }}
        >
            {children}
        </MainZoneContext.Provider>
    );
};

export const useMainZone = () => useContext(MainZoneContext);
