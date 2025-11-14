import { css } from 'styled-components'

const easing = 'cubic-bezier(0.16, 1, 0.3, 1)'

export const popoverContentAnimations = css`
    transform-origin: var(--radix-popper-transform-origin);
    will-change: opacity, transform;

    &[data-state='open'] {
        animation: popover-show 350ms ${easing};
    }

    &[data-state='closed'] {
        animation: popover-hide 300ms ${easing};
    }

    @keyframes popover-show {
        0% {
            opacity: 0;
            transform: translateY(6px) scale(0.96);
        }
        60% {
            opacity: 1;
            transform: translateY(-2px) scale(1.01);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes popover-hide {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(4px) scale(0.96);
        }
    }
`
