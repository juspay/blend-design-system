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
 * which matches how web portals appended to `document.body` behave. A layer
 * can opt out of that with `priority`: higher-priority layers always paint
 * above lower ones regardless of mount order (the toast/snackbar stack uses
 * this so a sheet opened after a toast cannot cover it). Equal priorities
 * keep mount order — the sort is stable.
 *
 * The provider must sit at a screen-filling root (the usual place for a
 * theme provider): the layers are absolutely positioned siblings of the
 * app's children, so they cover exactly what the provider's parent covers.
 *
 * With no provider mounted, `<Portal>` renders its children in place — an
 * overlay degrades to inline rendering rather than disappearing.
 */

type PortalNode = {
    key: string
    node: React.ReactNode
    priority: number
    modal: boolean
}

type PortalRegistry = {
    mount: (
        key: string,
        node: React.ReactNode,
        priority?: number,
        modal?: boolean
    ) => void
    unmount: (key: string) => void
}

const PortalRegistryContext = createContext<PortalRegistry | null>(null)

let warnedNoProvider = false

export type PortalProps = {
    children?: React.ReactNode
    /** Paint above lower-priority layers regardless of mount order. */
    priority?: number
    /**
     * Hide everything painted below this layer from assistive tech while it
     * is mounted: the app's content and every lower layer get
     * `importantForAccessibility="no-hide-descendants"` (TalkBack) and
     * `accessibilityElementsHidden` (VoiceOver). iOS's
     * `accessibilityViewIsModal` only fences siblings; this is the pair that
     * actually works on Android. The topmost modal layer wins.
     */
    modal?: boolean
}

/** Renders `children` into the provider's overlay layer. */
export function Portal({ children, priority = 0, modal = false }: PortalProps) {
    const registry = useContext(PortalRegistryContext)
    const key = useId()

    useEffect(() => {
        if (!registry) return
        registry.mount(key, children, priority, modal)
        return () => registry.unmount(key)
    }, [registry, key, children, priority, modal])

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

    const mount = useCallback(
        (key: string, node: React.ReactNode, priority = 0, modal = false) => {
            setPortals((current) => {
                const existing = current.findIndex((p) => p.key === key)
                if (existing === -1) {
                    return [...current, { key, node, priority, modal }]
                }
                // Re-mount with new content keeps its layer position.
                const next = current.slice()
                next[existing] = { key, node, priority, modal }
                return next
            })
        },
        []
    )

    const unmount = useCallback((key: string) => {
        setPortals((current) => current.filter((p) => p.key !== key))
    }, [])

    const registry = useMemo<PortalRegistry>(
        () => ({ mount, unmount }),
        [mount, unmount]
    )

    // Stable sort: higher priority paints later (on top); equal priorities
    // keep mount order, preserving the last-opened-on-top behaviour.
    const ordered = [...portals].sort((a, b) => a.priority - b.priority)

    // The topmost modal layer hides the app content and every layer painted
    // below it from assistive tech; layers above it (e.g. the toast stack at
    // its higher priority) stay reachable.
    let topModalIndex = -1
    for (let i = ordered.length - 1; i >= 0; i -= 1) {
        if (ordered[i].modal) {
            topModalIndex = i
            break
        }
    }
    const hideApp = topModalIndex >= 0

    return (
        <PortalRegistryContext.Provider value={registry}>
            <View
                style={styles.appContent}
                collapsable={false}
                importantForAccessibility={
                    hideApp ? 'no-hide-descendants' : 'auto'
                }
                accessibilityElementsHidden={hideApp}
            >
                {children}
            </View>
            {ordered.map(({ key, node }, index) => {
                const hidden = index < topModalIndex
                return (
                    <View
                        key={key}
                        style={StyleSheet.absoluteFill}
                        // Touches fall through empty layer area to the app;
                        // the overlay's own views still receive theirs.
                        pointerEvents="box-none"
                        importantForAccessibility={
                            hidden ? 'no-hide-descendants' : 'auto'
                        }
                        accessibilityElementsHidden={hidden}
                    >
                        {node}
                    </View>
                )
            })}
        </PortalRegistryContext.Provider>
    )
}

const styles = StyleSheet.create({
    // The provider sits at a screen-filling root (its documented contract),
    // so the app content wrapper fills it; a wrapper View is what the
    // modality a11y props need to hang on.
    appContent: { flex: 1 },
})

PortalArea.displayName = 'PortalArea'
