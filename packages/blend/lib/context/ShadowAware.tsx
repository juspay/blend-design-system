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
    shadowRoot?: ShadowRoot
}

const ShadowAware = ({ children, shadowRoot }: ShadowAwareProps) => {
    if (!shadowRoot) {
        return (
            <ShadowRootContext.Provider value={{ shadowRoot: null }}>
                {children}
            </ShadowRootContext.Provider>
        )
    }

    return (
        <ShadowRootContext.Provider value={{ shadowRoot }}>
            <StyleSheetManager target={shadowRoot as unknown as HTMLElement}>
                {children}
            </StyleSheetManager>
        </ShadowRootContext.Provider>
    )
}

export default ShadowAware
