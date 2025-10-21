import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type UploadState =
    | 'idle'
    | 'uploading'
    | 'success'
    | 'error'
    | 'dragActive'

/**
 * Upload Tokens following the pattern: [target].CSSProp.[state]
 *
 * Structure:
 * - target: wrapper | label | container | slot | text | progressContainer | fileList
 * - CSSProp: padding | border | backgroundColor | fontSize | fontWeight | color | gap | margin
 * - state: idle | uploading | success | error | dragActive (upload states)
 *
 * Hierarchy:
 * - Wrapper: Outermost container with base padding
 * - Label: Label section with text styling and spacing
 * - Container: Upload box with state-dependent styling (border, background)
 * - Slot: Content area with icon/content spacing
 * - Text: Text styling for titles, descriptions, filenames, errors
 * - ProgressContainer: Progress bar section with spacing
 * - FileList: File list display with spacing and layout
 */
export type UploadTokenType = {
    // Wrapper (outermost container)
    padding: CSSObject['padding']

    // Label section
    label: {
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
        marginBottom: CSSObject['marginBottom']
        gap: CSSObject['gap'] // Gap between label and asterisk
    }

    subLabel: {
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
    }

    required: {
        text: {
            color: CSSObject['color']
        }
    }

    // Container (upload box with state-dependent styling)
    container: {
        border: {
            idle: CSSObject['border']
            uploading: CSSObject['border']
            success: CSSObject['border']
            error: CSSObject['border']
            dragActive: CSSObject['border']
        }
        backgroundColor: {
            idle: CSSObject['backgroundColor']
            uploading: CSSObject['backgroundColor']
            success: CSSObject['backgroundColor']
            error: CSSObject['backgroundColor']
            dragActive: CSSObject['backgroundColor']
        }
        borderRadius: CSSObject['borderRadius']
        padding: CSSObject['padding']
        gap: CSSObject['gap'] // Gap between title and description
    }

    // Slot (content area)
    slot: { width: CSSObject['width'] }

    text: {
        title: {
            color: {
                idle: CSSObject['color']
                uploading: CSSObject['color']
                success: CSSObject['color']
                error: CSSObject['color']
            }
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
        gap: CSSObject['gap'] // Gap between title and description
        filename: {
            color: CSSObject['color']
            primaryColor: CSSObject['color'] // Color for highlighted filename
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
        description: {
            color: {
                idle: CSSObject['color']
                uploading: CSSObject['color']
                success: CSSObject['color']
                error: CSSObject['color']
            }
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
        error: {
            color: CSSObject['color']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
    }

    // Progress container
    progressContainer: {
        gap: CSSObject['gap']
        padding: CSSObject['padding']
    }

    // File list
    fileList: {
        gap: CSSObject['gap']
        marginTop: CSSObject['marginTop']
    }
}

export type ResponsiveUploadTokens = {
    [key in keyof BreakpointType]: UploadTokenType
}

export const getUploadTokens = (
    foundationToken: FoundationTokenType
): ResponsiveUploadTokens => {
    return {
        sm: {
            padding: foundationToken.unit[32],

            // Label section
            label: {
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: String(foundationToken.colors.gray[700]),
                },
                marginBottom: foundationToken.unit[8],
                gap: foundationToken.unit[4],
            },

            subLabel: {
                text: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: String(foundationToken.colors.gray[400]),
                },
            },

            required: {
                text: {
                    color: String(foundationToken.colors.red[500]),
                },
            },

            // Container (upload box)
            container: {
                border: {
                    idle: `1px dashed ${foundationToken.colors.gray[200]}`,
                    uploading: `1px dashed ${foundationToken.colors.gray[200]}`,
                    success: `1px dashed ${foundationToken.colors.gray[200]}`,
                    error: `1px dashed ${foundationToken.colors.gray[200]}`,
                    dragActive: `1px dashed ${foundationToken.colors.primary[500]}`,
                },
                backgroundColor: {
                    idle: foundationToken.colors.gray[0],
                    uploading: foundationToken.colors.gray[0],
                    success: foundationToken.colors.gray[0],
                    error: foundationToken.colors.gray[0],
                    dragActive: foundationToken.colors.primary[200],
                },
                borderRadius: foundationToken.border.radius[12],
                padding: foundationToken.unit[32],
                gap: foundationToken.unit[20],
            },

            // Content area layout
            slot: {
                width: foundationToken.unit[32],
            },

            // Text styling and gaps
            text: {
                title: {
                    color: {
                        idle: String(foundationToken.colors.gray[600]),
                        uploading: String(foundationToken.colors.gray[600]),
                        success: String(foundationToken.colors.gray[600]),
                        error: String(foundationToken.colors.gray[600]),
                    },
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                },
                gap: foundationToken.unit[4],
                filename: {
                    color: String(foundationToken.colors.gray[700]),
                    primaryColor: String(foundationToken.colors.primary[600]),
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
                description: {
                    color: {
                        idle: String(foundationToken.colors.gray[500]),
                        uploading: String(foundationToken.colors.gray[500]),
                        success: String(foundationToken.colors.gray[500]),
                        error: String(foundationToken.colors.gray[500]),
                    },
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                },
                error: {
                    color: String(foundationToken.colors.red[500]),
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                },
            },

            // Progress container
            progressContainer: {
                gap: foundationToken.unit[20],
                padding: `${foundationToken.unit[20]} ${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
            },

            // File list
            fileList: {
                gap: foundationToken.unit[8],
                marginTop: foundationToken.unit[16],
            },
        },

        lg: {
            padding: foundationToken.unit[32],

            // Label section
            label: {
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: String(foundationToken.colors.gray[700]),
                },
                marginBottom: foundationToken.unit[8],
                gap: foundationToken.unit[4],
            },

            subLabel: {
                text: {
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: String(foundationToken.colors.gray[400]),
                },
            },

            required: {
                text: {
                    color: String(foundationToken.colors.red[500]),
                },
            },

            // Container (upload box)
            container: {
                border: {
                    idle: `1px dashed ${foundationToken.colors.gray[200]}`,
                    uploading: `1px dashed ${foundationToken.colors.gray[200]}`,
                    success: `1px dashed ${foundationToken.colors.gray[200]}`,
                    error: `1px dashed ${foundationToken.colors.gray[200]}`,
                    dragActive: `1px dashed ${foundationToken.colors.primary[500]}`,
                },
                backgroundColor: {
                    idle: foundationToken.colors.gray[0],
                    uploading: foundationToken.colors.gray[0],
                    success: foundationToken.colors.gray[0],
                    error: foundationToken.colors.gray[0],
                    dragActive: foundationToken.colors.primary[200],
                },
                borderRadius: foundationToken.border.radius[12],
                padding: foundationToken.unit[32],
                gap: foundationToken.unit[20],
            },

            // Content area layout
            slot: {
                width: foundationToken.unit[32],
            },

            // Text styling and gaps
            text: {
                title: {
                    color: {
                        idle: String(foundationToken.colors.gray[600]),
                        uploading: String(foundationToken.colors.gray[600]),
                        success: String(foundationToken.colors.gray[600]),
                        error: String(foundationToken.colors.gray[600]),
                    },
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                },
                gap: foundationToken.unit[4],
                filename: {
                    color: String(foundationToken.colors.gray[700]),
                    primaryColor: String(foundationToken.colors.primary[600]),
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
                description: {
                    color: {
                        idle: String(foundationToken.colors.gray[500]),
                        uploading: String(foundationToken.colors.gray[500]),
                        success: String(foundationToken.colors.gray[500]),
                        error: String(foundationToken.colors.gray[500]),
                    },
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                },
                error: {
                    color: String(foundationToken.colors.red[500]),
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                },
            },

            // Progress container
            progressContainer: {
                gap: foundationToken.unit[20],
                padding: `${foundationToken.unit[20]} ${foundationToken.unit[0]} ${foundationToken.unit[0]}`,
            },

            // File list
            fileList: {
                gap: foundationToken.unit[8],
                marginTop: foundationToken.unit[16],
            },
        },
    }
}
