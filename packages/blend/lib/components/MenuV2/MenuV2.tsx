import React, { useState, useCallback, useMemo } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useDropdownInteractionLock } from '../../hooks'
import {
    MenuV2Alignment,
    MenuV2Side,
    type MenuV2Props,
    type MenuV2GroupType,
} from './menuV2.types'
import type { MenuV2TokensType } from './menuV2.tokens'
import { filterMenuGroups } from './menuV2.utils'
import MenuV2Content from './MenuV2Content'

const MenuV2 = ({
    trigger,
    triggerProps,
    items = [] as MenuV2GroupType[],
    maxHeight,
    minHeight,
    minWidth,
    maxWidth,
    enableSearch = false,
    searchPlaceholder = 'Search',
    enableVirtualScrolling = false,
    virtualScrolling,
    open: controlledOpen,
    onOpenChange,
    asModal = false,
    alignment = MenuV2Alignment.CENTER,
    side = MenuV2Side.BOTTOM,
    sideOffset = 8,
    alignOffset = 0,
    collisionBoundaryRef,
}: MenuV2Props) => {
    const [internalOpen, setInternalOpen] = useState(false)
    const [searchText, setSearchText] = useState('')
    const menuTokens = useResponsiveTokens<MenuV2TokensType>('MENU_V2')
    const open = controlledOpen ?? internalOpen

    useDropdownInteractionLock(open)

    const handleOpenChange = useCallback(
        (nextOpen: boolean) => {
            if (controlledOpen === undefined) {
                setInternalOpen(nextOpen)
            }
            if (!nextOpen && enableSearch) {
                setSearchText('')
            }
            onOpenChange?.(nextOpen)
        },
        [controlledOpen, enableSearch, onOpenChange]
    )

    const filteredItems = useMemo(
        () => filterMenuGroups(items, searchText),
        [items, searchText]
    )

    const handleInteractOutside = useCallback((e: unknown) => {
        const event = e as {
            target: HTMLElement | null
            preventDefault: () => void
        }
        const target = event.target
        if (target?.closest('[data-radix-dropdown-menu-trigger]')) {
            event.preventDefault()
        }
    }, [])

    const triggerElement = useMemo(() => {
        if (!trigger) return null

        if (typeof trigger === 'object' && 'type' in (trigger as any)) {
            return React.cloneElement(trigger as React.ReactElement, {
                ...triggerProps,
            })
        }

        return trigger
    }, [trigger, triggerProps])

    return (
        <RadixMenu.Root
            data-element="menu"
            modal={asModal}
            open={open}
            onOpenChange={handleOpenChange}
        >
            <RadixMenu.Trigger asChild data-element="menu-trigger">
                {triggerElement}
            </RadixMenu.Trigger>
            <RadixMenu.Portal>
                <MenuV2Content
                    filteredItems={filteredItems}
                    menuTokens={menuTokens}
                    enableSearch={enableSearch}
                    searchPlaceholder={searchPlaceholder}
                    searchText={searchText}
                    onSearchTextChange={setSearchText}
                    maxHeight={maxHeight}
                    minHeight={minHeight}
                    minWidth={minWidth}
                    maxWidth={maxWidth}
                    enableVirtualScrolling={enableVirtualScrolling}
                    virtualScrolling={virtualScrolling}
                    alignment={alignment}
                    side={side}
                    sideOffset={sideOffset}
                    alignOffset={alignOffset}
                    collisionBoundaryRef={collisionBoundaryRef}
                    onInteractOutside={handleInteractOutside}
                    onPointerDownOutside={handleInteractOutside}
                />
            </RadixMenu.Portal>
        </RadixMenu.Root>
    )
}

MenuV2.displayName = 'MenuV2'

export default MenuV2
