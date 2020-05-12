import request from '../utils/request';

export const getByIdWithStats = id => {
    return request.get(`users/${id}/statistics`);
};

export const getGames = (page, pageSize) => {
    return request.get(`/user/history?page=${page}&pageSize=${pageSize}`);
};
