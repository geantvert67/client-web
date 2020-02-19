export const checkStatus = res => {
    if (res.ok) {
        return res;
    } else {
        return res.text().then(msg => {
            throw new Error(msg);
        });
    }
};

export const isInZone = (x, y, polygonPosition) => {
    let inside = false;
    for (
        let i = 0, j = polygonPosition.length - 1;
        i < polygonPosition.length;
        j = i++
    ) {
        let { lat: xi, lng: yi } = polygonPosition[i];
        let { lat: xj, lng: yj } = polygonPosition[j];

        let intersect =
            yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }

    return inside;
};

export const getDistance = (origin, destination) => {
    var lon1 = toRadian(origin.lng),
        lat1 = toRadian(origin.lat),
        lon2 = toRadian(destination.lng),
        lat2 = toRadian(destination.lat);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a =
        Math.pow(Math.sin(deltaLat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
};

const toRadian = degree => {
    return (degree * Math.PI) / 180;
};
