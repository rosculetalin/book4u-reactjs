import * as actionTypes from './actionTypes.js';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, tokenType, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        tokenType: tokenType,
        userId: userId
    };
};

const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    };
};

const oauthOk = () => {
    return {
        type: actionTypes.OAUTH_OK
    };
}

const oauthBadRequest = () => {
    return {
        type: actionTypes.OAUTH_BAD_REQUEST
    };
}

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
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        localStorage.setItem('accessToken', token);
        localStorage.setItem('tokenType', 'Bearer');
        localStorage.setItem('userId', JSON.parse(window.atob(base64)).sub);
        dispatch(oauthOk());
    }
}

export const oauthFail = (error) => {
    return dispatch => {
        dispatch(oauthBadRequest());
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenType');
        localStorage.removeItem('userId');
        dispatch(authLogout());
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('accessToken');
        const tokenType = localStorage.getItem('tokenType');
        const userId = localStorage.getItem('userId');
        if(token !== null && tokenType !== null && userId !== null){
            dispatch(authSuccess(token, tokenType, userId));
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
                const base64Url = response.data.accessToken.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                const userId = JSON.parse(window.atob(base64)).sub;
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('tokenType', response.data.tokenType);
                localStorage.setItem('userId', userId);
                dispatch(authSuccess(response.data.accessToken, response.data.tokenType, userId));
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
                const base64Url = response.data.accessToken.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                const userId = JSON.parse(window.atob(base64)).sub;
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('tokenType', response.data.tokenType);
                localStorage.setItem('userId', userId);
                dispatch(authSuccess(response.data.accessToken, response.data.tokenType, userId));
            })
            .catch(err => {
                dispatch(authFail());
            })
    }
}