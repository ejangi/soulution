import React, { useState } from 'react';
import StepCounter from '../components/stepCounter';

function ProblemsModal(props) {
    const [currentStep, setCurrentStep] = useState(1);
    const name = props.name ? props.name : 'problemsModal';

    const steps = [
        { number: 1, label: 'Define', html: '' },
        { number: 2, label: 'List', html: '' },
        { number: 3, label: 'Evaluate', html: '' },
        { number: 4, label: 'Choose', html: '' },
        { number: 5, label: 'Plan', html: '' },
        { number: 6, label: 'Review', html: '' }
    ];

    function next() {
        if (currentStep === steps[steps.length-1].number) {
            close();
        } else {
            setCurrentStep(currentStep + 1);
        }
    }

    function prev() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    function close() {
        props.setOpenState(false);
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
                            <div className="define">
                                Define: {props.problem.Title}
                            </div>
                        }
                        { currentStep === 2 &&
                            <div className="list">
                                List: {props.problem.Title}
                            </div>
                        }
                        { currentStep === 3 &&
                            <div className="evaluate">
                                Evaluate: {props.problem.Title}
                            </div>
                        }
                        { currentStep === 4 &&
                            <div className="choose">
                                Choose: {props.problem.Title}
                            </div>
                        }
                        { currentStep === 5 &&
                            <div className="plan">
                                Plan: {props.problem.Title}
                            </div>
                        }
                        { currentStep === 6 &&
                            <div className="review">
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