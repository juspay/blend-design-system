import { keyframes } from 'styled-components'

export const accordionDown = keyframes`
    from {
        height: 0;
    }
    to {
        height: var(--radix-accordion-content-height);
    }
`

export const accordionUp = keyframes`
    from {
        height: var(--radix-accordion-content-height);
    }
    to {
        height: 0;
    }
`

export const ACCORDION_TRANSITION =
    'height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
