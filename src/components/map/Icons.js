import L from 'leaflet';

const iconWhiteFlag = new L.Icon({
    iconUrl: require('../../img/crystal.gif'),
    iconRetinaUrl: require('../../img/crystal.gif'),
    iconAnchor: [17, 37], // A modifier pour centrer le cristal
    popupAnchor: [0, -20],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconPylone = new L.Icon({
    iconUrl: require('../../img/pylone.gif'),
    iconRetinaUrl: require('../../img/pylone.gif'),
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
                : require('../../img/pylone.gif')
            : require('../../img/pylone.gif');

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
