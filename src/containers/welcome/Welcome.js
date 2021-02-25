import React from 'react';
import Button from '../../components/button/Button.js';
import classes from './Welcome.module.css';

const Welcome = props => {

    const signInHandler = () => {
        props.history.push('/login');
    }

    return (
        <div className={classes.Page}>
            <div className={classes.Title}>
                <h1>Book4U</h1>
            </div>
            <div className={classes.ButtonArea}>
                <Button disabled={false} btnType="Default" clicked={signInHandler}>Sign In</Button>
            </div>
        </div>
    )
}

export default Welcome;