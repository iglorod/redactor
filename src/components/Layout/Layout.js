import React, { useState } from 'react';

import Area from '../Areas/Areas';
import Header from '../Header/Header';

const Layout = () => {
    const [showJson, setShowJson] = useState(false);

    const handleSwitch = () => {
        setShowJson(prevState => !prevState);
    }

    return (
        <>
        <Header handleSwitch={handleSwitch} />
            <Area showJson={showJson} />
        </>
    )
}

export default Layout;
