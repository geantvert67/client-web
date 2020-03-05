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
    let lon1 = toRadian(origin.lng),
        lat1 = toRadian(origin.lat),
        lon2 = toRadian(destination.lng),
        lat2 = toRadian(destination.lat);

    let deltaLat = lat2 - lat1;
    let deltaLon = lon2 - lon1;

    let a =
        Math.pow(Math.sin(deltaLat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
};

const toRadian = degree => {
    return (degree * Math.PI) / 180;
};

export const getZoneBox = polygonPosition => {
    let x_max = -180,
        y_max = -90;
    let x_min = 180,
        y_min = 90;

    polygonPosition.map(point => {
        point.lng > x_max && (x_max = point.lng);
        point.lng < x_min && (x_min = point.lng);
        point.lat > y_max && (y_max = point.lat);
        point.lat < y_min && (y_min = point.lat);
    });

    return { x_max, x_min, y_max, y_min };
};

export const getCenterZoneBox = polygonPosition => {
    const { x_max, x_min, y_max, y_min } = getZoneBox(polygonPosition);

    return { lng: (x_max + x_min) / 2, lat: (y_max + y_min) / 2 };
};

export const getActionZoneAuto = polygonPosition => {
    const { x_max, x_min, y_max, y_min } = getZoneBox(polygonPosition);
    const origin = { lng: x_max, lat: y_max };
    const dest = { lng: x_min, lat: y_min };

    return (5 / 100) * getDistance(origin, dest);
};

export const addRandomFlags = (polygonPosition, forbiddenZone) => {
    const { x_max, y_max, x_min, y_min } = getZoneBox(polygonPosition);

    let randomFlags = [];
    let nbFlags = 10;

    while (randomFlags.length < nbFlags) {
        let newFlag = false;
        let iteration = 0;

        while (!newFlag && iteration < 1000) {
            let lat = y_min + Math.random() * (y_max - y_min);
            let lng = x_min + Math.random() * (x_max - x_min);

            let conflict = false;
            forbiddenZone.map(
                zone => isInZone(lat, lng, zone) && (conflict = true)
            );

            !conflict &&
                randomFlags.map(
                    flag =>
                        getDistance(flag, { lat, lng }) <
                            getActionZoneAuto(polygonPosition) * 2 &&
                        (conflict = true)
                );

            !conflict &&
                isInZone(lat, lng, polygonPosition) &&
                randomFlags.push({ lat, lng }) &&
                (newFlag = true);

            iteration++;
        }

        iteration === 1000 && nbFlags--;
    }

    return randomFlags;
};
