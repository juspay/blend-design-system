import { useMemo } from 'react'
import { View } from 'react-native'
import {
    BadgeColor,
    BadgeSize,
    type BadgeTokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import {
    parseBorderRadius,
    parseDimension,
} from '../../adapters/cssStringAdapter'
import Block from '../../primitives/Block'
import Text from '../../primitives/Text'
import type { BadgeNativeProps } from './badge.types'
import {
    formatCount,
    getBadgeAccessibleLabel,
    resolvePositionInsets,
} from './badge.utils'

/**
 * Badge — the native port of web's `Badge`.
 *
 * A dot (no count/text) or a pill (count/text), standalone or hung off a
 * child's corner. Web overlays the child with CSS
 * `transform: translate(±50%, ±50%)`; RN cannot translate by own-size
 * percentages, so `resolvePositionInsets` folds the same overhang into
 * edge insets (documented divergence, see `badge.utils.ts`).
 */
export function Badge({
    count,
    maxCount = 99,
    size = BadgeSize.MD,
    color = BadgeColor.ALERT,
    text,
    showBadge = true,
    showZero = false,
    position = 'top-right',
    offset,
    isCircular = false,
    accessibilityLabel,
    testID,
    style,
    children,
}: BadgeNativeProps) {
    const tokens = useNativeTokens<BadgeTokensType>('BADGE')

    // Hide badge when count is 0 and showZero is false — web parity.
    const effectiveShowBadge = showBadge && !(count === 0 && !showZero)

    const displayText =
        text ?? (count !== undefined ? formatCount(count, maxCount) : '')
    const hasContent = displayText !== ''

    const label =
        accessibilityLabel ??
        getBadgeAccessibleLabel(count, text, maxCount, effectiveShowBadge)

    const dotOrPill = useMemo(() => {
        if (!effectiveShowBadge) return null

        if (!hasContent) {
            const radius = parseBorderRadius(
                tokens.dot.borderRadius as string | number
            )
            const radiusStyle =
                typeof radius === 'number' ? { borderRadius: radius } : radius
            return (
                <View
                    accessible={false}
                    importantForAccessibility="no-hide-descendants"
                    accessibilityElementsHidden
                    testID={testID ? `${testID}-dot` : undefined}
                    style={{
                        width: parseDimension(
                            tokens.dot.width[size] as string | number
                        ),
                        height: parseDimension(
                            tokens.dot.height[size] as string | number
                        ),
                        backgroundColor: String(tokens.backgroundColor[color]),
                        ...radiusStyle,
                    }}
                />
            )
        }

        return (
            <Block
                accessible
                accessibilityRole="text"
                accessibilityLabel={label}
                testID={testID}
                minWidth={tokens.pill.minWidth[size] as string | number}
                height={tokens.pill.height[size] as string | number}
                paddingLeft={tokens.pill.paddingLeft[size] as string | number}
                paddingRight={tokens.pill.paddingRight[size] as string | number}
                backgroundColor={String(tokens.backgroundColor[color])}
                borderRadius={tokens.pill.borderRadius[size] as string | number}
                alignItems="center"
                justifyContent="center"
                style={style}
            >
                <Text
                    fontSize={tokens.text.fontSize[size] as string | number}
                    fontWeight={tokens.text.fontWeight as string | number}
                    lineHeight={tokens.text.lineHeight[size] as string | number}
                    color={String(tokens.text.color)}
                    testID={testID ? `${testID}-text` : undefined}
                >
                    {displayText}
                </Text>
            </Block>
        )
    }, [
        effectiveShowBadge,
        hasContent,
        tokens,
        size,
        color,
        label,
        testID,
        style,
        displayText,
    ])

    // Standalone badge (no children).
    if (children === undefined) return dotOrPill

    // Wrapped: badge hung off the child's corner.
    const insets = resolvePositionInsets(position, size, tokens, {
        customOffset: offset,
        hasContent,
        isCircular,
    })

    return (
        <View style={[{ alignSelf: 'flex-start' }, style]}>
            {children}
            {effectiveShowBadge && (
                <View
                    pointerEvents="none"
                    accessible={false}
                    importantForAccessibility="no-hide-descendants"
                    accessibilityElementsHidden
                    style={{ position: 'absolute', ...insets }}
                    testID={testID ? `${testID}-anchor` : undefined}
                >
                    {dotOrPill}
                </View>
            )}
        </View>
    )
}

Badge.displayName = 'Badge'

export default Badge
