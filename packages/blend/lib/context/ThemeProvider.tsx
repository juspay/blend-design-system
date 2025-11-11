import { BREAKPOINTS, type BreakpointType } from '../breakpoints/breakPoints'
import { FOUNDATION_THEME, type ThemeType } from '../tokens'
import initTokens from './initComponentTokens'
import ThemeContext, { type ComponentTokenType } from './ThemeContext'

type ThemeProviderProps = {
    foundationTokens?: ThemeType
    componentTokens?: ComponentTokenType
    breakpoints?: BreakpointType
    darkMode?: boolean
    children: React.ReactNode
}

const ThemeProvider = ({
    foundationTokens = FOUNDATION_THEME,
    componentTokens = {},
    breakpoints = BREAKPOINTS,
    darkMode = false,
    children,
}: ThemeProviderProps) => {
    const defaultThemeContextValue = {
        foundationTokens,
        componentTokens: initTokens(
            componentTokens,
            foundationTokens,
            darkMode
        ),
        breakpoints,
        darkMode,
    }

    return (
        <ThemeContext.Provider value={defaultThemeContextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
