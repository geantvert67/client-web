import L from 'leaflet';

const iconWhiteFlag = new L.Icon({
    iconUrl: require('../../img/crystal.gif'),
    iconRetinaUrl: require('../../img/crystal.gif'),
    iconAnchor: [17, 37], // A modifier pour centrer le cristal
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconPylone = new L.Icon({
    iconUrl: require('../../img/pylone.gif'),
    iconRetinaUrl: require('../../img/pylone.gif'),
    iconAnchor: [25, 58], // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 60),
    className: 'leaflet-div-icon'
});

export { iconWhiteFlag, iconPylone };
