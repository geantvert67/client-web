import L from 'leaflet';
import { getItemImage } from '../../utils/utils';

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
    if (!modelItem) return iconWhiteFlag;

    switch (modelItem.name) {
        case 'Sentinelle':
            return iconSentinelle;
        case 'Canon à photons':
            return iconCanonPhotons;
        case 'Antenne':
            return iconAntenne;
        case 'Sonde':
            return iconSonde;
        case 'Portail':
            return iconPortail;
        case 'Disloqueur':
            return iconDisloqueur;
        case 'Intercepteur':
            return iconIntercepteur;
        default:
            return iconWhiteFlag;
    }
};

const iconCanonPhotons = new L.Icon({
    iconUrl: require('../../img/turret.png'),
    iconRetinaUrl: require('../../img/turret.png'),
    iconAnchor: null, // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconAntenne = new L.Icon({
    iconUrl: require('../../img/antenne.png'),
    iconRetinaUrl: require('../../img/antenne.png'),
    iconAnchor: null, // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconDisloqueur = new L.Icon({
    iconUrl: require('../../img/disloqueur.gif'),
    iconRetinaUrl: require('../../img/disloqueur.gif'),
    iconAnchor: null, // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconIntercepteur = new L.Icon({
    iconUrl: require('../../img/intercepteur.gif'),
    iconRetinaUrl: require('../../img/intercepteur.gif'),
    iconAnchor: null, // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconPortail = new L.Icon({
    iconUrl: require('../../img/portail.png'),
    iconRetinaUrl: require('../../img/portail.png'),
    iconAnchor: null, // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconSentinelle = new L.Icon({
    iconUrl: require('../../img/sentinelle.png'),
    iconRetinaUrl: require('../../img/sentinelle.png'),
    iconAnchor: null, // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconSonde = new L.Icon({
    iconUrl: require('../../img/sonde.png'),
    iconRetinaUrl: require('../../img/sonde.png'),
    iconAnchor: null, // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconTurret = new L.Icon({
    iconUrl: require('../../img/turret.png'),
    iconRetinaUrl: require('../../img/turret.png'),
    iconAnchor: null, // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

export { getItemIcon, iconWhiteFlag, iconPylone };
