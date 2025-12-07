import { Hash, X } from 'lucide-react'
import { useState } from 'react'
import {
    Button,
    ButtonType,
    ButtonSize,
    ButtonSubType,
    ButtonState,
} from '../../../../packages/blend/lib/components/Button'

import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'

const ButtonDemo = () => {
    // Pure Button Playground State
    const [buttonText, setButtonText] = useState('Click me')
    const [buttonType, setButtonType] = useState<ButtonType>(ButtonType.PRIMARY)
    const [buttonSize, setButtonSize] = useState<ButtonSize>(ButtonSize.MEDIUM)
    const [buttonSubType, setButtonSubType] = useState<ButtonSubType>(
        ButtonSubType.DEFAULT
    )
    const [showLeadingIcon, setShowLeadingIcon] = useState(false)
    const [showTrailingIcon, setShowTrailingIcon] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [fullWidth, setFullWidth] = useState(false)

    // Button skeleton playground state
    const [skeletonText, setSkeletonText] = useState('Loading...')
    const [skeletonType, setSkeletonType] = useState<ButtonType>(
        ButtonType.PRIMARY
    )
    const [skeletonSize, setSkeletonSize] = useState<ButtonSize>(
        ButtonSize.MEDIUM
    )
    const [skeletonSubType, setSkeletonSubType] = useState<ButtonSubType>(
        ButtonSubType.DEFAULT
    )
    const [skeletonLeadingIcon, setSkeletonLeadingIcon] = useState(false)
    const [skeletonTrailingIcon, setSkeletonTrailingIcon] = useState(false)
    const [skeletonFullWidth, setSkeletonFullWidth] = useState(false)

    // Options for selects
    const typeOptions = [
        { value: ButtonType.PRIMARY, label: 'Primary' },
        { value: ButtonType.SECONDARY, label: 'Secondary' },
        { value: ButtonType.DANGER, label: 'Danger' },
        { value: ButtonType.SUCCESS, label: 'Success' },
    ]

    const sizeOptions = [
        { value: ButtonSize.SMALL, label: 'Small' },
        { value: ButtonSize.MEDIUM, label: 'Medium' },
        { value: ButtonSize.LARGE, label: 'Large' },
    ]

    const subTypeOptions = [
        { value: ButtonSubType.DEFAULT, label: 'Default' },
        { value: ButtonSubType.ICON_ONLY, label: 'Icon Only' },
        { value: ButtonSubType.INLINE, label: 'Inline' },
    ]

    const animationVariants = ['pulse', 'wave', 'shimmer'] as const
    const [skeletonAnimationVariant, setSkeletonAnimationVariant] =
        useState<(typeof animationVariants)[number]>('pulse')

    const skeletonVariantOptions = animationVariants.map((variant) => ({
        value: variant,
        label: variant.charAt(0).toUpperCase() + variant.slice(1),
    }))

    return (
        <div className="p-8 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Button Component Demo</h1>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                        <strong>Simple Approach:</strong> Use
                        <code className="bg-blue-100 px-1 rounded">
                            {' showSkeleton '}
                        </code>
                        on Button to render the skeleton placeholder with token
                        perfect mirroring.
                    </p>
                </div>
            </div>

            {/* Pure Button Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    ✅ Pure Button Playground
                </h2>
                <p className="text-gray-600">
                    Test the pure Button component focused only on UI rendering
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
                            label="Type"
                            items={[{ items: typeOptions }]}
                            selected={buttonType}
                            onSelect={(value) =>
                                setButtonType(value as ButtonType)
                            }
                            placeholder="Select type"
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

                {/* Pure Button Demo */}
                <div className="min-h-40 rounded-2xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <Button
                        text={
                            buttonSubType === ButtonSubType.ICON_ONLY
                                ? undefined
                                : buttonText
                        }
                        buttonType={buttonType}
                        size={buttonSize}
                        subType={buttonSubType}
                        leadingIcon={
                            showLeadingIcon ? <Hash size={16} /> : undefined
                        }
                        trailingIcon={
                            showTrailingIcon ? <X size={16} /> : undefined
                        }
                        loading={isLoading}
                        disabled={isDisabled}
                        fullWidth={fullWidth}
                        state={
                            isDisabled
                                ? ButtonState.DISABLED
                                : ButtonState.DEFAULT
                        }
                        onClick={() => {
                            addSnackbar({
                                header: 'Pure Button clicked!',
                                description: `${buttonType} ${buttonSize} button`,
                            })
                        }}
                    />
                </div>
            </div>

            {/* Button Skeleton Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    🔄 Button Skeleton Playground
                </h2>
                <p className="text-gray-600">
                    Test Button with <code>showSkeleton</code> for perfect token
                    mirroring - it should match Button dimensions exactly
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
                            label="Type"
                            items={[{ items: typeOptions }]}
                            selected={skeletonType}
                            onSelect={(value) =>
                                setSkeletonType(value as ButtonType)
                            }
                            placeholder="Select type"
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
                                    value as (typeof animationVariants)[number]
                                )
                            }
                            placeholder="Select animation"
                        />
                    </div>
                </div>

                {/* Button Skeleton Demo */}
                <div className="min-h-40 rounded-2xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <Button
                        buttonType={skeletonType}
                        size={skeletonSize}
                        subType={skeletonSubType}
                        fullWidth={skeletonFullWidth}
                        text={
                            skeletonSubType === ButtonSubType.ICON_ONLY
                                ? undefined
                                : skeletonText
                        }
                        leadingIcon={
                            skeletonLeadingIcon ? <Hash size={16} /> : undefined
                        }
                        trailingIcon={
                            skeletonTrailingIcon ? <X size={16} /> : undefined
                        }
                        showSkeleton
                        skeletonVariant={skeletonAnimationVariant}
                    />
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
                                text="Loading Button"
                                buttonType={ButtonType.PRIMARY}
                                showSkeleton
                                skeletonVariant={value}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Accessibility: Screen Reader Loading Announcement */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    ♿ Accessibility: Screen Reader Loading Announcement
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 mb-2">
                        <strong>Why the hidden loading text?</strong>
                    </p>
                    <p className="text-green-700 text-sm mb-2">
                        Lines 203-218 in ButtonBase.tsx contain a visually
                        hidden
                        <code className="bg-green-100 px-1 rounded">
                            {' <span>'}
                        </code>{' '}
                        with "Loading, please wait" text. This is for{' '}
                        <strong>screen reader accessibility</strong> (WCAG 2.1
                        compliance).
                    </p>
                    <ul className="text-green-700 text-sm list-disc list-inside space-y-1">
                        <li>
                            The spinner icon has{' '}
                            <code className="bg-green-100 px-1 rounded">
                                aria-hidden="true"
                            </code>{' '}
                            (decorative only)
                        </li>
                        <li>
                            The hidden span uses{' '}
                            <code className="bg-green-100 px-1 rounded">
                                aria-live="polite"
                            </code>{' '}
                            to announce loading state
                        </li>
                        <li>
                            CSS makes it invisible to sighted users but
                            accessible to assistive technologies
                        </li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                        How to Test Screen Reader Announcement:
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>
                            <strong>Enable screen reader:</strong> macOS
                            VoiceOver (Cmd+F5), Windows NVDA/JAWS, or ChromeVox
                            extension
                        </li>
                        <li>
                            <strong>Toggle loading state</strong> using the
                            switch below
                        </li>
                        <li>
                            <strong>Listen for announcement:</strong> Screen
                            reader should say "Loading, please wait" when
                            loading becomes true
                        </li>
                        <li>
                            <strong>Verify visually:</strong> You should see the
                            spinner, but the hidden text should not be visible
                        </li>
                    </ol>

                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
                        <div className="flex flex-col items-center gap-4">
                            <Switch
                                label="Toggle Loading State (Test Screen Reader)"
                                checked={isLoading}
                                onChange={() => setIsLoading(!isLoading)}
                            />
                            <Button
                                text="Submit Form"
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                loading={isLoading}
                                onClick={() => {
                                    if (!isLoading) {
                                        addSnackbar({
                                            header: 'Form submitted!',
                                            description:
                                                'This button demonstrates loading state accessibility',
                                        })
                                    }
                                }}
                            />
                            <p className="text-sm text-gray-600 text-center max-w-md">
                                <strong>Test with screen reader:</strong> When
                                you toggle loading ON, the screen reader should
                                announce "Loading, please wait". The hidden text
                                (lines 203-218) makes this possible while
                                remaining invisible to sighted users.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonDemo
