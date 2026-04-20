import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type TopbarState = 'default' | 'hover' | 'active'

/**
 * Topbar Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure matches Sidebar pattern for consistency:
 * - Base properties: borderBottom, backgroundColor, backdropFilter, padding, gap
 * - Target sections: toggleButton.*, actionButton.*, tenantIconButton.*, merchantSelectTrigger.*, leftSection.*, rightSection.*, sidebarSection.*
 * - Each target has: backgroundColor, padding, borderRadius, gap, specific properties
 * - Interactive elements have state-based styling: [state] = default | hover | active
 *
 * Pattern examples:
 * - backgroundColor (topbar background color)
 * - padding (topbar content padding)
 * - toggleButton.backgroundColor.[state] (interactive toggle button)
 * - actionButton.padding (action button spacing)
 * - leftSection.gap (left section item spacing)
 * - merchantSelectTrigger.text.color (merchant text color)
 */
export type TopbarTokenType = {
    zIndex: CSSObject['zIndex']
    // Base topbar properties
    borderBottom: CSSObject['borderBottom'] // Bottom border separating topbar from content
    backgroundColor: CSSObject['backgroundColor'] // Background color (usually with transparency)
    backdropFilter: CSSObject['backdropFilter'] // Blur effect for glassmorphism
    padding: CSSObject['padding'] // Content padding
    gap: CSSObject['gap'] // Space between main sections

    // Sidebar toggle button (shows when sidebar is collapsed)
    toggleButton: {
        borderRadius: CSSObject['borderRadius'] // Button corner rounding
        padding: CSSObject['padding'] // Button internal spacing
        // Button background for different interaction states
        backgroundColor: {
            [key in TopbarState]: CSSObject['backgroundColor']
        }
        transition: CSSObject['transition'] // Smooth state transitions
        icon: {
            size: CSSObject['width'] // Icon dimensions
            color: CSSObject['color'] // Icon color
        }
    }

    // Action buttons (e.g., notifications, settings in topbar)
    actionButton: {
        borderRadius: CSSObject['borderRadius'] // Button corner rounding
        padding: CSSObject['padding'] // Button internal spacing
        minWidth: CSSObject['minWidth'] // Minimum button width
        height: CSSObject['height'] // Button height
        // Button background for different interaction states
        backgroundColor: {
            [key in TopbarState]: CSSObject['backgroundColor']
        }
        transition: CSSObject['transition'] // Smooth state transitions
        icon: {
            size: CSSObject['width'] // Icon dimensions
            color: CSSObject['color'] // Icon color
        }
    }

    // Tenant icon button (for mobile tenant switching)
    tenantIconButton: {
        borderRadius: CSSObject['borderRadius'] // Button corner rounding
        minHeight: CSSObject['minHeight'] // Minimum button height
        // Button background for different interaction states
        backgroundColor: {
            [key in TopbarState]: CSSObject['backgroundColor']
        }
        transition: CSSObject['transition'] // Smooth state transitions
    }

    // Merchant select dropdown trigger button
    merchantSelectTrigger: {
        gap: CSSObject['gap'] // Space between icon and text
        icon: {
            size: CSSObject['width'] // Dropdown icon size
            color: CSSObject['color'] // Dropdown icon color
        }
        text: {
            fontSize: CSSObject['fontSize'] // Merchant name text size
            fontWeight: CSSObject['fontWeight'] // Merchant name text weight
            color: CSSObject['color'] // Merchant name text color
        }
    }

    // Left section (tenant/merchant selectors on mobile)
    leftSection: {
        gap: CSSObject['gap'] // Space between items
        maxHeight: CSSObject['maxHeight'] // Maximum section height
        divider: {
            fontSize: CSSObject['fontSize'] // Divider text size (/)
            fontWeight: CSSObject['fontWeight'] // Divider text weight
            color: CSSObject['color'] // Divider text color
        }
    }

    // Right section (action buttons area)
    rightSection: {
        gap: CSSObject['gap'] // Space between action buttons
    }

    // Sidebar section (toggle + sidebar top slot when collapsed)
    sidebarSection: {
        gap: CSSObject['gap'] // Space between toggle and slot
    }
}

export type ResponsiveTopbarTokens = {
    [key in keyof BreakpointType]: TopbarTokenType
}

