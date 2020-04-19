import React from 'react';
import { connect } from 'react-redux';

import TextItem from './TextItem/TextItem';
import { changeTextActionCreator, addBreakActionCreator, removeBreakActionCreator } from '../../store/actions';
import './TextArea.css';

const TextArea = (props) => {
    const { changeText, addTextBreak, removeTextBreak } = props;

    const textTypingHandler = (index, content, caretPosition) => {
        changeText(index, content, caretPosition);
    }

    const addBreak = (index, caretPosition) => {
        addTextBreak(index, caretPosition);
    }

    const removeBreak = (currentIndex, removeIndex) => {
        removeTextBreak(currentIndex, removeIndex);
    }

    const cursor = {
        index: props.pieceIndex,
        position: props.caretPosition,
    }

    return (
        <div className='area'>
            {
                props.textPieces.map((piece, index) => (
                    <TextItem
                        key={index}
                        piece={piece}
                        index={index}
                        cursorPosition={index === cursor.index ? cursor.position : null}
                        addBreak={addBreak}
                        removeBreak={removeBreak}
                        onChange={textTypingHandler} />
                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        textPieces: state.textPieces,
        caretPosition: state.selectionRange,
        pieceIndex: state.pieceIndex,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeText: (pieceIndex, content, caretPosition) => { dispatch(changeTextActionCreator(pieceIndex, content, caretPosition)) },
        addTextBreak: (pieceIndex, caretPosition) => { dispatch(addBreakActionCreator(pieceIndex, caretPosition)) },
        removeTextBreak: (currentIndex, removeIndex) => { dispatch(removeBreakActionCreator(currentIndex, removeIndex)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);
