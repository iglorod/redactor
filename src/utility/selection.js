export const getSelection = () => {
    if (window.getSelection) {
        const selection = window.getSelection();
        return [selection.anchorOffset, selection.extentOffset];
    }

    const selection = document.selection.createRange();
    return [selection.anchorOffset, selection.extentOffset];
}

export const setCaret = (element, position) => {
    if (!element || element.length < position) return;

    const sel = window.getSelection();
    const range = document.createRange();
    range.setStart(element, position);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

