import { useMemo, useState } from 'react'
import { FlatList, Pressable, View } from 'react-native'
import { Check } from 'lucide-react-native'
import type { SingleSelectV2TokensType } from '@juspay/blend-design-system/node'
import { parseDimension } from '../../../adapters/cssStringAdapter'
import Text from '../../../primitives/Text'
import Slot from '../../../primitives/Slot'
import Separator from '../../../primitives/Separator'
import { SearchInput } from '../../SearchInput'
import { BottomSheetScrollable } from '../../../overlay/sheet/SheetScrollable'

/**
 * The option-list core both Selects share on both presentations: optional
 * search pinned above one FlatList over flattened group rows. The list IS
 * a FlatList (inherently windowed), which is the whole native
 * virtualization policy. `renderIndicator` lets MultiSelect swap the
 * default selected-checkmark for its Checkbox; `listHeader` covers the
 * select-all row injection.
 */

export type SelectOption = {
    label: string
    value: string
    subLabel?: string
    disabled?: boolean
    slot1?: React.ReactNode
    onPress?: () => void
}

type Row =
    | { type: 'label'; id: string; label: string }
    | { type: 'separator'; id: string }
    | { type: 'option'; id: string; option: SelectOption }

export function flattenSelectGroups(
    groups: {
        groupLabel?: string
        items: SelectOption[]
        showSeparator?: boolean
    }[]
): Row[] {
    const rows: Row[] = []
    groups.forEach((group, groupIndex) => {
        if (group.groupLabel) {
            rows.push({
                type: 'label',
                id: `label-${groupIndex}`,
                label: group.groupLabel,
            })
        }
        group.items.forEach((option, index) => {
            rows.push({
                type: 'option',
                id: `option-${groupIndex}-${index}-${option.value}`,
                option,
            })
        })
        if (groupIndex < groups.length - 1 && group.showSeparator) {
            rows.push({ type: 'separator', id: `separator-${groupIndex}` })
        }
    })
    return rows
}

