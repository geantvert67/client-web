import request from '../utils/request';

export const getByIdWithStats = id => {
    return request.get(`users/${id}/statistics`);
};
