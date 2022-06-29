import axios from 'axios';
import { getLocalStorage, updateLocalStorage } from '../utils/localStorage/index';

export const api = () => {
    const request = axios.create({
        baseURL: 'http://192.168.1.113:5000',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    request.interceptors.request.use(
        async (res) => {
            const unparsedUser = getLocalStorage('user');
            const user = JSON.parse(unparsedUser);

            if (user?.accessToken && user?.refreshToken) {
                axios.defaults.headers["authorization"] = `Bearer ${user?.accessToken}`;
                axios.defaults.headers["x-refresh"] = `Bearer ${user?.refreshToken}`;
            }

            return res;
        },
        (err) => {
            if (err.message === 'Network Error') {
                console.log('Request: Network Error');
                return 'Network Error';
            }

            if (err.message === 'canceled') {
                return err.message;
            }

            return Promise.reject(err);
        }
    );

    request.interceptors.response.use(
        async (res) => {
            const unparsedUser = getLocalStorage('user');
            const user = JSON.parse(unparsedUser);

            if (user?.accessToken && user?.refreshToken) {
                axios.defaults.headers["authorization"] = `Bearer ${user?.accessToken}`;
                axios.defaults.headers["x-refresh"] = `Bearer ${user?.refreshToken}`;
            }

            if (res.headers["x-access"]) {
                axios.defaults.headers["authorization"] = `Bearer ${res.headers["x-access"]}`;
            }

            if (res.config.url === "/api/account/login" && res.status === 200) {
                axios.defaults.headers["authorization"] = `Bearer ${res.data.accessToken}`;
                axios.defaults.headers["x-refresh"] = `Bearer ${res.data.refreshToken}`;
            }

            if (user?.accessToken !== res.headers["x-access"]) {
                const unparsedUser = getLocalStorage('user');
                const user = JSON.parse(unparsedUser);

                const updatedUser = {
                    ...user,
                    accessToken: res.headers["x-access"] === undefined ? user?.accessToken : res.headers["x-access"],
                };

                updateLocalStorage('user', JSON.stringify(updatedUser));
            }

            return res;
        },
        (err) => {
            if (err.message === 'Network Error') {
                console.log('Response: Network Error');
                return 'Network Error';
            }

            if (err.message === 'canceled') {
                return err.message;
            }

            if (err.response.status === 401) {
                return axios.request(err.config);
            }

            return Promise.reject(err);
        }
    );

    return request;
}