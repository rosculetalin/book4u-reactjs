import React from 'react';
import classes from './Input.module.css';

const Input = props => {
    let inputClasses = [classes.InputElement];

    if(props.invalid){
        inputClasses.push(classes.Invalid);
    }

    if(props.invalid){
        inputClasses.push(classes.Invalid);
    }

    return (
        <div className={classes.Input}>
            <input 
                className={inputClasses.join(' ')} 
                type={props.type} 
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed}/>
        </div>
    );
}

export default Input;