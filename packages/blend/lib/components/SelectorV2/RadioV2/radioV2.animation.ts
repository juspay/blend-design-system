import { css } from 'styled-components'
import { errorShakeAnimation } from '../../common/error.animations'

const easing = 'cubic-bezier(0.4, 0, 0.2, 1)'

export const radioV2Animations = css`
    ${errorShakeAnimation}

    will-change: transform, background-color, border-color;
    transition:
        background-color 200ms ${easing},
        border-color 200ms ${easing},
        transform 200ms ${easing};

    /* Smooth inner dot animation */
    &::after {
        transform-origin: center;
    }

    /* Hover scale effect - subtle and smooth */
    &:not(:disabled):hover {
        transform: scale(1.08);
    }

    /* Disabled state - no transform */
    &:disabled {
        transform: scale(1);
    }

    /* Focus ring animation */
    &:focus-visible {
        animation: radio-focus-ring 300ms ${easing};
    }

    @keyframes radio-focus-ring {
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
export const getRadioV2ErrorShakeStyle = (shouldShake: boolean) => ({
    animation: shouldShake ? 'error-shake 0.4s ease-in-out' : undefined,
})
