import { Hash, X } from 'lucide-react'
import { useState } from 'react'
import {
    Button,
    ButtonVariant,
    ButtonSize,
    ButtonSubType,
} from '../../../../packages/blend/lib/components/Button/v2'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'

const ButtonV2Demo = () => {
    // Button Playground State
    const [buttonText, setButtonText] = useState('Click me')
    const [buttonVariant, setButtonVariant] = useState<ButtonVariant>('primary')
    const [buttonSize, setButtonSize] = useState<ButtonSize>('md')
    const [buttonSubType, setButtonSubType] = useState<ButtonSubType>('default')
    const [showLeadingIcon, setShowLeadingIcon] = useState(false)
    const [showTrailingIcon, setShowTrailingIcon] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [fullWidth, setFullWidth] = useState(false)

    // Skeleton Playground State
    const [skeletonText, setSkeletonText] = useState('Loading...')
    const [skeletonVariant, setSkeletonVariant] =
        useState<ButtonVariant>('primary')
    const [skeletonSize, setSkeletonSize] = useState<ButtonSize>('md')
    const [skeletonSubType, setSkeletonSubType] =
        useState<ButtonSubType>('default')
    const [skeletonLeadingIcon, setSkeletonLeadingIcon] = useState(false)
    const [skeletonTrailingIcon, setSkeletonTrailingIcon] = useState(false)
    const [skeletonFullWidth, setSkeletonFullWidth] = useState(false)
    const [skeletonAnimationVariant, setSkeletonAnimationVariant] = useState<
        'pulse' | 'wave' | 'shimmer'
    >('pulse')

    // Options for selects
    const variantOptions = [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'danger', label: 'Danger' },
        { value: 'success', label: 'Success' },
    ]

    const sizeOptions = [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
    ]

    const subTypeOptions = [
        { value: 'default', label: 'Default' },
        { value: 'iconOnly', label: 'Icon Only' },
        { value: 'inline', label: 'Inline' },
    ]

    const animationVariants = ['pulse', 'wave', 'shimmer'] as const
    const skeletonVariantOptions = animationVariants.map((variant) => ({
        value: variant,
        label: variant.charAt(0).toUpperCase() + variant.slice(1),
    }))

    // Helper function to create common button props
    const getButtonCommonProps = () => ({
        variant: buttonVariant,
        size: buttonSize,
        subType: buttonSubType,
        children: buttonSubType === 'iconOnly' ? undefined : buttonText,
        leadingIcon: showLeadingIcon ? <Hash size={16} /> : undefined,
        trailingIcon: showTrailingIcon ? <X size={16} /> : undefined,
        loading: isLoading,
        disabled: isDisabled,
        fullWidth: fullWidth,
        onClick: () => {
            addSnackbar({
                header: 'Button clicked!',
                description: `${buttonVariant} ${buttonSize} button`,
            })
        },
    })

    // Skeleton button props
    const getSkeletonButtonCommonProps = () => ({
        variant: skeletonVariant,
        size: skeletonSize,
        subType: skeletonSubType,
        children: skeletonSubType === 'iconOnly' ? undefined : skeletonText,
        leadingIcon: skeletonLeadingIcon ? <Hash size={16} /> : undefined,
        trailingIcon: skeletonTrailingIcon ? <X size={16} /> : undefined,
        fullWidth: skeletonFullWidth,
        showSkeleton: true,
        skeletonVariant: skeletonAnimationVariant,
    })

    return (
        <div className="p-8 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">ButtonV2 Component Demo</h1>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                        <strong>Simple Approach:</strong> The refactored
                        ButtonV2 component follows Chakra UI patterns with
                        simplified API and token-based styling.
                    </p>
                </div>
            </div>

            {/* Main Button Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">✅ ButtonV2 Playground</h2>
                <p className="text-gray-600">
                    Test the simplified ButtonV2 component
                </p>

                {/* Controls */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <TextInput
                            label="Text"
                            value={buttonText}
                            onChange={(e) => setButtonText(e.target.value)}
                            placeholder="Enter button text"
                        />

                        <SingleSelect
                            label="Variant"
                            items={[{ items: variantOptions }]}
                            selected={buttonVariant}
                            onSelect={(value) =>
                                setButtonVariant(value as ButtonVariant)
                            }
                            placeholder="Select variant"
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={buttonSize}
                            onSelect={(value) =>
                                setButtonSize(value as ButtonSize)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Sub Type"
                            items={[{ items: subTypeOptions }]}
                            selected={buttonSubType}
                            onSelect={(value) =>
                                setButtonSubType(value as ButtonSubType)
                            }
                            placeholder="Select sub type"
                        />
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Leading Icon"
                            checked={showLeadingIcon}
                            onChange={() =>
                                setShowLeadingIcon(!showLeadingIcon)
                            }
                        />
                        <Switch
                            label="Trailing Icon"
                            checked={showTrailingIcon}
                            onChange={() =>
                                setShowTrailingIcon(!showTrailingIcon)
                            }
                        />
                        <Switch
                            label="Loading"
                            checked={isLoading}
                            onChange={() => setIsLoading(!isLoading)}
                        />
                        <Switch
                            label="Disabled"
                            checked={isDisabled}
                            onChange={() => setIsDisabled(!isDisabled)}
                        />
                        <Switch
                            label="Full Width"
                            checked={fullWidth}
                            onChange={() => setFullWidth(!fullWidth)}
                        />
                    </div>
                </div>

                {/* ButtonV2 Demo */}
                <div className="min-h-40 rounded-2xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <Button {...getButtonCommonProps()} />
                </div>
            </div>

            {/* Button Skeleton Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    🔄 Button Skeleton Playground
                </h2>
                <p className="text-gray-600">
                    Test ButtonV2 with <code>showSkeleton</code> for perfect
                    token mirroring
                </p>

                {/* Controls */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <TextInput
                            label="Text (for sizing)"
                            value={skeletonText}
                            onChange={(e) => setSkeletonText(e.target.value)}
                            placeholder="Enter text for sizing"
                        />

                        <SingleSelect
                            label="Variant"
                            items={[{ items: variantOptions }]}
                            selected={skeletonVariant}
                            onSelect={(value) =>
                                setSkeletonVariant(value as ButtonVariant)
                            }
                            placeholder="Select variant"
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={skeletonSize}
                            onSelect={(value) =>
                                setSkeletonSize(value as ButtonSize)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Sub Type"
                            items={[{ items: subTypeOptions }]}
                            selected={skeletonSubType}
                            onSelect={(value) =>
                                setSkeletonSubType(value as ButtonSubType)
                            }
                            placeholder="Select sub type"
                        />
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Has Leading Icon"
                            checked={skeletonLeadingIcon}
                            onChange={() =>
                                setSkeletonLeadingIcon(!skeletonLeadingIcon)
                            }
                        />
                        <Switch
                            label="Has Trailing Icon"
                            checked={skeletonTrailingIcon}
                            onChange={() =>
                                setSkeletonTrailingIcon(!skeletonTrailingIcon)
                            }
                        />
                        <Switch
                            label="Full Width"
                            checked={skeletonFullWidth}
                            onChange={() =>
                                setSkeletonFullWidth(!skeletonFullWidth)
                            }
                        />

                        <SingleSelect
                            label="Animation Variant"
                            items={[{ items: skeletonVariantOptions }]}
                            selected={skeletonAnimationVariant}
                            onSelect={(value) =>
                                setSkeletonAnimationVariant(
                                    value as 'pulse' | 'wave' | 'shimmer'
                                )
                            }
                            placeholder="Select animation"
                        />
                    </div>
                </div>

                {/* Button Skeleton Demo */}
                <div className="min-h-40 rounded-2xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <Button {...getSkeletonButtonCommonProps()} />
                </div>
            </div>

            {/* Animation Variants Showcase */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">✨ Animation Variants</h2>
                <p className="text-gray-600">
                    Different skeleton animation options
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {skeletonVariantOptions.map(({ value, label }) => (
                        <div
                            key={value}
                            className="space-y-3 p-4 border rounded-lg bg-white"
                        >
                            <h3 className="text-lg font-semibold">{label}</h3>
                            <Button
                                variant="primary"
                                showSkeleton
                                skeletonVariant={
                                    value as 'pulse' | 'wave' | 'shimmer'
                                }
                            >
                                Loading Button
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Accessibility Example */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    ♿ Accessibility Features
                </h2>
                <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 mb-2">
                            <strong>Screen Reader Accessibility:</strong>
                        </p>
                        <p className="text-green-700 text-sm mb-2">
                            The button component includes proper ARIA attributes
                            for accessibility.
                        </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800 mb-2">
                            <strong>Loading State Announcement:</strong>
                        </p>
                        <p className="text-blue-700 text-sm mb-2">
                            When loading, the button automatically announces
                            "Loading, please wait" to screen readers.
                        </p>
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-6">
                                <Button
                                    variant="primary"
                                    loading={isLoading}
                                    onClick={() => setIsLoading(!isLoading)}
                                >
                                    Toggle Loading State
                                </Button>
                            </div>
                            <p className="text-sm text-gray-600">
                                <strong>Test with screen reader:</strong> When
                                loading is toggled ON, the screen reader should
                                announce "Loading, please wait".
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonV2Demo
