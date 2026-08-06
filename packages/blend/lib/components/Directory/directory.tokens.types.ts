import type { CSSObject } from 'styled-components'
import { type BreakpointType } from '../../breakpoints/breakPoints'

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

        // Navigation items within the section
        itemList: {
            gap: CSSObject['gap'] // Space between items in the list

            item: {
                padding: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
                iconOnlyPadding: {
                    paddingTop: CSSObject['paddingTop']
                    paddingBottom: CSSObject['paddingBottom']
                    paddingLeft: CSSObject['paddingLeft']
                    paddingRight: CSSObject['paddingRight']
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
                connector: {
                    itemInset: CSSObject['marginLeft'] // Keeps item backgrounds clear of hierarchy lines
                    itemPaddingLeft: CSSObject['paddingLeft'] // Left padding for nested items when hierarchy lines are visible
                    elbowTop: CSSObject['top'] // Top offset for the horizontal connector elbow
                    elbowHeight: CSSObject['height'] // Height of the connector elbow
                    elbowWidthOffset: CSSObject['width'] // Extra width that carries the elbow closer to the child row
                }
            }
        }
    }
}

export type ResponsiveDirectoryTokens = {
    [key in keyof BreakpointType]: DirectoryTokenType
}
