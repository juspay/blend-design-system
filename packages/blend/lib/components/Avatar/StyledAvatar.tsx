import styled from 'styled-components'
import type {
    StyledAvatarContainerProps,
    StyledAvatarIndicatorProps,
} from './types'
import type { AvatarTokensType } from './avatar.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

export const StyledAvatarContainer = styled.div<StyledAvatarContainerProps>`
    ${({ $hasImage, $size, $shape }) => {
        const tokens = useResponsiveTokens<AvatarTokensType>('AVATAR')
        const variant = $hasImage ? 'withImage' : 'withoutImage'

        return `
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: ${tokens.container.backgroundColor[variant].default};
            border: ${tokens.container.border[variant].default};
            width: ${tokens.container.size[$size].width};
            height: ${tokens.container.size[$size].height};
            border-radius: ${tokens.container.borderRadius[$shape]};
            font-size: ${tokens.text.fontSize[$size]}px;
            font-weight: ${tokens.text.fontWeight[$size]};
        `
    }}
`

export const StyledAvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
`

export const StyledAvatarFallback = styled.div`
    ${() => {
        const tokens = useResponsiveTokens<AvatarTokensType>('AVATAR')

        return `
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            color: ${tokens.text.color.default};
            user-select: none;
            border-radius: inherit;
            overflow: hidden;
        `
    }}
`

export const StyledAvatarIndicator = styled.span<StyledAvatarIndicatorProps>`
    ${({ $size }) => {
        const tokens = useResponsiveTokens<AvatarTokensType>('AVATAR')

        return `
            position: absolute;
            top: 0;
            right: 0;
            display: block;
            width: ${tokens.indicator.size[$size].width};
            height: ${tokens.indicator.size[$size].height};
            background-color: ${tokens.indicator.backgroundColor.online};
            border-radius: ${tokens.indicator.borderRadius};
            border: ${tokens.indicator.border.online.width} solid ${tokens.indicator.border.online.color};
            transform: translate(30%, -30%);
            z-index: 1;
            box-shadow: ${tokens.indicator.boxShadow};
        `
    }}
`

export const StyledAvatarWrapper = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
`

export const StyledAvatarLeadingSlot = styled.div`
    ${() => {
        const tokens = useResponsiveTokens<AvatarTokensType>('AVATAR')

        return `
            display: flex;
            align-items: center;
            margin-right: ${tokens.slot.spacing};
            color: ${tokens.slot.color.default};
        `
    }}
`

export const StyledAvatarTrailingSlot = styled.div`
    ${() => {
        const tokens = useResponsiveTokens<AvatarTokensType>('AVATAR')

        return `
            display: flex;
            align-items: center;
            margin-left: ${tokens.slot.spacing};
            color: ${tokens.slot.color.default};
        `
    }}
`
