import { addSnackbar, TextInput } from '../../../../packages/blend/lib/main'
import {
    TagV2Type,
    TagV2Size,
    TagV2SubType,
    TagV2Color,
} from '../../../../packages/blend/lib/components/TagV2/TagV2.types'
import TagV2 from '../../../../packages/blend/lib/components/TagV2/TagV2'
import TagGroupV2 from '../../../../packages/blend/lib/components/TagGroupV2/TagGroupV2'

import { Star, X, Check, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import Switch from '../../../../packages/blend/lib/components/Switch/Switch'
import SingleSelect from '../../../../packages/blend/lib/components/SingleSelect/SingleSelect'

const TagGroupV2Demo = () => {
    // TagGroupV2 props
    const [stacked, setStacked] = useState(false)
    const [gap, setGap] = useState('8')
    const [tagCount, setTagCount] = useState('3')

    // TagV2 props
    const [tagText, setTagText] = useState('Tag')
    const [tagColor, setTagColor] = useState(TagV2Color.PRIMARY)
    const [tagType, setTagType] = useState(TagV2Type.SUBTLE)
    const [tagSize, setTagSize] = useState(TagV2Size.SM)
    const [tagSubType, setTagSubType] = useState(TagV2SubType.SQUARICAL)
    const [showLeftSlot, setShowLeftSlot] = useState(false)
    const [showRightSlot, setShowRightSlot] = useState(false)
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

    const countOptions = [
        { value: '2', label: '2 Tags' },
        { value: '3', label: '3 Tags' },
        { value: '4', label: '4 Tags' },
        { value: '5', label: '5 Tags' },
        { value: '6', label: '6 Tags' },
    ]

    const gapOptions = [
        { value: '0', label: '0px' },
        { value: '4', label: '4px' },
        { value: '8', label: '8px' },
        { value: '12', label: '12px' },
        { value: '16', label: '16px' },
        { value: '24', label: '24px' },
    ]

    const renderTags = () => {
        const tags = []
        const tagTexts = ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind']
        const colors = [
            TagV2Color.PRIMARY,
            TagV2Color.SUCCESS,
            TagV2Color.WARNING,
            TagV2Color.ERROR,
            TagV2Color.PURPLE,
        ]

        for (let i = 0; i < Number(tagCount); i++) {
            tags.push(
                <TagV2
                    key={i}
                    text={tagTexts[i] || `${tagText} ${i + 1}`}
                    type={tagType}
                    size={tagSize}
                    subType={tagSubType}
                    color={colors[i] || tagColor}
                    leftSlot={
                        showLeftSlot
                            ? i === 0
                                ? {
                                      slot: <Star size={12} />,
                                      maxHeight: '12px',
                                  }
                                : i === 1
                                  ? {
                                        slot: <Check size={12} />,
                                        maxHeight: '12px',
                                    }
                                  : {
                                        slot: <AlertCircle size={12} />,
                                        maxHeight: '12px',
                                    }
                            : undefined
                    }
                    rightSlot={
                        showRightSlot
                            ? {
                                  slot: <X aria-label="Remove" size={12} />,
                                  maxHeight: '12px',
                              }
                            : undefined
                    }
                    {...(isClickable
                        ? {
                              onClick: () =>
                                  addSnackbar({
                                      header: `${tagTexts[i] || tagText} clicked!`,
                                  }),
                          }
                        : {})}
                />
            )
        }
        return tags
    }

    return (
        <div className="space-y-6 p-8">
            <div>
                <h2 className="text-2xl font-bold">🏷️ TagGroupV2 Playground</h2>
                <p className="text-gray-600 mt-1">
                    Configure TagGroupV2 and TagV2 props to see live updates
                </p>
            </div>

            <div className="space-y-6">
                {/* TagGroupV2 Controls */}
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900">
                        TagGroupV2 Props
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Switch
                            label="Stacked"
                            checked={stacked}
                            onChange={() => setStacked(!stacked)}
                        />
                        <SingleSelect
                            label="Gap (px)"
                            placeholder="Select Gap"
                            items={[{ items: gapOptions }]}
                            selected={gap}
                            onSelect={(value) => setGap(value as string)}
                        />
                        <SingleSelect
                            label="Tag Count"
                            placeholder="Select Count"
                            items={[{ items: countOptions }]}
                            selected={tagCount}
                            onSelect={(value) => setTagCount(value as string)}
                        />
                    </div>
                </div>

                {/* TagV2 Controls */}
                <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-900">
                        TagV2 Props (Applied to all tags)
                    </h3>
                    <div className="space-y-4">
                        <TextInput
                            label="Tag Text (for custom tags)"
                            value={tagText}
                            onChange={(e) => setTagText(e.target.value)}
                            placeholder="Enter text"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <SingleSelect
                                label="Type"
                                placeholder="Select Type"
                                items={[{ items: tagTypeOptions }]}
                                selected={tagType}
                                onSelect={(value) =>
                                    setTagType(value as TagV2Type)
                                }
                            />
                            <SingleSelect
                                label="Size"
                                placeholder="Select Size"
                                items={[{ items: tagSizeOptions }]}
                                selected={tagSize}
                                onSelect={(value) =>
                                    setTagSize(value as TagV2Size)
                                }
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
                                label="Color (for custom tags)"
                                placeholder="Select Color"
                                items={[{ items: tagColorOptions }]}
                                selected={tagColor}
                                onSelect={(value) =>
                                    setTagColor(value as TagV2Color)
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Switch
                                label="Clickable"
                                checked={isClickable}
                                onChange={() => setIsClickable(!isClickable)}
                            />
                            <Switch
                                label="Left Icon"
                                checked={showLeftSlot}
                                onChange={() => setShowLeftSlot(!showLeftSlot)}
                            />
                            <Switch
                                label="Right Icon"
                                checked={showRightSlot}
                                onChange={() =>
                                    setShowRightSlot(!showRightSlot)
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <div className="min-h-32 rounded-xl flex justify-center items-center border-2 border-dashed border-gray-300 bg-white p-8">
                        <TagGroupV2
                            stacked={stacked}
                            gap={stacked ? undefined : Number(gap)}
                        >
                            {renderTags()}
                        </TagGroupV2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TagGroupV2Demo
