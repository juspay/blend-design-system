import React, { useState, useCallback, useMemo } from 'react'
import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useDropdownInteractionLock } from '../../hooks'
import {
    MenuV2Alignment,
    MenuV2Side,
    type MenuV2Props,
    type MenuV2GroupType,
    MenuV2Dimensions,
} from './menuV2.types'
import type { MenuV2TokensType } from './menuV2.tokens'
import { filterMenuGroups } from './menuV2.utils'
import MenuV2Content from './MenuV2Content'
import { CSSObject } from 'styled-components'

const MenuV2 = React.forwardRef<HTMLDivElement, MenuV2Props>(
    (
        {
            trigger,
            triggerProps,
            items = [] as MenuV2GroupType[],
            dimensions = {} as MenuV2Dimensions,
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
        },
        ref
    ) => {
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
            return React.cloneElement(trigger, {
                ...triggerProps,
            })
        }, [trigger, triggerProps])

        return (
            <RadixMenu.Root
                data-menu-v2="menu-v2"
                modal={asModal}
                open={open}
                onOpenChange={handleOpenChange}
            >
                <RadixMenu.Trigger asChild data-element="menu-trigger">
                    {triggerElement}
                </RadixMenu.Trigger>

                <RadixMenu.Portal>
                    <MenuV2Content
                        ref={ref}
                        filteredItems={filteredItems}
                        menuTokens={menuTokens}
                        enableSearch={enableSearch}
                        searchPlaceholder={searchPlaceholder}
                        searchText={searchText}
                        onSearchTextChange={setSearchText}
                        maxHeight={
                            dimensions.maxHeight as CSSObject['maxHeight']
                        }
                        minHeight={
                            dimensions.minHeight as CSSObject['minHeight']
                        }
                        minWidth={dimensions.minWidth as CSSObject['minWidth']}
                        maxWidth={dimensions.maxWidth as CSSObject['maxWidth']}
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
)

MenuV2.displayName = 'MenuV2'

export default MenuV2
