import { BREAKPOINTS, type BreakpointType } from '../breakpoints/breakPoints'
import { FOUNDATION_THEME, type ThemeType } from '../tokens'
import initTokens from './initComponentTokens'
import ThemeContext, { type ComponentTokenType } from './ThemeContext'
import { Theme } from './theme.enum'
import { AutofillStyles } from '../components/Inputs/AutofillStyles/AutofillStyles'
import ShadowAware from './ShadowAware'

type ThemeProviderProps = {
    foundationTokens?: ThemeType
    componentTokens?: ComponentTokenType
    breakpoints?: BreakpointType
    theme?: Theme | string
    children: React.ReactNode
    /**
     * Target element for styled-components to inject styles into.
     * Use this when rendering inside a Shadow DOM.
     * The element should be inside a shadow root.
     */
    target?: HTMLElement
    /**
     * @deprecated Use `target` prop instead.
     */
    shadowRoot?: ShadowRoot
    /**
     * @deprecated Use `target` prop instead.
     */
    autoShadowDetection?: boolean
}

const ThemeProvider = ({
    foundationTokens = FOUNDATION_THEME,
    componentTokens = {},
    breakpoints = BREAKPOINTS,
    theme = Theme.LIGHT,
    children,
    target,
    shadowRoot,
    autoShadowDetection,
}: ThemeProviderProps) => {
    // Warn about deprecated props
    if (autoShadowDetection !== undefined) {
        console.warn(
            '[ThemeProvider] autoShadowDetection is deprecated. Use target prop instead.'
        )
    }
    if (shadowRoot !== undefined) {
        console.warn(
            '[ThemeProvider] shadowRoot is deprecated. Use target prop instead.'
        )
    }

    const defaultThemeContextValue = {
        foundationTokens,
        componentTokens: initTokens(componentTokens, foundationTokens, theme),
        breakpoints,
        theme,
    }

    const content = (
        <>
            <AutofillStyles />
            {children}
        </>
    )

    return (
        <ThemeContext.Provider value={defaultThemeContextValue}>
            {target ? (
                <ShadowAware target={target}>{content}</ShadowAware>
            ) : (
                content
            )}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
