import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { setNewPropertyActionCreator } from '../../../store/actions';
import ColorPicker from '../../UI/ColorPicker/ColorPicker';
import FontSizePicker from '../../UI/FontSizePicker/FontSizePicker';

const TextActions = (props) => {
    const [fontSize, setFontSize] = useState('12px');

    const handleFontColorChange = ({ hex }) => {
        if (props.selectedRange[0] === props.selectedRange[1]) return;
        props.setNewProperty(props.selectedRange, props.pieceIndex, { color: hex });
    }

    const handleBackgroundChange = ({ hex }) => {
        if (props.selectedRange[0] === props.selectedRange[1]) return;
        props.setNewProperty(props.selectedRange, props.pieceIndex, { backgroundColor: hex });
    }

    const handleFontChange = (fontSize) => {
        if (props.selectedRange[0] === props.selectedRange[1]) return;
        props.setNewProperty(props.selectedRange, props.pieceIndex, { fontSize });
    }

    const changeFontSize = (fontSize) => {
        setFontSize(fontSize);
        handleFontChange(fontSize);
    }

    return (
        <div>
            <ColorPicker label={'Font color'} handleChange={handleFontColorChange} />
            <ColorPicker label={'Background'} handleChange={handleBackgroundChange} />

            <FontSizePicker
                fontSize={fontSize}
                changeFontSize={changeFontSize}
                onClick={handleFontChange.bind(this, fontSize)} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedRange: state.selectionRange,
        pieceIndex: state.pieceIndex,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNewProperty: (selectedRange, pieceIndex, hex) => { dispatch(setNewPropertyActionCreator(selectedRange, pieceIndex, hex)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextActions);
