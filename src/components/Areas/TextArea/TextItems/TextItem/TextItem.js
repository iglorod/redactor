import React, { useEffect, useRef } from 'react';

import { getSelection, setCaret } from '../../.././../../utility/selection';

const TextItem = React.memo(props => {
    useEffect(() => {
        if (props.cursorPosition === null) return;
        spanEl.current.focus();
        setCaret(spanEl.current ? spanEl.current.childNodes[0] : null, props.cursorPosition);
    });

    const spanEl = useRef(null);
    const { piece } = props;

    if (Object.keys(piece).length === 0) return <br />

    const textStyle = {
        fontSize: piece.fontSize,
        color: piece.color,
        backgroundColor: piece.backgroundColor,
    }

    const changeHandler = (event) => {
        const content = event.target.textContent;
        const caretPosition = getSelection()[0];
        props.onChange(props.index, content, caretPosition);
    }

    const breakStringHandler = (event) => {
        const caretPosition = getSelection()[0];

        if (event.keyCode === 13) {                                                 // hit 'enter' key
            event.preventDefault();
            props.addBreak(props.index, caretPosition);
        } else if (event.keyCode === 8 && caretPosition === 0) {                    // hit 'backspace' key
            event.preventDefault();
            props.removeBreak(props.index, props.index - 1);
        } else if (event.keyCode === 46 && caretPosition === piece.text.length) {   // hit 'delete' key
            event.preventDefault();
            props.removeBreak(props.index, props.index + 1);
        }
    }

    return (
        <span
            ref={spanEl}
            style={textStyle}
            className={'text-block'}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={breakStringHandler}
            onInput={changeHandler}
        >
            {piece.text}
        </span>
    )
})

export default TextItem;
