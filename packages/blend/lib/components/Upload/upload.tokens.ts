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
    //  break in x and y and move inside container

    // Label section
    //  header -> label / sublabel
    header: {
        label: {
            text: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
            marginBottom: CSSObject['marginBottom']
            gap: CSSObject['gap'] // gap between label and required asterisk
        }
        required: {
            text: {
                color: CSSObject['color']
            }
            gap: CSSObject['gap'] // gap between sublabel and required asterisk
        }

        subLabel: {
            text: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
            gap: CSSObject['gap'] // gap between sublabel and help icon
        }

        helpIcon: {
            width: CSSObject['width']
            color: CSSObject['color']
        }
    }

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
        content: {
            slot: {
                width: CSSObject['width']
                gap: CSSObject['gap'] // slot and text gap
            }
            text: {
                title: {
                    color: CSSObject['color'] // hardcode the color for filename in uploading state
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
                subtitle: {
                    color: CSSObject['color']
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
                gap: CSSObject['gap'] // gap between title and description
            }
            actionable: {
                gap: CSSObject['gap'] // gap between actionables and text
                errorText: {
                    color: CSSObject['color']
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                }
            }
        }
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
            // Header section
            header: {
                label: {
                    text: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: String(foundationToken.colors.gray[700]),
                    },
                    marginBottom: foundationToken.unit[8],
                    gap: foundationToken.unit[2],
                },
                required: {
                    text: {
                        color: String(foundationToken.colors.red[500]),
                    },
                    gap: foundationToken.unit[8],
                },
                subLabel: {
                    text: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        color: String(foundationToken.colors.gray[400]),
                    },
                    gap: foundationToken.unit[8],
                },
                helpIcon: {
                    width: foundationToken.unit[16],
                    color: String(foundationToken.colors.gray[400]),
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
                    dragActive: foundationToken.colors.primary[50],
                },
                borderRadius: foundationToken.border.radius[12],
                padding: `${foundationToken.unit[24]} ${foundationToken.unit[32]}`,
                content: {
                    slot: {
                        width: foundationToken.unit[32],
                        gap: foundationToken.unit[16],
                    },
                    text: {
                        title: {
                            color: String(foundationToken.colors.gray[700]), // hardcoded filename color for uploading state
                            fontSize:
                                foundationToken.font.size.body.lg.fontSize,
                            fontWeight: foundationToken.font.weight[600],
                        },
                        subtitle: {
                            color: String(foundationToken.colors.gray[500]),
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                        },
                        gap: foundationToken.unit[4],
                    },
                    actionable: {
                        gap: foundationToken.unit[20],
                        errorText: {
                            color: String(foundationToken.colors.red[500]),
                            fontSize:
                                foundationToken.font.size.body.sm.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                        },
                    },
                },
            },
        },

        lg: {
            // Header section
            header: {
                label: {
                    text: {
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                        color: String(foundationToken.colors.gray[700]),
                    },
                    marginBottom: foundationToken.unit[8],
                    gap: foundationToken.unit[2],
                },
                required: {
                    text: {
                        color: String(foundationToken.colors.red[500]),
                    },
                    gap: foundationToken.unit[8],
                },
                subLabel: {
                    text: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        fontWeight: foundationToken.font.weight[400],
                        color: String(foundationToken.colors.gray[400]),
                    },
                    gap: foundationToken.unit[8],
                },
                helpIcon: {
                    width: foundationToken.unit[16],
                    color: String(foundationToken.colors.gray[400]),
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
                    dragActive: foundationToken.colors.primary[50],
                },
                borderRadius: foundationToken.border.radius[12],
                padding: `${foundationToken.unit[32]} ${foundationToken.unit[40]}`,
                content: {
                    slot: {
                        width: foundationToken.unit[32],
                        gap: foundationToken.unit[20],
                    },
                    text: {
                        title: {
                            color: String(foundationToken.colors.gray[700]), // hardcoded filename color for uploading state
                            fontSize:
                                foundationToken.font.size.body.lg.fontSize,
                            fontWeight: foundationToken.font.weight[600],
                        },
                        subtitle: {
                            color: String(foundationToken.colors.gray[500]),
                            fontSize:
                                foundationToken.font.size.body.md.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                        },
                        gap: foundationToken.unit[4],
                    },
                    actionable: {
                        gap: foundationToken.unit[24],
                        errorText: {
                            color: String(foundationToken.colors.red[500]),
                            fontSize:
                                foundationToken.font.size.body.sm.fontSize,
                            fontWeight: foundationToken.font.weight[400],
                        },
                    },
                },
            },
        },
    }
}
