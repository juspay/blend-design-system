import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveAccordionV2Tokens } from './accordionV2.tokens'
import { AccordionV2Type } from './accordionV2.types'

export const getAccordionV2LightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveAccordionV2Tokens => {
    return {
        sm: {
            gap: {
                [AccordionV2Type.BORDER]: foundationToken.unit[0],
                [AccordionV2Type.NO_BORDER]: foundationToken.unit[0],
            },
            borderRadius: {
                [AccordionV2Type.BORDER]: foundationToken.border.radius[8],
                [AccordionV2Type.NO_BORDER]: foundationToken.border.radius[8],
            },
            trigger: {
                content: {
                    gap: foundationToken.unit[8],
                },
                backgroundColor: {
                    [AccordionV2Type.BORDER]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[50],
                        disabled: foundationToken.colors.gray[50],
                        open: foundationToken.colors.gray[50],
                    },
                    [AccordionV2Type.NO_BORDER]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[50],
                        disabled: foundationToken.colors.gray[50],
                        open: 'transparent',
                    },
                },
                border: {
                    [AccordionV2Type.BORDER]: {
                        default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        open: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    },
                    [AccordionV2Type.NO_BORDER]: {
                        default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        open: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    },
                },
                padding: {
                    [AccordionV2Type.BORDER]: `${foundationToken.unit[20]} ${foundationToken.unit[16]}`,
                    [AccordionV2Type.NO_BORDER]: `${foundationToken.unit[20]} ${foundationToken.unit[16]}`,
                },
                text: {
                    gap: foundationToken.unit[4],
                    title: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        lineHeight: foundationToken.font.lineHeight[16],
                        color: {
                            default: foundationToken.colors.gray[800],
                            hover: foundationToken.colors.gray[800],
                            active: foundationToken.colors.gray[800],
                            disabled: foundationToken.colors.gray[500],
                            open: foundationToken.colors.gray[800],
                        },
                    },
                    subtext: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        lineHeight: foundationToken.font.lineHeight[16],
                        gap: foundationToken.unit[4],
                        color: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[600],
                            disabled: foundationToken.colors.gray[300],
                            open: foundationToken.colors.gray[600],
                        },
                    },
                },
                slot: {
                    height: foundationToken.unit[16],
                },
            },
            separator: {
                color: {
                    [AccordionV2Type.BORDER]: foundationToken.colors.gray[200],
                    [AccordionV2Type.NO_BORDER]:
                        foundationToken.colors.gray[200],
                },
            },
            chevron: {
                height: foundationToken.unit[16],
                color: {
                    default: foundationToken.colors.gray[500],
                    hover: foundationToken.colors.gray[600],
                    active: foundationToken.colors.gray[600],
                    disabled: foundationToken.colors.gray[300],
                    open: foundationToken.colors.gray[600],
                },
            },
        },
        lg: {
            gap: {
                [AccordionV2Type.BORDER]: foundationToken.unit[24],
                [AccordionV2Type.NO_BORDER]: foundationToken.unit[8],
            },
            borderRadius: {
                [AccordionV2Type.BORDER]: foundationToken.border.radius[8],
                [AccordionV2Type.NO_BORDER]: foundationToken.border.radius[8],
            },
            trigger: {
                content: {
                    gap: foundationToken.unit[8],
                },
                backgroundColor: {
                    [AccordionV2Type.BORDER]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[50],
                        disabled: foundationToken.colors.gray[50],
                        open: foundationToken.colors.gray[50],
                    },
                    [AccordionV2Type.NO_BORDER]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[50],
                        disabled: foundationToken.colors.gray[50],
                        open: 'transparent',
                    },
                },
                border: {
                    [AccordionV2Type.BORDER]: {
                        default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        open: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    },
                    [AccordionV2Type.NO_BORDER]: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                        open: 'none',
                    },
                },
                padding: {
                    [AccordionV2Type.BORDER]: `${foundationToken.unit[16]} ${foundationToken.unit[16]}`,
                    [AccordionV2Type.NO_BORDER]: `${foundationToken.unit[16]} ${foundationToken.unit[12]}`,
                },
                text: {
                    gap: foundationToken.unit[4],
                    title: {
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        lineHeight: 16,
                        color: {
                            default: foundationToken.colors.gray[800],
                            hover: foundationToken.colors.gray[800],
                            active: foundationToken.colors.gray[800],
                            disabled: foundationToken.colors.gray[500],
                            open: foundationToken.colors.gray[800],
                        },
                    },
                    subtext: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        lineHeight: foundationToken.font.lineHeight[16],
                        gap: foundationToken.unit[4],
                        color: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[600],
                            disabled: foundationToken.colors.gray[300],
                            open: foundationToken.colors.gray[600],
                        },
                    },
                },
                slot: {
                    height: foundationToken.unit[16],
                },
            },
            separator: {
                color: {
                    [AccordionV2Type.BORDER]: foundationToken.colors.gray[200],
                    [AccordionV2Type.NO_BORDER]:
                        foundationToken.colors.gray[200],
                },
            },
            chevron: {
                height: foundationToken.unit[16],
                color: {
                    default: foundationToken.colors.gray[500],
                    hover: foundationToken.colors.gray[600],
                    active: foundationToken.colors.gray[600],
                    disabled: foundationToken.colors.gray[300],
                    open: foundationToken.colors.gray[600],
                },
            },
        },
    }
}
