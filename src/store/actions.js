import * as actionTypes from './actionTypes';

export const changeTextActionCreator = (pieceIndex, content, caretPosition) => {
    return {
        type: actionTypes.CHANGE_TEXT,
        pieceIndex,
        content,
        caretPosition,
    }
}

export const addBreakActionCreator = (pieceIndex, caretPosition) => {
    return {
        type: actionTypes.ADD_BREAK,
        pieceIndex,
        caretPosition,
    }
}

export const removeBreakActionCreator = (currentIndex, removeIndex) => {
    return {
        type: actionTypes.REMOVE_BREAK,
        currentIndex,
        removeIndex,
    }
}

export const setSelectionRangeActionCreator = (pieceIndex, range) => {
    return {
        type: actionTypes.SET_SELECTION,
        pieceIndex,
        range,
    }
}

export const setNewPropertyActionCreator = (selectedRange, pieceIndex, property) => {
    return {
        type: actionTypes.SET_NEW_PROPERTY,
        selectedRange,
        pieceIndex,
        property,
    }
}

