import request from '../utils/request';

export const create = credentials => {
    return request.post('/configs', credentials);
};

export const addZone = (idConfig, zone) => {
    return request.post(`/configs/${idConfig}/areas`, zone);
};

export const getAreas = idConfig => {
    return request.get(`/configs/${idConfig}/areas`);
};

export const getFlags = idConfig => {
    return request.get(`/configs/${idConfig}/flags`);
};

export const addFlag = (idConfig, flag) => {
    return request.post(`/configs/${idConfig}/flags`, flag);
};

export const removeFlags = idConfig => {
    return request.delete(`/configs/${idConfig}/flags`);
};

export const removeZones = idConfig => {
    return request.delete(`/configs/${idConfig}/areas`);
};

export const updateConfiguration = (idConfig, credentials) => {
    return request.put(`/configs/${idConfig}`, credentials);
};

export const removeConfiguration = idConfig => {
    return request.delete(`/configs/${idConfig}`);
};

export const cloneConfiguration = idConfig => {
    return request.post(`/configs/${idConfig}/clone`);
};

export const exportConfiguration = idConfig => {
    return request.get(`/configs/${idConfig}/export`, { responseType: 'blob' });
};

export const addItemsModel = (idConfig, model) => {
    return request.post(`/configs/${idConfig}/item-models`, model);
};

export const getItemsModel = idConfig => {
    return request.get(`/configs/${idConfig}/item-models`);
};

export const addItem = (idConfig, item) => {
    return request.post(
        `/configs/${idConfig}/item-models/${item.modelItem.id}/items`,
        {
            quantity: item.quantity,
            coordinates: [item.position.lat, item.position.lng]
        }
    );
};

export const getItems = idConfig => {
    return request.get(`/configs/${idConfig}/items`);
};

export const removeItems = idConfig => {
    return request.delete(`/configs/${idConfig}/items`);
};
