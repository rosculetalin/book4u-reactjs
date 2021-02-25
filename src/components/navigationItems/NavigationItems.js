import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './navigationItem/NavigationItem.js';

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/upload">Upload</NavigationItem>
        <NavigationItem content="profile">Profile</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
    </ul>
);

export default NavigationItems;