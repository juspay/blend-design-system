import React, { forwardRef, useState, type ReactElement } from 'react'
import {
    AvatarV2Props,
    AvatarV2Size,
    AvatarV2Shape,
    AvatarV2Status,
    AvatarV2StatusPosition,
    AvatarV2Variant,
} from './avatarV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { AvatarV2TokensType } from './avatarV2.tokens'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Skeleton } from '../Skeleton'
import { filterBlockedProps } from '../../utils/prop-helpers'

import {
    getColorFromText,
    getAccessibleLabel,
    getAriaLiveValue,
    getStatusPositionStyles,
    renderFallbackContent,
    createKeyboardHandler,
    isInteractive,
} from './avatarV2.utils'

const AvatarImage = ({
    src,
    alt,
    onError,
    onLoad,
}: {
    src: string
    alt: string
    onError: () => void
    onLoad?: () => void
}) => {
    return (
        <img
            src={src}
            alt={alt}
            onError={onError}
            onLoad={onLoad}
            data-avatar-image="true"
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'inherit',
            }}
        />
    )
}

const AvatarFallback = ({
    children,
    backgroundColor,
    textColor,
}: {
    children: React.ReactNode
    backgroundColor?: string
    textColor?: string
}) => {
    return (
        <Block
            data-avatar-fallback="true"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            backgroundColor={backgroundColor}
            color={textColor}
            style={{
                userSelect: 'none',
            }}
            borderRadius="inherit"
            overflow="hidden"
        >
            {children}
        </Block>
    )
}

const StatusIndicator = ({
    status,
    position,
    size,
    shape,
    breakpoint,
    tokens,
}: {
    status: AvatarV2Status
    position: AvatarV2StatusPosition
    size: AvatarV2Size
    shape: AvatarV2Shape
    breakpoint: 'sm' | 'lg'
    tokens: AvatarV2TokensType
}) => {
    if (status === AvatarV2Status.NONE) {
        return null
    }

    const positionStyles = getStatusPositionStyles(
        position,
        size,
        shape,
        breakpoint
    )
    const indicatorSize = tokens.status.indicator.size[size]
    const indicatorBorder = tokens.status.indicator.border[size]

    return (
        <Block
            data-avatar-indicator="true"
            role="presentation"
            aria-hidden="true"
            position="absolute"
            {...positionStyles}
            display="block"
            width={indicatorSize.width}
            height={indicatorSize.height}
            backgroundColor={tokens.status.backgroundColor[status]}
            borderRadius="50%"
            border={`${indicatorBorder.width} solid ${indicatorBorder.color}`}
            boxShadow={tokens.status.shadow}
            zIndex="1"
        />
    )
}

const SlotContainer = ({
    slot,
    spacing,
    position,
}: {
    slot?: ReactElement
    spacing: string
    position: 'leading' | 'trailing'
}) => {
    if (!slot) return null

    return (
        <Block
            data-element={`${position}-slot`}
            display="flex"
            alignItems="center"
            {...(position === 'leading' && { marginRight: spacing })}
            {...(position === 'trailing' && { marginLeft: spacing })}
        >
            {slot}
        </Block>
    )
}

