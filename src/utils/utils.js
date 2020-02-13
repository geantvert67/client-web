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
