import { useDataFromUrl } from '../utils/data';
import request from '../utils/request';

/*export const getAll = () => {
    return useDataFromUrl(`/configs`);
};*/

export const create = credentials => {
    return request.post('/configs', credentials);
};
