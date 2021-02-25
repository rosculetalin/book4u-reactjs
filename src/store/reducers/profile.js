import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    id: undefined,
    name: undefined,
    email: undefined,
    location: undefined
}

const getProfileStart = (state, action) => {
    return {
        ...initialState
    }
}

const getProfileSuccess = (state, action) => {
    return {
        id: action.id,
        name: action.name,
        email: action.email,
        location: action.location
    }
}

const getProfileFail = (state, action) => {
    return {
        ...initialState
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_PROFILE_START: return getProfileStart(state, action);
        case actionTypes.GET_PROFILE_SUCCESS: return getProfileSuccess(state, action);
        case actionTypes.GET_PROFILE_FAIL: return getProfileFail(state, action);
        default: return state;
    }
}

export default reducer;