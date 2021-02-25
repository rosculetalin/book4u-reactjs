import React from 'react';
import bookLogo from '../../assets/bookBadge.jpg';
import classes from './Toolbar.module.css';
import NavigationItems from '../navigationItems/NavigationItems.js';
import {connect} from 'react-redux';

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <img src={bookLogo} alt=""/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authenticated
    }
};

export default connect(mapStateToProps)(Toolbar);