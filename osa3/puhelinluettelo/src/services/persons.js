import axios from 'axios';
const url = 'api/persons';

const getAll = () => {
    const request = axios.get(url);
    return request.then(response => {
        return response.data;
    });
};

const create = newPerson => {
    const request = axios.post(url, newPerson);
    return request.then(response => {
        return response.data;
    });
};

const update = (id, newPerson) => {
    const request = axios.put(`${url}/${id}`, newPerson);
    return request.then(response => {
        return response.data;
    });
};

const remove = id => {
    const delUrl = `${url}/${id}`;
    const request = axios.delete(delUrl);
    return request.then(response => {
        return response.data;
    });
};

export default {
    getAll,
    create,
    remove,
    update,
};
