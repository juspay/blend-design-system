import { css } from 'styled-components'

const easing = 'cubic-bezier(0.16, 1, 0.3, 1)'
const duration = 500

export const modalBackdropAnimations = (isAnimatingIn: boolean) => css`
    opacity: ${isAnimatingIn ? 0.5 : 0};
    transition: opacity ${duration}ms ${easing};
    will-change: opacity;
    backface-visibility: hidden;
    transform: translateZ(0);
`

export const modalContentAnimations = (isAnimatingIn: boolean) => css`
    opacity: ${isAnimatingIn ? 1 : 0};
    transform: ${isAnimatingIn
        ? 'translate3d(0, 0, 0) scale(1)'
        : 'translate3d(0, 0, 0) scale(0.95)'};
    transition:
        opacity ${duration}ms ${easing},
        transform ${duration}ms ${easing};
    will-change: opacity, transform;
    backface-visibility: hidden;
`

export const ANIMATION_DURATION = duration
