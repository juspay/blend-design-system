import { useEffect, useRef } from 'react'
import { AccessibilityInfo, Platform } from 'react-native'

/**
 * Announce a status message to assistive tech.
 *
 * Web expresses this declaratively with `aria-live` + `aria-atomic`. React
 * Native splits it across platforms:
 *
 * - **Android** understands `accessibilityLiveRegion` on the view itself, so
 *   callers set that prop directly and this hook stays out of the way.
 * - **iOS** has no live-region support. The only route is to hand the exact
 *   string to `announceForAccessibility`, which is what this does.
 *
 * Re-announces when the message changes, and skips repeats of the same string
 * so a parent re-render does not interrupt the user twice with the same text.
 */
export function useLiveRegionAnnounce(
    message: string | undefined,
    enabled = true
): void {
    const lastAnnounced = useRef<string | undefined>(undefined)

    useEffect(() => {
        if (!enabled || !message) return
        // Android already announces via accessibilityLiveRegion; announcing
        // again here would read the alert twice.
        if (Platform.OS !== 'ios') return
        if (lastAnnounced.current === message) return

        lastAnnounced.current = message
        AccessibilityInfo.announceForAccessibility(message)
    }, [message, enabled])
}

export default useLiveRegionAnnounce