const AvatarV2 = forwardRef<HTMLDivElement, AvatarV2Props>(
    (
        {
            src,
            alt = '',
            fallback,
            size = AvatarV2Size.MD,
            shape = AvatarV2Shape.CIRCLE,
            status = { type: AvatarV2Status.NONE },
            leadingSlot,
            trailingSlot,
            skeleton,
            backgroundColor,
            disabled,
            onImageError,
            onImageLoad,
            width,
            height,
            ...rest
        },
        ref
    ) => {
        const [imageError, setImageError] = useState(false)
        const [_imageLoaded, setImageLoaded] = useState(false)

        const tokens = useResponsiveTokens<AvatarV2TokensType>('AVATARV2')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'
        const breakpoint: 'sm' | 'lg' = isSmallScreen ? 'sm' : 'lg'

        const hasImage = src && !imageError
        const shouldShowSkeleton = skeleton?.show
        const statusType = status?.type || AvatarV2Status.NONE
        const statusPosition =
            status?.position || AvatarV2StatusPosition.TOP_RIGHT

        const isInteractiveMode = isInteractive(rest.onClick)
        const accessibleLabel = getAccessibleLabel(alt, statusType)
        const ariaLiveValue = getAriaLiveValue(statusType)

        const fallbackContent = renderFallbackContent(fallback, alt)
        const fallbackColor = backgroundColor || getColorFromText(alt)

        const handleImageError = () => {
            setImageError(true)
            if (onImageError) {
                onImageError(new Error('Failed to load avatar image'))
            }
        }

        const handleImageLoad = () => {
            setImageLoaded(true)
            if (onImageLoad) {
                onImageLoad()
            }
        }

        const keyboardHandler = createKeyboardHandler(rest.onClick)

        const filteredProps = filterBlockedProps(rest)

        const avatarVariant = hasImage
            ? AvatarV2Variant.IMAGE
            : AvatarV2Variant.TEXT

        const containerWidth = width || tokens.container.size[size].width
        const containerHeight = height || tokens.container.size[size].height

        const renderAvatarContent = () => {
            return (
                <Block
                    ref={ref}
                    data-avatar={alt || 'avatar'}
                    data-variant={avatarVariant}
                    data-shape={shape}
                    role="img"
                    aria-label={accessibleLabel}
                    aria-live={ariaLiveValue}
                    tabIndex={isInteractiveMode ? 0 : undefined}
                    position="relative"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    width={containerWidth}
                    height={containerHeight}
                    borderRadius={tokens.container.borderRadius[shape]}
                    border={
                        hasImage ? tokens.border.image : tokens.border.fallback
                    }
                    backgroundColor={
                        shouldShowSkeleton
                            ? 'transparent'
                            : hasImage
                              ? tokens.image.backgroundColor
                              : fallbackColor
                    }
                    fontSize={tokens.typography.fontSize[size]}
                    fontWeight={tokens.typography.fontWeight[size]}
                    cursor={
                        isInteractiveMode
                            ? disabled
                                ? 'not-allowed'
                                : 'pointer'
                            : 'default'
                    }
                    opacity={disabled ? 0.5 : 1}
                    pointerEvents={disabled ? 'none' : 'auto'}
                    onClick={!disabled ? rest.onClick : undefined}
                    onKeyDown={!disabled ? keyboardHandler : undefined}
                    {...filteredProps}
                    data-status={statusType}
                >
                    {!shouldShowSkeleton && (
                        <StatusIndicator
                            status={statusType}
                            position={statusPosition}
                            size={size}
                            shape={shape}
                            breakpoint={breakpoint}
                            tokens={tokens}
                        />
                    )}

                    {shouldShowSkeleton ? (
                        <Skeleton
                            variant={skeleton?.variant || 'pulse'}
                            width="100%"
                            height="100%"
                            borderRadius={tokens.container.borderRadius[shape]}
                        />
                    ) : hasImage ? (
                        <AvatarImage
                            src={src!}
                            alt={alt}
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                        />
                    ) : (
                        <AvatarFallback
                            backgroundColor={backgroundColor || fallbackColor}
                            textColor="#FFFFFF"
                        >
                            {typeof fallbackContent === 'string' ? (
                                <Text
                                    as="span"
                                    color="currentColor"
                                    fontSize="inherit"
                                    fontWeight="inherit"
                                    lineHeight="1"
                                >
                                    {fallbackContent}
                                </Text>
                            ) : (
                                fallbackContent
                            )}
                        </AvatarFallback>
                    )}

                    <Block
                        as="span"
                        position="absolute"
                        width="1px"
                        height="1px"
                        padding={0}
                        margin="-1px"
                        overflow="hidden"
                        style={{
                            clip: 'rect(0, 0, 0, 0)',
                            clipPath: 'inset(50%)',
                            borderWidth: 0,
                        }}
                        whiteSpace="nowrap"
                        aria-hidden="true"
                    >
                        {accessibleLabel}
                    </Block>
                </Block>
            )
        }

        if (leadingSlot || trailingSlot) {
            const slotSpacing =
                typeof tokens.slot.gap === 'string'
                    ? tokens.slot.gap
                    : `${tokens.slot.gap}px`
            return (
                <Block
                    data-avatar-wrapper="true"
                    position="relative"
                    display="inline-flex"
                    alignItems="center"
                    data-status={statusType}
                >
                    <SlotContainer
                        slot={leadingSlot}
                        spacing={slotSpacing}
                        position="leading"
                    />
                    {renderAvatarContent()}
                    <SlotContainer
                        slot={trailingSlot}
                        spacing={slotSpacing}
                        position="trailing"
                    />
                </Block>
            )
        }

        return renderAvatarContent()
    }
)

AvatarV2.displayName = 'AvatarV2'

export default AvatarV2

export {
    AvatarV2Size,
    AvatarV2Shape,
    AvatarV2Status,
    AvatarV2StatusPosition,
    AvatarV2Variant,
}
