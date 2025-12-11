import Stepper from '../../../Stepper/Stepper'
import { StepperType, StepState } from '../../../Stepper/types'

const StepperLightHouse = () => {
    // Example step data for different scenarios
    const horizontalSteps = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.CURRENT,
        },
        {
            id: 3,
            title: 'Step 3',
            status: StepState.PENDING,
        },
    ]

    const verticalSteps = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
            description: 'First step description',
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.CURRENT,
            description: 'Second step description',
        },
        {
            id: 3,
            title: 'Step 3',
            status: StepState.PENDING,
        },
    ]

    const stepsWithSubsteps = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
            substeps: [
                { id: 1, title: 'Substep 1.1' },
                { id: 2, title: 'Substep 1.2' },
            ],
            isExpanded: true,
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.CURRENT,
        },
    ]

    const clickableSteps = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.CURRENT,
        },
        {
            id: 3,
            title: 'Step 3',
            status: StepState.PENDING,
        },
    ]

    const stepsWithDisabled = [
        {
            id: 1,
            title: 'Step 1',
            status: StepState.COMPLETED,
        },
        {
            id: 2,
            title: 'Step 2',
            status: StepState.DISABLED,
            disabled: true,
        },
        {
            id: 3,
            title: 'Step 3',
            status: StepState.PENDING,
        },
    ]

    return (
        <div className="flex flex-col gap-8 p-8 min-h-screen">
            {/* Page Content - Visible to Lighthouse */}
            <main role="main">
                <h1>Stepper Accessibility Testing</h1>
                <p>
                    This page demonstrates the Stepper component for Lighthouse
                    accessibility auditing. Multiple stepper configurations are
                    shown to test various accessibility features.
                </p>
            </main>

            {/* Horizontal Stepper - Basic */}
            <section aria-labelledby="horizontal-stepper-heading">
                <h2 id="horizontal-stepper-heading">
                    Horizontal Stepper (Basic)
                </h2>
                <div style={{ padding: '20px' }}>
                    <Stepper
                        steps={horizontalSteps}
                        stepperType={StepperType.HORIZONTAL}
                    />
                </div>
                <p className="text-sm text-gray-600">
                    Basic horizontal stepper with three steps showing completed,
                    current, and pending states. All steps have proper ARIA
                    attributes and keyboard navigation support.
                </p>
            </section>

            {/* Vertical Stepper - With Descriptions */}
            <section aria-labelledby="vertical-stepper-heading">
                <h2 id="vertical-stepper-heading">
                    Vertical Stepper (With Descriptions)
                </h2>
                <div style={{ padding: '20px' }}>
                    <Stepper
                        steps={verticalSteps}
                        stepperType={StepperType.VERTICAL}
                    />
                </div>
                <p className="text-sm text-gray-600">
                    Vertical stepper with step descriptions. Steps have proper
                    semantic structure, ARIA attributes, and accessible names
                    with status information.
                </p>
            </section>

            {/* Vertical Stepper - With Substeps */}
            <section aria-labelledby="substeps-stepper-heading">
                <h2 id="substeps-stepper-heading">
                    Vertical Stepper (With Substeps)
                </h2>
                <div style={{ padding: '20px' }}>
                    <Stepper
                        steps={stepsWithSubsteps}
                        stepperType={StepperType.VERTICAL}
                    />
                </div>
                <p className="text-sm text-gray-600">
                    Vertical stepper with expandable substeps. Substeps are
                    properly grouped with role="group" and have proper ARIA
                    attributes (aria-expanded, aria-controls). Keyboard
                    navigation supports moving into and out of substeps.
                </p>
            </section>

            {/* Clickable Stepper */}
            <section aria-labelledby="clickable-stepper-heading">
                <h2 id="clickable-stepper-heading">Clickable Stepper</h2>
                <div style={{ padding: '20px' }}>
                    <Stepper
                        steps={clickableSteps}
                        clickable={true}
                        onStepClick={(index) => {
                            console.log('Step clicked:', index)
                        }}
                        stepperType={StepperType.HORIZONTAL}
                    />
                </div>
                <p className="text-sm text-gray-600">
                    Clickable horizontal stepper. Steps have role="button" and
                    are keyboard accessible. Arrow keys navigate between steps,
                    Enter/Space activate steps. All interactive elements meet
                    minimum touch target size requirements.
                </p>
            </section>

            {/* Stepper with Disabled Steps */}
            <section aria-labelledby="disabled-stepper-heading">
                <h2 id="disabled-stepper-heading">
                    Stepper with Disabled Steps
                </h2>
                <div style={{ padding: '20px' }}>
                    <Stepper
                        steps={stepsWithDisabled}
                        stepperType={StepperType.HORIZONTAL}
                    />
                </div>
                <p className="text-sm text-gray-600">
                    Stepper with disabled steps. Disabled steps have
                    aria-disabled="true" and are not focusable (tabIndex="-1").
                    Screen readers properly announce disabled state.
                </p>
            </section>
        </div>
    )
}

export default StepperLightHouse
