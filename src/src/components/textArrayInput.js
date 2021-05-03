import React, { useState } from 'react';
import useDynamicRefs from 'use-dynamic-refs';

function TextArrayInput(props) {
    // By having state within the component change it will force the component to re-render.
    const [, setArrayCount] = useState(props.value.length);
    const [getRef, setRef] =  useDynamicRefs();

    function toKey(i) {
        return props.id + i;
    }

    function commit(e) {
        let targetValue = e.target.value.trim();
        if (targetValue.length === 0) {
            return false;
        }
        let updatedValue = props.value;
        updatedValue.push(targetValue);
        
        if (e.target.className === 'text-array-input-new') {    
            setArrayCount(count => count + 1);
            e.target.value = "";
        }

        props.handleChange(props.id, updatedValue);
    }

    function onKeyUp(e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (e.target.className === 'text-array-input-new') {
                commit(e);
                e.target.focus();
            } else if(getRef(toKey(e.target.tabIndex))) {
                getRef(toKey(e.target.tabIndex)).current.focus();
            }
        }

        if (e.key === 'ArrowUp' && e.target.tabIndex > 1 && getRef(toKey(e.target.tabIndex - 2))) {
            getRef(toKey(e.target.tabIndex - 2)).current.focus();
        }

        if (e.key === 'ArrowDown') {
            if (getRef(toKey(e.target.tabIndex))) {
                getRef(toKey(e.target.tabIndex)).current.focus();
            } else {
                getRef(toKey('New')).current.focus();
            }
        }
    }

    function onChange(e) {
        commit(e);
    }

    return(
        <div className="text-array-input">
            { props.value.map((val, i) => {
                return <label ref={setRef(toKey(i))} key={toKey(i+1)}><em>{(i+1)}</em><input type="text" defaultValue={val} onBlur={onChange} onKeyUp={onKeyUp} tabIndex={(i+1)} /></label>
            }) }
            <label ref={setRef(toKey('New'))} key={toKey(props.value.length+1)} className="text-array-input-new"><em>{(props.value.length+1)}</em><input className="text-array-input-new" type="text" onChange={onChange} onKeyUp={onKeyUp} tabIndex={(props.value.length+1)} /></label>
        </div>
    );
}

export default TextArrayInput;