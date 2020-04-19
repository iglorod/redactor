import React from 'react';
import { GithubPicker } from 'react-color';
import { OverlayTrigger, Button, Popover } from 'react-bootstrap';

import './ColorPicker.css';

const ColorPicker = (props) => {
    const popover = (
        <GithubPicker triangle={'hide'} onChangeComplete={props.handleChange} />
    )

    return (
        <OverlayTrigger
            trigger={'focus'}
            delay={100}
            rootCloseEvent={'click'}
            placement={'bottom'}
            overlay={
                <Popover>
                    <Popover.Content>
                        {popover}
                    </Popover.Content>
                </Popover>
            }
        >
            <Button className={'color-picker-button'} variant="light">
                {props.label}
            </Button>
        </OverlayTrigger>
    )
}

export default ColorPicker;
