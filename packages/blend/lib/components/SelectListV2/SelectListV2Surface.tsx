import { useCallback, useEffect, useRef } from 'react'
import type { KeyboardEvent, ReactNode, RefObject } from 'react'
import styled from 'styled-components'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import SearchInputV2 from '../InputsV2/SearchInputV2/SearchInputV2'
import SelectSearchStatus from '../Select/SelectSearchStatus'
import { DEFAULT_END_REACHED_THRESHOLD } from '../SingleSelectV2/utils'
import type { SelectListV2ChromeTokens } from './selectListV2.types'

const ScrollArea = styled(Block)`
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    min-height: 0;

    &::-webkit-scrollbar {
        display: none;
    }
`

export type SelectListV2SurfaceProps = {
    listId: string
    multiSelectable?: boolean
    ariaLabelledBy?: string
    ariaLabel?: string
    chrome: SelectListV2ChromeTokens

    showSearch: boolean
    searchPlaceholder: string
    searchValue: string
    searchInputRef: RefObject<HTMLInputElement | null>
    onSearchChange: (value: string) => void
    onSearchArrowDown: () => void
    isSearchControlled: boolean
    isSearchLoading: boolean

    isEmpty: boolean
    emptyStateText: string
    disabled?: boolean
    /** Replaces the entire body; zero tab stops, `aria-busy="true"`. */
    skeleton?: ReactNode

    /** Select-all / clear-all controls, rendered above the scroll area. */
    header?: ReactNode
    /** Omitted while virtualized: VirtualList owns its own scroll viewport. */
    maxHeight?: number
    onListKeyDown: (e: KeyboardEvent) => void
    children: ReactNode

    /**
     * Infinite scroll for the non-virtualized path. While virtualized,
     * `VirtualList` owns the scroll viewport and these are passed to it
     * instead, so the surface leaves them unset.
     */
    onEndReached?: () => void
    endReachedThreshold?: number
    hasMore?: boolean
    isLoadingMore?: boolean
    /** Changes when the rendered page/search result set changes. */
    paginationKey?: string | number
    loadingComponent?: ReactNode
}

const SelectListV2Surface = ({
    listId,
    multiSelectable,
    ariaLabelledBy,
    ariaLabel,
    chrome,
    showSearch,
    searchPlaceholder,
    searchValue,
    searchInputRef,
    onSearchChange,
    onSearchArrowDown,
    isSearchControlled,
    isSearchLoading,
    isEmpty,
    emptyStateText,
    disabled,
    skeleton,
    header,
    maxHeight,
    onListKeyDown,
    children,
    onEndReached,
    endReachedThreshold = DEFAULT_END_REACHED_THRESHOLD,
    hasMore,
    isLoadingMore = false,
    paginationKey,
    loadingComponent,
}: SelectListV2SurfaceProps) => {
    // Latches so one slow page-load cannot fire onEndReached on every scroll
    // event; resets once the user scrolls back out of the threshold band.
    const endReachedFiredRef = useRef(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const previousSearchValueRef = useRef(searchValue)
    const searchResetPendingRef = useRef(false)

    const maybeFireEndReached = useCallback(
        (el: HTMLElement | null) => {
            if (!el || !onEndReached || !hasMore || isLoadingMore) return
            const distanceFromBottom =
                el.scrollHeight - (el.scrollTop + el.clientHeight)

            if (distanceFromBottom > endReachedThreshold) {
                endReachedFiredRef.current = false
                return
            }
            if (endReachedFiredRef.current) return
            endReachedFiredRef.current = true
            onEndReached()
        },
        [onEndReached, hasMore, endReachedThreshold, isLoadingMore]
    )

    // A first page shorter than the viewport produces no scroll event at all,
    // so a scroll-only trigger would stall pagination forever and look
    // identical to "no more data". Re-arm after a page completes or the
    // filtered result set changes, then check the new geometry immediately.
    useEffect(() => {
        if (previousSearchValueRef.current !== searchValue) {
            previousSearchValueRef.current = searchValue
            searchResetPendingRef.current = true
            endReachedFiredRef.current = false
        }

        // Search changes can temporarily render the skeleton, which removes
        // the scroll area. Keep the reset pending until the new viewport is
        // mounted so pagination cannot use the previous query's scrollTop.
        if (searchResetPendingRef.current && scrollRef.current) {
            scrollRef.current.scrollTop = 0
            searchResetPendingRef.current = false
            endReachedFiredRef.current = false
        }

        if (!isLoadingMore) endReachedFiredRef.current = false
        maybeFireEndReached(scrollRef.current)
    }, [
        maybeFireEndReached,
        paginationKey,
        isLoadingMore,
        searchValue,
        skeleton,
    ])

    if (skeleton) {
        return (
            <Block
                data-element="select-list-skeleton"
                aria-busy="true"
                width="100%"
                minWidth={0}
            >
                {skeleton}
            </Block>
        )
    }

    return (
        <Block
            display="flex"
            flexDirection="column"
            width="100%"
            minWidth={0}
            gap={chrome.gap}
        >
            {showSearch && (
                <SearchInputV2
                    ref={searchInputRef}
                    value={searchValue}
                    placeholder={searchPlaceholder}
                    disabled={disabled}
                    aria-label={searchPlaceholder}
                    // The listbox only exists in the non-empty branch; pointing
                    // aria-controls at a missing id is worse than omitting it.
                    aria-controls={isEmpty ? undefined : listId}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key !== 'ArrowDown') return
                        e.preventDefault()
                        onSearchArrowDown()
                    }}
                />
            )}

            {header}

            <ScrollArea
                ref={scrollRef}
                data-element="select-list-scroll"
                style={maxHeight !== undefined ? { maxHeight } : undefined}
                onScroll={
                    onEndReached
                        ? (e) => maybeFireEndReached(e.currentTarget)
                        : undefined
                }
            >
                <SelectSearchStatus
                    isControlled={isSearchControlled && showSearch}
                    isLoading={isSearchLoading}
                    isEmpty={isEmpty}
                    emptyStateText={emptyStateText}
                />

                {isSearchLoading && isEmpty ? null : isEmpty ? (
                    <Block
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        style={{
                            paddingTop: chrome.itemTokens.paddingTop,
                            paddingRight: chrome.itemTokens.paddingRight,
                            paddingBottom: chrome.itemTokens.paddingBottom,
                            paddingLeft: chrome.itemTokens.paddingLeft,
                        }}
                    >
                        <Text
                            variant="body.md"
                            color={chrome.emptyStateColor}
                            textAlign="center"
                        >
                            {emptyStateText}
                        </Text>
                    </Block>
                ) : (
                    <Block
                        id={listId}
                        data-element="select-list"
                        role="listbox"
                        aria-multiselectable={multiSelectable}
                        aria-labelledby={ariaLabelledBy}
                        aria-label={ariaLabel}
                        aria-disabled={disabled ? true : undefined}
                        onKeyDown={onListKeyDown}
                    >
                        {children}
                    </Block>
                )}

                {hasMore && loadingComponent}
            </ScrollArea>
        </Block>
    )
}

SelectListV2Surface.displayName = 'SelectListV2Surface'

export default SelectListV2Surface
