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

export const mergeTwoPieces = (textPiecesClone, donorIndex, receiverIndex) => {
    const newPieceIndex = receiverIndex;
    const newCursorPosition = textPiecesClone[receiverIndex].text.length;

    textPiecesClone[receiverIndex].text = textPiecesClone[receiverIndex].text + textPiecesClone[donorIndex].text;
    textPiecesClone.splice(donorIndex, 1);

    return { updatedTextPieces: textPiecesClone, index: newPieceIndex, cursorPosition: newCursorPosition };
}

export const joinTextPiecesByIndex = (textPiecesClone, firstIndex, secondIndex) => {
    let newPieceIndex = 0;
    let newCursorPosition = 0;

    if (objectsAreEqual(textPiecesClone[firstIndex], textPiecesClone[secondIndex])) {
        if (firstIndex > secondIndex) {
            return mergeTwoPieces(textPiecesClone, firstIndex, secondIndex);
        } else {
            return mergeTwoPieces(textPiecesClone, secondIndex, firstIndex);
        }
    }
    return { updatedTextPieces: textPiecesClone, index: newPieceIndex, cursorPosition: newCursorPosition };
}

export const joinTextPieces = (...textPieces) => {
    const newPieces = textPieces.reduce((newPieces, piece, index) => {
        if (!piece) return newPieces;

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

export const getTextPiecesJson = (textPieces) => {
    const jsonTextPieces = textPieces
        .reduce((jsonTextPieces, piece, index) => {
            if (index === 0) return [{ ...piece }];
            if (Object.keys(piece).length === 0) return jsonTextPieces;

            const prevPiece = jsonTextPieces[jsonTextPieces.length - 1];

            if (objectsAreEqual(prevPiece, piece)) {
                prevPiece.text = prevPiece.text + piece.text;
            } else jsonTextPieces.push({...piece});

            return jsonTextPieces;
        }, [])

    return JSON.stringify(jsonTextPieces, null, 2);
}
