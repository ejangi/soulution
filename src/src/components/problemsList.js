import React from 'react';
import useProblems, { getProblem } from '../models/useProblems';
import timeAgo from '../helpers/timeAgo';

function ProblemsList() {
    const [problems] = useProblems();

    const handleClick = (e, id) => {
        getProblem(id);
    };

    return(
        <div className="problems-list">
        {
            problems && problems.map( ( problem, index ) => {
                return(
                    <div className="problem" id={problem.id} key={problem.id} onClick={(e) => handleClick(e, problem.id)}>
                        <h3>{problem.Title}</h3>
                        <p>{timeAgo(problem.LastUpdatedDate.seconds * 1000)}</p>
                    </div>
                )
            })
        }
        </div>
    );
}

export default ProblemsList;