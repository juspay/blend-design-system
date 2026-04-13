import { useState } from 'react'
import {
    Zap,
    Palette,
    GitBranch,
    Code,
    ArrowRight,
    X,
    CheckCircle,
    Sparkles,
} from 'lucide-react'

const ONBOARDING_KEY = 'blend_studio_onboarding_complete'

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

interface WelcomeOnboardingProps {
    onComplete: () => void
}

export function WelcomeOnboarding({ onComplete }: WelcomeOnboardingProps) {
    const [step, setStep] = useState(0)

    const steps = [
        {
            title: 'Welcome to Token Studio',
            description:
                'Create and manage design tokens for your brand visually, without writing code.',
            icon: Sparkles,
            content: (
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <Palette className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">
                            Colors
                        </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <GitBranch className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">
                            Branches
                        </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <Code className="w-5 h-5 text-green-600" />
                        </div>
                        <p className="text-xs font-medium text-gray-700">CLI</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'What is a Branch?',
            description:
                'A branch is a versioned set of design tokens for a specific brand or theme.',
            icon: GitBranch,
            content: (
                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                HDFC Retail
                            </p>
                            <p className="text-xs text-gray-500">
                                Brand colors, sharp corners
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                NeoBank Dark
                            </p>
                            <p className="text-xs text-gray-500">
                                Purple accent, dark theme
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                FinTech Pro
                            </p>
                            <p className="text-xs text-gray-500">
                                Green accent, rounded
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'How it works',
            description: 'Three simple steps to customize your design system.',
            icon: Zap,
            content: (
                <div className="mt-6 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                            1
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                Create a Branch
                            </p>
                            <p className="text-xs text-gray-500">
                                Start from a preset or blank
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                            2
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                Customize Tokens
                            </p>
                            <p className="text-xs text-gray-500">
                                Edit colors, radius, shadows with live preview
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                            3
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                Publish & Use
                            </p>
                            <p className="text-xs text-gray-500">
                                Export JSON or pull via CLI
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
    ]

    const currentStep = steps[step]
    const Icon = currentStep.icon

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1)
        } else {
            onComplete()
        }
    }

    const handleSkip = () => {
        onComplete()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                <div className="relative p-6 pb-0">
                    <button
                        onClick={handleSkip}
                        className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
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

                <div className="p-6 pt-4 flex items-center justify-between border-t border-gray-100 mt-4">
                    <div className="flex items-center gap-1.5">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                    i === step ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSkip}
                            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Skip
                        </button>
                        <button
                            onClick={handleNext}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {step === steps.length - 1 ? 'Get Started' : 'Next'}
                            {step < steps.length - 1 && (
                                <ArrowRight className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
