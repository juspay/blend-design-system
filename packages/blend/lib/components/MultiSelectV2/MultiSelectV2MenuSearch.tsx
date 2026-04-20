import React, { RefObject } from 'react'
import { SearchInput } from '../Inputs'
import Block from '../Primitives/Block/Block'

export type MultiSelectV2MenuSearchProps = {
    inputRef: RefObject<HTMLInputElement | null>
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    ariaLabel?: string
    onArrowKeyToFirstOption?: () => void
}

const MultiSelectV2MenuSearch = ({
    inputRef,
    value,
    onChange,
    placeholder = 'Search options...',
    ariaLabel = 'Search options',
    onArrowKeyToFirstOption,
}: MultiSelectV2MenuSearchProps) => (
    <Block>
        <SearchInput
            ref={inputRef}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            aria-label={ariaLabel}
            onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault()
                    e.stopPropagation()
                    onArrowKeyToFirstOption?.()
                }
            }}
        />
    </Block>
)

MultiSelectV2MenuSearch.displayName = 'MultiSelectV2MenuSearch'

export default MultiSelectV2MenuSearch
