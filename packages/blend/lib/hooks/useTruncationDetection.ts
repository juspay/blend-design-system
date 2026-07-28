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

const DEBOUNCE_MS = 100

export default function useTruncationDetection<
    T extends HTMLElement = HTMLElement,
>(
    elementRef: React.RefObject<T | null>,
    selector?: string,
    options: UseTruncationDetectionOptions = {}
): boolean {
    const { disabled = false, deps = [] } = options
    const [isTruncated, setIsTruncated] = useState(false)
    const rafRef = useRef<number | null>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const runTruncationCheck = useCallback(() => {
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
    }, [elementRef, selector])

    const checkTruncation = useCallback(() => {
        if (disabled) {
            setIsTruncated(false)
            return
        }
        runTruncationCheck()
    }, [disabled, runTruncationCheck])

    const debouncedCheckTruncation = useCallback(() => {
        if (disabled) {
            setIsTruncated(false)
            return
        }

        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(() => {
            runTruncationCheck()
            debounceRef.current = null
        }, DEBOUNCE_MS)
    }, [disabled, runTruncationCheck])

    useResizeObserver(elementRef, () => {
        if (!disabled) {
            debouncedCheckTruncation()
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
            if (debounceRef.current !== null) {
                clearTimeout(debounceRef.current)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- deps is intentionally spread to allow custom dependencies
    }, [disabled, checkTruncation, ...deps])

    return isTruncated
}
