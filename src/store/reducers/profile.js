import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    loading: undefined,
    name: undefined,
    email: undefined,
    location: undefined,
    books: undefined
}

const getProfileStart = (state, action) => {
    return {
        ...initialState,
        loading: true
    }
}

const getProfileSuccess = (state, action) => {
    return {
        loading: false,
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

const profileBooksSucces = (state, action) => {
    return {
        ...state,
        books: action.books
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PROFILE_INFO_START: return getProfileStart(state, action);
        case actionTypes.PROFILE_INFO_SUCCESS: return getProfileSuccess(state, action);
        case actionTypes.PROFILE_INFO_FAIL: return getProfileFail(state, action);
        case actionTypes.PROFILE_BOOKS_SUCCESS: return profileBooksSucces(state, action);
        default: return state;
    }
}

export default reducer;