import { Hash, X } from 'lucide-react'
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
    const [text, setText] = useState('Click me')
    const [buttonType, setButtonType] = useState<ButtonType>(ButtonType.PRIMARY)
    const [size, setSize] = useState<ButtonSize>(ButtonSize.MEDIUM)
    const [subType, setSubType] = useState<ButtonSubType>(ButtonSubType.DEFAULT)
    const [showLeftSlot, setShowLeftSlot] = useState(false)
    const [showRightSlot, setShowRightSlot] = useState(false)
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [skeletonVariant, setSkeletonVariant] = useState<
        'pulse' | 'wave' | 'shimmer'
    >('pulse')
    const [width, setWidth] = useState<string>('')

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

    const skeletonVariantOptions = [
        { value: 'pulse', label: 'Pulse' },
        { value: 'wave', label: 'Wave' },
        { value: 'shimmer', label: 'Shimmer' },
    ]

    return (
        <div className="p-8 space-y-10">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">ButtonV2 Component</h1>
                <p className="text-gray-600">
                    Interactive playground to test all ButtonV2 features and
                    variants.
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Playground</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <TextInput
                            label="Text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
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
                            selected={size}
                            onSelect={(value) => setSize(value as ButtonSize)}
                            placeholder="Select size"
                        />
                        <SingleSelect
                            label="Sub Type"
                            items={[{ items: subTypeOptions }]}
                            selected={subType}
                            onSelect={(value) =>
                                setSubType(value as ButtonSubType)
                            }
                            placeholder="Select sub type"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <SingleSelect
                            label="Skeleton Variant"
                            items={[{ items: skeletonVariantOptions }]}
                            selected={skeletonVariant}
                            onSelect={(value) =>
                                setSkeletonVariant(
                                    value as 'pulse' | 'wave' | 'shimmer'
                                )
                            }
                            placeholder="Select variant"
                        />
                        <TextInput
                            label="Width"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            placeholder="e.g., 100%, 200px"
                        />
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Left Slot"
                            checked={showLeftSlot}
                            onChange={() => setShowLeftSlot(!showLeftSlot)}
                        />
                        <Switch
                            label="Right Slot"
                            checked={showRightSlot}
                            onChange={() => setShowRightSlot(!showRightSlot)}
                        />
                        <Switch
                            label="Loading"
                            checked={loading}
                            onChange={() => setLoading(!loading)}
                        />
                        <Switch
                            label="Disabled"
                            checked={disabled}
                            onChange={() => setDisabled(!disabled)}
                        />
                        <Switch
                            label="Skeleton"
                            checked={showSkeleton}
                            onChange={() => setShowSkeleton(!showSkeleton)}
                        />
                    </div>
                </div>

                <div className="min-h-36 rounded-xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <ButtonV2
                        text={
                            subType === ButtonSubType.ICON_ONLY
                                ? undefined
                                : text
                        }
                        buttonType={buttonType}
                        size={size}
                        subType={subType}
                        leftSlot={
                            showLeftSlot
                                ? { slot: <Hash size={16} /> }
                                : undefined
                        }
                        rightSlot={
                            showRightSlot
                                ? { slot: <X size={16} /> }
                                : undefined
                        }
                        loading={loading}
                        disabled={disabled}
                        showSkeleton={showSkeleton}
                        skeletonVariant={skeletonVariant}
                        width={width || undefined}
                        state={
                            disabled
                                ? ButtonState.DISABLED
                                : ButtonState.DEFAULT
                        }
                        onClick={() => {
                            addSnackbar({
                                header: 'ButtonV2 clicked!',
                                description: `${buttonType} ${size} button`,
                            })
                        }}
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">IconButton & LinkButton</h2>
                <div className="flex items-center gap-4 flex-wrap">
                    <IconButton
                        icon={<Hash size={16} />}
                        aria-label="Icon button"
                        onClick={() =>
                            addSnackbar({ header: 'IconButton clicked!' })
                        }
                    />
                    <LinkButton
                        href="#"
                        text="Link Button"
                        onClick={(e) => {
                            e?.preventDefault()
                            addSnackbar({ header: 'LinkButton clicked!' })
                        }}
                    />
                </div>
            </section>
        </div>
    )
}

export default ButtonV2Demo
