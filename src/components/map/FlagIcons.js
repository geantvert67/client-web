import L from 'leaflet';

const iconWhiteFlag = new L.Icon({
    iconUrl: require('../../img/white-flag.svg'),
    iconRetinaUrl: require('../../img/white-flag.svg'),
    iconAnchor: null, // A modifier pour centrer le cristal
    popupAnchor: [0, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

const iconPoint = new L.Icon({
    iconUrl: require('../../img/point.png'),
    iconRetinaUrl: require('../../img/point.png'),
    iconAnchor: null, // A modifier pour centrer les points de zone
    popupAnchor: [0, 10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(10, 10),
    className: 'leaflet-div-icon'
});

export { iconWhiteFlag, iconPoint };
