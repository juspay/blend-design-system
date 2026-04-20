import { useState } from 'react'
import { SearchInput } from '../../../Inputs'
import { Search, X, Filter, MapPin, Calendar } from 'lucide-react'

const SearchInputLightHouse = () => {
    const [generalSearch, setGeneralSearch] = useState('search query')
    const [locationSearch, setLocationSearch] = useState('New York')
    const [dateSearch, setDateSearch] = useState('')

    return (
        <div className="flex flex-col gap-4">
            {/* Basic SearchInput */}
            <SearchInput
                placeholder="Search products..."
                value={generalSearch}
                onChange={(e) => setGeneralSearch(e.target.value)}
                leftSlot={<Search size={16} aria-hidden="true" />}
            />

            {/* With clear button */}
            <SearchInput
                placeholder="Search with clear button..."
                value={generalSearch}
                onChange={(e) => setGeneralSearch(e.target.value)}
                leftSlot={<Search size={16} aria-hidden="true" />}
                rightSlot={
                    generalSearch && (
                        <button
                            type="button"
                            onClick={() => setGeneralSearch('')}
                            aria-label="Clear search"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '24px',
                                minHeight: '24px',
                                padding: '4px',
                            }}
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    )
                }
            />

            {/* With contextual icons */}
            <SearchInput
                placeholder="Search locations..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                leftSlot={<MapPin size={16} aria-hidden="true" />}
                rightSlot={
                    locationSearch && (
                        <button
                            type="button"
                            onClick={() => setLocationSearch('')}
                            aria-label="Clear location search"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '24px',
                                minHeight: '24px',
                                padding: '4px',
                            }}
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    )
                }
            />

            {/* Error state */}
            <SearchInput
                placeholder="Search with validation..."
                value="invalid"
                onChange={() => {}}
                leftSlot={<Search size={16} aria-hidden="true" />}
                error
            />

            {/* Disabled state */}
            <SearchInput
                placeholder="This search is disabled"
                value="Disabled value"
                onChange={() => {}}
                leftSlot={<Search size={16} aria-hidden="true" />}
                disabled
            />

            {/* Required field */}
            <SearchInput
                placeholder="Required search field"
                value=""
                onChange={() => {}}
                required
            />

            {/* With filter button */}
            <SearchInput
                placeholder="Search with filters..."
                value={generalSearch}
                onChange={(e) => setGeneralSearch(e.target.value)}
                leftSlot={<Search size={16} aria-hidden="true" />}
                rightSlot={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        {generalSearch && (
                            <button
                                type="button"
                                onClick={() => setGeneralSearch('')}
                                aria-label="Clear search"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minWidth: '24px',
                                    minHeight: '24px',
                                    padding: '4px',
                                }}
                            >
                                <X size={16} aria-hidden="true" />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => {}}
                            aria-label="Open filter options"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '24px',
                                minHeight: '24px',
                                padding: '4px',
                            }}
                        >
                            <Filter size={16} aria-hidden="true" />
                        </button>
                    </div>
                }
            />

            {/* Different search contexts */}
            <SearchInput
                placeholder="Search dates..."
                value={dateSearch}
                onChange={(e) => setDateSearch(e.target.value)}
                leftSlot={<Calendar size={16} aria-hidden="true" />}
                rightSlot={
                    dateSearch && (
                        <button
                            type="button"
                            onClick={() => setDateSearch('')}
                            aria-label="Clear date search"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '24px',
                                minHeight: '24px',
                                padding: '4px',
                            }}
                        >
                            <X size={16} aria-hidden="true" />
                        </button>
                    )
                }
            />
        </div>
    )
}

export default SearchInputLightHouse
