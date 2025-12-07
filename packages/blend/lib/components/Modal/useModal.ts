import { useEffect, useState } from 'react'
import { getPortalContainer, cleanupPortalContainer } from './modal.utils'

const ANIMATION_DELAY = 16 // ~1 frame delay to ensure initial render
const ANIMATION_DURATION = 500

export const useModal = (isOpen: boolean, onClose: () => void) => {
    const [shouldRender, setShouldRender] = useState(false)
    const [isAnimatingIn, setIsAnimatingIn] = useState(false)
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
        null
    )

    // Single combined effect for all modal lifecycle management
    useEffect(() => {
        // Animation and portal container logic
        if (isOpen) {
            // Start rendering
            setShouldRender(true)
            setIsAnimatingIn(false)

            // Get portal container
            const container = getPortalContainer()
            setPortalContainer(container)

            // Start animation after small delay
            const animationTimer = setTimeout(() => {
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setIsAnimatingIn(true)
                    })
                })
            }, ANIMATION_DELAY)

            // Escape key handling
            const handleEscapeKey = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    onClose()
                }
            }

            document.addEventListener('keydown', handleEscapeKey)

            return () => {
                clearTimeout(animationTimer)
                document.removeEventListener('keydown', handleEscapeKey)
            }
        } else {
            // Start exit animation
            setIsAnimatingIn(false)

            // Wait for animation to complete before cleanup
            const exitTimer = setTimeout(() => {
                setShouldRender(false)
                setPortalContainer(null)
                cleanupPortalContainer()
            }, ANIMATION_DURATION)

            return () => {
                clearTimeout(exitTimer)
            }
        }
    }, [isOpen])

    return { shouldRender, isAnimatingIn, portalContainer }
}
