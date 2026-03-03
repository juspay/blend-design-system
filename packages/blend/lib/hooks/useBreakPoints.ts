import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '../breakpoints/breakPoints'

export function useBreakpoints(breakpoints = BREAKPOINTS) {
    const getLabel = (width: number) => {
        if (width >= breakpoints.lg) return 'lg'
        if (width >= breakpoints.sm) return 'sm'
        return 'lg'
    }

    const getRootWindow = () => {
        if (typeof window === 'undefined') return null

        try {
            return window.top && window.top !== window ? window.top : window
        } catch {
            return window
        }
    }

    const getViewportWidth = () => {
        const root = getRootWindow()
        if (!root) return breakpoints.lg
        return root.innerWidth
    }

    const [innerWidth, setInnerWidth] = useState(() => getViewportWidth())
    const [breakPointLabel, setBreakPointLabel] = useState(() =>
        getLabel(getViewportWidth())
    )

    useEffect(() => {
        const root = getRootWindow()
        if (!root) return

        const handleResize = () => {
            const newWidth = root.innerWidth
            setInnerWidth(newWidth)
            setBreakPointLabel(getLabel(newWidth))
        }

        root.addEventListener('resize', handleResize)

        return () => root.removeEventListener('resize', handleResize)
    }, [breakpoints])

    return { innerWidth, breakPointLabel }
}
