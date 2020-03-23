import React, { useState, createContext, useContext } from 'react';
import { useForbiddenZone } from './useForbiddenZone';
import { useMainZone } from './useMainZone';
import { isInZone } from './utils';
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

    const move = (e, item) => {
        let otherItems = items.filter(i => i !== item);
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

        !conflict &&
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                mainZone
            ) &&
            otherItems.push({
                modelItem: item.modelItem,
                position: newPosition,
                quantity: item.quantity
            });

        setItems(otherItems);
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

    return (
        <ItemContext.Provider
            value={{
                items,
                create,
                move,
                remove,
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
