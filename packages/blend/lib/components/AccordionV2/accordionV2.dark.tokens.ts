import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveAccordionV2Tokens } from './accordionV2.tokens'
import { AccordionV2Type } from './accordionV2.types'

export const getAccordionV2DarkTokens = (
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
                        hover: foundationToken.colors.gray[800],
                        active: foundationToken.colors.gray[800],
                        disabled: foundationToken.colors.gray[800],
                        open: foundationToken.colors.gray[800],
                    },
                    [AccordionV2Type.NO_BORDER]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[800],
                        active: foundationToken.colors.gray[800],
                        disabled: foundationToken.colors.gray[800],
                        open: 'transparent',
                    },
                },
                border: {
                    [AccordionV2Type.BORDER]: {
                        default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        open: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                    },
                    [AccordionV2Type.NO_BORDER]: {
                        default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        open: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                    },
                },
                padding: {
                    [AccordionV2Type.BORDER]: `${foundationToken.unit[20]} ${foundationToken.unit[16]}`,
                    [AccordionV2Type.NO_BORDER]: `${foundationToken.unit[20]} ${foundationToken.unit[16]}`,
                },
                text: {
                    title: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: {
                            default: foundationToken.colors.gray[25],
                            hover: foundationToken.colors.gray[25],
                            active: foundationToken.colors.gray[25],
                            disabled: foundationToken.colors.gray[500],
                            open: foundationToken.colors.gray[25],
                        },
                    },
                    subtext: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        gap: foundationToken.unit[4],
                        color: {
                            default: foundationToken.colors.gray[300],
                            hover: foundationToken.colors.gray[300],
                            active: foundationToken.colors.gray[300],
                            disabled: foundationToken.colors.gray[600],
                            open: foundationToken.colors.gray[300],
                        },
                    },
                },
            },
            separator: {
                color: {
                    [AccordionV2Type.BORDER]: foundationToken.colors.gray[700],
                    [AccordionV2Type.NO_BORDER]:
                        foundationToken.colors.gray[700],
                },
            },
            chevron: {
                height: foundationToken.unit[16],
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[300],
                    active: foundationToken.colors.gray[300],
                    disabled: foundationToken.colors.gray[600],
                    open: foundationToken.colors.gray[300],
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
                        hover: foundationToken.colors.gray[800],
                        active: foundationToken.colors.gray[800],
                        disabled: foundationToken.colors.gray[800],
                        open: foundationToken.colors.gray[800],
                    },
                    [AccordionV2Type.NO_BORDER]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[800],
                        active: foundationToken.colors.gray[800],
                        disabled: foundationToken.colors.gray[800],
                        open: 'transparent',
                    },
                },
                border: {
                    [AccordionV2Type.BORDER]: {
                        default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        open: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
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
                    title: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: {
                            default: foundationToken.colors.gray[25],
                            hover: foundationToken.colors.gray[25],
                            active: foundationToken.colors.gray[25],
                            disabled: foundationToken.colors.gray[500],
                            open: foundationToken.colors.gray[25],
                        },
                    },
                    subtext: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        gap: foundationToken.unit[4],
                        color: {
                            default: foundationToken.colors.gray[300],
                            hover: foundationToken.colors.gray[300],
                            active: foundationToken.colors.gray[300],
                            disabled: foundationToken.colors.gray[600],
                            open: foundationToken.colors.gray[300],
                        },
                    },
                },
            },
            separator: {
                color: {
                    [AccordionV2Type.BORDER]: foundationToken.colors.gray[700],
                    [AccordionV2Type.NO_BORDER]:
                        foundationToken.colors.gray[700],
                },
            },
            chevron: {
                height: foundationToken.unit[16],
                color: {
                    default: foundationToken.colors.gray[400],
                    hover: foundationToken.colors.gray[300],
                    active: foundationToken.colors.gray[300],
                    disabled: foundationToken.colors.gray[600],
                    open: foundationToken.colors.gray[300],
                },
            },
        },
    }
}
