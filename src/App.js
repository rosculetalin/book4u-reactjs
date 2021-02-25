import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Welcome from './containers/welcome/Welcome.js';
import Logging from './containers/logging/Logging.js';
import OAuth2 from './containers/oAuth2/OAuth2.js';
import classes from './App.module.css';
import {connect} from 'react-redux';
import Home from './containers/home/Home.js';
import Logout from './containers/logout/Logout.js';
import * as actions from './store/actions/index.js';
import UploadImage from './components/uploadImage/UploadImage.js';

const App = (props) => {

    const {onAuthCheckState} = props;

    useEffect(() => {
        console.log('Rendering App');
        onAuthCheckState();
    }, [onAuthCheckState]);

    let switcher = (
        <Switch>
                <Route path="/" exact render={(props) => <Welcome {...props}/>}/>
                <Route path="/login" render={(props) => <Logging {...props}/>}/>
                <Route path="/oauth2/redirect" render={(props) => <OAuth2 {...props}/>}/>
                <Redirect to="/"/>
        </Switch>
    );
    if (props.authenticated){
        switcher = (
            <Switch>
                    <Route path="/" exact render={(props) => <Home {...props}/>}/>
                    <Route path="/login" render={(props) => <Logging {...props}/>}/>
                    <Route path="/oauth2/redirect" render={(props) => <OAuth2 {...props}/>}/>
                    <Route path="/home" render={(props) => <Home {...props}/>}/>
                    <Route path="/logout" render={(props) => <Logout {...props}/>}/>
                    <Route path="/upload" render={(props) => <UploadImage {...props}/>}/>
                    <Redirect to="/"/>
            </Switch>
        );
    }

    return (
        <div className={classes.App}>
            {switcher}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
