import React from 'react'
import Block from '../Primitives/Block/Block'
import type { MultiSelectV2TokensType } from './multiSelectV2.tokens'
import type { MultiSelectV2GroupType } from './types'
import MultiSelectV2MenuSearch from './MultiSelectV2MenuSearch'
import MultiSelectV2SelectAllItem from './MultiSelectV2SelectAllItem'

export type MultiSelectV2MenuHeaderProps = {
    backgroundColor: string
    borderColor: string
    tokens: MultiSelectV2TokensType
    showSearch: boolean
    itemsCount: number
    searchValue: string
    searchPlaceholder?: string
    searchInputRef: React.RefObject<HTMLInputElement | null>
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSearchArrowKeyToFirst: () => void
    showSelectAll: boolean
    selected: string[]
    availableValues: string[]
    filteredItems: MultiSelectV2GroupType[]
    onSelectAll?: (
        selectAll: boolean,
        filteredItems: MultiSelectV2GroupType[]
    ) => void
    selectAllText?: string
    disabled?: boolean
}

const MultiSelectV2MenuHeader = ({
    backgroundColor,
    borderColor,
    tokens,
    showSearch,
    itemsCount,
    searchValue,
    searchPlaceholder,
    searchInputRef,
    onSearchChange,
    onSearchArrowKeyToFirst,
    showSelectAll,
    selected,
    availableValues,
    filteredItems,
    onSelectAll,
    selectAllText,
    disabled,
}: MultiSelectV2MenuHeaderProps) => {
    return (
        <Block
            position="sticky"
            top={0}
            left={0}
            right={0}
            zIndex={50}
            backgroundColor={backgroundColor}
        >
            {showSearch && itemsCount > 0 && (
                <MultiSelectV2MenuSearch
                    inputRef={searchInputRef}
                    value={searchValue}
                    onChange={onSearchChange}
                    placeholder={searchPlaceholder}
                    ariaLabel={searchPlaceholder ?? 'Search options'}
                    onArrowKeyToFirstOption={onSearchArrowKeyToFirst}
                />
            )}
            {showSelectAll && onSelectAll && availableValues.length > 0 && (
                <Block
                    borderBottom={`1px solid ${borderColor}`}
                    padding={`0 ${tokens.menu.item.gap}`}
                >
                    <MultiSelectV2SelectAllItem
                        selected={selected}
                        availableValues={availableValues}
                        onSelectAll={(selectAll) =>
                            onSelectAll?.(selectAll, filteredItems)
                        }
                        selectAllText={selectAllText ?? 'Select All'}
                        disabled={disabled}
                    />
                </Block>
            )}
        </Block>
    )
}

MultiSelectV2MenuHeader.displayName = 'MultiSelectV2MenuHeader'

export default MultiSelectV2MenuHeader
