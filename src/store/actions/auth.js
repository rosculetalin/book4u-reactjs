import * as actionTypes from './actionTypes.js';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, tokenType) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        tokenType: tokenType
    };
};

const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    };
};

const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};







export const oauthSend = () => {
    return dispatch => {
        dispatch(authStart());
    };
}

export const oauthSuccess = (token) => {
    return dispatch => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('tokenType', 'Bearer');
        dispatch(authSuccess(token, 'Bearer'));
    }
}

export const oauthFail = (error) => {
    return dispatch => {
        dispatch(authFail());
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenType');
        dispatch(authLogout());
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('accessToken');
        const tokenType = localStorage.getItem('tokenType');
        if(token !== null && tokenType !== null){
            dispatch(authSuccess(token, tokenType));
        }
    }
}

export const signIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            "email": email,
            "password": password
        };
        const url = "http://localhost:8080/auth/login";
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('tokenType', response.data.tokenType);
                dispatch(authSuccess(response.data.accessToken, response.data.tokenType));
            })
            .catch(err => {
                dispatch(authFail());
            })
    }
}

export const signUp = (name, email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            "name": name,
            "email": email,
            "password": password
        };
        const url = "http://localhost:8080/auth/signup";
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('tokenType', response.data.tokenType);
                dispatch(authSuccess(response.data.accessToken, response.data.tokenType));
            })
            .catch(err => {
                dispatch(authFail());
            })
    }
}