import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index.js';
import Spinner from '../../components/spinner/Spinner.js';

const OAuth2 = props => {
    const query = new URLSearchParams(props.location.search);
    if(query.has('token')){
        props.onOAuthSuccess(query.get('token'));
    }
    if(query.has('error')){
        props.onOAuthFail(query.get('error'));
    }

    let redirectComponent = null;
    let spinnerComponent = null;
    if(props.authenticated){
        redirectComponent = <Redirect to='/home'/>
    }
    if(props.error){
        redirectComponent = <Redirect to='/login'/>
    }
    if(props.loading){
        spinnerComponent = <Spinner/>
    }

    return (
        <div>
            {redirectComponent}
            {spinnerComponent}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated,
        error: state.auth.error,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOAuthSuccess: (token) => dispatch(actions.oauthSuccess(token)),
        onOAuthFail: (error) => dispatch(actions.oauthFail(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth2);