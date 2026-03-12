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
     * When true, automatically detects Shadow DOM and injects styles into it.
     * Set to false if you want to manually control ShadowAware wrapping.
     * @default false
     */
    autoShadowDetection?: boolean
}

const ThemeProvider = ({
    foundationTokens = FOUNDATION_THEME,
    componentTokens = {},
    breakpoints = BREAKPOINTS,
    theme = Theme.LIGHT,
    children,
    autoShadowDetection = false,
}: ThemeProviderProps) => {
    const defaultThemeContextValue = {
        foundationTokens,
        componentTokens: initTokens(componentTokens, foundationTokens, theme),
        breakpoints,
        theme,
    }

    return (
        <ThemeContext.Provider value={defaultThemeContextValue}>
            <AutofillStyles />
            {autoShadowDetection ? (
                <ShadowAware autoDetect={true}>{children}</ShadowAware>
            ) : (
                children
            )}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
