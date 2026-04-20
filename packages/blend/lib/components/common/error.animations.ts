import { css } from 'styled-components'

export const errorShakeAnimation = css`
    @keyframes error-shake {
        0% {
            transform: translateX(0);
        }
        20% {
            transform: translateX(-3px);
        }
        40% {
            transform: translateX(3px);
        }
        60% {
            transform: translateX(-2px);
        }
        80% {
            transform: translateX(2px);
        }
        100% {
            transform: translateX(0);
        }
    }
`

export const getErrorShakeStyle = (shouldShake: boolean) => ({
    animation: shouldShake ? 'error-shake 0.4s ease-in-out' : undefined,
})
