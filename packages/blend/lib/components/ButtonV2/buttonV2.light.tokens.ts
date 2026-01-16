import { FoundationTokenType } from '../../tokens/theme.token'
import type { ButtonTokensType } from './button.tokens'

export const getButtonV2LightTokens = (
    foundationToken: FoundationTokenType
): ButtonTokensType => {
    return {
        gap: foundationToken.unit[6],
        slotMaxHeight: {
            sm: foundationToken.unit[16],
            md: foundationToken.unit[18],
            lg: foundationToken.unit[20],
        },
        backgroundColor: {
            primary: {
                default: {
                    default: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                    hover: foundationToken.colors.primary[500],
                    active: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                    disabled: foundationToken.colors.primary[300],
                },
                iconOnly: {
                    default: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                    hover: foundationToken.colors.primary[500],
                    active: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                    disabled: foundationToken.colors.primary[300],
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            secondary: {
                default: {
                    default: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[50],
                    active: foundationToken.colors.gray[0],
                    disabled: foundationToken.colors.gray[150],
                },
                iconOnly: {
                    default: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[50],
                    active: foundationToken.colors.gray[0],
                    disabled: foundationToken.colors.gray[150],
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            danger: {
                default: {
                    default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} 0%, ${foundationToken.colors.red[500]} 93.75%)`,
                    hover: foundationToken.colors.red[500],
                    active: foundationToken.colors.red[500],
                    disabled: foundationToken.colors.red[300],
                },
                iconOnly: {
                    default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} 0%, ${foundationToken.colors.red[500]} 93.75%)`,
                    hover: foundationToken.colors.red[500],
                    active: foundationToken.colors.red[500],
                    disabled: foundationToken.colors.red[300],
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            success: {
                default: {
                    default: `linear-gradient(180deg, ${foundationToken.colors.green[600]} 0%, ${foundationToken.colors.green[500]} 100%)`,
                    hover: foundationToken.colors.green[500],
                    active: foundationToken.colors.green[600],
                    disabled: foundationToken.colors.green[300],
                },
                iconOnly: {
                    default: `linear-gradient(180deg, ${foundationToken.colors.green[600]} 0%, ${foundationToken.colors.green[500]} 100%)`,
                    hover: foundationToken.colors.green[500],
                    active: foundationToken.colors.green[600],
                    disabled: foundationToken.colors.green[300],
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
        },
        borderRadius: {
            sm: {
                primary: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
                secondary: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
                danger: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
                success: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
            },
            md: {
                primary: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
                secondary: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
                danger: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
                success: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
            },
            lg: {
                primary: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
                secondary: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
                danger: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
                success: {
                    default: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    iconOnly: {
                        default: foundationToken.border.radius[10],
                        hover: foundationToken.border.radius[10],
                        active: foundationToken.border.radius[10],
                        disabled: foundationToken.border.radius[10],
                    },
                    inline: {
                        default: foundationToken.border.radius[6],
                        hover: foundationToken.border.radius[6],
                        active: foundationToken.border.radius[6],
                        disabled: foundationToken.border.radius[6],
                    },
                },
            },
        },
        padding: {
            sm: {
                primary: {
                    default: { x: '16px', y: '5px' },
                    iconOnly: { x: '9px', y: '9px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
                secondary: {
                    default: { x: '16px', y: '5px' },
                    iconOnly: { x: '9px', y: '9px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
                danger: {
                    default: { x: '16px', y: '5px' },
                    iconOnly: { x: '9px', y: '9px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
                success: {
                    default: { x: '16px', y: '5px' },
                    iconOnly: { x: '9px', y: '9px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
            },
            md: {
                primary: {
                    default: { x: '16px', y: '7px' },
                    iconOnly: { x: '10px', y: '10px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
                secondary: {
                    default: { x: '16px', y: '7px' },
                    iconOnly: { x: '10px', y: '10px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
                danger: {
                    default: { x: '16px', y: '7px' },
                    iconOnly: { x: '10px', y: '10px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
                success: {
                    default: { x: '16px', y: '7px' },
                    iconOnly: { x: '10px', y: '10px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
            },
            lg: {
                primary: {
                    default: { x: '16px', y: '13px' },
                    iconOnly: { x: '16px', y: '16px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
                secondary: {
                    default: { x: '16px', y: '13px' },
                    iconOnly: { x: '16px', y: '16px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
                danger: {
                    default: { x: '16px', y: '13px' },
                    iconOnly: { x: '16px', y: '16px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
                success: {
                    default: { x: '16px', y: '13px' },
                    iconOnly: { x: '16px', y: '16px' },
                    inline: {
                        x: foundationToken.unit[0],
                        y: foundationToken.unit[0],
                    },
                },
            },
        },
        border: {
            primary: {
                default: {
                    default: `1px solid ${foundationToken.colors.primary[600]}`,
                    hover: `1px solid ${foundationToken.colors.primary[500]}`,
                    active: `1px solid ${foundationToken.colors.primary[600]}`,
                    disabled: `1px solid ${foundationToken.colors.primary[300]}`,
                },
                iconOnly: {
                    default: `1px solid ${foundationToken.colors.primary[600]}`,
                    hover: `1px solid ${foundationToken.colors.primary[500]}`,
                    active: `1px solid ${foundationToken.colors.primary[600]}`,
                    disabled: `1px solid ${foundationToken.colors.primary[300]}`,
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            secondary: {
                default: {
                    default: `1px solid ${foundationToken.colors.gray[200]}`,
                    hover: `1px solid ${foundationToken.colors.gray[150]}`,
                    active: `1px solid ${foundationToken.colors.gray[200]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[150]}`,
                },
                iconOnly: {
                    default: `1px solid ${foundationToken.colors.gray[200]}`,
                    hover: `1px solid ${foundationToken.colors.gray[150]}`,
                    active: `1px solid ${foundationToken.colors.gray[200]}`,
                    disabled: `1px solid ${foundationToken.colors.gray[150]}`,
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            danger: {
                default: {
                    default: `1px solid ${foundationToken.colors.red[600]}`,
                    hover: `1px solid ${foundationToken.colors.red[500]}`,
                    active: `1px solid ${foundationToken.colors.red[500]}`,
                    disabled: `1px solid ${foundationToken.colors.red[300]}`,
                },
                iconOnly: {
                    default: `1px solid ${foundationToken.colors.red[600]}`,
                    hover: `1px solid ${foundationToken.colors.red[500]}`,
                    active: `1px solid ${foundationToken.colors.red[500]}`,
                    disabled: `1px solid ${foundationToken.colors.red[300]}`,
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            success: {
                default: {
                    default: `1px solid ${foundationToken.colors.green[600]}`,
                    hover: `1px solid ${foundationToken.colors.green[500]}`,
                    active: `1px solid ${foundationToken.colors.green[600]}`,
                    disabled: `1px solid ${foundationToken.colors.green[300]}`,
                },
                iconOnly: {
                    default: `1px solid ${foundationToken.colors.green[600]}`,
                    hover: `1px solid ${foundationToken.colors.green[500]}`,
                    active: `1px solid ${foundationToken.colors.green[600]}`,
                    disabled: `1px solid ${foundationToken.colors.green[300]}`,
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
        },
        shadow: {
            primary: {
                default: {
                    default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                },
                iconOnly: {
                    default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            secondary: {
                default: {
                    default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    active: '0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset',
                    disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                },
                iconOnly: {
                    default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            danger: {
                default: {
                    default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                },
                iconOnly: {
                    default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
            success: {
                default: {
                    default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                },
                iconOnly: {
                    default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    active: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                },
                inline: {
                    default: 'none',
                    hover: 'none',
                    active: 'none',
                    disabled: 'none',
                },
            },
        },
        outline: {
            primary: {
                default: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.primary[200]}`,
                    disabled: `none`,
                },
                iconOnly: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.primary[200]}`,
                    disabled: `none`,
                },
                inline: {
                    default: `none`,
                    hover: `none`,
                    active: `1px solid ${foundationToken.colors.primary[500]}`,
                    disabled: `none`,
                },
            },
            secondary: {
                default: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.gray[100]}`,
                    disabled: `none`,
                },
                iconOnly: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.gray[100]}`,
                    disabled: `none`,
                },
                inline: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.gray[100]}`,
                    disabled: `none`,
                },
            },
            danger: {
                default: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.red[200]}`,
                    disabled: `none`,
                },
                iconOnly: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.red[200]}`,
                    disabled: `none`,
                },
                inline: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.red[200]}`,
                    disabled: `none`,
                },
            },
            success: {
                default: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.green[200]}`,
                    disabled: `none`,
                },
                iconOnly: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.green[200]}`,
                    disabled: `none`,
                },
                inline: {
                    default: `none`,
                    hover: `none`,
                    active: `3px solid ${foundationToken.colors.green[200]}`,
                    disabled: `none`,
                },
            },
        },
        text: {
            color: {
                primary: {
                    default: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[0],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[0],
                    },
                    iconOnly: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[0],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[0],
                    },
                    inline: {
                        default: foundationToken.colors.primary[600],
                        hover: foundationToken.colors.primary[600],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.primary[300],
                    },
                },
                secondary: {
                    default: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[600],
                        active: foundationToken.colors.gray[600],
                        disabled: foundationToken.colors.gray[300],
                    },
                    iconOnly: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[600],
                        active: foundationToken.colors.gray[600],
                        disabled: foundationToken.colors.gray[400],
                    },
                    inline: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[600],
                        active: foundationToken.colors.gray[600],
                        disabled: foundationToken.colors.gray[400],
                    },
                },
                danger: {
                    default: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[0],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[0],
                    },
                    iconOnly: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[0],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[0],
                    },
                    inline: {
                        default: foundationToken.colors.red[600],
                        hover: foundationToken.colors.red[600],
                        active: foundationToken.colors.red[600],
                        disabled: foundationToken.colors.red[400],
                    },
                },
                success: {
                    default: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[0],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[0],
                    },
                    iconOnly: {
                        default: foundationToken.colors.gray[0],
                        hover: foundationToken.colors.gray[0],
                        active: foundationToken.colors.gray[0],
                        disabled: foundationToken.colors.gray[0],
                    },
                    inline: {
                        default: foundationToken.colors.green[600],
                        hover: foundationToken.colors.green[600],
                        active: foundationToken.colors.green[600],
                        disabled: foundationToken.colors.green[400],
                    },
                },
            },
            fontSize: {
                sm: foundationToken.font.size.body.md.fontSize,
                md: foundationToken.font.size.body.md.fontSize,
                lg: foundationToken.font.size.body.md.fontSize,
            },
            fontWeight: {
                sm: foundationToken.font.weight[600],
                md: foundationToken.font.weight[600],
                lg: foundationToken.font.weight[600],
            },
        },
    }
}
