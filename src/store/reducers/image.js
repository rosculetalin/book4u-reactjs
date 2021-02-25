import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    loading: undefined,
    imageUrl: undefined
}

const postImageStart = (state, action) => {
    return {
        loading: true
    }
}

const postImageSuccess = (state, action) => {
    return {
        loading: false
    }
}

const postImageFail = (state, action) => {
    return {
        loading: false
    }
}

const getImageStart = (state, action) => {
    return {
        loading: true
    }
}

const getImageSuccess = (state, action) => {
    return {
        loading: false,
        imageUrl: action.url
    }
}

const getImageFail = (state, action) => {
    return {
        loading: false
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.POST_IMAGE_START: return postImageStart(state, action);
        case actionTypes.POST_IMAGE_SUCCESS: return postImageSuccess(state, action);
        case actionTypes.POST_IMAGE_FAIL: return postImageFail(state, action);
        case actionTypes.GET_IMAGE_START: return getImageStart(state, action);
        case actionTypes.GET_IMAGE_SUCCESS: return getImageSuccess(state, action);
        case actionTypes.GET_IMAGE_FAIL: return getImageFail(state, action);
        default: return state;
    }
}

export default reducer;