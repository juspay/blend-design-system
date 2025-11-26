import {
    Autocomplete,
    AutocompleteSize,
} from '../../../../packages/blend/lib/components/Inputs/Autocomplete'
import type { AutocompleteOption } from '../../../../packages/blend/lib/components/Inputs/Autocomplete'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import {
    Search,
    User,
    Mail,
    MapPin,
    Tag,
    Building,
    Flag,
    Star,
} from 'lucide-react'
import { useState } from 'react'

const AutocompleteDemo = () => {
    // Playground state
    const [playgroundValue, setPlaygroundValue] = useState<string>('')
    const [playgroundMultiple, setPlaygroundMultiple] = useState(false)
    const [playgroundFreeSolo, setPlaygroundFreeSolo] = useState(false)
    const [playgroundClearable, setPlaygroundClearable] = useState(true)
    const [playgroundLoading, setPlaygroundLoading] = useState(false)
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundError, setPlaygroundError] = useState(false)
    const [playgroundSize, setPlaygroundSize] = useState<AutocompleteSize>(
        AutocompleteSize.MEDIUM
    )
    const [showLeftSlot, setShowLeftSlot] = useState(true)

    // Example states
    const [singleValue, setSingleValue] = useState<string>('')
    const [multipleValue, setMultipleValue] = useState<string[]>([])
    const [freeSoloValue, setFreeSoloValue] = useState<string>('')
    const [countryValue, setCountryValue] = useState<string>('')
    const [skillValue, setSkillValue] = useState<string[]>([])
    const [cityValue, setCityValue] = useState<string>('')

    // Sample options
    const fruitOptions: AutocompleteOption[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
        { label: 'Mango', value: 'mango' },
        { label: 'Strawberry', value: 'strawberry' },
        { label: 'Grapes', value: 'grapes' },
        { label: 'Watermelon', value: 'watermelon' },
        { label: 'Pineapple', value: 'pineapple' },
        { label: 'Kiwi', value: 'kiwi' },
        { label: 'Blueberry', value: 'blueberry' },
    ]

    const colorOptions: AutocompleteOption[] = [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Purple', value: 'purple' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pink', value: 'pink' },
        { label: 'Brown', value: 'brown' },
    ]

    const groupedOptions: AutocompleteOption[] = [
        { label: 'React', value: 'react', group: 'Frontend' },
        { label: 'Vue', value: 'vue', group: 'Frontend' },
        { label: 'Angular', value: 'angular', group: 'Frontend' },
        { label: 'Svelte', value: 'svelte', group: 'Frontend' },
        { label: 'Node.js', value: 'nodejs', group: 'Backend' },
        { label: 'Python', value: 'python', group: 'Backend' },
        { label: 'Java', value: 'java', group: 'Backend' },
        { label: 'Go', value: 'go', group: 'Backend' },
        { label: 'PostgreSQL', value: 'postgresql', group: 'Database' },
        { label: 'MongoDB', value: 'mongodb', group: 'Database' },
        { label: 'Redis', value: 'redis', group: 'Database' },
        { label: 'MySQL', value: 'mysql', group: 'Database' },
    ]

    const countryOptions: AutocompleteOption[] = [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
        { label: 'Germany', value: 'de' },
        { label: 'France', value: 'fr' },
        { label: 'Japan', value: 'jp' },
        { label: 'India', value: 'in' },
        { label: 'Brazil', value: 'br' },
        { label: 'China', value: 'cn' },
    ]

    const cityOptions: AutocompleteOption[] = [
        { label: 'New York', value: 'nyc' },
        { label: 'Los Angeles', value: 'la' },
        { label: 'Chicago', value: 'chi' },
        { label: 'Houston', value: 'hou' },
        { label: 'Phoenix', value: 'phx' },
        { label: 'Philadelphia', value: 'phi' },
        { label: 'San Antonio', value: 'sat' },
        { label: 'San Diego', value: 'sd' },
        { label: 'Dallas', value: 'dal' },
        { label: 'San Jose', value: 'sj' },
    ]

    const languageOptions: AutocompleteOption[] = [
        { label: 'JavaScript', value: 'js' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'Python', value: 'py' },
        { label: 'Java', value: 'java' },
        { label: 'C++', value: 'cpp' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
        { label: 'Swift', value: 'swift' },
        { label: 'Kotlin', value: 'kotlin' },
    ]

    const skillOptions: AutocompleteOption[] = [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Communication', value: 'communication' },
        { label: 'Problem Solving', value: 'problem-solving' },
        { label: 'Teamwork', value: 'teamwork' },
        { label: 'Creativity', value: 'creativity' },
        { label: 'Time Management', value: 'time-management' },
        { label: 'Critical Thinking', value: 'critical-thinking' },
        { label: 'Adaptability', value: 'adaptability' },
    ]

    const handlePlaygroundChange = (value: string | string[]) => {
        setPlaygroundValue(Array.isArray(value) ? value.join(', ') : value)
        addSnackbar({
            header: 'Selection Changed',
            description: `Selected: ${Array.isArray(value) ? value.join(', ') : value}`,
        })
    }

    return (
        <div className="p-8 space-y-12">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Autocomplete</h1>
                <p className="text-gray-600">
                    A feature-rich autocomplete/combobox component with single
                    and multiple selection, filtering, keyboard navigation, and
                    more.
                </p>
            </div>

            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <SingleSelect
                            label="Size"
                            items={[
                                {
                                    items: [
                                        {
                                            label: 'Small',
                                            value: AutocompleteSize.SMALL,
                                        },
                                        {
                                            label: 'Medium',
                                            value: AutocompleteSize.MEDIUM,
                                        },
                                        {
                                            label: 'Large',
                                            value: AutocompleteSize.LARGE,
                                        },
                                    ],
                                },
                            ]}
                            selected={playgroundSize}
                            onSelect={(value) =>
                                setPlaygroundSize(value as AutocompleteSize)
                            }
                            placeholder="Select size"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Switch
                            label="Multiple"
                            checked={playgroundMultiple}
                            onChange={() => {
                                setPlaygroundMultiple(!playgroundMultiple)
                                setPlaygroundValue('')
                            }}
                        />
                        <Switch
                            label="Free Solo"
                            checked={playgroundFreeSolo}
                            onChange={() =>
                                setPlaygroundFreeSolo(!playgroundFreeSolo)
                            }
                        />
                        <Switch
                            label="Clearable"
                            checked={playgroundClearable}
                            onChange={() =>
                                setPlaygroundClearable(!playgroundClearable)
                            }
                        />
                        <Switch
                            label="Loading"
                            checked={playgroundLoading}
                            onChange={() =>
                                setPlaygroundLoading(!playgroundLoading)
                            }
                        />
                        <Switch
                            label="Show Left Slot"
                            checked={showLeftSlot}
                            onChange={() => setShowLeftSlot(!showLeftSlot)}
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
                    </div>

                    <div className="min-h-48 rounded-2xl w-full flex justify-center items-start outline-1 outline-gray-200 p-8 bg-gray-50">
                        <div className="w-full max-w-md">
                            <Autocomplete
                                options={fruitOptions}
                                value={playgroundValue}
                                onChange={handlePlaygroundChange}
                                placeholder="Select fruits..."
                                size={playgroundSize}
                                multiple={playgroundMultiple}
                                freeSolo={playgroundFreeSolo}
                                clearable={playgroundClearable}
                                loading={playgroundLoading}
                                disabled={playgroundDisabled}
                                error={playgroundError}
                                label="Fruits"
                                slot={
                                    showLeftSlot ? (
                                        <Search size={16} />
                                    ) : undefined
                                }
                                hintText={
                                    playgroundError
                                        ? undefined
                                        : 'Select one or more fruits'
                                }
                                errorMessage={
                                    playgroundError
                                        ? 'Please select a valid fruit'
                                        : undefined
                                }
                            />
                            {playgroundValue && (
                                <div className="mt-4">
                                    <Text
                                        fontSize="14px"
                                        color={
                                            FOUNDATION_THEME.colors.gray[600]
                                        }
                                    >
                                        Current Value:{' '}
                                        {playgroundValue || '(empty)'}
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Basic Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Basic Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Single Selection
                        </h3>
                        <Autocomplete
                            options={colorOptions}
                            value={singleValue}
                            onChange={(value) =>
                                setSingleValue(value as string)
                            }
                            placeholder="Select a color..."
                            label="Favorite Color"
                            slot={<Tag size={16} />}
                        />
                        <Text
                            fontSize="14px"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            Selected: {singleValue || '(none)'}
                        </Text>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Multiple Selection
                        </h3>
                        <Autocomplete
                            options={languageOptions}
                            value={multipleValue}
                            onChange={(value) =>
                                setMultipleValue(value as string[])
                            }
                            placeholder="Select languages..."
                            label="Programming Languages"
                            multiple
                            slot={<Search size={16} />}
                        />
                        <Text
                            fontSize="14px"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            Selected: {multipleValue.join(', ') || '(none)'}
                        </Text>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Free Solo Mode
                        </h3>
                        <Autocomplete
                            options={cityOptions}
                            value={freeSoloValue}
                            onChange={(value) =>
                                setFreeSoloValue(value as string)
                            }
                            placeholder="Enter or select a city..."
                            label="City"
                            freeSolo
                            slot={<MapPin size={16} />}
                            hintText="You can enter a custom value or select from the list"
                        />
                        <Text
                            fontSize="14px"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            Value: {freeSoloValue || '(empty)'}
                        </Text>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">With Groups</h3>
                        <Autocomplete
                            options={groupedOptions}
                            value={cityValue}
                            onChange={(value) => setCityValue(value as string)}
                            placeholder="Select a technology..."
                            label="Technology Stack"
                            slot={<Building size={16} />}
                        />
                        <Text
                            fontSize="14px"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            Selected: {cityValue || '(none)'}
                        </Text>
                    </div>
                </div>
            </div>

            {/* Sizes */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Sizes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Small</h3>
                        <Autocomplete
                            options={fruitOptions}
                            value=""
                            onChange={() => {}}
                            placeholder="Small size..."
                            size={AutocompleteSize.SMALL}
                            slot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Medium (Default)
                        </h3>
                        <Autocomplete
                            options={fruitOptions}
                            value=""
                            onChange={() => {}}
                            placeholder="Medium size..."
                            size={AutocompleteSize.MEDIUM}
                            slot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Large</h3>
                        <Autocomplete
                            options={fruitOptions}
                            value=""
                            onChange={() => {}}
                            placeholder="Large size..."
                            size={AutocompleteSize.LARGE}
                            slot={<Search size={16} />}
                        />
                    </div>
                </div>
            </div>

            {/* States */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Default</h3>
                        <Autocomplete
                            options={fruitOptions}
                            value=""
                            onChange={() => {}}
                            placeholder="Default state..."
                            label="Default"
                            slot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Disabled</h3>
                        <Autocomplete
                            options={fruitOptions}
                            value="apple"
                            onChange={() => {}}
                            placeholder="Disabled state..."
                            label="Disabled"
                            disabled
                            slot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Error</h3>
                        <Autocomplete
                            options={fruitOptions}
                            value=""
                            onChange={() => {}}
                            placeholder="Error state..."
                            label="Error"
                            error
                            errorMessage="Please select a valid option"
                            slot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Loading</h3>
                        <Autocomplete
                            options={fruitOptions}
                            value=""
                            onChange={() => {}}
                            placeholder="Loading..."
                            label="Loading"
                            loading
                            loadingText="Loading options..."
                            slot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Read Only</h3>
                        <Autocomplete
                            options={fruitOptions}
                            value="banana"
                            onChange={() => {}}
                            placeholder="Read only..."
                            label="Read Only"
                            readOnly
                            slot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">With Value</h3>
                        <Autocomplete
                            options={fruitOptions}
                            value="orange"
                            onChange={() => {}}
                            placeholder="Select..."
                            label="With Value"
                            slot={<Search size={16} />}
                        />
                    </div>
                </div>
            </div>

            {/* Advanced Features */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Advanced Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Multiple with Limit Tags
                        </h3>
                        <Autocomplete
                            options={skillOptions}
                            value={skillValue}
                            onChange={(value) =>
                                setSkillValue(value as string[])
                            }
                            placeholder="Select skills..."
                            label="Skills (Max 2 tags shown)"
                            multiple
                            limitTags={2}
                            slot={<Star size={16} />}
                            hintText="Select multiple skills, only first 2 will be shown"
                        />
                        <Text
                            fontSize="14px"
                            color={FOUNDATION_THEME.colors.gray[600]}
                        >
                            Selected: {skillValue.join(', ') || '(none)'}
                        </Text>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Open on Focus</h3>
                        <Autocomplete
                            options={countryOptions}
                            value={countryValue}
                            onChange={(value) =>
                                setCountryValue(value as string)
                            }
                            placeholder="Click to open..."
                            label="Country"
                            openOnFocus
                            slot={<Flag size={16} />}
                            hintText="Click the input to see all options"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Disable Close on Select
                        </h3>
                        <Autocomplete
                            options={colorOptions}
                            value=""
                            onChange={(value) => {
                                addSnackbar({
                                    header: 'Selected',
                                    description: `You selected: ${value}`,
                                })
                            }}
                            placeholder="Select and stay open..."
                            label="Stay Open After Select"
                            disableCloseOnSelect
                            slot={<Tag size={16} />}
                            hintText="Dropdown stays open after selection"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            No Options Message
                        </h3>
                        <Autocomplete
                            options={[]}
                            value=""
                            onChange={() => {}}
                            placeholder="No options available..."
                            label="Empty Options"
                            noOptionsText="No items found"
                            slot={<Search size={16} />}
                        />
                    </div>
                </div>
            </div>

            {/* Use Cases */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Common Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">User Search</h3>
                        <Autocomplete
                            options={[
                                { label: 'John Doe', value: 'john' },
                                { label: 'Jane Smith', value: 'jane' },
                                { label: 'Bob Johnson', value: 'bob' },
                                { label: 'Alice Williams', value: 'alice' },
                            ]}
                            value=""
                            onChange={(value) => {
                                addSnackbar({
                                    header: `Selected user: ${value}`,
                                })
                            }}
                            placeholder="Search for a user..."
                            label="Assign to User"
                            slot={<User size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Email Recipients
                        </h3>
                        <Autocomplete
                            options={[
                                {
                                    label: 'john@example.com',
                                    value: 'john@example.com',
                                },
                                {
                                    label: 'jane@example.com',
                                    value: 'jane@example.com',
                                },
                                {
                                    label: 'bob@example.com',
                                    value: 'bob@example.com',
                                },
                            ]}
                            value={[]}
                            onChange={(value) => {
                                console.log('Recipients:', value)
                            }}
                            placeholder="Add recipients..."
                            label="To"
                            multiple
                            freeSolo
                            slot={<Mail size={16} />}
                            hintText="Enter email addresses or select from contacts"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Tags Input</h3>
                        <Autocomplete
                            options={[
                                { label: 'urgent', value: 'urgent' },
                                { label: 'important', value: 'important' },
                                { label: 'bug', value: 'bug' },
                                { label: 'feature', value: 'feature' },
                                {
                                    label: 'documentation',
                                    value: 'documentation',
                                },
                            ]}
                            value={[]}
                            onChange={(value) => {
                                console.log('Tags:', value)
                            }}
                            placeholder="Add tags..."
                            label="Issue Tags"
                            multiple
                            freeSolo
                            slot={<Tag size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Location Picker
                        </h3>
                        <Autocomplete
                            options={cityOptions}
                            value=""
                            onChange={(value) => {
                                addSnackbar({
                                    header: `Selected location: ${value}`,
                                })
                            }}
                            placeholder="Choose a location..."
                            label="Office Location"
                            slot={<MapPin size={16} />}
                            openOnFocus
                        />
                    </div>
                </div>
            </div>

            {/* Integration Example */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Integration Example</h2>
                <Block
                    padding="24px"
                    borderRadius="12px"
                    backgroundColor={FOUNDATION_THEME.colors.gray[50]}
                    border={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                >
                    <div className="space-y-6">
                        <div>
                            <Text variant="heading.sm" fontWeight={600}>
                                Create New Project
                            </Text>
                            <Text
                                fontSize="14px"
                                color={FOUNDATION_THEME.colors.gray[600]}
                                style={{ marginTop: '8px' }}
                            >
                                Fill in the details to create a new project
                            </Text>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Autocomplete
                                options={[
                                    { label: 'John Doe', value: 'john' },
                                    { label: 'Jane Smith', value: 'jane' },
                                    { label: 'Bob Johnson', value: 'bob' },
                                ]}
                                value=""
                                onChange={() => {}}
                                placeholder="Select project owner..."
                                label="Project Owner"
                                required
                                slot={<User size={16} />}
                            />

                            <Autocomplete
                                options={groupedOptions}
                                value={[]}
                                onChange={() => {}}
                                placeholder="Select technologies..."
                                label="Tech Stack"
                                multiple
                                limitTags={3}
                                slot={<Building size={16} />}
                                hintText="Choose the technologies for this project"
                            />

                            <Autocomplete
                                options={countryOptions}
                                value=""
                                onChange={() => {}}
                                placeholder="Select region..."
                                label="Region"
                                slot={<Flag size={16} />}
                            />

                            <Autocomplete
                                options={[
                                    { label: 'development', value: 'dev' },
                                    { label: 'staging', value: 'staging' },
                                    { label: 'production', value: 'prod' },
                                    { label: 'testing', value: 'test' },
                                ]}
                                value={[]}
                                onChange={() => {}}
                                placeholder="Add environment tags..."
                                label="Environments"
                                multiple
                                freeSolo
                                slot={<Tag size={16} />}
                            />
                        </div>
                    </div>
                </Block>
            </div>
        </div>
    )
}

export default AutocompleteDemo
