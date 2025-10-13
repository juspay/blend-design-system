import { useState } from 'react'
import {
    Stepper,
    StepperType,
    Step,
} from '../../../../packages/blend/lib/components/Stepper'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Check, Settings, User, CreditCard, Package, Truck } from 'lucide-react'

const StepperDemo = () => {
    // Playground state
    const [playgroundCurrentStep, setPlaygroundCurrentStep] = useState(1)
    const [playgroundClickable, setPlaygroundClickable] = useState(false)
    const [playgroundStepCount, setPlaygroundStepCount] = useState('6')
    const [playgroundStepperType, setPlaygroundStepperType] = useState(
        StepperType.HORIZONTAL
    )
    const [playgroundStepTitle, setPlaygroundStepTitle] = useState('Step Title')
    const [playgroundHasTooltips, setPlaygroundHasTooltips] = useState(true)
    const [playgroundHasIcons, setPlaygroundHasIcons] = useState(false)
    const stepperTypeOptions = [
        { value: StepperType.HORIZONTAL, label: 'Horizontal' },
        { value: StepperType.VERTICAL, label: 'Vertical' },
    ]

    // Step count options
    const stepCountOptions = [
        { value: '3', label: '3 Steps' },
        { value: '4', label: '4 Steps' },
        { value: '5', label: '5 Steps' },
        { value: '6', label: '6 Steps' },
    ]

    // Generate playground steps
    const generatePlaygroundSteps = () => {
        const count = parseInt(playgroundStepCount)

        const icons = [
            <User size={16} />,
            <Settings size={16} />,
            <CreditCard size={16} />,
            <Package size={16} />,
            <Truck size={16} />,
            <Check size={16} />,
        ]

        const steps: Step[] = Array.from({ length: count }, (_, index) => ({
            id: index + 1,
            title: `${playgroundStepTitle} ${index + 1}`,
            icon: playgroundHasIcons ? icons[index % icons.length] : undefined,
            description: playgroundHasTooltips
                ? `This is ${playgroundStepTitle} ${index + 1} with additional information`
                : undefined,
            disabled: false,
        }))

        // Add sample substeps to step 2 if available
        if (steps.length >= 2) {
            steps[1] = {
                ...steps[1],
                isExpandable: true,
                isExpanded: true,
                substeps: [
                    { id: 1, title: 'Substep A' },
                    { id: 2, title: 'Substep B' },
                    { id: 3, title: 'Substep C' },
                ],
            }
            steps[2] = {
                ...steps[2],
                isExpandable: true,
                isExpanded: true,
                substeps: [
                    { id: 1, title: 'Substep A' },
                    { id: 2, title: 'Substep B' },
                    { id: 3, title: 'Substep C' },
                ],
            }
            steps[4] = {
                ...steps[4],
                isExpandable: true,
                isExpanded: true,
                substeps: [
                    { id: 1, title: 'Substep A' },
                    { id: 2, title: 'Substep B' },
                    { id: 3, title: 'Substep C' },
                ],
            }
        }

        return steps
    }

    // Simple linear progression with substeps (controller)
    const [linearStep, setLinearStep] = useState(0)
    const [linearSubs, setLinearSubs] = useState<Record<string, number>>({})
    const linearSteps = [
        { id: 1, title: 'Step 1' },
        {
            id: 2,
            title: 'Step 2',
            isExpandable: true,
            isExpanded: true,
            substeps: [
                { id: 1, title: 'Substep 2.1' },
                { id: 2, title: 'Substep 2.2' },
                { id: 3, title: 'Substep 2.3' },
            ],
        },
        { id: 3, title: 'Step 3' },
        { id: 4, title: 'Step 4' },
    ] as Step[]

    const handleNext = () => {
        const step = linearSteps[linearStep]
        const subs = step?.substeps || []
        if (subs.length > 0) {
            const curr = linearSubs[step.id] || 1
            const last = subs.length
            if (curr < last) {
                setLinearSubs((prev) => ({ ...prev, [step.id]: curr + 1 }))
                return
            }
        }
        setLinearStep((s) => Math.min(s + 1, linearSteps.length - 1))
    }

    const handlePrev = () => {
        const step = linearSteps[linearStep]
        const subs = step?.substeps || []
        if (subs.length > 0) {
            const curr = linearSubs[step.id] || 1
            if (curr > 1) {
                setLinearSubs((prev) => ({ ...prev, [step.id]: curr - 1 }))
                return
            }
        }
        setLinearStep((s) => Math.max(s - 1, 0))
    }

    console.log({ linearSubs })

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Step Title"
                            value={playgroundStepTitle}
                            onChange={(e) =>
                                setPlaygroundStepTitle(e.target.value)
                            }
                            placeholder="Enter step title"
                        />
                        <SingleSelect
                            label="Number of Steps"
                            items={[{ items: stepCountOptions }]}
                            selected={playgroundStepCount}
                            onSelect={(value) => {
                                setPlaygroundStepCount(value as string)
                                setPlaygroundCurrentStep(0) // Reset to first step
                            }}
                            placeholder="Select step count"
                        />
                        <SingleSelect
                            label="Stepper Type"
                            items={[{ items: stepperTypeOptions }]}
                            selected={playgroundStepperType}
                            onSelect={(value) => {
                                setPlaygroundStepperType(value as StepperType)
                            }}
                            placeholder="Select stepper type"
                        />
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Clickable"
                            checked={playgroundClickable}
                            onChange={() =>
                                setPlaygroundClickable(!playgroundClickable)
                            }
                        />
                        <Switch
                            label="Show Tooltips"
                            checked={playgroundHasTooltips}
                            onChange={() =>
                                setPlaygroundHasTooltips(!playgroundHasTooltips)
                            }
                        />
                        <Switch
                            label="Show Icons"
                            checked={playgroundHasIcons}
                            onChange={() =>
                                setPlaygroundHasIcons(!playgroundHasIcons)
                            }
                        />
                    </div>

                    <Stepper
                        stepperType={playgroundStepperType}
                        steps={generatePlaygroundSteps()}
                        currentStep={playgroundCurrentStep}
                        onStepChange={(index) =>
                            setPlaygroundCurrentStep(index)
                        }
                        clickable={playgroundClickable}
                    />

                    <div className="rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-8">
                        {playgroundCurrentStep === 1 && <h1>Step 1</h1>}
                        {playgroundCurrentStep === 2 && <h1>Step 2</h1>}
                        {playgroundCurrentStep === 3 && <h1>Step 3</h1>}
                        {playgroundCurrentStep === 4 && <h1>Step 4</h1>}
                        {playgroundCurrentStep === 5 && <h1>Step 5</h1>}
                        {playgroundCurrentStep === 6 && <h1>Step 6</h1>}
                        {playgroundCurrentStep === 7 && <h1>Completed !</h1>}
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() =>
                                setPlaygroundCurrentStep((index) =>
                                    Math.max(index - 1, 0)
                                )
                            }
                            disabled={playgroundCurrentStep === 1}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() =>
                                setPlaygroundCurrentStep((index) =>
                                    parseInt(playgroundStepCount) + 1 > index
                                        ? index + 1
                                        : index
                                )
                            }
                            disabled={
                                playgroundCurrentStep - 1 ===
                                parseInt(playgroundStepCount)
                            }
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => setPlaygroundCurrentStep(1)}
                            className="px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Basic Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Examples</h2>
                <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Simple linear progression (substeps first){' '}
                            {JSON.stringify(linearSubs)}
                        </h3>
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Stepper
                                        stepperType={StepperType.VERTICAL}
                                        steps={linearSteps}
                                        currentStep={linearStep}
                                        currentSubsteps={linearSubs}
                                        clickable={true}
                                        onStepChange={(next) =>
                                            setLinearStep(next)
                                        }
                                    />
                                    <div className="mt-6 flex gap-3">
                                        <button
                                            onClick={handlePrev}
                                            className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
                                            disabled={
                                                linearStep === 0 &&
                                                (linearSubs[
                                                    linearSteps[0].id
                                                ] ?? 0) === 0
                                            }
                                        >
                                            Prev
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="px-3 py-2 bg-blue-600 text-white rounded"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-4 text-lg">
                                        {linearStep === 0 && 'Step 1 Content'}
                                        {linearStep === 1 &&
                                            !linearSubs[2] &&
                                            'Step 2 - Substep 2.1 Content'}
                                        {linearStep === 1 &&
                                            linearSubs[2] === 2 &&
                                            'Step 2 - Substep 2.2 Content'}
                                        {linearStep === 1 &&
                                            linearSubs[2] === 3 &&
                                            'Step 2 - Substep 2.3 Content'}
                                        {linearStep === 2 && 'Step 3 Content'}
                                        {linearStep === 3 && 'Step 4 Content'}
                                    </h4>
                                    <div className="text-sm text-gray-600">
                                        {linearStep === 0 && (
                                            <p>
                                                This is the content for Step 1.
                                                Click any step to view its
                                                content.
                                            </p>
                                        )}
                                        {linearStep === 1 && !linearSubs[2] && (
                                            <p>
                                                This is the content for Substep
                                                2.1. Use Next/Prev to navigate
                                                through substeps.
                                            </p>
                                        )}
                                        {linearStep === 1 &&
                                            linearSubs[2] === 2 && (
                                                <p>
                                                    This is the content for
                                                    Substep 2.2. You can click
                                                    on any step to jump to it.
                                                </p>
                                            )}
                                        {linearStep === 1 &&
                                            linearSubs[2] === 3 && (
                                                <p>
                                                    This is the content for
                                                    Substep 2.3. This is the
                                                    last substep of Step 2.
                                                </p>
                                            )}
                                        {linearStep === 2 && (
                                            <p>
                                                This is the content for Step 3.
                                            </p>
                                        )}
                                        {linearStep === 3 && (
                                            <p>
                                                This is the content for Step 4.
                                                This is the final step.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepperDemo
