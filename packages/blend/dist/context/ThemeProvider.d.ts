import { ThemeType } from '../tokens'
import { ComponentTokenType } from './ThemeContext'
type ThemeProviderProps = {
    foundationTokens?: ThemeType
    componentTokens?: ComponentTokenType
    children: React.ReactNode
}
declare const ThemeProvider: ({
    foundationTokens,
    componentTokens,
    children,
}: ThemeProviderProps) => import('react/jsx-runtime').JSX.Element
export default ThemeProvider
