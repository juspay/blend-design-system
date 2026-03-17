import { useMemo, useState } from 'react'
import { SingleSelectV2 } from '../../../../packages/blend/lib/components/SingleSelectV2'
import {
    SingleSelectV2Size,
    SingleSelectV2Variant,
    SingleSelectV2Alignment,
    SingleSelectV2Side,
    type SingleSelectV2GroupType,
} from '../../../../packages/blend/lib/components/SingleSelectV2/singleSelectV2.types'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { User, Star, Shield, Briefcase, MapPin } from 'lucide-react'

const LARGE_LIST_SIZE = 500

function buildLargeList(): SingleSelectV2GroupType[] {
    return [
        {
            items: Array.from({ length: LARGE_LIST_SIZE }, (_, i) => ({
                label: `Option ${i + 1}`,
                value: `option-${i + 1}`,
            })),
        },
    ]
}

const SingleSelectDemoV2 = () => {
    const [playgroundLabel, setPlaygroundLabel] = useState('Select Option')
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundErrorMessage, setPlaygroundErrorMessage] = useState(
        'This is an error message'
    )
    const [playgroundSubLabel, setPlaygroundSubLabel] = useState(
        'Choose your preference'
    )
    const [playgroundHintText, setPlaygroundHintText] = useState(
        'This is a hint text'
    )
    const [playgroundPlaceholder, setPlaygroundPlaceholder] = useState(
        'Select an option...'
    )
    const [playgroundSize, setPlaygroundSize] = useState<SingleSelectV2Size>(
        SingleSelectV2Size.LG
    )
    const [playgroundVariant, setPlaygroundVariant] =
        useState<SingleSelectV2Variant>(SingleSelectV2Variant.CONTAINER)
    const [playgroundAlignment, setPlaygroundAlignment] =
        useState<SingleSelectV2Alignment>(SingleSelectV2Alignment.START)
    const [playgroundSide, setPlaygroundSide] = useState<SingleSelectV2Side>(
        SingleSelectV2Side.BOTTOM
    )
    const [playgroundSelected, setPlaygroundSelected] = useState('')
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundEnableSearch, setPlaygroundEnableSearch] = useState(false)
    const [playgroundShowSlot, setPlaygroundShowSlot] = useState(false)
    const [playgroundFullWidth, setPlaygroundFullWidth] = useState(false)
    const [playgroundAllowCustomValue, setPlaygroundAllowCustomValue] =
        useState(false)
    const [playgroundEnableVirtualization, setPlaygroundEnableVirtualization] =
        useState(false)

    const largeListItems = useMemo(() => buildLargeList(), [])
    const [largeListSelected, setLargeListSelected] = useState('')
    const [submenuSelected, setSubmenuSelected] = useState('')

    const submenuItems: SingleSelectV2GroupType[] = [
        {
            groupLabel: 'Locations',
            items: [
                {
                    label: 'United States',
                    value: 'us',
                    slot1: <MapPin size={16} />,
                    subMenu: [
                        { label: 'California', value: 'us-ca' },
                        { label: 'New York', value: 'us-ny' },
                        { label: 'Texas', value: 'us-tx' },
                        { label: 'Florida', value: 'us-fl' },
                    ],
                },
                {
                    label: 'Europe',
                    value: 'eu',
                    slot1: <MapPin size={16} />,
                    subMenu: [
                        { label: 'United Kingdom', value: 'eu-uk' },
                        { label: 'Germany', value: 'eu-de' },
                        { label: 'France', value: 'eu-fr' },
                        { label: 'Spain', value: 'eu-es' },
                    ],
                },
                {
                    label: 'Asia',
                    value: 'asia',
                    slot1: <MapPin size={16} />,
                    subMenu: [
                        { label: 'Japan', value: 'asia-jp' },
                        { label: 'South Korea', value: 'asia-kr' },
                        { label: 'Singapore', value: 'asia-sg' },
                        { label: 'India', value: 'asia-in' },
                    ],
                },
            ],
        },
    ]

    const groupedItems: SingleSelectV2GroupType[] = [
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

    const sizeOptions: SingleSelectV2GroupType[] = [
        {
            items: [
                { value: SingleSelectV2Size.SM, label: 'Small' },
                { value: SingleSelectV2Size.MD, label: 'Medium' },
                { value: SingleSelectV2Size.LG, label: 'Large' },
            ],
        },
    ]

    const variantOptions: SingleSelectV2GroupType[] = [
        {
            items: [
                {
                    value: SingleSelectV2Variant.CONTAINER,
                    label: 'Container',
                },
                {
                    value: SingleSelectV2Variant.NO_CONTAINER,
                    label: 'No Container',
                },
            ],
        },
    ]

    const alignmentOptions: SingleSelectV2GroupType[] = [
        {
            items: [
                { value: SingleSelectV2Alignment.START, label: 'Start' },
                { value: SingleSelectV2Alignment.CENTER, label: 'Center' },
                { value: SingleSelectV2Alignment.END, label: 'End' },
            ],
        },
    ]

    const sideOptions: SingleSelectV2GroupType[] = [
        {
            items: [
                { value: SingleSelectV2Side.TOP, label: 'Top' },
                { value: SingleSelectV2Side.BOTTOM, label: 'Bottom' },
                { value: SingleSelectV2Side.LEFT, label: 'Left' },
                { value: SingleSelectV2Side.RIGHT, label: 'Right' },
            ],
        },
    ]

    return (
        <div className="p-8 space-y-10">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold">SingleSelectV2 Component</h1>
                <p className="text-gray-600">
                    Interactive playground: groups, search, virtualization, and
                    accessibility aligned with SingleSelect v1 (data-element,
                    data-id, ARIA).
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
                        <SingleSelectV2
                            label="Size"
                            items={sizeOptions}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as SingleSelectV2Size)
                            }
                            placeholder="Select size"
                        />
                        <SingleSelectV2
                            label="Variant"
                            items={variantOptions}
                            selected={playgroundVariant}
                            onSelect={(value) =>
                                setPlaygroundVariant(
                                    value as SingleSelectV2Variant
                                )
                            }
                            placeholder="Select variant"
                        />
                        <SingleSelectV2
                            label="Alignment"
                            items={alignmentOptions}
                            selected={playgroundAlignment}
                            onSelect={(value) =>
                                setPlaygroundAlignment(
                                    value as SingleSelectV2Alignment
                                )
                            }
                            placeholder="Select alignment"
                        />
                        <SingleSelectV2
                            label="Side"
                            items={sideOptions}
                            selected={playgroundSide}
                            onSelect={(value) =>
                                setPlaygroundSide(value as SingleSelectV2Side)
                            }
                            placeholder="Select side"
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
                            label="Enable Virtualization"
                            checked={playgroundEnableVirtualization}
                            onChange={() =>
                                setPlaygroundEnableVirtualization(
                                    !playgroundEnableVirtualization
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
                            label="Allow Custom Value"
                            checked={playgroundAllowCustomValue}
                            onChange={() =>
                                setPlaygroundAllowCustomValue(
                                    !playgroundAllowCustomValue
                                )
                            }
                        />
                    </div>
                </div>

                <div className="min-h-36 rounded-xl w-full flex justify-center items-center border-2 border-dashed border-gray-200 bg-gray-50 p-8">
                    <div
                        className={`w-full ${playgroundFullWidth ? '' : 'max-w-md'}`}
                    >
                        <SingleSelectV2
                            label={playgroundLabel}
                            subLabel={playgroundSubLabel}
                            hintText={playgroundHintText}
                            placeholder={playgroundPlaceholder}
                            required={playgroundRequired}
                            error={{
                                show: playgroundError,
                                message: playgroundErrorMessage,
                            }}
                            size={playgroundSize}
                            variant={playgroundVariant}
                            menuPosition={{
                                alignment: playgroundAlignment,
                                side: playgroundSide,
                            }}
                            items={groupedItems}
                            selected={playgroundSelected}
                            onSelect={(value) => setPlaygroundSelected(value)}
                            disabled={playgroundDisabled}
                            search={{ show: playgroundEnableSearch }}
                            enableVirtualization={
                                playgroundEnableVirtualization
                            }
                            slot={
                                playgroundShowSlot ? (
                                    <User size={16} />
                                ) : undefined
                            }
                            triggerDimensions={
                                playgroundFullWidth
                                    ? { width: '100%' }
                                    : undefined
                            }
                            allowCustomValue={playgroundAllowCustomValue}
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Submenu</h2>
                <p className="text-gray-600">
                    Items with{' '}
                    <code className="rounded bg-gray-200 px-1">subMenu</code>{' '}
                    open a nested list on hover. Select a region then a
                    sub-option (e.g. United States → California).
                </p>
                <div className="max-w-md rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6">
                    <SingleSelectV2
                        label="Location"
                        placeholder="Select region and sub-option..."
                        items={submenuItems}
                        selected={submenuSelected}
                        onSelect={setSubmenuSelected}
                    />
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold">
                    Large list with virtualization ({LARGE_LIST_SIZE} items)
                </h2>
                <p className="text-gray-600">
                    Virtual list renders only visible rows. Toggle search and
                    scroll to verify behaviour.
                </p>
                <div className="max-w-md rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6">
                    <SingleSelectV2
                        label="Choose option"
                        placeholder={`Select from ${LARGE_LIST_SIZE} options...`}
                        items={largeListItems}
                        selected={largeListSelected}
                        onSelect={setLargeListSelected}
                        search={{ show: true }}
                        enableVirtualization
                        menuDimensions={{ maxHeight: 320 }}
                    />
                </div>
            </section>
        </div>
    )
}

export default SingleSelectDemoV2
