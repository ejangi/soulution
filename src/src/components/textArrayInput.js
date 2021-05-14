import React, { useState, useEffect } from 'react';
import useDynamicRefs from 'use-dynamic-refs';

function TextArrayInput(props) {
    // By having state within the component change it will force the component to re-render.
    const [values, setValues] = useState(props.value);
    const [getRef, setRef] =  useDynamicRefs();

    useEffect(() => {
        setValues(props.value);
    }, [props]);

    function toKey(i) {
        return props.id + i;
    }

    function gatherValues() {
        let vals = [];
        [...Array(values.length).keys()].forEach(i => {
            if (getRef(toKey(i)) && getRef(toKey(i)).current && getRef(toKey(i)).current.lastChild.value.length > 0) {
                vals.push(getRef(toKey(i)).current.lastChild.value);
            }
        });

        if (getRef(toKey('New')) && getRef(toKey('New')).current && getRef(toKey('New')).current.lastChild.value.length > 0) {
            vals.push(getRef(toKey('New')).current.lastChild.value);
        }

        return vals;
    }

    function commit(e) {
        let targetValue = e.target.value.trim();
        if (targetValue.length === 0) {
            return false;
        }

        let vals = gatherValues();
        if (vals !== values) {
            props.handleChange(props.id, vals);
            setValues(vals);
            setTimeout(() => {
                if (getRef(toKey('New')) && getRef(toKey('New')).current) {
                    getRef(toKey('New')).current.focus();
                }
            }, 10);
        }
    }

    function onKeyUp(e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            if (e.target.className === 'text-array-input-new') {
                commit(e);
                e.target.value = "";
                e.target.focus();
            } else if(getRef(toKey(e.target.tabIndex))) {
                getRef(toKey(e.target.tabIndex)).current.focus();
            }
        }

        if (e.key === 'Backspace' && e.target.value.trim().length === 0) {
            commit(e);
            if (e.target.tabIndex > 1 && getRef(toKey(e.target.tabIndex - 2))) {
                getRef(toKey(e.target.tabIndex - 2)).current.focus();
            }
        }

        if (e.key === 'ArrowUp' && e.target.tabIndex > 1 && getRef(toKey(e.target.tabIndex - 2))) {
            getRef(toKey(e.target.tabIndex - 2)).current.focus();
        }

        if (e.key === 'ArrowDown') {
            if (getRef(toKey(e.target.tabIndex)) && getRef(toKey(e.target.tabIndex)).current) {
                getRef(toKey(e.target.tabIndex)).current.focus();
            } else {
                getRef(toKey('New')).current.focus();
            }
        }
    }

    function onChange(e) {
        if ((e.target.className === 'text-array-input-new' 
            && e.target.value.trim().length > 0) 
            || e.target.className !== 'text-array-input-new') {
            commit(e);
        }
    }

    return(
        <div className="text-array-input">
            { values.map((val, i) => {
                return <label ref={setRef(toKey(i))} key={toKey(i+1)}><em>{(i+1)}</em><input type="text" defaultValue={val} onBlur={onChange} onKeyUp={onKeyUp} tabIndex={(i+1)} /></label>
            }) }
            <label ref={setRef(toKey('New'))} key={toKey(values.length+1)} className="text-array-input-new"><em>{(values.length+1)}</em><input className="text-array-input-new" type="text" onBlur={onChange} onKeyUp={onKeyUp} tabIndex={(values.length+1)} /></label>
        </div>
    );
}

export default TextArrayInput;