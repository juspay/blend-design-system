import { CSSObject } from "styled-components";

export type ShadowTokensType = Readonly<{
  xs: CSSObject["boxShadow"];
  sm: CSSObject["boxShadow"];
  md: CSSObject["boxShadow"];
  lg: CSSObject["boxShadow"];
  xl: CSSObject["boxShadow"];
  "2xl": CSSObject["boxShadow"];
  full: CSSObject["boxShadow"];
  [key: string]: CSSObject["boxShadow"];
}>;

const shadowTokens: ShadowTokensType = {
  xs: "0px 1px 1px 0px rgba(5, 5, 6, 0.04)",
  sm: "0px 2px 3px 0px rgba(5, 5, 6, 0.05)",
  md: "0px 2px 8px 1px rgba(5, 5, 6, 0.07)",
  lg: "0px 3px 16px 3px rgba(5, 5, 6, 0.07)",
  xl: "0px 10px 20px 3px rgba(5, 5, 6, 0.07)",
  "2xl": "0px 12px 24px 4px rgba(5, 5, 6, 0.07)",
  full: "0px 24px 48px 8px rgba(5, 5, 6, 0.07)",
};

export default shadowTokens;
