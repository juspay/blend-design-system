import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveTabsV2Tokens } from './tabsV2.tokens'
import { TabsV2Variant, TabsV2Size } from './tabsV2.types'

export const getTabsV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTabsV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[8],
            width: '100%',
            outline: 'none',
            transition: 'color 0.2s ease-in-out',
            backgroundColor: {
                [TabsV2Variant.UNDERLINE]: {
                    default: 'transparent',
                    hover: 'transparent',
                    active: 'transparent',
                    disabled: 'transparent',
                },
                [TabsV2Variant.BOXED]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[800],
                    active: foundationToken.colors.gray[800],
                    disabled: 'transparent',
                },
                [TabsV2Variant.FLOATING]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[800],
                    active: foundationToken.colors.gray[700],
                    disabled: 'transparent',
                },
                [TabsV2Variant.PILLS]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[800],
                    active: foundationToken.colors.gray[700],
                    disabled: 'transparent',
                },
            },
            borderRadius: {
                [TabsV2Size.MD]: {
                    [TabsV2Variant.UNDERLINE]: foundationToken.border.radius[0],
                    [TabsV2Variant.BOXED]: foundationToken.border.radius[8],
                    [TabsV2Variant.FLOATING]: foundationToken.border.radius[8],
                    [TabsV2Variant.PILLS]: foundationToken.border.radius[28],
                },
                [TabsV2Size.LG]: {
                    [TabsV2Variant.UNDERLINE]: foundationToken.border.radius[0],
                    [TabsV2Variant.BOXED]: foundationToken.border.radius[8],
                    [TabsV2Variant.FLOATING]: foundationToken.border.radius[8],
                    [TabsV2Variant.PILLS]: foundationToken.border.radius[28],
                },
            },
            padding: {
                [TabsV2Size.MD]: {
                    [TabsV2Variant.UNDERLINE]: {
                        top: foundationToken.unit[2],
                        right: foundationToken.unit[8],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[8],
                    },
                    [TabsV2Variant.BOXED]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[12],
                    },
                    [TabsV2Variant.FLOATING]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[12],
                    },
                    [TabsV2Variant.PILLS]: {
                        top: foundationToken.unit[4],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[4],
                        left: foundationToken.unit[12],
                    },
                },
                [TabsV2Size.LG]: {
                    [TabsV2Variant.UNDERLINE]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[8],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[8],
                    },
                    [TabsV2Variant.BOXED]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                    [TabsV2Variant.FLOATING]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                    [TabsV2Variant.PILLS]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[6],
                        left: foundationToken.unit[12],
                    },
                },
            },
            border: {
                [TabsV2Variant.UNDERLINE]: 'none',
                [TabsV2Variant.BOXED]: 'none',
                [TabsV2Variant.FLOATING]: 'none',
                [TabsV2Variant.PILLS]: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
            },
            borderBottom: {
                [TabsV2Variant.UNDERLINE]: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                [TabsV2Variant.BOXED]: 'none',
                [TabsV2Variant.FLOATING]: 'none',
                [TabsV2Variant.PILLS]: 'none',
            },
            container: {
                backgroundColor: {
                    [TabsV2Variant.UNDERLINE]: 'transparent',
                    [TabsV2Variant.BOXED]: foundationToken.colors.gray[800],
                    [TabsV2Variant.FLOATING]: 'transparent',
                    [TabsV2Variant.PILLS]: 'transparent',
                },
                borderRadius: {
                    [TabsV2Size.MD]: {
                        [TabsV2Variant.UNDERLINE]:
                            foundationToken.border.radius[0],
                        [TabsV2Variant.BOXED]: foundationToken.border.radius[8],
                        [TabsV2Variant.FLOATING]:
                            foundationToken.border.radius[0],
                        [TabsV2Variant.PILLS]: foundationToken.border.radius[0],
                    },
                    [TabsV2Size.LG]: {
                        [TabsV2Variant.UNDERLINE]:
                            foundationToken.border.radius[0],
                        [TabsV2Variant.BOXED]: foundationToken.border.radius[8],
                        [TabsV2Variant.FLOATING]:
                            foundationToken.border.radius[0],
                        [TabsV2Variant.PILLS]: foundationToken.border.radius[0],
                    },
                },
                padding: {
                    [TabsV2Size.MD]: {
                        [TabsV2Variant.UNDERLINE]: {
                            top: foundationToken.unit[8],
                            right: foundationToken.unit[0],
                            bottom: foundationToken.unit[0],
                            left: foundationToken.unit[0],
                        },
                        [TabsV2Variant.BOXED]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsV2Variant.FLOATING]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsV2Variant.PILLS]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                    },
                    [TabsV2Size.LG]: {
                        [TabsV2Variant.UNDERLINE]: {
                            top: foundationToken.unit[8],
                            right: foundationToken.unit[0],
                            bottom: foundationToken.unit[0],
                            left: foundationToken.unit[0],
                        },
                        [TabsV2Variant.BOXED]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsV2Variant.FLOATING]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsV2Variant.PILLS]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                    },
                },
            },
            trigger: {
                gap: foundationToken.unit[8],
                activeIndicator: {
                    height: foundationToken.border.width[2],
                    color: foundationToken.colors.gray[200],
                    position: {
                        bottom: foundationToken.unit[0],
                    },
                    transition:
                        'scale 250ms cubic-bezier(0.4, 0, 0.2, 1), translate 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 2,
                },
                text: {
                    color: {
                        [TabsV2Variant.UNDERLINE]: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[400],
                            active: foundationToken.colors.gray[100],
                            disabled: foundationToken.colors.gray[600],
                        },
                        [TabsV2Variant.BOXED]: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[400],
                            active: foundationToken.colors.gray[100],
                            disabled: foundationToken.colors.gray[600],
                        },
                        [TabsV2Variant.FLOATING]: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[300],
                            active: foundationToken.colors.gray[100],
                            disabled: foundationToken.colors.gray[600],
                        },
                        [TabsV2Variant.PILLS]: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[300],
                            active: foundationToken.colors.gray[100],
                            disabled: foundationToken.colors.gray[600],
                        },
                    },
                    fontSize: {
                        [TabsV2Size.MD]:
                            foundationToken.font.size.body.md.fontSize,
                        [TabsV2Size.LG]:
                            foundationToken.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        [TabsV2Size.MD]: foundationToken.font.weight[500],
                        [TabsV2Size.LG]: foundationToken.font.weight[500],
                    },
                },
                closeButton: {
                    width: foundationToken.unit[16],
                    borderRadius: foundationToken.border.radius.full,
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[600],
                        disabled: 'transparent',
                    },
                },
                outline: 'none',
                transition: 'color 0.2s ease-in-out',
            },
            chrome: {
                stickyHeaderShadow: foundationToken.shadows.xs,
            },
        },
        lg: {
            gap: foundationToken.unit[8],
            width: '100%',
            outline: 'none',
            transition: 'color 0.2s ease-in-out',
            backgroundColor: {
                [TabsV2Variant.UNDERLINE]: {
                    default: 'transparent',
                    hover: 'transparent',
                    active: 'transparent',
                    disabled: 'transparent',
                },
                [TabsV2Variant.BOXED]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[800],
                    active: foundationToken.colors.gray[800],
                    disabled: 'transparent',
                },
                [TabsV2Variant.FLOATING]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[800],
                    active: foundationToken.colors.gray[700],
                    disabled: 'transparent',
                },
                [TabsV2Variant.PILLS]: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[800],
                    active: foundationToken.colors.gray[700],
                    disabled: 'transparent',
                },
            },
            borderRadius: {
                [TabsV2Size.MD]: {
                    [TabsV2Variant.UNDERLINE]: foundationToken.border.radius[0],
                    [TabsV2Variant.BOXED]: foundationToken.border.radius[8],
                    [TabsV2Variant.FLOATING]: foundationToken.border.radius[8],
                    [TabsV2Variant.PILLS]: foundationToken.border.radius[28],
                },
                [TabsV2Size.LG]: {
                    [TabsV2Variant.UNDERLINE]: foundationToken.border.radius[0],
                    [TabsV2Variant.BOXED]: foundationToken.border.radius[8],
                    [TabsV2Variant.FLOATING]: foundationToken.border.radius[8],
                    [TabsV2Variant.PILLS]: foundationToken.border.radius[28],
                },
            },
            padding: {
                [TabsV2Size.MD]: {
                    [TabsV2Variant.UNDERLINE]: {
                        top: foundationToken.unit[2],
                        right: foundationToken.unit[8],
                        bottom: foundationToken.unit[12],
                        left: foundationToken.unit[8],
                    },
                    [TabsV2Variant.BOXED]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[12],
                    },
                    [TabsV2Variant.FLOATING]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[12],
                    },
                    [TabsV2Variant.PILLS]: {
                        top: foundationToken.unit[8],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[8],
                        left: foundationToken.unit[12],
                    },
                },
                [TabsV2Size.LG]: {
                    [TabsV2Variant.UNDERLINE]: {
                        top: foundationToken.unit[6],
                        right: foundationToken.unit[8],
                        bottom: foundationToken.unit[12],
                        left: foundationToken.unit[8],
                    },
                    [TabsV2Variant.BOXED]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                    [TabsV2Variant.FLOATING]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                    [TabsV2Variant.PILLS]: {
                        top: foundationToken.unit[10],
                        right: foundationToken.unit[12],
                        bottom: foundationToken.unit[10],
                        left: foundationToken.unit[12],
                    },
                },
            },
            border: {
                [TabsV2Variant.UNDERLINE]: 'none',
                [TabsV2Variant.BOXED]: 'none',
                [TabsV2Variant.FLOATING]: 'none',
                [TabsV2Variant.PILLS]: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
            },
            borderBottom: {
                [TabsV2Variant.UNDERLINE]: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                [TabsV2Variant.BOXED]: 'none',
                [TabsV2Variant.FLOATING]: 'none',
                [TabsV2Variant.PILLS]: 'none',
            },
            container: {
                backgroundColor: {
                    [TabsV2Variant.UNDERLINE]: 'transparent',
                    [TabsV2Variant.BOXED]: foundationToken.colors.gray[800],
                    [TabsV2Variant.FLOATING]: 'transparent',
                    [TabsV2Variant.PILLS]: 'transparent',
                },
                borderRadius: {
                    [TabsV2Size.MD]: {
                        [TabsV2Variant.UNDERLINE]:
                            foundationToken.border.radius[0],
                        [TabsV2Variant.BOXED]: foundationToken.border.radius[8],
                        [TabsV2Variant.FLOATING]:
                            foundationToken.border.radius[0],
                        [TabsV2Variant.PILLS]: foundationToken.border.radius[0],
                    },
                    [TabsV2Size.LG]: {
                        [TabsV2Variant.UNDERLINE]:
                            foundationToken.border.radius[0],
                        [TabsV2Variant.BOXED]: foundationToken.border.radius[8],
                        [TabsV2Variant.FLOATING]:
                            foundationToken.border.radius[0],
                        [TabsV2Variant.PILLS]: foundationToken.border.radius[0],
                    },
                },
                padding: {
                    [TabsV2Size.MD]: {
                        [TabsV2Variant.UNDERLINE]: {
                            top: foundationToken.unit[8],
                            right: foundationToken.unit[0],
                            bottom: foundationToken.unit[0],
                            left: foundationToken.unit[0],
                        },
                        [TabsV2Variant.BOXED]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsV2Variant.FLOATING]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsV2Variant.PILLS]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                    },
                    [TabsV2Size.LG]: {
                        [TabsV2Variant.UNDERLINE]: {
                            top: foundationToken.unit[8],
                            right: foundationToken.unit[0],
                            bottom: foundationToken.unit[0],
                            left: foundationToken.unit[0],
                        },
                        [TabsV2Variant.BOXED]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsV2Variant.FLOATING]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                        [TabsV2Variant.PILLS]: {
                            top: foundationToken.unit[4],
                            right: foundationToken.unit[4],
                            bottom: foundationToken.unit[4],
                            left: foundationToken.unit[4],
                        },
                    },
                },
            },
            trigger: {
                gap: foundationToken.unit[8],
                activeIndicator: {
                    height: foundationToken.border.width[2],
                    color: foundationToken.colors.gray[200],
                    position: {
                        bottom: foundationToken.unit[0],
                    },
                    transition:
                        'scale 250ms cubic-bezier(0.4, 0, 0.2, 1), translate 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 2,
                },
                text: {
                    color: {
                        [TabsV2Variant.UNDERLINE]: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[400],
                            active: foundationToken.colors.gray[100],
                            disabled: foundationToken.colors.gray[600],
                        },
                        [TabsV2Variant.BOXED]: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[400],
                            active: foundationToken.colors.gray[100],
                            disabled: foundationToken.colors.gray[600],
                        },
                        [TabsV2Variant.FLOATING]: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[300],
                            active: foundationToken.colors.gray[100],
                            disabled: foundationToken.colors.gray[600],
                        },
                        [TabsV2Variant.PILLS]: {
                            default: foundationToken.colors.gray[400],
                            hover: foundationToken.colors.gray[300],
                            active: foundationToken.colors.gray[100],
                            disabled: foundationToken.colors.gray[600],
                        },
                    },
                    fontSize: {
                        [TabsV2Size.MD]:
                            foundationToken.font.size.body.md.fontSize,
                        [TabsV2Size.LG]:
                            foundationToken.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        [TabsV2Size.MD]: foundationToken.font.weight[500],
                        [TabsV2Size.LG]: foundationToken.font.weight[500],
                    },
                },
                closeButton: {
                    width: foundationToken.unit[16],
                    borderRadius: foundationToken.border.radius.full,
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[600],
                        disabled: 'transparent',
                    },
                },
                outline: 'none',
                transition: 'color 0.2s ease-in-out',
            },
            chrome: {
                stickyHeaderShadow: foundationToken.shadows.xs,
            },
        },
    }
}
