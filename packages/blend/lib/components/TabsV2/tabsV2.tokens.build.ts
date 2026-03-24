import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { TabsV2Variant, TabsV2Size } from './tabsV2.types'
import type { TabsV2TokensType } from './tabsV2.tokens.schema'
import { getTabsV2Primitives } from './tabsV2.tokens.primitives'

type BreakpointKey = 'sm' | 'lg'

type TabsV2ColorScheme = {
    boxedHover: CSSObject['backgroundColor']
    boxedActive: CSSObject['backgroundColor']
    floatHover: CSSObject['backgroundColor']
    floatActive: CSSObject['backgroundColor']
    pillHover: CSSObject['backgroundColor']
    pillActive: CSSObject['backgroundColor']
    hairline: CSSObject['color']
    containerBoxed: CSSObject['backgroundColor']
    indicator: CSSObject['color']
    textUnderlineBoxed: {
        default: CSSObject['color']
        hover: CSSObject['color']
        active: CSSObject['color']
        disabled: CSSObject['color']
    }
    textFloatPill: {
        default: CSSObject['color']
        hover: CSSObject['color']
        active: CSSObject['color']
        disabled: CSSObject['color']
    }
}

const resolveColorScheme = (
    f: FoundationTokenType,
    mode: 'light' | 'dark'
): TabsV2ColorScheme => {
    const { colors } = f
    if (mode === 'light') {
        return {
            boxedHover: colors.gray[0],
            boxedActive: colors.gray[0],
            floatHover: colors.gray[50],
            floatActive: colors.gray[100],
            pillHover: colors.gray[50],
            pillActive: colors.gray[100],
            hairline: colors.gray[200],
            containerBoxed: colors.gray[50],
            indicator: colors.gray[700],
            textUnderlineBoxed: {
                default: colors.gray[500],
                hover: colors.gray[500],
                active: colors.gray[700],
                disabled: colors.gray[400],
            },
            textFloatPill: {
                default: colors.gray[500],
                hover: colors.gray[700],
                active: colors.gray[700],
                disabled: colors.gray[400],
            },
        }
    }
    return {
        boxedHover: colors.gray[800],
        boxedActive: colors.gray[800],
        floatHover: colors.gray[800],
        floatActive: colors.gray[700],
        pillHover: colors.gray[800],
        pillActive: colors.gray[700],
        hairline: colors.gray[700],
        containerBoxed: colors.gray[800],
        indicator: colors.gray[200],
        textUnderlineBoxed: {
            default: colors.gray[400],
            hover: colors.gray[400],
            active: colors.gray[100],
            disabled: colors.gray[600],
        },
        textFloatPill: {
            default: colors.gray[400],
            hover: colors.gray[300],
            active: colors.gray[100],
            disabled: colors.gray[600],
        },
    }
}

const getTriggerPadding = (
    f: FoundationTokenType,
    bp: BreakpointKey
): TabsV2TokensType['padding'] => {
    if (bp === 'sm') {
        return {
            [TabsV2Size.MD]: {
                [TabsV2Variant.UNDERLINE]: {
                    top: f.unit[2],
                    right: f.unit[8],
                    bottom: f.unit[6],
                    left: f.unit[8],
                },
                [TabsV2Variant.BOXED]: {
                    top: f.unit[8],
                    right: f.unit[12],
                    bottom: f.unit[8],
                    left: f.unit[12],
                },
                [TabsV2Variant.FLOATING]: {
                    top: f.unit[8],
                    right: f.unit[12],
                    bottom: f.unit[8],
                    left: f.unit[12],
                },
                [TabsV2Variant.PILLS]: {
                    top: f.unit[4],
                    right: f.unit[12],
                    bottom: f.unit[4],
                    left: f.unit[12],
                },
            },
            [TabsV2Size.LG]: {
                [TabsV2Variant.UNDERLINE]: {
                    top: f.unit[6],
                    right: f.unit[8],
                    bottom: f.unit[6],
                    left: f.unit[8],
                },
                [TabsV2Variant.BOXED]: {
                    top: f.unit[10],
                    right: f.unit[12],
                    bottom: f.unit[10],
                    left: f.unit[12],
                },
                [TabsV2Variant.FLOATING]: {
                    top: f.unit[10],
                    right: f.unit[12],
                    bottom: f.unit[10],
                    left: f.unit[12],
                },
                [TabsV2Variant.PILLS]: {
                    top: f.unit[6],
                    right: f.unit[12],
                    bottom: f.unit[6],
                    left: f.unit[12],
                },
            },
        }
    }
    return {
        [TabsV2Size.MD]: {
            [TabsV2Variant.UNDERLINE]: {
                top: f.unit[2],
                right: f.unit[8],
                bottom: f.unit[12],
                left: f.unit[8],
            },
            [TabsV2Variant.BOXED]: {
                top: f.unit[8],
                right: f.unit[12],
                bottom: f.unit[8],
                left: f.unit[12],
            },
            [TabsV2Variant.FLOATING]: {
                top: f.unit[8],
                right: f.unit[12],
                bottom: f.unit[8],
                left: f.unit[12],
            },
            [TabsV2Variant.PILLS]: {
                top: f.unit[8],
                right: f.unit[12],
                bottom: f.unit[8],
                left: f.unit[12],
            },
        },
        [TabsV2Size.LG]: {
            [TabsV2Variant.UNDERLINE]: {
                top: f.unit[6],
                right: f.unit[8],
                bottom: f.unit[12],
                left: f.unit[8],
            },
            [TabsV2Variant.BOXED]: {
                top: f.unit[10],
                right: f.unit[12],
                bottom: f.unit[10],
                left: f.unit[12],
            },
            [TabsV2Variant.FLOATING]: {
                top: f.unit[10],
                right: f.unit[12],
                bottom: f.unit[10],
                left: f.unit[12],
            },
            [TabsV2Variant.PILLS]: {
                top: f.unit[10],
                right: f.unit[12],
                bottom: f.unit[10],
                left: f.unit[12],
            },
        },
    }
}

