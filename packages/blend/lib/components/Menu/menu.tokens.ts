import type { CSSObject } from 'styled-components'
import { MenuItemActionType, MenuItemVariant } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { type BreakpointType } from '../../breakpoints/breakPoints'

export type MenuItemStates =
    | 'default'
    | 'hover'
    | 'active'
    | 'focus'
    | 'focusVisible'
    | 'disabled'
export type MenuItemSelectionStates = MenuItemStates | 'selected'

export type MenuItemStateTokens<T> = {
    [key in MenuItemStates]: T
} & { selected?: T }

export const getMenuItemStateToken = <T>(
    stateTokens: MenuItemStateTokens<T>,
    state: MenuItemSelectionStates
) => stateTokens[state] ?? stateTokens.default

export type MenuTokensType = {
    boxShadow: CSSObject['boxShadow']
    backgroundColor: CSSObject['backgroundColor']
    padding: {
        x: CSSObject['padding']
        y: CSSObject['padding']
    }

    border: CSSObject['border']
    borderRadius: CSSObject['borderRadius']
    item: {
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        margin: {
            x: CSSObject['margin']
            y: CSSObject['margin']
        }
        borderRadius: CSSObject['borderRadius']
        backgroundColor: {
            [MenuItemVariant.DEFAULT]: {
                enabled: MenuItemStateTokens<CSSObject['backgroundColor']>
                disabled: MenuItemStateTokens<CSSObject['backgroundColor']>
            }
            [MenuItemVariant.ACTION]: {
                [key in MenuItemActionType]: {
                    enabled: MenuItemStateTokens<CSSObject['backgroundColor']>
                    disabled: MenuItemStateTokens<CSSObject['backgroundColor']>
                }
            }
        }
        gap: CSSObject['gap']
        checkmark?: {
            position?: 'leading' | 'trailing'
            width?: CSSObject['width']
            color?: CSSObject['color']
        }
        optionsLabel: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
            padding: {
                x: CSSObject['padding']
                y: CSSObject['padding']
            }
            margin: {
                x: CSSObject['margin']
                y: CSSObject['margin']
            }
        }
        option: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: {
                [MenuItemVariant.DEFAULT]: {
                    enabled: MenuItemStateTokens<CSSObject['color']>
                    disabled: MenuItemStateTokens<CSSObject['color']>
                }
                [MenuItemVariant.ACTION]: {
                    [key in MenuItemActionType]: {
                        enabled: MenuItemStateTokens<CSSObject['color']>
                        disabled: MenuItemStateTokens<CSSObject['color']>
                    }
                }
            }
        }
        description: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: {
                [MenuItemVariant.DEFAULT]: {
                    enabled: MenuItemStateTokens<CSSObject['color']>
                    disabled: MenuItemStateTokens<CSSObject['color']>
                }
                [MenuItemVariant.ACTION]: {
                    [key in MenuItemActionType]: {
                        enabled: MenuItemStateTokens<CSSObject['color']>
                        disabled: MenuItemStateTokens<CSSObject['color']>
                    }
                }
            }
        }
        seperator: {
            color: CSSObject['color']
            height: CSSObject['height']
            margin: {
                x: CSSObject['margin']
                y: CSSObject['margin']
            }
        }
    }
}

export type ResponsiveMenuTokensType = {
    [key in keyof BreakpointType]: MenuTokensType
}

