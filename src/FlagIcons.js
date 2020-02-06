import L from 'leaflet';

const iconWhiteFlag = new L.Icon({
    iconUrl: require('./img/white-flag.svg'),
    iconRetinaUrl: require('./img/white-flag.svg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(40, 40),
    className: 'leaflet-div-icon'
});

export { iconWhiteFlag };
