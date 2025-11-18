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
            ...props
        },
        ref
    ) => {
        const [imageError, setImageError] = useState(false)
        const hasImage = src && !imageError
        const variant = hasImage ? 'withImage' : 'withoutImage'
        const tokens = useResponsiveTokens<AvatarTokensType>('AVATAR')
        const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
        const isSmallScreen = breakPointLabel === 'sm'

        // Get color based on first letter for initials
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

        // Position maps for online indicator
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
                data-avatar="true"
                data-avatar-size={size}
                data-avatar-shape={shape}
                data-avatar-online={online}
                data-avatar-has-image={!!hasImage}
                position="relative"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor={
                    hasImage
                        ? tokens.container.backgroundColor[variant].default
                        : initialsColor
                }
                border={tokens.container.border[variant].default}
                width={tokens.container.size[size].width}
                height={tokens.container.size[size].height}
                borderRadius={tokens.container.borderRadius[shape]}
                fontSize={tokens.text.fontSize[size]}
                fontWeight={tokens.text.fontWeight[size]}
                {...props}
            >
                {online && (
                    <Block
                        aria-hidden="true"
                        data-avatar-indicator="true"
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

                {hasImage ? (
                    <StyledAvatarImage
                        src={src}
                        alt={alt}
                        onError={() => setImageError(true)}
                        data-avatar-image="true"
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

                {/* Visually hidden text for screen readers */}
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
                        borderWidth: 0,
                    }}
                    whiteSpace="nowrap"
                >
                    {alt}
                </Block>
            </Block>
        )

        // If we have slots, use the wrapper
        if (leadingSlot || trailingSlot) {
            return (
                <Block
                    data-avatar-wrapper="true"
                    position="relative"
                    display="inline-flex"
                    alignItems="center"
                >
                    {leadingSlot && (
                        <Block
                            data-avatar-slot="leading"
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
                            data-avatar-slot="trailing"
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
