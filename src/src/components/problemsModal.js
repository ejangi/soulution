import React, { useEffect, useState } from 'react';
import StepCounter from '../components/stepCounter';
import TextArrayInput from '../components/textArrayInput';
import escapeAttr from '../helpers/escapeAttr';
import unescapeAttr from '../helpers/unescapeAttr';

function ProblemsModal(props) {
    const [currentStep, setCurrentStep] = useState(1);
    const [problem, setProblem] = useState(props.problem);
    const name = props.name ? props.name : 'problemsModal';

    useEffect(() => {
        setProblem(props.problem);
    }, [props]);

    useEffect(() => {
        setCurrentStep(props.openState);
    }, [props.openState]);

    const steps = [
        { number: 1, label: 'Define' },
        { number: 2, label: 'List' },
        { number: 3, label: 'Evaluate' },
        { number: 4, label: 'Choose' },
        { number: 5, label: 'Plan' },
        { number: 6, label: 'Review' }
    ];

    function next() {
        if (currentStep === steps[steps.length-1].number) {
            close();
        } else {
            setCurrentStep(currentStep => currentStep + 1);
            props.onStepChange(currentStep);
        }
    }

    function prev() {
        if (currentStep > 1) {
            setCurrentStep(currentStep => currentStep - 1);
            props.onStepChange(currentStep);
        }
    }

    function close() {
        props.setOpenState(0);
    }

    function handleChange(key, value) {
        props.onChange(key, value);
    }

    function handleChooseSolution(e) {
        if (e.target.parentNode && e.target.parentNode.tagName === 'LABEL') {
            document.querySelectorAll(`#${e.target.id}`).forEach(el => el.parentNode.classList.remove('active'));
            e.target.parentNode.classList.add('active');
            e.target.checked = true;
            let val = unescapeAttr(e.target.value);
            handleChange(e.target.id, val);
        }
    }

    function handleDelete(e) {
        if (problem.id && window.confirm('Are you sure?')) {
            props.handleDelete(problem.id);
        }
    }

    return(
        <div className="modal" id={name} tabIndex="-1" role="dialog" aria-hidden={props.openState > 0 ? false : true}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <StepCounter steps={steps} currentStep={currentStep} setStep={setCurrentStep} />
                        <button type="button" className="btn btn-close" onClick={close}>&#215;</button>
                    </div>
                    <div className="modal-body">
                        { currentStep === 1 &&
                            <div className="step define">
                                <h2>Define the problem</h2>
                                <div className="field">
                                    <label htmlFor="Title">The Problem</label>
                                    <input type="text" id="Title" defaultValue={problem.Title} onChange={(e) => { handleChange('Title', e.target.value) }} />
                                </div>
                                <div className="hint">
                                    The more narrowly you can define the problem, the better.
                                </div>
                            </div>
                        }
                        { currentStep === 2 &&
                            <div className="step list">
                                <h2>List all possible solutions <span className="nowrap">(even the bad ones)</span></h2>
                                <div className="field">
                                    <label htmlFor="Solutions">Possible solutions</label>
                                    <TextArrayInput id="Solutions" key="Solutions" value={problem?.Solutions ? problem.Solutions.map(solution => solution.Title) : []} handleChange={handleChange} />
                                </div>
                                <div className="hint">
                                    Avoid evaluating the merits of each solution in this step.
                                </div>
                            </div>
                        }
                        { currentStep === 3 &&
                            <div className="step evaluate">
                                { problem.Solutions.map((solution, i) => {
                                    return <div key={i} className="solution">
                                        <h2>{solution.Title}</h2>
                                        <div className="field pros">
                                            <label htmlFor={`Pros[${i}]`}>Pros</label>
                                            <TextArrayInput id={`Solutions[${i}].Pros`} key={`Solutions[${i}].Pros`} value={solution.Pros} handleChange={handleChange} />
                                        </div>

                                        <div className="field cons">
                                            <label htmlFor={`Solutions[${i}].Cons`}>Cons</label>
                                            <TextArrayInput id={`Solutions[${i}].Cons`} key={`Solutions[${i}].Cons`} value={solution.Cons} handleChange={handleChange} />
                                        </div>
                                    </div>
                                })}
                            </div>
                        }
                        { currentStep === 4 &&
                            <div className="step choose">
                                <h2>Choose the best or most practical solution</h2>
                                { problem.Solutions.map((solution, i) => {
                                    return <label key={`Choose[${i}]`} className={problem.Solution && problem.Solution === solution.Title ? 'radio active' : 'radio'} tabIndex={i}>
                                        <input type="radio" id="Solution" name="Solution" value={escapeAttr(solution.Title)} onChange={handleChooseSolution} checked={problem.Solution === solution.Title} />
                                        <span className="label">{solution.Title}</span>
                                    </label>
                                })}
                            </div>
                        }
                        { currentStep === 5 &&
                            <div className="step plan">
                                <h2>Plan how you will carry out the best solution</h2>
                                <div className="field">
                                    <label htmlFor="Plan">The Plan</label>
                                    <TextArrayInput id="Plan" key="Plan" value={problem?.Plan} handleChange={handleChange} />
                                </div>
                            </div>
                        }
                        { currentStep === 6 &&
                            <div className="step review">
                                <h2>Review your solution</h2>
                                <h3>{problem.Solution}</h3>
                                <ol>
                                    {problem?.Plan.map((item, i) => {
                                        return <li key={i}>{item}</li>
                                    })}
                                </ol>
                            </div>
                        }
                    </div>
                    <div className="modal-footer">
                        { currentStep > 1 &&
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={prev}>Back</button>
                        }
                        { problem.id &&
                        <button type="button" className="btn btn-delete" onClick={handleDelete}>Delete</button>
                        }
                        { currentStep === steps[steps.length-1].number ? 
                        <button type="button" className="btn btn-primary" onClick={close}>Close</button>
                        :
                        <button type="button" className="btn btn-primary" onClick={next}>Next</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProblemsModal;