import request from '../utils/request';
import moment from 'moment';

export const getByIdWithStats = id => {
    return request.get(`users/${id}/statistics`);
};

export const getGames = (page, pageSize, date) => {
    return request.get(
        `/user/history?page=${page}&pageSize=${pageSize}${
            date !== 'all'
                ? `&date=${moment()
                      .subtract('1', date)
                      .format('MM/DD/YYYY')}`
                : ''
        }`
    );
};
