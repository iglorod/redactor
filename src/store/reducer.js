import * as actionTypes from './actionTypes';
import { joinTextPiecesByIndex, joinTextPieces, splitTextPiece } from '../utility/text-blocks';

const initialState = {
    textPieces: [
        {
          text: 'Hi My lovely',
          fontSize: '16px',
          color: '#5300eb',
          backgroundColor: '#fad0c3'
        },
        {
          text: 'little',
          fontSize: '32px',
          color: '#db3e00',
          backgroundColor: '#c1e1c5'
        },
        {},
        {
          text: 'Ponny',
          fontSize: '14px',
          color: '#ffffff',
          backgroundColor: '#006b76'
        }
      ],
    selectionRange: [0, 0],
    pieceIndex: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_TEXT: {
            const textPiecesClone = [...state.textPieces];
            textPiecesClone[action.pieceIndex].text = action.content;

            return {
                ...state,
                textPieces: [...textPiecesClone],
                selectionRange: [action.caretPosition, action.caretPosition],
                pieceIndex: action.pieceIndex,
            };
        }

        case actionTypes.ADD_BREAK: {
            const textPiecesClone = [...state.textPieces];

            const leftText = textPiecesClone[action.pieceIndex].text.split('');
            const rightText = leftText.splice(action.caretPosition, leftText.length - action.caretPosition);

            textPiecesClone[action.pieceIndex].text = leftText.join('');
            const rightObj = { ...textPiecesClone[action.pieceIndex] };
            rightObj.text = rightText.join('');

            textPiecesClone.splice(action.pieceIndex + 1, 0, {}, rightObj);

            return {
                ...state,
                textPieces: [...textPiecesClone],
                selectionRange: [0, 0],
                pieceIndex: action.pieceIndex + 2,
            };
        }

        case actionTypes.REMOVE_BREAK: {
            let textPiecesClone = [...state.textPieces];
            const brElement = textPiecesClone[action.removeIndex];
            
            if (brElement && Object.keys(brElement).length === 0) {
                textPiecesClone.splice(action.removeIndex, 1);

                if (action.currentIndex > action.removeIndex) {
                    --action.currentIndex;
                    --action.removeIndex;
                }

                const { updatedTextPieces, index, cursorPosition } = joinTextPiecesByIndex(textPiecesClone, action.currentIndex, action.removeIndex);
                
                return {
                    ...state,
                    textPieces: [...updatedTextPieces],
                    selectionRange: [cursorPosition, cursorPosition],
                    pieceIndex: index,
                };
            }
            return state;
        }

        case actionTypes.SET_SELECTION: {
            let range = action.range;
            if (!Array.isArray(range)) range = [range, range];

            return {
                ...state,
                selectionRange: range,
                pieceIndex: action.pieceIndex,
            };
        }

        case actionTypes.SET_NEW_PROPERTY: {
            const textPiecesClone = [...state.textPieces];

            let newPieces = splitTextPiece(textPiecesClone, action.pieceIndex, action.selectedRange, action.property);
            newPieces = joinTextPieces(textPiecesClone[action.pieceIndex - 1], ...newPieces, textPiecesClone[action.pieceIndex + 1]);

            const insertIndex = action.pieceIndex - 1;
            textPiecesClone.splice(insertIndex >= 0 ? insertIndex : 0, insertIndex >= 0 ? 3 : 2, ...newPieces);

            return {
                ...state,
                textPieces: [...textPiecesClone],
                selectionRange: [0, 0],
                pieceIndex: action.pieceIndex,
            };
        }

        default: return state;
    }
}

export default reducer;
