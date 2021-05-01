import React from 'react';

function TextArrayInput(props) {

    function onKeyUp(e) {
        if (e.key === 'Enter' && e.target.className === 'text-array-input-new') {
            e.preventDefault();
            let updatedValue = props.value;
            updatedValue.push(e.target.value);
            props.onChange(props.id, updatedValue);
            console.log(updatedValue);
        }
    }

    function onChange(e) {

    }

    return(
        <div className="text-array-input">
            { props.value.map((val, i) => {
                return <label key={(i+1)}><em>{(i+1)}</em><input type="text" defaultValue={val} onBlur={onChange} onKeyUp={onKeyUp} tabIndex={(i+1)} /></label>
            }) }
            <label key="text-array-input-new"><em>{(props.value.length+1)}</em><input className="text-array-input-new" type="text" onChange={onChange} onKeyUp={onKeyUp} tabIndex={(props.value.length+1)} /></label>
        </div>
    );
}

export default TextArrayInput;