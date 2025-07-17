import { BREAKPOINTS, type BreakpointType } from '../breakpoints/breakPoints'
import { FOUNDATION_THEME, type ThemeType } from '../tokens'
import initTokens from './initComponentTokens'
import ThemeContext, { type ComponentTokenType } from './ThemeContext'

type ThemeProviderProps = {
    foundationTokens?: ThemeType
    componentTokens?: ComponentTokenType
    breakpoints?: BreakpointType
    children: React.ReactNode
}

const ThemeProvider = ({
    foundationTokens = FOUNDATION_THEME,
    componentTokens = {},
    breakpoints = BREAKPOINTS,
    children,
}: ThemeProviderProps) => {
    const defaultThemeContextValue = {
        foundationTokens,
        componentTokens: initTokens(componentTokens, foundationTokens),
        breakpoints,
    }

    return (
        <ThemeContext.Provider value={defaultThemeContextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
