import { forwardRef, useMemo } from 'react'
import type { View as RNView } from 'react-native'
import {
    TagV2Color,
    TagV2Size,
    TagV2SubType,
    TagV2Type,
    type TagV2TokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { Block } from '../../primitives/Block'
import { Pressable } from '../../primitives/Pressable'
import { Slot } from '../../primitives/Slot'
import { Text } from '../../primitives/Text'
import {
    getAccessibleName,
    getTagBorderRadius,
    getTagAccessibilityState,
} from './tag.utils'
import { getGroupedBorderWidths } from '../shared/group'
import type { TagNativeProps } from './tag.types'

/**
 * Layout that never varies with tokens or props.
 *
 * Hoisted to module scope so it is allocated once rather than per render.
 * `alignSelf: 'flex-start'` is RN's equivalent of web's `width: fit-content`
 * on an inline-flex element — shrink-to-fit inside a column parent.
 */
const TAG_LAYOUT = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
} as const

/**
 * Tag — React Native implementation of web's `TagV2`.
 *
 * Tokens resolve through `useNativeTokens('TAGV2')`, the native counterpart
 * of web's `useResponsiveTokens('TAGV2')`, so theme and per-slot overrides
 * come from `BlendNativeProvider` rather than a per-component prop.
 *
 * Like web, the rendered element depends on interactivity: web picks
 * `PrimitiveButton` when `onClick` is supplied and `Block` otherwise; native
 * picks `Pressable` vs `Block`. Both branches resolve their styles through
 * the same `resolveSurfaceStyle`, so the two render identically apart from
 * press feedback.
 *
 * TagV2's tokens contain no gradients, shadows, or state matrix, so this
 * component needs no native module — it is pure JS.
 */
const Tag = forwardRef<RNView, TagNativeProps>(function Tag(
    {
        text,
        size = TagV2Size.SM,
        type = TagV2Type.SUBTLE,
        subType = TagV2SubType.SQUARICAL,
        color = TagV2Color.PRIMARY,
        leftSlot,
        rightSlot,
        tagGroupPosition,
        onPress,
        pressed,
        accessibilityLabel,
        testID,
        style,
    },
    ref
) {
    const tokens = useNativeTokens<TagV2TokensType>('TAGV2')

    const isInteractive = typeof onPress === 'function'

    // Grouped members drop their shared edges so a seam is one line wide.
    const groupBorderWidths = useMemo(
        () => getGroupedBorderWidths(tagGroupPosition),
        [tagGroupPosition]
    )

    const borderRadius = useMemo(
        () => getTagBorderRadius(size, subType, tagGroupPosition, tokens),
        [size, subType, tagGroupPosition, tokens]
    )

    const backgroundColor = String(tokens.backgroundColor[type][color])
    const border = String(tokens.border[type][color])
    const textColor = String(tokens.text.color[type][color])

    // Slot icons are tinted to match the label. On web this happens
    // implicitly — `Block`'s `color` becomes CSS `color` and SVGs inherit it
    // through `currentColor`. RN has no such inheritance, so `Slot` hands the
    // colour to the icon element explicitly.
    const accessibleName =
        accessibilityLabel ?? getAccessibleName(text, isInteractive, pressed)

    const content = (
        <>
            {leftSlot?.slot ? (
                <Slot
                    color={textColor}
                    maxHeight={
                        leftSlot.maxHeight ?? tokens.leftSlot.maxHeight[size]
                    }
                    // Matches web's `aria-hidden` on slots accompanying text:
                    // the label already carries the accessible name.
                    hidden={Boolean(text)}
                    testID={testID ? `${testID}-left-slot` : undefined}
                >
                    {leftSlot.slot}
                </Slot>
            ) : null}

            <Text
                fontSize={tokens.text.fontSize[size]}
                fontWeight={tokens.text.fontWeight[size]}
                lineHeight={tokens.text.lineHeight[size]}
                color={textColor}
            >
                {text}
            </Text>

            {rightSlot?.slot ? (
                <Slot
                    color={textColor}
                    maxHeight={
                        rightSlot.maxHeight ?? tokens.rightSlot.maxHeight[size]
                    }
                    hidden={Boolean(text)}
                    testID={testID ? `${testID}-right-slot` : undefined}
                >
                    {rightSlot.slot}
                </Slot>
            ) : null}
        </>
    )

    const surface = useMemo(
        () => ({
            ...TAG_LAYOUT,
            backgroundColor,
            border,
            borderRadius,
            // `height` is the authority for the tag's box, exactly as on web.
            //
            // Vertical padding is deliberately NOT applied. The tokens define
            // both a fixed height and vertical padding, and for every size the
            // padding leaves a content box shorter than the text's own line
            // height (sm: 14px box vs 18px line; md/lg: 14px vs 20px). On web
            // that is harmless — the line box simply overflows the padding
            // box, `overflow: visible` means nothing is cut, and
            // `align-items: center` keeps it centred. React Native has no such
            // affordance: the shorter content box clips the glyphs, which is
            // why descenders ("p" in primary, "g" in warning) were sheared off
            // on iOS while react-native-web rendered them correctly.
            //
            // With a fixed height and a single centred line, vertical padding
            // is visually inert on web anyway — so dropping it here reproduces
            // web's result exactly rather than diverging from it.
            height: tokens.height[size],
            paddingLeft: tokens.padding.left[size],
            paddingRight: tokens.padding.right[size],
            gap: tokens.gap,
        }),
        [backgroundColor, border, borderRadius, tokens, size]
    )

    if (isInteractive) {
        return (
            <Pressable
                ref={ref}
                {...surface}
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel={accessibleName}
                accessibilityState={getTagAccessibilityState(true, pressed)}
                testID={testID}
                style={{ ...groupBorderWidths, ...style }}
            >
                {content}
            </Pressable>
        )
    }

    return (
        <Block
            ref={ref}
            {...surface}
            accessible
            accessibilityRole="text"
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            style={{ ...groupBorderWidths, ...style }}
        >
            {content}
        </Block>
    )
})

Tag.displayName = 'Tag'

export default Tag
