import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type DependencyList,
} from 'react'
import { useResizeObserver } from './useResizeObserver'

export type UseTruncationDetectionOptions = {
    disabled?: boolean
    deps?: DependencyList
}

export default function useTruncationDetection(
    elementRef: React.RefObject<HTMLElement>,
    selector?: string,
    options: UseTruncationDetectionOptions = {}
): boolean {
    const { disabled = false, deps = [] } = options
    const [isTruncated, setIsTruncated] = useState(false)
    const rafRef = useRef<number | null>(null)

    const checkTruncation = useCallback(() => {
        if (disabled) {
            setIsTruncated(false)
            return
        }

        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
        }

        rafRef.current = requestAnimationFrame(() => {
            const container = elementRef.current
            if (!container) {
                setIsTruncated(false)
                return
            }

            const targetElement = selector
                ? (container.querySelector(selector) as HTMLElement | null)
                : container

            if (!targetElement) {
                setIsTruncated(false)
                return
            }

            const truncated =
                targetElement.scrollWidth > targetElement.clientWidth &&
                targetElement.clientWidth > 0

            setIsTruncated(truncated)
            rafRef.current = null
        })
    }, [elementRef, selector, disabled])

    useResizeObserver(elementRef, () => {
        if (!disabled) {
            checkTruncation()
        }
    })

    useEffect(() => {
        if (disabled) {
            setIsTruncated(false)
            return
        }

        checkTruncation()
        const handleResize = () => checkTruncation()
        window.addEventListener('resize', handleResize, { passive: true })

        return () => {
            window.removeEventListener('resize', handleResize)
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- deps is intentionally spread to allow custom dependencies
    }, [disabled, checkTruncation, ...deps])

    return isTruncated
}
