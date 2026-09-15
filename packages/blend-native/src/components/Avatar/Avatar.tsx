import { forwardRef, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import type { View as RNView } from 'react-native'
import {
    AvatarV2Shape,
    AvatarV2Size,
    AvatarV2Status,
    AvatarV2StatusPosition,
    getColorFromText,
} from '@juspay/blend-design-system/node'
import type { AvatarV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import {
    parseBorder,
    parseBorderRadius,
    parseBoxShadow,
    parseDimension,
    parseSize,
} from '../../adapters/cssStringAdapter'
import Text from '../../primitives/Text'
import { Skeleton } from '../Skeleton'
import type { AvatarNativeProps } from './avatar.types'
import {
    getAvatarAccessibleLabel,
    getInitials,
    resolveStatusPosition,
} from './avatar.utils'

/**
 * Avatar — the native port of web's `AvatarV2`.
 *
 * RN `Image` with the same fallback pipeline: a load error (reset when
 * `src` changes, web parity) swaps in initials over the shared
 * hash-palette color, so both platforms render the same fallback for the
 * same name. The status dot is a token-positioned absolute view, hidden
 * from assistive tech with the status folded into the accessible name.
 */
const Avatar = forwardRef<RNView, AvatarNativeProps>(function Avatar(
    {
        src,
        alt,
        fallbackText,
        size = AvatarV2Size.MD,
        shape = AvatarV2Shape.CIRCULAR,
        status,
        leftSlot,
        rightSlot,
        skeleton,
        backgroundColor,
        width,
        height,
        onImageError,
        accessibilityLabel,
        testID,
        style,
    },
    ref
) {
    const tokens = useNativeTokens<AvatarV2TokensType>('AVATARV2')

    const [imageError, setImageError] = useState(false)
    // Retry when the source changes after a failure — web parity.
    useEffect(() => setImageError(false), [src])
    const hasImage = Boolean(src) && !imageError

    const resolvedWidth =
        parseSize(width) ??
        parseSize(tokens.container.width[size] as string | number) ??
        40
    const resolvedHeight =
        parseSize(height) ??
        parseSize(tokens.container.height[size] as string | number) ??
        40
    const radius =
        parseBorderRadius(
            tokens.container.borderRadius[shape] as string | number
        ) ?? 9999
    const radiusStyle =
        typeof radius === 'number' ? { borderRadius: radius } : radius

    const statusType = status?.type ?? AvatarV2Status.NONE
    const showStatus =
        status !== undefined && statusType !== AvatarV2Status.NONE

    const label =
        accessibilityLabel ??
        getAvatarAccessibleLabel(alt, showStatus ? statusType : undefined)

    if (skeleton?.show) {
        return (
            <Skeleton
                width={resolvedWidth}
                height={resolvedHeight}
                shape={shape === AvatarV2Shape.CIRCULAR ? 'circle' : 'rounded'}
                variant={skeleton.variant}
                testID={testID}
            />
        )
    }

    const slotted = Boolean(leftSlot || rightSlot)

    const container = (
        <View
            ref={slotted ? undefined : ref}
            accessible
            accessibilityRole="image"
            accessibilityLabel={label}
            testID={testID}
            style={[
                {
                    width: resolvedWidth,
                    height: resolvedHeight,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: hasImage
                        ? String(tokens.container.backgroundColor)
                        : (backgroundColor ??
                          getColorFromText(fallbackText ?? alt ?? '')),
                    ...radiusStyle,
                },
                slotted ? undefined : style,
            ]}
        >
            {hasImage ? (
                <Image
                    source={{ uri: src as string }}
                    resizeMode="cover"
                    onError={() => {
                        setImageError(true)
                        onImageError?.()
                    }}
                    style={{ width: '100%', height: '100%', ...radiusStyle }}
                    testID={testID ? `${testID}-image` : undefined}
                />
            ) : (
                <Text
                    fontSize={
                        tokens.container.fallbackText.fontSize[size] as
                            | string
                            | number
                    }
                    fontWeight={
                        tokens.container.fallbackText.fontWeight[size] as
                            | string
                            | number
                    }
                    color={String(tokens.container.fallbackText.color)}
                    aria-hidden
                    testID={testID ? `${testID}-fallback` : undefined}
                >
                    {getInitials(fallbackText, alt)}
                </Text>
            )}
            {showStatus && (
                <View
                    accessible={false}
                    importantForAccessibility="no-hide-descendants"
                    accessibilityElementsHidden
                    testID={testID ? `${testID}-status` : undefined}
                    style={[
                        {
                            position: 'absolute',
                            width:
                                parseDimension(
                                    tokens.container.status.width[size] as
                                        | string
                                        | number
                                ) ?? 8,
                            height:
                                parseDimension(
                                    tokens.container.status.height[size] as
                                        | string
                                        | number
                                ) ?? 8,
                            borderRadius: 9999,
                            backgroundColor: String(
                                tokens.container.status.backgroundColor[
                                    statusType
                                ]
                            ),
                            ...parseBorder(
                                String(tokens.container.status.border[size])
                            ),
                            ...(parseBoxShadow(
                                String(tokens.container.status.boxShadow)
                            ) ?? {}),
                        },
                        resolveStatusPosition(
                            tokens,
                            shape,
                            size,
                            status?.position ??
                                AvatarV2StatusPosition.BOTTOM_RIGHT
                        ),
                    ]}
                />
            )}
        </View>
    )

    if (!slotted) return container

    return (
        <View
            ref={ref}
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: parseDimension(tokens.gap as string | number) ?? 8,
                },
                style,
            ]}
        >
            {leftSlot}
            {container}
            {rightSlot}
        </View>
    )
})

Avatar.displayName = 'Avatar'

export default Avatar
