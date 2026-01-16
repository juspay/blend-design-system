import { Hash, X, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import {
    ButtonV2,
    ButtonType,
    ButtonSize,
    ButtonSubType,
    ButtonState,
    IconButton,
    LinkButton,
} from '../../../../packages/blend/lib/components/ButtonV2'

import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'

const ButtonV2Demo = () => {
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
    const [buttonWidth, setButtonWidth] = useState<string>('')

    // Skeleton Playground State
    const [skeletonType, setSkeletonType] = useState<ButtonType>(
        ButtonType.PRIMARY
    )
    const [skeletonSize, setSkeletonSize] = useState<ButtonSize>(
        ButtonSize.MEDIUM
    )
    const [skeletonAnimationVariant, setSkeletonAnimationVariant] = useState<
        'pulse' | 'wave' | 'shimmer'
    >('pulse')

    // LinkButton Playground State
    const [linkText, setLinkText] = useState('View Documentation')
    const [linkType, setLinkType] = useState<ButtonType>(ButtonType.PRIMARY)
    const [linkSize, setLinkSize] = useState<ButtonSize>(ButtonSize.MEDIUM)
    const [linkTarget, setLinkTarget] = useState('_blank')
    const [linkIsLoading, setLinkIsLoading] = useState(false)
    const [linkIsDisabled, setLinkIsDisabled] = useState(false)

    // Select Options
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

    const targetOptions = [
        { value: '_self', label: 'Same Tab (_self)' },
        { value: '_blank', label: 'New Tab (_blank)' },
    ]

    const skeletonVariantOptions = [
        { value: 'pulse', label: 'Pulse' },
        { value: 'wave', label: 'Wave' },
        { value: 'shimmer', label: 'Shimmer' },
    ]

    return (
        <div className="p-8 space-y-10">
            {/* Header */}
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">ButtonV2 Component Demo</h1>
                <p className="text-gray-600">
                    Enhanced button component with responsive tokens and
                    skeleton loading states.
                </p>
            </div>
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">ButtonV2 Playground</h2>

                <div className="space-y-4">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextInput
                            label="Width"
                            value={buttonWidth}
                            onChange={(e) => setButtonWidth(e.target.value)}
                            placeholder="e.g., 100%, 200px, auto"
                        />
                    </div>
                </div>

                <div className="min-h-36 rounded-xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <ButtonV2
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
                        width={buttonWidth || undefined}
                        state={
                            isDisabled
                                ? ButtonState.DISABLED
                                : ButtonState.DEFAULT
                        }
                        onClick={() => {
                            addSnackbar({
                                header: 'ButtonV2 clicked!',
                                description: `${buttonType} ${buttonSize} button`,
                            })
                        }}
                    />
                </div>
            </section>

            {/* Skeleton Playground */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Skeleton Playground</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                            label="Animation"
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

                <div className="min-h-36 rounded-xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <ButtonV2
                        text="Loading..."
                        buttonType={skeletonType}
                        size={skeletonSize}
                        leadingIcon={<Hash size={16} />}
                        trailingIcon={<X size={16} />}
                        showSkeleton
                        skeletonVariant={skeletonAnimationVariant}
                    />
                </div>
            </section>

            {/* LinkButton Playground */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">LinkButton Playground</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <TextInput
                            label="Text"
                            value={linkText}
                            onChange={(e) => setLinkText(e.target.value)}
                            placeholder="Enter link text"
                        />
                        <SingleSelect
                            label="Type"
                            items={[{ items: typeOptions }]}
                            selected={linkType}
                            onSelect={(value) =>
                                setLinkType(value as ButtonType)
                            }
                            placeholder="Select type"
                        />
                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={linkSize}
                            onSelect={(value) =>
                                setLinkSize(value as ButtonSize)
                            }
                            placeholder="Select size"
                        />
                        <SingleSelect
                            label="Target"
                            items={[{ items: targetOptions }]}
                            selected={linkTarget}
                            onSelect={(value) => setLinkTarget(value as string)}
                            placeholder="Select target"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Loading"
                            checked={linkIsLoading}
                            onChange={() => setLinkIsLoading(!linkIsLoading)}
                        />
                        <Switch
                            label="Disabled"
                            checked={linkIsDisabled}
                            onChange={() => setLinkIsDisabled(!linkIsDisabled)}
                        />
                    </div>
                </div>

                <div className="min-h-36 rounded-xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <LinkButton
                        href="#"
                        text={linkText}
                        buttonType={linkType}
                        size={linkSize}
                        target={linkTarget as '_self' | '_blank'}
                        trailingIcon={<ExternalLink size={16} />}
                        loading={linkIsLoading}
                        onClick={(e) => {
                            e?.preventDefault()
                            addSnackbar({
                                header: 'LinkButton clicked!',
                                description: `${linkType} ${linkSize} link`,
                            })
                        }}
                    />
                </div>
            </section>

            {/* IconButton Quick Reference */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                    IconButton Quick Reference
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {typeOptions.map(({ value, label }) => (
                        <div
                            key={value}
                            className="p-4 border rounded-lg bg-white"
                        >
                            <h3 className="text-sm font-semibold mb-2 text-gray-600">
                                {label}
                            </h3>
                            <div className="flex items-center gap-2">
                                {sizeOptions.map(
                                    ({
                                        value: sizeValue,
                                        label: sizeLabel,
                                    }) => (
                                        <IconButton
                                            key={sizeValue}
                                            buttonType={value as ButtonType}
                                            size={sizeValue as ButtonSize}
                                            icon={<Hash size={16} />}
                                            aria-label={`${label} ${sizeLabel.toLowerCase()}`}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default ButtonV2Demo
