import { View } from 'react-native'
import type { SingleSelectV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useNativeBreakpoint } from '../../theme/useNativeBreakpoint'
import { useControllableState } from '../../hooks/useControllableState'
import { AnchoredOverlay } from '../../overlay/anchored/AnchoredOverlay'
import { BottomSheet } from '../../overlay/sheet/BottomSheet'
import { parseBorder, parseDimension } from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import { SelectTrigger } from '../shared/select/SelectTrigger'
import { SelectOptionList } from '../shared/select/SelectOptionList'
import type { SelectOption } from '../shared/select/SelectOptionList'
import type { SingleSelectNativeProps } from './singleSelect.types'

/**
 * SingleSelect — the native port of web's `SingleSelectV2`.
 *
 * Phones (`sm`) get the flat bottom panel web's `usePanelOnMobile`
 * prescribes, headed from the tokens' dedicated `mobilePanel` subtree;
 * tablets (`lg`) an anchored dropdown styled from `menu.content`. One
 * FlatList either way; selection closes the surface.
 */
export function SingleSelect({
    label,
    subLabel,
    hintText,
    required = false,
    placeholder,
    size,
    variant,
    items,
    selected,
    onSelect,
    open,
    onOpenChange,
    error,
    search,
    slot,
    customTrigger,
    disabled = false,
    onEndReached,
    loadingComponent,
    menuFooter,
    allowCustomValue,
    customValueLabel,
    maxHeightFraction,
    minWidth,
    maxWidth,
    maxHeight,
    testID,
    style,
}: SingleSelectNativeProps) {
    const tokens = useNativeTokens<SingleSelectV2TokensType>('SINGLE_SELECT_V2')
    const breakpoint = useNativeBreakpoint()
    const [isOpen, setOpen] = useControllableState<boolean>(
        open,
        false,
        onOpenChange
    )
    const close = () => setOpen(false)

    const selectedOption = items
        .flatMap((group) => group.items)
        .find((item) => item.value === selected)

    const handlePress = (value: string, option?: SelectOption) => {
        option?.onPress?.()
        onSelect(value)
        close()
    }

    const valueText = selectedOption ? (
        <Text
            color={String(tokens.trigger.selectedValue?.color ?? '#2B303B')}
            fontSize={tokens.trigger.selectedValue?.fontSize as string | number}
            fontWeight={
                tokens.trigger.selectedValue?.fontWeight as string | number
            }
            numberOfLines={1}
        >
            {selectedOption.label}
        </Text>
    ) : undefined

    const list = (
        <SelectOptionList
            groups={items}
            selectedValues={selected ? [selected] : []}
            onOptionPress={handlePress}
            search={search}
            allowCustomValue={allowCustomValue}
            customValueLabel={customValueLabel}
            tokens={tokens}
            listFooter={
                <>
                    {loadingComponent}
                    {menuFooter}
                </>
            }
            testID={testID}
        />
    )
    void onEndReached

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
        const header = tokens.mobilePanel?.header
        return (
            <>
                {trigger}
                <BottomSheet
                    open={isOpen}
                    onClose={close}
                    maxHeightFraction={maxHeightFraction}
                    accessibilityLabel={label ?? placeholder}
                    testID={testID ? `${testID}-panel` : undefined}
                    style={style}
                >
                    {label ? (
                        <View
                            style={{
                                paddingTop: parseDimension(
                                    header?.paddingTop as string | number
                                ),
                                paddingBottom: parseDimension(
                                    header?.paddingBottom as string | number
                                ),
                                paddingLeft: parseDimension(
                                    header?.paddingLeft as string | number
                                ),
                                paddingRight: parseDimension(
                                    header?.paddingRight as string | number
                                ),
                                ...parseBorder(
                                    String(header?.borderBottom ?? 'none')
                                ),
                                borderBottomWidth: 1,
                                borderTopWidth: 0,
                                borderLeftWidth: 0,
                                borderRightWidth: 0,
                                alignItems: 'center',
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
                                {label}
                            </Text>
                        </View>
                    ) : null}
                    {list}
                </BottomSheet>
            </>
        )
    }

    const content = tokens.menu.content
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
                    // menu.padding is a size×variant map of edge paddings on
                    // web; the dropdown surface uses its uniform 6pt intent.
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

SingleSelect.displayName = 'SingleSelect'

export default SingleSelect
