import type { CSSObject } from 'styled-components'
import { type FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type DirectoryState = 'default' | 'hover' | 'active'

/**
 * Directory Tokens following the pattern: [target].CSSProp.[state]
 *
 * Hierarchical Structure:
 * - Container level: gap, paddingX, paddingY (spacing for the entire directory)
 * - Section level: Contains header, label, chevron, and item
 *   - header: Controls section header layout
 *   - label: Controls section label text styling
 *   - chevron: Controls section collapse/expand icon
 *   - item: Navigation items within the section (NavItem)
 *     - nested: Child items within navigation items
 *
 * Pattern examples:
 * - gap (space between sections)
 * - paddingX (container horizontal padding)
 * - section.header.padding (section header spacing)
 * - section.item.backgroundColor.[state] (nav item background with states)
 * - section.item.nested.paddingLeft (nested item indentation)
 */
export type DirectoryTokenType = {
    // Container-level spacing
    gap: CSSObject['gap'] // Space between sections
    paddingX: CSSObject['padding'] // Container horizontal padding
    paddingY: CSSObject['padding'] // Container vertical padding

    // Section configuration
    section: {
        gap: CSSObject['gap'] // Space between section header and items

        // Section header (clickable area with label and chevron)
        header: {
            padding: {
                x: CSSObject['padding']
                y: CSSObject['padding']
            }
            label: {
                fontSize: CSSObject['fontSize'] // Label text size
                color: CSSObject['color'] // Label text color
                fontWeight: CSSObject['fontWeight'] // Label text weight
            }
            // Section collapse/expand chevron icon
            chevron: {
                width: CSSObject['width'] // Chevron icon width
                color: CSSObject['color'] // Chevron icon color
            }
        }

        // Section label text styling

        // Navigation items within the section
        itemList: {
            gap: CSSObject['gap'] // Space between items in the list

            item: {
                padding: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
                gap: CSSObject['gap'] // Gap between icon and text within item
                borderRadius: CSSObject['borderRadius'] // Item border radius
                fontWeight: CSSObject['fontWeight'] // Item text weight
                fontSize: CSSObject['fontSize'] // Item text size
                transition: CSSObject['transition'] // Hover/active transitions

                // Item background color for different states
                backgroundColor: {
                    [key in DirectoryState]: CSSObject['backgroundColor']
                }

                // Item text color for different states
                color: {
                    [key in DirectoryState]: CSSObject['color']
                }

                // Icon/leftSlot styling
                icon: {
                    width: CSSObject['width'] // Icon size
                }

                // Chevron for expandable items
                chevron: {
                    width: CSSObject['width'] // Chevron icon size
                    color: CSSObject['color'] // Chevron icon color
                }
            }

            // Nested/child items configuration
            nested: {
                paddingLeft: CSSObject['paddingLeft'] // Nested item indentation
                marginTop: CSSObject['marginTop'] // Space above nested list

                // Vertical connector line for nested items
                border: {
                    width: CSSObject['width'] // Border line width
                    color: CSSObject['color'] // Border line color
                    leftOffset: CSSObject['left'] // Border line left position
                }
            }
        }
    }
}

export type ResponsiveDirectoryTokens = {
    [key in keyof BreakpointType]: DirectoryTokenType
}

export const getDirectoryTokens = (
    foundationToken: FoundationTokenType
): ResponsiveDirectoryTokens => {
    return {
        sm: {
            gap: foundationToken.unit[24],
            paddingX: foundationToken.unit[8],
            paddingY: foundationToken.unit[8],

            section: {
                gap: foundationToken.unit[4],

                header: {
                    padding: {
                        x: foundationToken.unit[12],
                        y: foundationToken.unit[2],
                    },
                    label: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        color: foundationToken.colors.gray[400],
                        fontWeight: 500,
                    },
                    chevron: {
                        width: foundationToken.unit[16],
                        color: foundationToken.colors.gray[400],
                    },
                },

                itemList: {
                    gap: foundationToken.unit[8],

                    item: {
                        padding: {
                            x: foundationToken.unit[12],
                            y: foundationToken.unit[6],
                        },
                        gap: foundationToken.unit[12],
                        borderRadius: foundationToken.border.radius[4],
                        fontWeight: 500,
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        transition: 'background-color 0.2s, color 0.2s',

                        backgroundColor: {
                            default: 'transparent',
                            hover: foundationToken.colors.gray[50],
                            active: foundationToken.colors.gray[150],
                        },

                        color: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[1000],
                        },

                        icon: {
                            width: foundationToken.unit[20],
                        },

                        chevron: {
                            width: foundationToken.unit[16],
                            color: foundationToken.colors.gray[600],
                        },
                    },

                    nested: {
                        paddingLeft: foundationToken.unit[24],
                        marginTop: foundationToken.unit[8],

                        border: {
                            width: foundationToken.unit[1],
                            color: foundationToken.colors.gray[200],
                            leftOffset: foundationToken.unit[16],
                        },
                    },
                },
            },
        },

        lg: {
            gap: foundationToken.unit[24],
            paddingX: foundationToken.unit[12],
            paddingY: foundationToken.unit[12],

            section: {
                gap: foundationToken.unit[4],

                header: {
                    padding: {
                        x: foundationToken.unit[12],
                        y: foundationToken.unit[2],
                    },
                    label: {
                        fontSize: foundationToken.font.size.body.sm.fontSize,
                        color: foundationToken.colors.gray[400],
                        fontWeight: 500,
                    },
                    chevron: {
                        width: foundationToken.unit[16],
                        color: foundationToken.colors.gray[400],
                    },
                },

                itemList: {
                    gap: foundationToken.unit[8],

                    item: {
                        padding: {
                            x: foundationToken.unit[12],
                            y: foundationToken.unit[6],
                        },
                        gap: foundationToken.unit[12],
                        borderRadius: foundationToken.border.radius[4],
                        fontWeight: 500,
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        transition: 'background-color 0.2s, color 0.2s',

                        backgroundColor: {
                            default: 'transparent',
                            hover: foundationToken.colors.gray[50],
                            active: foundationToken.colors.gray[150],
                        },

                        color: {
                            default: foundationToken.colors.gray[600],
                            hover: foundationToken.colors.gray[600],
                            active: foundationToken.colors.gray[1000],
                        },

                        icon: {
                            width: foundationToken.unit[20],
                        },

                        chevron: {
                            width: foundationToken.unit[16],
                            color: foundationToken.colors.gray[600],
                        },
                    },

                    nested: {
                        paddingLeft: foundationToken.unit[24],
                        marginTop: foundationToken.unit[8],

                        border: {
                            width: foundationToken.unit[1],
                            color: foundationToken.colors.gray[200],
                            leftOffset: foundationToken.unit[16],
                        },
                    },
                },
            },
        },
    }
}
