import React, { RefObject } from 'react'
import { SearchInput } from '../Inputs'
import Block from '../Primitives/Block/Block'
import { SELECT_MESSAGES } from '../../i18n/catalog/select.messages'
import { useMessages } from '../../i18n/useMessages'

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
    placeholder: placeholderProp,
    ariaLabel: ariaLabelProp,
    onArrowKeyToFirstOption,
}: MultiSelectV2MenuSearchProps) => {
    const { pick } = useMessages(SELECT_MESSAGES)
    const placeholder = pick(placeholderProp, 'select.placeholder.search')
    const ariaLabel = pick(ariaLabelProp, 'select.a11y.search')
    return (
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
}

MultiSelectV2MenuSearch.displayName = 'MultiSelectV2MenuSearch'

export default MultiSelectV2MenuSearch
