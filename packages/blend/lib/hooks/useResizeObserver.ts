import { useEffect, useRef } from 'react'

export function useResizeObserver<T extends HTMLElement = HTMLElement>(
    targetRef: React.RefObject<T | null>,
    callback: (rect: DOMRectReadOnly) => void
) {
    // Keep the latest callback in a ref so the observer is never disconnected
    // and reconnected just because the callback function changed identity
    // (e.g. when callers pass an inline/non-memoized function).
    const callbackRef = useRef(callback)
    callbackRef.current = callback

    useEffect(() => {
        const el = targetRef.current
        if (!el) return

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                callbackRef.current(entry.contentRect)
            }
        })

        observer.observe(el)

        return () => observer.disconnect()
        // Key the effect on the actual element rather than the ref object so
        // that the observer is reattached whenever the target element is
        // replaced (e.g. after a conditional unmount/remount).
        // The callback is intentionally omitted from deps because it is kept
        // current via callbackRef above.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetRef.current])
}
