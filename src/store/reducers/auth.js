import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    authenticated: false,
    error: false,
    loading: false,
    token: '',
    tokenType: '',
    userId: ''
}

const authStart = (state, action) => {
    return {
        authenticated: false,
        error: false,
        loading: true,
        token: '',
        tokenType: '',
        userId: ''
    }
}

const authSuccess = (state, action) => {
    return {
        authenticated: true,
        error: false,
        loading: false,
        token: action.token,
        tokenType: action.tokenType,
        userId: action.userId
    }
}

const authFail = (state, action) => {
    return {
        authenticated: false,
        error: true,
        loading: false,
        token: '',
        tokenType: '',
        userId: ''
    }
}

const authLogout = (state, action) => {
    return {
        authenticated: false,
        error: false,
        loading: false,
        token: '',
        tokenType: '',
        userId: ''
    }
}



const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
}

export default reducer;