import { useCallback, useMemo } from 'react'
import { useControllableState } from '../../../hooks/useControllableState'
import { useAnchoredPosition } from '../../../overlay/useAnchoredPosition'
import { useNativeBreakpoint } from '../../../theme/useNativeBreakpoint'
import type { DropdownAlignment, DropdownPlacement } from './dropdown.types'

/**
 * Open state + anchored positioning + mobile breakpoint, wired together.
 *
 * The shared hook behind Menu, SingleSelect, and MultiSelect. Each
 * component passes its `open`/`onOpenChange` (controlled or not), the
 * placement/alignment/offset from its props, and `usePanelOnMobile`; the
 * hook returns the anchor ref, a `measureAnchor` callable, the content
 * layout handler, the resolved `position`, and `shouldUseSheet` (true when
 * the breakpoint is `sm` and `usePanelOnMobile` is set).
 */
export function useDropdown(options: {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    placement?: DropdownPlacement
    alignment?: DropdownAlignment
    offset?: number
    usePanelOnMobile?: boolean
}) {
    const {
        open: openProp,
        defaultOpen = false,
        onOpenChange,
        placement = 'bottom',
        alignment = 'start',
        offset = 8,
        usePanelOnMobile = true,
    } = options

    const [open, setOpen] = useControllableState(
        openProp,
        defaultOpen,
        onOpenChange
    )

    const positioning = useAnchoredPosition({
        placement,
        alignment,
        offset,
    })

    const breakpoint = useNativeBreakpoint()
    const shouldUseSheet = usePanelOnMobile && breakpoint === 'sm'

    const handleOpen = useCallback(() => {
        positioning.measureAnchor()
        setOpen(true)
    }, [positioning, setOpen])

    return useMemo(
        () => ({
            open,
            setOpen,
            handleOpen,
            anchorRef: positioning.anchorRef,
            measureAnchor: positioning.measureAnchor,
            onContentLayout: positioning.onContentLayout,
            position: positioning.position,
            shouldUseSheet,
        }),
        [
            open,
            setOpen,
            handleOpen,
            positioning.anchorRef,
            positioning.measureAnchor,
            positioning.onContentLayout,
            positioning.position,
            shouldUseSheet,
        ]
    )
}
