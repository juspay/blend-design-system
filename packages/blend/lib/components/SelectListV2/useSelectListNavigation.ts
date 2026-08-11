import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, RefObject } from 'react'
import type { VirtualListRef } from '../VirtualList/types'
import type { SelectListV2FocusTarget } from './utils'

export type UseSelectListNavigationOptions = {
    targets: SelectListV2FocusTarget[]
    /** Present only while virtualized; lets far jumps scroll a row into existence. */
    virtualListRef?: RefObject<VirtualListRef | null>
    /**
     * Receives printable keys typed while a row has focus, mirroring how the
     * dropdown menus redirect typing into their search input. Omit when the
     * list has no search.
     */
    onTypeahead?: (key: string) => void
}

const getFirstEnabled = (targets: SelectListV2FocusTarget[]): number =>
    targets.find((target) => !target.disabled)?.itemIndex ?? -1

/**
 * Roving-tabindex navigation over an always-visible option list.
 *
 * Only the active row is a tab stop, so tabbing past a 5000-row list costs one
 * stop. Arrow/Home/End move focus and skip disabled rows; Enter and Space are
 * left to `SelectItemV2`, which already toggles and calls `preventDefault`.
 */
export const useSelectListNavigation = ({
    targets,
    virtualListRef,
    onTypeahead,
}: UseSelectListNavigationOptions) => {
    const [activeItemIndex, setActiveItemIndex] = useState(0)
    const itemRefs = useRef(new Map<number, HTMLElement>())
    const pendingFocusRef = useRef<{
        itemIndex: number
        value: string
    } | null>(null)
    // Stable per-row ref callbacks, so rows are not detached on every render.
    const refCallbacks = useRef(
        new Map<
            number,
            {
                value: string
                callback: (node: HTMLElement | null) => void
            }
        >()
    )

    const firstEnabled = getFirstEnabled(targets)

    // Search and pagination reshape the list; keep the tab stop on a row that
    // still exists and is still selectable.
    useEffect(() => {
        setActiveItemIndex((current) =>
            targets.some(
                (target) => target.itemIndex === current && !target.disabled
            )
                ? current
                : firstEnabled
        )

        const liveIndices = new Set(targets.map((target) => target.itemIndex))

        // `itemIndex` is positional, not a stable id. If the list reshapes
        // before a pending virtualized row mounts (typing into search is the
        // common case), a different item can land on that ordinal and would be
        // force-focused later, yanking focus out from under the user.
        if (pendingFocusRef.current !== null) {
            const pendingTarget = targets.find(
                (target) =>
                    target.itemIndex === pendingFocusRef.current?.itemIndex
            )
            if (
                !pendingTarget ||
                pendingTarget.value !== pendingFocusRef.current.value
            ) {
                pendingFocusRef.current = null
            }
        }

        // Infinite scroll keeps minting new ordinals; without pruning, one
        // closure per row ever seen is retained for the life of the component.
        refCallbacks.current.forEach((_, itemIndex) => {
            if (!liveIndices.has(itemIndex)) {
                refCallbacks.current.delete(itemIndex)
                itemRefs.current.delete(itemIndex)
            }
        })
    }, [targets, firstEnabled])

    const registerItemRef = useCallback(
        (itemIndex: number, value: string, node: HTMLElement | null) => {
            if (!node) {
                itemRefs.current.delete(itemIndex)
                return
            }
            itemRefs.current.set(itemIndex, node)
            // A virtualized row requested below may only mount now.
            if (
                pendingFocusRef.current?.itemIndex === itemIndex &&
                pendingFocusRef.current.value === value
            ) {
                pendingFocusRef.current = null
                node.focus()
            }
        },
        []
    )

    const getItemRef = useCallback(
        (itemIndex: number, value: string) => {
            const cached = refCallbacks.current.get(itemIndex)
            if (cached?.value === value) return cached.callback
            const callback = (node: HTMLElement | null) =>
                registerItemRef(itemIndex, value, node)
            refCallbacks.current.set(itemIndex, { value, callback })
            return callback
        },
        [registerItemRef]
    )

    const focusItem = useCallback(
        (itemIndex: number) => {
            const target = targets.find(
                (candidate) => candidate.itemIndex === itemIndex
            )
            if (!target) return

            setActiveItemIndex(itemIndex)

            const mounted = itemRefs.current.get(itemIndex)
            if (mounted) {
                mounted.focus()
                return
            }

            pendingFocusRef.current = { itemIndex, value: target.value }
            virtualListRef?.current?.scrollToIndex(target.rowIndex)
        },
        [targets, virtualListRef]
    )

    const focusFirstItem = useCallback(() => {
        if (firstEnabled !== -1) focusItem(firstEnabled)
    }, [firstEnabled, focusItem])

    const moveBy = useCallback(
        (delta: number) => {
            const enabled = targets.filter((target) => !target.disabled)
            if (enabled.length === 0) return

            const currentPosition = enabled.findIndex(
                (target) => target.itemIndex === activeItemIndex
            )
            const nextPosition =
                currentPosition === -1
                    ? delta > 0
                        ? 0
                        : enabled.length - 1
                    : Math.min(
                          Math.max(currentPosition + delta, 0),
                          enabled.length - 1
                      )

            focusItem(enabled[nextPosition].itemIndex)
        },
        [activeItemIndex, focusItem, targets]
    )

    const moveToEdge = useCallback(
        (edge: 'first' | 'last') => {
            const enabled = targets.filter((target) => !target.disabled)
            if (enabled.length === 0) return
            focusItem(
                edge === 'first'
                    ? enabled[0].itemIndex
                    : enabled[enabled.length - 1].itemIndex
            )
        },
        [focusItem, targets]
    )

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            // The row already handled Enter/Space as a toggle.
            if (e.defaultPrevented) return

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault()
                    moveBy(1)
                    return
                case 'ArrowUp':
                    e.preventDefault()
                    moveBy(-1)
                    return
                case 'Home':
                    e.preventDefault()
                    moveToEdge('first')
                    return
                case 'End':
                    e.preventDefault()
                    moveToEdge('last')
                    return
                default:
                    break
            }

            if (!onTypeahead) return
            if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return
            e.preventDefault()
            onTypeahead(e.key)
        },
        [moveBy, moveToEdge, onTypeahead]
    )

    return {
        activeItemIndex,
        getItemRef,
        handleKeyDown,
        focusFirstItem,
    }
}
