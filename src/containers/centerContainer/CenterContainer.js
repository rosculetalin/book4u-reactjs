import React from 'react';
import Profile from '../../components/profile/Profile.js';
import {connect} from 'react-redux';

const CenterContainer = (props) => {

    let inner = 'Center Column';
    if (props.content && props.content === 'profile'){
        inner = <Profile/>
    }

    return(
        <div style={{width: "auto"}}>
            {inner}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        content: state.centerContainer.content
    }
}

export default connect(mapStateToProps)(CenterContainer);