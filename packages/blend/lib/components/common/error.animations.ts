import { css } from 'styled-components'

export const errorShakeAnimation = css`
    @keyframes error-shake {
        0%,
        100% {
            transform: translateX(0);
        }
        10%,
        30%,
        50%,
        70%,
        90% {
            transform: translateX(-4px);
        }
        20%,
        40%,
        60%,
        80% {
            transform: translateX(4px);
        }
    }
`

export const getErrorShakeStyle = (shouldShake: boolean) => ({
    animation: shouldShake
        ? 'error-shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)'
        : undefined,
})
