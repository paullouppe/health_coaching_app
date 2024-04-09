import axios from 'axios';
import Cookies from 'js-cookie';

export const singin = ({ email, password }) => {
    let data = JSON.stringify({
        "email": email,
        "password": password
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://health.shrp.dev/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return axios.request(config)
        .then((response) => {
            Cookies.set('token', response.data.data.access_token, { expires: response.data.data.expires, secure: true });
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}

export const signup = ({ email, password }) => {
    let data = JSON.stringify({
        "role": "16317dcf-1e2f-4fba-969f-6f6b15ba1062",
        "email": email,
        "password": password
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://health.shrp.dev/users',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            return JSON.stringify(response.data);
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}

export const logout = () => {
    Cookies.remove("token");
}

