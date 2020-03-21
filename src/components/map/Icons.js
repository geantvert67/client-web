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
    const iconUrl = getItemImage(modelItem);

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
