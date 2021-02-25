import React from 'react';
import classes from './NavigationItem.module.css';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index.js';

const NavigationItem = (props) => {

    const clickHandler = () => {
        if (props.link) {
            props.history.push(props.link);
        }
        if (props.content){
            props.onContentChange(props.content);
        }
    }
    
    return (
        <li className={classes.NavigationItem}>
            <div onClick={clickHandler}>
                {props.children}
            </div>
        </li>
    );
    
}

const mapDispatchToProps = dispatch => {
    return {
        onContentChange: (option) => dispatch(actions.contentChange(option))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(NavigationItem));