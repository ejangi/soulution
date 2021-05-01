import React, { useState } from 'react';
import StepCounter from '../components/stepCounter';
import TextArrayInput from '../components/textArrayInput';

function ProblemsModal(props) {
    const [currentStep, setCurrentStep] = useState(1);
    const name = props.name ? props.name : 'problemsModal';

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
            setCurrentStep(currentStep + 1);
            document.querySelector('.step .field input').focus();
        }
    }

    function prev() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    function close() {
        props.setOpenState(false);
        setCurrentStep(1);
    }

    function handleChange(key, value) {
        props.problem[key] = value;
        props.setProblem(props.problem);
    }

    return(
        <div className="modal" id={name} tabIndex="-1" role="dialog" aria-hidden={!props.openState}>
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
                                    <input type="text" id="Title" defaultValue={props.problem.Title} onChange={(e) => { handleChange('Title', e.target.value) }} />
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
                                    <label htmlFor="Possibilities">Possible solutions</label>
                                    <TextArrayInput id="Possibilities" key="Possibilities" value={props.problem.Possibilities} handleChange={handleChange} />
                                </div>
                                <div className="hint">
                                    Avoid evaluating the merits of each solution in this step.
                                </div>
                            </div>
                        }
                        { currentStep === 3 &&
                            <div className="step evaluate">
                                Evaluate: {props.problem.Title}
                            </div>
                        }
                        { currentStep === 4 &&
                            <div className="step choose">
                                Choose: {props.problem.Title}
                            </div>
                        }
                        { currentStep === 5 &&
                            <div className="step plan">
                                Plan: {props.problem.Title}
                            </div>
                        }
                        { currentStep === 6 &&
                            <div className="step review">
                                Review: {props.problem.Title}
                            </div>
                        }
                    </div>
                    <div className="modal-footer">
                        { currentStep > 1 &&
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={prev}>Back</button>
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