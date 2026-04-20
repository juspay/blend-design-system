import { css } from 'styled-components'
import { errorShakeAnimation } from '../../common/error.animations'

const easing = 'cubic-bezier(0.4, 0, 0.2, 1)'

export const checkboxRootAnimations = css`
    ${errorShakeAnimation}

    will-change: background-color, border-color, transform;
    transition:
        background-color 250ms ${easing},
        border-color 250ms ${easing},
        transform 200ms ${easing};
    backface-visibility: hidden;

    /* Subtle scale on hover */
    &:not([disabled]):hover {
        transform: scale(1.05);
    }

    /* Disabled state - no transform */
    &[disabled] {
        transform: scale(1);
    }

    /* Focus ring animation */
    &:focus-visible {
        animation: checkbox-focus-ring 300ms ${easing};
    }

    @keyframes checkbox-focus-ring {
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

export const checkboxIndicatorAnimations = css`
    will-change: transform, opacity;
    transform-origin: center;
    backface-visibility: hidden;

    &[data-state='checked'],
    &[data-state='indeterminate'] {
        animation: checkbox-scale-in 250ms ${easing};
    }

    &[data-state='unchecked'] {
        animation: checkbox-scale-out 200ms ${easing};
    }

    @keyframes checkbox-scale-in {
        from {
            transform: scale(0.7);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes checkbox-scale-out {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(0.7);
            opacity: 0;
        }
    }
`
