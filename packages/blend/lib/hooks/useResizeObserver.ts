import { useEffect } from 'react'
export function useResizeObserver<T extends HTMLElement = HTMLElement>(
    targetRef: React.RefObject<T | null>,
    callback: (rect: DOMRectReadOnly) => void
) {
    useEffect(() => {
        const el = targetRef.current
        if (!el) return

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                callback(entry.contentRect)
            }
        })

        observer.observe(el)

        return () => observer.disconnect()
    }, [targetRef, callback])
}
