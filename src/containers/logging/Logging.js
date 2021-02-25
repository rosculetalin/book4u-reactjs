import React, {useState, useEffect} from 'react';
import Input from '../../components/input/Input.js';   
import classes from './Logging.module.css';
import bookLogo from '../../assets/bookBadge.jpg';
import {connect} from 'react-redux';
import Button from '../../components/button/Button.js';
import Spinner from '../../components/spinner/Spinner.js';
import * as actions from '../../store/actions/index.js';
import { Redirect } from 'react-router-dom';

const Logging = props => {

    useEffect(() => {
        console.log('Rendering Logging');
    });

    let redirectHome = null;
    if(props.authenticated){
        redirectHome = <Redirect to='/home'/>
    }

    const [signUpMode, setSignUpMode] = useState(false);
    const [name, setName] = useState({
        properties: {
            type: 'text',
            placeholder: 'Name',
            value: ''
        },
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    });
    const [email, setEmail] = useState({
        properties: {
            type: 'email',
            placeholder: 'Mail address',
            value: ''
        },
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    });
    const [password, setPassword] = useState({
        properties: {
            type: 'password',
            placeholder: 'Password',
            value: ''
        },
        validation: {
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
    });

    const checkValidity = (value, validation) => {
        let isValid = true;
        if(validation.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid;
        }
        return isValid;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        signUpMode  
            ? props.onSignUp(name.properties.value, email.properties.value, password.properties.value) 
            : props.onSignIn(email.properties.value, password.properties.value);
    };

    const changeInputHandler = (event, elementId) => {
        let updatedProperties;
        let updatedValid;
        switch(elementId){
            case "name":
                updatedProperties = {...name.properties, value: event.target.value};
                updatedValid = checkValidity(event.target.value, name.validation); 
                setName({...name, properties: updatedProperties, valid: updatedValid, touched: true});
                break;
            case "email":
                updatedProperties = {...email.properties, value: event.target.value};
                updatedValid = checkValidity(event.target.value, email.validation); 
                setEmail({...email, properties: updatedProperties, valid: updatedValid, touched: true});
                break;
            case "password":
                updatedProperties = {...password.properties, value: event.target.value};
                updatedValid = checkValidity(event.target.value, password.validation); 
                setPassword({...password, properties: updatedProperties, valid: updatedValid, touched: true});
                break;
            default:
        }
    };

    const changeAuthModeHandler = () => {
        setSignUpMode(prevState => {
            return !prevState;
        })
    };

    const enableSubmitHandler = () => {
        return signUpMode ? name.valid && email.valid && password.valid :
            email.valid && password.valid;
    }

    const facebookLoginHandler = () => {
        props.onOAuthSend();
        window.location.href = 'http://localhost:8080/oauth2/authorize/facebook?redirect_uri=http://localhost:3000/oauth2/redirect'; 
    }

    let headerMessage = null;
    let footerMessage = null;
    headerMessage = signUpMode ? 'Sign Up' : 'Sign In';
    footerMessage = !signUpMode ? 'Sign Up' : 'Sign In';

    return (
        <div className={classes.Logging}>
            {redirectHome}
            <img src={bookLogo} alt=""/>
            <h2>{headerMessage}</h2>
            <form onSubmit={submitHandler}>
                {signUpMode ? <Input {...name.properties} changed={(event) => changeInputHandler(event, "name")} invalid={!name.valid && name.touched}/> : null}
                <Input {...email.properties} changed={(event) => changeInputHandler(event, "email")} invalid={!email.valid && email.touched}/>
                <Input {...password.properties} changed={(event) => changeInputHandler(event, "password")} invalid={!password.valid && password.touched}/>
                {props.loading ? <Spinner/> : null}
                {props.error ? <div className={classes.Error}>Credentials may be wrong</div> : null}
                <Button disabled={!enableSubmitHandler()} btnType="Success">Submit</Button>
            </form>
            <Button btnType="Danger" clicked={changeAuthModeHandler}>Go to {footerMessage}</Button>
            <Button btnType="Success" clicked={facebookLoginHandler}>Facebook Log In</Button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated,
        error: state.auth.error,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (email, password) => dispatch(actions.signIn(email, password)),
        onSignUp: (name, email, password) => dispatch(actions.signUp(name, email, password)),
        onOAuthSend: () => dispatch(actions.oauthSend())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logging);