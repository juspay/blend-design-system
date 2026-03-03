import Block from '../Primitives/Block/Block'
import { SearchInput } from '../Inputs'
import type { MenuSearchProps } from './types'

const SingleSelectV2Search = ({
    enabled,
    hasItems,
    backgroundColor,
    searchPlaceholder,
    searchText,
    onSearchTextChange,
    searchInputRef,
    containerRef,
}: MenuSearchProps) => {
    if (!enabled || !hasItems) return null

    return (
        <Block
            ref={containerRef}
            position="sticky"
            top={0}
            left={0}
            right={0}
            zIndex={50}
            backgroundColor={backgroundColor}
        >
            <SearchInput
                ref={searchInputRef}
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={(e) => {
                    onSearchTextChange(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                        e.preventDefault()
                        e.stopPropagation()
                        const menuEl = e.currentTarget.closest(
                            '[data-dropdown="dropdown"]'
                        )
                        const first = menuEl?.querySelector<HTMLElement>(
                            '[role="menuitem"]:not([data-disabled])'
                        )
                        first?.focus()
                    }
                }}
                autoFocus
                aria-label={searchPlaceholder ?? 'Search options'}
            />
        </Block>
    )
}

export default SingleSelectV2Search
