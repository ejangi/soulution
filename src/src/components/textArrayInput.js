import React, { useState, useRef, createRef } from 'react';

function TextArrayInput(props) {
    // By having state within the component change it will force the component to re-render.
    const [, setArrayCount] = useState(props.value.length);
    const elementRefs = useRef([...props.value,(props.value.length+1)].map(() => createRef()));

    function toKey(i) {
        return props.id + i;
    }

    function onKeyUp(e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (e.target.className === 'text-array-input-new') {
                let targetValue = e.target.value.trim();
                if (targetValue.length === 0) {
                    return false;
                }
                let updatedValue = props.value;
                updatedValue.push(targetValue);
                props.handleChange(props.id, updatedValue);
                setArrayCount(count => count + 1);
                e.target.value = "";
                e.target.focus();
            } else if(elementRefs.current.length > e.target.tabIndex) {
                elementRefs.current[e.target.tabIndex].current.focus();
            }
        }

        if (e.key === 'ArrowUp' && (e.target.tabIndex - 2) >= 0) {
            elementRefs.current[e.target.tabIndex - 2].current.focus();
        }

        if (e.key === 'ArrowDown' && elementRefs.current.length >= (e.target.tabIndex + 1)) {
            elementRefs.current[e.target.tabIndex].current.focus();
        }
    }

    function onChange(e) {
        // @TODO
    }

    return(
        <div className="text-array-input">
            { props.value.map((val, i) => {
                return <label ref={elementRefs.current[i]} key={toKey(i+1)}><em>{(i+1)}</em><input type="text" defaultValue={val} onBlur={onChange} onKeyUp={onKeyUp} tabIndex={(i+1)} /></label>
            }) }
            <label ref={elementRefs.current[props.value.length]} key={toKey(props.value.length+1)} className="text-array-input-new"><em>{(props.value.length+1)}</em><input className="text-array-input-new" type="text" onChange={onChange} onKeyUp={onKeyUp} tabIndex={(props.value.length+1)} /></label>
        </div>
    );
}

export default TextArrayInput;