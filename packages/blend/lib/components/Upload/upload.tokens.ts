import type { CSSObject } from 'styled-components'
import { UploadSize, UploadState } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'

/**
 * Upload Tokens following the pattern: [target].CSSProp.[size].[state]
 *
 * Structure:
 * - target: container | slot | text | progressContainer (defines what element the token applies to)
 * - CSSProp: backgroundColor | borderRadius | padding | border | color | fontSize | gap
 * - size: sm | md | lg (only for size-dependent properties)
 * - state: idle | uploading | success | error (upload state)
 *
 * Size-independent properties: backgroundColor, border, color
 * Size-dependent properties: borderRadius, padding, fontSize, gap
 */
export type UploadTokenType = {
    // Pattern: container.border.[state]
    // Pattern: container.borderRadius.[size]
    // Pattern: container.backgroundColor.[state]
    // Pattern: container.padding.[size]
    container: {
        border: {
            [key in UploadState]: CSSObject['border']
        }
        borderRadius: {
            [key in UploadSize]: CSSObject['borderRadius']
        }
        backgroundColor: {
            [key in UploadState]: CSSObject['backgroundColor']
        }
        padding: {
            [key in UploadSize]: CSSObject['padding']
        }
        cursor: {
            [key in UploadState]: CSSObject['cursor']
        }
    }
    // Pattern: slot.padding.[size]
    // Pattern: slot.gap.[size]
    slot: {
        padding: {
            [key in UploadSize]: CSSObject['padding']
        }
        gap: {
            [key in UploadSize]: CSSObject['gap']
        }
    }
    // Pattern: text.color.[state]
    // Pattern: text.fontSize.[size]
    // Pattern: text.fontWeight.[size]
    text: {
        title: {
            color: {
                [key in UploadState]: CSSObject['color']
            }
            fontSize: {
                [key in UploadSize]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in UploadSize]: CSSObject['fontWeight']
            }
        }
        filename: {
            color: {
                [key in UploadState]: CSSObject['color']
            }
            fontSize: {
                [key in UploadSize]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in UploadSize]: CSSObject['fontWeight']
            }
        }
        description: {
            color: {
                [key in UploadState]: CSSObject['color']
            }
            fontSize: {
                [key in UploadSize]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in UploadSize]: CSSObject['fontWeight']
            }
        }
    }
    // Pattern: progressContainer.gap.[size]
    // Pattern: progressContainer.padding.[size]
    progressContainer: {
        gap: {
            [key in UploadSize]: CSSObject['gap']
        }
        padding: {
            [key in UploadSize]: CSSObject['padding']
        }
    }
    transition: string
}

export type ResponsiveUploadTokens = {
    [key in keyof BreakpointType]: UploadTokenType
}

