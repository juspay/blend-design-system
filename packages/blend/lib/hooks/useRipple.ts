import { useCallback, useState } from 'react'

export type RippleElement = {
    id: string
    x: number
    y: number
    size: number
}

export const useRipple = () => {
    const [ripples, setRipples] = useState<RippleElement[]>([])

    const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const button = event.currentTarget
        const rect = button.getBoundingClientRect()

        const diameter = Math.max(button.clientWidth, button.clientHeight)
        const radius = diameter / 2

        const x = event.clientX - rect.left - radius
        const y = event.clientY - rect.top - radius

        const newRipple: RippleElement = {
            id: `ripple-${Date.now()}-${Math.random()}`,
            x,
            y,
            size: diameter,
        }

        setRipples((prev) => [...prev, newRipple])

        setTimeout(() => {
            setRipples((prev) =>
                prev.filter((ripple) => ripple.id !== newRipple.id)
            )
        }, 600)
    }, [])

    const clearRipples = useCallback(() => {
        setRipples([])
    }, [])

    return {
        ripples,
        createRipple,
        clearRipples,
    }
}
