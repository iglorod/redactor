import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { getTextPiecesJson } from '../../utility/text-blocks';
import TextActions from './TextActions/TextActions';
import classes from './Header.module.css';

const Header = (props) => {
    const showJson = () => {
        console.log(getTextPiecesJson(props.textPieces));
    }

    return (
        <header className={classes.header}>
            <TextActions />
            <Button variant="light" onClick={showJson}>Show JSON (in concole)</Button>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        textPieces: state.textPieces,
    }
}

export default connect(mapStateToProps)(Header);
