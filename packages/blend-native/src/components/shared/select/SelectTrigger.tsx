import { Pressable, View } from 'react-native'
import { ChevronDown } from 'lucide-react-native'
import { SelectV2Size, SelectV2Variant } from '@juspay/blend-design-system/node'
import { parseBorder, parseDimension } from '../../../adapters/cssStringAdapter'
import Text from '../../../primitives/Text'
import Slot from '../../../primitives/Slot'

/**
 * The field-shaped trigger both Selects share: label row above, the
 * token-styled pressable surface (slot + value/placeholder + chevron),
 * hint/error row below.
 *
 * Deliberately NOT built on the input field chrome (`FieldLabels`/
 * `FieldFooter`): the select token trees carry their own label/hintText/
 * errorMessage subtrees with a different shape, and reusing the input
 * chrome would silently restyle selects from the wrong slot.
 *
 * Web's `outline` trigger-border tokens carry an ` !important` suffix —
 * a CSS-specificity artifact with no RN meaning — stripped before
 * `parseBorder`.
 */

/**
 * Structural slice of the trigger-relevant token tree — both
 * `SingleSelectV2TokensType` and `MultiSelectV2TokensType` satisfy it, so
 * the one trigger serves both selects without a union of the full types.
 */
export type SelectTriggerTokens = {
    gap?: unknown
    label?: {
        fontSize?: unknown
        fontWeight?: unknown
        color?: Record<string, unknown>
    }
    subLabel?: { fontSize?: unknown; color?: Record<string, unknown> }
    hintText?: { fontSize?: unknown; color?: Record<string, unknown> }
    errorMessage?: { fontSize?: unknown; color?: unknown }
    required?: { color?: unknown }
    trigger: {
        height?: Record<string, Record<string, unknown>>
        padding?: Record<
            string,
            Record<
                string,
                {
                    top?: unknown
                    right?: unknown
                    bottom?: unknown
                    left?: unknown
                }
            >
        >
        borderRadius?: Record<string, Record<string, unknown>>
        backgroundColor?: Record<string, Record<string, unknown>>
        outline?: Record<string, Record<string, unknown>>
        slot?: { gap?: unknown; width?: unknown }
        placeholder?: { color?: unknown; fontSize?: unknown }
        selectedValue?: {
            color?: unknown
            fontSize?: unknown
            fontWeight?: unknown
        }
    }
}

function triggerState(open: boolean, error: boolean): string {
    if (error) return 'error'
    return open ? 'open' : 'closed'
}

export function SelectTrigger({
    label,
    subLabel,
    hintText,
    errorMessage,
    required = false,
    error = false,
    disabled = false,
    open,
    placeholder,
    valueText,
    slot,
    customTrigger,
    size = SelectV2Size.MD,
    variant = SelectV2Variant.CONTAINER,
    onPress,
    tokens,
    testID,
}: {
    label?: string
    subLabel?: string
    hintText?: string
    errorMessage?: string
    required?: boolean
    error?: boolean
    disabled?: boolean
    open: boolean
    placeholder: string
    /** The rendered selection (text for Single, tag/text for Multi). */
    valueText?: React.ReactNode
    slot?: React.ReactNode
    /** Replaces the built-in surface entirely (label/footer kept). */
    customTrigger?: React.ReactNode
    size?: SelectV2Size
    variant?: SelectV2Variant
    onPress: () => void
    tokens: SelectTriggerTokens
    testID?: string
}) {
    const trigger = tokens.trigger
    const state = triggerState(open, error)
    const labelState = disabled ? 'disabled' : 'default'

    const outline = String(
        (trigger.outline?.[variant] as Record<string, unknown>)?.[state] ??
            'none'
    ).replace(/\s*!important\s*$/, '')
    const backgroundColor = String(
        (trigger.backgroundColor?.[variant] as Record<string, unknown>)?.[
            state
        ] ?? 'transparent'
    )

    const surface = customTrigger ?? (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityState={{ disabled, expanded: open }}
            accessibilityLabel={label ?? placeholder}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: parseDimension(trigger.slot?.gap as string | number) ?? 8,
                height: parseDimension(
                    trigger.height?.[size]?.[variant] as string | number
                ),
                borderRadius:
                    parseDimension(
                        trigger.borderRadius?.[size]?.[variant] as
                            | string
                            | number
                    ) ?? 10,
                backgroundColor,
                ...(outline !== 'none' ? parseBorder(outline) : null),
                paddingTop: parseDimension(
                    trigger.padding?.[size]?.[variant]?.top as string | number
                ),
                paddingBottom: parseDimension(
                    trigger.padding?.[size]?.[variant]?.bottom as
                        | string
                        | number
                ),
                paddingLeft: parseDimension(
                    trigger.padding?.[size]?.[variant]?.left as string | number
                ),
                paddingRight: parseDimension(
                    trigger.padding?.[size]?.[variant]?.right as string | number
                ),
                opacity: disabled ? 0.5 : 1,
            }}
            testID={testID ? `${testID}-trigger` : undefined}
        >
            {slot ? (
                <Slot
                    maxHeight={
                        parseDimension(
                            trigger.slot?.width as string | number
                        ) ?? 20
                    }
                    color={String(trigger.placeholder?.color ?? '#99A0AE')}
                >
                    {slot}
                </Slot>
            ) : null}
            <View style={{ flex: 1 }}>
                {valueText ?? (
                    <Text
                        color={String(trigger.placeholder?.color ?? '#99A0AE')}
                        fontSize={
                            trigger.placeholder?.fontSize as string | number
                        }
                        numberOfLines={1}
                    >
                        {placeholder}
                    </Text>
                )}
            </View>
            <ChevronDown
                size={16}
                color={String(trigger.placeholder?.color ?? '#99A0AE')}
            />
        </Pressable>
    )

    return (
        <View
            style={{
                gap: parseDimension(tokens.gap as string | number) ?? 8,
            }}
            testID={testID}
        >
            {label ? (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                    }}
                >
                    <Text
                        color={String(
                            tokens.label?.color?.[labelState] ?? '#2B303B'
                        )}
                        fontSize={tokens.label?.fontSize as string | number}
                        fontWeight={tokens.label?.fontWeight as string | number}
                    >
                        {label}
                    </Text>
                    {required ? (
                        <Text
                            color={String(tokens.required?.color ?? '#E7000B')}
                            fontSize={tokens.label?.fontSize as string | number}
                            aria-hidden
                        >
                            *
                        </Text>
                    ) : null}
                    {subLabel ? (
                        <Text
                            color={String(
                                tokens.subLabel?.color?.[labelState] ??
                                    '#717784'
                            )}
                            fontSize={
                                tokens.subLabel?.fontSize as string | number
                            }
                        >
                            {subLabel}
                        </Text>
                    ) : null}
                </View>
            ) : null}
            {surface}
            {error && errorMessage ? (
                <Text
                    color={String(tokens.errorMessage?.color ?? '#E7000B')}
                    fontSize={tokens.errorMessage?.fontSize as string | number}
                    accessibilityLiveRegion="polite"
                    testID={testID ? `${testID}-error` : undefined}
                >
                    {errorMessage}
                </Text>
            ) : hintText ? (
                <Text
                    color={String(
                        tokens.hintText?.color?.[labelState] ?? '#717784'
                    )}
                    fontSize={tokens.hintText?.fontSize as string | number}
                    testID={testID ? `${testID}-hint` : undefined}
                >
                    {hintText}
                </Text>
            ) : null}
        </View>
    )
}

export default SelectTrigger
