import type { CSSObject } from 'styled-components'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type CalendarState = 'default' | 'hover' | 'active' | 'disabled'
export type CalendarSize = 'sm' | 'md' | 'lg'

/**
 * DateRangePicker Tokens following proper hierarchy pattern
 *
 * Structure:
 * - Base properties (shared across all components)
 * - Target sections: trigger, calendar, quickRange, mobileDrawer
 * - Each target has consistent sub-structure with x/y padding and state management
 *
 * Pattern:
 * - target.property.[size].[state] (for size/state-dependent properties)
 * - target.text.property (for text styling)
 * - target.padding.x/y (for consistent padding structure)
 */
export type CalendarTokenType = {
    // Trigger elements - both quick selector and date input
    trigger: {
        // Quick selector (left side preset dropdown)
        quickSelector: {
            // Border radius for individual corners
            borderRadius: {
                topLeft: CSSObject['borderTopLeftRadius'] // Top left corner
                topRight: CSSObject['borderTopRightRadius'] // Top right corner
                bottomLeft: CSSObject['borderBottomLeftRadius'] // Bottom left corner
                bottomRight: CSSObject['borderBottomRightRadius'] // Bottom right corner
            }
            backgroundColor: CSSObject['backgroundColor'] // Background color
            gap: CSSObject['gap'] // Gap between elements
            // Size-dependent padding with x/y axis
            padding: {
                [key in CalendarSize]: {
                    x: CSSObject['padding'] // Horizontal padding
                    y: CSSObject['padding'] // Vertical padding
                }
            }
            // State-dependent border styling
            border: {
                [key in CalendarState]: {
                    left: CSSObject['borderLeft'] // Left border for each state
                    top: CSSObject['borderTop'] // Top border for each state
                    bottom: CSSObject['borderBottom'] // Bottom border for each state
                    right: CSSObject['borderRight'] // Right border for each state
                }
            }
            // Text styling
            text: {
                color: CSSObject['color'] // Text color
                fontWeight: CSSObject['fontWeight'] // Text font weight
                // Size-dependent font size
                fontSize: {
                    [key in CalendarSize]: CSSObject['fontSize'] // Font size for each size
                }
            }
            iconSize: CSSObject['width'] // Icon size
        }

        // Date input (right side main input field)
        dateInput: {
            // Border radius for different configurations
            borderRadius: {
                withQuickSelector: CSSObject['borderRadius'] // Radius when quick selector is shown
                withoutQuickSelector: CSSObject['borderRadius'] // Radius when no quick selector
            }
            // Size-dependent padding broken into x/y axis
            padding: {
                [key in CalendarSize]: {
                    x: CSSObject['padding'] // Horizontal padding
                    y: CSSObject['padding'] // Vertical padding
                }
            }
            // Text styling
            text: {
                color: CSSObject['color'] // Text color
                fontSize: {
                    [key in CalendarSize]: CSSObject['fontSize'] // Font size for each size
                }
                fontWeight: CSSObject['fontWeight'] // Text font weight
            }
            // State-dependent border styling
            border: {
                [key in CalendarState]: CSSObject['border'] // Border for each state
            } & {
                // Optional so existing CALENDAR token overrides keep compiling.
                // DateRangePicker never reads this; SingleDatePicker and
                // TimePicker use it for their `error` prop.
                error?: CSSObject['border']
            }
            backgroundColor: CSSObject['backgroundColor'] // Background color
            iconSize: CSSObject['width'] // Icon size
            gap: CSSObject['gap'] // Gap between elements
        }
    }
    calendar: {
        minWidth: CSSObject['minWidth'] // Calendar minimum width
        width: CSSObject['width'] // Calendar width
        backgroundColor: CSSObject['backgroundColor'] // Calendar background
        border: CSSObject['border'] // Calendar border
        borderRadius: CSSObject['borderRadius'] // Calendar border radius
        boxShadow: CSSObject['boxShadow'] // Calendar shadow

        // Date input section at top of calendar
        header: {
            padding: {
                x: CSSObject['padding'] // Input section horizontal padding
                y: CSSObject['padding'] // Input section vertical padding
            }
            dateInput: {
                gap: CSSObject['gap'] // Gap between input elements
                label: {
                    color: CSSObject['color'] // Input label color
                    fontSize: CSSObject['fontSize'] // Input label font size
                    fontWeight: CSSObject['fontWeight'] // Input label font weight
                }
            }
        }

        // Main calendar grid with months and days
        calendarGrid: {
            // Month header styling
            month: {
                header: {
                    fontSize: CSSObject['fontSize'] // Month name font size
                    fontWeight: CSSObject['fontWeight'] // Month name font weight
                    color: CSSObject['color'] // Month name color
                    padding: {
                        x: CSSObject['padding'] // Month header horizontal padding
                        y: CSSObject['padding'] // Month header vertical padding
                    }
                    gap: CSSObject['gap'] // Gap between month heading and dates
                }
            }

            // Week layout and day names
            week: {
                gap: CSSObject['gap'] // Gap between week elements
                fontSize: CSSObject['fontSize'] // Week header font size
                fontWeight: CSSObject['fontWeight'] // Week header font weight
                boxShadow: CSSObject['boxShadow'] // Week header shadow
                color: CSSObject['color'] // Week header color
                padding: {
                    x: CSSObject['padding'] // Week cell horizontal padding
                    y: CSSObject['padding'] // Week cell vertical padding
                }
                row: {
                    gap: CSSObject['gap'] // Gap between days in row
                }
            }

            // Individual day cells
            day: {
                cell: {
                    padding: {
                        x: CSSObject['padding'] // Day cell horizontal padding
                        y: CSSObject['padding'] // Day cell vertical padding
                    }
                    fontWeight: CSSObject['fontWeight'] // Day cell font weight
                    fontSize: CSSObject['fontSize'] // Day cell font size
                    lineHeight: CSSObject['lineHeight'] // Day cell line height
                    // Outline depends on state
                    border: {
                        [key in CalendarState]: CSSObject['border'] // Outline for each state
                    }
                    borderRadius: CSSObject['borderRadius'] // Cell border radius
                }

                // Different day states (selected, range, today, etc.)
                states: {
                    startDate: {
                        backgroundColor: CSSObject['backgroundColor'] // Start date background
                        borderRadius: {
                            topLeft: CSSObject['borderTopLeftRadius'] // Start date top left radius
                            bottomLeft: CSSObject['borderBottomLeftRadius'] // Start date bottom left radius
                        }
                    }
                    endDate: {
                        backgroundColor: CSSObject['backgroundColor'] // End date background
                        borderRadius: {
                            topRight: CSSObject['borderTopRightRadius'] // End date top right radius
                            bottomRight: CSSObject['borderBottomRightRadius'] // End date bottom right radius
                        }
                    }
                    singleDate: {
                        backgroundColor: CSSObject['backgroundColor'] // Single date background
                        borderRadius: CSSObject['borderRadius'] // Single date border radius
                    }
                    rangeDay: {
                        backgroundColor: CSSObject['backgroundColor'] // Range day background
                    }
                    todayDay: {
                        fontWeight: CSSObject['fontWeight'] // Today font weight
                    }
                    //  remove this as we can take the same border as the single day cell
                    // hoverState: {
                    //     boxShadow: CSSObject['boxShadow'] // Hover box shadow
                    //     borderRadius: CSSObject['borderRadius'] // Hover border radius
                    // }
                    // remove opacity and cursor and pointer events and use color only gray 300
                    disabledDay: {
                        color: CSSObject['color'] // Disabled color
                    }
                }

                // Text colors for different day types
                text: {
                    dayNumber: {
                        color: CSSObject['color'] // Regular day number color
                    }
                    selectedDay: {
                        color: CSSObject['color'] // Selected day text color
                    }
                    rangeDay: {
                        color: CSSObject['color'] // Range day text color
                    }
                    todayDay: {
                        color: CSSObject['color'] // Today text color
                    }
                    disabledDate: {
                        color: CSSObject['color'] // Disabled date text color
                    }
                }

                // Today indicator dot
                todayIndicator: {
                    width: CSSObject['width'] // Indicator width (height is same as width)
                    backgroundColor: CSSObject['backgroundColor'] // Indicator background
                }
            }
        }

        // Calendar footer with time range and actions
        // make
        footer: {
            padding: {
                x: CSSObject['padding'] // Footer horizontal padding
                y: CSSObject['padding'] // Footer vertical padding
            }
            borderTop: CSSObject['borderTop'] // Footer top border
            gap: CSSObject['gap'] // Footer gap between elements
        }
    }
}

export type ResponsiveCalendarTokens = {
    [key in keyof BreakpointType]: CalendarTokenType
}
