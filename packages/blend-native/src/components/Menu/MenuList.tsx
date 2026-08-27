import { useCallback, useMemo, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import {
    defaultSearchSortFn,
    filterMenuV2Groups,
    flattenMenuV2Groups,
} from '@juspay/blend-design-system/node'
import type {
    MenuV2FlatRow,
    MenuV2GroupType,
    MenuV2SearchSortFn,
    MenuV2TokensType,
} from '@juspay/blend-design-system/node'
import { parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import Separator from '../../primitives/Separator'
import { SearchInput } from '../SearchInput'
import { BottomSheetScrollable } from '../../overlay/sheet/SheetScrollable'
import { MenuItemRow } from './MenuItemRow'
import { MenuPane } from './MenuPane'
import type { MenuGroupType, MenuItemType, MenuNativeProps } from './menu.types'

/**
 * The list core both presentations share: optional search pinned above one
 * FlatList over the node-flattened rows (labels, separators, items), with
 * sub-menus as a push-in pane (a back row replaces the group labels while
 * a pane is open). **Virtualization policy:** the FlatList is inherently
 * windowed, so web's `enableVirtualScrolling` trio has no native role.
 */
export function MenuList({
    groups,
    enableSearch,
    searchPlaceholder,
    searchSortFn,
    onEnter,
    selectionStyle,
    selectionMode,
    closeOnSelect = true,
    onRequestClose,
    tokens,
    testID,
}: {
    groups: MenuGroupType[]
    enableSearch?: boolean
    searchPlaceholder?: string
    searchSortFn?: MenuNativeProps['searchSortFn']
    onEnter?: MenuNativeProps['onEnter']
    selectionStyle?: MenuNativeProps['selectionStyle']
    selectionMode?: MenuNativeProps['selectionMode']
    closeOnSelect?: boolean
    onRequestClose: () => void
    tokens: MenuV2TokensType
    testID?: string
}) {
    const [searchText, setSearchText] = useState('')
    // The push-in pane stack: each entry is the item whose subMenu is open.
    const [paneStack, setPaneStack] = useState<MenuItemType[]>([])
    const activePane = paneStack[paneStack.length - 1]

    // Native items are structurally assignable to web's MenuV2ItemType
    // (onPress is extra, onClick optional-missing), so the node-exported
    // utils run unchanged; rows come back as our own items.
    const filteredGroups = useMemo(() => {
        const base: MenuGroupType[] = activePane
            ? [{ items: activePane.subMenu ?? [] }]
            : groups
        if (!searchText) return base
        return filterMenuV2Groups(
            base as MenuV2GroupType[],
            searchText,
            (searchSortFn as MenuV2SearchSortFn) ?? defaultSearchSortFn
        ) as MenuGroupType[]
    }, [groups, activePane, searchText, searchSortFn])

    const rows = useMemo(
        () => flattenMenuV2Groups(filteredGroups as MenuV2GroupType[]),
        [filteredGroups]
    )

    const handleItemPress = useCallback(
        (item: MenuItemType) => {
            if (item.subMenu?.length) {
                setSearchText('')
                setPaneStack((stack) => [...stack, item])
                return
            }
            item.onPress?.()
            if (closeOnSelect) onRequestClose()
        },
        [closeOnSelect, onRequestClose]
    )

    const popPane = useCallback(() => {
        setSearchText('')
        setPaneStack((stack) => stack.slice(0, -1))
    }, [])

    const label = tokens.group.label
    const renderRow = useCallback(
        ({ item: row, index }: { item: MenuV2FlatRow; index: number }) => {
            if (row.type === 'label') {
                return (
                    <View
                        style={{
                            paddingTop: parseDimension(
                                label.paddingTop as string | number
                            ),
                            paddingBottom: parseDimension(
                                label.paddingBottom as string | number
                            ),
                            paddingLeft: parseDimension(
                                label.paddingLeft as string | number
                            ),
                            paddingRight: parseDimension(
                                label.paddingRight as string | number
                            ),
                            marginLeft: parseDimension(
                                label.marginLeft as string | number
                            ),
                            marginRight: parseDimension(
                                label.marginRight as string | number
                            ),
                        }}
                    >
                        <Text
                            color={String(label.color ?? '#99A0AE')}
                            fontSize={label.fontSize as string | number}
                            fontWeight={label.fontWeight as string | number}
                            lineHeight={label.lineHeight as string | number}
                        >
                            {row.label}
                        </Text>
                    </View>
                )
            }
            if (row.type === 'separator') {
                return (
                    <Separator
                        orientation="horizontal"
                        style={{ alignSelf: 'stretch', marginVertical: 4 }}
                    />
                )
            }
            const item = row.item as MenuItemType
            return (
                <MenuItemRow
                    item={item}
                    selectionStyle={row.selectionStyle ?? selectionStyle}
                    onPress={() => handleItemPress(item)}
                    tokens={tokens}
                    testID={testID ? `${testID}-item-${index}` : undefined}
                />
            )
        },
        [label, selectionStyle, handleItemPress, tokens, testID]
    )

    return (
        <MenuPane paneKey={paneStack.length} testID={testID}>
            {activePane ? (
                <Pressable
                    onPress={popPane}
                    accessibilityRole="button"
                    accessibilityLabel={`Back to ${
                        paneStack.length > 1
                            ? paneStack[paneStack.length - 2].label.text
                            : 'menu'
                    }`}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                        paddingVertical: 8,
                        paddingHorizontal: 8,
                    }}
                    testID={testID ? `${testID}-back` : undefined}
                >
                    <ChevronLeft
                        size={16}
                        color={String(
                            tokens.group.item.text.rightChevron.color ??
                                '#717784'
                        )}
                    />
                    <Text
                        color={String(tokens.group.label.color ?? '#99A0AE')}
                        fontSize={tokens.group.item.text.fontSize as number}
                        fontWeight={500}
                    >
                        {activePane.label.text}
                    </Text>
                </Pressable>
            ) : null}
            {enableSearch ? (
                <SearchInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder={searchPlaceholder}
                    onSubmitEditing={() =>
                        onEnter?.(searchText, filteredGroups)
                    }
                    testID={testID ? `${testID}-search` : undefined}
                />
            ) : null}
            <BottomSheetScrollable>
                <FlatList
                    data={rows}
                    keyExtractor={(row) => row.id}
                    renderItem={renderRow}
                    accessibilityRole="menu"
                    // Selection cardinality: RN has no menuitemradio/
                    // menuitemcheckbox roles; single vs multiple rides the
                    // per-row selected state (docblocked divergence).
                    accessibilityLabel={
                        selectionMode === 'multiple'
                            ? 'Menu, multiple selection'
                            : 'Menu'
                    }
                    keyboardShouldPersistTaps="handled"
                    testID={testID ? `${testID}-list` : undefined}
                />
            </BottomSheetScrollable>
        </MenuPane>
    )
}

export default MenuList
