import { SearchInput } from '../../../../packages/blend/lib/components/Inputs/SearchInput'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import {
    Search,
    X,
    Filter,
    Menu,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    Settings,
    Star,
} from 'lucide-react'
import { useState } from 'react'

const SearchInputDemo = () => {
    const [playgroundValue, setPlaygroundValue] = useState('')
    const [showLeftSlot, setShowLeftSlot] = useState(true)
    const [showRightSlot, setShowRightSlot] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [hasError, setHasError] = useState(false)
    const playgroundPlaceholder = 'Search...'

    // State for interactive examples
    const [searchValue1, setSearchValue1] = useState('')
    const [searchValue2, setSearchValue2] = useState('')
    const [searchValue3, setSearchValue3] = useState('')

    const leftSlotOptions = [
        { value: 'search', label: 'Search', icon: <Search size={16} /> },
        { value: 'filter', label: 'Filter', icon: <Filter size={16} /> },
        { value: 'menu', label: 'Menu', icon: <Menu size={16} /> },
        { value: 'user', label: 'User', icon: <User size={16} /> },
        { value: 'mail', label: 'Mail', icon: <Mail size={16} /> },
        { value: 'phone', label: 'Phone', icon: <Phone size={16} /> },
        { value: 'location', label: 'Location', icon: <MapPin size={16} /> },
        { value: 'calendar', label: 'Calendar', icon: <Calendar size={16} /> },
    ]

    const rightSlotOptions = [
        { value: 'x', label: 'Clear (X)', icon: <X size={16} /> },
        { value: 'filter', label: 'Filter', icon: <Filter size={16} /> },
        { value: 'settings', label: 'Settings', icon: <Settings size={16} /> },
        { value: 'clock', label: 'Clock', icon: <Clock size={16} /> },
        { value: 'star', label: 'Star', icon: <Star size={16} /> },
    ]

    const [selectedLeftSlot, setSelectedLeftSlot] = useState('search')
    const [selectedRightSlot, setSelectedRightSlot] = useState('x')

    const getLeftSlotIcon = () => {
        const option = leftSlotOptions.find(
            (opt) => opt.value === selectedLeftSlot
        )
        return option?.icon
    }

    const getRightSlotIcon = () => {
        const option = rightSlotOptions.find(
            (opt) => opt.value === selectedRightSlot
        )
        return option?.icon
    }

    const handleClearSearch = (
        setValue: React.Dispatch<React.SetStateAction<string>>
    ) => {
        setValue('')
        addSnackbar({
            header: 'Search cleared',
        })
    }

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <SingleSelect
                            label="Left Slot Icon"
                            items={[{ items: leftSlotOptions }]}
                            selected={selectedLeftSlot}
                            onSelect={(value) =>
                                setSelectedLeftSlot(value as string)
                            }
                            placeholder="Select left slot"
                        />

                        <SingleSelect
                            label="Right Slot Icon"
                            items={[{ items: rightSlotOptions }]}
                            selected={selectedRightSlot}
                            onSelect={(value) =>
                                setSelectedRightSlot(value as string)
                            }
                            placeholder="Select right slot"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Show Left Slot"
                            checked={showLeftSlot}
                            onChange={() => setShowLeftSlot(!showLeftSlot)}
                        />
                        <Switch
                            label="Show Right Slot"
                            checked={showRightSlot}
                            onChange={() => setShowRightSlot(!showRightSlot)}
                        />
                        <Switch
                            label="Disabled"
                            checked={isDisabled}
                            onChange={() => setIsDisabled(!isDisabled)}
                        />
                        <Switch
                            label="Error State"
                            checked={hasError}
                            onChange={() => setHasError(!hasError)}
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-8">
                        <div className="w-full max-w-md">
                            <SearchInput
                                data-id={'Enter search query'}
                                data-input-name={playgroundValue}
                                name={playgroundValue}
                                value={playgroundValue}
                                onChange={(e) =>
                                    setPlaygroundValue(e.target.value)
                                }
                                placeholder={playgroundPlaceholder}
                                leftSlot={
                                    showLeftSlot ? getLeftSlotIcon() : undefined
                                }
                                rightSlot={
                                    showRightSlot
                                        ? getRightSlotIcon()
                                        : undefined
                                }
                                disabled={isDisabled}
                                error={hasError}
                            />
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
                            Default Search
                        </h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Search..."
                            leftSlot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Search with Clear
                        </h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Type to search"
                            leftSlot={<Search size={16} />}
                            rightSlot={<X size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Filter Search</h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Filter items..."
                            leftSlot={<Filter size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">User Search</h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Search users..."
                            leftSlot={<User size={16} />}
                        />
                    </div>
                </div>
            </div>

            {/* States */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">States</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Default</h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Default state"
                            leftSlot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Disabled</h3>
                        <SearchInput
                            value="Disabled search"
                            onChange={() => {}}
                            placeholder="Disabled state"
                            leftSlot={<Search size={16} />}
                            disabled
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Error</h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Error state"
                            leftSlot={<Search size={16} />}
                            error
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">With Value</h3>
                        <SearchInput
                            value="Search query"
                            onChange={() => {}}
                            placeholder="Search..."
                            leftSlot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Disabled with Value
                        </h3>
                        <SearchInput
                            value="Disabled search value"
                            onChange={() => {}}
                            placeholder="Search..."
                            leftSlot={<Search size={16} />}
                            disabled
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Error with Value
                        </h3>
                        <SearchInput
                            value="Invalid search"
                            onChange={() => {}}
                            placeholder="Search..."
                            leftSlot={<Search size={16} />}
                            error
                        />
                    </div>
                </div>
            </div>

            {/* Icon Variations */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Icon Variations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Left Icon Only
                        </h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Search..."
                            leftSlot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Right Icon Only
                        </h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Type here..."
                            rightSlot={<Filter size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Both Icons</h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Search and filter"
                            leftSlot={<Search size={16} />}
                            rightSlot={<Filter size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">No Icons</h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Plain search"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Email Search</h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Search emails..."
                            leftSlot={<Mail size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Location Search
                        </h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Search location..."
                            leftSlot={<MapPin size={16} />}
                        />
                    </div>
                </div>
            </div>

            {/* Interactive Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Examples</h2>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Controlled Search with Clear
                        </h3>
                        <p className="text-sm text-gray-600">
                            Value: {searchValue1 || '(empty)'}
                        </p>
                        <SearchInput
                            value={searchValue1}
                            onChange={(e) => setSearchValue1(e.target.value)}
                            placeholder="Type to search..."
                            leftSlot={<Search size={16} />}
                            rightSlot={
                                searchValue1 ? (
                                    <button
                                        onClick={() =>
                                            handleClearSearch(setSearchValue1)
                                        }
                                        className="cursor-pointer"
                                    >
                                        <X size={16} />
                                    </button>
                                ) : undefined
                            }
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Search with Filter Action
                        </h3>
                        <p className="text-sm text-gray-600">
                            Value: {searchValue2 || '(empty)'}
                        </p>
                        <SearchInput
                            value={searchValue2}
                            onChange={(e) => setSearchValue2(e.target.value)}
                            placeholder="Search and filter..."
                            leftSlot={<Search size={16} />}
                            rightSlot={
                                <button
                                    onClick={() => {
                                        addSnackbar({
                                            header: `Filter clicked - Current search: ${searchValue2 || 'empty'}`,
                                        })
                                    }}
                                    className="cursor-pointer"
                                >
                                    <Filter size={16} />
                                </button>
                            }
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Date Search with Calendar
                        </h3>
                        <p className="text-sm text-gray-600">
                            Value: {searchValue3 || '(empty)'}
                        </p>
                        <SearchInput
                            value={searchValue3}
                            onChange={(e) => setSearchValue3(e.target.value)}
                            placeholder="Search dates..."
                            leftSlot={<Calendar size={16} />}
                            rightSlot={
                                searchValue3 ? (
                                    <button
                                        onClick={() =>
                                            handleClearSearch(setSearchValue3)
                                        }
                                        className="cursor-pointer"
                                    >
                                        <X size={16} />
                                    </button>
                                ) : undefined
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Use Cases */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Common Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Global Navigation Search
                        </h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Search across the app..."
                            leftSlot={<Search size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Table Filter</h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Filter table data..."
                            leftSlot={<Filter size={16} />}
                            rightSlot={<Settings size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            User Directory
                        </h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Find a user..."
                            leftSlot={<User size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Phone Number Lookup
                        </h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Search phone numbers..."
                            leftSlot={<Phone size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Address Finder
                        </h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Enter address..."
                            leftSlot={<MapPin size={16} />}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Time-based Search
                        </h3>
                        <SearchInput
                            value=""
                            onChange={() => {}}
                            placeholder="Search by time..."
                            leftSlot={<Clock size={16} />}
                        />
                    </div>
                </div>
            </div>

            {/* All States Comparison */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">All States Comparison</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <p className="text-sm font-medium mb-2">Default</p>
                            <SearchInput
                                value=""
                                onChange={() => {}}
                                placeholder="Default state"
                                leftSlot={<Search size={16} />}
                                rightSlot={<X size={16} />}
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-2">
                                With Value
                            </p>
                            <SearchInput
                                value="Search query text"
                                onChange={() => {}}
                                placeholder="Default state"
                                leftSlot={<Search size={16} />}
                                rightSlot={<X size={16} />}
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-2">Disabled</p>
                            <SearchInput
                                value="Disabled search"
                                onChange={() => {}}
                                placeholder="Disabled state"
                                leftSlot={<Search size={16} />}
                                rightSlot={<X size={16} />}
                                disabled
                            />
                        </div>

                        <div>
                            <p className="text-sm font-medium mb-2">Error</p>
                            <SearchInput
                                value="Invalid search query"
                                onChange={() => {}}
                                placeholder="Error state"
                                leftSlot={<Search size={16} />}
                                rightSlot={<X size={16} />}
                                error
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchInputDemo
