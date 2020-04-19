import React from 'react';
import { SplitButton } from 'react-bootstrap';

import FronSizeItem from './FontSizeItem/FontSizeItem';
import classes from './FontSizePicker.module.css';

const FontSizePicker = (props) => {
    const fontSizesArray = ['12px', '14px', '16px', '32px', '48px', '64px'];

    return (
        <>
            <SplitButton
                id={`dropdown-split-variants-light`}
                variant={'light'}
                title={`Font size: ${props.fontSize}`}
                onClick={props.onClick}
                className={classes.fontSizePicker}
            >
                {
                    fontSizesArray.map(fontSize => (
                        <FronSizeItem
                            key={fontSize}
                            fontSize={fontSize}
                            currFontSize={props.fontSize}
                            changeFontSize={props.changeFontSize.bind(this, fontSize)} />
                    ))
                }
            </SplitButton>
        </>
    )
}

export default FontSizePicker;
