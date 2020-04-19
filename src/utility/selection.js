export const getSelection = () => {
    if (window.getSelection) {
        const selection = window.getSelection();
        return [selection.anchorOffset, selection.extentOffset];
    }

    const selection = document.selection.createRange();
    return [selection.anchorOffset, selection.extentOffset];
}

export const setCaret = (element, position) => {
    if (!element || element.length < position[1]) return;

    if (position[0] < position[1]) return;
    const sel = window.getSelection();
    const range = document.createRange();
    range.setStart(element, position[0]);
    range.setEnd(element, position[1]);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

