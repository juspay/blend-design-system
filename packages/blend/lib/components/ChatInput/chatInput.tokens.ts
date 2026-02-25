import type { CSSObject } from 'styled-components'
import { type BreakpointType } from '../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../tokens/theme.token'

/**
 * ChatInput Tokens following the pattern: [target].property.[state]
 *
 * Structure:
 * - container: Main chat input container
 * - textarea: Text input area
 * - filesContainer: File attachment display area
 * - bottomActions: Action buttons container
 * - overflowTag: "+X more" files button
 * - topQueries: Top queries section with header and items
 */
export type ChatInputTokensType = Readonly<{
    backgroundColor: {
        default: CSSObject['backgroundColor']
        hover: CSSObject['backgroundColor']
        disabled: CSSObject['backgroundColor']
    }
    borderRadius: {
        default: CSSObject['borderRadius']
        focus: CSSObject['borderRadius']
    }
    border: {
        default: CSSObject['border']
        focus: CSSObject['border']
    }
    minHeight: CSSObject['minHeight']
    maxHeight: CSSObject['maxHeight']
    gap: CSSObject['gap']
    text: {
        color: {
            default: CSSObject['color']
            hover: CSSObject['color']
            focus: CSSObject['color']
            disabled: CSSObject['color']
        }
        fontSize: {
            default: CSSObject['fontSize']
            hover: CSSObject['fontSize']
            focus: CSSObject['fontSize']
            disabled: CSSObject['fontSize']
        }
        fontWeight: {
            default: CSSObject['fontWeight']
            hover: CSSObject['fontWeight']
            focus: CSSObject['fontWeight']
            disabled: CSSObject['fontWeight']
        }
        lineHeight: {
            default: CSSObject['lineHeight']
            hover: CSSObject['lineHeight']
            focus: CSSObject['lineHeight']
        }
    }
    resize: CSSObject['resize']
    overflow: CSSObject['overflow']
    paddingLeft: CSSObject['paddingLeft']
    paddingTop: CSSObject['paddingTop']
    paddingBottom: CSSObject['paddingBottom']
    container: {
        backgroundColor: {
            default: CSSObject['backgroundColor']
            hover: CSSObject['backgroundColor']
            disabled: CSSObject['backgroundColor']
        }
        border: {
            default: CSSObject['border']
            focus: CSSObject['border']
        }
        borderRadius: CSSObject['borderRadius']
        padding: CSSObject['padding']
        gap: CSSObject['gap']
        minHeight: CSSObject['minHeight']
        transition: CSSObject['transition']
        boxShadow: {
            default: CSSObject['boxShadow']
            hover: CSSObject['boxShadow']
            focus: CSSObject['boxShadow']
        }
    }

    attachmentContainer: {
        backgroundColor: CSSObject['backgroundColor']
        borderRadius: CSSObject['borderRadius']
        padding: CSSObject['padding']
    }

    textarea: {
        backgroundColor: CSSObject['backgroundColor']
        color: CSSObject['color']
        fontSize: CSSObject['fontSize']
        lineHeight: CSSObject['lineHeight']
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        placeholder: {
            color: CSSObject['color']
        }
        resize: CSSObject['resize']
        fontFamily: CSSObject['fontFamily']
        minHeight: CSSObject['minHeight']
        maxHeight: CSSObject['maxHeight']
        overflowY: CSSObject['overflowY']
    }

    filesContainer: {
        gap: CSSObject['gap']
        paddingX: CSSObject['padding']
        paddingY: CSSObject['padding']
        maxHeight: CSSObject['maxHeight']
        overflowY: CSSObject['overflowY']
    }

    bottomActions: {
        paddingX: CSSObject['padding']
        paddingY: CSSObject['padding']
        gap: CSSObject['gap']
        justifyContent: CSSObject['justifyContent']
    }

    overflowTag: {
        backgroundColor: {
            default: CSSObject['backgroundColor']
            hover: CSSObject['backgroundColor']
            active: CSSObject['backgroundColor']
        }
        color: {
            default: CSSObject['color']
            hover: CSSObject['color']
            active: CSSObject['color']
        }
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        paddingX: CSSObject['padding']
        paddingY: CSSObject['padding']
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        gap: CSSObject['gap']
        transition: CSSObject['transition']
        cursor: CSSObject['cursor']
    }

    topQueries: {
        container: {
            borderTop: CSSObject['borderTop']
            paddingTop: CSSObject['paddingTop']
        }
        header: {
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            paddingX: CSSObject['padding']
            paddingY: CSSObject['padding']
            textTransform: CSSObject['textTransform']
            backgroundColor: CSSObject['backgroundColor']
            flexShrink: CSSObject['flexShrink']
        }
        scrollContainer: {
            overflowY: CSSObject['overflowY']
            maxHeightOffset: number
            backgroundColor: CSSObject['backgroundColor']
        }
        item: {
            backgroundColor: {
                default: CSSObject['backgroundColor']
                hover: CSSObject['backgroundColor']
                active: CSSObject['backgroundColor']
                disabled: CSSObject['backgroundColor']
            }
            color: {
                default: CSSObject['color']
                hover: CSSObject['color']
                active: CSSObject['color']
                disabled: CSSObject['color']
            }
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            paddingX: CSSObject['padding']
            paddingY: CSSObject['padding']
            border: CSSObject['border']
            transition: CSSObject['transition']
            cursor: CSSObject['cursor']
            opacity: {
                default: CSSObject['opacity']
                disabled: CSSObject['opacity']
            }
        }
    }
}>

