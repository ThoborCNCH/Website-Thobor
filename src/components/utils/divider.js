import React from 'react';
import './styles/background.scss';

import dividerImage from '../../images/divider.png';
const Divider = () => {
    return (
        <div>
            <div className="dividerIntro">
                <img src={dividerImage} alt=""/>
            </div>
        </div>
    );
};

export default Divider;
