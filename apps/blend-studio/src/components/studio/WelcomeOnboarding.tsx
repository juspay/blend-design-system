import { useState } from 'react'
import {
    Lightning,
    GitBranch,
    ArrowRight,
    X,
    Sparkle,
    Terminal,
    Palette,
} from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ONBOARDING_KEY = 'blend_studio_onboarding_complete'

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useOnboarding() {
    const [isComplete, setIsComplete] = useState(() => {
        return localStorage.getItem(ONBOARDING_KEY) === 'true'
    })

    const complete = () => {
        localStorage.setItem(ONBOARDING_KEY, 'true')
        setIsComplete(true)
    }

    const reset = () => {
        localStorage.removeItem(ONBOARDING_KEY)
        setIsComplete(false)
    }

    return { isComplete, complete, reset }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WelcomeOnboardingProps {
    onComplete: () => void
}

interface OnboardingStep {
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    content: React.ReactNode
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function WelcomeOnboarding({ onComplete }: WelcomeOnboardingProps) {
    const [step, setStep] = useState(0)

    const steps: OnboardingStep[] = [
        {
            title: 'Welcome to Token Studio',
            description:
                'A visual dashboard for creating and managing design tokens. Customize Blend components for your brand without writing code.',
            icon: Sparkle,
            content: (
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <InfoCard
                        icon={Palette}
                        label="Visual Editor"
                        sublabel="Colors, radius, shadows"
                        bgColor="bg-blue-50"
                        iconColor="text-blue-600"
                        iconBg="bg-blue-100"
                    />
                    <InfoCard
                        icon={GitBranch}
                        label="Branches"
                        sublabel="Versioned token sets"
                        bgColor="bg-purple-50"
                        iconColor="text-purple-600"
                        iconBg="bg-purple-100"
                    />
                    <InfoCard
                        icon={Terminal}
                        label="CLI"
                        sublabel="One command to pull"
                        bgColor="bg-green-50"
                        iconColor="text-green-600"
                        iconBg="bg-green-100"
                    />
                </div>
            ),
        },
        {
            title: 'What is a Branch?',
            description:
                'A branch holds a complete brand configuration — colors, border radius, shadows, and fonts. Each branch produces tokens for all 26 V2 components.',
            icon: GitBranch,
            content: (
                <div className="mt-6 space-y-3">
                    <BranchExample
                        name="Juspay Default"
                        detail="Blue primary, default radius"
                        status="Published v2.1.0"
                        color="#3B82F6"
                    />
                    <BranchExample
                        name="Starter Purple"
                        detail="Purple accent, rounded"
                        status="Draft"
                        color="#8B5CF6"
                    />
                    <BranchExample
                        name="Acme Light"
                        detail="Orange accent, warm palette"
                        status="Published v1.2.0"
                        color="#EA580C"
                    />
                </div>
            ),
        },
        {
            title: 'Create, Customize, Use',
            description:
                'Three steps from design to code. No more manual token wiring.',
            icon: Lightning,
            content: (
                <div className="mt-6 space-y-5">
                    <StepGuide
                        step={1}
                        title="Create a Branch"
                        description="Start from a preset or blank. Each branch is isolated."
                    />
                    <StepGuide
                        step={2}
                        title="Customize Tokens"
                        description="Pick colors with a color picker, adjust radius, preview all components live in the editor."
                    />
                    <StepGuide
                        step={3}
                        title="Publish & Pull"
                        description="Publish a version, then run: npx blend-token-studio pull <branchId>"
                    />
                    <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                        <div className="text-xs font-mono text-gray-500 mb-1">
                            # In your project:
                        </div>
                        <div className="text-xs font-mono text-green-400">
                            npx blend-token-studio pull juspay/default
                        </div>
                        <div className="text-xs font-mono text-gray-500 mt-1">
                            # Done. All components render with your branding.
                        </div>
                    </div>
                </div>
            ),
        },
    ]

    const currentStep = steps[step]
    const Icon = currentStep.icon
    const isLastStep = step === steps.length - 1

    const handleNext = () => {
        if (isLastStep) {
            onComplete()
        } else {
            setStep(step + 1)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* Header */}
                <div className="relative p-6 pb-0">
                    <button
                        onClick={onComplete}
                        className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close onboarding"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                {currentStep.title}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {currentStep.description}
                            </p>
                        </div>
                    </div>

                    {currentStep.content}
                </div>

                {/* Footer */}
                <div className="p-6 pt-4 flex items-center justify-between border-t border-gray-100 mt-4">
                    <div className="flex items-center gap-1.5">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    i === step
                                        ? 'bg-blue-600'
                                        : i < step
                                          ? 'bg-blue-300'
                                          : 'bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onComplete}
                            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Skip
                        </button>
                        <button
                            onClick={handleNext}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {isLastStep ? 'Get Started' : 'Next'}
                            {!isLastStep && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function InfoCard({
    icon: Icon,
    label,
    sublabel,
    bgColor,
    iconColor,
    iconBg,
}: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    sublabel: string
    bgColor: string
    iconColor: string
    iconBg: string
}) {
    return (
        <div className={`text-center p-4 ${bgColor} rounded-xl`}>
            <div
                className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center mx-auto mb-2`}
            >
                <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <p className="text-xs font-medium text-gray-700">{label}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{sublabel}</p>
        </div>
    )
}

function BranchExample({
    name,
    detail,
    status,
    color,
}: {
    name: string
    detail: string
    status: string
    color: string
}) {
    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm shrink-0"
                style={{ backgroundColor: color }}
            />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700">{name}</p>
                <p className="text-xs text-gray-500">{detail}</p>
            </div>
            <span className="text-[10px] text-gray-400 font-medium shrink-0">
                {status}
            </span>
        </div>
    )
}

function StepGuide({
    step,
    title,
    description,
}: {
    step: number
    title: string
    description: string
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {step}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-700">{title}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
        </div>
    )
}
