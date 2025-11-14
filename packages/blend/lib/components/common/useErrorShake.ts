import { useState, useEffect } from 'react'

/**
 * Hook to manage error shake animation state
 * @param error - Whether the component is in an error state
 * @returns shouldShake - Boolean indicating if shake animation should be active
 */
export const useErrorShake = (error: boolean): boolean => {
    const [shouldShake, setShouldShake] = useState(false)

    useEffect(() => {
        if (error) {
            setShouldShake(true)
            const timer = setTimeout(() => setShouldShake(false), 400)
            return () => clearTimeout(timer)
        }
    }, [error])

    return shouldShake
}
