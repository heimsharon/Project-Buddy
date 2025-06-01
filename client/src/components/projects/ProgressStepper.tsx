import React from 'react';

interface ProgressStepperProps {
    steps: string[];
    currentStep: number;
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
    steps,
    currentStep,
}) => (
    <div style={{ display: 'flex', marginBottom: 24 }}>
        {steps.map((step, idx) => (
            <div key={step} style={{ flex: 1, textAlign: 'center' }}>
                <div
                    style={{
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        background: idx <= currentStep ? '#1976d2' : '#e0e0e0',
                        color: '#fff',
                        margin: '0 auto',
                        lineHeight: '32px',
                        fontWeight: 'bold',
                    }}
                >
                    {idx + 1}
                </div>
                <div style={{ fontSize: 12, marginTop: 4 }}>{step}</div>
                {idx < steps.length - 1 && (
                    <div
                        style={{
                            height: 2,
                            background: '#e0e0e0',
                            margin: '0 8px',
                        }}
                    />
                )}
            </div>
        ))}
    </div>
);

export default ProgressStepper;
