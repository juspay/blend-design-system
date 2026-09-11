import React, {
    forwardRef,
    memo,
    useCallback,
    type ForwardRefExoticComponent,
    type MemoExoticComponent,
} from 'react'
import { ChevronDown, X } from 'lucide-react-native'
import type { View as RNView, GestureResponderEvent } from 'react-native'
import {
    SelectV2Variant,
    SelectV2Size,
    MultiSelectV2SelectionTagType,
    type MultiSelectV2TokensType,
} from '@juspay/blend-design-system/node'
import { Pressable } from '../../primitives/Pressable'
import { Text } from '../../primitives/Text'
import { Block } from '../../primitives/Block'
import { getFieldState, type FieldError } from '../shared/field/fieldState'
import type { DropdownTriggerState } from '../shared/dropdown/dropdown.types'
import type { SelectV2ErrorState } from '@juspay/blend-design-system/node'

export type MultiSelectTriggerProps = {
    label?: string
    subLabel?: string
    hintText?: string
    required?: boolean
    placeholder: string
    selectionTagText: string | null
    selectedCount: number
    selectionTagType: MultiSelectV2SelectionTagType
    size: SelectV2Size
    variant: SelectV2Variant
    disabled: boolean
    state: DropdownTriggerState
    error?: SelectV2ErrorState
    tokens: MultiSelectV2TokensType
    showClearButton: boolean
    testID?: string
    accessibilityLabel?: string
    onPress?: () => void
    onClear?: () => void
}

