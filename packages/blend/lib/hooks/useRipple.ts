import { useCallback, useState, useRef, useEffect } from 'react'

export type RippleElement = {
    id: string
    x: number
    y: number
    size: number
}

export const useRipple = () => {
    const [ripples, setRipples] = useState<RippleElement[]>([])
    const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map())
    const isMountedRef = useRef(true)

    useEffect(() => {
        isMountedRef.current = true
        const timeouts = timeoutRefs.current
        return () => {
            isMountedRef.current = false
            // Clear all pending timeouts on unmount
            timeouts.forEach((timeout) => {
                clearTimeout(timeout)
            })
            timeouts.clear()
        }
    }, [])

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

        const timeoutId = setTimeout(() => {
            // Only update state if component is still mounted
            if (isMountedRef.current) {
                setRipples((prev) =>
                    prev.filter((ripple) => ripple.id !== newRipple.id)
                )
            }
            timeoutRefs.current.delete(newRipple.id)
        }, 600)

        timeoutRefs.current.set(newRipple.id, timeoutId)
    }, [])

    const clearRipples = useCallback(() => {
        // Clear all pending timeouts
        timeoutRefs.current.forEach((timeout) => {
            clearTimeout(timeout)
        })
        timeoutRefs.current.clear()
        setRipples([])
    }, [])

    return {
        ripples,
        createRipple,
        clearRipples,
    }
}
