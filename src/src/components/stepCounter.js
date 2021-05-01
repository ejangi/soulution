import React from 'react';

function stepCounter(props) {
    const steps = props.steps ? props.steps : [];

    return(
        <div className="step-counter">
            {steps.map(step => (
                <div key={step.number} className={step.number < props.currentStep || props.currentStep === step.number ? 'step active' : 'step'}>
                    <div className="number" onClick={(e) => { props.setStep(step.number)}}><em>{step.number}</em></div>
                    <div className={props.currentStep === step.number ? 'label' : 'label hidden'}>{step.label}</div>
                </div>
            ))}
        </div>
    );
}

export default stepCounter;