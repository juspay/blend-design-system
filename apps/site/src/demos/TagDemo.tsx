import {
    Tag,
    TagColor,
    TagVariant,
    TagSize,
    TagShape,
} from '../../../../packages/blend/lib/components/Tags'
import { SplitTag } from '../../../../packages/blend/lib/components/SplitTag'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import {
    Hash,
    X,
    Star,
    TrendingUp,
    DollarSign,
    Server,
    Database,
    Activity,
    AlertCircle,
} from 'lucide-react'
import { useState } from 'react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'

const TagDemo = () => {
    // Tag Playground State
    const [tagText, setTagText] = useState('Sample Tag')
    const [tagColor, setTagColor] = useState<TagColor>(TagColor.PRIMARY)
    const [tagVariant, setTagVariant] = useState<TagVariant>(TagVariant.SUBTLE)
    const [tagSize, setTagSize] = useState<TagSize>(TagSize.SM)
    const [tagShape, setTagShape] = useState<TagShape>(TagShape.SQUARICAL)
    const [showLeftSlot, setShowLeftSlot] = useState(false)
    const [showRightSlot, setShowRightSlot] = useState(false)

    // SplitTag Playground State
    const [primaryText, setPrimaryText] = useState('Status')
    const [secondaryText, setSecondaryText] = useState('Active')
    const [primaryColor, setPrimaryColor] = useState<TagColor>(TagColor.NEUTRAL)
    const [secondaryColor, setSecondaryColor] = useState<TagColor>(
        TagColor.SUCCESS
    )
    const [primaryVariant, setPrimaryVariant] = useState<TagVariant>(
        TagVariant.NO_FILL
    )
    const [secondaryVariant, setSecondaryVariant] = useState<TagVariant>(
        TagVariant.ATTENTIVE
    )
    const [splitSize, setSplitSize] = useState<TagSize>(TagSize.SM)

    // Options
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
        { value: TagSize.XS, label: 'XS' },
        { value: TagSize.SM, label: 'SM' },
        { value: TagSize.MD, label: 'MD' },
        { value: TagSize.LG, label: 'LG' },
    ]

    const shapeOptions = [
        { value: TagShape.SQUARICAL, label: 'Squarical' },
        { value: TagShape.ROUNDED, label: 'Rounded' },
    ]

    return (
        <div className="p-8 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Tag Components</h1>
                <p className="text-gray-600">
                    Interactive demos for Tag and SplitTag components with all
                    available customization options.
                </p>
            </div>

            {/* Tag Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">🏷️ Tag Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextInput
                            label="Text"
                            value={tagText}
                            onChange={(e) => setTagText(e.target.value)}
                            placeholder="Enter text"
                        />
                        <SingleSelect
                            label="Color"
                            placeholder="Select Color"
                            items={[{ items: colorOptions }]}
                            selected={tagColor}
                            onSelect={(value) => setTagColor(value as TagColor)}
                        />
                        <SingleSelect
                            label="Variant"
                            placeholder="Select Variant"
                            items={[{ items: variantOptions }]}
                            selected={tagVariant}
                            onSelect={(value) =>
                                setTagVariant(value as TagVariant)
                            }
                        />
                        <SingleSelect
                            label="Size"
                            placeholder="Select Size"
                            items={[{ items: sizeOptions }]}
                            selected={tagSize}
                            onSelect={(value) => setTagSize(value as TagSize)}
                        />
                        <SingleSelect
                            label="Shape"
                            placeholder="Select Shape"
                            items={[{ items: shapeOptions }]}
                            selected={tagShape}
                            onSelect={(value) => setTagShape(value as TagShape)}
                        />
                    </div>

                    <div className="flex gap-4">
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

                    <div className="min-h-32 rounded-xl flex justify-center items-center border-2 border-dashed border-gray-300 bg-gray-50">
                        <Tag
                            text={tagText}
                            color={tagColor}
                            variant={tagVariant}
                            size={tagSize}
                            shape={tagShape}
                            leftSlot={
                                showLeftSlot ? <Star size={12} /> : undefined
                            }
                            rightSlot={
                                showRightSlot ? <X size={12} /> : undefined
                            }
                            onClick={() =>
                                addSnackbar({ header: 'Tag clicked!' })
                            }
                        />
                    </div>
                </div>
            </div>

            {/* SplitTag Playground */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">🔀 SplitTag Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextInput
                            label="Primary Text"
                            value={primaryText}
                            onChange={(e) => setPrimaryText(e.target.value)}
                        />
                        <TextInput
                            label="Secondary Text"
                            value={secondaryText}
                            onChange={(e) => setSecondaryText(e.target.value)}
                        />
                        <SingleSelect
                            label="Size"
                            placeholder="Select Size"
                            items={[{ items: sizeOptions }]}
                            selected={splitSize}
                            onSelect={(value) => setSplitSize(value as TagSize)}
                        />
                        <SingleSelect
                            label="Primary Color"
                            placeholder="Select Color"
                            items={[{ items: colorOptions }]}
                            selected={primaryColor}
                            onSelect={(value) =>
                                setPrimaryColor(value as TagColor)
                            }
                        />
                        <SingleSelect
                            label="Secondary Color"
                            placeholder="Select Color"
                            items={[{ items: colorOptions }]}
                            selected={secondaryColor}
                            onSelect={(value) =>
                                setSecondaryColor(value as TagColor)
                            }
                        />
                        <div /> {/* Spacer */}
                        <SingleSelect
                            label="Primary Variant"
                            placeholder="Select Variant"
                            items={[{ items: variantOptions }]}
                            selected={primaryVariant}
                            onSelect={(value) =>
                                setPrimaryVariant(value as TagVariant)
                            }
                        />
                        <SingleSelect
                            label="Secondary Variant"
                            placeholder="Select Variant"
                            items={[{ items: variantOptions }]}
                            selected={secondaryVariant}
                            onSelect={(value) =>
                                setSecondaryVariant(value as TagVariant)
                            }
                        />
                    </div>

                    <div className="min-h-32 rounded-xl flex justify-center items-center border-2 border-dashed border-gray-300 bg-gray-50">
                        <SplitTag
                            primaryTag={{
                                text: primaryText,
                                color: primaryColor,
                                variant: primaryVariant,
                            }}
                            secondaryTag={{
                                text: secondaryText,
                                color: secondaryColor,
                                variant: secondaryVariant,
                            }}
                            size={splitSize}
                        />
                    </div>
                </div>
            </div>

            {/* Tag Variants */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Tag Variants</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.values(TagVariant).map((variant) => (
                        <div
                            key={variant}
                            className="space-y-3 p-4 border rounded-lg bg-white"
                        >
                            <h3 className="text-sm font-semibold capitalize">
                                {variant}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <Tag
                                    text="Primary"
                                    variant={variant}
                                    color={TagColor.PRIMARY}
                                />
                                <Tag
                                    text="Success"
                                    variant={variant}
                                    color={TagColor.SUCCESS}
                                />
                                <Tag
                                    text="Error"
                                    variant={variant}
                                    color={TagColor.ERROR}
                                />
                                <Tag
                                    text="Warning"
                                    variant={variant}
                                    color={TagColor.WARNING}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SplitTag Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">SplitTag Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Server Monitoring */}
                    <div className="space-y-3 p-4 border rounded-lg bg-white">
                        <h3 className="text-sm font-semibold">
                            Server Metrics
                        </h3>
                        <div className="space-y-2">
                            <SplitTag
                                primaryTag={{
                                    text: 'CPU',
                                    color: TagColor.NEUTRAL,
                                    leftSlot: <Server size={12} />,
                                }}
                                secondaryTag={{
                                    text: '45%',
                                    color: TagColor.SUCCESS,
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'Memory',
                                    color: TagColor.NEUTRAL,
                                    leftSlot: <Database size={12} />,
                                }}
                                secondaryTag={{
                                    text: '78%',
                                    color: TagColor.WARNING,
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'Disk',
                                    color: TagColor.NEUTRAL,
                                    leftSlot: <Activity size={12} />,
                                }}
                                secondaryTag={{
                                    text: '92%',
                                    color: TagColor.ERROR,
                                    leftSlot: <AlertCircle size={12} />,
                                }}
                                size={TagSize.SM}
                            />
                        </div>
                    </div>

                    {/* Financial Metrics */}
                    <div className="space-y-3 p-4 border rounded-lg bg-white">
                        <h3 className="text-sm font-semibold">
                            Financial Data
                        </h3>
                        <div className="space-y-2">
                            <SplitTag
                                primaryTag={{
                                    text: 'Revenue',
                                    color: TagColor.NEUTRAL,
                                    leftSlot: <DollarSign size={12} />,
                                }}
                                secondaryTag={{
                                    text: '$847K',
                                    color: TagColor.SUCCESS,
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'Growth',
                                    color: TagColor.NEUTRAL,
                                    leftSlot: <TrendingUp size={12} />,
                                }}
                                secondaryTag={{
                                    text: '+23.4%',
                                    color: TagColor.SUCCESS,
                                }}
                                size={TagSize.SM}
                            />
                        </div>
                    </div>

                    {/* Custom Variants */}
                    <div className="space-y-3 p-4 border rounded-lg bg-white">
                        <h3 className="text-sm font-semibold">
                            Custom Variants
                        </h3>
                        <div className="space-y-2">
                            <SplitTag
                                primaryTag={{
                                    text: 'Priority',
                                    color: TagColor.PRIMARY,
                                    variant: TagVariant.ATTENTIVE,
                                }}
                                secondaryTag={{
                                    text: 'High',
                                    color: TagColor.ERROR,
                                    variant: TagVariant.ATTENTIVE,
                                }}
                                size={TagSize.SM}
                            />
                            <SplitTag
                                primaryTag={{
                                    text: 'Build',
                                    color: TagColor.NEUTRAL,
                                    variant: TagVariant.SUBTLE,
                                }}
                                secondaryTag={{
                                    text: '#1234',
                                    color: TagColor.PRIMARY,
                                    variant: TagVariant.ATTENTIVE,
                                }}
                                size={TagSize.SM}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sizes Comparison */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 p-4 border rounded-lg bg-white">
                        <h3 className="text-sm font-semibold">Tag Sizes</h3>
                        <div className="space-y-2">
                            {Object.values(TagSize).map((size) => (
                                <div
                                    key={size}
                                    className="flex items-center gap-4"
                                >
                                    <span className="text-xs font-medium w-8 uppercase">
                                        {size}
                                    </span>
                                    <Tag
                                        text="Sample"
                                        size={size}
                                        color={TagColor.PRIMARY}
                                        leftSlot={<Hash size={12} />}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3 p-4 border rounded-lg bg-white">
                        <h3 className="text-sm font-semibold">
                            SplitTag Sizes
                        </h3>
                        <div className="space-y-2">
                            {Object.values(TagSize).map((size) => (
                                <div
                                    key={size}
                                    className="flex items-center gap-4"
                                >
                                    <span className="text-xs font-medium w-8 uppercase">
                                        {size}
                                    </span>
                                    <SplitTag
                                        primaryTag={{
                                            text: 'Status',
                                            color: TagColor.NEUTRAL,
                                        }}
                                        secondaryTag={{
                                            text: 'Active',
                                            color: TagColor.SUCCESS,
                                        }}
                                        size={size}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Tag
                        text="Clickable"
                        color={TagColor.PRIMARY}
                        onClick={() => addSnackbar({ header: 'Tag clicked!' })}
                    />
                    <Tag
                        text="With Icon"
                        color={TagColor.SUCCESS}
                        leftSlot={<Star size={12} />}
                        onClick={() => addSnackbar({ header: 'Success!' })}
                    />
                    <Tag
                        text="Removable"
                        color={TagColor.WARNING}
                        rightSlot={<X size={12} />}
                        onClick={() => addSnackbar({ header: 'Remove tag' })}
                    />
                    <SplitTag
                        primaryTag={{ text: 'ENV', color: TagColor.NEUTRAL }}
                        secondaryTag={{
                            text: 'Production',
                            color: TagColor.ERROR,
                            onClick: () =>
                                addSnackbar({
                                    header: 'Environment: Production',
                                }),
                        }}
                        size={TagSize.SM}
                    />
                </div>
            </div>
        </div>
    )
}

export default TagDemo
