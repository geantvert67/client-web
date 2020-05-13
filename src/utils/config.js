import {
    addZone,
    addFlag,
    removeZones,
    removeFlags,
    removeItems,
    addItem
} from '../service/configuration';

/**
 * removeElements :
 * Supprime tout élément posé sur la carte
 *
 * @param idConfig Id de la configuration
 */
export const removeElements = idConfig => {
    return Promise.all([
        removeZones(idConfig),
        removeFlags(idConfig),
        removeItems(idConfig)
    ]);
};

/**
 * updateConfig :
 * Met à jour une configuration
 *
 * @param idConfig Id de la configuration à mettre à jour
 * @param polygonPosition Tableau des positions des sommets de la zone
 * @param forbiddenZones Tableau des zones interdites
 * @param flagsPositions Tableau des positions des cristaux
 * @param items Tableau des items posés
 */
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

/**
 * formatMainZone :
 * Formatte le tableau de tableaux en un tableau d'objets
 *
 * @param zone Zone à formatter
 */
export const formatMainZone = zone => {
    let mainZone = [];
    zone.position.coordinates[0].map(point => {
        mainZone.push({ lat: point[0], lng: point[1] });
    });
    mainZone.pop();
    return mainZone;
};

/**
 * formatForbiddenZone :
 * Formatte le tableau de tableaux en un tableau d'objets
 *
 * @param index Numéro de la zone
 * @param zone Zone à formatter
 */
export const formatForbiddenZone = (index, zone) => {
    let forbiddenZone = [];
    zone.position.coordinates[0].map(point => {
        forbiddenZone.push({ lat: point[0], lng: point[1], zone: index });
    });
    forbiddenZone.pop();
    return forbiddenZone;
};

/**
 * formatFlags :
 * Formatte le tableau de tableaux en un tableau d'objets
 *
 * @param f Cristaux à formatter
 */
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

/**
 * formatItems :
 * Formatte le tableau de tableaux en un tableau d'objets
 *
 * @param i Items à formatter
 */
export const formatItems = i => {
    let items = [];
    i.data.map(item =>
        items.push({
            id: item.id,
            quantity: item.quantity,
            position: {
                lat: item.position.coordinates[0],
                lng: item.position.coordinates[1]
            },
            name: item.name,
            visibilityRadius: item.visibilityRadius,
            actionRadius: item.actionRadius,
            waitingPeriod: item.waitingPeriod,
            autoMove: item.autoMove,
            effectDuration: item.effectDuration,
            effectStrength: item.effectStrength
        })
    );
    return items;
};

/**
 * serializeModels :
 * Serialise un modèle d'item
 *
 * @param model Model à sérialiser
 */
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
    model.effectDuration = model.effectDuration
        ? parseInt(model.effectDuration)
        : null;
    model.effectStrength = model.effectStrength
        ? parseInt(model.effectStrength)
        : null;

    return model;
};

/**
 * serializeItem :
 * Serialise un item
 *
 * @param model Item à sérialiser
 */
export const serializeItem = item => {
    item.autoMove = item.autoMove === 'true';
    item.quantity = item.quantity ? parseInt(item.quantity) : 1;
    item.visibilityRadius = item.visibilityRadius
        ? parseFloat(item.visibilityRadius)
        : null;
    item.actionRadius = item.actionRadius
        ? parseFloat(item.actionRadius)
        : null;
    item.waitingPeriod = item.waitingPeriod
        ? parseInt(item.waitingPeriod)
        : null;
    item.effectDuration = item.effectDuration
        ? parseInt(item.effectDuration)
        : null;
    item.effectStrength = item.effectStrength
        ? parseInt(item.effectStrength)
        : null;

    return item;
};

/**
 * serializeConfig :
 * Serialise une configuration
 *
 * @param config Configuration à sérialiser
 */
export const serializeConfig = config => {
    config.isPrivate = config.isPrivate === 'true';
    config.duration = config.duration ? parseInt(config.duration) : null;
    config.maxPlayers = config.maxPlayers
        ? parseInt(config.maxPlayers)
        : undefined;
    config.inventorySize = config.inventorySize
        ? parseInt(config.inventorySize)
        : undefined;
    config.playerVisibilityRadius = config.playerVisibilityRadius
        ? parseFloat(config.playerVisibilityRadius)
        : undefined;
    config.playerActionRadius = config.playerActionRadius
        ? parseFloat(config.playerActionRadius)
        : undefined;
    config.flagVisibilityRadius = config.flagVisibilityRadius
        ? parseFloat(config.flagVisibilityRadius)
        : undefined;
    config.flagActionRadius = config.flagActionRadius
        ? parseFloat(config.flagActionRadius)
        : undefined;
    config.flagCaptureDuration = config.flagCaptureDuration
        ? parseInt(config.flagCaptureDuration)
        : undefined;

    return config;
};
