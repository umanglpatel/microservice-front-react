import axios from '../../base-axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        let data = {
            grant_type: 'password',
            client_id: 'client',
            client_secret: 'client',
            scope: 'write',
            username: username,
            password: password
        };
        let token = null;
        data = Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        }).join('&');
        axios.post('/oauth/token', data, {
            headers: { 'authorization': 'Basic Y2xpZW50OmNsaWVudA==', 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(response => {
            console.log(response.data);
            token = response.data.token_type + ' ' + response.data.access_token;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            // dispatch(authSuccess(token, data.username));
            // dispatch(checkAuthTimeOut(response.data.expiresIn));
        }).catch((error) => {
            dispatch(authFail(error));
            console.log('error ' + error);
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            // dispatch(logout());
            // } else {
            const userId = localStorage.getItem('userId');
            // dispatch(authSuccess(token, userId));
            // dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            // }
        }
    };
};