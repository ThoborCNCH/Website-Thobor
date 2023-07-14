import React from 'react';

const Errors = (props) => {

    const error = props.match.params.type;

    return (
        <div>
            {error}
        </div>
    );
}

export default Errors;
