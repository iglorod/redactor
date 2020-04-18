import React from 'react';

import JsonArea from './JsonArea/JsonArea';
import TextArea from './TextArea/TextArea';

const Areas = (props) => {
    if (props.showJson) return <JsonArea />
    return <TextArea />
}

export default Areas;
