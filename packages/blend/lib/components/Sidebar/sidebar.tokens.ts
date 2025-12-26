import type { CSSObject } from 'styled-components'
import { type FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type SidebarState = 'default' | 'hover' | 'active'
export type SidebarVariant = 'expanded' | 'collapsed'

/**
 * Sidebar Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure matches Card pattern for consistency:
 * - Base properties: maxWidth, borderRadius, zIndex, transition, backgroundColor.[state]
 * - Target sections: leftPanel.*, header.*, body.*, footer.*, mainContent.*
 * - Each target has: backgroundColor, padding, border, gap, specific properties
 * - Interactive elements have state-based styling: [state] = default | hover | active
 *
 * Pattern examples:
 * - maxWidth.[variant] (sidebar's maximum width based on state)
 * - backgroundColor.[state] (sidebar background with states)
 * - leftPanel.backgroundColor (tenant panel background)
 * - header.toggleButton.backgroundColor.[state] (interactive toggle button)
 * - body.padding (directory content area spacing)
 * - footer.height (footer section height)
 * - mainContent.topbar.transition (topbar auto-hide animation)
 */
export type SidebarTokenType = {
    // Controls sidebar width based on expanded/collapsed state and left panel presence
    maxWidth: {
        withLeftPanel: CSSObject['maxWidth'] // Width when tenant panel is present
        withoutLeftPanel: CSSObject['maxWidth'] // Width when no tenant panel
        iconOnly?: CSSObject['maxWidth'] // Width for icon-only mode (52px)
    }

    // Controls sidebar container background color for different interaction states
    backgroundColor: CSSObject['backgroundColor']
    // Controls sidebar container border for different interaction states
    borderRight: CSSObject['border'] // Main container border

    // Controls the left tenant switching panel (when multiple tenants available)
    leftPanel: {
        width: CSSObject['width'] // Panel width
        backgroundColor: CSSObject['backgroundColor'] // Panel background color
        borderRight: CSSObject['border'] // Panel border
        padding: {
            x: CSSObject['padding'] // Horizontal padding
            y: CSSObject['padding'] // Vertical padding
        }
        gap: CSSObject['gap'] // Space between tenant items

        // Controls individual tenant selection buttons
        item: {
            width: CSSObject['width'] // Tenant button width
            borderRadius: CSSObject['borderTopLeftRadius'] // Button top-left radius

            // Controls tenant button border for different states (default/hover/active)
            border: {
                [key in SidebarState]: CSSObject['border'] // Button border per state
            }
            // Controls tenant button background for different states
            backgroundColor: {
                [key in SidebarState]: CSSObject['backgroundColor'] // Button background per state
            }
        }
    }

    // Controls the top header section containing title and toggle button
    header: {
        backgroundColor: CSSObject['backgroundColor'] // Header background color
        padding: {
            x: CSSObject['padding'] // Header horizontal padding
            y: CSSObject['padding'] // Header vertical padding
        }
        gap: CSSObject['gap'] // Space between header elements
        borderBottom: CSSObject['border'] // Header border

        // Controls the sidebar collapse/expand toggle button
        toggleButton: {
            // Controls toggle button background for different interaction states
            backgroundColor: {
                [key in SidebarState]: CSSObject['backgroundColor'] // Button background per state
            }
            width: CSSObject['width']
        }
    }

    directory: {
        gap: CSSObject['gap']
        paddingX: CSSObject['padding']
        paddingY: CSSObject['padding']
    }

    // Controls the bottom footer section containing actions and information
    footer: {
        backgroundColor: CSSObject['backgroundColor'] // Footer background color
        padding: {
            x: CSSObject['padding'] // Footer horizontal padding
            y: CSSObject['padding'] // Footer vertical padding
        }
        borderTop: CSSObject['border'] // Footer border
    }
}

export type ResponsiveSidebarTokens = {
    [key in keyof BreakpointType]: SidebarTokenType
}

export const getSidebarTokens = (
    foundationToken: FoundationTokenType
): ResponsiveSidebarTokens => {
    return {
        sm: {
            // Base sidebar properties
            maxWidth: {
                withLeftPanel: '300px',
                withoutLeftPanel: '250px',
                iconOnly: foundationToken.unit[52],
            },
            // State-dependent base properties
            backgroundColor: foundationToken.colors.gray[25],
            borderRight: `1px solid ${foundationToken.colors.gray[200]}`,

            // Left Panel section (tenant switching panel)
            leftPanel: {
                width: 'fit-content',
                backgroundColor: foundationToken.colors.gray[25],
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                padding: {
                    x: foundationToken.unit[10],
                    y: foundationToken.unit[10],
                },
                gap: foundationToken.unit[16],

                // Tenant selection items
                item: {
                    width: foundationToken.unit[32],
                    borderRadius: foundationToken.border.radius[4],
                    // State-based tenant item styling
                    border: {
                        default: `1px solid ${foundationToken.colors.gray[150]}`,
                        hover: `1px solid ${foundationToken.colors.gray[200]}`,
                        active: `1px solid ${foundationToken.colors.primary[500]}`,
                    },
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: 'transparent',
                    },
                },
            },

            // Header section (contains toggle button and top content)
            header: {
                backgroundColor: foundationToken.colors.gray[25],
                padding: {
                    x: foundationToken.unit[8],
                    y: foundationToken.unit[12.5],
                },
                gap: foundationToken.unit[12],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,

                // Toggle button for expand/collapse
                toggleButton: {
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[100],
                        active: foundationToken.colors.gray[100],
                    },
                    width: foundationToken.unit[16],
                },
            },

            directory: {
                gap: foundationToken.unit[24],
                paddingX: foundationToken.unit[12],
                paddingY: foundationToken.unit[12],
            },

            // Footer section (bottom actions and info)
            footer: {
                backgroundColor: foundationToken.colors.gray[25],
                padding: {
                    x: foundationToken.unit[8],
                    y: foundationToken.unit[12],
                },
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
            },
        },

        lg: {
            // Base sidebar properties
            maxWidth: {
                withLeftPanel: '320px',
                withoutLeftPanel: '270px',
                iconOnly: foundationToken.unit[52],
            },
            // State-dependent base properties
            backgroundColor: foundationToken.colors.gray[25],

            borderRight: `1px solid ${foundationToken.colors.gray[200]}`,

            // Left Panel section (tenant switching panel)
            leftPanel: {
                width: 'fit-content',
                backgroundColor: foundationToken.colors.gray[25],
                borderRight: `1px solid ${foundationToken.colors.gray[200]}`,
                padding: {
                    x: foundationToken.unit[12],
                    y: foundationToken.unit[12],
                },
                gap: foundationToken.unit[16],

                // Tenant selection items
                item: {
                    width: foundationToken.unit[36],
                    borderRadius: foundationToken.border.radius[6],

                    // State-based tenant item styling
                    border: {
                        default: `1px solid ${foundationToken.colors.gray[150]}`,
                        hover: `1px solid ${foundationToken.colors.gray[200]}`,
                        active: `1px solid ${foundationToken.colors.primary[500]}`,
                    },
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: 'transparent',
                    },
                },
            },

            // Header section (contains toggle button and top content)
            header: {
                backgroundColor: foundationToken.colors.gray[25],
                padding: {
                    x: foundationToken.unit[12],
                    y: foundationToken.unit[15],
                },
                gap: foundationToken.unit[16],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,

                // Toggle button for expand/collapse
                toggleButton: {
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[100],
                        active: foundationToken.colors.gray[100],
                    },
                    width: foundationToken.unit[16],
                },
            },

            directory: {
                gap: foundationToken.unit[24],
                paddingX: foundationToken.unit[12],
                paddingY: foundationToken.unit[12],
            },

            // Footer section (bottom actions and info)
            footer: {
                backgroundColor: foundationToken.colors.gray[25],
                padding: {
                    x: foundationToken.unit[12],
                    y: foundationToken.unit[16],
                },
                borderTop: `1px solid ${foundationToken.colors.gray[200]}`,
            },
        },
    }
}
