import { css } from 'styled-components'

const easing = 'cubic-bezier(0.22, 1, 0.36, 1)'

export const popoverContentAnimations = css`
    transform-origin: var(--radix-popper-transform-origin);
    will-change: opacity, transform;

    &[data-state='open'] {
        animation: popover-show 550ms ${easing};
    }

    &[data-state='closed'] {
        animation: popover-hide 450ms ${easing};
    }

    @keyframes popover-show {
        0% {
            opacity: 0;
            transform: translateY(16px) scale(0.88);
        }
        50% {
            opacity: 0.8;
            transform: translateY(-4px) scale(1.02);
        }
        75% {
            opacity: 0.95;
            transform: translateY(1px) scale(0.99);
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
            transform: translateY(12px) scale(0.9);
        }
    }
`
