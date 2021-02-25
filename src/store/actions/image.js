import * as actionTypes from './actionTypes.js';
import axios from 'axios';


const postImageStart = () => {
    return {
        type: actionTypes.POST_IMAGE_START
    };
};

const postImageSuccess = () => {
    return {
        type: actionTypes.POST_IMAGE_SUCCESS
    };
};

const postImageFail = () => {
    return {
        type: actionTypes.POST_IMAGE_FAIL
    }
}

const getImageStart = () => {
    return {
        type: actionTypes.GET_IMAGE_START
    };
};

const getImageSuccess = (url) => {
    return {
        type: actionTypes.GET_IMAGE_SUCCESS,
        url: url
    };
};

const getImageFail = () => {
    return {
        type: actionTypes.GET_IMAGE_FAIL
    }
}





export const postImage = (data, token, tokenType) => {
    return dispatch => {
        dispatch(postImageStart());
        const url = 'http://localhost:8080/uploadImageProfile';
        const headers = {
            'Authorization': tokenType + ' ' + token
        };
        axios.post(url, data, {headers: headers})
        .then(response => {
            console.log(response);
            dispatch(postImageSuccess());
        })
        .catch(error => {
            console.log(error);
            dispatch(postImageFail());
        });
    }
}

export const getImage = (token, tokenType) => {
    return dispatch => {
        dispatch(getImageStart());
        const url = 'http://localhost:8080/getImageProfile';
        const headers = {
            'Authorization': tokenType + ' ' + token
        };
        axios.get(url, {headers: headers, responseType: 'blob'})
        .then(function (response) {

            var reader = new window.FileReader();
            reader.readAsDataURL(response.data); 
            reader.onload = function() {
    
                var imageDataUrl = reader.result;
                dispatch(getImageSuccess(imageDataUrl))
    
            }
        })
        .catch(error => {
            console.log(error);
            dispatch(getImageFail());
        })
    }
}