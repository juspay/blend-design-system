import { CSSObject } from 'styled-components';
export type ShadowTokensType = Readonly<{
    xs: CSSObject['boxShadow'];
    sm: CSSObject['boxShadow'];
    md: CSSObject['boxShadow'];
    lg: CSSObject['boxShadow'];
    xl: CSSObject['boxShadow'];
    '2xl': CSSObject['boxShadow'];
    full: CSSObject['boxShadow'];
    focusPrimary: CSSObject['boxShadow'];
    focusError: CSSObject['boxShadow'];
    [key: string]: CSSObject['boxShadow'];
}>;
declare const shadowTokens: ShadowTokensType;
export default shadowTokens;
