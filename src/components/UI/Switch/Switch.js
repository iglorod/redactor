import React from 'react';

import { FormCheck } from 'react-bootstrap';
import classes from './Switch.module.css';

const Switch = ({ onChange, label }) => {
    return (
        <div className={classes.container}>
            <FormCheck
                type='switch'
                id="custom-switch"
                label={label}
                className={classes.switch}
                onChange={onChange} />
        </div>
    )
}

export default Switch;
