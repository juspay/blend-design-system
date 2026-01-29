import type { CSSObject } from 'styled-components'

type FontWeightType = Readonly<{
    100: CSSObject['fontWeight']
    200: CSSObject['fontWeight']
    300: CSSObject['fontWeight']
    400: CSSObject['fontWeight']
    500: CSSObject['fontWeight']
    600: CSSObject['fontWeight']
    700: CSSObject['fontWeight']
    800: CSSObject['fontWeight']
    900: CSSObject['fontWeight']
}>

type FontFamilyType = Readonly<{
    display: CSSObject['fontFamily']
    body: CSSObject['fontFamily']
    heading: CSSObject['fontFamily']
    mono: CSSObject['fontFamily']
}>

type LetterSpacingType = Readonly<{
    compressed: CSSObject['letterSpacing']
    condensed: CSSObject['letterSpacing']
    normal: CSSObject['letterSpacing']
    expanded: CSSObject['letterSpacing']
    extended: CSSObject['letterSpacing']
}>

export type FontGroupType = Readonly<{
    fontSize: CSSObject['fontSize']
    lineHeight: CSSObject['lineHeight']
    letterSpacing: CSSObject['letterSpacing']
}>

type FontSizeType = Readonly<{
    base: CSSObject['fontSize'] // as 1rem
    body: {
        xs: FontGroupType
        sm: FontGroupType
        md: FontGroupType
        lg: FontGroupType
    }
    heading: {
        sm: FontGroupType
        md: FontGroupType
        lg: FontGroupType
        xl: FontGroupType
        '2xl': FontGroupType
    }
    display: {
        sm: FontGroupType
        md: FontGroupType
        lg: FontGroupType
        xl: FontGroupType
    }
    code: {
        sm: FontGroupType
        md: FontGroupType
        lg: FontGroupType
    }
}>
type FontSizesType = Readonly<{
    10: CSSObject['fontSize']
    12: CSSObject['fontSize']
    14: CSSObject['fontSize']
    16: CSSObject['fontSize']
    18: CSSObject['fontSize']
    20: CSSObject['fontSize']
    24: CSSObject['fontSize']
    28: CSSObject['fontSize']
    32: CSSObject['fontSize']
    36: CSSObject['fontSize']
    40: CSSObject['fontSize']
    44: CSSObject['fontSize']
    48: CSSObject['fontSize']
    52: CSSObject['fontSize']
    56: CSSObject['fontSize']
    60: CSSObject['fontSize']
    64: CSSObject['fontSize']
    68: CSSObject['fontSize']
    72: CSSObject['fontSize']
    76: CSSObject['fontSize']
    80: CSSObject['fontSize']
    84: CSSObject['fontSize']
    88: CSSObject['fontSize']
    92: CSSObject['fontSize']
    96: CSSObject['fontSize']
    100: CSSObject['fontSize']
}>
type LineHeightType = Readonly<{
    14: CSSObject['lineHeight']
    16: CSSObject['lineHeight']
    18: CSSObject['lineHeight']
    20: CSSObject['lineHeight']
    24: CSSObject['lineHeight']
    28: CSSObject['lineHeight']
    32: CSSObject['lineHeight']
    36: CSSObject['lineHeight']
    40: CSSObject['lineHeight']
    44: CSSObject['lineHeight']
    48: CSSObject['lineHeight']
    52: CSSObject['lineHeight']
    56: CSSObject['lineHeight']
    60: CSSObject['lineHeight']
    64: CSSObject['lineHeight']
    68: CSSObject['lineHeight']
    72: CSSObject['lineHeight']
    76: CSSObject['lineHeight']
    80: CSSObject['lineHeight']
    84: CSSObject['lineHeight']
    88: CSSObject['lineHeight']
    92: CSSObject['lineHeight']
    96: CSSObject['lineHeight']
    100: CSSObject['lineHeight']
}>

export type FontTokensType = Readonly<{
    family: FontFamilyType
    weight: FontWeightType
    letterSpacing: LetterSpacingType
    fontSize: FontSizesType
    lineHeight: LineHeightType
    size: FontSizeType
}>

/**
 * Font tokens
 * @description
 * Font tokens are used to define the font family, weight, size, and letter spacing.
 * @warning
 * Whenever changing the font tokens, make sure to handle it in the Text   Component as well.
 */
const fontTokens: FontTokensType = {
    family: {
        display: 'InterDisplay',
        body: 'InterDisplay',
        heading: 'InterDisplay',
        mono: 'SF Mono',
    },
    weight: {
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900,
    },
    letterSpacing: {
        compressed: -2,
        condensed: -1,
        normal: 0,
        expanded: 1,
        extended: 2,
    },
    size: {
        base: 16,
        body: {
            xs: {
                fontSize: 10,
                lineHeight: 14,
                letterSpacing: 0,
            },
            sm: {
                fontSize: 12,
                lineHeight: 18,
                letterSpacing: 0,
            },
            md: {
                fontSize: 14,
                lineHeight: 20,
                letterSpacing: 0,
            },
            lg: {
                fontSize: 16,
                lineHeight: 24,
                letterSpacing: 0,
            },
        },
        heading: {
            sm: {
                fontSize: 18,
                lineHeight: 24,
                letterSpacing: 0,
            },
            md: {
                fontSize: 20,
                lineHeight: 28,
                letterSpacing: 0,
            },
            lg: {
                fontSize: 24,
                lineHeight: 32,
                letterSpacing: 0,
            },
            xl: {
                fontSize: 32,
                lineHeight: 38,
                letterSpacing: 0,
            },
            '2xl': {
                fontSize: 40,
                lineHeight: 46,
                letterSpacing: 0,
            },
        },
        display: {
            sm: {
                fontSize: 48,
                lineHeight: 56,
                letterSpacing: 0,
            },
            md: {
                fontSize: 56,
                lineHeight: 64,
                letterSpacing: 0,
            },
            lg: {
                fontSize: 64,
                lineHeight: 70,
                letterSpacing: 0,
            },
            xl: {
                fontSize: 72,
                lineHeight: 78,
                letterSpacing: 0,
            },
        },
        code: {
            sm: {
                fontSize: 10,
                lineHeight: 14,
                letterSpacing: 0,
            },
            md: {
                fontSize: 12,
                lineHeight: 18,
                letterSpacing: 0,
            },
            lg: {
                fontSize: 14,
                lineHeight: 18,
                letterSpacing: 0,
            },
        },
    },
    fontSize: {
        10: 10,
        12: 12,
        14: 14,
        16: 16,
        18: 18,
        20: 20,
        24: 24,
        28: 28,
        32: 32,
        36: 36,
        40: 40,
        44: 44,
        48: 48,
        52: 52,
        56: 56,
        60: 60,
        64: 64,
        68: 68,
        72: 72,
        76: 76,
        80: 80,
        84: 84,
        88: 88,
        92: 92,
        96: 96,
        100: 100,
    },
    lineHeight: {
        14: 14,
        16: 16,
        18: 18,
        20: 20,
        24: 24,
        28: 28,
        32: 32,
        36: 36,
        40: 40,
        44: 44,
        48: 48,
        52: 52,
        56: 56,
        60: 60,
        64: 64,
        68: 68,
        72: 72,
        76: 76,
        80: 80,
        84: 84,
        88: 88,
        92: 92,
        96: 96,
        100: 100,
    },
}

export default fontTokens
