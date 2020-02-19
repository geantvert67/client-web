import { useState, useEffect } from 'react';
import request from './request';
import {
    addZone,
    addFlag,
    removeZones,
    removeFlags
} from '../service/configuration';

export const removeElements = idConfig => {
    removeZones(idConfig);
    removeFlags(idConfig);
};

export const updateConfig = (
    idConfig,
    polygonPosition,
    forbiddenZones,
    flagsPositions
) => {
    removeElements(idConfig);
    let coordMainZone = [];
    polygonPosition.map(point => coordMainZone.push([point.lat, point.lng]));
    coordMainZone.push([polygonPosition[0].lat, polygonPosition[0].lng]);

    forbiddenZones.map(zone => {
        let points = [];
        zone.map(point => points.push([point.lat, point.lng]));
        points.push([zone[0].lat, zone[0].lng]);
        addZone(idConfig, { coordinates: points, forbidden: true });
    });

    flagsPositions.map(flag =>
        addFlag(idConfig, { coordinates: [flag.lat, flag.lng] })
    );

    addZone(idConfig, { coordinates: coordMainZone, forbidden: false });
};

export const formatMainZone = zone => {
    let mainZone = [];
    zone.position.coordinates[0].map(point => {
        mainZone.push({ lat: point[0], lng: point[1] });
    });
    mainZone.pop();
    return mainZone;
};

export const formatForbiddenZone = (index, zone) => {
    let forbiddenZone = [];
    zone.position.coordinates[0].map(point => {
        forbiddenZone.push({ lat: point[0], lng: point[1], zone: index });
    });
    forbiddenZone.pop();
    return forbiddenZone;
};

export const formatFlags = f => {
    let flags = [];
    f.data.map(flag =>
        flags.push({
            lat: flag.position.coordinates[0],
            lng: flag.position.coordinates[1]
        })
    );
    return flags;
};
