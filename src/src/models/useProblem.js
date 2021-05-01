import { useState, useEffect } from 'react';
import db from '../firebase.config';

const useProblem = (id) => {
    // eslint-disable-next-line
    const [problem, setProblem] = useState({
        "Plan": [],
        "Solution": null,
        "LastUpdatedDate": null,
        "Title": null,
        "SolvedDate": null,
        "CreatedDate": null,
        "id": null
    });

    useEffect(() => {
        async function getProblem(id) {
            const probRef = db.collection('problems').doc(id);
            const doc = await probRef.get();
            if (doc.exists) {
                let d = doc.data();
                d.id = doc.id;
                setProblem(d);
                console.log(d);
            } else {
                console.error('Problem does not exist')
            }
        }
        return getProblem(id);
    }, [id, problem, setProblem]);

    return [problem, setProblem];
};

export default useProblem;