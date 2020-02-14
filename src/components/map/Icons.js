import L from 'leaflet';

const iconWhiteFlag = new L.Icon({
    iconUrl: require('../../img/cristal.gif'),
    iconRetinaUrl: require('../../img/cristal.gif'),
    iconAnchor: null, // A modifier pour centrer le cristal
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconPylone = new L.Icon({
    iconUrl: require('../../img/pylone.png'),
    iconRetinaUrl: require('../../img/pylone.png'),
    iconAnchor: null, // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 60),
    className: 'leaflet-div-icon'
});

export { iconWhiteFlag, iconPylone };
