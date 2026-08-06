import type { CSSObject } from 'styled-components'
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
