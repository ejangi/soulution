import React from 'react';
import useProblems from '../models/useProblems';
import timeAgo from '../helpers/timeAgo';

function ProblemsList() {
    const [problems] = useProblems();

    const getProblem = (id) => {
        let filtered = problems.filter(problem => problem.id === id);
        let problem = filtered && filtered.length > 0 ? filtered[0] : null;
        return problem;
    }

    const handleClick = (e, id) => {
       let problem = getProblem(id);
       console.log(problem);
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