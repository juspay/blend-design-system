import type { CSSObject } from 'styled-components'
import { AccordionType } from './types'
import { type FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type AccordionState =
    | 'default'
    | 'hover'
    | 'active'
    | 'disabled'
    | 'open'

/**
 * Accordion Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure:
 * - target: container | trigger | separator (defines what element the token applies to)
 * - CSSProp: gap | borderRadius | padding | backgroundColor | border | fontSize | fontWeight | color
 * - variant: border | noBorder (accordion variant)
 * - state: default | hover | active | disabled | open (interaction state)
 *
 * Pattern examples:
 * - container.gap.[variant]
 * - container.borderRadius.[variant]
 * - trigger.backgroundColor.[variant].[state]
 * - trigger.border.[variant].[state]
 * - trigger.padding.[variant]
 * - text.fontSize (size-independent)
 * - text.fontWeight (size-independent)
 * - text.color.[state]
 */
export type AccordionTokenType = {
    // Pattern: gap.[variant]
    gap: {
        [key in AccordionType]: CSSObject['gap']
    }
    // Pattern: borderRadius.[variant]
    borderRadius: {
        [key in AccordionType]: CSSObject['borderRadius']
    }

    // Pattern: trigger.backgroundColor.[variant].[state]
    trigger: {
        backgroundColor: {
            [key in AccordionType]: {
                [key in AccordionState]: CSSObject['backgroundColor']
            }
        }
        // Pattern: trigger.border.[variant].[state]
        border: {
            [key in AccordionType]: {
                [key in AccordionState]: CSSObject['border']
            }
        }
        // Pattern: trigger.padding.[variant]
        padding: {
            [key in AccordionType]: CSSObject['padding']
        }

        // Text styling within trigger
        text: {
            title: {
                // Pattern: trigger.text.title.fontSize
                fontSize: CSSObject['fontSize']
                // Pattern: trigger.text.title.fontWeight
                fontWeight: CSSObject['fontWeight']
                // Pattern: trigger.text.title.color.[state]
                color: {
                    [key in AccordionState]: CSSObject['color']
                }
            }
            subtext: {
                // Pattern: trigger.text.subtext.fontSize
                fontSize: CSSObject['fontSize']
                // Pattern: trigger.text.subtext.gap
                gap: CSSObject['gap']
                // Pattern: trigger.text.subtext.color.[state]
                color: {
                    [key in AccordionState]: CSSObject['color']
                }
            }
        }
    }

    // Pattern: separator.color.[variant]
    separator: {
        color: {
            [key in AccordionType]: CSSObject['color']
        }
    }
}

export type ResponsiveAccordionTokens = {
    [key in keyof BreakpointType]: AccordionTokenType
}

export const getAccordionToken = (
    foundationToken: FoundationTokenType
): ResponsiveAccordionTokens => {
    return {
        sm: {
            // Pattern: gap.[variant]
            gap: {
                [AccordionType.BORDER]: foundationToken.unit[0],
                [AccordionType.NO_BORDER]: foundationToken.unit[0],
            },
            // Pattern: borderRadius.[variant]
            borderRadius: {
                [AccordionType.BORDER]: foundationToken.border.radius[8],
                [AccordionType.NO_BORDER]: foundationToken.border.radius[8],
            },

            // Pattern: trigger.backgroundColor.[variant].[state]
            trigger: {
                backgroundColor: {
                    [AccordionType.BORDER]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[50],
                        disabled: foundationToken.colors.gray[50],
                        open: foundationToken.colors.gray[50],
                    },
                    [AccordionType.NO_BORDER]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[50],
                        disabled: foundationToken.colors.gray[50],
                        open: 'transparent',
                    },
                },
                // Pattern: trigger.border.[variant].[state]
                border: {
                    [AccordionType.BORDER]: {
                        default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        open: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    },
                    [AccordionType.NO_BORDER]: {
                        default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        open: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    },
                },
                // Pattern: trigger.padding.[variant]
                padding: {
                    [AccordionType.BORDER]: `${foundationToken.unit[20]} ${foundationToken.unit[16]}`,
                    [AccordionType.NO_BORDER]: `${foundationToken.unit[20]} ${foundationToken.unit[16]}`,
                },

                // Text styling within trigger
                text: {
                    title: {
                        // Pattern: trigger.text.title.fontSize
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        // Pattern: trigger.text.title.fontWeight
                        fontWeight: foundationToken.font.weight[600],
                        // Pattern: trigger.text.title.color.[state]
                        color: {
                            default: foundationToken.colors.gray[800],
                            hover: foundationToken.colors.gray[800],
                            active: foundationToken.colors.gray[800],
                            disabled: foundationToken.colors.gray[500],
                            open: foundationToken.colors.gray[800],
                        },
                    },
                    subtext: {
                        // Pattern: trigger.text.subtext.fontSize
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        // Pattern: trigger.text.subtext.gap
                        gap: foundationToken.unit[4],
                        // Pattern: trigger.text.subtext.color.[state]
                        color: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[600],
                            disabled: foundationToken.colors.gray[300],
                            open: foundationToken.colors.gray[600],
                        },
                    },
                },
            },

            // Pattern: separator.color.[variant]
            separator: {
                color: {
                    [AccordionType.BORDER]: foundationToken.colors.gray[200],
                    [AccordionType.NO_BORDER]: foundationToken.colors.gray[200],
                },
            },
        },
        lg: {
            // Pattern: gap.[variant]
            gap: {
                [AccordionType.BORDER]: foundationToken.unit[24],
                [AccordionType.NO_BORDER]: foundationToken.unit[8],
            },
            // Pattern: borderRadius.[variant]
            borderRadius: {
                [AccordionType.BORDER]: foundationToken.border.radius[8],
                [AccordionType.NO_BORDER]: foundationToken.border.radius[8],
            },

            // Pattern: trigger.backgroundColor.[variant].[state]
            trigger: {
                backgroundColor: {
                    [AccordionType.BORDER]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[50],
                        disabled: foundationToken.colors.gray[50],
                        open: foundationToken.colors.gray[50],
                    },
                    [AccordionType.NO_BORDER]: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[50],
                        disabled: foundationToken.colors.gray[50],
                        open: 'transparent',
                    },
                },
                // Pattern: trigger.border.[variant].[state]
                border: {
                    [AccordionType.BORDER]: {
                        default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        open: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                    },
                    [AccordionType.NO_BORDER]: {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        disabled: 'none',
                        open: 'none',
                    },
                },
                // Pattern: trigger.padding.[variant]
                padding: {
                    [AccordionType.BORDER]: `${foundationToken.unit[16]} ${foundationToken.unit[16]}`,
                    [AccordionType.NO_BORDER]: `${foundationToken.unit[16]} ${foundationToken.unit[12]}`,
                },

                // Text styling within trigger
                text: {
                    title: {
                        // Pattern: trigger.text.title.fontSize
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        // Pattern: trigger.text.title.fontWeight
                        fontWeight: foundationToken.font.weight[600],
                        // Pattern: trigger.text.title.color.[state]
                        color: {
                            default: foundationToken.colors.gray[800],
                            hover: foundationToken.colors.gray[800],
                            active: foundationToken.colors.gray[800],
                            disabled: foundationToken.colors.gray[500],
                            open: foundationToken.colors.gray[800],
                        },
                    },
                    subtext: {
                        // Pattern: trigger.text.subtext.fontSize
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        // Pattern: trigger.text.subtext.gap
                        gap: foundationToken.unit[4],
                        // Pattern: trigger.text.subtext.color.[state]
                        color: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[600],
                            disabled: foundationToken.colors.gray[300],
                            open: foundationToken.colors.gray[600],
                        },
                    },
                },
            },

            // Pattern: separator.color.[variant]
            separator: {
                color: {
                    [AccordionType.BORDER]: foundationToken.colors.gray[200],
                    [AccordionType.NO_BORDER]: foundationToken.colors.gray[200],
                },
            },
        },
    }
}
