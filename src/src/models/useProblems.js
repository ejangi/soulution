import { useState, useEffect } from 'react';
import db from '../firebase.config';

const useProblems = () => {
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

export default useProblems;