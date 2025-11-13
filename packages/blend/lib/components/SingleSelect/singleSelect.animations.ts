import { css } from 'styled-components'

const easing = 'cubic-bezier(0.16, 1, 0.3, 1)'

// Main dropdown content animations
export const dropdownContentAnimations = css`
    transform-origin: var(--radix-dropdown-menu-content-transform-origin);

    &[data-side='bottom'][data-state='open'] {
        animation: slideInFromTop 400ms ${easing};
    }
    &[data-side='bottom'][data-state='closed'] {
        animation: slideOutToTop 300ms ${easing};
    }

    &[data-side='top'][data-state='open'] {
        animation: slideInFromBottom 400ms ${easing};
    }
    &[data-side='top'][data-state='closed'] {
        animation: slideOutToBottom 300ms ${easing};
    }

    &[data-side='right'][data-state='open'] {
        animation: slideInFromLeft 400ms ${easing};
    }
    &[data-side='right'][data-state='closed'] {
        animation: slideOutToLeft 300ms ${easing};
    }

    &[data-side='left'][data-state='open'] {
        animation: slideInFromRight 400ms ${easing};
    }
    &[data-side='left'][data-state='closed'] {
        animation: slideOutToRight 300ms ${easing};
    }

    /* Shadcn-style keyframes with zoom + slide + fade */
    @keyframes slideInFromTop {
        from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes slideOutToTop {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
        }
    }

    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(8px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes slideOutToBottom {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(8px) scale(0.95);
        }
    }

    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-8px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
    }

    @keyframes slideOutToLeft {
        from {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateX(-8px) scale(0.95);
        }
    }

    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(8px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
    }

    @keyframes slideOutToRight {
        from {
            opacity: 1;
            transform: translateX(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateX(8px) scale(0.95);
        }
    }
`

// Submenu animations
export const submenuContentAnimations = css`
    transform-origin: var(--radix-dropdown-menu-content-transform-origin);

    &[data-side='right'][data-state='open'] {
        animation: slideInFromLeft 400ms ${easing};
    }
    &[data-side='right'][data-state='closed'] {
        animation: slideOutToLeft 300ms ${easing};
    }

    &[data-side='left'][data-state='open'] {
        animation: slideInFromRight 400ms ${easing};
    }
    &[data-side='left'][data-state='closed'] {
        animation: slideOutToRight 300ms ${easing};
    }
`

// Hover transition for interactive elements
export const hoverTransition = css`
    transition: background-color 0.15s ease-in-out;
`
