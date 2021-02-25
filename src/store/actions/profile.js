import * as actionTypes from './actionTypes.js';
import axios from 'axios';

const getProfileStart = () => {
    return {
        type: actionTypes.GET_PROFILE_START
    }
}

const getProfileSuccess = (id, name, email, location) => {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
        id: id,
        name: name,
        email: email,
        location: location
    }
}

const getProfileFail = () => {
    return {
        type: actionTypes.GET_PROFILE_FAIL
    }
}





export const getProfile = (token, tokenType) => {
    return dispatch => {
        dispatch(getProfileStart());
        const url = 'http://localhost:8080/user/me';
        const headers = {
            'Authorization': tokenType + ' ' + token
        }
        axios.get(url, {headers: headers})
        .then(response => {
            dispatch(getProfileSuccess(response.data.id, response.data.name, response.data.email, response.data.location));
        })
        .catch(error => {
            dispatch(getProfileFail());
        });
    }
}