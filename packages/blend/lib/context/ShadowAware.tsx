import {
    createContext,
    useContext,
    ReactNode,
    useRef,
    useState,
    useEffect,
} from 'react'
import { StyleSheetManager } from 'styled-components'

interface ShadowRootContextType {
    shadowRoot: ShadowRoot | null
}

const ShadowRootContext = createContext<ShadowRootContextType>({
    shadowRoot: null,
})

export const useShadowRoot = () => useContext(ShadowRootContext)

interface ShadowAwareProps {
    children: ReactNode
    shadowRoot?: ShadowRoot
    /**
     * When true, automatically detects if the component is rendered inside a Shadow DOM.
     * If detected, styles will be injected into the Shadow Root instead of document.head.
     * @default true
     */
    autoDetect?: boolean
}

const ShadowAware = ({
    children,
    shadowRoot: providedShadowRoot,
    autoDetect = true,
}: ShadowAwareProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [detectedShadowRoot, setDetectedShadowRoot] =
        useState<ShadowRoot | null>(null)

    useEffect(() => {
        // If shadowRoot is explicitly provided, use that
        if (providedShadowRoot || !autoDetect) return

        // Auto-detect shadow root from container element
        if (containerRef.current) {
            const root = containerRef.current.getRootNode()
            if (root instanceof ShadowRoot) {
                setDetectedShadowRoot(root)
            }
        }
    }, [providedShadowRoot, autoDetect])

    // Use provided shadowRoot or auto-detected one
    const effectiveShadowRoot = providedShadowRoot || detectedShadowRoot

    const content = (
        <ShadowRootContext.Provider value={{ shadowRoot: effectiveShadowRoot }}>
            {children}
        </ShadowRootContext.Provider>
    )

    // If we need to auto-detect and don't have an explicit shadowRoot,
    // wrap in a detection container
    if (!providedShadowRoot && autoDetect) {
        return (
            <div ref={containerRef} style={{ display: 'contents' }}>
                {effectiveShadowRoot ? (
                    <StyleSheetManager
                        target={effectiveShadowRoot as unknown as HTMLElement}
                    >
                        {content}
                    </StyleSheetManager>
                ) : (
                    content
                )}
            </div>
        )
    }

    // If explicit shadowRoot provided, use it directly
    if (effectiveShadowRoot) {
        return (
            <ShadowRootContext.Provider
                value={{ shadowRoot: effectiveShadowRoot }}
            >
                <StyleSheetManager
                    target={effectiveShadowRoot as unknown as HTMLElement}
                >
                    {children}
                </StyleSheetManager>
            </ShadowRootContext.Provider>
        )
    }

    // No shadow root, render normally
    return (
        <ShadowRootContext.Provider value={{ shadowRoot: null }}>
            {children}
        </ShadowRootContext.Provider>
    )
}

export default ShadowAware
