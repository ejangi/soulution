import React from 'react';
import timeAgo from '../helpers/timeAgo';

function ProblemsList(props) {
    const getProblem = (id) => {
        let filtered = props.problems.filter(problem => problem.id === id);
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
            props.problems && props.problems.map((problem, index) => {
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