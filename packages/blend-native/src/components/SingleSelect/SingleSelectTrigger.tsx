import React, {
    forwardRef,
    memo,
    type ForwardRefExoticComponent,
    type MemoExoticComponent,
} from 'react'
import { ChevronDown } from 'lucide-react-native'
import type { View as RNView } from 'react-native'
import {
    SelectV2Variant,
    SelectV2Size,
    type SingleSelectV2TokensType,
} from '@juspay/blend-design-system/node'
import { Pressable } from '../../primitives/Pressable'
import { Text } from '../../primitives/Text'
import { Block } from '../../primitives/Block'
import { Slot } from '../../primitives/Slot'
import { getFieldState, type FieldError } from '../shared/field/fieldState'
import type { DropdownTriggerState } from '../shared/dropdown/dropdown.types'
import type { SelectV2ErrorState } from '@juspay/blend-design-system/node'

export type SingleSelectTriggerProps = {
    label?: string
    subLabel?: string
    hintText?: string
    required?: boolean
    placeholder: string
    selectedLabel?: string
    size: SelectV2Size
    variant: SelectV2Variant
    disabled: boolean
    state: DropdownTriggerState
    error?: SelectV2ErrorState
    tokens: SingleSelectV2TokensType
    slot?: React.ReactNode
    testID?: string
    accessibilityLabel?: string
    onPress?: () => void
}

function SingleSelectTriggerImpl(
    props: SingleSelectTriggerProps,
    ref: React.Ref<RNView>
) {
    const {
        label,
        subLabel,
        hintText,
        required = false,
        placeholder,
        selectedLabel,
        size,
        variant,
        disabled,
        state,
        error,
        tokens,
        slot,
        testID,
        accessibilityLabel,
        onPress,
    } = props

    const fieldError: FieldError = error
        ? { show: Boolean(error.show), message: error.message }
        : undefined
    const fieldState = getFieldState(fieldError, disabled)
    const trigger = tokens.trigger

    const backgroundColor = String(
        trigger.backgroundColor[variant][state] ??
            trigger.backgroundColor[variant].closed
    )
    const border = trigger.outline[variant][state]
    const height = trigger.height[size][variant]
    const padding = trigger.padding[size][variant]
    const borderRadius = trigger.borderRadius[size][variant]

    const showSelected = Boolean(selectedLabel)
    const textColor = showSelected
        ? String(trigger.selectedValue.color)
        : String(trigger.placeholder.color)
    const fontSize = showSelected
        ? trigger.selectedValue.fontSize
        : trigger.placeholder.fontSize
    const fontWeight = showSelected
        ? trigger.selectedValue.fontWeight
        : trigger.placeholder.fontWeight

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
                {slot ? (
                    <Slot maxHeight={trigger.slot.width} hidden>
                        {slot}
                    </Slot>
                ) : null}
                <Text
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    color={textColor}
                    style={{ flex: 1, flexShrink: 1 }}
                    numberOfLines={1}
                >
                    {showSelected ? selectedLabel : placeholder}
                </Text>
                <ChevronDown
                    size={16}
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

export const SingleSelectTrigger = memo(
    forwardRef(SingleSelectTriggerImpl)
) as MemoExoticComponent<
    ForwardRefExoticComponent<
        SingleSelectTriggerProps & { ref?: React.Ref<RNView> }
    >
>
SingleSelectTrigger.displayName = 'SingleSelectTrigger'
