import { forwardRef } from 'react'
import { View } from 'react-native'
import type { View as RNView } from 'react-native'
import {
    CardV2Orientation,
    CardV2Padding,
    CardV2Variant,
} from '@juspay/blend-design-system/node'
import type { CardV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { parseBorder, parseDimension } from '../../adapters/cssStringAdapter'
import Block from '../../primitives/Block'
import Pressable from '../../primitives/Pressable'
import Text from '../../primitives/Text'
import { Skeleton } from '../Skeleton'
import type { SurfaceStyleProps } from '../../adapters/surfaceStyle'
import type { CardNativeProps } from './card.types'

/**
 * Card — the native port of web's `CardV2` (props API + slots).
 *
 * One surface object feeds `Block` or `Pressable` depending on `onPress`
 * (the Tag pattern), with `selected` swapping in the selected border and
 * shadow tokens. Ghost cards default to `padding: none`, web parity.
 */
const Card = forwardRef<RNView, CardNativeProps>(function Card(
    {
        variant = CardV2Variant.OUTLINED,
        orientation = CardV2Orientation.VERTICAL,
        padding,
        eyebrow,
        title,
        truncateTitle = false,
        subtitle,
        description,
        media,
        leadingSlot,
        trailingSlot,
        actions,
        footer,
        centered = false,
        onPress,
        selected = false,
        skeleton,
        width,
        minWidth,
        maxWidth,
        minHeight,
        children,
        accessibilityLabel,
        testID,
        style,
    },
    ref
) {
    const tokens = useNativeTokens<CardV2TokensType>('CARDV2')

    const resolvedPadding =
        padding ??
        (variant === CardV2Variant.GHOST
            ? CardV2Padding.NONE
            : CardV2Padding.COMFORTABLE)
    const pad = tokens.padding[resolvedPadding]
    const padX = parseDimension(pad.x as string | number) ?? 0
    const padY = parseDimension(pad.y as string | number) ?? 0

    const surface: SurfaceStyleProps = {
        backgroundColor: String(tokens.backgroundColor[variant]),
        border: String(
            selected ? tokens.state.selected.border : tokens.border[variant]
        ),
        borderRadius: tokens.borderRadius as string | number,
        boxShadow: String(
            selected
                ? tokens.state.selected.boxShadow
                : tokens.boxShadow[variant]
        ),
        paddingTop: padY,
        paddingBottom: padY,
        paddingLeft: padX,
        paddingRight: padX,
        width: width ?? (tokens.width as string | number),
        minWidth: minWidth ?? (tokens.minWidth as string | number),
        maxWidth: maxWidth ?? (tokens.maxWidth as string | number),
        minHeight,
        gap: parseDimension(tokens.layout.gap as string | number) ?? 12,
        alignItems: centered ? 'center' : undefined,
    }

    const header = (eyebrow ||
        title ||
        subtitle ||
        leadingSlot ||
        trailingSlot) && (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: parseDimension(tokens.header.gap as string | number) ?? 8,
                alignSelf: 'stretch',
                justifyContent: centered ? 'center' : 'flex-start',
            }}
        >
            {leadingSlot}
            <View
                style={{
                    flexShrink: 1,
                    flexGrow: 1,
                    alignItems: centered ? 'center' : 'flex-start',
                }}
            >
                {eyebrow ? (
                    <TokenText t={tokens.header.eyebrow} text={eyebrow} />
                ) : null}
                {title ? (
                    <TokenText
                        t={tokens.header.title}
                        text={title}
                        numberOfLines={truncateTitle ? 1 : undefined}
                    />
                ) : null}
                {subtitle ? (
                    <TokenText t={tokens.header.subtitle} text={subtitle} />
                ) : null}
            </View>
            {trailingSlot}
        </View>
    )

    const body = (description || children) && (
        <View
            style={{
                gap: parseDimension(tokens.body.gap as string | number) ?? 8,
                alignSelf: 'stretch',
                alignItems: centered ? 'center' : 'flex-start',
            }}
        >
            {description ? (
                <TokenText t={tokens.body.description} text={description} />
            ) : null}
            {children}
        </View>
    )

    const horizontal = orientation === CardV2Orientation.HORIZONTAL
    const mediaGap =
        parseDimension(
            tokens.layout.mediaGap[horizontal ? 'horizontal' : 'vertical'] as
                | string
                | number
        ) ?? 12

    const inner = (
        <>
            {header}
            {body}
            {actions ? (
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignSelf: 'stretch',
                        gap:
                            parseDimension(
                                tokens.actions.gap as string | number
                            ) ?? 8,
                        justifyContent: centered ? 'center' : 'flex-start',
                    }}
                >
                    {actions}
                </View>
            ) : null}
            {footer ? (
                <View
                    style={{
                        alignSelf: 'stretch',
                        gap:
                            parseDimension(
                                tokens.footer.gap as string | number
                            ) ?? 8,
                        paddingTop:
                            parseDimension(
                                tokens.footer.paddingTop as string | number
                            ) ?? 8,
                        borderTopWidth: parseBorder(
                            String(tokens.footer.borderTop)
                        ).borderWidth,
                        borderTopColor: parseBorder(
                            String(tokens.footer.borderTop)
                        ).borderColor,
                    }}
                >
                    {footer}
                </View>
            ) : null}
        </>
    )

    const content = !media ? (
        inner
    ) : horizontal ? (
        <View
            style={{
                flexDirection: 'row',
                gap: mediaGap,
                alignSelf: 'stretch',
            }}
        >
            <View>{media}</View>
            <View style={{ flexShrink: 1, flexGrow: 1, gap: 12 }}>{inner}</View>
        </View>
    ) : (
        <>
            <View style={{ alignSelf: 'stretch' }}>{media}</View>
            {inner}
        </>
    )

    if (skeleton?.show) {
        return (
            <Skeleton
                variant={skeleton.variant}
                shape="rounded"
                testID={testID}
            >
                <Block {...surface}>{content}</Block>
            </Skeleton>
        )
    }

    if (onPress) {
        return (
            <Pressable
                ref={ref}
                {...surface}
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel={accessibilityLabel ?? title}
                accessibilityState={{ selected }}
                testID={testID}
                style={style}
            >
                <View style={{ alignSelf: 'stretch', gap: surface.gap }}>
                    {content}
                </View>
            </Pressable>
        )
    }

    return (
        <Block
            ref={ref}
            {...surface}
            accessibilityLabel={accessibilityLabel}
            testID={testID}
            style={style}
        >
            {content}
        </Block>
    )
})

function TokenText({
    t,
    text,
    numberOfLines,
}: {
    t: {
        fontSize?: unknown
        fontWeight?: unknown
        lineHeight?: unknown
        color?: unknown
    }
    text: string
    numberOfLines?: number
}) {
    return (
        <Text
            fontSize={t.fontSize as string | number}
            fontWeight={t.fontWeight as string | number}
            lineHeight={t.lineHeight as string | number}
            color={String(t.color)}
            numberOfLines={numberOfLines}
        >
            {text}
        </Text>
    )
}

Card.displayName = 'Card'

export default Card
