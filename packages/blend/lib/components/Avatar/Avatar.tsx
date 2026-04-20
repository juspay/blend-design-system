import { forwardRef, useState } from 'react'
import {
    type AvatarProps,
    AvatarSize,
    AvatarShape,
    AvatarOnlinePosition,
} from './types'
import { StyledAvatarImage } from './StyledAvatar'
import { getInitialsFromText, getColorFromText } from './avatarUtils'
import Block from '../Primitives/Block/Block'
import { AvatarTokensType } from './avatar.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { Skeleton } from '../Skeleton'

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    (
        {
            src,
            alt = '',
            fallback,
            size = AvatarSize.MD,
            shape = AvatarShape.CIRCULAR,
            online = false,
            onlinePosition = AvatarOnlinePosition.TOP,
            leadingSlot,
            trailingSlot,
            skeleton,
            onClick,
            ...props
        },
        ref
    ) => {
        const [imageError, setImageError] = useState(false)
        const hasImage = src && !imageError
        const shouldShowSkeleton = skeleton?.show
        const variant = hasImage ? 'withImage' : 'withoutImage'
        const tokens = useResponsiveTokens<AvatarTokensType>('AVATAR')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        const textForColor = typeof fallback === 'string' ? fallback : alt
        const initialsColor = getColorFromText(textForColor)

        const renderFallback = () => {
            if (fallback) {
                return typeof fallback === 'string'
                    ? fallback.substring(0, 2)
                    : fallback
            }

            return getInitialsFromText(alt)
        }

        const getAccessibleLabel = () => {
            const name =
                alt || (typeof fallback === 'string' ? fallback : 'Avatar')
            const statusText = online ? ', online' : ''
            return `${name}${statusText}`
        }

        const isInteractive = onClick !== undefined
        const accessibleLabel = getAccessibleLabel()

        const INDICATOR_POSITIONS = {
            sm: {
                [AvatarShape.CIRCULAR]: {
                    [AvatarSize.SM]: {
                        top: '-2px',
                        right: '-2px',
                        bottom: '0px',
                    },
                    [AvatarSize.REGULAR]: {
                        top: '-3px',
                        right: '-3px',
                        bottom: '0px',
                    },
                    [AvatarSize.MD]: {
                        top: '-3px',
                        right: '-4px',
                        bottom: '0px',
                    },
                    [AvatarSize.LG]: {
                        top: '0.2px',
                        right: '-3px',
                        bottom: '0px',
                    },
                    [AvatarSize.XL]: {
                        top: '1.167px',
                        right: '-3px',
                        bottom: '0px',
                    },
                },
                [AvatarShape.ROUNDED]: {
                    [AvatarSize.SM]: {
                        top: '-2px',
                        right: '-3px',
                        bottom: '-1px',
                    },
                    [AvatarSize.REGULAR]: {
                        top: '-2px',
                        right: '-3px',
                        bottom: '-1px',
                    },
                    [AvatarSize.MD]: {
                        top: '-3.667px',
                        right: '-5px',
                        bottom: '-3px',
                    },
                    [AvatarSize.LG]: {
                        top: '-3.111px',
                        right: '-8.222px',
                        bottom: '-3px',
                    },
                    [AvatarSize.XL]: {
                        top: '-3.111px',
                        right: '-10.222px',
                        bottom: '-4px',
                    },
                },
            },
            lg: {
                [AvatarShape.CIRCULAR]: {
                    [AvatarSize.SM]: {
                        top: '-2px',
                        right: '-2px',
                        bottom: '0px',
                    },
                    [AvatarSize.REGULAR]: {
                        top: '-3px',
                        right: '-3px',
                        bottom: '0px',
                    },
                    [AvatarSize.MD]: {
                        top: '-3px',
                        right: '-3px',
                        bottom: '0px',
                    },
                    [AvatarSize.LG]: {
                        top: '0px',
                        right: '2px',
                        bottom: '0px',
                    },
                    [AvatarSize.XL]: {
                        top: '8px',
                        right: '3px',
                        bottom: '0px',
                    },
                },
                [AvatarShape.ROUNDED]: {
                    [AvatarSize.SM]: {
                        top: '-3px',
                        right: '-3px',
                        bottom: '-3px',
                    },
                    [AvatarSize.REGULAR]: {
                        top: '-3px',
                        right: '-3px',
                        bottom: '-3px',
                    },
                    [AvatarSize.MD]: {
                        top: '-3px',
                        right: '-3px',
                        bottom: '-3px',
                    },
                    [AvatarSize.LG]: {
                        top: '-5px',
                        right: '-5px',
                        bottom: '-5px',
                    },
                    [AvatarSize.XL]: {
                        top: '-8px',
                        right: '-8px',
                        bottom: '-8px',
                    },
                },
            },
        }

        const screenSize = isSmallScreen ? 'sm' : 'lg'
        const dynamicTopPosition =
            INDICATOR_POSITIONS[screenSize][shape as AvatarShape][
                size as AvatarSize
            ]['top'] || '0'
        const dynamicRightPosition =
            INDICATOR_POSITIONS[screenSize][shape as AvatarShape][
                size as AvatarSize
            ]['right'] || '0'

        const dynamicBottomPosition =
            INDICATOR_POSITIONS[screenSize][shape as AvatarShape][
                size as AvatarSize
            ]['bottom'] || '0'

        const renderContent = () => (
            <Block
                ref={ref}
                data-avatar={alt ?? 'avatar'}
                role="img"
                aria-label={accessibleLabel}
                aria-live={online ? 'polite' : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                position="relative"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor={
                    shouldShowSkeleton
                        ? 'transparent'
                        : hasImage
                          ? tokens.container.backgroundColor[variant].default
                          : initialsColor
                }
                border={tokens.container.border[variant].default}
                width={tokens.container.size[size].width}
                height={tokens.container.size[size].height}
                borderRadius={tokens.container.borderRadius[shape]}
                fontSize={tokens.text.fontSize[size]}
                fontWeight={tokens.text.fontWeight[size]}
                cursor={isInteractive ? 'pointer' : undefined}
                onClick={onClick}
                onKeyDown={
                    isInteractive && onClick
                        ? (e: React.KeyboardEvent<HTMLDivElement>) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  // Create a synthetic mouse event for onClick handler
                                  const syntheticEvent = {
                                      ...e,
                                      currentTarget: e.currentTarget,
                                      target: e.target,
                                      button: 0,
                                      buttons: 0,
                                      clientX: 0,
                                      clientY: 0,
                                      pageX: 0,
                                      pageY: 0,
                                      screenX: 0,
                                      screenY: 0,
                                      relatedTarget: null,
                                      movementX: 0,
                                      movementY: 0,
                                      nativeEvent: e.nativeEvent,
                                      bubbles: true,
                                      cancelable: true,
                                      defaultPrevented: false,
                                      eventPhase: 0,
                                      isTrusted: false,
                                      timeStamp: Date.now(),
                                      type: 'click',
                                  } as unknown as React.MouseEvent<HTMLDivElement>
                                  onClick(syntheticEvent)
                              }
                          }
                        : undefined
                }
                {...props}
                data-status={online ? 'online' : 'offline'}
            >
                {online && !shouldShowSkeleton && (
                    <Block
                        aria-hidden="true"
                        data-avatar-indicator="true"
                        role="presentation"
                        position="absolute"
                        {...(onlinePosition === AvatarOnlinePosition.TOP && {
                            top: dynamicTopPosition,
                        })}
                        {...(onlinePosition === AvatarOnlinePosition.BOTTOM && {
                            bottom: dynamicBottomPosition,
                        })}
                        right={dynamicRightPosition}
                        display="block"
                        width={tokens.indicator.size[size].width}
                        height={tokens.indicator.size[size].height}
                        backgroundColor={
                            tokens.indicator.backgroundColor.online
                        }
                        borderRadius={tokens.indicator.borderRadius}
                        border={`${tokens.indicator.border[size].online.width} solid ${tokens.indicator.border[size].online.color}`}
                        z-index="1"
                        boxShadow={tokens.indicator.boxShadow}
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
                    <StyledAvatarImage
                        src={src}
                        alt={alt}
                        onError={() => setImageError(true)}
                        role="img"
                    />
                ) : (
                    <Block
                        aria-hidden="true"
                        data-avatar-fallback="true"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        height="100%"
                        color="#FFFFFF"
                        style={{
                            userSelect: 'none',
                        }}
                        borderRadius="inherit"
                        overflow="hidden"
                    >
                        {renderFallback()}
                    </Block>
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

        if (leadingSlot || trailingSlot) {
            return (
                <Block
                    data-avatar-wrapper="true"
                    position="relative"
                    display="inline-flex"
                    alignItems="center"
                    data-status={online ? 'online' : 'offline'}
                >
                    {leadingSlot && (
                        <Block
                            data-element="leading-slot"
                            display="flex"
                            alignItems="center"
                            marginRight={tokens.slot.spacing}
                            color={tokens.slot.color.default}
                        >
                            {leadingSlot}
                        </Block>
                    )}
                    {renderContent()}
                    {trailingSlot && (
                        <Block
                            data-element="trailing-slot"
                            display="flex"
                            alignItems="center"
                            marginLeft={tokens.slot.spacing}
                            color={tokens.slot.color.default}
                        >
                            {trailingSlot}
                        </Block>
                    )}
                </Block>
            )
        }

        // Otherwise just return the avatar
        return renderContent()
    }
)

Avatar.displayName = 'Avatar'

export default Avatar
