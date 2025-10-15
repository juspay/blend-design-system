import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'

/**
 * Mobile DateRangePicker Tokens for mobile-specific components
 *
 * Separate tokens for mobile components that have different styling requirements
 * These tokens are used by ScrollablePicker, ActionButtons, and DatePickerComponent
 *
 * Note: PresetItem now uses SelectItem tokens, tabs use existing Tabs component tokens
 */
export type MobileTokenType = {
    // ScrollablePicker component tokens
    picker: {
        // Item dimensions
        itemHeight: CSSObject['height'] // Individual picker item height
        containerHeight: CSSObject['height'] // Picker container height (3 times itemHeight)

        // Divider lines between picker sections
        divider: {
            width: CSSObject['width'] // Divider width
            strokeColor: CSSObject['color'] // Divider stroke color
            strokeColorEnd: CSSObject['color'] // Divider end color for gradient
        }

        // Text styling for picker items
        text: {
            selected: {
                fontSize: CSSObject['fontSize'] // Selected text font size
                fontWeight: CSSObject['fontWeight'] // Selected text font weight
                color: CSSObject['color'] // Selected text color
                opacity: CSSObject['opacity'] // Selected text opacity
            }
            unselected: {
                fontSize: CSSObject['fontSize'] // Unselected text font size
                fontWeight: CSSObject['fontWeight'] // Unselected text font weight
                color: CSSObject['color'] // Unselected text color
                opacity: CSSObject['opacity'] // Unselected text opacity
            }
        }

        // Column title styling
        title: {
            padding: {
                x: CSSObject['padding'] // Header horizontal padding
                y: CSSObject['padding'] // Header vertical padding
            }
            backgroundColor: CSSObject['backgroundColor'] // Header background
            text: {
                fontSize: CSSObject['fontSize'] // Header text font size
                fontWeight: CSSObject['fontWeight'] // Header text font weight
                color: CSSObject['color'] // Header text color
            }
        }
    }

    // ActionButtons footer component tokens
    footer: {
        gap: CSSObject['gap'] // Button gap
        padding: {
            x: CSSObject['padding'] // Container horizontal padding
            y: CSSObject['padding'] // Container vertical padding
        }
        borderTop: CSSObject['borderTop'] // Container top border
    }

    // Container padding and spacing (root level)
    padding: {
        x: CSSObject['padding'] // Horizontal padding
        y: CSSObject['padding'] // Vertical padding
    }
    gap: CSSObject['gap'] // Container gap

    // Mobile drawer header (for column headers in DatePickerComponent)
    header: {
        backgroundColor: CSSObject['backgroundColor'] // Header background
        padding: {
            x: CSSObject['padding'] // Header horizontal padding
            y: CSSObject['padding'] // Header vertical padding
        }
        text: {
            fontSize: CSSObject['fontSize'] // Header text font size
            fontWeight: CSSObject['fontWeight'] // Header text font weight
            color: CSSObject['color'] // Header text color
        }
    }
}

export type ResponsiveMobileTokens = {
    [key in keyof BreakpointType]: MobileTokenType
}

export const getMobileToken = (
    foundationToken: FoundationTokenType
): ResponsiveMobileTokens => {
    const baseTokens: MobileTokenType = {
        picker: {
            itemHeight: foundationToken.unit[44],
            containerHeight: `calc(${foundationToken.unit[44]} * 3)`, // 3 times itemHeight using tokens
            divider: {
                width: foundationToken.unit[70],
                strokeColor: foundationToken.colors.gray[500],
                strokeColorEnd: foundationToken.colors.gray[0],
            },
            text: {
                selected: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[900],
                    opacity: 1,
                },
                unselected: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[400],
                    opacity: 0.6,
                },
            },
            title: {
                padding: {
                    x: foundationToken.unit[12],
                    y: foundationToken.unit[12],
                },
                backgroundColor: foundationToken.colors.gray[0],
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[500],
                },
            },
        },

        footer: {
            gap: foundationToken.unit[16],
            padding: {
                x: foundationToken.unit[8],
                y: foundationToken.unit[8],
            },
            borderTop: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
        },

        padding: {
            x: foundationToken.unit[16],
            y: foundationToken.unit[0],
        },
        gap: foundationToken.unit[12],

        header: {
            backgroundColor: foundationToken.colors.gray[0],
            padding: {
                x: foundationToken.unit[12],
                y: foundationToken.unit[12],
            },
            text: {
                fontSize: foundationToken.font.size.body.md.fontSize,
                fontWeight: foundationToken.font.weight[400],
                color: foundationToken.colors.gray[500],
            },
        },
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
