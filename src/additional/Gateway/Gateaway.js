import axios from 'axios'
import {store} from "../../index";
export const Method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

const config = token => { return token ? {
    headers: { 'Authorization': `Bearer ${token}` }
} : {}};

export const Gateway = async (url, method, body) => {
    const token = store.getState().token;
    switch (method) {
        case Method.GET:
            return await axios.get(url, config(token)).then((response) => {
                return response.data;
            });
        case Method.POST:
            return await axios.post(url, body, config(token)).then((response) => {
                return response.data;
            });
        case Method.PUT:
            return await axios.put(url, body, config(token)).then((response) => {
                return response.data;
            });
        case Method.DELETE:
            return await axios.delete(url, config(token)).then((response) => {
                return response.data;
            });
        default:
            return await axios.get(url, config(token)).then((response) => {
                return response.data;
            });
    }
}