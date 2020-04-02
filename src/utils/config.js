import {
    addZone,
    addFlag,
    removeZones,
    removeFlags,
    removeItems,
    addItemsModel,
    addItem,
    updateItemsModel
} from '../service/configuration';
import { config } from '@fortawesome/fontawesome-svg-core';

export const removeElements = idConfig => {
    return Promise.all([
        removeZones(idConfig),
        removeFlags(idConfig),
        removeItems(idConfig)
    ]);
};

export const updateConfig = (
    idConfig,
    polygonPosition,
    forbiddenZones,
    flagsPositions,
    items
) => {
    let coordMainZone = [];

    return removeElements(idConfig).then(() => {
        polygonPosition.map(point =>
            coordMainZone.push([point.lat, point.lng])
        );
        coordMainZone.push([polygonPosition[0].lat, polygonPosition[0].lng]);

        return Promise.all([
            forbiddenZones
                .filter(z => z.length > 0)
                .map(zone => {
                    let points = [];
                    zone.map(point => points.push([point.lat, point.lng]));
                    points.push([zone[0].lat, zone[0].lng]);
                    return addZone(idConfig, {
                        coordinates: points,
                        forbidden: true
                    });
                }),

            flagsPositions.map(flag =>
                addFlag(idConfig, { coordinates: [flag.lat, flag.lng] })
            ),

            items.map(item => addItem(idConfig, item)),

            addZone(idConfig, {
                coordinates: coordMainZone,
                forbidden: false
            })
        ]);
    });
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

export const formatItems = i => {
    let items = [];
    i.data.map(item =>
        items.push({
            quantity: item.quantity,
            position: {
                lat: item.position.coordinates[0],
                lng: item.position.coordinates[1]
            },
            modelItem: item.ItemModel
        })
    );
    return items;
};

export const serializeModels = model => {
    model.autoMove = model.autoMove === 'true';
    model.visibilityRadius = model.visibilityRadius
        ? parseFloat(model.visibilityRadius)
        : null;
    model.actionRadius = model.actionRadius
        ? parseFloat(model.actionRadius)
        : null;
    model.waitingPeriod = model.waitingPeriod
        ? parseInt(model.waitingPeriod)
        : null;

    return model;
};

export const serializeConfig = config => {
    config.isPrivate = config.isPrivate === 'true';
    config.duration = config.duration ? parseInt(config.duration) : null;
    config.maxPlayers = config.maxPlayers ? parseInt(config.maxPlayers) : null;
    config.inventorySize = config.inventorySize
        ? parseInt(config.inventorySize)
        : undefined;
    config.playerVisibilityRadius = config.playerVisibilityRadius
        ? parseFloat(config.playerVisibilityRadius)
        : null;
    config.playerActionRadius = config.playerActionRadius
        ? parseFloat(config.playerActionRadius)
        : null;
    config.flagVisibilityRadius = config.flagVisibilityRadius
        ? parseFloat(config.flagVisibilityRadius)
        : null;
    config.flagActionRadius = config.flagActionRadius
        ? parseFloat(config.flagActionRadius)
        : null;
    config.flagCaptureDuration = config.flagCaptureDuration
        ? parseInt(config.flagCaptureDuration)
        : null;

    return config;
};
