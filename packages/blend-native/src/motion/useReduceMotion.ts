import { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'

/**
 * Whether the OS reduce-motion accessibility setting is on.
 *
 * The native counterpart of web's `prefers-reduced-motion` media query.
 * Overlay components pair this with `reducedMotionVariant` so every
 * animation collapses to a quick fade when the user asked for less motion.
 *
 * Starts `false` and corrects itself once the async platform query
 * resolves — the safe default, since acting on it only ever *removes*
 * motion. Subscribes to changes for the lifetime of the component.
 */
export function useReduceMotion(): boolean {
    const [reduceMotion, setReduceMotion] = useState(false)

    useEffect(() => {
        let mounted = true
        AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
            if (mounted) setReduceMotion(enabled)
        })
        const subscription = AccessibilityInfo.addEventListener(
            'reduceMotionChanged',
            setReduceMotion
        )
        return () => {
            mounted = false
            subscription.remove()
        }
    }, [])

    return reduceMotion
}

export default useReduceMotion
