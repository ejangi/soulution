import { useState, useEffect } from 'react';
import db from '../firebase.config';

const useProblems = () => {
    // eslint-disable-next-line
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        db.collection('problems').get()
        .then(querySnapshot => {
            querySnapshot.forEach( doc => {
                let d = doc.data();
                d.id = doc.id;
                setProblems(prev => ([...prev, d]))
            })
        })
        .catch(err => {
            console.error(err.message)
        })
    }, []);

    return [problems];
};

const getProblem = (problemId) => {
    console.log('Hello world ' + problemId);
};

export { getProblem };
export default useProblems;