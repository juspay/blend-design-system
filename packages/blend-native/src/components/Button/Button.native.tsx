import { useMemo } from 'react'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
    type ButtonV2TokensType,
    getButtonV2Tokens,
} from '@juspay/blend-design-system/node'
import { resolveTokens, Theme } from '../../adapters/tokenResolver'
import { Pressable } from '../../primitives/Pressable.native'
import { Block } from '../../primitives/Block.native'
import { Text } from '../../primitives/Text.native'
import { getButtonNativeStyles } from './button.native.utils'
import type { ButtonNativeProps } from '../../native.types'

/**
 * Button — React Native implementation.
 *
 * Architecture: this component imports ONLY from
 *   - `@juspay/blend-design-system/node` (React-free token entry)
 *   - `../../adapters/*` (CSS-string → RN style translation)
 *   - `../../primitives/*` (native Block / Pressable / Text)
 *
 * It does NOT import from `blend`'s context/hooks/Primitives directories.
 * Tokens are resolved via `resolveTokens(getButtonV2Tokens, theme, 'sm')` —
 * a plain function call, no React hooks, no `ThemeProvider`, no
 * `window.addEventListener`.
 */

type ButtonProps = ButtonNativeProps & {
    /** Optional theme override; defaults to light. */
    theme?: Theme | string
}

function Button({
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
    theme = Theme.LIGHT,
}: ButtonProps) {
    // Resolve tokens once per mount (memoized by props).
    // This bypasses useResponsiveTokens / ThemeProvider entirely.
    const tokens = useMemo(
        () => resolveTokens<ButtonV2TokensType>(getButtonV2Tokens, theme, 'sm'),
        [theme]
    )

    const isSkeleton = false // skeleton not supported on native v1
    const isDisabled = disabled

    const styles = useMemo(
        () =>
            getButtonNativeStyles(
                isSkeleton,
                isDisabled,
                buttonType,
                subType,
                size,
                state,
                tokens,
                buttonGroupPosition
            ),
        [
            isSkeleton,
            isDisabled,
            buttonType,
            subType,
            size,
            state,
            tokens,
            buttonGroupPosition,
        ]
    )

    // Resolve width — RN doesn't understand `fit-content`.
    const resolvedWidth: string | number | undefined = width ?? 'auto'

    // Line height + font metrics from tokens.
    const fontSize = tokens.text.fontSize[size]
    const fontWeight = tokens.text.fontWeight[size]
    const lineHeight = tokens.text.lineHeight?.[size]

    // Icon color matches text color for the current state.
    const iconColor = String(styles.text.color ?? '#FFFFFF')

    // Loader color matches default text color.
    const loaderColor = String(
        tokens.text.color[buttonType][subType].default ?? '#2563EB'
    )

    // Build the inner content (slots + text).
    const content = (
        <>
            {leftSlot?.slot && (
                <Block
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    maxHeight={tokens.slotMaxHeight[size]}
                    color={iconColor}
                >
                    {leftSlot.slot}
                </Block>
            )}
            {text && (
                <Text
                    fontSize={fontSize}
                    fontWeight={fontWeight}
                    color={String(styles.text.color ?? '#1A1C23')}
                    lineHeight={lineHeight}
                    textAlign="center"
                >
                    {text}
                </Text>
            )}
            {rightSlot?.slot && (
                <Block
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    maxHeight={tokens.slotMaxHeight[size]}
                    color={iconColor}
                >
                    {rightSlot.slot}
                </Block>
            )}
        </>
    )

    return (
        <Pressable
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
            width={resolvedWidth}
            minWidth={minWidth}
            maxWidth={maxWidth}
            disabled={isDisabled}
            loading={loading}
            loaderColor={loaderColor}
            onPress={onPress}
            testID={testID}
            accessibilityLabel={accessibilityLabel ?? text}
            accessibilityRole="button"
            accessible
        >
            {content}
        </Pressable>
    )
}

export default Button