export const getTopbarTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTopbarTokens => {
    return {
        // Small breakpoint (mobile)
        sm: {
            // Base properties
            zIndex: '10',
            borderBottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
            backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: `${foundationToken.unit[5]} ${foundationToken.unit[16]}`,
            gap: foundationToken.unit[12],

            // Toggle button (sidebar collapse/expand)
            toggleButton: {
                borderRadius: foundationToken.border.radius[10],
                padding: foundationToken.unit[9],
                backgroundColor: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[100],
                    active: foundationToken.colors.gray[150],
                },
                transition: 'background-color 0.15s ease',
                icon: {
                    size: foundationToken.unit[16],
                    color: foundationToken.colors.gray[600],
                },
            },

            // Action buttons
            actionButton: {
                borderRadius: foundationToken.border.radius[8],
                padding: foundationToken.unit[8],
                minWidth: foundationToken.unit[40],
                height: foundationToken.unit[40],
                backgroundColor: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[100],
                    active: foundationToken.colors.gray[150],
                },
                transition: 'background-color 0.15s ease',
                icon: {
                    size: foundationToken.unit[20],
                    color: foundationToken.colors.gray[600],
                },
            },

            // Tenant icon button (mobile)
            tenantIconButton: {
                borderRadius: foundationToken.border.radius[8],
                minHeight: foundationToken.unit[36],
                backgroundColor: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[100],
                    active: foundationToken.colors.gray[150],
                },
                transition: 'background-color 0.15s ease',
            },

            // Merchant select trigger
            merchantSelectTrigger: {
                gap: foundationToken.unit[6],
                icon: {
                    size: foundationToken.unit[14],
                    color: foundationToken.colors.gray[600],
                },
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[800],
                },
            },

            // Left section (mobile)
            leftSection: {
                gap: foundationToken.unit[6],
                maxHeight: '26px',
                divider: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[400],
                },
            },

            // Right section (action buttons area)
            rightSection: {
                gap: foundationToken.unit[8],
            },

            // Sidebar section (toggle + slot)
            sidebarSection: {
                gap: foundationToken.unit[16],
            },
        },

        // Large breakpoint (desktop)
        lg: {
            // Base properties
            zIndex: '10',
            borderBottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
            backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: `${foundationToken.unit[5]} ${foundationToken.unit[32]}`,
            gap: foundationToken.unit[16],

            // Toggle button (sidebar collapse/expand)
            toggleButton: {
                borderRadius: foundationToken.border.radius[10],
                padding: foundationToken.unit[10],
                backgroundColor: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[100],
                    active: foundationToken.colors.gray[150],
                },
                transition: 'background-color 0.15s ease',
                icon: {
                    size: foundationToken.unit[16],
                    color: foundationToken.colors.gray[600],
                },
            },

            // Action buttons
            actionButton: {
                borderRadius: foundationToken.border.radius[8],
                padding: foundationToken.unit[8],
                minWidth: foundationToken.unit[40],
                height: foundationToken.unit[36],
                backgroundColor: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[100],
                    active: foundationToken.colors.gray[150],
                },
                transition: 'background-color 0.15s ease',
                icon: {
                    size: foundationToken.unit[20],
                    color: foundationToken.colors.gray[600],
                },
            },

            // Tenant icon button (mobile)
            tenantIconButton: {
                borderRadius: foundationToken.border.radius[8],
                minHeight: foundationToken.unit[36],
                backgroundColor: {
                    default: 'transparent',
                    hover: foundationToken.colors.gray[100],
                    active: foundationToken.colors.gray[150],
                },
                transition: 'background-color 0.15s ease',
            },

            // Merchant select trigger
            merchantSelectTrigger: {
                gap: foundationToken.unit[6],
                icon: {
                    size: foundationToken.unit[14],
                    color: foundationToken.colors.gray[600],
                },
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[800],
                },
            },

            // Left section (mobile)
            leftSection: {
                gap: foundationToken.unit[6],
                maxHeight: '26px',
                divider: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[400],
                },
            },

            // Right section (action buttons area)
            rightSection: {
                gap: foundationToken.unit[8],
            },

            // Sidebar section (toggle + slot)
            sidebarSection: {
                gap: foundationToken.unit[16],
            },
        },
    }
}
