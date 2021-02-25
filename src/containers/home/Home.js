import classes from './Home.module.css';
import React from 'react';
import Toolbar from '../../components/toolbar/Toolbar.js';
import CenterContainer from '../centerContainer/CenterContainer.js';

const Home = (props) => {

    return (
        <div>
            <Toolbar/>
            <div className={classes.Container}>
                <div className={classes.ColumnLeft}>Column left</div>
                <div className={classes.ColumnCenter}>
                    <CenterContainer/>
                </div>
                <div className={classes.ColumnRight}>Column right</div>
            </div>
        </div>
    )
}

export default Home;