const withSelectionTokens = (
    tokens: MenuTokensType,
    foundationToken: FoundationTokenType
): MenuTokensType => ({
    ...tokens,
    item: {
        ...tokens.item,
        checkmark: {
            position: 'trailing',
            width: foundationToken.unit[16],
            color: foundationToken.colors.gray[600],
            ...tokens.item.checkmark,
        },
        backgroundColor: {
            ...tokens.item.backgroundColor,
            default: {
                ...tokens.item.backgroundColor.default,
                enabled: {
                    ...tokens.item.backgroundColor.default.enabled,
                    selected: foundationToken.colors.gray[50],
                },
                disabled: {
                    ...tokens.item.backgroundColor.default.disabled,
                    selected: foundationToken.colors.gray[0],
                },
            },
            action: {
                ...tokens.item.backgroundColor.action,
                primary: {
                    ...tokens.item.backgroundColor.action.primary,
                    enabled: {
                        ...tokens.item.backgroundColor.action.primary.enabled,
                        selected: foundationToken.colors.primary[50],
                    },
                    disabled: {
                        ...tokens.item.backgroundColor.action.primary.disabled,
                        selected: foundationToken.colors.gray[0],
                    },
                },
                danger: {
                    ...tokens.item.backgroundColor.action.danger,
                    enabled: {
                        ...tokens.item.backgroundColor.action.danger.enabled,
                        selected: foundationToken.colors.red[50],
                    },
                    disabled: {
                        ...tokens.item.backgroundColor.action.danger.disabled,
                        selected: foundationToken.colors.gray[0],
                    },
                },
            },
        },
        option: {
            ...tokens.item.option,
            color: {
                ...tokens.item.option.color,
                default: {
                    ...tokens.item.option.color.default,
                    enabled: {
                        ...tokens.item.option.color.default.enabled,
                        selected: foundationToken.colors.gray[600],
                    },
                    disabled: {
                        ...tokens.item.option.color.default.disabled,
                        selected: foundationToken.colors.gray[400],
                    },
                },
                action: {
                    ...tokens.item.option.color.action,
                    primary: {
                        ...tokens.item.option.color.action.primary,
                        enabled: {
                            ...tokens.item.option.color.action.primary.enabled,
                            selected: foundationToken.colors.primary[600],
                        },
                        disabled: {
                            ...tokens.item.option.color.action.primary.disabled,
                            selected: foundationToken.colors.primary[400],
                        },
                    },
                    danger: {
                        ...tokens.item.option.color.action.danger,
                        enabled: {
                            ...tokens.item.option.color.action.danger.enabled,
                            selected: foundationToken.colors.red[600],
                        },
                        disabled: {
                            ...tokens.item.option.color.action.danger.disabled,
                            selected: foundationToken.colors.red[400],
                        },
                    },
                },
            },
        },
        description: {
            ...tokens.item.description,
            color: {
                ...tokens.item.description.color,
                default: {
                    ...tokens.item.description.color.default,
                    enabled: {
                        ...tokens.item.description.color.default.enabled,
                        selected: foundationToken.colors.gray[400],
                    },
                    disabled: {
                        ...tokens.item.description.color.default.disabled,
                        selected: foundationToken.colors.gray[400],
                    },
                },
                action: {
                    ...tokens.item.description.color.action,
                    primary: {
                        ...tokens.item.description.color.action.primary,
                        enabled: {
                            ...tokens.item.description.color.action.primary
                                .enabled,
                            selected: foundationToken.colors.primary[400],
                        },
                        disabled: {
                            ...tokens.item.description.color.action.primary
                                .disabled,
                            selected: foundationToken.colors.primary[400],
                        },
                    },
                    danger: {
                        ...tokens.item.description.color.action.danger,
                        enabled: {
                            ...tokens.item.description.color.action.danger
                                .enabled,
                            selected: foundationToken.colors.red[400],
                        },
                        disabled: {
                            ...tokens.item.description.color.action.danger
                                .disabled,
                            selected: foundationToken.colors.red[400],
                        },
                    },
                },
            },
        },
    },
})

export const getMenuTokens = (
    foundationToken: FoundationTokenType
): ResponsiveMenuTokensType => {
    const tokens: ResponsiveMenuTokensType = {
        sm: {
            boxShadow: foundationToken.shadows.md,
            backgroundColor: foundationToken.colors.gray[0],
            padding: {
                x: foundationToken.unit[6],
                y: foundationToken.unit[6],
            },
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.unit[8],
            item: {
                padding: {
                    x: `${foundationToken.unit[8]}`,
                    y: `${foundationToken.unit[8]}`,
                },
                margin: {
                    x: foundationToken.unit[4],
                    y: foundationToken.unit[0],
                },
                borderRadius: foundationToken.unit[4],
                backgroundColor: {
                    default: {
                        enabled: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[50],
                            active: foundationToken.colors.gray[50],
                            focus: foundationToken.colors.gray[50],
                            focusVisible: foundationToken.colors.gray[50],
                            disabled: foundationToken.colors.gray[0],
                        },
                        disabled: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            focus: foundationToken.colors.gray[0],
                            focusVisible: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                    },
                    action: {
                        primary: {
                            enabled: {
                                default: foundationToken.colors.primary[0],
                                hover: foundationToken.colors.primary[50],
                                active: foundationToken.colors.primary[50],
                                focus: foundationToken.colors.primary[50],
                                focusVisible:
                                    foundationToken.colors.primary[50],
                                disabled: foundationToken.colors.gray[0],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[0],
                                hover: foundationToken.colors.gray[0],
                                active: foundationToken.colors.gray[0],
                                focus: foundationToken.colors.gray[0],
                                focusVisible: foundationToken.colors.gray[0],
                                disabled: foundationToken.colors.gray[0],
                            },
                        },
                        danger: {
                            enabled: {
                                default: foundationToken.colors.red[0],
                                hover: foundationToken.colors.red[50],
                                active: foundationToken.colors.red[50],
                                focus: foundationToken.colors.red[50],
                                focusVisible: foundationToken.colors.red[50],
                                disabled: foundationToken.colors.gray[0],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[0],
                                hover: foundationToken.colors.gray[0],
                                active: foundationToken.colors.gray[0],
                                focus: foundationToken.colors.gray[0],
                                focusVisible: foundationToken.colors.gray[0],
                                disabled: foundationToken.colors.gray[0],
                            },
                        },
                    },
                },
                gap: 4,
                optionsLabel: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[400],
                    padding: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[6],
                    },
                    margin: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[0],
                    },
                },
                option: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: {
                        default: {
                            enabled: {
                                default: foundationToken.colors.gray[600],
                                hover: foundationToken.colors.gray[600],
                                active: foundationToken.colors.gray[600],
                                focus: foundationToken.colors.gray[600],
                                focusVisible: foundationToken.colors.gray[600],
                                disabled: foundationToken.colors.gray[400],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                        },
                        action: {
                            primary: {
                                enabled: {
                                    default:
                                        foundationToken.colors.primary[600],
                                    hover: foundationToken.colors.primary[600],
                                    active: foundationToken.colors.primary[600],
                                    focus: foundationToken.colors.primary[600],
                                    focusVisible:
                                        foundationToken.colors.primary[600],
                                    disabled: foundationToken.colors.gray[400],
                                },
                                disabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled:
                                        foundationToken.colors.primary[400],
                                },
                            },
                            danger: {
                                enabled: {
                                    default: foundationToken.colors.red[600],
                                    hover: foundationToken.colors.red[600],
                                    active: foundationToken.colors.red[600],
                                    focus: foundationToken.colors.red[600],
                                    focusVisible:
                                        foundationToken.colors.red[600],
                                    disabled: foundationToken.colors.red[400],
                                },
                                disabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                            },
                        },
                    },
                },
                description: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: {
                        default: {
                            enabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                        },
                        action: {
                            primary: {
                                enabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled: foundationToken.colors.gray[400],
                                },
                                disabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled:
                                        foundationToken.colors.primary[400],
                                },
                            },
                            danger: {
                                enabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                                disabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                            },
                        },
                    },
                },
                seperator: {
                    color: foundationToken.colors.gray[200],
                    height: 1,
                    margin: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[6],
                    },
                },
            },
        },
        lg: {
            boxShadow: foundationToken.shadows.md,
            backgroundColor: foundationToken.colors.gray[0],
            padding: {
                x: foundationToken.unit[6],
                y: foundationToken.unit[6],
            },
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.unit[8],
            item: {
                padding: {
                    x: `${foundationToken.unit[8]}`,
                    y: `${foundationToken.unit[6]}`,
                },

                margin: {
                    x: foundationToken.unit[4],
                    y: foundationToken.unit[0],
                },
                borderRadius: foundationToken.unit[4],
                backgroundColor: {
                    default: {
                        enabled: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[50],
                            active: foundationToken.colors.gray[50],
                            focus: foundationToken.colors.gray[50],
                            focusVisible: foundationToken.colors.gray[50],
                            disabled: foundationToken.colors.gray[0],
                        },
                        disabled: {
                            default: foundationToken.colors.gray[0],
                            hover: foundationToken.colors.gray[0],
                            active: foundationToken.colors.gray[0],
                            focus: foundationToken.colors.gray[0],
                            focusVisible: foundationToken.colors.gray[0],
                            disabled: foundationToken.colors.gray[0],
                        },
                    },
                    action: {
                        primary: {
                            enabled: {
                                default: foundationToken.colors.primary[0],
                                hover: foundationToken.colors.primary[50],
                                active: foundationToken.colors.primary[50],
                                focus: foundationToken.colors.primary[50],
                                focusVisible:
                                    foundationToken.colors.primary[50],
                                disabled: foundationToken.colors.gray[0],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[0],
                                hover: foundationToken.colors.gray[0],
                                active: foundationToken.colors.gray[0],
                                focus: foundationToken.colors.gray[0],
                                focusVisible: foundationToken.colors.gray[0],
                                disabled: foundationToken.colors.gray[0],
                            },
                        },
                        danger: {
                            enabled: {
                                default: foundationToken.colors.red[0],
                                hover: foundationToken.colors.red[50],
                                active: foundationToken.colors.red[50],
                                focus: foundationToken.colors.red[50],
                                focusVisible: foundationToken.colors.red[50],
                                disabled: foundationToken.colors.gray[0],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[0],
                                hover: foundationToken.colors.gray[0],
                                active: foundationToken.colors.gray[0],
                                focus: foundationToken.colors.gray[0],
                                focusVisible: foundationToken.colors.gray[0],
                                disabled: foundationToken.colors.gray[0],
                            },
                        },
                    },
                },
                gap: 4,
                optionsLabel: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[400],
                    padding: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[6],
                    },
                    margin: {
                        x: foundationToken.unit[6],
                        y: foundationToken.unit[0],
                    },
                },
                option: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: {
                        default: {
                            enabled: {
                                default: foundationToken.colors.gray[600],
                                hover: foundationToken.colors.gray[600],
                                active: foundationToken.colors.gray[600],
                                focus: foundationToken.colors.gray[600],
                                focusVisible: foundationToken.colors.gray[600],
                                disabled: foundationToken.colors.gray[400],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                        },
                        action: {
                            primary: {
                                enabled: {
                                    default:
                                        foundationToken.colors.primary[600],
                                    hover: foundationToken.colors.primary[600],
                                    active: foundationToken.colors.primary[600],
                                    focus: foundationToken.colors.primary[600],
                                    focusVisible:
                                        foundationToken.colors.primary[600],
                                    disabled: foundationToken.colors.gray[400],
                                },
                                disabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled:
                                        foundationToken.colors.primary[400],
                                },
                            },
                            danger: {
                                enabled: {
                                    default: foundationToken.colors.red[600],
                                    hover: foundationToken.colors.red[600],
                                    active: foundationToken.colors.red[600],
                                    focus: foundationToken.colors.red[600],
                                    focusVisible:
                                        foundationToken.colors.red[600],
                                    disabled: foundationToken.colors.red[400],
                                },
                                disabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                            },
                        },
                    },
                },
                description: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: {
                        default: {
                            enabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                            disabled: {
                                default: foundationToken.colors.gray[400],
                                hover: foundationToken.colors.gray[400],
                                active: foundationToken.colors.gray[400],
                                focus: foundationToken.colors.gray[400],
                                focusVisible: foundationToken.colors.gray[400],
                                disabled: foundationToken.colors.gray[400],
                            },
                        },
                        action: {
                            primary: {
                                enabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled: foundationToken.colors.gray[400],
                                },
                                disabled: {
                                    default:
                                        foundationToken.colors.primary[400],
                                    hover: foundationToken.colors.primary[400],
                                    active: foundationToken.colors.primary[400],
                                    focus: foundationToken.colors.primary[400],
                                    focusVisible:
                                        foundationToken.colors.primary[400],
                                    disabled:
                                        foundationToken.colors.primary[400],
                                },
                            },
                            danger: {
                                enabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                                disabled: {
                                    default: foundationToken.colors.red[400],
                                    hover: foundationToken.colors.red[400],
                                    active: foundationToken.colors.red[400],
                                    focus: foundationToken.colors.red[400],
                                    focusVisible:
                                        foundationToken.colors.red[400],
                                    disabled: foundationToken.colors.red[400],
                                },
                            },
                        },
                    },
                },
                seperator: {
                    color: foundationToken.colors.gray[200],
                    height: 1,
                    margin: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[6],
                    },
                },
            },
        },
    }

    return {
        sm: withSelectionTokens(tokens.sm, foundationToken),
        lg: withSelectionTokens(tokens.lg, foundationToken),
    }
}
