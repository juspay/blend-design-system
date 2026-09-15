import { forwardRef, useMemo } from 'react'
import type { View as RNView } from 'react-native'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    type ButtonV2TokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { Pressable } from '../../primitives/Pressable'
import { Slot } from '../../primitives/Slot'
import { Text } from '../../primitives/Text'
import {
    getButtonNativeStyles,
    getIconMaxHeight,
    getLoaderSize,
} from './button.utils'
import type { ButtonNativeProps } from './button.types'

/**
 * Button — React Native implementation of web's `ButtonV2`.
 *
 * Imports only from `@juspay/blend-design-system/node` (the React-free token
 * entry), the local adapters, and the local primitives — never from web's
 * `context/`, `hooks/`, or `Primitives/` directories.
 *
 * Tokens resolve through `useNativeTokens('BUTTONV2')`, which reads theme and
 * per-slot overrides from `BlendNativeProvider`. This replaces the earlier
 * per-component `theme` prop, which offered no app-wide dark mode, no nested
 * theme scopes, and no `componentTokens` overrides.
 */
const Button = forwardRef<RNView, ButtonNativeProps>(function Button(
    {
        buttonType = ButtonV2Type.PRIMARY,
        size = ButtonV2Size.SMALL,
        subType = ButtonV2SubType.DEFAULT,
        text,
        leftSlot,
        rightSlot,
        loading = false,
        disabled = false,
        state = ButtonV2State.DEFAULT,
        buttonGroupPosition,
        width,
        minWidth,
        maxWidth,
        justifyContent = 'center',
        onPress,
        testID,
        accessibilityLabel,
        style,
        ...rest
    },
    ref
) {
    const tokens = useNativeTokens<ButtonV2TokensType>('BUTTONV2')

    const styles = useMemo(
        () =>
            getButtonNativeStyles(
                disabled,
                buttonType,
                subType,
                size,
                state,
                tokens,
                buttonGroupPosition
            ),
        [
            disabled,
            buttonType,
            subType,
            size,
            state,
            tokens,
            buttonGroupPosition,
        ]
    )

    const iconMaxHeights = getIconMaxHeight(
        subType,
        leftSlot?.maxHeight,
        rightSlot?.maxHeight,
        tokens.slotMaxHeight[size]
    )

    // Icon colour tracks the resolved text colour for the current state, and
    // is handed to the icon element explicitly by `Slot` — RN has no
    // `currentColor` inheritance the way web's `Block` relies on.
    const iconColor = styles.textColor

    const loaderColor = String(
        tokens.text.color[buttonType][subType].default ?? '#2563EB'
    )

    const content = (
        <>
            {leftSlot?.slot ? (
                <Slot
                    color={iconColor}
                    maxHeight={iconMaxHeights.left}
                    hidden={Boolean(text)}
                    testID={testID ? `${testID}-left-slot` : undefined}
                >
                    {leftSlot.slot}
                </Slot>
            ) : null}

            {text ? (
                <Text
                    fontSize={tokens.text.fontSize[size]}
                    fontWeight={tokens.text.fontWeight[size]}
                    lineHeight={tokens.text.lineHeight?.[size]}
                    color={styles.textColor}
                    textAlign="center"
                >
                    {text}
                </Text>
            ) : null}

            {rightSlot?.slot ? (
                <Slot
                    color={iconColor}
                    maxHeight={iconMaxHeights.right}
                    hidden={Boolean(text)}
                    testID={testID ? `${testID}-right-slot` : undefined}
                >
                    {rightSlot.slot}
                </Slot>
            ) : null}
        </>
    )

    return (
        <Pressable
            ref={ref}
            background={styles.background}
            activeBackground={styles.activeBackground}
            disabledBackground={styles.disabledBackground}
            border={styles.border}
            activeBorder={styles.activeBorder}
            disabledBorder={styles.disabledBorder}
            borderRadius={styles.borderRadius}
            boxShadow={styles.boxShadow}
            activeBoxShadow={styles.activeBoxShadow}
            paddingTop={styles.padding.top}
            paddingRight={styles.padding.right}
            paddingBottom={styles.padding.bottom}
            paddingLeft={styles.padding.left}
            flexDirection="row"
            alignItems="center"
            justifyContent={justifyContent}
            gap={styles.gap}
            // Web defaults to `width: fit-content`; `auto` is RN's equivalent.
            width={width ?? 'auto'}
            minWidth={minWidth}
            maxWidth={maxWidth}
            height={styles.height}
            disabled={disabled}
            loading={loading}
            loaderColor={loaderColor}
            loaderSize={getLoaderSize(size)}
            onPress={onPress}
            testID={testID}
            accessibilityLabel={accessibilityLabel ?? text}
            accessibilityRole="button"
            // Grouped members drop their shared edges; spread after the
            // resolved surface so `borderWidth` still covers the other sides.
            style={[styles.groupBorderWidths, style]}
            {...rest}
        >
            {content}
        </Pressable>
    )
})

Button.displayName = 'Button'

export default Button
