import { User, MapPin, Star, Shield, Briefcase } from 'lucide-react'
import { useState } from 'react'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import {
    type SelectMenuGroupType,
    SelectMenuSize,
    SelectMenuVariant,
    SelectMenuAlignment,
    SelectMenuSide,
} from '../../../../packages/blend/lib/components/Select'

const SingleSelectDemo = () => {
    // Playground state
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
    const [playgroundSize, setPlaygroundSize] = useState<SelectMenuSize>(
        SelectMenuSize.LARGE
    )
    const [playgroundVariant, setPlaygroundVariant] =
        useState<SelectMenuVariant>(SelectMenuVariant.CONTAINER)
    const [playgroundAlignment, setPlaygroundAlignment] =
        useState<SelectMenuAlignment>(SelectMenuAlignment.START)
    const [playgroundSide, setPlaygroundSide] = useState<SelectMenuSide>(
        SelectMenuSide.BOTTOM
    )
    const [playgroundSelected, setPlaygroundSelected] = useState('')
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundEnableSearch, setPlaygroundEnableSearch] = useState(false)
    const [playgroundShowSlot, setPlaygroundShowSlot] = useState(false)

    // Basic Examples state
    const [basicSimpleSelected, setBasicSimpleSelected] = useState('')
    const [basicSearchSelected, setBasicSearchSelected] = useState('')
    const [basicIconSelected, setBasicIconSelected] = useState('')
    const [basicRequiredSelected, setBasicRequiredSelected] = useState('')
    const [basicNoContainerSelected, setBasicNoContainerSelected] = useState('')

    // Size Examples state
    const [smallSizeSelected, setSmallSizeSelected] = useState('')
    const [mediumSizeSelected, setMediumSizeSelected] = useState('')
    const [largeSizeSelected, setLargeSizeSelected] = useState('')

    // Advanced Examples state
    const [groupedItemsSelected, setGroupedItemsSelected] = useState('')
    const [nestedMenuSelected, setNestedMenuSelected] = useState('')

    // Position & Alignment state
    const [topSideSelected, setTopSideSelected] = useState('')
    const [bottomSideSelected, setBottomSideSelected] = useState('')
    const [leftSideSelected, setLeftSideSelected] = useState('')
    const [rightSideSelected, setRightSideSelected] = useState('')
    const [startAlignSelected, setStartAlignSelected] = useState('')
    const [centerAlignSelected, setCenterAlignSelected] = useState('')
    const [endAlignSelected, setEndAlignSelected] = useState('')

    // Use Cases state
    const [formNameValue, setFormNameValue] = useState('')
    const [formCountrySelected, setFormCountrySelected] = useState('')
    const [formAccountSelected, setFormAccountSelected] = useState('')
    const [filterSortSelected, setFilterSortSelected] = useState('')
    const [filterTypeSelected, setFilterTypeSelected] = useState('')

    // Sample data
    const simpleItems: SelectMenuGroupType[] = [
        {
            items: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
                { label: 'Option 4', value: 'option4' },
                { label: 'Option 5', value: 'option5' },
            ],
        },
    ]

    const groupedItems: SelectMenuGroupType[] = [
        {
            groupLabel: 'Popular Options',
            showSeparator: true,
            items: [
                {
                    label: 'Most Popular',
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

    const nestedItems: SelectMenuGroupType[] = [
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

    // Option arrays for controls
    const sizeOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: 'Small', value: SelectMenuSize.SMALL },
                { label: 'Medium', value: SelectMenuSize.MEDIUM },
                { label: 'Large', value: SelectMenuSize.LARGE },
            ],
        },
    ]

    const variantOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: 'Container', value: SelectMenuVariant.CONTAINER },
                {
                    label: 'No Container',
                    value: SelectMenuVariant.NO_CONTAINER,
                },
            ],
        },
    ]

    const alignmentOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: 'Start', value: SelectMenuAlignment.START },
                { label: 'Center', value: SelectMenuAlignment.CENTER },
                { label: 'End', value: SelectMenuAlignment.END },
            ],
        },
    ]

    const sideOptions: SelectMenuGroupType[] = [
        {
            items: [
                { label: 'Top', value: SelectMenuSide.TOP },
                { label: 'Bottom', value: SelectMenuSide.BOTTOM },
                { label: 'Left', value: SelectMenuSide.LEFT },
                { label: 'Right', value: SelectMenuSide.RIGHT },
            ],
        },
    ]

    // Helper function to clear all selections
    const clearAllSelections = () => {
        setPlaygroundSelected('')
        setBasicSimpleSelected('')
        setBasicSearchSelected('')
        setBasicIconSelected('')
        setBasicRequiredSelected('')
        setBasicNoContainerSelected('')
        setSmallSizeSelected('')
        setMediumSizeSelected('')
        setLargeSizeSelected('')
        setGroupedItemsSelected('')
        setNestedMenuSelected('')
        setTopSideSelected('')
        setBottomSideSelected('')
        setLeftSideSelected('')
        setRightSideSelected('')
        setStartAlignSelected('')
        setCenterAlignSelected('')
        setEndAlignSelected('')
        setFormNameValue('')
        setFormCountrySelected('')
        setFormAccountSelected('')
        setFilterSortSelected('')
        setFilterTypeSelected('')
        addSnackbar({
            header: 'Selections Cleared',
            description: 'All selections have been reset',
        })
    }

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-12">
            {/* Header with Clear Button */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">SingleSelect Playground</h1>
                <button
                    onClick={clearAllSelections}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                    Clear All Selections
                </button>
            </div>

            {/* Playground */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Controls */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Controls</h2>

                        <div className="space-y-4">
                            <TextInput
                                label="Label"
                                value={playgroundLabel}
                                onChange={(e) =>
                                    setPlaygroundLabel(e.target.value)
                                }
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
                            />

                            <TextInput
                                label="Placeholder"
                                value={playgroundPlaceholder}
                                onChange={(e) =>
                                    setPlaygroundPlaceholder(e.target.value)
                                }
                                placeholder="Enter placeholder"
                            />

                            <SingleSelect
                                label="Size"
                                items={sizeOptions}
                                selected={playgroundSize}
                                onSelect={(value) =>
                                    setPlaygroundSize(value as SelectMenuSize)
                                }
                                placeholder="Select size"
                            />

                            <SingleSelect
                                label="Variant"
                                items={variantOptions}
                                selected={playgroundVariant}
                                onSelect={(value) =>
                                    setPlaygroundVariant(
                                        value as SelectMenuVariant
                                    )
                                }
                                placeholder="Select variant"
                            />

                            <SingleSelect
                                label="Alignment"
                                items={alignmentOptions}
                                selected={playgroundAlignment}
                                onSelect={(value) =>
                                    setPlaygroundAlignment(
                                        value as SelectMenuAlignment
                                    )
                                }
                                placeholder="Select alignment"
                            />

                            <SingleSelect
                                label="Side"
                                items={sideOptions}
                                selected={playgroundSide}
                                onSelect={(value) =>
                                    setPlaygroundSide(value as SelectMenuSide)
                                }
                                placeholder="Select side"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Preview</h2>

                        <div className="border rounded-lg p-6 bg-gray-50">
                            <SingleSelect
                                error={playgroundError}
                                errorMessage={playgroundErrorMessage}
                                onBlur={() => {
                                    console.log('blur')
                                }}
                                onFocus={() => {
                                    console.log('focus')
                                }}
                                // useDrawerOnMobile={false}
                                label={playgroundLabel}
                                subLabel={playgroundSubLabel}
                                hintText={playgroundHintText}
                                placeholder={playgroundPlaceholder}
                                size={playgroundSize}
                                variant={playgroundVariant}
                                alignment={playgroundAlignment}
                                side={playgroundSide}
                                items={groupedItems}
                                selected={playgroundSelected}
                                onSelect={(value) => {
                                    setPlaygroundSelected(value)
                                    addSnackbar({
                                        header: 'Playground Selection Changed',
                                        description: `Selected: ${value}`,
                                    })
                                }}
                                required={playgroundRequired}
                                disabled={playgroundDisabled}
                                enableSearch={playgroundEnableSearch}
                                slot={
                                    playgroundShowSlot ? (
                                        <User size={16} />
                                    ) : undefined
                                }
                            />
                            {playgroundSelected && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-700">
                                        <strong>Current Selection:</strong>{' '}
                                        {playgroundSelected}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Switch
                                label="Required"
                                checked={playgroundRequired}
                                onChange={setPlaygroundRequired}
                            />

                            <Switch
                                label="Error"
                                checked={playgroundError}
                                onChange={() =>
                                    setPlaygroundError(!playgroundError)
                                }
                            />

                            <Switch
                                label="Disabled"
                                checked={playgroundDisabled}
                                onChange={setPlaygroundDisabled}
                            />

                            <Switch
                                label="Enable Search"
                                checked={playgroundEnableSearch}
                                onChange={setPlaygroundEnableSearch}
                            />

                            <Switch
                                label="Show Icon Slot"
                                checked={playgroundShowSlot}
                                onChange={setPlaygroundShowSlot}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Basic Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Basic Examples</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Simple Select</h3>
                        <SingleSelect
                            label="Basic Option"
                            subLabel="aryan"
                            items={simpleItems}
                            selected={basicSimpleSelected}
                            onSelect={(value) => {
                                setBasicSimpleSelected(value)
                                addSnackbar({
                                    header: `Basic Selected: ${value}`,
                                })
                            }}
                            placeholder="Choose an option"
                        />
                        {basicSimpleSelected && (
                            <p className="text-xs text-gray-600">
                                Selected: {basicSimpleSelected}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">With Search</h3>
                        <SingleSelect
                            label="Searchable"
                            items={groupedItems}
                            selected={basicSearchSelected}
                            onSelect={(value) => {
                                setBasicSearchSelected(value)
                                addSnackbar({
                                    header: `Search Selected: ${value}`,
                                })
                            }}
                            placeholder="Search and select"
                            enableSearch
                        />
                        {basicSearchSelected && (
                            <p className="text-xs text-gray-600">
                                Selected: {basicSearchSelected}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">With Icon</h3>
                        <SingleSelect
                            label="User Selection"
                            items={simpleItems}
                            selected={basicIconSelected}
                            onSelect={(value) => {
                                setBasicIconSelected(value)
                                addSnackbar({
                                    header: `Icon Selected: ${value}`,
                                })
                            }}
                            placeholder="Select user"
                            slot={<User size={16} />}
                        />
                        {basicIconSelected && (
                            <p className="text-xs text-gray-600">
                                Selected: {basicIconSelected}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Disabled</h3>
                        <SingleSelect
                            label="Disabled Select"
                            items={simpleItems}
                            selected=""
                            onSelect={() => {}}
                            placeholder="Cannot select"
                            disabled
                        />
                        <p className="text-xs text-gray-500">
                            This select is disabled
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Required</h3>
                        <SingleSelect
                            label="Required Field"
                            items={simpleItems}
                            selected={basicRequiredSelected}
                            onSelect={(value) => {
                                setBasicRequiredSelected(value)
                                addSnackbar({
                                    header: `Required Selected: ${value}`,
                                })
                            }}
                            placeholder="Must select one"
                            required
                        />
                        {basicRequiredSelected && (
                            <p className="text-xs text-green-600">
                                ✓ Required field completed:{' '}
                                {basicRequiredSelected}
                            </p>
                        )}
                        {!basicRequiredSelected && (
                            <p className="text-xs text-red-600">
                                ⚠ This field is required
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">No Container</h3>
                        <SingleSelect
                            label="Minimal Style"
                            items={simpleItems}
                            selected={basicNoContainerSelected}
                            onSelect={(value) => {
                                setBasicNoContainerSelected(value)
                                addSnackbar({
                                    header: `Minimal Selected: ${value}`,
                                })
                            }}
                            placeholder="Minimal select"
                            variant={SelectMenuVariant.NO_CONTAINER}
                        />
                        {basicNoContainerSelected && (
                            <p className="text-xs text-gray-600">
                                Selected: {basicNoContainerSelected}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Small</h3>
                        <SingleSelect
                            label="Small Select"
                            size={SelectMenuSize.SMALL}
                            items={simpleItems}
                            selected={smallSizeSelected}
                            onSelect={(value) => {
                                setSmallSizeSelected(value)
                                addSnackbar({
                                    header: `Small size selected: ${value}`,
                                })
                            }}
                            placeholder="Small size"
                        />
                        {smallSizeSelected && (
                            <p className="text-xs text-gray-600">
                                Small selected: {smallSizeSelected}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Medium (Default)</h3>
                        <SingleSelect
                            label="Medium Select"
                            size={SelectMenuSize.MEDIUM}
                            items={simpleItems}
                            selected={mediumSizeSelected}
                            onSelect={(value) => {
                                setMediumSizeSelected(value)
                                addSnackbar({
                                    header: `Medium size selected: ${value}`,
                                })
                            }}
                            placeholder="Medium size"
                        />
                        {mediumSizeSelected && (
                            <p className="text-xs text-gray-600">
                                Medium selected: {mediumSizeSelected}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Large</h3>
                        <SingleSelect
                            label="Large Select"
                            size={SelectMenuSize.LARGE}
                            items={simpleItems}
                            selected={largeSizeSelected}
                            onSelect={(value) => {
                                setLargeSizeSelected(value)
                                addSnackbar({
                                    header: `Large size selected: ${value}`,
                                })
                            }}
                            placeholder="Large size"
                        />
                        {largeSizeSelected && (
                            <p className="text-xs text-gray-600">
                                Large selected: {largeSizeSelected}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Advanced Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Advanced Examples</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Grouped Items</h3>
                        <SingleSelect
                            label="Product Tiers"
                            subLabel="Choose your subscription level"
                            hintText="Enterprise includes all features"
                            items={groupedItems}
                            selected={groupedItemsSelected}
                            onSelect={(value) => {
                                setGroupedItemsSelected(value)
                                addSnackbar({
                                    header: 'Product Selected',
                                    description: `You selected: ${value}`,
                                })
                            }}
                            placeholder="Select a product tier"
                            enableSearch
                        />
                        {groupedItemsSelected && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>Product Tier:</strong>{' '}
                                    {groupedItemsSelected}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Nested Menu</h3>
                        <SingleSelect
                            label="Location"
                            subLabel="Select your region and country"
                            hintText="Choose the closest location"
                            items={nestedItems}
                            selected={nestedMenuSelected}
                            onSelect={(value) => {
                                setNestedMenuSelected(value)
                                addSnackbar({
                                    header: 'Location Selected',
                                    description: `Selected location: ${value}`,
                                })
                            }}
                            placeholder="Choose location"
                            slot={<MapPin size={16} />}
                            enableSearch
                        />
                        {nestedMenuSelected && (
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>Location:</strong>{' '}
                                    {nestedMenuSelected}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Position & Alignment */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Position & Alignment</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Top Side</h3>
                        <SingleSelect
                            label="Top"
                            items={simpleItems}
                            selected={topSideSelected}
                            onSelect={(value) => {
                                setTopSideSelected(value)
                                addSnackbar({ header: `Top: ${value}` })
                            }}
                            placeholder="Opens upward"
                            side={SelectMenuSide.TOP}
                        />
                        {topSideSelected && (
                            <p className="text-xs text-gray-600">
                                ↑ {topSideSelected}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Bottom Side</h3>
                        <SingleSelect
                            label="Bottom"
                            items={simpleItems}
                            selected={bottomSideSelected}
                            onSelect={(value) => {
                                setBottomSideSelected(value)
                                addSnackbar({ header: `Bottom: ${value}` })
                            }}
                            placeholder="Opens downward"
                            side={SelectMenuSide.BOTTOM}
                        />
                        {bottomSideSelected && (
                            <p className="text-xs text-gray-600">
                                ↓ {bottomSideSelected}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Left Side</h3>
                        <SingleSelect
                            label="Left"
                            items={simpleItems}
                            selected={leftSideSelected}
                            onSelect={(value) => {
                                setLeftSideSelected(value)
                                addSnackbar({ header: `Left: ${value}` })
                            }}
                            placeholder="Opens left"
                            side={SelectMenuSide.LEFT}
                        />
                        {leftSideSelected && (
                            <p className="text-xs text-gray-600">
                                ← {leftSideSelected}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Right Side</h3>
                        <SingleSelect
                            label="Right"
                            items={simpleItems}
                            selected={rightSideSelected}
                            onSelect={(value) => {
                                setRightSideSelected(value)
                                addSnackbar({ header: `Right: ${value}` })
                            }}
                            placeholder="Opens right"
                            side={SelectMenuSide.RIGHT}
                        />
                        {rightSideSelected && (
                            <p className="text-xs text-gray-600">
                                → {rightSideSelected}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">
                            Start Alignment
                        </h3>
                        <SingleSelect
                            label="Start Aligned"
                            items={simpleItems}
                            selected={startAlignSelected}
                            onSelect={(value) => {
                                setStartAlignSelected(value)
                                addSnackbar({ header: `Start: ${value}` })
                            }}
                            placeholder="Aligned to start"
                            alignment={SelectMenuAlignment.START}
                        />
                        {startAlignSelected && (
                            <p className="text-xs text-gray-600">
                                ⊢ {startAlignSelected}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">
                            Center Alignment
                        </h3>
                        <SingleSelect
                            label="Center Aligned"
                            items={simpleItems}
                            selected={centerAlignSelected}
                            onSelect={(value) => {
                                setCenterAlignSelected(value)
                                addSnackbar({ header: `Center: ${value}` })
                            }}
                            placeholder="Aligned to center"
                            alignment={SelectMenuAlignment.CENTER}
                        />
                        {centerAlignSelected && (
                            <p className="text-xs text-gray-600">
                                ⊣ {centerAlignSelected}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">End Alignment</h3>
                        <SingleSelect
                            label="End Aligned"
                            items={simpleItems}
                            selected={endAlignSelected}
                            onSelect={(value) => {
                                setEndAlignSelected(value)
                                addSnackbar({ header: `End: ${value}` })
                            }}
                            placeholder="Aligned to end"
                            alignment={SelectMenuAlignment.END}
                        />
                        {endAlignSelected && (
                            <p className="text-xs text-gray-600">
                                ⊣ {endAlignSelected}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Use Cases */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Common Use Cases</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Form Integration
                        </h3>
                        <div className="space-y-4 p-6 border rounded-lg">
                            <TextInput
                                label="Full Name"
                                placeholder="Enter your name"
                                value={formNameValue}
                                onChange={(e) =>
                                    setFormNameValue(e.target.value)
                                }
                            />

                            <SingleSelect
                                label="Country"
                                items={nestedItems}
                                selected={formCountrySelected}
                                onSelect={(value) => {
                                    setFormCountrySelected(value)
                                    addSnackbar({ header: `Country: ${value}` })
                                }}
                                placeholder="Select your country"
                                required
                                slot={<MapPin size={16} />}
                            />

                            <SingleSelect
                                label="Account Type"
                                items={groupedItems}
                                selected={formAccountSelected}
                                onSelect={(value) => {
                                    setFormAccountSelected(value)
                                    addSnackbar({ header: `Account: ${value}` })
                                }}
                                placeholder="Choose account type"
                                required
                            />

                            {/* Form Summary */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2">
                                    Form Summary:
                                </h4>
                                <div className="space-y-1 text-xs">
                                    <p>
                                        <strong>Name:</strong>{' '}
                                        {formNameValue || 'Not entered'}
                                    </p>
                                    <p>
                                        <strong>Country:</strong>{' '}
                                        {formCountrySelected || 'Not selected'}
                                    </p>
                                    <p>
                                        <strong>Account:</strong>{' '}
                                        {formAccountSelected || 'Not selected'}
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <p
                                        className={`text-xs ${formNameValue && formCountrySelected && formAccountSelected ? 'text-green-600' : 'text-red-600'}`}
                                    >
                                        Form Status:{' '}
                                        {formNameValue &&
                                        formCountrySelected &&
                                        formAccountSelected
                                            ? '✓ Complete'
                                            : '⚠ Incomplete'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Filtering & Sorting
                        </h3>
                        <div className="space-y-4 p-6 border rounded-lg">
                            <div className="flex gap-4">
                                <SingleSelect
                                    label="Sort By"
                                    variant={SelectMenuVariant.NO_CONTAINER}
                                    items={[
                                        {
                                            items: [
                                                {
                                                    label: 'Name',
                                                    value: 'name',
                                                },
                                                {
                                                    label: 'Date',
                                                    value: 'date',
                                                },
                                                {
                                                    label: 'Size',
                                                    value: 'size',
                                                },
                                                {
                                                    label: 'Type',
                                                    value: 'type',
                                                },
                                            ],
                                        },
                                    ]}
                                    selected={filterSortSelected}
                                    onSelect={(value) => {
                                        setFilterSortSelected(value)
                                        addSnackbar({
                                            header: `Sort: ${value}`,
                                        })
                                    }}
                                    placeholder="Sort by..."
                                />

                                <SingleSelect
                                    label="Filter"
                                    variant={SelectMenuVariant.NO_CONTAINER}
                                    items={[
                                        {
                                            items: [
                                                {
                                                    label: 'All Items',
                                                    value: 'all',
                                                },
                                                {
                                                    label: 'Active',
                                                    value: 'active',
                                                },
                                                {
                                                    label: 'Inactive',
                                                    value: 'inactive',
                                                },
                                                {
                                                    label: 'Pending',
                                                    value: 'pending',
                                                },
                                            ],
                                        },
                                    ]}
                                    selected={filterTypeSelected}
                                    onSelect={(value) => {
                                        setFilterTypeSelected(value)
                                        addSnackbar({
                                            header: `Filter: ${value}`,
                                        })
                                    }}
                                    placeholder="Filter by..."
                                />
                            </div>

                            {/* Filter Summary */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2">
                                    Filter Settings:
                                </h4>
                                <div className="space-y-1 text-xs">
                                    <p>
                                        <strong>Sort By:</strong>{' '}
                                        {filterSortSelected || 'Default'}
                                    </p>
                                    <p>
                                        <strong>Filter:</strong>{' '}
                                        {filterTypeSelected || 'All Items'}
                                    </p>
                                </div>
                                {(filterSortSelected || filterTypeSelected) && (
                                    <button
                                        onClick={() => {
                                            setFilterSortSelected('')
                                            setFilterTypeSelected('')
                                            addSnackbar({
                                                header: 'Filters cleared',
                                            })
                                        }}
                                        className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleSelectDemo
