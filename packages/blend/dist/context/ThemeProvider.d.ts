import { BreakpointType } from '../breakpoints/breakPoints';
import { ThemeType } from '../tokens';
import { ComponentTokenType } from './ThemeContext';
type ThemeProviderProps = {
    foundationTokens?: ThemeType;
    componentTokens?: ComponentTokenType;
    breakpoints?: BreakpointType;
    children: React.ReactNode;
};
declare const ThemeProvider: ({ foundationTokens, componentTokens, breakpoints, children, }: ThemeProviderProps) => import("react/jsx-runtime").JSX.Element;
export default ThemeProvider;
