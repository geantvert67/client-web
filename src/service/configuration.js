import request from '../utils/request';

export const create = config => {
    return request.post('/configs', config);
};

export const getById = configId => {
    return request.get(`/configs/${configId}`);
};

export const updateById = config => {
    return request.put(`/configs/${config.id}`, config);
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

export const updateItemsModel = (idConfig, idModelItem, modelItem) => {
    return request.put(
        `/configs/${idConfig}/item-models/${idModelItem}`,
        modelItem
    );
};

export const getItemsModel = idConfig => {
    return request.get(`/configs/${idConfig}/item-models`);
};

export const createTeam = (idConfig, credentials) => {
    return request.post(`/configs/${idConfig}/teams`, credentials);
};

export const removeTeam = (idConfig, idTeam) => {
    return request.delete(`/configs/${idConfig}/teams/${idTeam}`);
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

export const addMember = (idConfig, idTeam, username) => {
    return request.post(`/configs/${idConfig}/teams/${idTeam}/users`, {
        username: username
    });
};

export const removeMember = (idConfig, idTeam, idUser) => {
    return request.delete(
        `/configs/${idConfig}/teams/${idTeam}/users/${idUser}`
    );
};

export const getUsers = username => {
    return request.get(`/users?username=${username}`);
};
