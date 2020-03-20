import React, { useState, createContext, useContext } from 'react';
import { useForbiddenZone } from './useForbiddenZone';
import { isInZone, getDistance, getActionZoneAuto } from './utils';
import { useMainZone } from './useMainZone';
import { getZoneBox } from './utils';

const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
    const [flagsPositions, setFlagsPositions] = useState([]);
    const { forbiddenZones } = useForbiddenZone();
    const { position: mainZone } = useMainZone();

    const create = point => {
        const newPositon = { lat: point.latlng.lat, lng: point.latlng.lng };
        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(point.latlng.lat, point.latlng.lng, zone) &&
                (conflict = true);
        });

        !conflict &&
            flagsPositions.map(
                flag =>
                    getDistance(flag, {
                        lat: newPositon.lat,
                        lng: newPositon.lng
                    }) <
                        getActionZoneAuto(mainZone) * 2 && (conflict = true)
            );

        return !conflict &&
            isInZone(point.latlng.lat, point.latlng.lng, mainZone)
            ? setFlagsPositions(flagsPositions.concat(newPositon))
            : alert(
                  'Veuillez placer les drapeaux dans une zone de jeu valide.'
              );
    };

    const createRandom = nb => {
        const { x_max, y_max, x_min, y_min } = getZoneBox(mainZone);

        let randomFlags = [];
        let nbFlags = nb;

        while (randomFlags.length < nbFlags) {
            let newFlag = false;
            let iteration = 0;

            while (!newFlag && iteration < 10) {
                let lat = y_min + Math.random() * (y_max - y_min);
                let lng = x_min + Math.random() * (x_max - x_min);

                let conflict = false;
                forbiddenZones.map(
                    zone => isInZone(lat, lng, zone) && (conflict = true)
                );

                !conflict &&
                    [...randomFlags, ...flagsPositions].map(
                        flag =>
                            getDistance(flag, { lat, lng }) <
                                getActionZoneAuto(mainZone) * 2 &&
                            (conflict = true)
                    );

                !conflict &&
                    isInZone(lat, lng, mainZone) &&
                    randomFlags.push({ lat, lng }) &&
                    (newFlag = true);

                iteration++;
            }

            iteration === 10 && nbFlags--;
        }

        setFlagsPositions(flagsPositions.concat(randomFlags));
    };

    const move = (e, flag) => {
        let otherFlags = flagsPositions.filter(f => f !== flag);
        const newPositon = {
            lat: e.target.getLatLng().lat,
            lng: e.target.getLatLng().lng
        };
        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                zone
            ) && (conflict = true);
        });

        !conflict &&
            flagsPositions.map(
                flag =>
                    getDistance(flag, {
                        lat: newPositon.lat,
                        lng: newPositon.lng
                    }) <
                        getActionZoneAuto(mainZone) * 2 && (conflict = true)
            );

        !conflict &&
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                mainZone
            ) &&
            otherFlags.push(newPositon);

        setFlagsPositions(otherFlags);
    };

    const remove = point => {
        setFlagsPositions(flagsPositions.filter(p => p !== point));
    };

    const removeAll = () => {
        setFlagsPositions([]);
    };

    return (
        <FlagContext.Provider
            value={{
                flagsPositions,
                setFlagsPositions,
                create,
                createRandom,
                move,
                remove,
                removeAll
            }}
        >
            {children}
        </FlagContext.Provider>
    );
};

export const useFlag = () => useContext(FlagContext);
