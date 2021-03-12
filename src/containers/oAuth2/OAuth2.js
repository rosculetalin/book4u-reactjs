import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index.js';

const OAuth2 = props => {

    const [redirectComponent, setRedirectComponent] = useState(null);
    const {onOAuthSuccess, onOAuthFail, location} = props;

    useEffect(() => {
        console.log('Rendering OAuth');
        const query = new URLSearchParams(location.search);
        if(query.has('token')){
            onOAuthSuccess(query.get('token'));
            setRedirectComponent(<Redirect to='/'/>);
        }
        if(query.has('error')){
            onOAuthFail(query.get('error'));
            setRedirectComponent(<Redirect to='/login'/>);
        }
    }, [onOAuthSuccess, onOAuthFail, location]);

    return (
        <div>
            {redirectComponent}
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        onOAuthSuccess: (token) => dispatch(actions.oauthSuccess(token)),
        onOAuthFail: (error) => dispatch(actions.oauthFail(error))
    }
}

export default connect(null, mapDispatchToProps)(OAuth2);