import { BREAKPOINTS, type BreakpointType } from '../breakpoints/breakPoints'
import { FOUNDATION_THEME, type ThemeType } from '../tokens'
import initTokens from './initComponentTokens'
import ThemeContext, { type ComponentTokenType } from './ThemeContext'
import { TelemetryProvider, type TelemetryConfig } from '../telemetry'

type ThemeProviderProps = {
    foundationTokens?: ThemeType
    componentTokens?: ComponentTokenType
    breakpoints?: BreakpointType
    telemetryConfig?: TelemetryConfig
    children: React.ReactNode
}

const ThemeProvider = ({
    foundationTokens = FOUNDATION_THEME,
    componentTokens = {},
    breakpoints = BREAKPOINTS,
    telemetryConfig,
    children,
}: ThemeProviderProps) => {
    const defaultThemeContextValue = {
        foundationTokens,
        componentTokens: initTokens(componentTokens, foundationTokens),
        breakpoints,
    }

    return (
        <ThemeContext.Provider value={defaultThemeContextValue}>
            <TelemetryProvider config={telemetryConfig || {}}>
                {children}
            </TelemetryProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
