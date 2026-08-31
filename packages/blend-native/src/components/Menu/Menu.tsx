import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    MenuV2Alignment,
    MenuV2Side,
    type MenuV2TokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { BottomSheet } from '../../overlay/sheet/BottomSheet'
import { Block } from '../../primitives/Block'
import {
    DropdownContent,
    DropdownList,
    DropdownSearch,
    useDropdown,
} from '../shared/dropdown'
import { filterGroups } from '../shared/dropdown/dropdownFilter'
import { flattenGroups } from '../shared/dropdown/dropdownFlatten'
import {
    getMenuContentTokens,
    getMenuItemTokens,
    flattenMenuGroups,
    toFilterableItem,
} from './menu.utils'
import type { MenuNativeProps, MenuRef } from './menu.types'

const DEFAULT_PLACEMENT_MAP: Record<
    MenuV2Side,
    'top' | 'bottom' | 'left' | 'right'
> = {
    [MenuV2Side.TOP]: 'top',
    [MenuV2Side.BOTTOM]: 'bottom',
    [MenuV2Side.LEFT]: 'left',
    [MenuV2Side.RIGHT]: 'right',
}

const DEFAULT_ALIGNMENT_MAP: Record<
    MenuV2Alignment,
    'start' | 'center' | 'end'
> = {
    [MenuV2Alignment.START]: 'start',
    [MenuV2Alignment.CENTER]: 'center',
    [MenuV2Alignment.END]: 'end',
}

/**
 * Menu — React Native implementation of web's `MenuV2`.
 *
 * Renders a trigger; on press, a floating panel (or bottom sheet on mobile)
 * opens with the items. Selection is per-item controlled (`item.selected`);
 * Menu manages no selection state. Sub-menus render trailing chevrons.
 */
const Menu = forwardRef<MenuRef, MenuNativeProps>(function Menu(
    {
        trigger,
        items = [],
        open: openProp,
        onOpenChange,
        closeOnSelect = true,
        enableSearch = false,
        searchPlaceholder = 'Search...',
        alignment = MenuV2Alignment.START,
        side = MenuV2Side.BOTTOM,
        sideOffset = 8,
        usePanelOnMobile = true,
        enableVirtualization = false,
        menuFooter,
        testID,
        accessibilityLabel,
    },
    ref
) {
    const tokens = useNativeTokens<MenuV2TokensType>('MENUV2')
    const [searchText, setSearchText] = useState('')

    const dropdown = useDropdown({
        open: openProp,
        onOpenChange,
        placement: DEFAULT_PLACEMENT_MAP[side],
        alignment: DEFAULT_ALIGNMENT_MAP[alignment],
        offset: sideOffset,
        usePanelOnMobile,
    })

    const contentTokens = useMemo(() => getMenuContentTokens(tokens), [tokens])

    const filteredGroups = useMemo(() => {
        if (!enableSearch || !searchText) return items
        const filterable = items.map((g) => ({
            label: g.label,
            items: g.items.map(toFilterableItem),
            showSeparator: g.showSeparator,
        }))
        const filtered = filterGroups(filterable, searchText)
        // Re-attach original items by index
        return items
            .map((originalGroup) => {
                const match = filtered.find(
                    (fg) => fg.label === originalGroup.label
                )
                if (!match) return null
                // For each surviving filterable item, find the original
                const survivingOriginals = match.items
                    .map((fi) =>
                        originalGroup.items.find(
                            (oi) => oi.label.text === fi.primaryText
                        )
                    )
                    .filter(Boolean)
                if (!survivingOriginals.length) return null
                return {
                    ...originalGroup,
                    items: survivingOriginals as typeof originalGroup.items,
                }
            })
            .filter(Boolean) as typeof items
    }, [items, enableSearch, searchText])

    const adapterGroups = useMemo(
        () => flattenMenuGroups(filteredGroups),
        [filteredGroups]
    )

    const flatRows = useMemo(
        () => flattenGroups(adapterGroups),
        [adapterGroups]
    )

    const itemTokens = useMemo(() => getMenuItemTokens(tokens), [tokens])

    const handleItemPress = useCallback(
        (item: unknown) => {
            const menuItem = item as { onClick?: () => void }
            menuItem?.onClick?.()
            if (closeOnSelect) {
                dropdown.setOpen(false)
            }
        },
        [closeOnSelect, dropdown]
    )

    // Reset search when the menu closes
    React.useEffect(() => {
        if (!dropdown.open) setSearchText('')
    }, [dropdown.open])

    const triggerElement = React.cloneElement(trigger, {
        ref: dropdown.anchorRef,
        onPress: dropdown.handleOpen,
    } as React.Attributes)

    const content = (
        <View
            style={{
                paddingHorizontal: 16,
                paddingTop: 8,
                paddingBottom: 8,
            }}
        >
            {enableSearch ? (
                <Block paddingBottom={8}>
                    <DropdownSearch
                        value={searchText}
                        onChange={setSearchText}
                        placeholder={searchPlaceholder}
                        testID={testID}
                    />
                </Block>
            ) : null}
            <DropdownList
                rows={flatRows}
                itemTokens={itemTokens}
                separatorColor={String(tokens.separator.color)}
                separatorHeight={tokens.separator.height}
                separatorMargin={tokens.separator.marginTop}
                labelColor={String(tokens.group.label.color)}
                labelFontSize={tokens.group.label.fontSize ?? 14}
                labelFontWeight={tokens.group.label.fontWeight ?? '500'}
                labelPaddingTop={tokens.group.label.paddingTop}
                labelPaddingBottom={tokens.group.label.paddingBottom}
                onItemPress={handleItemPress}
                enableVirtualization={enableVirtualization}
                testID={testID ? `${testID}-list` : undefined}
            />
            {menuFooter ? <Block paddingTop={4}>{menuFooter}</Block> : null}
        </View>
    )

    if (dropdown.shouldUseSheet && dropdown.open) {
        return (
            <View ref={ref} testID={testID}>
                {triggerElement}
                <BottomSheet
                    open={dropdown.open}
                    onClose={() => dropdown.setOpen(false)}
                    backgroundColor={contentTokens.backgroundColor}
                    topRadius={16}
                    accessibilityLabel={accessibilityLabel ?? 'Menu'}
                    testID={testID ? `${testID}-sheet` : undefined}
                >
                    {content}
                </BottomSheet>
            </View>
        )
    }

    return (
        <View ref={ref} testID={testID}>
            {triggerElement}
            <DropdownContent
                open={dropdown.open}
                onClose={() => dropdown.setOpen(false)}
                position={dropdown.position}
                onContentLayout={dropdown.onContentLayout}
                tokens={contentTokens}
                accessibilityLabel={accessibilityLabel ?? 'Menu'}
                testID={testID ? `${testID}-content` : undefined}
            >
                {content}
            </DropdownContent>
        </View>
    )
})

export default memo(Menu)
Menu.displayName = 'Menu'
