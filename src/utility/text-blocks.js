export const objectsAreEqual = (obj1, obj2) => {
    if (!obj1 || !obj2) return false;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    
    let isEqual = true;
    for (let key in obj1) {
        if (key === 'text') continue;
        isEqual = obj1[key] === obj2[key] && isEqual;
    }

    return isEqual;
}

export const joinTextPiecesByIndex = (textPiecesClone, firstIndex, secondIndex) => {
    let newPieceIndex = 0;
    let newCursorPosition = 0;

    if (objectsAreEqual(textPiecesClone[firstIndex], textPiecesClone[secondIndex])) {
        if (firstIndex > secondIndex) {
            newPieceIndex = secondIndex;
            newCursorPosition = textPiecesClone[secondIndex].text.length;

            textPiecesClone[secondIndex].text = textPiecesClone[secondIndex].text + textPiecesClone[firstIndex].text;
            textPiecesClone.splice(firstIndex, 1);
        } else {
            newPieceIndex = firstIndex;
            newCursorPosition = textPiecesClone[firstIndex].text.length;

            textPiecesClone[firstIndex].text = textPiecesClone[firstIndex].text + textPiecesClone[secondIndex].text;
            textPiecesClone.splice(secondIndex, 1);
        }
    }
    return { updatedTextPieces: textPiecesClone, index: newPieceIndex, cursorPosition: newCursorPosition };
}

export const joinTextPieces = (...textPieces) => {
    const newPieces = textPieces.reduce((newPieces, piece, index) => {
        if (!piece) return newPieces;
        console.log(piece)
        if (index > 0) {
            if (objectsAreEqual(textPieces[index - 1], piece)) {
                newPieces[newPieces.length - 1].text = newPieces[newPieces.length - 1].text + piece.text;
            } else newPieces.push(piece);
        } else newPieces.push(piece)

        return newPieces;
    }, []);

    return newPieces;
}

export const splitTextPiece = (textPiecesClone, pieceIndex, selectedRange, newProperty) => {
    const piece = textPiecesClone[pieceIndex];

    const pieceText = textPiecesClone[pieceIndex].text.split('');

    const leftText = pieceText.splice(0, selectedRange[0]).join('');
    const middleText = pieceText.splice(0, selectedRange[1] - selectedRange[0]).join('');
    const rightText = pieceText.join('');

    const leftObj = { ...piece, text: leftText }
    const middleObj = { ...piece, text: middleText, ...newProperty }
    const rightObj = { ...piece, text: rightText };
    
    return clearEmptyTextPieces(leftObj, middleObj, rightObj);
}

export const clearEmptyTextPieces = (...textPieces) => {
    const newPieces = textPieces.reduce((newPieces, piece, index) => {
        if (piece && piece.text === undefined) {
            newPieces.push(piece)
            return newPieces;
        }

        if (!piece || piece.text.length === 0) return newPieces;

        newPieces.push(piece)
        return newPieces;
    }, []);

    return newPieces;
}
