import { useEffect, useState } from 'react'
import { BREAKPOINTS } from '../breakpoints/breakPoints'

export function useBreakpoints(breakpoints = BREAKPOINTS) {
    const getRootWindow = () => {
        if (typeof window === 'undefined') return null

        try {
            return window.top && window.top !== window ? window.top : window
        } catch {
            return window
        }
    }

    const getInitialLabel = () => {
        const root = getRootWindow()
        if (!root) return 'lg'

        return root.matchMedia(`(min-width: ${breakpoints.lg}px)`).matches
            ? 'lg'
            : 'sm'
    }

    const [breakPointLabel, setBreakPointLabel] = useState<'sm' | 'lg'>(
        getInitialLabel
    )

    useEffect(() => {
        const root = getRootWindow()
        if (!root) return

        const mediaQuery = root.matchMedia(`(min-width: ${breakpoints.lg}px)`)

        const handleChange = (event: MediaQueryListEvent) => {
            setBreakPointLabel(event.matches ? 'lg' : 'sm')
        }

        setBreakPointLabel(mediaQuery.matches ? 'lg' : 'sm')

        mediaQuery.addEventListener('change', handleChange)

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [breakpoints.lg])

    return { breakPointLabel }
}
