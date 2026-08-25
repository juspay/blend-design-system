import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useState,
} from 'react'
import { StyleSheet, View } from 'react-native'

/**
 * Portal — layered rendering above the app's content.
 *
 * The native replacement for web's `createPortal`/Radix `Portal`: overlay
 * components (modal, menu, popover, tooltip, snackbar) mount their surface
 * through `<Portal>` and it renders in an absolute-fill layer that
 * `BlendNativeProvider` places *after* the app's children, so it paints on
 * top regardless of where in the tree the overlay was opened.
 *
 * Layers stack in mount order — the overlay opened last paints on top,
 * which matches how web portals appended to `document.body` behave.
 *
 * The provider must sit at a screen-filling root (the usual place for a
 * theme provider): the layers are absolutely positioned siblings of the
 * app's children, so they cover exactly what the provider's parent covers.
 *
 * With no provider mounted, `<Portal>` renders its children in place — an
 * overlay degrades to inline rendering rather than disappearing.
 */

type PortalNode = { key: string; node: React.ReactNode }

type PortalRegistry = {
    mount: (key: string, node: React.ReactNode) => void
    unmount: (key: string) => void
}

const PortalRegistryContext = createContext<PortalRegistry | null>(null)

let warnedNoProvider = false

export type PortalProps = { children?: React.ReactNode }

/** Renders `children` into the provider's overlay layer. */
export function Portal({ children }: PortalProps) {
    const registry = useContext(PortalRegistryContext)
    const key = useId()

    useEffect(() => {
        if (!registry) return
        registry.mount(key, children)
        return () => registry.unmount(key)
    }, [registry, key, children])

    // In an effect, not during render — warning inline would be a
    // render-phase side effect (breaks under StrictMode double-render, the
    // same class of bug Pressable's parse memoisation fixed).
    useEffect(() => {
        if (registry || warnedNoProvider) return
        if (typeof __DEV__ !== 'undefined' && __DEV__) {
            warnedNoProvider = true
            console.warn(
                '[blend-native] <Portal> used without BlendNativeProvider — ' +
                    'rendering inline. Overlays will not layer above the app.'
            )
        }
    }, [registry])

    if (!registry) return <>{children}</>

    return null
}

Portal.displayName = 'Portal'

/**
 * Internal — wraps the app's children with the portal registry and renders
 * the mounted layers after them. Used by `BlendNativeProvider`; not public.
 */
export function PortalArea({ children }: { children?: React.ReactNode }) {
    const [portals, setPortals] = useState<PortalNode[]>([])

    const mount = useCallback((key: string, node: React.ReactNode) => {
        setPortals((current) => {
            const existing = current.findIndex((p) => p.key === key)
            if (existing === -1) return [...current, { key, node }]
            // Re-mount with new content keeps its layer position.
            const next = current.slice()
            next[existing] = { key, node }
            return next
        })
    }, [])

    const unmount = useCallback((key: string) => {
        setPortals((current) => current.filter((p) => p.key !== key))
    }, [])

    const registry = useMemo<PortalRegistry>(
        () => ({ mount, unmount }),
        [mount, unmount]
    )

    return (
        <PortalRegistryContext.Provider value={registry}>
            {children}
            {portals.map(({ key, node }) => (
                <View
                    key={key}
                    style={StyleSheet.absoluteFill}
                    // Touches fall through empty layer area to the app;
                    // the overlay's own views still receive theirs.
                    pointerEvents="box-none"
                >
                    {node}
                </View>
            ))}
        </PortalRegistryContext.Provider>
    )
}

PortalArea.displayName = 'PortalArea'
