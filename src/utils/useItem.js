import React, { useState, createContext, useContext } from 'react';
import { useForbiddenZone } from './useForbiddenZone';
import { useMainZone } from './useMainZone';
import { isInZone, getZoneBox } from './utils';
import { toast } from 'react-toastify';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [modelItems, setModelItems] = useState([]);
    const [selectedModelItem, setSelectedModelItem] = useState('');
    const { position: mainZone } = useMainZone();
    const { forbiddenZones } = useForbiddenZone();

    const create = point => {
        const position = { lat: point.latlng.lat, lng: point.latlng.lng };

        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(point.latlng.lat, point.latlng.lng, zone) &&
                (conflict = true);
        });

        return !conflict &&
            isInZone(point.latlng.lat, point.latlng.lng, mainZone)
            ? setItems(
                  items.concat({
                      modelItem: modelItems[selectedModelItem],
                      position,
                      quantity: 1
                  })
              )
            : toast.error(
                  'Veuillez placer les items dans une zone de jeu valide'
              );
    };

    const createRandom = (nb, itemModel) => {
        const { x_max, y_max, x_min, y_min } = getZoneBox(mainZone);

        let randomItems = [];
        let nbItems = nb;

        while (randomItems.length < nbItems) {
            let newItem = false;
            let iteration = 0;

            while (!newItem && iteration < 10) {
                let lat = y_min + Math.random() * (y_max - y_min);
                let lng = x_min + Math.random() * (x_max - x_min);

                let conflict = false;
                forbiddenZones.map(
                    zone => isInZone(lat, lng, zone) && (conflict = true)
                );

                !conflict &&
                    isInZone(lat, lng, mainZone) &&
                    randomItems.push({
                        modelItem: modelItems[itemModel],
                        position: { lat, lng },
                        quantity: 1
                    }) &&
                    (newItem = true);

                iteration++;
            }

            iteration === 10 && nbItems--;
        }

        setItems(items.concat(randomItems));
    };

    const move = (e, item) => {
        const newItems = [...items];
        const index = items.indexOf(item);
        const newPosition = {
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

        if (
            !conflict &&
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                mainZone
            )
        ) {
            item.position = newPosition;
            newItems.splice(index, 1, item);
        } else {
            newItems.splice(index, 1);
        }

        setItems(newItems);
    };

    const updateItemQuantity = (item, quantity) => {
        const otherItems = items.filter(i => i !== item);
        item.quantity = quantity;
        otherItems.splice(items.indexOf(item), 0, item);
        setItems(otherItems);
    };

    const remove = point => {
        setItems(items.filter(p => p !== point));
    };

    const removeAll = itemModel => {
        const im = modelItems[itemModel];
        setItems(items.filter(i => i.modelItem.id !== im.id));
    };

    return (
        <ItemContext.Provider
            value={{
                items,
                create,
                createRandom,
                move,
                remove,
                removeAll,
                updateItemQuantity,
                setItems,
                modelItems,
                setModelItems,
                selectedModelItem,
                setSelectedModelItem
            }}
        >
            {children}
        </ItemContext.Provider>
    );
};

export const useItem = () => useContext(ItemContext);
