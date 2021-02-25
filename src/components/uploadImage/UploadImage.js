import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index.js';
import Image from 'react-bootstrap/Image';

const UploadImage = (props) => {

    useEffect(() => {
        console.log('Rendering Upload Image');
    });

    const onFileChangeHandler = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        const formData = new FormData();
        formData.append('file', selectedFile);
        props.onPostImage(formData, props.token, props.tokenType);
    }

    const onClickGetImage = () => {
        props.onClickGetImage(props.token, props.tokenType);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                        <div className="form-group files color">
                            <label>Upload Your File </label>
                            <input type="file" className="form-control" name="file" onChange={onFileChangeHandler}/>
                        </div>
                </div>
            </div>
            <button onClick={onClickGetImage}>Get Image</button>
            <Image src={props.imageUrl} roundedCircle/>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        tokenType: state.auth.tokenType,
        imageUrl: state.image.imageUrl
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostImage: (data, token, tokenType) => dispatch(actions.postImage(data, token, tokenType)),
        onClickGetImage: (token, tokenType) => dispatch(actions.getImage(token, tokenType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);