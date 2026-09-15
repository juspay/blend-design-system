import { useSyncExternalStore } from 'react'

export type SiteTheme = 'light' | 'dark'

/**
 * Reads the site's resolved theme from the `dark` class on <html>.
 *
 * That class is the site's single source of truth: it is set before first paint
 * by ThemeScript and updated by ThemeToggle. Observing it rather than owning
 * the state means this hook stays correct no matter who flips the class, and
 * requires no change to the existing toggle or FOUC script.
 */
const subscribe = (onStoreChange: () => void) => {
    const observer = new MutationObserver(onStoreChange)
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
    })
    return () => observer.disconnect()
}

const getSnapshot = (): SiteTheme =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'

// The static export has no theme at render time; the class is applied before
// first paint, so the client snapshot corrects this immediately on hydration.
const getServerSnapshot = (): SiteTheme => 'light'

export function useSiteTheme(): SiteTheme {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
