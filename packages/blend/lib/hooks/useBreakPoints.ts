import { useState, useEffect, useCallback } from 'react'
import { BREAKPOINTS } from '../breakpoints/breakPoints'

export function useBreakpoints(breakpoints = BREAKPOINTS) {
    const getLabel = useCallback(
        (width: number) => {
            if (width >= breakpoints.lg) return 'lg'
            if (width >= breakpoints.sm) return 'sm'
            return 'lg'
        },
        [breakpoints]
    )

    const getSafeWindowWidth = useCallback(() => {
        if (typeof window === 'undefined') {
            return breakpoints.lg
        }
        return window.innerWidth
    }, [breakpoints])

    const [innerWidth, setInnerWidth] = useState<number>(getSafeWindowWidth)
    const [breakPointLabel, setBreakPointLabel] = useState(() =>
        getLabel(getSafeWindowWidth())
    )

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined
        }

        const handleResize = () => {
            const newWidth = window.innerWidth
            setInnerWidth(newWidth)
            setBreakPointLabel(getLabel(newWidth))
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [getLabel])

    return { innerWidth, breakPointLabel }
}
