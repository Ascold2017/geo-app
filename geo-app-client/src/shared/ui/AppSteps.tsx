interface AppStepsProps {
    steps: string[],
    currentStep: number
}
export function AppSteps({ steps, currentStep }: AppStepsProps) {
    return (
        <ul className="steps steps-vertical md:steps-horizontal mb-3">
            {steps.map((step, index) => (<li className={`step ${index < currentStep ? 'step-primary' : ''}`}>{step}</li>))}
        </ul>
    )
}