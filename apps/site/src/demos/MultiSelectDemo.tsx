import {
    User,
    Star,
    Shield,
    Code,
    Server,
    Database,
    Settings,
    Crown,
    Users,
    Target,
    Lightbulb,
    Circle,
} from 'lucide-react'
import { useState } from 'react'
import { MultiSelect } from '../../../../packages/blend/lib/components/MultiSelect'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import {
    type MultiSelectMenuGroupType,
    MultiSelectMenuSize,
    MultiSelectVariant,
    MultiSelectMenuAlignment,
    MultiSelectMenuSide,
    MultiSelectSelectionTagType,
} from '../../../../packages/blend/lib/components/MultiSelect'

const MultiSelectDemo = () => {
    // Playground state
    const [playgroundLabel, setPlaygroundLabel] = useState('Your label')
    const [playgroundSubLabel, setPlaygroundSubLabel] = useState(
        'Choose your preferences'
    )
    const [playgroundHintText, setPlaygroundHintText] = useState(
        'This is a hint text'
    )
    const [playgroundPlaceholder, setPlaygroundPlaceholder] =
        useState('Placeholder')
    const [playgroundSize, setPlaygroundSize] = useState<MultiSelectMenuSize>(
        MultiSelectMenuSize.MEDIUM
    )
    const [playgroundVariant, setPlaygroundVariant] =
        useState<MultiSelectVariant>(MultiSelectVariant.CONTAINER)
    const [playgroundAlignment, setPlaygroundAlignment] =
        useState<MultiSelectMenuAlignment>(MultiSelectMenuAlignment.START)
    const [playgroundSide, setPlaygroundSide] = useState<MultiSelectMenuSide>(
        MultiSelectMenuSide.BOTTOM
    )
    const [playgroundSelectionTagType, setPlaygroundSelectionTagType] =
        useState<MultiSelectSelectionTagType>(MultiSelectSelectionTagType.COUNT)
    const [playgroundSelected, setPlaygroundSelected] = useState<string[]>([])
    const [playgroundRequired, setPlaygroundRequired] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundShowSlot, setPlaygroundShowSlot] = useState(false)

    // Basic Examples state
    const [basicSimpleSelected, setBasicSimpleSelected] = useState<string[]>([])
    const [basicCountSelected, setBasicCountSelected] = useState<string[]>([])
    const [basicTextSelected, setBasicTextSelected] = useState<string[]>([])
    const [basicIconSelected, setBasicIconSelected] = useState<string[]>([])
    const [basicRequiredSelected, setBasicRequiredSelected] = useState<
        string[]
    >([])
    const [basicNoContainerSelected, setBasicNoContainerSelected] = useState<
        string[]
    >([])

    // Size Examples state
    const [smallSizeSelected, setSmallSizeSelected] = useState<string[]>([])
    const [mediumSizeSelected, setMediumSizeSelected] = useState<string[]>([])
    const [largeSizeSelected, setLargeSizeSelected] = useState<string[]>([])

    // Advanced Examples state
    const [skillsSelected, setSkillsSelected] = useState<string[]>([])
    const [permissionsSelected, setPermissionsSelected] = useState<string[]>([])
    const [preSelectedValues, setPreSelectedValues] = useState<string[]>([
        'react',
        'nodejs',
        'postgresql',
    ])

    // Position & Alignment state
    const [topSideSelected, setTopSideSelected] = useState<string[]>([])
    const [bottomSideSelected, setBottomSideSelected] = useState<string[]>([])
    const [leftSideSelected, setLeftSideSelected] = useState<string[]>([])
    const [rightSideSelected, setRightSideSelected] = useState<string[]>([])
    const [startAlignSelected, setStartAlignSelected] = useState<string[]>([])
    const [centerAlignSelected, setCenterAlignSelected] = useState<string[]>([])
    const [endAlignSelected, setEndAlignSelected] = useState<string[]>([])

    // Use Cases state
    const [formNameValue, setFormNameValue] = useState('')
    const [formSkillsSelected, setFormSkillsSelected] = useState<string[]>([])
    const [formInterestsSelected, setFormInterestsSelected] = useState<
        string[]
    >([])
    const [formPermissionsSelected, setFormPermissionsSelected] = useState<
        string[]
    >([])
    const [filterStatusSelected, setFilterStatusSelected] = useState<string[]>(
        []
    )
    const [filterColumnsSelected, setFilterColumnsSelected] = useState<
        string[]
    >(['name', 'email', 'role'])

    // Sample data
    const simpleItems: MultiSelectMenuGroupType[] = [
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

    const skillItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'Frontend',
            showSeparator: true,
            items: [
                { label: 'React', value: 'react', slot1: <Code size={16} /> },
                { label: 'Vue.js', value: 'vue', slot1: <Code size={16} /> },
                {
                    label: 'Angular',
                    value: 'angular',
                    slot1: <Code size={16} />,
                },
                { label: 'Svelte', value: 'svelte', slot1: <Code size={16} /> },
                {
                    label: 'Next.js',
                    value: 'nextjs',
                    slot1: <Code size={16} />,
                },
            ],
        },
        {
            groupLabel: 'Backend',
            showSeparator: true,
            items: [
                {
                    label: 'Node.js',
                    value: 'nodejs',
                    slot1: <Server size={16} />,
                },
                {
                    label: 'Python',
                    value: 'python',
                    slot1: <Server size={16} />,
                },
                { label: 'Java', value: 'java', slot1: <Server size={16} /> },
                { label: 'C#', value: 'csharp', slot1: <Server size={16} /> },
                { label: 'Go', value: 'go', slot1: <Server size={16} /> },
            ],
        },
        {
            groupLabel: 'Database',
            items: [
                {
                    label: 'PostgreSQL',
                    value: 'postgresql',
                    slot1: <Database size={16} />,
                },
                {
                    label: 'MySQL',
                    value: 'mysql',
                    slot1: <Database size={16} />,
                },
                {
                    label: 'MongoDB',
                    value: 'mongodb',
                    slot1: <Database size={16} />,
                },
                {
                    label: 'Redis',
                    value: 'redis',
                    slot1: <Database size={16} />,
                },
            ],
        },
    ]

    const permissionItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'User Management',
            showSeparator: true,
            items: [
                {
                    label: 'View Users',
                    value: 'users.view',
                    subLabel: 'Read-only access',
                    slot1: <Users size={16} />,
                },
                {
                    label: 'Edit Users',
                    value: 'users.edit',
                    subLabel: 'Modify user data',
                    slot1: <Users size={16} />,
                },
                {
                    label: 'Delete Users',
                    value: 'users.delete',
                    subLabel: 'Remove users',
                    slot1: <Users size={16} />,
                },
            ],
        },
        {
            groupLabel: 'Content Management',
            showSeparator: true,
            items: [
                {
                    label: 'Create Content',
                    value: 'content.create',
                    subLabel: 'Add new content',
                    slot1: <Star size={16} />,
                },
                {
                    label: 'Edit Content',
                    value: 'content.edit',
                    subLabel: 'Modify existing',
                    slot1: <Star size={16} />,
                },
                {
                    label: 'Publish Content',
                    value: 'content.publish',
                    subLabel: 'Make content live',
                    slot1: <Star size={16} />,
                },
            ],
        },
        {
            groupLabel: 'System Settings',
            items: [
                {
                    label: 'View Settings',
                    value: 'settings.view',
                    subLabel: 'Read-only access',
                    slot1: <Settings size={16} />,
                },
                {
                    label: 'Edit Settings',
                    value: 'settings.edit',
                    subLabel: 'Modify settings',
                    slot1: <Settings size={16} />,
                },
                {
                    label: 'Advanced Settings',
                    value: 'settings.advanced',
                    subLabel: 'System config',
                    slot1: <Shield size={16} />,
                },
            ],
        },
    ]

    const interestItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'Professional',
            items: [
                {
                    label: 'Leadership',
                    value: 'leadership',
                    slot1: <Crown size={16} />,
                },
                {
                    label: 'Management',
                    value: 'management',
                    slot1: <Users size={16} />,
                },
                {
                    label: 'Strategy',
                    value: 'strategy',
                    slot1: <Target size={16} />,
                },
                {
                    label: 'Innovation',
                    value: 'innovation',
                    slot1: <Lightbulb size={16} />,
                },
            ],
        },
        {
            groupLabel: 'Technical',
            items: [
                {
                    label: 'Development',
                    value: 'development',
                    slot1: <Code size={16} />,
                },
                {
                    label: 'DevOps',
                    value: 'devops',
                    slot1: <Server size={16} />,
                },
                {
                    label: 'Data Science',
                    value: 'datascience',
                    slot1: <Database size={16} />,
                },
                {
                    label: 'Security',
                    value: 'security',
                    slot1: <Shield size={16} />,
                },
            ],
        },
    ]

    const statusItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'User Status',
            items: [
                {
                    label: 'Active',
                    value: 'active',
                    slot1: <Circle size={16} color="#10b981" fill="#10b981" />,
                },
                {
                    label: 'Inactive',
                    value: 'inactive',
                    slot1: <Circle size={16} color="#ef4444" fill="#ef4444" />,
                },
                {
                    label: 'Pending',
                    value: 'pending',
                    slot1: <Circle size={16} color="#f59e0b" fill="#f59e0b" />,
                },
                {
                    label: 'Suspended',
                    value: 'suspended',
                    slot1: <Circle size={16} color="#6b7280" fill="#6b7280" />,
                },
            ],
        },
    ]

    const columnItems: MultiSelectMenuGroupType[] = [
        {
            groupLabel: 'Basic Info',
            items: [
                { label: 'Name', value: 'name' },
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'phone' },
                { label: 'Role', value: 'role' },
            ],
        },
        {
            groupLabel: 'Metadata',
            items: [
                { label: 'Created Date', value: 'created' },
                { label: 'Last Login', value: 'lastLogin' },
                { label: 'Status', value: 'status' },
                { label: 'Department', value: 'department' },
            ],
        },
    ]

    // Option arrays for controls
    const sizeOptions: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Small', value: MultiSelectMenuSize.SMALL },
                { label: 'Medium', value: MultiSelectMenuSize.MEDIUM },
                { label: 'Large', value: MultiSelectMenuSize.LARGE },
            ],
        },
    ]

    const variantOptions: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Container', value: MultiSelectVariant.CONTAINER },
                {
                    label: 'No Container',
                    value: MultiSelectVariant.NO_CONTAINER,
                },
            ],
        },
    ]

    const alignmentOptions: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Start', value: MultiSelectMenuAlignment.START },
                { label: 'Center', value: MultiSelectMenuAlignment.CENTER },
                { label: 'End', value: MultiSelectMenuAlignment.END },
            ],
        },
    ]

    const sideOptions: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Top', value: MultiSelectMenuSide.TOP },
                { label: 'Bottom', value: MultiSelectMenuSide.BOTTOM },
                { label: 'Left', value: MultiSelectMenuSide.LEFT },
                { label: 'Right', value: MultiSelectMenuSide.RIGHT },
            ],
        },
    ]

    const selectionTagTypeOptions: MultiSelectMenuGroupType[] = [
        {
            items: [
                { label: 'Count', value: MultiSelectSelectionTagType.COUNT },
                { label: 'Text', value: MultiSelectSelectionTagType.TEXT },
            ],
        },
    ]

    // Helper function to handle multi-select changes
    const handleMultiSelectChange =
        (
            _: string[],
            setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
        ) =>
        (value: string) => {
            if (value === '') {
                setSelectedValues([])
            } else {
                setSelectedValues((prev) =>
                    prev.includes(value)
                        ? prev.filter((v) => v !== value)
                        : [...prev, value]
                )
            }
        }

    // Helper function to clear all selections
    const clearAllSelections = () => {
        setPlaygroundSelected([])
        setBasicSimpleSelected([])
        setBasicCountSelected([])
        setBasicTextSelected([])
        setBasicIconSelected([])
        setBasicRequiredSelected([])
        setBasicNoContainerSelected([])
        setSmallSizeSelected([])
        setMediumSizeSelected([])
        setLargeSizeSelected([])
        setSkillsSelected([])
        setPermissionsSelected([])
        setPreSelectedValues([])
        setTopSideSelected([])
        setBottomSideSelected([])
        setLeftSideSelected([])
        setRightSideSelected([])
        setStartAlignSelected([])
        setCenterAlignSelected([])
        setEndAlignSelected([])
        setFormNameValue('')
        setFormSkillsSelected([])
        setFormInterestsSelected([])
        setFormPermissionsSelected([])
        setFilterStatusSelected([])
        setFilterColumnsSelected([])
        addSnackbar({
            header: 'All Selections Cleared',
            description: 'All multi-select values have been reset',
        })
    }

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-12">
            {/* Header with Clear Button */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">MultiSelect Playground</h1>
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
                                label="Placeholder"
                                value={playgroundPlaceholder}
                                onChange={(e) =>
                                    setPlaygroundPlaceholder(e.target.value)
                                }
                                placeholder="Enter placeholder"
                            />

                            <MultiSelect
                                label="Size"
                                items={sizeOptions}
                                selectedValues={
                                    playgroundSize ? [playgroundSize] : []
                                }
                                onChange={(value) =>
                                    setPlaygroundSize(
                                        value as MultiSelectMenuSize
                                    )
                                }
                                placeholder="Select size"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />

                            <MultiSelect
                                label="Variant"
                                items={variantOptions}
                                selectedValues={
                                    playgroundVariant ? [playgroundVariant] : []
                                }
                                onChange={(value) =>
                                    setPlaygroundVariant(
                                        value as MultiSelectVariant
                                    )
                                }
                                placeholder="Select variant"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />

                            <MultiSelect
                                label="Alignment"
                                items={alignmentOptions}
                                selectedValues={
                                    playgroundAlignment
                                        ? [playgroundAlignment]
                                        : []
                                }
                                onChange={(value) =>
                                    setPlaygroundAlignment(
                                        value as MultiSelectMenuAlignment
                                    )
                                }
                                placeholder="Select alignment"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />

                            <MultiSelect
                                label="Side"
                                items={sideOptions}
                                selectedValues={
                                    playgroundSide ? [playgroundSide] : []
                                }
                                onChange={(value) =>
                                    setPlaygroundSide(
                                        value as MultiSelectMenuSide
                                    )
                                }
                                placeholder="Select side"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />

                            <MultiSelect
                                label="Selection Tag Type"
                                items={selectionTagTypeOptions}
                                selectedValues={
                                    playgroundSelectionTagType
                                        ? [playgroundSelectionTagType]
                                        : []
                                }
                                onChange={(value) =>
                                    setPlaygroundSelectionTagType(
                                        value as MultiSelectSelectionTagType
                                    )
                                }
                                placeholder="Select tag type"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Preview</h2>

                        <div
                            className="border rounded-lg p-6 bg-gray-50"
                            style={{ width: '400px' }}
                        >
                            <MultiSelect
                                enableSelectAll={true}
                                enableSearch={true}
                                label={playgroundLabel}
                                sublabel={playgroundSubLabel}
                                hintText={playgroundHintText}
                                placeholder={playgroundPlaceholder}
                                size={playgroundSize}
                                variant={playgroundVariant}
                                alignment={playgroundAlignment}
                                side={playgroundSide}
                                selectionTagType={playgroundSelectionTagType}
                                items={skillItems}
                                selectedValues={playgroundSelected}
                                onChange={handleMultiSelectChange(
                                    playgroundSelected,
                                    setPlaygroundSelected
                                )}
                                required={playgroundRequired}
                                disabled={playgroundDisabled}
                                slot={
                                    playgroundShowSlot ? (
                                        <User size={16} />
                                    ) : undefined
                                }
                                minWidth={300}
                            />
                            {playgroundSelected.length > 0 && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-700">
                                        <strong>
                                            Selected (
                                            {playgroundSelected.length}):
                                        </strong>{' '}
                                        {playgroundSelected.join(', ')}
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
                                label="Disabled"
                                checked={playgroundDisabled}
                                onChange={setPlaygroundDisabled}
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
                        <h3 className="font-semibold">Simple Multi-Select</h3>
                        <MultiSelect
                            enableSearch={true}
                            enableSelectAll={true}
                            label="Basic Options"
                            items={simpleItems}
                            selectedValues={basicSimpleSelected}
                            onChange={handleMultiSelectChange(
                                basicSimpleSelected,
                                setBasicSimpleSelected
                            )}
                            placeholder="Choose multiple options"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {basicSimpleSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Selected ({basicSimpleSelected.length}):{' '}
                                {basicSimpleSelected.join(', ')}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Count Display</h3>
                        <MultiSelect
                            label="Show Count"
                            items={skillItems}
                            selectedValues={basicCountSelected}
                            onChange={handleMultiSelectChange(
                                basicCountSelected,
                                setBasicCountSelected
                            )}
                            placeholder="Select skills"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {basicCountSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Count: {basicCountSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Text Display</h3>
                        <MultiSelect
                            label="Show Text"
                            items={simpleItems}
                            selectedValues={basicTextSelected}
                            onChange={handleMultiSelectChange(
                                basicTextSelected,
                                setBasicTextSelected
                            )}
                            placeholder="Select options"
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                        />
                        {basicTextSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Text display: {basicTextSelected.join(', ')}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">With Icons</h3>
                        <MultiSelect
                            label="Tech Stack"
                            items={skillItems}
                            selectedValues={basicIconSelected}
                            onChange={handleMultiSelectChange(
                                basicIconSelected,
                                setBasicIconSelected
                            )}
                            placeholder="Select technologies"
                            slot={<Code size={16} />}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {basicIconSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Tech: {basicIconSelected.join(', ')}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Required</h3>
                        <MultiSelect
                            label="Required Skills"
                            items={skillItems}
                            selectedValues={basicRequiredSelected}
                            onChange={handleMultiSelectChange(
                                basicRequiredSelected,
                                setBasicRequiredSelected
                            )}
                            placeholder="Must select at least one"
                            required
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {basicRequiredSelected.length > 0 && (
                            <p className="text-xs text-green-600">
                                ✓ Requirement met:{' '}
                                {basicRequiredSelected.length} selected
                            </p>
                        )}
                        {basicRequiredSelected.length === 0 && (
                            <p className="text-xs text-red-600">
                                ⚠ At least one selection required
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">No Container</h3>
                        <MultiSelect
                            label="Minimal Style"
                            items={simpleItems}
                            selectedValues={basicNoContainerSelected}
                            onChange={handleMultiSelectChange(
                                basicNoContainerSelected,
                                setBasicNoContainerSelected
                            )}
                            placeholder="Minimal select"
                            variant={MultiSelectVariant.NO_CONTAINER}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {basicNoContainerSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Minimal: {basicNoContainerSelected.length}{' '}
                                selected
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
                        <MultiSelect
                            label="Small Multi-Select"
                            size={MultiSelectMenuSize.SMALL}
                            items={simpleItems}
                            selectedValues={smallSizeSelected}
                            onChange={handleMultiSelectChange(
                                smallSizeSelected,
                                setSmallSizeSelected
                            )}
                            placeholder="Small size"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {smallSizeSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Small: {smallSizeSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Medium (Default)</h3>
                        <MultiSelect
                            label="Medium Multi-Select"
                            size={MultiSelectMenuSize.MEDIUM}
                            items={simpleItems}
                            selectedValues={mediumSizeSelected}
                            onChange={handleMultiSelectChange(
                                mediumSizeSelected,
                                setMediumSizeSelected
                            )}
                            placeholder="Medium size"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {mediumSizeSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Medium: {mediumSizeSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Large</h3>
                        <MultiSelect
                            label="Large Multi-Select"
                            size={MultiSelectMenuSize.LARGE}
                            items={simpleItems}
                            selectedValues={largeSizeSelected}
                            onChange={handleMultiSelectChange(
                                largeSizeSelected,
                                setLargeSizeSelected
                            )}
                            placeholder="Large size"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {largeSizeSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                Large: {largeSizeSelected.length} selected
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
                        <h3 className="font-semibold">Technical Skills</h3>
                        <MultiSelect
                            label="Skills & Technologies"
                            sublabel="Select your expertise areas"
                            hintText="Choose multiple technologies you're proficient in"
                            items={skillItems}
                            selectedValues={skillsSelected}
                            onChange={handleMultiSelectChange(
                                skillsSelected,
                                setSkillsSelected
                            )}
                            placeholder="Select your skills"
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                            helpIconHintText="This helps us match you with relevant projects"
                        />
                        {skillsSelected.length > 0 && (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-700">
                                    <strong>
                                        Skills ({skillsSelected.length}):
                                    </strong>{' '}
                                    {skillsSelected.join(', ')}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">User Permissions</h3>
                        <MultiSelect
                            label="Access Control"
                            sublabel="Grant appropriate permissions"
                            hintText="Select permissions based on user role"
                            items={permissionItems}
                            selectedValues={permissionsSelected}
                            onChange={handleMultiSelectChange(
                                permissionsSelected,
                                setPermissionsSelected
                            )}
                            placeholder="Select permissions"
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                            slot={<Shield size={16} />}
                        />
                        {permissionsSelected.length > 0 && (
                            <div className="p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm text-yellow-700">
                                    <strong>Permissions:</strong>{' '}
                                    {permissionsSelected.length} granted
                                </p>
                                <p className="text-xs text-yellow-600 mt-1">
                                    {permissionsSelected.join(', ')}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Pre-selected Values</h3>
                        <MultiSelect
                            label="Current Tech Stack"
                            sublabel="Modify your current setup"
                            items={skillItems}
                            selectedValues={preSelectedValues}
                            onChange={handleMultiSelectChange(
                                preSelectedValues,
                                setPreSelectedValues
                            )}
                            placeholder="Update tech stack"
                            selectionTagType={MultiSelectSelectionTagType.TEXT}
                        />
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-700">
                                <strong>Current Stack:</strong>{' '}
                                {preSelectedValues.join(', ') ||
                                    'None selected'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Position & Alignment */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Position & Alignment</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Top Side</h3>
                        <MultiSelect
                            label="Top"
                            items={simpleItems}
                            selectedValues={topSideSelected}
                            onChange={handleMultiSelectChange(
                                topSideSelected,
                                setTopSideSelected
                            )}
                            placeholder="Opens upward"
                            side={MultiSelectMenuSide.TOP}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {topSideSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ↑ {topSideSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Bottom Side</h3>
                        <MultiSelect
                            label="Bottom"
                            items={simpleItems}
                            selectedValues={bottomSideSelected}
                            onChange={handleMultiSelectChange(
                                bottomSideSelected,
                                setBottomSideSelected
                            )}
                            placeholder="Opens downward"
                            side={MultiSelectMenuSide.BOTTOM}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {bottomSideSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ↓ {bottomSideSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Left Side</h3>
                        <MultiSelect
                            label="Left"
                            items={simpleItems}
                            selectedValues={leftSideSelected}
                            onChange={handleMultiSelectChange(
                                leftSideSelected,
                                setLeftSideSelected
                            )}
                            placeholder="Opens left"
                            side={MultiSelectMenuSide.LEFT}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {leftSideSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ← {leftSideSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Right Side</h3>
                        <MultiSelect
                            label="Right"
                            items={simpleItems}
                            selectedValues={rightSideSelected}
                            onChange={handleMultiSelectChange(
                                rightSideSelected,
                                setRightSideSelected
                            )}
                            placeholder="Opens right"
                            side={MultiSelectMenuSide.RIGHT}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {rightSideSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                → {rightSideSelected.length} selected
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">
                            Start Alignment
                        </h3>
                        <MultiSelect
                            label="Start Aligned"
                            items={simpleItems}
                            selectedValues={startAlignSelected}
                            onChange={handleMultiSelectChange(
                                startAlignSelected,
                                setStartAlignSelected
                            )}
                            placeholder="Aligned to start"
                            alignment={MultiSelectMenuAlignment.START}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {startAlignSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ⊢ {startAlignSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">
                            Center Alignment
                        </h3>
                        <MultiSelect
                            label="Center Aligned"
                            items={simpleItems}
                            selectedValues={centerAlignSelected}
                            onChange={handleMultiSelectChange(
                                centerAlignSelected,
                                setCenterAlignSelected
                            )}
                            placeholder="Aligned to center"
                            alignment={MultiSelectMenuAlignment.CENTER}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {centerAlignSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ⊣ {centerAlignSelected.length} selected
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">End Alignment</h3>
                        <MultiSelect
                            label="End Aligned"
                            items={simpleItems}
                            selectedValues={endAlignSelected}
                            onChange={handleMultiSelectChange(
                                endAlignSelected,
                                setEndAlignSelected
                            )}
                            placeholder="Aligned to end"
                            alignment={MultiSelectMenuAlignment.END}
                            selectionTagType={MultiSelectSelectionTagType.COUNT}
                        />
                        {endAlignSelected.length > 0 && (
                            <p className="text-xs text-gray-600">
                                ⊣ {endAlignSelected.length} selected
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

                            <MultiSelect
                                label="Technical Skills"
                                sublabel="Required"
                                items={skillItems}
                                selectedValues={formSkillsSelected}
                                onChange={handleMultiSelectChange(
                                    formSkillsSelected,
                                    setFormSkillsSelected
                                )}
                                placeholder="Select your skills"
                                required
                                hintText="Select at least 3 skills"
                                selectionTagType={
                                    MultiSelectSelectionTagType.COUNT
                                }
                            />

                            <MultiSelect
                                label="Areas of Interest"
                                items={interestItems}
                                selectedValues={formInterestsSelected}
                                onChange={handleMultiSelectChange(
                                    formInterestsSelected,
                                    setFormInterestsSelected
                                )}
                                placeholder="Select your interests"
                                helpIconHintText="This helps us recommend relevant content"
                                selectionTagType={
                                    MultiSelectSelectionTagType.TEXT
                                }
                            />

                            <MultiSelect
                                label="User Permissions"
                                items={permissionItems}
                                selectedValues={formPermissionsSelected}
                                onChange={handleMultiSelectChange(
                                    formPermissionsSelected,
                                    setFormPermissionsSelected
                                )}
                                placeholder="Assign permissions"
                                hintText="Grant appropriate access levels"
                                selectionTagType={
                                    MultiSelectSelectionTagType.COUNT
                                }
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
                                        <strong>Skills:</strong>{' '}
                                        {formSkillsSelected.length} selected
                                    </p>
                                    <p>
                                        <strong>Interests:</strong>{' '}
                                        {formInterestsSelected.length} selected
                                    </p>
                                    <p>
                                        <strong>Permissions:</strong>{' '}
                                        {formPermissionsSelected.length} granted
                                    </p>
                                </div>
                                <div className="mt-2">
                                    <p
                                        className={`text-xs ${
                                            formNameValue &&
                                            formSkillsSelected.length >= 3 &&
                                            formInterestsSelected.length > 0
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        Form Status:{' '}
                                        {formNameValue &&
                                        formSkillsSelected.length >= 3 &&
                                        formInterestsSelected.length > 0
                                            ? '✓ Complete'
                                            : '⚠ Incomplete'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Data Filtering & Management
                        </h3>
                        <div className="space-y-4 p-6 border rounded-lg">
                            <div className="space-y-4">
                                <MultiSelect
                                    label="Filter by Status"
                                    variant={MultiSelectVariant.NO_CONTAINER}
                                    items={statusItems}
                                    selectedValues={filterStatusSelected}
                                    onChange={handleMultiSelectChange(
                                        filterStatusSelected,
                                        setFilterStatusSelected
                                    )}
                                    placeholder="All statuses"
                                    selectionTagType={
                                        MultiSelectSelectionTagType.COUNT
                                    }
                                    size={MultiSelectMenuSize.SMALL}
                                />

                                <MultiSelect
                                    label="Visible Columns"
                                    variant={MultiSelectVariant.NO_CONTAINER}
                                    items={columnItems}
                                    selectedValues={filterColumnsSelected}
                                    onChange={handleMultiSelectChange(
                                        filterColumnsSelected,
                                        setFilterColumnsSelected
                                    )}
                                    placeholder="Select columns"
                                    selectionTagType={
                                        MultiSelectSelectionTagType.COUNT
                                    }
                                    size={MultiSelectMenuSize.SMALL}
                                />
                            </div>

                            {/* Filter Summary */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-sm mb-2">
                                    Active Filters:
                                </h4>
                                <div className="space-y-1 text-xs">
                                    <p>
                                        <strong>Status Filters:</strong>{' '}
                                        {filterStatusSelected.length > 0
                                            ? filterStatusSelected.join(', ')
                                            : 'All'}
                                    </p>
                                    <p>
                                        <strong>Visible Columns:</strong>{' '}
                                        {filterColumnsSelected.length > 0
                                            ? filterColumnsSelected.join(', ')
                                            : 'None'}
                                    </p>
                                </div>
                                {(filterStatusSelected.length > 0 ||
                                    filterColumnsSelected.length > 0) && (
                                    <button
                                        onClick={() => {
                                            setFilterStatusSelected([])
                                            setFilterColumnsSelected([])
                                            addSnackbar({
                                                header: 'Filters cleared',
                                            })
                                        }}
                                        className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                                    >
                                        Clear All Filters
                                    </button>
                                )}
                            </div>

                            {/* Mock Data Table */}
                            <div className="mt-4 p-3 bg-white rounded border">
                                <h4 className="font-semibold text-sm mb-2">
                                    User Data Table
                                </h4>
                                <div className="text-xs text-gray-600">
                                    <p>Showing filtered results:</p>
                                    <p>
                                        • Status:{' '}
                                        {filterStatusSelected.length > 0
                                            ? `${filterStatusSelected.length} filters`
                                            : 'All users'}
                                    </p>
                                    <p>
                                        • Columns:{' '}
                                        {filterColumnsSelected.length > 0
                                            ? `${filterColumnsSelected.length} visible`
                                            : 'Default view'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultiSelectDemo
