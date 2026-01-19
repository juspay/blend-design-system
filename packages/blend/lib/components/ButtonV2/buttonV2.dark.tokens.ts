import { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveButtonV2Tokens } from './buttonV2.tokens'

export const getButtonV2DarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveButtonV2Tokens => {
    return {
        sm: {
            gap: foundationToken.unit[10],
            // Pattern: backgroundColor.[variant].[subType].[state]
            // Example: backgroundColor.primary.default.hover
            backgroundColor: {
                primary: {
                    default: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} -5%, ${foundationToken.colors.red[500]} 107.5%)`,
                        hover: foundationToken.colors.primary[600],
                        active: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                        disabled: foundationToken.colors.primary[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.primary[600]} -5%, ${foundationToken.colors.primary[500]} 107.5%)`,
                        hover: foundationToken.colors.primary[600],
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
                        default: foundationToken.colors.gray[900],
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
                        hover: foundationToken.colors.red[600],
                        active: foundationToken.colors.red[500],
                        disabled: foundationToken.colors.red[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} 0%, ${foundationToken.colors.red[500]} 93.75%)`,
                        hover: foundationToken.colors.red[600],
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
                        hover: foundationToken.colors.green[600],
                        active: foundationToken.colors.green[600],
                        disabled: foundationToken.colors.green[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.green[600]} 0%, ${foundationToken.colors.green[500]} 100%)`,
                        hover: foundationToken.colors.green[600],
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
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    secondary: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    danger: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    success: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                },
                md: {
                    primary: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    secondary: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    danger: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    success: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                },
                lg: {
                    primary: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    secondary: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    danger: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    success: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                },
            },
            // Pattern: padding.[direction].[size].[variant].[subType]
            // Example: padding.top.lg.primary.inline
            padding: {
                top: {
                    sm: {
                        primary: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    md: {
                        primary: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    lg: {
                        primary: {
                            default: '13px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '13px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '13px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '13px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                    },
                },
                right: {
                    sm: {
                        primary: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    md: {
                        primary: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    lg: {
                        primary: {
                            default: '16px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                    },
                },
                bottom: {
                    sm: {
                        primary: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    md: {
                        primary: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    lg: {
                        primary: {
                            default: '13px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '13px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '13px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '13px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                    },
                },
                left: {
                    sm: {
                        primary: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    md: {
                        primary: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    lg: {
                        primary: {
                            default: '16px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '16px',
                            inline: foundationToken.unit[0],
                        },
                    },
                },
            },
            // Pattern: border.[variant].[subType].[state]
            // Example: border.danger.default.disabled
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
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
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
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
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
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
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
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
            },
            // Pattern: shadow.[variant].[subType].[state]
            // Example: shadow.primary.default.hover
            shadow: {
                primary: {
                    default: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: `0 2px 5px 0 rgba(0, 0, 0, 0.10), 0 3px 4px 0 ${foundationToken.colors.primary[800]} inset`,
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: `0 2px 5px 0 rgba(0, 0, 0, 0.10), 0 3px 4px 0 ${foundationToken.colors.primary[800]} inset`,
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
                        active: '0 2px 3px 0 rgba(0, 0, 0, 0.08), 0 4px 4px 0 rgba(0, 0, 0, 0.12) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0 2px 3px 0 rgba(0, 0, 0, 0.08), 0 4px 4px 0 rgba(0, 0, 0, 0.12) inset',
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
                        active: '0 2px 3px 0 rgba(0, 0, 0, 0.08), 0 4px 4px 0 rgba(0, 0, 0, 0.12) inset',
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: '0 2px 3px 0 rgba(0, 0, 0, 0.08), 0 4px 4px 0 rgba(0, 0, 0, 0.12) inset',
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
            text: {
                // Pattern: text.color.[variant].[subType].[state]
                // Example: text.color.primary.inline.hover
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
                    sm: foundationToken.font.fontSize[14],
                    md: foundationToken.font.fontSize[14],
                    lg: foundationToken.font.fontSize[14],
                },
                fontWeight: {
                    sm: foundationToken.font.weight[500],
                    md: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
                lineHeight: {
                    sm: foundationToken.font.lineHeight[20],
                    md: foundationToken.font.lineHeight[20],
                    lg: foundationToken.font.lineHeight[20],
                },
            },
        },
        lg: {
            gap: foundationToken.unit[20],
            backgroundColor: {
                primary: {
                    default: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.red[600]} -5%, ${foundationToken.colors.red[500]} 107.5%)`,
                        hover: foundationToken.colors.primary[600],
                        active: `linear-gradient(180deg, ${foundationToken.colors.primary[500]} -5%, ${foundationToken.colors.primary[600]} 107.5%)`,
                        disabled: foundationToken.colors.primary[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.primary[500]} -5%, ${foundationToken.colors.primary[600]} 107.5%)`,
                        hover: foundationToken.colors.primary[600],
                        active: `linear-gradient(180deg, ${foundationToken.colors.primary[500]} -5%, ${foundationToken.colors.primary[600]} 107.5%)`,
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
                        default: `linear-gradient(180deg, ${foundationToken.colors.red[500]} 0%, ${foundationToken.colors.red[600]} 93.75%)`,
                        hover: foundationToken.colors.red[600],
                        active: foundationToken.colors.red[500],
                        disabled: foundationToken.colors.red[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.red[500]} 0%, ${foundationToken.colors.red[600]} 93.75%)`,
                        hover: foundationToken.colors.red[600],
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
                        default: `linear-gradient(180deg, ${foundationToken.colors.green[500]} 0%, ${foundationToken.colors.green[600]} 100%)`,
                        hover: foundationToken.colors.green[600],
                        active: foundationToken.colors.green[600],
                        disabled: foundationToken.colors.green[300],
                    },
                    iconOnly: {
                        default: `linear-gradient(180deg, ${foundationToken.colors.green[500]} 0%, ${foundationToken.colors.green[600]} 100%)`,
                        hover: foundationToken.colors.green[600],
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
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    secondary: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    danger: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    success: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                },
                md: {
                    primary: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    secondary: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    danger: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                    success: {
                        default: foundationToken.border.radius[10],
                        iconOnly: foundationToken.border.radius[10],
                        inline: foundationToken.border.radius[6],
                    },
                },
                lg: {
                    primary: {
                        default: foundationToken.border.radius[12],
                        iconOnly: foundationToken.border.radius[12],
                        inline: foundationToken.border.radius[6],
                    },
                    secondary: {
                        default: foundationToken.border.radius[12],
                        iconOnly: foundationToken.border.radius[12],
                        inline: foundationToken.border.radius[6],
                    },
                    danger: {
                        default: foundationToken.border.radius[12],
                        iconOnly: foundationToken.border.radius[12],
                        inline: foundationToken.border.radius[6],
                    },
                    success: {
                        default: foundationToken.border.radius[12],
                        iconOnly: foundationToken.border.radius[12],
                        inline: foundationToken.border.radius[6],
                    },
                },
            },
            // Pattern: padding.[direction].[size].[variant].[subType]
            // Example: padding.top.lg.primary.inline
            padding: {
                top: {
                    sm: {
                        primary: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    md: {
                        primary: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    lg: {
                        primary: {
                            default: '9px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '9px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '9px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '9px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                    },
                },
                right: {
                    sm: {
                        primary: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    md: {
                        primary: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    lg: {
                        primary: {
                            default: '16px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                    },
                },
                bottom: {
                    sm: {
                        primary: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '5px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    md: {
                        primary: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '7px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    lg: {
                        primary: {
                            default: '9px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '9px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '9px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '9px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                    },
                },
                left: {
                    sm: {
                        primary: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '9px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    md: {
                        primary: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '10px',
                            inline: foundationToken.unit[0],
                        },
                    },
                    lg: {
                        primary: {
                            default: '16px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        secondary: {
                            default: '16px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        danger: {
                            default: '16px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                        success: {
                            default: '16px',
                            iconOnly: '12px',
                            inline: foundationToken.unit[0],
                        },
                    },
                },
            },
            // Pattern: border.[variant].[subType].[state]
            // Example: border.danger.default.disabled
            border: {
                primary: {
                    default: {
                        default: `1px solid ${foundationToken.colors.primary[600]}`,
                        hover: `1px solid ${foundationToken.colors.primary[600]}`,
                        active: `1px solid ${foundationToken.colors.primary[600]}`,
                        disabled: `1px solid ${foundationToken.colors.primary[300]}`,
                    },
                    iconOnly: {
                        default: `1px solid ${foundationToken.colors.primary[600]}`,
                        hover: `1px solid ${foundationToken.colors.primary[600]}`,
                        active: `1px solid ${foundationToken.colors.primary[600]}`,
                        disabled: `1px solid ${foundationToken.colors.primary[300]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
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
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
                danger: {
                    default: {
                        default: `1px solid ${foundationToken.colors.red[600]}`,
                        hover: `1px solid ${foundationToken.colors.red[600]}`,
                        active: `1px solid ${foundationToken.colors.red[500]}`,
                        disabled: `1px solid ${foundationToken.colors.red[300]}`,
                    },
                    iconOnly: {
                        default: `1px solid ${foundationToken.colors.red[600]}`,
                        hover: `1px solid ${foundationToken.colors.red[600]}`,
                        active: `1px solid ${foundationToken.colors.red[500]}`,
                        disabled: `1px solid ${foundationToken.colors.red[300]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
                success: {
                    default: {
                        default: `1px solid ${foundationToken.colors.green[600]}`,
                        hover: `1px solid ${foundationToken.colors.green[600]}`,
                        active: `1px solid ${foundationToken.colors.green[600]}`,
                        disabled: `1px solid ${foundationToken.colors.green[300]}`,
                    },
                    iconOnly: {
                        default: `1px solid ${foundationToken.colors.green[600]}`,
                        hover: `1px solid ${foundationToken.colors.green[600]}`,
                        active: `1px solid ${foundationToken.colors.green[600]}`,
                        disabled: `1px solid ${foundationToken.colors.green[300]}`,
                    },
                    inline: {
                        default: `none`,
                        hover: `none`,
                        active: `none`,
                        disabled: `none`,
                    },
                },
            },
            // Pattern: shadow.[variant].[subType].[state]
            // Example: shadow.primary.default.hover
            shadow: {
                primary: {
                    default: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: `0 2px 5px 0 rgba(0, 0, 0, 0.10), 0 3px 6px 0 ${foundationToken.colors.primary[800]} inset`,
                        disabled: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                    },
                    iconOnly: {
                        default: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        hover: '0px 4px 4px 0px rgba(0, 0, 0, 0.15) inset',
                        active: `0 2px 5px 0 rgba(0, 0, 0, 0.10), 0 3px 4px 0 ${foundationToken.colors.primary[800]} inset`,
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
            text: {
                // Pattern: text.color.[variant].[subType].[state]
                // Example: text.color.primary.inline.hover
                color: {
                    primary: {
                        default: {
                            default: foundationToken.colors.red[700],
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
                            default: foundationToken.colors.gray[700],
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
                    sm: foundationToken.font.fontSize[14],
                    md: foundationToken.font.fontSize[14],
                    lg: foundationToken.font.fontSize[14],
                },
                fontWeight: {
                    sm: foundationToken.font.weight[500],
                    md: foundationToken.font.weight[500],
                    lg: foundationToken.font.weight[500],
                },
                lineHeight: {
                    sm: foundationToken.font.lineHeight[20],
                    md: foundationToken.font.lineHeight[20],
                    lg: foundationToken.font.lineHeight[20],
                },
            },
        },
    }
}