export type ResponsiveChatInputTokensType = {
    [key in keyof BreakpointType]: ChatInputTokensType
}

export const getChatInputTokens = (
    foundationToken: FoundationTokenType
): ResponsiveChatInputTokensType => {
    return {
        sm: {
            backgroundColor: {
                default: foundationToken.colors.gray[0],
                hover: foundationToken.colors.gray[25],
                disabled: foundationToken.colors.gray[0],
            },
            borderRadius: {
                default: foundationToken.unit[100],
                focus: foundationToken.unit[20],
            },
            border: {
                default: `1px solid ${foundationToken.colors.gray[200]}`,
                focus: `1px solid ${foundationToken.colors.primary[500]}`,
            },
            minHeight: foundationToken.unit[44],
            maxHeight: foundationToken.unit[100],
            gap: foundationToken.unit[8],
            text: {
                color: {
                    default: foundationToken.colors.gray[600],
                    hover: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[700],
                    disabled: foundationToken.colors.gray[400],
                },
                fontSize: {
                    default: foundationToken.font.size.body.md.fontSize,
                    hover: foundationToken.font.size.body.md.fontSize,
                    focus: foundationToken.font.size.body.md.fontSize,
                    disabled: foundationToken.font.size.body.md.fontSize,
                },
                fontWeight: {
                    default: foundationToken.font.weight[500],
                    hover: foundationToken.font.weight[500],
                    focus: foundationToken.font.weight[500],
                    disabled: foundationToken.font.weight[500],
                },
                lineHeight: {
                    default: '1.5',
                    hover: '1.5',
                    focus: '1.5',
                },
            },
            resize: 'none',
            overflow: 'auto',
            paddingLeft: foundationToken.unit[12],
            paddingTop: foundationToken.unit[10],
            paddingBottom: foundationToken.unit[10],
            container: {
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[25],
                    disabled: foundationToken.colors.gray[0],
                },
                border: {
                    default: `1px solid ${foundationToken.colors.gray[200]}`,
                    focus: `1px solid ${foundationToken.colors.primary[500]}`,
                },
                borderRadius: foundationToken.unit[12],
                padding: foundationToken.unit[4],
                gap: foundationToken.unit[8],
                minHeight: '52px',
                transition: 'all 0.2s ease',
                boxShadow: {
                    default: `inset 0 0 0 3px ${foundationToken.colors.gray[50]}`,
                    hover: `inset 0 0 0 3px ${foundationToken.colors.gray[50]}`,
                    focus: `0px 0px 0px 3px ${foundationToken.colors.primary[50]}`,
                },
            },

            attachmentContainer: {
                backgroundColor: foundationToken.colors.gray[0],
                borderRadius: foundationToken.unit[8],
                padding: foundationToken.unit[16],
            },

            textarea: {
                backgroundColor: 'transparent',
                color: foundationToken.colors.gray[600],
                fontSize: foundationToken.font.size.body.md.fontSize,
                lineHeight: '1.5',
                paddingTop: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[6],
                paddingLeft: foundationToken.unit[12],
                border: 'none',
                borderRadius: foundationToken.unit[0],
                placeholder: {
                    color: foundationToken.colors.gray[400],
                },
                resize: 'none',
                fontFamily: 'inherit',
                minHeight: '44px',
                maxHeight: '100px',
                overflowY: 'auto',
            },

            filesContainer: {
                gap: foundationToken.unit[8],
                paddingX: foundationToken.unit[0],
                paddingY: foundationToken.unit[8],
                maxHeight: '140px',
                overflowY: 'auto',
            },

            bottomActions: {
                paddingX: foundationToken.unit[0],
                paddingY: foundationToken.unit[0],
                gap: foundationToken.unit[16],
                justifyContent: 'space-between',
            },

            overflowTag: {
                backgroundColor: {
                    default: foundationToken.colors.gray[100],
                    hover: foundationToken.colors.gray[200],
                    active: foundationToken.colors.gray[300],
                },
                color: {
                    default: foundationToken.colors.gray[600],
                    hover: foundationToken.colors.gray[700],
                    active: foundationToken.colors.gray[700],
                },
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.unit[4],
                paddingX: foundationToken.unit[10],
                paddingY: foundationToken.unit[6],
                fontSize: '14px',
                fontWeight: '500',
                gap: foundationToken.unit[4],
                transition: 'all 0.2s ease',
                cursor: 'pointer',
            },

            topQueries: {
                container: {
                    borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                    paddingTop: foundationToken.unit[0],
                },
                header: {
                    color: foundationToken.colors.gray[400],
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: '400',
                    paddingX: foundationToken.unit[8],
                    paddingY: foundationToken.unit[6],
                    textTransform: 'uppercase',
                    backgroundColor: foundationToken.colors.gray[0],
                    flexShrink: '0',
                },
                scrollContainer: {
                    overflowY: 'auto',
                    maxHeightOffset: 40,
                    backgroundColor: foundationToken.colors.gray[0],
                },
                item: {
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[100],
                        disabled: 'transparent',
                    },
                    color: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                    },
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: '500',
                    paddingX: foundationToken.unit[8],
                    paddingY: foundationToken.unit[6],
                    border: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    opacity: {
                        default: '1',
                        disabled: '0.5',
                    },
                },
            },
        },

        lg: {
            backgroundColor: {
                default: foundationToken.colors.gray[0],
                hover: foundationToken.colors.gray[25],
                disabled: foundationToken.colors.gray[0],
            },
            borderRadius: {
                default: foundationToken.unit[100],
                focus: foundationToken.unit[20],
            },
            border: {
                default: `1px solid ${foundationToken.colors.gray[200]}`,
                focus: `1px solid ${foundationToken.colors.primary[500]}`,
            },
            minHeight: foundationToken.unit[44],
            maxHeight: foundationToken.unit[100],
            gap: foundationToken.unit[8],
            text: {
                color: {
                    default: foundationToken.colors.gray[600],
                    hover: foundationToken.colors.gray[700],
                    focus: foundationToken.colors.gray[700],
                    disabled: foundationToken.colors.gray[400],
                },
                fontSize: {
                    default: foundationToken.font.size.body.md.fontSize,
                    hover: foundationToken.font.size.body.md.fontSize,
                    focus: foundationToken.font.size.body.md.fontSize,
                    disabled: foundationToken.font.size.body.md.fontSize,
                },
                fontWeight: {
                    default: foundationToken.font.weight[500],
                    hover: foundationToken.font.weight[500],
                    focus: foundationToken.font.weight[500],
                    disabled: foundationToken.font.weight[500],
                },
                lineHeight: {
                    default: '1.5',
                    hover: '1.5',
                    focus: '1.5',
                },
            },
            resize: 'none',
            overflow: 'auto',
            paddingLeft: foundationToken.unit[12],
            paddingTop: foundationToken.unit[10],
            paddingBottom: foundationToken.unit[10],
            container: {
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[25],
                    disabled: foundationToken.colors.gray[0],
                },
                border: {
                    default: `1px solid ${foundationToken.colors.gray[200]}`,
                    focus: `1px solid ${foundationToken.colors.primary[500]}`,
                },
                borderRadius: foundationToken.unit[12],
                padding: foundationToken.unit[4],
                gap: foundationToken.unit[4],
                minHeight: '52px',
                transition: 'all 0.2s ease',
                boxShadow: {
                    default: `inset 0 0 0 3px ${foundationToken.colors.gray[50]}`,
                    hover: `inset 0 0 0 3px ${foundationToken.colors.gray[50]}`,
                    focus: `inset 0 0 0 3px ${foundationToken.colors.gray[50]}`,
                },
            },

            attachmentContainer: {
                backgroundColor: foundationToken.colors.gray[0],
                borderRadius: foundationToken.unit[8],
                padding: foundationToken.unit[16],
            },

            textarea: {
                backgroundColor: 'transparent',
                color: foundationToken.colors.gray[600],
                fontSize: '16px',
                lineHeight: '1.5',
                paddingTop: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[8],
                paddingLeft: foundationToken.unit[12],
                border: 'none',
                borderRadius: foundationToken.unit[0],
                placeholder: {
                    color: foundationToken.colors.gray[400],
                },
                resize: 'none',
                fontFamily: 'inherit',
                minHeight: '24px',
                maxHeight: '120px',
                overflowY: 'auto',
            },

            filesContainer: {
                gap: foundationToken.unit[8],
                paddingX: foundationToken.unit[0],
                paddingY: foundationToken.unit[8],
                maxHeight: '140px',
                overflowY: 'auto',
            },

            bottomActions: {
                paddingX: foundationToken.unit[0],
                paddingY: foundationToken.unit[0],
                gap: foundationToken.unit[16],
                justifyContent: 'space-between',
            },

            overflowTag: {
                backgroundColor: {
                    default: foundationToken.colors.gray[100],
                    hover: foundationToken.colors.gray[200],
                    active: foundationToken.colors.gray[300],
                },
                color: {
                    default: foundationToken.colors.gray[600],
                    hover: foundationToken.colors.gray[700],
                    active: foundationToken.colors.gray[700],
                },
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.unit[4],
                paddingX: foundationToken.unit[10],
                paddingY: foundationToken.unit[6],
                fontSize: '14px',
                fontWeight: '500',
                gap: foundationToken.unit[4],
                transition: 'all 0.2s ease',
                cursor: 'pointer',
            },

            topQueries: {
                container: {
                    borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
                    paddingTop: foundationToken.unit[0],
                },
                header: {
                    color: foundationToken.colors.gray[400],
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: '400',
                    paddingX: foundationToken.unit[8],
                    paddingY: foundationToken.unit[6],
                    textTransform: 'uppercase',
                    backgroundColor: foundationToken.colors.gray[0],
                    flexShrink: '0',
                },
                scrollContainer: {
                    overflowY: 'auto',
                    maxHeightOffset: 40,
                    backgroundColor: foundationToken.colors.gray[0],
                },
                item: {
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[100],
                        disabled: 'transparent',
                    },
                    color: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[700],
                        disabled: foundationToken.colors.gray[400],
                    },
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: '500',
                    paddingX: foundationToken.unit[8],
                    paddingY: foundationToken.unit[6],
                    border: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    opacity: {
                        default: '1',
                        disabled: '0.5',
                    },
                },
            },
        },
    }
}

export default getChatInputTokens
