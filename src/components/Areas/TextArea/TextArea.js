import React, { useState, useCallback } from 'react';

import TextItems from './TextItems/TextItems';
import { objectsAreEqual } from '../../../utility/text-blocks';
import classes from './TextArea.module.css';

const TextArea = () => {
    const [textPieces, setTextPieces] = useState([
        {
            text: 'Start typing here...',
            fontSize: '12px',
            color: 'red',
            backgroundColor: 'grey',
        },
        {
            text: 'Start typing here...',
            fontSize: '14px',
            color: 'white',
            backgroundColor: 'black',
        },
        {},
        {
            text: 'Start typing here...',
            fontSize: '14px',
            color: 'white',
            backgroundColor: 'black',
        },
    ])

    const [cursorPosition, setCursorPosition] = useState({ position: 0, textPieceIndex: 0 });

    const textTypingHandler = useCallback((index, content, caretPosition) => {
        const textPiecesClone = [...textPieces];
            textPiecesClone[index].text = content

        setCursorPosition({ position: caretPosition, textPieceIndex: index });
        setTextPieces([...textPiecesClone]);
    }, [textPieces])

    const addBreak = useCallback((index, caretPosition) => {
        const textPiecesClone = [...textPieces];

        const breakText = textPiecesClone[index].text.split('');
        const restText = breakText.splice(caretPosition, breakText.length - caretPosition);

        textPiecesClone[index].text = breakText.join('');
        const restObj = { ...textPiecesClone[index] };
        restObj.text = restText.join(''); 

        textPiecesClone.splice(index + 1, 0, {}, restObj);

        setCursorPosition({ position: 0, textPieceIndex: index + 2 })

        setTextPieces([...textPiecesClone]);
    }, [textPieces])

    const removeBreak = (currentIndex, removeIndex) => {
        const textPiecesClone = [...textPieces];
        const brElement = textPiecesClone[removeIndex];
        if (brElement && Object.keys(brElement).length === 0) {
            textPiecesClone.splice(removeIndex, 1);

            if (currentIndex > removeIndex) {
                --currentIndex;
                --removeIndex;
            }

            if (objectsAreEqual(textPiecesClone[currentIndex], textPiecesClone[removeIndex])) {
                if (currentIndex > removeIndex) {
                    setCursorPosition({ position: textPiecesClone[removeIndex].text.length, textPieceIndex: removeIndex });

                    textPiecesClone[removeIndex].text = textPiecesClone[removeIndex].text + textPiecesClone[currentIndex].text;
                    textPiecesClone.splice(currentIndex, 1);
                }
                else {
                    setCursorPosition({ position: textPiecesClone[currentIndex].text.length, textPieceIndex: currentIndex });

                    textPiecesClone[currentIndex].text = textPiecesClone[currentIndex].text + textPiecesClone[removeIndex].text;
                    textPiecesClone.splice(removeIndex, 1);
                }
            }
            setTextPieces([...textPiecesClone]);
        }
    }

    return (
        <div className={classes.area}>
            <TextItems
                pieces={textPieces}
                cursorPosition={cursorPosition}
                addBreak={addBreak}
                removeBreak={removeBreak}
                onChange={textTypingHandler} />
        </div>
    )
}

export default TextArea;
