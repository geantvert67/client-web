import L from 'leaflet';

const iconWhiteFlag = new L.Icon({
    iconUrl: require('../../img/flags.gif'),
    iconRetinaUrl: require('../../img/flags.gif'),
    iconAnchor: [17, 37], // A modifier pour centrer le cristal
    popupAnchor: [0, -20],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconPylone = new L.Icon({
    iconUrl: require('../../img/mainZone.gif'),
    iconRetinaUrl: require('../../img/mainZone.gif'),
    iconAnchor: [25, 58], // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    iconSize: new L.Point(60, 60),
    className: 'leaflet-div-icon'
});

const getItemIcon = modelItem => {
    let iconUrl =
        modelItem !== undefined
            ? modelItem.name === 'Sentinelle'
                ? require('../../img/sentinelle.png')
                : modelItem.name === 'Canon à photons'
                ? require('../../img/turret.png')
                : modelItem.name === 'Antenne'
                ? require('../../img/antenne.png')
                : modelItem.name === 'Sonde'
                ? require('../../img/sonde.png')
                : modelItem.name === 'Portail'
                ? require('../../img/portail.png')
                : modelItem.name === 'Disloqueur'
                ? require('../../img/disloqueur.gif')
                : modelItem.name === 'Intercepteur'
                ? require('../../img/intercepteur.gif')
                : require('../../img/mainZone.gif')
            : require('../../img/mainZone.gif');

    return new L.Icon({
        iconUrl: iconUrl,
        iconRetinaUrl: iconUrl,
        iconAnchor: null, // A modifier pour centrer les points de zone
        popupAnchor: [0, 10],
        iconSize: new L.Point(40, 40),
        className: 'leaflet-div-icon'
    });
};

export { getItemIcon, iconWhiteFlag, iconPylone };