export const getUploadTokens = (
    foundationToken: FoundationTokenType
): ResponsiveUploadTokens => {
    return {
        sm: {
            // Pattern: container.border.[state]
            // Pattern: container.borderRadius.[size]
            // Pattern: container.backgroundColor.[state]
            // Pattern: container.padding.[size]
            container: {
                border: {
                    [UploadState.IDLE]: `1px dashed ${foundationToken.colors.gray[200]}`,
                    [UploadState.UPLOADING]: `1px dashed ${foundationToken.colors.primary[300]}`,
                    [UploadState.SUCCESS]: `1px dashed ${foundationToken.colors.green[300]}`,
                    [UploadState.ERROR]: `1px dashed ${foundationToken.colors.red[300]}`,
                },
                borderRadius: {
                    [UploadSize.SMALL]: foundationToken.border.radius[12],
                    [UploadSize.MEDIUM]: foundationToken.border.radius[12],
                    [UploadSize.LARGE]: foundationToken.border.radius[12],
                },
                backgroundColor: {
                    [UploadState.IDLE]: foundationToken.colors.gray[0],
                    [UploadState.UPLOADING]: foundationToken.colors.primary[25],
                    [UploadState.SUCCESS]: foundationToken.colors.green[25],
                    [UploadState.ERROR]: foundationToken.colors.red[25],
                },
                padding: {
                    [UploadSize.SMALL]: `${foundationToken.unit[24]} ${foundationToken.unit[0]}`,
                    [UploadSize.MEDIUM]: `${foundationToken.unit[32]} ${foundationToken.unit[0]}`,
                    [UploadSize.LARGE]: `${foundationToken.unit[40]} ${foundationToken.unit[0]}`,
                },
                cursor: {
                    [UploadState.IDLE]: 'pointer',
                    [UploadState.UPLOADING]: 'default',
                    [UploadState.SUCCESS]: 'pointer',
                    [UploadState.ERROR]: 'pointer',
                },
            },
            // Pattern: slot.padding.[size]
            // Pattern: slot.gap.[size]
            slot: {
                padding: {
                    [UploadSize.SMALL]: `${foundationToken.unit[24]} ${foundationToken.unit[0]}`,
                    [UploadSize.MEDIUM]: `${foundationToken.unit[32]} ${foundationToken.unit[0]}`,
                    [UploadSize.LARGE]: `${foundationToken.unit[40]} ${foundationToken.unit[0]}`,
                },
                gap: {
                    [UploadSize.SMALL]: foundationToken.unit[12],
                    [UploadSize.MEDIUM]: foundationToken.unit[16],
                    [UploadSize.LARGE]: foundationToken.unit[20],
                },
            },
            // Pattern: text.title.color.[state]
            // Pattern: text.title.fontSize.[size]
            // Pattern: text.title.fontWeight.[size]
            text: {
                title: {
                    color: {
                        [UploadState.IDLE]: String(
                            foundationToken.colors.gray[600]
                        ),
                        [UploadState.UPLOADING]: String(
                            foundationToken.colors.primary[600]
                        ),
                        [UploadState.SUCCESS]: String(
                            foundationToken.colors.green[600]
                        ),
                        [UploadState.ERROR]: String(
                            foundationToken.colors.red[600]
                        ),
                    },
                    fontSize: {
                        [UploadSize.SMALL]:
                            foundationToken.font.size.body.sm.fontSize,
                        [UploadSize.MEDIUM]:
                            foundationToken.font.size.body.md.fontSize,
                        [UploadSize.LARGE]:
                            foundationToken.font.size.body.lg.fontSize,
                    },
                    fontWeight: {
                        [UploadSize.SMALL]: foundationToken.font.weight[600],
                        [UploadSize.MEDIUM]: foundationToken.font.weight[600],
                        [UploadSize.LARGE]: foundationToken.font.weight[600],
                    },
                },
                filename: {
                    color: {
                        [UploadState.IDLE]: String(
                            foundationToken.colors.gray[700]
                        ),
                        [UploadState.UPLOADING]: String(
                            foundationToken.colors.gray[700]
                        ),
                        [UploadState.SUCCESS]: String(
                            foundationToken.colors.gray[700]
                        ),
                        [UploadState.ERROR]: String(
                            foundationToken.colors.gray[700]
                        ),
                    },
                    fontSize: {
                        [UploadSize.SMALL]:
                            foundationToken.font.size.body.sm.fontSize,
                        [UploadSize.MEDIUM]:
                            foundationToken.font.size.body.md.fontSize,
                        [UploadSize.LARGE]:
                            foundationToken.font.size.body.lg.fontSize,
                    },
                    fontWeight: {
                        [UploadSize.SMALL]: foundationToken.font.weight[500],
                        [UploadSize.MEDIUM]: foundationToken.font.weight[500],
                        [UploadSize.LARGE]: foundationToken.font.weight[500],
                    },
                },
                description: {
                    color: {
                        [UploadState.IDLE]: String(
                            foundationToken.colors.gray[500]
                        ),
                        [UploadState.UPLOADING]: String(
                            foundationToken.colors.gray[500]
                        ),
                        [UploadState.SUCCESS]: String(
                            foundationToken.colors.gray[500]
                        ),
                        [UploadState.ERROR]: String(
                            foundationToken.colors.gray[500]
                        ),
                    },
                    fontSize: {
                        [UploadSize.SMALL]:
                            foundationToken.font.size.body.xs.fontSize,
                        [UploadSize.MEDIUM]:
                            foundationToken.font.size.body.sm.fontSize,
                        [UploadSize.LARGE]:
                            foundationToken.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        [UploadSize.SMALL]: foundationToken.font.weight[400],
                        [UploadSize.MEDIUM]: foundationToken.font.weight[400],
                        [UploadSize.LARGE]: foundationToken.font.weight[400],
                    },
                },
            },
            // Pattern: progressContainer.gap.[size]
            // Pattern: progressContainer.padding.[size]
            progressContainer: {
                gap: {
                    [UploadSize.SMALL]: foundationToken.unit[16],
                    [UploadSize.MEDIUM]: foundationToken.unit[20],
                    [UploadSize.LARGE]: foundationToken.unit[24],
                },
                padding: {
                    [UploadSize.SMALL]: `${foundationToken.unit[16]} ${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    [UploadSize.MEDIUM]: `${foundationToken.unit[20]} ${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    [UploadSize.LARGE]: `${foundationToken.unit[24]} ${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                },
            },
            transition: 'all 0.2s ease-in-out',
        },
        lg: {
            // Pattern: container.border.[state]
            // Pattern: container.borderRadius.[size]
            // Pattern: container.backgroundColor.[state]
            // Pattern: container.padding.[size]
            container: {
                border: {
                    [UploadState.IDLE]: `1px dashed ${foundationToken.colors.gray[200]}`,
                    [UploadState.UPLOADING]: `1px dashed ${foundationToken.colors.primary[300]}`,
                    [UploadState.SUCCESS]: `1px dashed ${foundationToken.colors.green[300]}`,
                    [UploadState.ERROR]: `1px dashed ${foundationToken.colors.red[300]}`,
                },
                borderRadius: {
                    [UploadSize.SMALL]: foundationToken.border.radius[12],
                    [UploadSize.MEDIUM]: foundationToken.border.radius[12],
                    [UploadSize.LARGE]: foundationToken.border.radius[12],
                },
                backgroundColor: {
                    [UploadState.IDLE]: foundationToken.colors.gray[0],
                    [UploadState.UPLOADING]: foundationToken.colors.primary[25],
                    [UploadState.SUCCESS]: foundationToken.colors.green[25],
                    [UploadState.ERROR]: foundationToken.colors.red[25],
                },
                padding: {
                    [UploadSize.SMALL]: foundationToken.unit[28],
                    [UploadSize.MEDIUM]: foundationToken.unit[36],
                    [UploadSize.LARGE]: foundationToken.unit[44],
                },
                cursor: {
                    [UploadState.IDLE]: 'pointer',
                    [UploadState.UPLOADING]: 'default',
                    [UploadState.SUCCESS]: 'pointer',
                    [UploadState.ERROR]: 'pointer',
                },
            },
            // Pattern: slot.padding.[size]
            // Pattern: slot.gap.[size]
            slot: {
                padding: {
                    [UploadSize.SMALL]: `${foundationToken.unit[28]} ${foundationToken.unit[0]}`,
                    [UploadSize.MEDIUM]: `${foundationToken.unit[36]} ${foundationToken.unit[0]}`,
                    [UploadSize.LARGE]: `${foundationToken.unit[44]} ${foundationToken.unit[0]}`,
                },
                gap: {
                    [UploadSize.SMALL]: foundationToken.unit[16],
                    [UploadSize.MEDIUM]: foundationToken.unit[20],
                    [UploadSize.LARGE]: foundationToken.unit[24],
                },
            },
            // Pattern: text.title.color.[state]
            // Pattern: text.title.fontSize.[size]
            // Pattern: text.title.fontWeight.[size]
            text: {
                title: {
                    color: {
                        [UploadState.IDLE]: String(
                            foundationToken.colors.gray[600]
                        ),
                        [UploadState.UPLOADING]: String(
                            foundationToken.colors.primary[600]
                        ),
                        [UploadState.SUCCESS]: String(
                            foundationToken.colors.green[600]
                        ),
                        [UploadState.ERROR]: String(
                            foundationToken.colors.red[600]
                        ),
                    },
                    fontSize: {
                        [UploadSize.SMALL]:
                            foundationToken.font.size.body.sm.fontSize,
                        [UploadSize.MEDIUM]:
                            foundationToken.font.size.body.md.fontSize,
                        [UploadSize.LARGE]:
                            foundationToken.font.size.body.lg.fontSize,
                    },
                    fontWeight: {
                        [UploadSize.SMALL]: foundationToken.font.weight[600],
                        [UploadSize.MEDIUM]: foundationToken.font.weight[600],
                        [UploadSize.LARGE]: foundationToken.font.weight[600],
                    },
                },
                filename: {
                    color: {
                        [UploadState.IDLE]: String(
                            foundationToken.colors.gray[700]
                        ),
                        [UploadState.UPLOADING]: String(
                            foundationToken.colors.gray[700]
                        ),
                        [UploadState.SUCCESS]: String(
                            foundationToken.colors.gray[700]
                        ),
                        [UploadState.ERROR]: String(
                            foundationToken.colors.gray[700]
                        ),
                    },
                    fontSize: {
                        [UploadSize.SMALL]:
                            foundationToken.font.size.body.sm.fontSize,
                        [UploadSize.MEDIUM]:
                            foundationToken.font.size.body.md.fontSize,
                        [UploadSize.LARGE]:
                            foundationToken.font.size.body.lg.fontSize,
                    },
                    fontWeight: {
                        [UploadSize.SMALL]: foundationToken.font.weight[500],
                        [UploadSize.MEDIUM]: foundationToken.font.weight[500],
                        [UploadSize.LARGE]: foundationToken.font.weight[500],
                    },
                },
                description: {
                    color: {
                        [UploadState.IDLE]: String(
                            foundationToken.colors.gray[500]
                        ),
                        [UploadState.UPLOADING]: String(
                            foundationToken.colors.gray[500]
                        ),
                        [UploadState.SUCCESS]: String(
                            foundationToken.colors.gray[500]
                        ),
                        [UploadState.ERROR]: String(
                            foundationToken.colors.gray[500]
                        ),
                    },
                    fontSize: {
                        [UploadSize.SMALL]:
                            foundationToken.font.size.body.xs.fontSize,
                        [UploadSize.MEDIUM]:
                            foundationToken.font.size.body.sm.fontSize,
                        [UploadSize.LARGE]:
                            foundationToken.font.size.body.md.fontSize,
                    },
                    fontWeight: {
                        [UploadSize.SMALL]: foundationToken.font.weight[400],
                        [UploadSize.MEDIUM]: foundationToken.font.weight[400],
                        [UploadSize.LARGE]: foundationToken.font.weight[400],
                    },
                },
            },
            // Pattern: progressContainer.gap.[size]
            // Pattern: progressContainer.padding.[size]
            progressContainer: {
                gap: {
                    [UploadSize.SMALL]: foundationToken.unit[16],
                    [UploadSize.MEDIUM]: foundationToken.unit[20],
                    [UploadSize.LARGE]: foundationToken.unit[24],
                },
                padding: {
                    [UploadSize.SMALL]: `${foundationToken.unit[16]} ${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    [UploadSize.MEDIUM]: `${foundationToken.unit[20]} ${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                    [UploadSize.LARGE]: `${foundationToken.unit[24]} ${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
                },
            },
            transition: 'all 0.2s ease-in-out',
        },
    }
}
