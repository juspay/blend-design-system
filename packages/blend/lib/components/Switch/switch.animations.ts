import { css } from 'styled-components'
import { errorShakeAnimation } from '../common/error.animations'

const easing = 'cubic-bezier(0.4, 0, 0.2, 1)'

export const switchRootAnimations = css`
    ${errorShakeAnimation}

    will-change: background-color, transform;
    transition:
        background-color 250ms ${easing},
        transform 200ms ${easing};
    backface-visibility: hidden;

    /* Subtle scale on hover */
    &:not(:disabled):hover {
        transform: scale(1.02);
    }

    /* Disabled state - no transform */
    &:disabled {
        transform: scale(1);
    }

    /* Focus ring animation */
    &:focus-visible {
        animation: switch-focus-ring 300ms ${easing};
    }

    @keyframes switch-focus-ring {
        0% {
            outline-offset: 2px;
            outline-width: 2px;
        }
        50% {
            outline-offset: 3px;
            outline-width: 3px;
        }
        100% {
            outline-offset: 2px;
            outline-width: 2px;
        }
    }
`

export const switchThumbAnimations = css`
    will-change: transform, left;
    transition:
        transform 250ms ${easing},
        left 250ms ${easing},
        background-color 200ms ${easing};
    transform-origin: center;
    backface-visibility: hidden;
`
