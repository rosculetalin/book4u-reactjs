import * as actionTypes from './actionTypes.js';
import axios from 'axios';

const profileInfoStart = () => {
    return {
        type: actionTypes.PROFILE_INFO_START
    }
}

const profileInfoSuccess = (name, email, location) => {
    return {
        type: actionTypes.PROFILE_INFO_SUCCESS,
        name: name,
        email: email,
        location: location
    }
}

const profileInfoFail = () => {
    return {
        type: actionTypes.PROFILE_INFO_FAIL
    }
}

const profileBooksStart = () => {
    return {
        type: actionTypes.PROFILE_BOOKS_START
    }
}

const profileBooksSuccess = (books) => {
    return {
        type: actionTypes.PROFILE_BOOKS_SUCCESS,
        books: books
    }
}

const profileBooksFail = () => {
    return {
        type: actionTypes.PROFILE_BOOKS_FAIL
    }
}





export const getProfileInfo = (token, tokenType) => {
    return dispatch => {
        dispatch(profileInfoStart());
        const url = 'http://localhost:8080/user/me';
        const headers = {
            'Authorization': tokenType + ' ' + token
        }
        axios.get(url, {headers: headers})
        .then(response => {
            dispatch(profileInfoSuccess(response.data.name, response.data.email, response.data.location));
        })
        .catch(error => {
            dispatch(profileInfoFail());
        });
    }
}

export const getProfileBooks = (token, tokenType, userId) => {
    return dispatch => {
        dispatch(profileBooksStart());
        const url = 'http://localhost:8080/book/all/byUser/' + userId;
        const headers = {
            'Authorization': tokenType + ' ' + token
        }
        axios.get(url, {headers: headers})
        .then(response => {
            console.log(response.data);
            dispatch(profileBooksSuccess(response.data));
        })
        .catch(error => {
            dispatch(profileBooksFail());
        });
    }
}