import { useEffect, useRef, useState } from 'react'
import type { DirectoryData } from '../Directory/types'
import type {
    SidebarV2MobileNavigationItem,
    SidebarV2StateChangeType,
} from './types'
import { SidebarV2StateChange } from './types'

export const isControlledSidebarV2 = (
    isExpanded: boolean | undefined
): boolean => isExpanded !== undefined

export const getSidebarV2Status = (
    isExpanded: boolean,
    isHovering: boolean
): SidebarV2StateChangeType => {
    if (isHovering) return SidebarV2StateChange.INTERMEDIATE
    return isExpanded
        ? SidebarV2StateChange.EXPANDED
        : SidebarV2StateChange.COLLAPSED
}

export const announceSidebarV2StateChange = (isExpanded: boolean) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.style.position = 'absolute'
    announcement.style.left = '-10000px'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    announcement.textContent = `Sidebar ${isExpanded ? 'expanded' : 'collapsed'}`
    document.body.appendChild(announcement)

    setTimeout(() => {
        document.body.removeChild(announcement)
    }, 1000)
}

/**
 * Parses a CSS dimension string (e.g. "48px") to a number.
 * Returns 0 if parsing fails.
 */
const parseTopbarHeight = (value: string | number | undefined): number => {
    if (typeof value === 'number') return value
    if (!value) return 0
    const parsed = Number.parseFloat(String(value))
    return Number.isNaN(parsed) ? 0 : parsed
}

export const getTopbarV2Styles = (
    enableAutoHide: boolean,
    showTopbar: boolean,
    topbarHeight?: number | string
) => {
    if (!enableAutoHide) return {}

    const height = parseTopbarHeight(topbarHeight)

    return {
        transform: showTopbar ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
        ...(!showTopbar && height > 0 && { marginTop: -height }),
    }
}

export const getSidebarV2MobileNavigationItems = (
    directory: DirectoryData[]
): SidebarV2MobileNavigationItem[] => {
    return directory.flatMap((section) => {
        if (!section.items?.length) return []

        return section.items
            .filter((item) => item.showOnMobile)
            .map((item) => ({
                ...item,
                sectionLabel: section.label,
            }))
    })
}

export const useTopbarV2AutoHide = (enableTopbarAutoHide: boolean) => {
    // Kept intentionally aligned with existing Sidebar behavior
    // (query by `[data-main-content]` to avoid window scroll coupling).
    const [showTopbar, setShowTopbar] = useState(true)
    const lastScrollYRef = useRef(0)

    useEffect(() => {
        if (!enableTopbarAutoHide) {
            setShowTopbar(true)
            return
        }

        const mainContentContainer = document.querySelector(
            '[data-main-content]'
        ) as HTMLElement | null
        if (!mainContentContainer) return

        const handleScroll = () => {
            const currentScrollY = mainContentContainer.scrollTop

            if (
                currentScrollY > lastScrollYRef.current &&
                currentScrollY > 100
            ) {
                setShowTopbar(false)
            } else if (currentScrollY < lastScrollYRef.current) {
                setShowTopbar(true)
            }

            lastScrollYRef.current = currentScrollY
        }

        mainContentContainer.addEventListener('scroll', handleScroll)
        return () =>
            mainContentContainer.removeEventListener('scroll', handleScroll)
    }, [enableTopbarAutoHide])

    return showTopbar
}
