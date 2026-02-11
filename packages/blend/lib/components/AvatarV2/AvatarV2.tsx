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
import { VisuallyHidden } from '../../utils/accessibility'

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
            role="img"
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
            aria-hidden="true"
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

    return (
        <Block
            data-avatar-indicator="true"
            role="presentation"
            aria-hidden="true"
            position="absolute"
            {...positionStyles}
            display="block"
            width={tokens.container.status.width[size]}
            height={tokens.container.status.height[size]}
            backgroundColor={tokens.container.status.backgroundColor[status]}
            borderRadius={tokens.container.status.borderRadius}
            border={tokens.container.status.border[size]}
            boxShadow={tokens.container.status.boxShadow}
            zIndex="1"
        />
    )
}

const SlotContainer = ({
    slot,
    position,
    tokens,
}: {
    slot?: ReactElement
    position: 'leading' | 'trailing'
    tokens: AvatarV2TokensType
}) => {
    if (!slot) return null

    return (
        <Block
            data-element={`${position}-slot`}
            display="flex"
            alignItems="center"
            width={tokens.slot.width}
            height={tokens.slot.height}
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
            fallbackText,
            size = AvatarV2Size.MD,
            shape = AvatarV2Shape.CIRCLE,
            status = { type: AvatarV2Status.NONE },
            leftSlot,
            rightSlot,
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

        const tokens = useResponsiveTokens<AvatarV2TokensType>('AVATARV2')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const breakpoint: 'sm' | 'lg' = breakPointLabel === 'sm' ? 'sm' : 'lg'

        const hasImage = src && !imageError
        const shouldShowSkeleton = skeleton?.show
        const statusType = status?.type || AvatarV2Status.NONE
        const statusPosition =
            status?.position || AvatarV2StatusPosition.TOP_RIGHT

        const isInteractiveMode = isInteractive(rest.onClick)
        const accessibleLabel = getAccessibleLabel(alt, statusType)
        const ariaLiveValue = getAriaLiveValue(statusType)
        const fallbackContent = renderFallbackContent(fallbackText, alt)
        const fallbackColor = backgroundColor || getColorFromText(alt)
        const avatarVariant = hasImage
            ? AvatarV2Variant.IMAGE
            : AvatarV2Variant.TEXT

        const containerWidth = width || tokens.container.width[size]
        const containerHeight = height || tokens.container.height[size]

        const handleImageError = () => {
            setImageError(true)
            onImageError?.(new Error('Failed to load avatar image'))
        }

        const handleImageLoad = () => {
            onImageLoad?.()
        }

        const keyboardHandler = createKeyboardHandler(rest.onClick)
        const filteredProps = filterBlockedProps(rest)

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
                    tabIndex={
                        isInteractiveMode && !disabled
                            ? 0
                            : disabled
                              ? -1
                              : undefined
                    }
                    position="relative"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    width={containerWidth}
                    height={containerHeight}
                    borderRadius={tokens.container.borderRadius[shape]}
                    border={
                        hasImage
                            ? tokens.container.image.border
                            : tokens.container.fallbackText.border
                    }
                    backgroundColor={
                        shouldShowSkeleton
                            ? 'transparent'
                            : hasImage
                              ? 'transparent'
                              : fallbackColor
                    }
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
                    data-status={
                        statusType === AvatarV2Status.NONE
                            ? 'offline'
                            : statusType
                    }
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
                            textColor={tokens.container.fallbackText.color}
                        >
                            {typeof fallbackContent === 'string' ? (
                                <Text
                                    as="span"
                                    color="currentColor"
                                    fontSize={
                                        tokens.container.fallbackText.fontSize[
                                            size
                                        ]
                                    }
                                    fontWeight={
                                        tokens.container.fallbackText
                                            .fontWeight[size]
                                    }
                                    style={{
                                        lineHeight: '1',
                                        maxWidth: '100%',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {fallbackContent}
                                </Text>
                            ) : (
                                fallbackContent
                            )}
                        </AvatarFallback>
                    )}

                    <VisuallyHidden>{accessibleLabel}</VisuallyHidden>
                </Block>
            )
        }

        if (leftSlot || rightSlot) {
            return (
                <Block
                    data-avatar-wrapper="true"
                    position="relative"
                    display="inline-flex"
                    alignItems="center"
                    data-status={
                        statusType === AvatarV2Status.NONE
                            ? 'offline'
                            : statusType
                    }
                    gap={tokens.gap}
                >
                    <SlotContainer
                        slot={leftSlot}
                        position="leading"
                        tokens={tokens}
                    />
                    {renderAvatarContent()}
                    <SlotContainer
                        slot={rightSlot}
                        position="trailing"
                        tokens={tokens}
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
