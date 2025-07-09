import { CSSObject } from 'styled-components';
type FontWeightType = Readonly<{
    100: CSSObject["fontWeight"];
    200: CSSObject["fontWeight"];
    300: CSSObject["fontWeight"];
    400: CSSObject["fontWeight"];
    500: CSSObject["fontWeight"];
    600: CSSObject["fontWeight"];
    700: CSSObject["fontWeight"];
    800: CSSObject["fontWeight"];
    900: CSSObject["fontWeight"];
}>;
type FontFamilyType = Readonly<{
    display: CSSObject["fontFamily"];
    body: CSSObject["fontFamily"];
    heading: CSSObject["fontFamily"];
    mono: CSSObject["fontFamily"];
}>;
type LetterSpacingType = Readonly<{
    compressed: CSSObject["letterSpacing"];
    condensed: CSSObject["letterSpacing"];
    normal: CSSObject["letterSpacing"];
    expanded: CSSObject["letterSpacing"];
    extended: CSSObject["letterSpacing"];
}>;
export type FontGroupType = Readonly<{
    fontSize: CSSObject["fontSize"];
    lineHeight: CSSObject["lineHeight"];
    letterSpacing: CSSObject["letterSpacing"];
}>;
type FontSizeType = Readonly<{
    base: CSSObject["fontSize"];
    body: {
        xs: FontGroupType;
        sm: FontGroupType;
        md: FontGroupType;
        lg: FontGroupType;
    };
    heading: {
        sm: FontGroupType;
        md: FontGroupType;
        lg: FontGroupType;
        xl: FontGroupType;
        "2xl": FontGroupType;
    };
    display: {
        sm: FontGroupType;
        md: FontGroupType;
        lg: FontGroupType;
        xl: FontGroupType;
    };
    code: {
        sm: FontGroupType;
        md: FontGroupType;
        lg: FontGroupType;
    };
}>;
export type FontTokensType = Readonly<{
    family: FontFamilyType;
    weight: FontWeightType;
    letterSpacing: LetterSpacingType;
    size: FontSizeType;
}>;
/**
 * Font tokens
 * @description
 * Font tokens are used to define the font family, weight, size, and letter spacing.
 * @warning
 * Whenever changing the font tokens, make sure to handle it in the Text   Component as well.
 */
declare const fontTokens: FontTokensType;
export default fontTokens;
