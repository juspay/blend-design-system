import { css } from 'styled-components'

const easing = 'cubic-bezier(0.16, 1, 0.3, 1)'

// Main dropdown content animations (side-aware with staggered timing)
export const dropdownContentAnimations = css`
    transform-origin: var(--radix-dropdown-menu-content-transform-origin);

    /* Side-aware animations with staggered timing */
    &[data-side='bottom'] {
        animation:
            fadeIn 550ms ${easing},
            slideDown 350ms ${easing};
    }
    &[data-side='bottom'][data-state='closed'] {
        animation:
            fadeOut 350ms ${easing},
            slideUp 250ms ${easing};
    }

    &[data-side='top'] {
        animation:
            fadeIn 550ms ${easing},
            slideUp 350ms ${easing};
    }
    &[data-side='top'][data-state='closed'] {
        animation:
            fadeOut 350ms ${easing},
            slideDown 250ms ${easing};
    }

    &[data-side='right'] {
        animation:
            fadeIn 550ms ${easing},
            slideRight 350ms ${easing};
    }
    &[data-side='right'][data-state='closed'] {
        animation:
            fadeOut 350ms ${easing},
            slideLeft 250ms ${easing};
    }

    &[data-side='left'] {
        animation:
            fadeIn 550ms ${easing},
            slideLeft 350ms ${easing};
    }
    &[data-side='left'][data-state='closed'] {
        animation:
            fadeOut 350ms ${easing},
            slideRight 250ms ${easing};
    }

    /* Reusable opacity keyframes */
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    /* Reusable transform keyframes */
    @keyframes slideDown {
        from {
            transform: translateY(-8px) scale(0.95);
        }
        to {
            transform: translateY(0) scale(1);
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(8px) scale(0.95);
        }
        to {
            transform: translateY(0) scale(1);
        }
    }

    @keyframes slideRight {
        from {
            transform: translateX(-8px) scale(0.95);
        }
        to {
            transform: translateX(0) scale(1);
        }
    }

    @keyframes slideLeft {
        from {
            transform: translateX(8px) scale(0.95);
        }
        to {
            transform: translateX(0) scale(1);
        }
    }
`

// Submenu animations (reuses main keyframes)
export const submenuContentAnimations = css`
    transform-origin: var(--radix-dropdown-menu-content-transform-origin);

    &[data-side='right'] {
        animation:
            fadeIn 400ms ${easing},
            slideRight 400ms ${easing};
    }
    &[data-side='right'][data-state='closed'] {
        animation:
            fadeOut 300ms ${easing},
            slideLeft 300ms ${easing};
    }

    &[data-side='left'] {
        animation:
            fadeIn 400ms ${easing},
            slideLeft 400ms ${easing};
    }
    &[data-side='left'][data-state='closed'] {
        animation:
            fadeOut 300ms ${easing},
            slideRight 300ms ${easing};
    }
`

// Hover transition for interactive elements
export const hoverTransition = css`
    transition: background-color 0.15s ease-in-out;
`
