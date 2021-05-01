import React, { useState } from 'react';

function TextArrayInput(props) {
    // By having state within the component change it will force the component to re-render.
    const [, setArrayCount] = useState(props.value.length);

    function toKey(i) {
        return props.id + i;
    }

    function onKeyUp(e) {
        if (e.key === 'Enter' && e.target.className === 'text-array-input-new') {
            e.preventDefault();
            let updatedValue = props.value;
            updatedValue.push(e.target.value);
            props.handleChange(props.id, updatedValue);
            setArrayCount(count => count + 1);
            e.target.value = "";
        }
    }

    function onChange(e) {

    }

    return(
        <div className="text-array-input">
            { props.value.map((val, i) => {
                return <label key={toKey(i+1)}><em>{(i+1)}</em><input type="text" defaultValue={val} onBlur={onChange} onKeyUp={onKeyUp} tabIndex={(i+1)} /></label>
            }) }
            <label className="text-array-input-new" key="text-array-input-new"><em>{(props.value.length+1)}</em><input className="text-array-input-new" type="text" onChange={onChange} onKeyUp={onKeyUp} tabIndex={(props.value.length+1)} /></label>
        </div>
    );
}

export default TextArrayInput;