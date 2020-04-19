import React from 'react';
import Switch from '../UI/Switch/Switch';

import TextActions from './TextActions/TextActions';
import classes from './Header.module.css';

const Header = (props) => {

    return (
        <header className={classes.header}>
            <TextActions />
            <Switch label='Show JSON' onChange={props.handleSwitch} />
        </header>
    )
}

export default Header;
