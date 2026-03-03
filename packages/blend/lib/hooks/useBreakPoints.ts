import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '../breakpoints/breakPoints'

export function useBreakpoints(breakpoints = BREAKPOINTS) {
    const getLabel = (width: number) => {
        // if (width >= breakpoints["2xl"]) return "2xl";
        // if (width >= breakpoints.xl) return "xl";
        if (width >= breakpoints.lg) return 'lg'
        // if (width >= breakpoints.md) return "md";
        if (width >= breakpoints.sm) return 'sm'
        return 'lg'
    }

    const [innerWidth, setInnerWidth] = useState(() => window.innerWidth)
    const [breakPointLabel, setBreakPointLabel] = useState(() =>
        getLabel(window.innerWidth)
    )

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth
            setInnerWidth(newWidth)
            setBreakPointLabel(getLabel(newWidth))
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [breakpoints])

    return { innerWidth, breakPointLabel }
}
