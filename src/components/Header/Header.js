import React from 'react';
import Switch from '../UI/Switch/Switch';

import ColorPicker from '../UI/ColorPicker/ColorPicker';
import classes from './Header.module.css';

const Header = (props) => {
    const handleFontColorChange = (res) => {
        console.log(res.hex);
    }

    const handleBackgroundChange = (res) => {
        console.log(res.hex);
    }

    return (
        <header className={classes.header}>
            <div>
                <ColorPicker label={'Font color'} handleChange={handleFontColorChange} />
                <ColorPicker label={'Background'} handleChange={handleBackgroundChange} />
            </div>
            <Switch label='Show JSON' onChange={props.handleSwitch} />
        </header>
    )
}

export default Header;
