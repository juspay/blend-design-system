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
     * Target HTMLElement for styled-components to inject styles into.
     * Use this when rendering inside a Shadow DOM.
     * The element must be inside a shadow root.
     *
     * Note: This is the actual DOM element (not the ShadowRoot itself) that
     * styled-components will use as the style injection target.
     */
    target?: HTMLElement
}

const ThemeProvider = ({
    foundationTokens = FOUNDATION_THEME,
    componentTokens = {},
    breakpoints = BREAKPOINTS,
    theme = Theme.LIGHT,
    children,
    target,
}: ThemeProviderProps) => {
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
