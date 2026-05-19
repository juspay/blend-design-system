import { useEffect, useState } from 'react'

export function useMobile(breakpoint = 500) {
    const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
        setIsMobile(mql.matches)
        const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
        mql.addEventListener('change', onChange)
        return () => mql.removeEventListener('change', onChange)
    }, [breakpoint])

    return isMobile
}
