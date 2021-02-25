import * as actionTypes from './actionTypes.js';

export const contentChanged = (option) => {
    return {
        type: actionTypes.CENTER_CONTAINER_CONTENT,
        option: option
    }
}





export const contentChange = (option) => {
    return dispatch => {
        dispatch(contentChanged(option));
    }
}