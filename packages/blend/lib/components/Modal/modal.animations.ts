import { css } from 'styled-components'

const easingIn = 'cubic-bezier(0.16, 0, 0.3, 1)'
const easingOut = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
const duration = 300

export const modalBackdropAnimations = (isAnimatingIn: boolean) => css`
    opacity: ${isAnimatingIn ? 0.5 : 0};
    transition: opacity ${duration}ms ${isAnimatingIn ? easingIn : easingOut};
`

export const modalContentAnimations = (isAnimatingIn: boolean) => css`
    opacity: ${isAnimatingIn ? 1 : 0};
    transform: scale(${isAnimatingIn ? 1 : 0.97});
    transition:
        opacity ${duration}ms ${isAnimatingIn ? easingIn : easingOut},
        transform ${duration}ms ${isAnimatingIn ? easingIn : easingOut};
`

export const ANIMATION_DURATION = duration
