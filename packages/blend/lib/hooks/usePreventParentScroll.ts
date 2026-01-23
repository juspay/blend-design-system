import { useEffect, RefObject } from 'react'

const usePreventParentScroll = (
    isOpen: boolean,
    contentRef?: RefObject<HTMLElement | null>,
    selectors: string[] = []
): void => {
    useEffect(() => {
        if (!isOpen) return

        const handleWheel = (e: WheelEvent) => {
            const target = e.target as HTMLElement

            const allSelectors = [...selectors]

            const isInsideDropdown =
                contentRef?.current?.contains(target) ||
                allSelectors.some((selector) => target.closest(selector))
            if (isInsideDropdown) {
                e.stopPropagation()
            }
        }

        document.addEventListener('wheel', handleWheel, {
            passive: false,
            capture: true,
        })

        return () => {
            document.removeEventListener('wheel', handleWheel, {
                capture: true,
            })
        }
    }, [isOpen, contentRef, selectors])
}

export default usePreventParentScroll
