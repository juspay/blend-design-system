import { css } from 'styled-components'

const easingIn = 'cubic-bezier(0.16, 1, 0.3, 1)'
const easingOut = 'cubic-bezier(0.4, 0, 0.2, 1)'

export const tooltipContentAnimations = css`
    transform-origin: var(--radix-tooltip-content-transform-origin);
    will-change: opacity, transform;
    backface-visibility: hidden;
    perspective: 1000px;
    transform: translateZ(0);

    /* Entry animations - side-aware, coming from the element - smooth, fast, and subtle */
    &[data-state='open'][data-side='top'],
    &[data-state='delayed-open'][data-side='top'] {
        animation: tooltip-show-top 350ms ${easingIn} forwards;
    }

    &[data-state='open'][data-side='bottom'],
    &[data-state='delayed-open'][data-side='bottom'] {
        animation: tooltip-show-bottom 350ms ${easingIn} forwards;
    }

    &[data-state='open'][data-side='left'],
    &[data-state='delayed-open'][data-side='left'] {
        animation: tooltip-show-left 350ms ${easingIn} forwards;
    }

    &[data-state='open'][data-side='right'],
    &[data-state='delayed-open'][data-side='right'] {
        animation: tooltip-show-right 350ms ${easingIn} forwards;
    }

    /* Exit animations - smoothly going back to the element - smoother to prevent lag */
    &[data-state='closed'][data-side='top'] {
        animation: tooltip-hide-top 500ms ${easingOut} forwards;
    }

    &[data-state='closed'][data-side='bottom'] {
        animation: tooltip-hide-bottom 500ms ${easingOut} forwards;
    }

    &[data-state='closed'][data-side='left'] {
        animation: tooltip-hide-left 500ms ${easingOut} forwards;
    }

    &[data-state='closed'][data-side='right'] {
        animation: tooltip-hide-right 500ms ${easingOut} forwards;
    }

    /* Top side - slides up from bottom */
    @keyframes tooltip-show-top {
        from {
            opacity: 0.8;
            transform: translate3d(0, 3px, 0) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    @keyframes tooltip-hide-top {
        from {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
        to {
            opacity: 0;
            transform: translate3d(0, 3px, 0) scale(0.98);
        }
    }

    /* Bottom side - slides down from top */
    @keyframes tooltip-show-bottom {
        from {
            opacity: 0.8;
            transform: translate3d(0, -3px, 0) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    @keyframes tooltip-hide-bottom {
        from {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
        to {
            opacity: 0;
            transform: translate3d(0, -3px, 0) scale(0.98);
        }
    }

    /* Left side - slides in from right */
    @keyframes tooltip-show-left {
        from {
            opacity: 0.8;
            transform: translate3d(3px, 0, 0) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    @keyframes tooltip-hide-left {
        from {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
        to {
            opacity: 0;
            transform: translate3d(3px, 0, 0) scale(0.98);
        }
    }

    /* Right side - slides in from left */
    @keyframes tooltip-show-right {
        from {
            opacity: 0.8;
            transform: translate3d(-3px, 0, 0) scale(0.98);
        }
        to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
    }

    @keyframes tooltip-hide-right {
        from {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
        }
        to {
            opacity: 0;
            transform: translate3d(-3px, 0, 0) scale(0.98);
        }
    }
`
