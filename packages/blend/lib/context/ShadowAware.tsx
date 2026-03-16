import { createContext, useContext, ReactNode } from 'react'
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
    /**
     * Target HTMLElement for styled-components to inject styles into.
     * This should be an element inside a ShadowRoot.
     */
    target: HTMLElement
}

const ShadowAware = ({ children, target }: ShadowAwareProps) => {
    // Verify target is inside a shadow root
    const parent = target.parentNode
    const isInsideShadowRoot = parent instanceof ShadowRoot

    if (!isInsideShadowRoot) {
        console.warn('[ShadowAware] Target element is NOT inside a ShadowRoot!')
    }

    // Get the shadow root from the target
    const shadowRoot = isInsideShadowRoot ? parent : null

    return (
        <ShadowRootContext.Provider value={{ shadowRoot }}>
            <StyleSheetManager target={target}>{children}</StyleSheetManager>
        </ShadowRootContext.Provider>
    )
}

export default ShadowAware
