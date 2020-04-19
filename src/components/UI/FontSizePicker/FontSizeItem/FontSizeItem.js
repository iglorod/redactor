import React from 'react';
import { Dropdown } from 'react-bootstrap';

const FontSizeItem = (props) => {
    return (
        <Dropdown.Item
            active={props.currFontSize === props.fontSize ? true : false}
            onClick={props.changeFontSize}
        >
            {props.fontSize}
        </Dropdown.Item>
    )
}

export default FontSizeItem;
