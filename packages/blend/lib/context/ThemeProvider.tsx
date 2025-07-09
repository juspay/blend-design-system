import { FOUNDATION_THEME, ThemeType } from "../tokens";
import initTokens from "./initComponentTokens";
import ThemeContext, { ComponentTokenType } from "./ThemeContext";

type ThemeProviderProps = {
  foundationTokens?: ThemeType;
  componentTokens?: ComponentTokenType;
  children: React.ReactNode;
};

const ThemeProvider = ({
  foundationTokens = FOUNDATION_THEME,
  componentTokens = {},
  children,
}: ThemeProviderProps) => {
  const defaultThemeContextValue = {
    foundationTokens,
    componentTokens: initTokens(componentTokens, foundationTokens),
  };
  return (
    <ThemeContext.Provider value={defaultThemeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
