import { useMemo } from 'react'
import { BREAKPOINTS, type BreakpointType } from '../breakpoints/breakPoints'
import { FOUNDATION_THEME, type ThemeType } from '../tokens'
import initTokens from './initComponentTokens'
import ThemeContext, { type ComponentTokenType } from './ThemeContext'
import { Theme } from './theme.enum'
import { AutofillStyles } from '../components/Inputs/AutofillStyles/AutofillStyles'
import ShadowAware from './ShadowAware'

const EMPTY_COMPONENT_TOKENS: ComponentTokenType = {}

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
    componentTokens = EMPTY_COMPONENT_TOKENS,
    breakpoints = BREAKPOINTS,
    theme = Theme.LIGHT,
    children,
    target,
}: ThemeProviderProps) => {
    const resolvedComponentTokens = useMemo(
        () => initTokens(componentTokens, foundationTokens, theme),
        [componentTokens, foundationTokens, theme]
    )

    const themeContextValue = useMemo(
        () => ({
            foundationTokens,
            componentTokens: resolvedComponentTokens,
            breakpoints,
            theme,
        }),
        [foundationTokens, resolvedComponentTokens, breakpoints, theme]
    )

    const content = (
        <>
            <AutofillStyles />
            {children}
        </>
    )

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {target ? (
                <ShadowAware target={target}>{content}</ShadowAware>
            ) : (
                content
            )}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
