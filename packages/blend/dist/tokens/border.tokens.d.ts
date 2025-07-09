import { CSSObject } from 'styled-components';
type BorderWidthType = Readonly<{
    0: CSSObject["borderWidth"];
    1: CSSObject["borderWidth"];
    1.5: CSSObject["borderWidth"];
    2: CSSObject["borderWidth"];
    3: CSSObject["borderWidth"];
    4: CSSObject["borderWidth"];
    [key: string]: CSSObject["borderWidth"];
}>;
type BorderRadiusType = Readonly<{
    0: CSSObject["borderRadius"];
    2: CSSObject["borderRadius"];
    4: CSSObject["borderRadius"];
    6: CSSObject["borderRadius"];
    8: CSSObject["borderRadius"];
    10: CSSObject["borderRadius"];
    12: CSSObject["borderRadius"];
    16: CSSObject["borderRadius"];
    20: CSSObject["borderRadius"];
    full: CSSObject["borderRadius"];
    [key: string]: CSSObject["borderRadius"];
}>;
export type BorderTokensType = Readonly<{
    width: BorderWidthType;
    radius: BorderRadiusType;
}>;
declare const borderTokens: BorderTokensType;
export default borderTokens;
