import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    content: ''
}

const contentChange = (state, action) => {
    return {
        content: action.option
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CENTER_CONTAINER_CONTENT: return contentChange(state, action);
        default: return state;
    }
}

export default reducer;