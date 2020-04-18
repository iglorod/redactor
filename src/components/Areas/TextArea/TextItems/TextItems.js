import React from 'react';

import TextItem from './TextItem/TextItem';
import './TextItems.css';

const TextItems = props => {
    return (
        props.pieces.map((piece, index) => (
            <TextItem
                key={index}
                piece={piece}
                index={index}
                cursorPosition={index === props.cursorPosition.textPieceIndex ? props.cursorPosition.position : null}
                addBreak={props.addBreak}
                removeBreak={props.removeBreak}
                onChange={props.onChange} />
        ))
    )
}

export default TextItems;
