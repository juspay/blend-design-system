'use client'
import { SearchInput } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SearchInputPreview = () => {
    const tsCode = `import { SearchInput } from "@juspay/blend-design-system";

function MyComponent() {
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  
  return (
    <SearchInput
      placeholder="Search..."
      value={searchValue}
      onChange={handleSearchChange}
      leftSlot={<SearchIcon />}
      rightSlot={<FilterIcon />}
    />
  );
}`

    const reCode = `@react.component
let make = () => {
  let (searchValue, setSearchValue) = React.useState(() => "")
  
  let handleSearchChange = evt => {
    let value = ReactEvent.Form.target(evt)["value"]
    setSearchValue(_ => value)
  }
  
  <SearchInputBinding
    placeholder="Search..."
    value=searchValue
    onChange=handleSearchChange
    leftSlot=<SearchIcon />
    rightSlot=<FilterIcon />
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~leftSlot: React.element=?,
  ~rightSlot: React.element=?,
  ~error: bool=?,
  ~value: string=?,
  ~onChange: ReactEvent.Form.t => unit=?,
  ~placeholder: string=?,
  ~name: string=?,
  ~disabled: bool=?,
  ~autoFocus: bool=?,
  ~onFocus: ReactEvent.Focus.t => unit=?,
  ~onBlur: ReactEvent.Focus.t => unit=?,
) => React.element = "SearchInput"`

    const [searchValue, setSearchValue] = useState('')
    const [filterValue, setFilterValue] = useState('')

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value)
    }

    // Simple search and filter icons
    const SearchIcon = () => (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
        </svg>
    )

    const FilterIcon = () => (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
        >
            <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
        </svg>
    )

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '500px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                }}
            >
                <style>
                    {`
                    .search-input-preview input {
                        color: #374151 !important;
                    }
                    .search-input-preview input::placeholder {
                        color: #9CA3AF !important;
                    }
                `}
                </style>

                <div className="search-input-preview">
                    <h4
                        style={{
                            margin: '0 0 8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151',
                        }}
                    >
                        Basic Search
                    </h4>
                    <SearchInput
                        placeholder="Search products..."
                        value={searchValue}
                        onChange={handleSearchChange}
                        leftSlot={<SearchIcon />}
                    />
                </div>

                <div className="search-input-preview">
                    <h4
                        style={{
                            margin: '0 0 8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#374151',
                        }}
                    >
                        Search with Filter
                    </h4>
                    <SearchInput
                        placeholder="Search and filter results..."
                        value={filterValue}
                        onChange={handleFilterChange}
                        leftSlot={<SearchIcon />}
                        rightSlot={<FilterIcon />}
                    />
                </div>

                {(searchValue || filterValue) && (
                    <div
                        style={{
                            padding: '12px',
                            backgroundColor: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: '#166534',
                        }}
                    >
                        {searchValue && `Search: "${searchValue}"`}
                        {searchValue && filterValue && ' | '}
                        {filterValue && `Filter: "${filterValue}"`}
                    </div>
                )}
            </div>
        </ComponentPreview>
    )
}

export default SearchInputPreview
