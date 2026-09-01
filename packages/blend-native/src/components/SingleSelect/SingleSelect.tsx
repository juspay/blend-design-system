import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import {
    SelectV2Alignment,
    SelectV2Side,
    SelectV2Variant,
    SelectV2Size,
    type SingleSelectV2TokensType,
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
import { SingleSelectTrigger } from './SingleSelectTrigger'
import {
    getSingleSelectContentTokens,
    getSingleSelectItemTokens,
    getTriggerState,
    getValueLabelMap,
    flattenSingleSelectGroups,
    toFilterableItem,
} from './singleSelect.utils'
import type {
    SingleSelectNativeProps,
    SingleSelectRef,
} from './singleSelect.types'

const PLACEMENT_MAP: Record<SelectV2Side, 'top' | 'bottom' | 'left' | 'right'> =
    {
        [SelectV2Side.TOP]: 'top',
        [SelectV2Side.BOTTOM]: 'bottom',
        [SelectV2Side.LEFT]: 'left',
        [SelectV2Side.RIGHT]: 'right',
    }

const ALIGN_MAP: Record<SelectV2Alignment, 'start' | 'center' | 'end'> = {
    [SelectV2Alignment.START]: 'start',
    [SelectV2Alignment.CENTER]: 'center',
    [SelectV2Alignment.END]: 'end',
}

/**
 * SingleSelect — React Native implementation of web's `SingleSelectV2`.
 *
 * A trigger button opens a dropdown panel; selecting an item fires
 * `onSelect(value)` and closes the panel. Supports search, sub-menus,
 * custom triggers, error state, and mobile bottom-sheet mode.
 */
const SingleSelect = forwardRef<SingleSelectRef, SingleSelectNativeProps>(
    function SingleSelect(
        {
            label,
            subLabel,
            hintText,
            required = false,
            placeholder,
            size = SelectV2Size.MD,
            variant = SelectV2Variant.CONTAINER,
            items,
            selected,
            onSelect,
            search,
            slot,
            customTrigger,
            open: openProp,
            onOpenChange,
            usePanelOnMobile = true,
            alignment = SelectV2Alignment.START,
            side = SelectV2Side.BOTTOM,
            sideOffset = 8,
            error,
            disabled = false,
            enableVirtualization = false,
            menuFooter,
            testID,
            accessibilityLabel,
        },
        ref
    ) {
        const tokens =
            useNativeTokens<SingleSelectV2TokensType>('SINGLE_SELECT_V2')
        const [searchText, setSearchText] = useState('')

        const dropdown = useDropdown({
            open: openProp,
            onOpenChange,
            placement: PLACEMENT_MAP[side],
            alignment: ALIGN_MAP[alignment],
            offset: sideOffset,
            usePanelOnMobile,
        })

        const hasError = Boolean(error?.show)
        const triggerState = getTriggerState(dropdown.open, disabled, hasError)

        const valueLabelMap = useMemo(() => getValueLabelMap(items), [items])
        const selectedLabel = valueLabelMap[selected]

        const contentTokens = useMemo(
            () => getSingleSelectContentTokens(tokens, size, variant),
            [tokens, size, variant]
        )

        const itemTokens = useMemo(
            () => getSingleSelectItemTokens(tokens),
            [tokens]
        )

        const filteredGroups = useMemo(() => {
            const enableSearch = search?.show ?? false
            if (!enableSearch || !searchText) return items
            const filterable = items.map((g) => ({
                label: g.groupLabel,
                items: g.items.map(toFilterableItem),
                showSeparator: g.showSeparator,
            }))
            const filtered = filterGroups(filterable, searchText)
            return items
                .map((originalGroup) => {
                    const match = filtered.find(
                        (fg) => fg.label === originalGroup.groupLabel
                    )
                    if (!match) return null
                    const survivingOriginals = match.items
                        .map((fi) =>
                            originalGroup.items.find(
                                (oi) => oi.label === fi.primaryText
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
        }, [items, search, searchText])

        const adapterGroups = useMemo(
            () => flattenSingleSelectGroups(filteredGroups, selected),
            [filteredGroups, selected]
        )

        const flatRows = useMemo(
            () => flattenGroups(adapterGroups),
            [adapterGroups]
        )

        const handleItemPress = useCallback(
            (item: unknown) => {
                const ssItem = item as { value: string }
                onSelect(ssItem.value)
                dropdown.setOpen(false)
            },
            [onSelect, dropdown]
        )

        React.useEffect(() => {
            if (!dropdown.open) setSearchText('')
        }, [dropdown.open])

        const enableSearch = search?.show ?? false
        const searchPlaceholder = search?.placeholder ?? 'Search...'

        // Trigger element: custom or built-in
        const triggerElement = customTrigger ? (
            React.cloneElement(customTrigger, {
                ref: dropdown.anchorRef,
                onPress: dropdown.handleOpen,
            } as React.Attributes)
        ) : (
            <SingleSelectTrigger
                ref={dropdown.anchorRef}
                label={label}
                subLabel={subLabel}
                hintText={hintText}
                required={required}
                placeholder={placeholder}
                selectedLabel={selectedLabel}
                size={size}
                variant={variant}
                disabled={disabled}
                state={triggerState}
                error={error}
                tokens={tokens}
                slot={slot}
                testID={testID ? `${testID}-trigger` : undefined}
                accessibilityLabel={accessibilityLabel}
                onPress={dropdown.handleOpen}
            />
        )

        const content = (
            <>
                {enableSearch ? (
                    <Block paddingBottom={8} paddingLeft={8} paddingRight={8}>
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
                    separatorColor={String(tokens.menu.item.separator.color)}
                    separatorHeight={tokens.menu.item.separator.height}
                    separatorMargin={tokens.menu.item.separator.margin}
                    labelColor={String(tokens.menu.groupLabel.color.default)}
                    labelFontSize={tokens.menu.groupLabel.fontSize ?? 14}
                    labelFontWeight={tokens.menu.groupLabel.fontWeight ?? '500'}
                    labelPaddingTop={tokens.menu.groupLabel.paddingTop}
                    labelPaddingBottom={tokens.menu.groupLabel.paddingBottom}
                    labelPaddingHorizontal={tokens.menu.groupLabel.paddingLeft}
                    onItemPress={handleItemPress}
                    enableVirtualization={enableVirtualization}
                    testID={testID ? `${testID}-list` : undefined}
                />
                {menuFooter ? <Block paddingTop={4}>{menuFooter}</Block> : null}
            </>
        )

        if (dropdown.shouldUseSheet) {
            return (
                <View ref={ref} testID={testID}>
                    {triggerElement}
                    <BottomSheet
                        open={dropdown.open}
                        onClose={() => dropdown.setOpen(false)}
                        backgroundColor={contentTokens.backgroundColor}
                        topRadius={16}
                        accessibilityLabel={accessibilityLabel ?? 'Select'}
                        testID={testID ? `${testID}-sheet` : undefined}
                    >
                        <Block
                            paddingTop={contentTokens.paddingTop}
                            paddingRight={contentTokens.paddingRight}
                            paddingBottom={contentTokens.paddingBottom}
                            paddingLeft={contentTokens.paddingLeft}
                        >
                            {content}
                        </Block>
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
                    accessibilityLabel={accessibilityLabel ?? 'Select'}
                    testID={testID ? `${testID}-content` : undefined}
                >
                    {content}
                </DropdownContent>
            </View>
        )
    }
)

export default memo(SingleSelect)
SingleSelect.displayName = 'SingleSelect'
