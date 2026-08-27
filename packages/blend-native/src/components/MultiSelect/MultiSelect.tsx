import { useMemo } from 'react'
import { Pressable, View } from 'react-native'
import {
    MultiSelectV2SelectionTagType,
    SelectV2Variant,
} from '@juspay/blend-design-system/node'
import type { MultiSelectV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useNativeBreakpoint } from '../../theme/useNativeBreakpoint'
import { useControllableState } from '../../hooks/useControllableState'
import { AnchoredOverlay } from '../../overlay/anchored/AnchoredOverlay'
import { BottomSheet } from '../../overlay/sheet/BottomSheet'
import { parseBorder, parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { SelectTrigger } from '../shared/select/SelectTrigger'
import { SelectOptionList } from '../shared/select/SelectOptionList'
import type { SelectOption } from '../shared/select/SelectOptionList'
import { ButtonV2Size, ButtonV2Type } from '@juspay/blend-design-system/node'
import {
    applySelectAll,
    resolveSelectAllState,
    toggleSelection,
} from './multiSelect.utils'
import type { MultiSelectNativeProps } from './multiSelect.types'

/**
 * MultiSelect — the native port of web's `MultiSelectV2`.
 *
 * The surface stays open on toggle; rows carry a `Checkbox` indicator and
 * the trigger a COUNT/TEXT selection tag. Phones (`sm`) get the flat
 * bottom panel styled from the tokens' dedicated `drawer` subtree;
 * tablets (`lg`) an anchored dropdown. One `onSelectionChange` per
 * accepted gesture (the legacy `onChange` is omitted).
 */
export function MultiSelect({
    selectedValues,
    onSelectionChange,
    items = [],
    label,
    subLabel,
    required = false,
    variant = SelectV2Variant.CONTAINER,
    selectionTagType = MultiSelectV2SelectionTagType.COUNT,
    hintText,
    placeholder,
    size,
    enableSelectAll = false,
    selectAllText = 'Select all',
    maxSelections,
    onOpenChange,
    error,
    showActionButtons = false,
    primaryAction,
    secondaryAction,
    showItemDividers = false,
    showHeaderBorder = false,
    allowCustomValue,
    customValueLabel,
    showClearButton = false,
    onClearAllClick,
    open,
    search,
    slot,
    customTrigger,
    disabled = false,
    loadingComponent,
    menuFooter,
    maxHeightFraction,
    minWidth,
    maxWidth,
    maxHeight,
    testID,
    style,
}: MultiSelectNativeProps) {
    const tokens = useNativeTokens<MultiSelectV2TokensType>('MULTI_SELECT_V2')
    const breakpoint = useNativeBreakpoint()
    const [isOpen, setOpen] = useControllableState<boolean>(
        open,
        false,
        onOpenChange
    )
    const close = () => setOpen(false)

    const allItems = useMemo(
        () => items.flatMap((group) => group.items),
        [items]
    )
    const alwaysSelected = useMemo(
        () =>
            new Set(
                allItems
                    .filter((item) => item.alwaysSelected)
                    .map((item) => item.value)
            ),
        [allItems]
    )
    const selectableValues = useMemo(
        () =>
            allItems.filter((item) => !item.disabled).map((item) => item.value),
        [allItems]
    )

    const handleToggle = (value: string, option?: SelectOption) => {
        option?.onPress?.()
        const next = toggleSelection(selectedValues, value, {
            maxSelections,
            alwaysSelected,
        })
        if (next !== selectedValues) onSelectionChange?.(next)
    }

    const selectAllState = resolveSelectAllState(
        selectedValues,
        selectableValues
    )
    const handleSelectAll = () => {
        onSelectionChange?.(
            applySelectAll(selectedValues, selectableValues, {
                maxSelections,
                alwaysSelected,
            })
        )
    }

    const tag = tokens.trigger.selectionTag?.[variant]?.[
        selectionTagType === MultiSelectV2SelectionTagType.COUNT
            ? 'count'
            : 'text'
    ] as Record<string, unknown> | undefined
    const valueText = selectedValues.length ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {selectionTagType === MultiSelectV2SelectionTagType.COUNT ? (
                <View
                    style={{
                        backgroundColor: String(
                            tag?.backgroundColor ?? '#0561E2'
                        ),
                        borderRadius:
                            parseDimension(
                                tokens.trigger.selectionTag?.borderRadius as
                                    | string
                                    | number
                            ) ?? 4,
                        paddingHorizontal:
                            parseDimension(
                                tag?.paddingRight as string | number
                            ) ?? 6,
                    }}
                    testID={testID ? `${testID}-count` : undefined}
                >
                    <Text
                        color={String(tag?.color ?? '#FFFFFF')}
                        fontSize={12}
                        fontWeight={(tag?.fontWeight as number) ?? 500}
                    >
                        {String(selectedValues.length)}
                    </Text>
                </View>
            ) : (
                <Text
                    color={String(tag?.color ?? '#525866')}
                    fontSize={
                        tokens.trigger.selectedValue?.fontSize as
                            | string
                            | number
                    }
                    numberOfLines={1}
                >
                    {allItems
                        .filter((item) => selectedValues.includes(item.value))
                        .map((item) => item.label)
                        .join(', ')}
                </Text>
            )}
        </View>
    ) : undefined

    const selectAllRow = enableSelectAll ? (
        <Pressable
            onPress={handleSelectAll}
            accessibilityRole="checkbox"
            accessibilityState={{
                checked:
                    selectAllState === 'indeterminate'
                        ? 'mixed'
                        : selectAllState === 'checked',
            }}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                paddingHorizontal: 8,
                ...(showHeaderBorder
                    ? {
                          ...parseBorder(
                              String(
                                  tokens.drawer?.header?.borderBottom ?? 'none'
                              )
                          ),
                          borderBottomWidth: 1,
                          borderTopWidth: 0,
                          borderLeftWidth: 0,
                          borderRightWidth: 0,
                      }
                    : null),
            }}
            testID={testID ? `${testID}-select-all` : undefined}
        >
            <Checkbox
                checked={
                    selectAllState === 'indeterminate'
                        ? 'indeterminate'
                        : selectAllState === 'checked'
                }
                onCheckedChange={handleSelectAll}
                label={selectAllText}
            />
        </Pressable>
    ) : null

    const actions =
        showActionButtons && (primaryAction || secondaryAction) ? (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: 12,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                }}
                testID={testID ? `${testID}-actions` : undefined}
            >
                {secondaryAction ? (
                    <Button
                        text={secondaryAction.text}
                        buttonType={ButtonV2Type.SECONDARY}
                        size={ButtonV2Size.SMALL}
                        onPress={() => secondaryAction.onClick()}
                        disabled={secondaryAction.disabled}
                        loading={secondaryAction.loading}
                    />
                ) : null}
                {primaryAction ? (
                    <Button
                        text={primaryAction.text}
                        buttonType={ButtonV2Type.PRIMARY}
                        size={ButtonV2Size.SMALL}
                        onPress={() => primaryAction.onClick(selectedValues)}
                        disabled={primaryAction.disabled}
                        loading={primaryAction.loading}
                    />
                ) : null}
            </View>
        ) : null

    const clearRow =
        showClearButton && selectedValues.length ? (
            <Pressable
                onPress={() => {
                    onClearAllClick?.()
                    onSelectionChange?.(
                        selectedValues.filter((value) =>
                            alwaysSelected.has(value)
                        )
                    )
                }}
                accessibilityRole="button"
                style={{ paddingVertical: 8, paddingHorizontal: 8 }}
                testID={testID ? `${testID}-clear` : undefined}
            >
                <Text color="#0561E2" fontSize={13} fontWeight={500}>
                    Clear all
                </Text>
            </Pressable>
        ) : null

    const list = (
        <SelectOptionList
            groups={items}
            selectedValues={selectedValues}
            onOptionPress={handleToggle}
            search={search}
            allowCustomValue={allowCustomValue}
            customValueLabel={customValueLabel}
            tokens={tokens}
            showItemDividers={showItemDividers}
            listHeader={selectAllRow}
            listFooter={
                <>
                    {clearRow}
                    {actions}
                    {loadingComponent}
                    {menuFooter}
                </>
            }
            renderIndicator={(selected, option) => (
                <Checkbox
                    checked={selected}
                    onCheckedChange={() => handleToggle(option.value, option)}
                    disabled={option.disabled}
                />
            )}
            testID={testID}
        />
    )

    const trigger = (
        <SelectTrigger
            label={label}
            subLabel={subLabel}
            hintText={hintText}
            errorMessage={error?.message}
            required={required}
            error={Boolean(error?.show)}
            disabled={disabled}
            open={isOpen}
            placeholder={placeholder}
            valueText={valueText}
            slot={slot}
            customTrigger={customTrigger}
            size={size}
            variant={variant}
            onPress={() => setOpen(true)}
            tokens={tokens}
            testID={testID}
        />
    )

    if (breakpoint === 'sm') {
        const header = tokens.drawer?.header
        return (
            <>
                {trigger}
                <BottomSheet
                    open={isOpen}
                    onClose={close}
                    maxHeightFraction={maxHeightFraction}
                    accessibilityLabel={label}
                    testID={testID ? `${testID}-panel` : undefined}
                    style={style}
                >
                    <View
                        style={{
                            paddingTop: parseDimension(
                                header?.paddingTop as string | number
                            ),
                            paddingBottom: parseDimension(
                                header?.paddingBottom as string | number
                            ),
                            alignItems: 'center',
                            ...(showHeaderBorder
                                ? {
                                      ...parseBorder(
                                          String(header?.borderBottom ?? 'none')
                                      ),
                                      borderBottomWidth: 1,
                                      borderTopWidth: 0,
                                      borderLeftWidth: 0,
                                      borderRightWidth: 0,
                                  }
                                : null),
                        }}
                    >
                        <Text
                            color={String(
                                tokens.label?.color?.default ?? '#2B303B'
                            )}
                            fontSize={tokens.label?.fontSize as number}
                            fontWeight={600}
                            accessibilityRole="header"
                        >
                            {label || 'Select options'}
                        </Text>
                    </View>
                    {list}
                </BottomSheet>
            </>
        )
    }

    // MultiSelect's menu chrome sits at the subtree's top level (no
    // `content` wrapper, unlike SingleSelect).
    const content = tokens.menu as Record<string, unknown> | undefined
    return (
        <AnchoredOverlay
            open={isOpen}
            onRequestClose={close}
            placement="bottom"
            alignment="start"
            offset={8}
            backdrop="transparent"
            modal
            testID={testID ? `${testID}-panel` : undefined}
            trigger={trigger}
            contentStyle={[
                {
                    backgroundColor: String(
                        content?.backgroundColor ?? '#FFFFFF'
                    ),
                    borderRadius:
                        parseDimension(
                            content?.borderRadius as string | number
                        ) ?? 8,
                    ...parseBorder(String(content?.border ?? 'none')),
                    padding: 6,
                    minWidth: minWidth ?? 200,
                    maxWidth,
                    maxHeight,
                },
                style,
            ]}
        >
            {list}
        </AnchoredOverlay>
    )
}

MultiSelect.displayName = 'MultiSelect'

export default MultiSelect