export const buildTabsV2TokensForBreakpoint = (
    f: FoundationTokenType,
    mode: 'light' | 'dark',
    bp: BreakpointKey
): TabsV2TokensType => {
    const p = getTabsV2Primitives(f)
    const c = resolveColorScheme(f, mode)
    const hairlineBorder = p.hairlineSolid(String(c.hairline))
    const r8 = f.border.radius[8]
    const r28 = f.border.radius[28]
    const pad = getTriggerPadding(f, bp)

    const transparentBlock = {
        default: p.clearBg,
        hover: p.clearBg,
        active: p.clearBg,
        disabled: p.clearBg,
    } as TabsV2TokensType['backgroundColor'][TabsV2Variant.UNDERLINE]

    return {
        gap: f.unit[8],
        backgroundColor: {
            [TabsV2Variant.UNDERLINE]: transparentBlock,
            [TabsV2Variant.BOXED]: {
                default: p.clearBg,
                hover: c.boxedHover,
                active: c.boxedActive,
                disabled: p.clearBg,
            },
            [TabsV2Variant.FLOATING]: {
                default: p.clearBg,
                hover: c.floatHover,
                active: c.floatActive,
                disabled: p.clearBg,
            },
            [TabsV2Variant.PILLS]: {
                default: p.clearBg,
                hover: c.pillHover,
                active: c.pillActive,
                disabled: p.clearBg,
            },
        },
        borderRadius: {
            [TabsV2Size.MD]: {
                [TabsV2Variant.UNDERLINE]: p.radiusSharp,
                [TabsV2Variant.BOXED]: r8,
                [TabsV2Variant.FLOATING]: r8,
                [TabsV2Variant.PILLS]: r28,
            },
            [TabsV2Size.LG]: {
                [TabsV2Variant.UNDERLINE]: p.radiusSharp,
                [TabsV2Variant.BOXED]: r8,
                [TabsV2Variant.FLOATING]: r8,
                [TabsV2Variant.PILLS]: r28,
            },
        },
        padding: pad,
        border: {
            [TabsV2Variant.UNDERLINE]: p.hiddenBorder,
            [TabsV2Variant.BOXED]: p.hiddenBorder,
            [TabsV2Variant.FLOATING]: p.hiddenBorder,
            [TabsV2Variant.PILLS]: hairlineBorder,
        },
        borderBottom: {
            [TabsV2Variant.UNDERLINE]: hairlineBorder,
            [TabsV2Variant.BOXED]: p.hiddenBorderBottom,
            [TabsV2Variant.FLOATING]: p.hiddenBorderBottom,
            [TabsV2Variant.PILLS]: p.hiddenBorderBottom,
        },
        container: {
            backgroundColor: {
                [TabsV2Variant.UNDERLINE]: p.clearBg,
                [TabsV2Variant.BOXED]: c.containerBoxed,
                [TabsV2Variant.FLOATING]: p.clearBg,
                [TabsV2Variant.PILLS]: p.clearBg,
            },
            borderRadius: {
                [TabsV2Size.MD]: {
                    [TabsV2Variant.UNDERLINE]: p.radiusSharp,
                    [TabsV2Variant.BOXED]: r8,
                    [TabsV2Variant.FLOATING]: p.radiusSharp,
                    [TabsV2Variant.PILLS]: p.radiusSharp,
                },
                [TabsV2Size.LG]: {
                    [TabsV2Variant.UNDERLINE]: p.radiusSharp,
                    [TabsV2Variant.BOXED]: r8,
                    [TabsV2Variant.FLOATING]: p.radiusSharp,
                    [TabsV2Variant.PILLS]: p.radiusSharp,
                },
            },
            padding: {
                [TabsV2Size.MD]: {
                    [TabsV2Variant.UNDERLINE]: {
                        top: f.unit[8],
                        right: p.space0,
                        bottom: p.space0,
                        left: p.space0,
                    },
                    [TabsV2Variant.BOXED]: {
                        top: f.unit[4],
                        right: f.unit[4],
                        bottom: f.unit[4],
                        left: f.unit[4],
                    },
                    [TabsV2Variant.FLOATING]: {
                        top: f.unit[4],
                        right: f.unit[4],
                        bottom: f.unit[4],
                        left: f.unit[4],
                    },
                    [TabsV2Variant.PILLS]: {
                        top: f.unit[4],
                        right: f.unit[4],
                        bottom: f.unit[4],
                        left: f.unit[4],
                    },
                },
                [TabsV2Size.LG]: {
                    [TabsV2Variant.UNDERLINE]: {
                        top: f.unit[8],
                        right: p.space0,
                        bottom: p.space0,
                        left: p.space0,
                    },
                    [TabsV2Variant.BOXED]: {
                        top: f.unit[4],
                        right: f.unit[4],
                        bottom: f.unit[4],
                        left: f.unit[4],
                    },
                    [TabsV2Variant.FLOATING]: {
                        top: f.unit[4],
                        right: f.unit[4],
                        bottom: f.unit[4],
                        left: f.unit[4],
                    },
                    [TabsV2Variant.PILLS]: {
                        top: f.unit[4],
                        right: f.unit[4],
                        bottom: f.unit[4],
                        left: f.unit[4],
                    },
                },
            },
        },
        trigger: {
            gap: f.unit[8],
            activeIndicator: {
                height: f.border.width[2],
                color: c.indicator,
            },
            text: {
                color: {
                    [TabsV2Variant.UNDERLINE]: {
                        default: c.textUnderlineBoxed.default,
                        hover: c.textUnderlineBoxed.hover,
                        active: c.textUnderlineBoxed.active,
                        disabled: c.textUnderlineBoxed.disabled,
                    },
                    [TabsV2Variant.BOXED]: {
                        default: c.textUnderlineBoxed.default,
                        hover: c.textUnderlineBoxed.hover,
                        active: c.textUnderlineBoxed.active,
                        disabled: c.textUnderlineBoxed.disabled,
                    },
                    [TabsV2Variant.FLOATING]: {
                        default: c.textFloatPill.default,
                        hover: c.textFloatPill.hover,
                        active: c.textFloatPill.active,
                        disabled: c.textFloatPill.disabled,
                    },
                    [TabsV2Variant.PILLS]: {
                        default: c.textFloatPill.default,
                        hover: c.textFloatPill.hover,
                        active: c.textFloatPill.active,
                        disabled: c.textFloatPill.disabled,
                    },
                },
                fontSize: {
                    [TabsV2Size.MD]: f.font.size.body.md.fontSize,
                    [TabsV2Size.LG]: f.font.size.body.md.fontSize,
                },
                fontWeight: {
                    [TabsV2Size.MD]: f.font.weight[500],
                    [TabsV2Size.LG]: f.font.weight[500],
                },
            },
        },
        chrome: {
            stickyHeaderShadow: f.shadows.xs,
        },
    }
}

export const buildResponsiveTabsV2Tokens = (
    f: FoundationTokenType,
    mode: 'light' | 'dark'
) => ({
    sm: buildTabsV2TokensForBreakpoint(f, mode, 'sm'),
    lg: buildTabsV2TokensForBreakpoint(f, mode, 'lg'),
})
