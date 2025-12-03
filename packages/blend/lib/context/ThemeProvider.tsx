import { BREAKPOINTS, type BreakpointType } from '../breakpoints/breakPoints'
import { FOUNDATION_THEME, type ThemeType } from '../tokens'
import initTokens from './initComponentTokens'
import ThemeContext, { type ComponentTokenType } from './ThemeContext'

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}
type ThemeProviderProps = {
    foundationTokens?: ThemeType
    componentTokens?: ComponentTokenType
    breakpoints?: BreakpointType
    theme?: Theme | string
    children: React.ReactNode
}

const ThemeProvider = ({
    foundationTokens = FOUNDATION_THEME,
    componentTokens = {},
    breakpoints = BREAKPOINTS,
    theme = Theme.LIGHT,
    children,
}: ThemeProviderProps) => {
    const defaultThemeContextValue = {
        foundationTokens,
        componentTokens: initTokens(componentTokens, foundationTokens, theme),
        breakpoints,
        theme,
    }

    return (
        <ThemeContext.Provider value={defaultThemeContextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