export function SelectOptionList({
    groups,
    selectedValues,
    onOptionPress,
    search,
    isSelected,
    keepOpenOnPress = false,
    allowCustomValue = false,
    customValueLabel,
    tokens,
    listHeader,
    listFooter,
    showItemDividers = false,
    renderIndicator,
    testID,
}: {
    groups: {
        groupLabel?: string
        items: SelectOption[]
        showSeparator?: boolean
    }[]
    selectedValues: string[]
    onOptionPress: (value: string, option?: SelectOption) => void
    search?: { show?: boolean; placeholder?: string }
    /** Trailing indicator style: checkmark (single) handled here; multi passes its own renderer. */
    isSelected?: (value: string) => boolean
    keepOpenOnPress?: boolean
    allowCustomValue?: boolean
    customValueLabel?: string
    tokens: SingleSelectV2TokensType
    listHeader?: React.ReactNode
    listFooter?: React.ReactNode
    showItemDividers?: boolean
    /** Overrides the trailing indicator (default: checkmark on selected). */
    renderIndicator?: (
        selected: boolean,
        option: SelectOption
    ) => React.ReactNode
    testID?: string
}) {
    const [searchText, setSearchText] = useState('')

    const filteredGroups = useMemo(() => {
        if (!searchText) return groups
        const lower = searchText.toLowerCase()
        return groups
            .map((group) => ({
                ...group,
                items: group.items.filter((option) =>
                    option.label.toLowerCase().includes(lower)
                ),
            }))
            .filter((group) => group.items.length > 0)
    }, [groups, searchText])

    const rows = useMemo(() => {
        const flattened = flattenSelectGroups(filteredGroups)
        const hasExact = filteredGroups.some((group) =>
            group.items.some(
                (option) =>
                    option.label.toLowerCase() === searchText.toLowerCase()
            )
        )
        if (allowCustomValue && searchText && !hasExact) {
            flattened.push({
                type: 'option',
                id: `custom-${searchText}`,
                option: {
                    label: `${customValueLabel ?? 'Use'} "${searchText}"`,
                    value: searchText,
                },
            })
        }
        return flattened
    }, [filteredGroups, allowCustomValue, customValueLabel, searchText])

    const item = tokens.menu.item
    const selectedSet = useMemo(() => new Set(selectedValues), [selectedValues])
    const checkSelected =
        isSelected ?? ((value: string) => selectedSet.has(value))

    const renderRow = ({ item: row, index }: { item: Row; index: number }) => {
        if (row.type === 'label') {
            return (
                <Text
                    color={String(tokens.menu.groupLabel?.color ?? '#99A0AE')}
                    fontSize={
                        (tokens.menu.groupLabel?.fontSize as number) ?? 12
                    }
                    style={{ paddingHorizontal: 8, paddingVertical: 6 }}
                >
                    {row.label}
                </Text>
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
        const option = row.option
        const selected = checkSelected(option.value)
        const state = option.disabled
            ? 'disabled'
            : selected
              ? 'selected'
              : 'default'
        const optionColor = String(item.option?.color?.[state] ?? '#525866')
        return (
            <Pressable
                onPress={() => onOptionPress(option.value, option)}
                disabled={option.disabled}
                accessibilityRole="menuitem"
                accessibilityState={{
                    disabled: option.disabled,
                    selected,
                }}
                accessibilityLabel={option.label}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: parseDimension(item.gap as string | number) ?? 8,
                    backgroundColor: String(
                        item.backgroundColor?.[state] ?? 'transparent'
                    ),
                    borderRadius:
                        parseDimension(item.borderRadius as string | number) ??
                        4,
                    paddingTop: parseDimension(
                        item.paddingTop as string | number
                    ),
                    paddingBottom: parseDimension(
                        item.paddingBottom as string | number
                    ),
                    paddingLeft: parseDimension(
                        item.paddingLeft as string | number
                    ),
                    paddingRight: parseDimension(
                        item.paddingRight as string | number
                    ),
                    borderBottomWidth:
                        showItemDividers && index < rows.length - 1 ? 1 : 0,
                    borderBottomColor: String(
                        item.separator?.color ?? '#E1E4EA'
                    ),
                }}
                testID={testID ? `${testID}-option-${index}` : undefined}
            >
                {option.slot1 ? (
                    <Slot maxHeight={16} color={optionColor}>
                        {option.slot1}
                    </Slot>
                ) : null}
                <View style={{ flex: 1 }}>
                    <Text
                        color={optionColor}
                        fontSize={item.option?.fontSize as string | number}
                        fontWeight={item.option?.fontWeight as string | number}
                        numberOfLines={1}
                    >
                        {option.label}
                    </Text>
                    {option.subLabel ? (
                        <Text
                            color={String(
                                item.description?.color?.[state] ?? '#99A0AE'
                            )}
                            fontSize={
                                (item.description?.fontSize as number) ?? 12
                            }
                            numberOfLines={1}
                        >
                            {option.subLabel}
                        </Text>
                    ) : null}
                </View>
                {renderIndicator ? (
                    renderIndicator(selected, option)
                ) : selected ? (
                    <Check size={16} color={optionColor} />
                ) : null}
            </Pressable>
        )
    }

    return (
        <View>
            {listHeader}
            {search?.show ? (
                <SearchInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder={search.placeholder}
                    testID={testID ? `${testID}-search` : undefined}
                />
            ) : null}
            <BottomSheetScrollable>
                <FlatList
                    data={rows}
                    keyExtractor={(row) => row.id}
                    renderItem={renderRow}
                    keyboardShouldPersistTaps="handled"
                    accessibilityRole="menu"
                    extraData={[selectedValues, keepOpenOnPress]}
                    testID={testID ? `${testID}-list` : undefined}
                />
            </BottomSheetScrollable>
            {listFooter}
        </View>
    )
}

export default SelectOptionList
