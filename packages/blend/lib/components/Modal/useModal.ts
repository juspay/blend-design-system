import { useEffect, useState } from 'react'
import { getPortalContainer, cleanupPortalContainer } from './modal.utils'

const ANIMATION_DURATION = 300

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

            let animationFrame2: number | null = null
            const animationFrame1 = requestAnimationFrame(() => {
                animationFrame2 = requestAnimationFrame(() => {
                    setIsAnimatingIn(true)
                })
            })

            // Escape key handling
            const handleEscapeKey = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    onClose()
                }
            }

            document.addEventListener('keydown', handleEscapeKey)

            return () => {
                cancelAnimationFrame(animationFrame1)
                if (animationFrame2 !== null) {
                    cancelAnimationFrame(animationFrame2)
                }
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
