import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../../tokens/theme.token'
import { BreakpointType } from '../../../breakpoints/breakPoints'

/**
 * Mobile DateRangePicker Tokens for mobile-specific components
 *
 * Separate tokens for mobile components that have different styling requirements
 * These tokens are used by ScrollablePicker, ActionButtons, PresetItem, and DatePickerComponent
 */
export type MobileTokenType = {
    // ScrollablePicker component tokens
    picker: {
        // Item dimensions
        itemHeight: CSSObject['height'] // Individual picker item height (44px)
        containerHeight: CSSObject['height'] // Picker container height (132px = 44px * 3)

        // Gradient overlays for smooth scrolling effect
        gradients: {
            top: CSSObject['background'] // Top fade gradient
            bottom: CSSObject['background'] // Bottom fade gradient
        }

        // Divider lines between picker sections
        divider: {
            width: CSSObject['width'] // Divider width
            strokeColor: CSSObject['color'] // Divider stroke color
            strokeColorEnd: CSSObject['color'] // Divider end color for gradient
        }

        // Text styling for selected and unselected items
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

    // PresetItem component tokens
    presetItem: {
        padding: {
            x: CSSObject['padding'] // Preset item horizontal padding
            y: CSSObject['padding'] // Preset item vertical padding
        }
        borderBottom: CSSObject['borderBottom'] // Preset item border

        // Text styling based on active/inactive state
        text: {
            active: {
                fontWeight: CSSObject['fontWeight'] // Active preset font weight
                color: CSSObject['color'] // Active preset color
            }
            inactive: {
                fontWeight: CSSObject['fontWeight'] // Inactive preset font weight
                color: CSSObject['color'] // Inactive preset color
            }
        }

        // Icon styling
        icon: {
            size: CSSObject['width'] // Preset icon size
            color: CSSObject['color'] // Preset icon color
        }

        // Chevron styling for expandable items
        chevron: {
            size: CSSObject['width'] // Chevron icon size
            color: CSSObject['color'] // Chevron icon color
            transition: CSSObject['transition'] // Chevron transition
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

    // DatePickerComponent tabs tokens
    tabs: {
        marginTop: CSSObject['marginTop'] // Tabs top margin
        content: {
            marginTop: CSSObject['marginTop'] // Tab content top margin
        }
    }

    // Date picker container in mobile
    datePicker: {
        container: {
            padding: {
                x: CSSObject['padding'] // Date picker horizontal padding
                y: CSSObject['padding'] // Date picker vertical padding
            }
            gap: CSSObject['gap'] // Date picker gap
        }
    }

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
            containerHeight: '132px', // 44px * 3
            gradients: {
                top: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)',
                bottom: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)',
            },
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

        presetItem: {
            padding: {
                x: foundationToken.unit[20],
                y: foundationToken.unit[16],
            },
            borderBottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[150]}`,
            text: {
                active: {
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[700],
                },
                inactive: {
                    fontWeight: foundationToken.font.weight[500],
                    color: foundationToken.colors.gray[600],
                },
            },
            icon: {
                size: foundationToken.unit[20],
                color: foundationToken.colors.gray[700],
            },
            chevron: {
                size: foundationToken.unit[16],
                color: foundationToken.colors.gray[500],
                transition: 'transform 0.2s ease',
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

        tabs: {
            marginTop: foundationToken.unit[16],
            content: {
                marginTop: foundationToken.unit[32],
            },
        },

        datePicker: {
            container: {
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[0],
                },
                gap: foundationToken.unit[12],
            },
        },

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
