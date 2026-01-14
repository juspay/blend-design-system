import {
    addSnackbar,
    TagV2,
    TextInput,
} from '../../../../packages/blend/lib/main'
import {
    TagV2Type,
    TagV2Size,
    TagV2SubType,
    TagV2Color,
} from '../../../../packages/blend/lib/components/TagV2/TagV2.types'
import { Star, X } from 'lucide-react'
import { useState } from 'react'
import Switch from '../../../../packages/blend/lib/components/Switch/Switch'
import SingleSelect from '../../../../packages/blend/lib/components/SingleSelect/SingleSelect'
import { SkeletonVariant } from '@juspay/blend-design-system'
const TagV2Demo = () => {
    const [tagText, setTagText] = useState('TagV2')
    const [tagColor, setTagColor] = useState(TagV2Color.PRIMARY)
    const [tagType, setTagType] = useState(TagV2Type.SUBTLE)
    const [tagSize, setTagSize] = useState(TagV2Size.XS)
    const [tagSubType, setTagSubType] = useState(TagV2SubType.SQUARICAL)
    const [showLeftSlot, setShowLeftSlot] = useState(false)
    const [showRightSlot, setShowRightSlot] = useState(false)
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [skeletonVariant, setSkeletonVariant] = useState('pulse')
    const [isClickable, setIsClickable] = useState(false)

    const tagColorOptions = [
        { value: TagV2Color.NEUTRAL, label: 'Neutral' },
        { value: TagV2Color.PRIMARY, label: 'Primary' },
        { value: TagV2Color.SUCCESS, label: 'Success' },
        { value: TagV2Color.ERROR, label: 'Error' },
        { value: TagV2Color.WARNING, label: 'Warning' },
        { value: TagV2Color.PURPLE, label: 'Purple' },
    ]

    const tagTypeOptions = [
        { value: TagV2Type.SUBTLE, label: 'Subtle' },
        { value: TagV2Type.NO_FILL, label: 'No Fill' },
        { value: TagV2Type.ATTENTIVE, label: 'Attentive' },
    ]

    const tagSizeOptions = [
        { value: TagV2Size.XS, label: 'Extra Small' },
        { value: TagV2Size.SM, label: 'Small' },
        { value: TagV2Size.MD, label: 'Medium' },
        { value: TagV2Size.LG, label: 'Large' },
    ]

    const tagSubTypeOptions = [
        { value: TagV2SubType.SQUARICAL, label: 'Square' },
        { value: TagV2SubType.ROUNDED, label: 'Rounded' },
    ]
    return (
        <div className="space-y-6 p-8">
            <h2 className="text-2xl font-bold">🏷️ Tag Playground</h2>
            <div className="space-y-6">
                <div className="space-y-4">
                    <TextInput
                        label="Text"
                        value={tagText}
                        onChange={(e) => setTagText(e.target.value)}
                        placeholder="Enter text"
                    />
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Select Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <SingleSelect
                            label="Type"
                            placeholder="Select Type"
                            items={[{ items: tagTypeOptions }]}
                            selected={tagType}
                            onSelect={(value) => setTagType(value as TagV2Type)}
                        />
                        <SingleSelect
                            label="Color"
                            placeholder="Select Color"
                            items={[{ items: tagColorOptions }]}
                            selected={tagColor}
                            onSelect={(value) =>
                                setTagColor(value as TagV2Color)
                            }
                        />
                        <SingleSelect
                            label="Size"
                            placeholder="Select Size"
                            items={[{ items: tagSizeOptions }]}
                            selected={tagSize}
                            onSelect={(value) => setTagSize(value as TagV2Size)}
                        />
                        <SingleSelect
                            label="Shape"
                            placeholder="Select Shape"
                            items={[{ items: tagSubTypeOptions }]}
                            selected={tagSubType}
                            onSelect={(value) =>
                                setTagSubType(value as TagV2SubType)
                            }
                        />
                        <SingleSelect
                            label="Skeleton Variant"
                            placeholder="Select Skeleton Variant"
                            items={[
                                {
                                    items: [
                                        { value: 'pulse', label: 'Pulse' },
                                        { value: 'wave', label: 'Wave' },
                                        { value: 'shimmer', label: 'Shimmer' },
                                    ],
                                },
                            ]}
                            selected={skeletonVariant}
                            onSelect={(value) =>
                                setSkeletonVariant(
                                    value as 'pulse' | 'wave' | 'shimmer'
                                )
                            }
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Toggle Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Switch
                            label="Clickable"
                            checked={isClickable}
                            onChange={() => setIsClickable(!isClickable)}
                        />
                        <Switch
                            label="Show Skeleton"
                            checked={showSkeleton}
                            onChange={() => setShowSkeleton(!showSkeleton)}
                        />
                        <Switch
                            label="Left Icon"
                            checked={showLeftSlot}
                            onChange={() => setShowLeftSlot(!showLeftSlot)}
                        />
                        <Switch
                            label="Right Icon"
                            checked={showRightSlot}
                            onChange={() => setShowRightSlot(!showRightSlot)}
                        />
                    </div>
                </div>

                <div className="min-h-32 rounded-xl flex justify-center items-center border-2 border-dashed border-gray-300 bg-gray-50">
                    <TagV2
                        aria-label="TagV2"
                        text={tagText}
                        type={tagType}
                        size={tagSize}
                        subType={tagSubType}
                        color={tagColor}
                        showSkeleton={showSkeleton}
                        skeletonVariant={skeletonVariant as SkeletonVariant}
                        leftSlot={showLeftSlot ? <Star size={12} /> : undefined}
                        rightSlot={
                            showRightSlot ? (
                                <X aria-label="X" size={12} />
                            ) : undefined
                        }
                        {...(isClickable
                            ? {
                                  onClick: () =>
                                      addSnackbar({ header: 'TagV2 clicked!' }),
                              }
                            : {})}
                    />
                </div>
            </div>
        </div>
    )
}

export default TagV2Demo
