import React, { useState, useEffect } from 'react';
import timeAgo from '../helpers/timeAgo';

function ProblemsList(props) {
    const [problems, setProblems] = useState(props.problems);

    useEffect(() => {
        setProblems(props.problems);
    }, [props]);

    const handleClick = (e, id) => {
       props.getProblem(id);
    };

    return(
        <div className="problems-list">
        {
            problems && problems.map((problem) => {
                return(
                    <div className="problem" id={problem.id} key={problem.id} onClick={(e) => handleClick(e, problem.id)}>
                        <h3>{problem.Title}</h3>
                        <p>{timeAgo(problem.LastUpdatedDate?.seconds * 1000)}</p>
                    </div>
                )
            })
        }
        </div>
    );
}

export default ProblemsList;