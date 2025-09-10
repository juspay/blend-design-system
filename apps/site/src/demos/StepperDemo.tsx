import { useState } from 'react'
import {
    Stepper,
    StepState,
} from '../../../../packages/blend/lib/components/Stepper'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Check, Settings, User, CreditCard, Package, Truck } from 'lucide-react'

const StepperDemo = () => {
    // Playground state
    const [playgroundCurrentStep, setPlaygroundCurrentStep] = useState(1)
    const [playgroundClickable, setPlaygroundClickable] = useState(false)
    const [playgroundStepCount, setPlaygroundStepCount] = useState('4')
    const [playgroundStepTitle, setPlaygroundStepTitle] = useState('Step Title')
    const [playgroundHasTooltips, setPlaygroundHasTooltips] = useState(true)
    const [playgroundHasIcons, setPlaygroundHasIcons] = useState(false)

    // Example states
    const [orderStep, setOrderStep] = useState(2)
    const [accountStep, setAccountStep] = useState(0)
    const [projectStep, setProjectStep] = useState(3)

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

        return Array.from({ length: count }, (_, index) => ({
            id: `${index + 1}`,
            title: `${playgroundStepTitle} ${index + 1}`,
            icon: playgroundHasIcons ? icons[index % icons.length] : undefined,
            tooltipContent: playgroundHasTooltips
                ? `This is ${playgroundStepTitle} ${index + 1} with additional information`
                : undefined,
            disabled: false,
        }))
    }

    // Predefined step sets
    const orderSteps = [
        {
            id: '1',
            title: 'Cart Review',
            icon: <Package size={16} />,
            tooltipContent: 'Review your cart items and quantities',
        },
        {
            id: '2',
            title: 'Shipping Info',
            icon: <Truck size={16} />,
            tooltipContent: 'Enter shipping address and delivery preferences',
        },
        {
            id: '3',
            title: 'Payment',
            icon: <CreditCard size={16} />,
            tooltipContent: 'Choose payment method and billing information',
        },
        {
            id: '4',
            title: 'Confirmation',
            icon: <Check size={16} />,
            tooltipContent: 'Review and confirm your order',
        },
    ]

    const accountSteps = [
        {
            id: '1',
            title: 'Personal Info',
            icon: <User size={16} />,
            tooltipContent: 'Enter your basic personal information',
        },
        {
            id: '2',
            title: 'Account Setup',
            icon: <Settings size={16} />,
            tooltipContent: 'Set up your account preferences and security',
        },
        {
            id: '3',
            title: 'Verification',
            tooltipContent: 'Verify your email and phone number',
        },
    ]

    const projectSteps = [
        {
            id: '1',
            title: 'Project Details',
            tooltipContent: 'Define project scope and requirements',
        },
        {
            id: '2',
            title: 'Team Setup',
            tooltipContent: 'Add team members and assign roles',
        },
        {
            id: '3',
            title: 'Configuration',
            tooltipContent: 'Configure project settings and preferences',
        },
        {
            id: '4',
            title: 'Review',
            status: StepState.DISABLED,
            tooltipContent: 'Review all settings before launching',
        },
        {
            id: '5',
            title: 'Launch',
            status: StepState.DISABLED,
            tooltipContent: 'Launch your project and start collaborating',
        },
    ]

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

                    <div className="min-h-32 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-8">
                        <div className="w-full max-w-2xl">
                            <Stepper
                                steps={generatePlaygroundSteps()}
                                currentStep={playgroundCurrentStep}
                                onStepChange={(index) =>
                                    setPlaygroundCurrentStep(index)
                                }
                                clickable={playgroundClickable}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() =>
                                setPlaygroundCurrentStep((s) =>
                                    Math.max(s - 1, 0)
                                )
                            }
                            disabled={playgroundCurrentStep === 0}
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() =>
                                setPlaygroundCurrentStep((s) =>
                                    Math.min(
                                        s + 1,
                                        parseInt(playgroundStepCount) - 1
                                    )
                                )
                            }
                            disabled={
                                playgroundCurrentStep ===
                                parseInt(playgroundStepCount) - 1
                            }
                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => setPlaygroundCurrentStep(0)}
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
                            E-commerce Order Flow
                        </h3>
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <Stepper
                                steps={orderSteps}
                                currentStep={orderStep}
                                onStepChange={(index) => setOrderStep(index)}
                                clickable={true}
                            />
                            <div className="mt-6 flex space-x-4">
                                <button
                                    onClick={() =>
                                        setOrderStep((s) => Math.max(s - 1, 0))
                                    }
                                    disabled={orderStep === 0}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() =>
                                        setOrderStep((s) =>
                                            Math.min(
                                                s + 1,
                                                orderSteps.length - 1
                                            )
                                        )
                                    }
                                    disabled={
                                        orderStep === orderSteps.length - 1
                                    }
                                    className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Account Registration
                        </h3>
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <Stepper
                                steps={accountSteps}
                                currentStep={accountStep}
                                onStepChange={(index) => setAccountStep(index)}
                                clickable={true}
                            />
                            <div className="mt-6 flex space-x-4">
                                <button
                                    onClick={() =>
                                        setAccountStep((s) =>
                                            Math.max(s - 1, 0)
                                        )
                                    }
                                    disabled={accountStep === 0}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() =>
                                        setAccountStep((s) =>
                                            Math.min(
                                                s + 1,
                                                accountSteps.length - 1
                                            )
                                        )
                                    }
                                    disabled={
                                        accountStep === accountSteps.length - 1
                                    }
                                    className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
                                >
                                    {accountStep === accountSteps.length - 1
                                        ? 'Complete'
                                        : 'Next'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Project Setup with Disabled Steps
                        </h3>
                        <div className="p-6 border border-gray-200 rounded-lg">
                            <Stepper
                                steps={projectSteps}
                                currentStep={projectStep}
                                onStepChange={(index) => setProjectStep(index)}
                                clickable={false}
                            />
                            <div className="mt-6 flex space-x-4">
                                <button
                                    onClick={() =>
                                        setProjectStep((s) =>
                                            Math.max(s - 1, 0)
                                        )
                                    }
                                    disabled={projectStep === 0}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() =>
                                        setProjectStep((s) =>
                                            Math.min(s + 1, 2)
                                        )
                                    } // Only allow up to step 2 (Configuration)
                                    disabled={projectStep >= 2}
                                    className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* State Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Step States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">All Completed</h3>
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <Stepper
                                steps={[
                                    {
                                        id: '1',
                                        title: 'Setup',
                                        tooltipContent:
                                            'Initial setup completed',
                                    },
                                    {
                                        id: '2',
                                        title: 'Configuration',
                                        tooltipContent:
                                            'Configuration completed',
                                    },
                                    {
                                        id: '3',
                                        title: 'Testing',
                                        tooltipContent: 'Testing completed',
                                    },
                                    {
                                        id: '4',
                                        title: 'Launch',
                                        tooltipContent: 'Successfully launched',
                                    },
                                ]}
                                currentStep={4}
                                clickable={true}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Mixed States</h3>
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <Stepper
                                steps={[
                                    { id: '1', title: 'Planning' },
                                    { id: '2', title: 'Development' },
                                    {
                                        id: '3',
                                        title: 'Testing',
                                        status: StepState.DISABLED,
                                    },
                                    {
                                        id: '4',
                                        title: 'Deployment',
                                        status: StepState.DISABLED,
                                    },
                                ]}
                                currentStep={1}
                                clickable={false}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Usage Guidelines */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Usage Guidelines</h2>
                <div className="prose max-w-none">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                            <h4 className="text-green-800 font-semibold mb-3">
                                ✅ Best Practices
                            </h4>
                            <ul className="text-green-700 space-y-2 text-sm">
                                <li>Use clear, concise step titles</li>
                                <li>
                                    Provide helpful tooltips for additional
                                    context
                                </li>
                                <li>
                                    Enable clickable navigation when appropriate
                                </li>
                                <li>
                                    Use icons to enhance visual understanding
                                </li>
                                <li>
                                    Keep the number of steps reasonable (3-6)
                                </li>
                            </ul>
                        </div>
                        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                            <h4 className="text-red-800 font-semibold mb-3">
                                ❌ Avoid
                            </h4>
                            <ul className="text-red-700 space-y-2 text-sm">
                                <li>Too many steps (overwhelming users)</li>
                                <li>Ambiguous or unclear step titles</li>
                                <li>Inconsistent step naming conventions</li>
                                <li>Missing feedback for completed steps</li>
                                <li>
                                    Allowing navigation to incomplete
                                    prerequisites
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepperDemo
