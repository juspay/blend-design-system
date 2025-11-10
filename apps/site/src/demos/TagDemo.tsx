import {
    Tag,
    TagColor,
    TagVariant,
    TagSize,
    TagShape,
} from '../../../../packages/blend/lib/components/Tags'
import type { SkeletonVariant } from '../../../../packages/blend/lib/components/Skeleton/skeleton.tokens'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { Hash, X, Plus, Star } from 'lucide-react'
import { useState } from 'react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
const TagDemo = () => {
    // Pure Tag Playground State
    const [playgroundText, setPlaygroundText] = useState('Playground Tag')
    const [playgroundColor, setPlaygroundColor] = useState<TagColor>(
        TagColor.PRIMARY
    )
    const [playgroundVariant, setPlaygroundVariant] = useState<TagVariant>(
        TagVariant.SUBTLE
    )
    const [playgroundSize, setPlaygroundSize] = useState<TagSize>(TagSize.SM)
    const [playgroundShape, setPlaygroundShape] = useState<TagShape>(
        TagShape.SQUARICAL
    )
    const [showLeftSlot, setShowLeftSlot] = useState(false)
    const [showRightSlot, setShowRightSlot] = useState(false)

    // Tag loading state playground
    const [skeletonText, setSkeletonText] = useState('Loading Tag...')
    const [skeletonColor, setSkeletonColor] = useState<TagColor>(
        TagColor.PRIMARY
    )
    const [skeletonVariant, setSkeletonVariant] = useState<TagVariant>(
        TagVariant.SUBTLE
    )
    const [skeletonSize, setSkeletonSize] = useState<TagSize>(TagSize.SM)
    const [skeletonShape, setSkeletonShape] = useState<TagShape>(
        TagShape.SQUARICAL
    )
    const [skeletonLeftSlot, setSkeletonLeftSlot] = useState(false)
    const [skeletonRightSlot, setSkeletonRightSlot] = useState(false)
    const [skeletonAnimationVariant, setSkeletonAnimationVariant] =
        useState<SkeletonVariant>('pulse')
    const [skeletonSplitPosition, setSkeletonSplitPosition] =
        useState<string>('none')

    // Options for selects
    const colorOptions = [
        { value: TagColor.NEUTRAL, label: 'Neutral' },
        { value: TagColor.PRIMARY, label: 'Primary' },
        { value: TagColor.SUCCESS, label: 'Success' },
        { value: TagColor.ERROR, label: 'Error' },
        { value: TagColor.WARNING, label: 'Warning' },
        { value: TagColor.PURPLE, label: 'Purple' },
    ]

    const variantOptions = [
        { value: TagVariant.NO_FILL, label: 'No Fill' },
        { value: TagVariant.ATTENTIVE, label: 'Attentive' },
        { value: TagVariant.SUBTLE, label: 'Subtle' },
    ]

    const sizeOptions = [
        { value: TagSize.XS, label: 'Extra Small' },
        { value: TagSize.SM, label: 'Small' },
        { value: TagSize.MD, label: 'Medium' },
        { value: TagSize.LG, label: 'Large' },
    ]

    const shapeOptions = [
        { value: TagShape.SQUARICAL, label: 'Squarical' },
        { value: TagShape.ROUNDED, label: 'Rounded' },
    ]

    const skeletonVariantOptions = [
        { value: 'pulse' as SkeletonVariant, label: 'Pulse' },
        { value: 'wave' as SkeletonVariant, label: 'Wave' },
        { value: 'shimmer' as SkeletonVariant, label: 'Shimmer' },
    ]

    const splitPositionOptions = [
        { value: 'none', label: 'None' },
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Tag Component Demo</h1>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                        <strong>Simple Approach:</strong> Tag component handles
                        both normal and loading states. Just pass{' '}
                        <code className="bg-blue-100 px-1 rounded">
                            showSkeleton
                        </code>{' '}
                        to show skeleton styling - no separate component needed!
                    </p>
                </div>
            </div>

            {/* Pure Tag Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">✅ Pure Tag Playground</h2>
                <p className="text-gray-600">
                    Test the pure Tag component focused only on UI rendering
                </p>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Text"
                            value={playgroundText}
                            onChange={(e) => setPlaygroundText(e.target.value)}
                            placeholder="Enter tag text"
                        />

                        <SingleSelect
                            label="Color"
                            items={[{ items: colorOptions }]}
                            selected={playgroundColor}
                            onSelect={(value) =>
                                setPlaygroundColor(value as TagColor)
                            }
                            placeholder="Select color"
                        />

                        <SingleSelect
                            label="Variant"
                            items={[{ items: variantOptions }]}
                            selected={playgroundVariant}
                            onSelect={(value) =>
                                setPlaygroundVariant(value as TagVariant)
                            }
                            placeholder="Select variant"
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as TagSize)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Shape"
                            items={[{ items: shapeOptions }]}
                            selected={playgroundShape}
                            onSelect={(value) =>
                                setPlaygroundShape(value as TagShape)
                            }
                            placeholder="Select shape"
                        />
                    </div>

                    <div className="flex items-center gap-6">
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
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                        <Tag
                            text={playgroundText}
                            color={playgroundColor}
                            variant={playgroundVariant}
                            size={playgroundSize}
                            shape={playgroundShape}
                            leftSlot={
                                showLeftSlot ? <Hash size={12} /> : undefined
                            }
                            rightSlot={
                                showRightSlot ? <X size={12} /> : undefined
                            }
                            onClick={() => {
                                addSnackbar({
                                    header: 'Tag clicked!',
                                    // description: "This is a tag",
                                })
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Tag with Loading State Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    🔄 Tag with Loading State
                </h2>
                <p className="text-gray-600">
                    Test Tag with <code>showSkeleton</code> - skeleton styling
                    wraps the component automatically
                </p>

                {/* Controls */}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Text (for sizing)"
                            value={skeletonText}
                            onChange={(e) => setSkeletonText(e.target.value)}
                            placeholder="Enter text for sizing"
                        />

                        <SingleSelect
                            label="Color"
                            items={[{ items: colorOptions }]}
                            selected={skeletonColor}
                            onSelect={(value) =>
                                setSkeletonColor(value as TagColor)
                            }
                            placeholder="Select color"
                        />

                        <SingleSelect
                            label="Variant"
                            items={[{ items: variantOptions }]}
                            selected={skeletonVariant}
                            onSelect={(value) =>
                                setSkeletonVariant(value as TagVariant)
                            }
                            placeholder="Select variant"
                        />

                        <SingleSelect
                            label="Size"
                            items={[{ items: sizeOptions }]}
                            selected={skeletonSize}
                            onSelect={(value) =>
                                setSkeletonSize(value as TagSize)
                            }
                            placeholder="Select size"
                        />

                        <SingleSelect
                            label="Shape"
                            items={[{ items: shapeOptions }]}
                            selected={skeletonShape}
                            onSelect={(value) =>
                                setSkeletonShape(value as TagShape)
                            }
                            placeholder="Select shape"
                        />

                        <SingleSelect
                            label="Animation Variant"
                            items={[{ items: skeletonVariantOptions }]}
                            selected={skeletonAnimationVariant}
                            onSelect={(value) =>
                                setSkeletonAnimationVariant(
                                    value as SkeletonVariant
                                )
                            }
                            placeholder="Select animation"
                        />
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Has Left Slot"
                            checked={skeletonLeftSlot}
                            onChange={() =>
                                setSkeletonLeftSlot(!skeletonLeftSlot)
                            }
                        />
                        <Switch
                            label="Has Right Slot"
                            checked={skeletonRightSlot}
                            onChange={() =>
                                setSkeletonRightSlot(!skeletonRightSlot)
                            }
                        />

                        <SingleSelect
                            label="Split Position"
                            items={[{ items: splitPositionOptions }]}
                            selected={skeletonSplitPosition}
                            onSelect={(value) =>
                                setSkeletonSplitPosition(value as string)
                            }
                            placeholder="Select split position"
                        />
                    </div>
                </div>

                {/* Tag with Loading Demo */}
                <div className="min-h-40 rounded-2xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50">
                    <Tag
                        text={skeletonText}
                        color={skeletonColor}
                        size={skeletonSize}
                        shape={skeletonShape}
                        leftSlot={
                            skeletonLeftSlot ? <Hash size={12} /> : undefined
                        }
                        rightSlot={
                            skeletonRightSlot ? <X size={12} /> : undefined
                        }
                        splitTagPosition={
                            skeletonSplitPosition === 'none'
                                ? undefined
                                : (skeletonSplitPosition as 'left' | 'right')
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
                            <div className="flex flex-wrap gap-2">
                                <Tag
                                    text="Loading Tag"
                                    color={TagColor.PRIMARY}
                                    showSkeleton
                                    skeletonVariant={value}
                                />
                                <Tag
                                    text="With Icon"
                                    color={TagColor.SUCCESS}
                                    leftSlot={<Hash size={12} />}
                                    showSkeleton
                                    skeletonVariant={value}
                                />
                                <Tag
                                    text="Different Size"
                                    color={TagColor.WARNING}
                                    size={TagSize.LG}
                                    showSkeleton
                                    skeletonVariant={value}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">
                    🔍 Perfect Token Mirroring
                </h2>
                <p className="text-gray-600">
                    Compare Tag (loading) with actual Tag - dimensions should
                    match exactly
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.values(TagSize).map((size) => (
                        <div
                            key={size}
                            className="space-y-4 p-4 border rounded-lg bg-white"
                        >
                            <h3 className="text-lg font-semibold capitalize">
                                {size} Size
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 w-16">
                                        Skeleton:
                                    </span>
                                    <Tag
                                        text="Sample Tag"
                                        size={size}
                                        color={TagColor.PRIMARY}
                                        leftSlot={
                                            <Hash
                                                size={
                                                    size === TagSize.XS
                                                        ? 10
                                                        : size === TagSize.SM
                                                          ? 12
                                                          : size === TagSize.MD
                                                            ? 14
                                                            : 16
                                                }
                                            />
                                        }
                                        showSkeleton
                                        skeletonVariant="pulse"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 w-16">
                                        Actual:
                                    </span>
                                    <Tag
                                        text="Sample Tag"
                                        size={size}
                                        color={TagColor.PRIMARY}
                                        leftSlot={
                                            <Hash
                                                size={
                                                    size === TagSize.XS
                                                        ? 10
                                                        : size === TagSize.SM
                                                          ? 12
                                                          : size === TagSize.MD
                                                            ? 14
                                                            : 16
                                                }
                                            />
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Variants Grid */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Variants</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {Object.values(TagVariant).map((variant) => (
                        <div key={variant} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {variant}
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.values(TagColor).map((color) => (
                                    <Tag
                                        key={`${variant}-${color}`}
                                        text={
                                            color.charAt(0).toUpperCase() +
                                            color.slice(1)
                                        }
                                        variant={variant}
                                        color={color}
                                        leftSlot={<Hash size={12} />}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.values(TagSize).map((size) => (
                        <div key={size} className="space-y-3">
                            <h3 className="text-sm font-medium uppercase">
                                {size}
                            </h3>
                            <div className="space-y-2">
                                <Tag
                                    text="Primary"
                                    size={size}
                                    color={TagColor.PRIMARY}
                                    leftSlot={
                                        <Hash
                                            size={
                                                size === TagSize.XS
                                                    ? 10
                                                    : size === TagSize.SM
                                                      ? 12
                                                      : size === TagSize.MD
                                                        ? 14
                                                        : 16
                                            }
                                        />
                                    }
                                />
                                <Tag
                                    text="Success"
                                    size={size}
                                    color={TagColor.SUCCESS}
                                    leftSlot={
                                        <Plus
                                            size={
                                                size === TagSize.XS
                                                    ? 10
                                                    : size === TagSize.SM
                                                      ? 12
                                                      : size === TagSize.MD
                                                        ? 14
                                                        : 16
                                            }
                                        />
                                    }
                                />
                                <Tag
                                    text="Error"
                                    size={size}
                                    color={TagColor.ERROR}
                                    rightSlot={
                                        <X
                                            size={
                                                size === TagSize.XS
                                                    ? 10
                                                    : size === TagSize.SM
                                                      ? 12
                                                      : size === TagSize.MD
                                                        ? 14
                                                        : 16
                                            }
                                        />
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shapes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Shapes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.values(TagShape).map((shape) => (
                        <div key={shape} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {shape}
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <Tag
                                    text="Primary"
                                    shape={shape}
                                    color={TagColor.PRIMARY}
                                    leftSlot={<Hash size={12} />}
                                />
                                <Tag
                                    text="Success"
                                    shape={shape}
                                    color={TagColor.SUCCESS}
                                    leftSlot={<Plus size={12} />}
                                />
                                <Tag
                                    text="Error"
                                    shape={shape}
                                    color={TagColor.ERROR}
                                    rightSlot={<X size={12} />}
                                />
                                <Tag
                                    text="Warning"
                                    shape={shape}
                                    color={TagColor.WARNING}
                                    leftSlot={<Star size={12} />}
                                />
                                <Tag
                                    text="Purple"
                                    shape={shape}
                                    color={TagColor.PURPLE}
                                    leftSlot={<Hash size={12} />}
                                />
                                <Tag
                                    text="Neutral"
                                    shape={shape}
                                    color={TagColor.NEUTRAL}
                                    leftSlot={<Hash size={12} />}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <Tag
                        text="Clickable"
                        color={TagColor.PRIMARY}
                        onClick={() => {
                            addSnackbar({
                                header: 'Primary tag clicked!',
                            })
                        }}
                    />
                    <Tag
                        text="Removable"
                        color={TagColor.SUCCESS}
                        rightSlot={<X size={12} />}
                        onClick={() => {
                            addSnackbar({
                                header: 'Success tag clicked!',
                            })
                        }}
                    />
                    <Tag
                        text="With Icon"
                        color={TagColor.WARNING}
                        leftSlot={<Star size={12} />}
                        onClick={() => {
                            addSnackbar({
                                header: 'Warning tag clicked!',
                            })
                        }}
                    />
                    <Tag
                        text="Split Left"
                        color={TagColor.ERROR}
                        splitTagPosition="left"
                        onClick={() => {
                            addSnackbar({
                                header: 'Split left tag clicked!',
                            })
                        }}
                    />
                    <Tag
                        text="Split Right"
                        color={TagColor.PURPLE}
                        splitTagPosition="right"
                        onClick={() => {
                            addSnackbar({
                                header: 'Split right tag clicked!',
                            })
                        }}
                    />
                </div>
            </div>

            {/* All Combinations */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">All Combinations</h2>
                <div className="space-y-8">
                    {Object.values(TagVariant).map((variant) => (
                        <div key={variant} className="space-y-4">
                            <h3 className="text-lg font-semibold capitalize">
                                {variant} Variant
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {Object.values(TagColor).map((color) => (
                                    <div key={color} className="space-y-2">
                                        <h4 className="text-xs font-medium capitalize text-gray-600">
                                            {color}
                                        </h4>
                                        <div className="space-y-1">
                                            <Tag
                                                text="S"
                                                variant={variant}
                                                color={color}
                                                size={TagSize.SM}
                                                leftSlot={<Hash size={12} />}
                                            />
                                            <Tag
                                                text="M"
                                                variant={variant}
                                                color={color}
                                                size={TagSize.MD}
                                                leftSlot={<Hash size={14} />}
                                            />
                                            <Tag
                                                text="L"
                                                variant={variant}
                                                color={color}
                                                size={TagSize.LG}
                                                leftSlot={<Hash size={16} />}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TagDemo
