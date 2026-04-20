import { keyframes } from 'styled-components'

export const accordionDown = keyframes`
    from {
        height: 0;
        opacity: 0;
    }
    to {
        height: var(--radix-accordion-content-height);
        opacity: 1;
    }
`

export const accordionUp = keyframes`
    from {
        height: var(--radix-accordion-content-height);
        opacity: 1;
    }
    to {
        height: 0;
        opacity: 0;
    }
`

export const ACCORDION_TRANSITION =
    'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
