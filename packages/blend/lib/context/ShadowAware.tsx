import { createContext, useContext, ReactNode } from 'react'
import { StyleSheetManager } from 'styled-components'

type ShadowRootContextType = {
    shadowRoot: ShadowRoot | null
    target: HTMLElement | null
}

const ShadowRootContext = createContext<ShadowRootContextType>({
    shadowRoot: null,
    target: null,
})

export const useShadowRoot = () => useContext(ShadowRootContext)

type ShadowAwareProps = {
    children: ReactNode
    /**
     * Target HTMLElement for styled-components to inject styles into.
     * This should be an element inside a ShadowRoot.
     */
    target: HTMLElement
}

const ShadowAware = ({ children, target }: ShadowAwareProps) => {
    // Use getRootNode() to properly detect shadow DOM even when target is nested
    // This handles cases where target is not a direct child of ShadowRoot
    const rootNode =
        typeof target.getRootNode === 'function'
            ? target.getRootNode()
            : target.parentNode

    const isInsideShadowRoot =
        typeof ShadowRoot !== 'undefined' && rootNode instanceof ShadowRoot

    if (!isInsideShadowRoot) {
        console.warn('[ShadowAware] Target element is NOT inside a ShadowRoot!')
    }

    // Get the shadow root from the target
    const shadowRoot = isInsideShadowRoot ? (rootNode as ShadowRoot) : null

    return (
        <ShadowRootContext.Provider value={{ shadowRoot, target }}>
            <StyleSheetManager target={target} disableCSSOMInjection={true}>
                {children}
            </StyleSheetManager>
        </ShadowRootContext.Provider>
    )
}

export default ShadowAware