function MultiSelectTriggerImpl(
    props: MultiSelectTriggerProps,
    ref: React.Ref<RNView>
) {
    const {
        label,
        subLabel,
        hintText,
        required = false,
        placeholder,
        selectionTagText,
        selectedCount,
        selectionTagType,
        size,
        variant,
        disabled,
        state,
        error,
        tokens,
        showClearButton,
        testID,
        accessibilityLabel,
        onPress,
        onClear,
    } = props

    const fieldError: FieldError = error
        ? { show: Boolean(error.show), message: error.message }
        : undefined
    const fieldState = getFieldState(fieldError, disabled)
    const trigger = tokens.trigger
    const hasSelection = selectionTagText !== null

    const backgroundColor = String(
        trigger.backgroundColor[variant][state] ??
            trigger.backgroundColor[variant].closed
    )
    const border = trigger.outline[variant][state]
    const height = trigger.height[size][variant]
    const padding = trigger.padding[size][variant]
    const borderRadius = trigger.borderRadius[size][variant]

    const tagTokens = trigger.selectionTag[variant][selectionTagType]
    const chevronTokens = trigger.chevron
    const clearTokens = trigger.clearButton

    const handleClear = useCallback(
        (e?: GestureResponderEvent) => {
            e?.stopPropagation?.()
            onClear?.()
        },
        [onClear]
    )

    const showError = Boolean(fieldError?.show && fieldError?.message)
    const stateKey = fieldState as string

    return (
        <>
            {label ? (
                <Block
                    flexDirection="row"
                    alignItems="center"
                    gap={4}
                    width="100%"
                    testID={testID ? `${testID}-labels` : undefined}
                >
                    <Text
                        fontSize={tokens.label.fontSize}
                        fontWeight={tokens.label.fontWeight}
                        color={String(
                            tokens.label.color[
                                stateKey as keyof typeof tokens.label.color
                            ]
                        )}
                    >
                        {label}
                    </Text>
                    {required ? (
                        <Text
                            color={String(tokens.required.color)}
                            fontSize={tokens.label.fontSize}
                            accessibilityElementsHidden
                            importantForAccessibility="no-hide-descendants"
                        >
                            *
                        </Text>
                    ) : null}
                    {subLabel ? (
                        <Text
                            fontSize={tokens.subLabel.fontSize}
                            fontWeight={tokens.subLabel.fontWeight}
                            color={String(
                                tokens.subLabel.color[
                                    stateKey as keyof typeof tokens.subLabel.color
                                ]
                            )}
                        >
                            ({subLabel})
                        </Text>
                    ) : null}
                </Block>
            ) : null}
            <Pressable
                ref={ref}
                background={backgroundColor}
                border={border ? String(border) : undefined}
                borderRadius={borderRadius}
                boxShadow={trigger.boxShadow[variant]}
                paddingTop={padding.top}
                paddingRight={padding.right}
                paddingBottom={padding.bottom}
                paddingLeft={padding.left}
                flexDirection="row"
                alignItems="center"
                gap={trigger.slot.gap}
                width="100%"
                height={height}
                disabled={disabled}
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
                accessibilityState={{
                    disabled,
                    expanded: state === 'open',
                }}
                testID={testID}
            >
                {/* Content block: placeholder always visible (matching web);
                    selection tag renders as a sibling beside it. Both
                    share one nowrap row that truncates with ellipsis. */}
                <Block
                    flexDirection="row"
                    alignItems="center"
                    width="100%"
                    flexShrink={1}
                    minWidth={0}
                    overflow="hidden"
                >
                    <Text
                        fontSize={trigger.placeholder.fontSize}
                        fontWeight={trigger.placeholder.fontWeight}
                        color={String(trigger.placeholder.color)}
                        style={{ flexShrink: 0 }}
                        numberOfLines={1}
                    >
                        {placeholder}
                    </Text>

                    {hasSelection &&
                    selectionTagType === MultiSelectV2SelectionTagType.TEXT ? (
                        <Text
                            fontSize={trigger.selectedValue.fontSize}
                            fontWeight={tagTokens.fontWeight as string | number}
                            color={String(tagTokens.color)}
                            style={{
                                flexShrink: 1,
                                minWidth: 0,
                                marginLeft: 4,
                            }}
                            numberOfLines={1}
                        >
                            {selectionTagText}
                        </Text>
                    ) : null}

                    {hasSelection &&
                    selectionTagType === MultiSelectV2SelectionTagType.COUNT &&
                    tagTokens.backgroundColor !== 'transparent' ? (
                        <Block
                            backgroundColor={String(tagTokens.backgroundColor)}
                            paddingTop={tagTokens.paddingTop}
                            paddingRight={tagTokens.paddingRight}
                            paddingBottom={tagTokens.paddingBottom}
                            paddingLeft={tagTokens.paddingLeft}
                            borderRadius={4}
                            style={{ marginLeft: 4 }}
                        >
                            <Text
                                fontSize={trigger.selectedValue.fontSize}
                                fontWeight={Number(tagTokens.fontWeight) || 500}
                                color={String(tagTokens.color)}
                            >
                                {selectedCount}
                            </Text>
                        </Block>
                    ) : null}
                </Block>

                {showClearButton && hasSelection && clearTokens ? (
                    <Pressable
                        background={String(
                            clearTokens.backgroundColor[state] ??
                                clearTokens.backgroundColor.closed
                        )}
                        border={
                            clearTokens.outline?.[state]
                                ? String(clearTokens.outline[state])
                                : undefined
                        }
                        onPress={handleClear}
                        accessibilityRole="button"
                        accessibilityLabel="Clear selection"
                        testID={testID ? `${testID}-clear` : undefined}
                        width={clearTokens.width ?? 16}
                        height={clearTokens.width ?? 16}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <X size={12} color={String(clearTokens.color)} />
                    </Pressable>
                ) : null}

                <ChevronDown
                    size={chevronTokens.iconSize ?? 16}
                    color={String(trigger.placeholder.color)}
                />
            </Pressable>
            {showError ? (
                <Block
                    width="100%"
                    testID={testID ? `${testID}-footer` : undefined}
                >
                    <Text
                        accessibilityLiveRegion="polite"
                        color={String(tokens.errorMessage.color)}
                        fontSize={tokens.errorMessage.fontSize}
                        fontWeight={tokens.errorMessage.fontWeight}
                    >
                        {fieldError?.message}
                    </Text>
                </Block>
            ) : hintText ? (
                <Block
                    width="100%"
                    testID={testID ? `${testID}-footer` : undefined}
                >
                    <Text
                        color={String(tokens.hintText.color.default)}
                        fontSize={tokens.hintText.fontSize}
                        fontWeight={tokens.hintText.fontWeight}
                    >
                        {hintText}
                    </Text>
                </Block>
            ) : null}
        </>
    )
}

export const MultiSelectTrigger = memo(
    forwardRef(MultiSelectTriggerImpl)
) as MemoExoticComponent<
    ForwardRefExoticComponent<
        MultiSelectTriggerProps & { ref?: React.Ref<RNView> }
    >
>
MultiSelectTrigger.displayName = 'MultiSelectTrigger'
