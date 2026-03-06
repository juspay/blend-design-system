import { useState } from 'react'
import { MultiSelectV2 } from '../../../../packages/blend/lib/components/MultiSelectV2'
import {
    MultiSelectV2Size,
    MultiSelectV2Variant,
    MultiSelectV2Alignment,
    MultiSelectV2Side,
    MultiSelectV2SelectionTagType,
    type MultiSelectV2GroupType,
} from '../../../../packages/blend/lib/components/MultiSelectV2/types'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { User, Star, Shield, Briefcase } from 'lucide-react'

const MultiSelectDemoV2 = () => {
    const [playgroundLabel, setPlaygroundLabel] = useState('Select options')
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundErrorMessage, setPlaygroundErrorMessage] = useState(
        'This is an error message'
    )
    const [playgroundSubLabel, setPlaygroundSubLabel] = useState(
        'Choose your preferences'
    )
    const [playgroundHintText, setPlaygroundHintText] = useState(
        'This is a hint text'
    )
    const [playgroundPlaceholder, setPlaygroundPlaceholder] =
        useState('Select options...')
    const [playgroundSize, setPlaygroundSize] = useState<
        MultiSelectV2Size | ''
    >(MultiSelectV2Size.MEDIUM)
    const [playgroundVariant, setPlaygroundVariant] = useState<
        MultiSelectV2Variant | ''
    >(MultiSelectV2Variant.CONTAINER)
    const [playgroundAlignment, setPlaygroundAlignment] = useState<
        MultiSelectV2Alignment | ''
    >(MultiSelectV2Alignment.START)
    const [playgroundSide, setPlaygroundSide] = useState<
        MultiSelectV2Side | ''
    >(MultiSelectV2Side.BOTTOM)
    const [playgroundSelectionTagType, setPlaygroundSelectionTagType] =
        useState<MultiSelectV2SelectionTagType | ''>(
            MultiSelectV2SelectionTagType.COUNT
        )
    const [playgroundSelected, setPlaygroundSelected] = useState<string[]>([])
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundEnableSearch, setPlaygroundEnableSearch] = useState(true)
    const [playgroundEnableSelectAll, setPlaygroundEnableSelectAll] =
        useState(false)
    const [playgroundShowSlot, setPlaygroundShowSlot] = useState(false)
    const [playgroundFullWidth, setPlaygroundFullWidth] = useState(false)
    const [playgroundShowActionButtons, setPlaygroundShowActionButtons] =
        useState(false)

    const [actionButtonsSelected, setActionButtonsSelected] = useState<
        string[]
    >([])
    const handleActionButtonsChange = (value: string) => {
        setActionButtonsSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        )
    }

    const handlePlaygroundChange = (value: string | string[]) => {
        setPlaygroundSelected((prev) =>
            Array.isArray(value)
                ? value
                : prev.includes(value)
                  ? prev.filter((v) => v !== value)
                  : [...prev, value]
        )
    }

    const groupedItems: MultiSelectV2GroupType[] = [
        {
            groupLabel: 'Popular Options',
            showSeparator: true,
            items: [
                {
                    label: 'Most Popular Option',
                    value: 'popular1',
                    slot1: <Star size={16} />,
                },
                {
                    label: 'Trending Now',
                    value: 'popular2',
                    slot1: <Star size={16} />,
                },
            ],
        },
        {
            groupLabel: 'Standard Options',
            showSeparator: true,
            items: [
                {
                    label: 'Standard Option A',
                    value: 'standard1',
                    subLabel: 'Basic functionality',
                },
                {
                    label: 'Standard Option B',
                    value: 'standard2',
                    subLabel: 'Enhanced features',
                },
                {
                    label: 'Disabled Option',
                    value: 'disabled1',
                    disabled: true,
                },
            ],
        },
        {
            groupLabel: 'Advanced',
            items: [
                {
                    label: 'Enterprise',
                    value: 'enterprise',
                    slot1: <Shield size={16} />,
                    subLabel: 'Full feature set',
                },
                {
                    label: 'Custom Solution',
                    value: 'custom',
                    slot1: <Briefcase size={16} />,
                    subLabel: 'Tailored to your needs',
                },
            ],
        },
    ]

    const sizeOptions: MultiSelectV2GroupType[] = [
        {
            items: [
                { value: MultiSelectV2Size.SMALL, label: 'Small' },
                { value: MultiSelectV2Size.MEDIUM, label: 'Medium' },
                { value: MultiSelectV2Size.LARGE, label: 'Large' },
            ],
        },
    ]

    const variantOptions: MultiSelectV2GroupType[] = [
        {
            items: [
                {
                    value: MultiSelectV2Variant.CONTAINER,
                    label: 'Container',
                },
                {
                    value: MultiSelectV2Variant.NO_CONTAINER,
                    label: 'No Container',
                },
            ],
        },
    ]

    const alignmentOptions: MultiSelectV2GroupType[] = [
        {
            items: [
                { value: MultiSelectV2Alignment.START, label: 'Start' },
                { value: MultiSelectV2Alignment.CENTER, label: 'Center' },
                { value: MultiSelectV2Alignment.END, label: 'End' },
            ],
        },
    ]

    const sideOptions: MultiSelectV2GroupType[] = [
        {
            items: [
                { value: MultiSelectV2Side.TOP, label: 'Top' },
                { value: MultiSelectV2Side.BOTTOM, label: 'Bottom' },
                { value: MultiSelectV2Side.LEFT, label: 'Left' },
                { value: MultiSelectV2Side.RIGHT, label: 'Right' },
            ],
        },
    ]

    const selectionTagOptions: MultiSelectV2GroupType[] = [
        {
            items: [
                {
                    value: MultiSelectV2SelectionTagType.COUNT,
                    label: 'Count',
                },
                {
                    value: MultiSelectV2SelectionTagType.TEXT,
                    label: 'Text',
                },
            ],
        },
    ]

    return (
        <div className="p-8 space-y-10">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">MultiSelectV2 Component</h1>
                <p className="text-gray-600">
                    Interactive playground: groups, search, select all, action
                    buttons, and accessibility aligned with MultiSelect v1
                    (data-element, data-id, ARIA).
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Label"
                            value={playgroundLabel}
                            onChange={(e) => setPlaygroundLabel(e.target.value)}
                            placeholder="Enter label"
                        />
                        <TextInput
                            label="Sub Label"
                            value={playgroundSubLabel}
                            onChange={(e) =>
                                setPlaygroundSubLabel(e.target.value)
                            }
                            placeholder="Enter sub label"
                        />
                        <TextInput
                            label="Placeholder"
                            value={playgroundPlaceholder}
                            onChange={(e) =>
                                setPlaygroundPlaceholder(e.target.value)
                            }
                            placeholder="Enter placeholder"
                        />
                        <TextInput
                            label="Hint Text"
                            value={playgroundHintText}
                            onChange={(e) =>
                                setPlaygroundHintText(e.target.value)
                            }
                            placeholder="Enter hint text"
                        />
                        <TextInput
                            label="Error Message"
                            value={playgroundErrorMessage}
                            onChange={(e) =>
                                setPlaygroundErrorMessage(e.target.value)
                            }
                            placeholder="Enter error message"
                        />
                        <MultiSelectV2
                            label="Size"
                            items={sizeOptions}
                            selectedValues={
                                playgroundSize ? [playgroundSize] : []
                            }
                            onChange={(value) =>
                                setPlaygroundSize((prev) =>
                                    prev === value
                                        ? ''
                                        : (value as MultiSelectV2Size)
                                )
                            }
                            placeholder="Select size"
                        />
                        <MultiSelectV2
                            label="Variant"
                            items={variantOptions}
                            selectedValues={
                                playgroundVariant ? [playgroundVariant] : []
                            }
                            onChange={(value) =>
                                setPlaygroundVariant((prev) =>
                                    prev === value
                                        ? ''
                                        : (value as MultiSelectV2Variant)
                                )
                            }
                            placeholder="Select variant"
                        />
                        <MultiSelectV2
                            label="Alignment"
                            items={alignmentOptions}
                            selectedValues={
                                playgroundAlignment ? [playgroundAlignment] : []
                            }
                            onChange={(value) =>
                                setPlaygroundAlignment((prev) =>
                                    prev === value
                                        ? ''
                                        : (value as MultiSelectV2Alignment)
                                )
                            }
                            placeholder="Select alignment"
                        />
                        <MultiSelectV2
                            label="Side"
                            items={sideOptions}
                            selectedValues={
                                playgroundSide ? [playgroundSide] : []
                            }
                            onChange={(value) =>
                                setPlaygroundSide((prev) =>
                                    prev === value
                                        ? ''
                                        : (value as MultiSelectV2Side)
                                )
                            }
                            placeholder="Select side"
                        />
                        <MultiSelectV2
                            label="Selection Tag Type"
                            items={selectionTagOptions}
                            selectedValues={
                                playgroundSelectionTagType
                                    ? [playgroundSelectionTagType]
                                    : []
                            }
                            onChange={(value) =>
                                setPlaygroundSelectionTagType((prev) =>
                                    prev === value
                                        ? ''
                                        : (value as MultiSelectV2SelectionTagType)
                                )
                            }
                            placeholder="Count or Text"
                        />
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Required"
                            checked={playgroundRequired}
                            onChange={() =>
                                setPlaygroundRequired(!playgroundRequired)
                            }
                        />
                        <Switch
                            label="Disabled"
                            checked={playgroundDisabled}
                            onChange={() =>
                                setPlaygroundDisabled(!playgroundDisabled)
                            }
                        />
                        <Switch
                            label="Error"
                            checked={playgroundError}
                            onChange={() =>
                                setPlaygroundError(!playgroundError)
                            }
                        />
                        <Switch
                            label="Enable Search"
                            checked={playgroundEnableSearch}
                            onChange={() =>
                                setPlaygroundEnableSearch(
                                    !playgroundEnableSearch
                                )
                            }
                        />
                        <Switch
                            label="Enable Select All"
                            checked={playgroundEnableSelectAll}
                            onChange={() =>
                                setPlaygroundEnableSelectAll(
                                    !playgroundEnableSelectAll
                                )
                            }
                        />
                        <Switch
                            label="Show Slot"
                            checked={playgroundShowSlot}
                            onChange={() =>
                                setPlaygroundShowSlot(!playgroundShowSlot)
                            }
                        />
                        <Switch
                            label="Full Width"
                            checked={playgroundFullWidth}
                            onChange={() =>
                                setPlaygroundFullWidth(!playgroundFullWidth)
                            }
                        />
                        <Switch
                            label="Show Action Buttons"
                            checked={playgroundShowActionButtons}
                            onChange={() =>
                                setPlaygroundShowActionButtons(
                                    !playgroundShowActionButtons
                                )
                            }
                        />
                    </div>
                </div>

                <div className="min-h-36 rounded-xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50 p-8">
                    <div
                        className={`w-full ${playgroundFullWidth ? '' : 'max-w-md'}`}
                    >
                        <MultiSelectV2
                            label={playgroundLabel}
                            subLabel={playgroundSubLabel}
                            hintText={playgroundHintText}
                            placeholder={playgroundPlaceholder}
                            required={playgroundRequired}
                            error={playgroundError}
                            errorMessage={playgroundErrorMessage}
                            size={playgroundSize || MultiSelectV2Size.MEDIUM}
                            variant={
                                playgroundVariant ||
                                MultiSelectV2Variant.CONTAINER
                            }
                            alignment={
                                playgroundAlignment ||
                                MultiSelectV2Alignment.START
                            }
                            side={playgroundSide || MultiSelectV2Side.BOTTOM}
                            selectionTagType={
                                playgroundSelectionTagType ||
                                MultiSelectV2SelectionTagType.COUNT
                            }
                            items={groupedItems}
                            selectedValues={playgroundSelected}
                            onChange={handlePlaygroundChange}
                            disabled={playgroundDisabled}
                            enableSearch={playgroundEnableSearch}
                            enableSelectAll={playgroundEnableSelectAll}
                            selectAllText="Select All"
                            slot={
                                playgroundShowSlot ? (
                                    <User size={16} />
                                ) : undefined
                            }
                            fullWidth={playgroundFullWidth}
                            showActionButtons={playgroundShowActionButtons}
                            primaryAction={
                                playgroundShowActionButtons
                                    ? {
                                          text: 'Apply',
                                          onClick: (vals) =>
                                              console.log('Applied', vals),
                                      }
                                    : undefined
                            }
                            secondaryAction={
                                playgroundShowActionButtons
                                    ? {
                                          text: 'Cancel',
                                          onClick: () =>
                                              setPlaygroundSelected([]),
                                      }
                                    : undefined
                            }
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">With action buttons</h2>
                <p className="text-gray-600">
                    Apply/Cancel at bottom of dropdown. Selection tag as text.
                </p>
                <div className="max-w-md rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6">
                    <MultiSelectV2
                        label="Permissions"
                        placeholder="Select permissions..."
                        items={groupedItems}
                        selectedValues={actionButtonsSelected}
                        onChange={handleActionButtonsChange}
                        enableSearch
                        enableSelectAll
                        selectAllText="Select All"
                        selectionTagType={MultiSelectV2SelectionTagType.TEXT}
                        showActionButtons
                        primaryAction={{
                            text: 'Apply',
                            onClick: (vals) =>
                                console.log('Apply permissions', vals),
                        }}
                        secondaryAction={{
                            text: 'Cancel',
                            onClick: () => setActionButtonsSelected([]),
                        }}
                    />
                </div>
            </section>
        </div>
    )
}

export default MultiSelectDemoV2
