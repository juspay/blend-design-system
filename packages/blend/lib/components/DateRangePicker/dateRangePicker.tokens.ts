import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
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
    // Main trigger element (date input field)
    trigger: {
        // Border radius for different configurations
        borderRadius: {
            quickRange: CSSObject['borderRadius'] // Combined radius when presets are shown
            withoutQuickRange: CSSObject['borderRadius'] // Combined radius when no presets
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
        }
        backgroundColor: CSSObject['backgroundColor'] // Background color
        iconSize: CSSObject['width'] // Icon size
        gap: CSSObject['gap'] // Gap between elements
    }
    // Quick range selector (preset dropdown)
    quickRange: {
        trigger: {
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
    }
    calendar: {
        minWidth: CSSObject['minWidth'] // Calendar minimum width
        width: CSSObject['width'] // Calendar width
        backgroundColor: CSSObject['backgroundColor'] // Calendar background
        border: CSSObject['border'] // Calendar border
        borderRadius: CSSObject['borderRadius'] // Calendar border radius
        boxShadow: CSSObject['boxShadow'] // Calendar shadow

        // Date input section at top of calendar
        inputs: {
            padding: {
                x: CSSObject['padding'] // Input section horizontal padding
                y: CSSObject['padding'] // Input section vertical padding
            }
            dateInput: {
                gap: CSSObject['gap'] // Gap between input elements
                label: {
                    color: CSSObject['color'] // Input label color
                    width: CSSObject['width'] // Input label width
                    fontSize: CSSObject['fontSize'] // Input label font size
                    fontWeight: CSSObject['fontWeight'] // Input label font weight
                }
                fontSize: CSSObject['fontSize'] // Input text font size
                fontWeight: CSSObject['fontWeight'] // Input text font weight
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
                    outline: {
                        [key in CalendarState]: CSSObject['outline'] // Outline for each state
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
                    hoverState: {
                        boxShadow: CSSObject['boxShadow'] // Hover box shadow
                        borderRadius: CSSObject['borderRadius'] // Hover border radius
                    }
                    disabledDay: {
                        opacity: CSSObject['opacity'] // Disabled opacity
                        cursor: CSSObject['cursor'] // Disabled cursor
                        pointerEvents: CSSObject['pointerEvents'] // Disabled pointer events
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
                }

                // Today indicator dot
                todayIndicator: {
                    width: CSSObject['width'] // Indicator width
                    backgroundColor: CSSObject['backgroundColor'] // Indicator background
                }
            }
        }

        // Calendar footer with time range and actions
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

export const getCalendarToken = (
    foundationToken: FoundationTokenType
): ResponsiveCalendarTokens => {
    const baseTokens: CalendarTokenType = {
        trigger: {
            borderRadius: {
                quickRange: '0 8px 8px 0',
                withoutQuickRange: foundationToken.border.radius[8],
            },
            padding: {
                sm: {
                    x: foundationToken.unit[14],
                    y: foundationToken.unit[5],
                },
                md: {
                    x: foundationToken.unit[14],
                    y: '4.5px',
                },
                lg: {
                    x: foundationToken.unit[14],
                    y: '8.5px',
                },
            },
            text: {
                color: foundationToken.colors.gray[600],
                fontSize: {
                    sm: foundationToken.font.size.body.sm.fontSize,
                    md: foundationToken.font.size.body.md.fontSize,
                    lg: foundationToken.font.size.body.md.fontSize,
                },
                fontWeight: foundationToken.font.weight[500],
            },
            border: {
                default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
            },
            backgroundColor: foundationToken.colors.gray[0],
            iconSize: foundationToken.unit[16],
            gap: foundationToken.unit[8],
        },
        quickRange: {
            trigger: {
                borderRadius: {
                    topLeft: foundationToken.border.radius[8],
                    topRight: foundationToken.border.radius[0],
                    bottomLeft: foundationToken.border.radius[8],
                    bottomRight: foundationToken.border.radius[0],
                },
                backgroundColor: 'transparent',
                gap: foundationToken.unit[8],
                padding: {
                    sm: {
                        x: foundationToken.unit[14],
                        y: foundationToken.unit[6],
                    },
                    md: {
                        x: foundationToken.unit[14],
                        y: '6.5px',
                    },
                    lg: {
                        x: foundationToken.unit[14],
                        y: '8.5px',
                    },
                },
                border: {
                    default: {
                        left: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                        top: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                        bottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                        right: 'none',
                    },
                    hover: {
                        left: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                        top: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                        bottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                        right: 'none',
                    },
                    active: {
                        left: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                        top: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                        bottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[300]}`,
                        right: 'none',
                    },
                    disabled: {
                        left: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        top: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        bottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                        right: 'none',
                    },
                },
                text: {
                    color: foundationToken.colors.gray[600],
                    fontWeight: foundationToken.font.weight[500],
                    fontSize: {
                        sm: foundationToken.font.size.body.sm.fontSize,
                        md: foundationToken.font.size.body.md.fontSize,
                        lg: foundationToken.font.size.body.md.fontSize,
                    },
                },
                iconSize: foundationToken.unit[16],
            },
        },
        calendar: {
            minWidth: '320px',
            width: '320px',
            backgroundColor: foundationToken.colors.gray[0],
            border: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[8],
            boxShadow: foundationToken.shadows.xs,
            inputs: {
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                dateInput: {
                    gap: foundationToken.unit[12],
                    label: {
                        color: foundationToken.colors.gray[500],
                        width: foundationToken.unit[32],
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                    },
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                },
            },
            calendarGrid: {
                month: {
                    header: {
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: foundationToken.colors.gray[700],
                        padding: {
                            x: foundationToken.unit[12],
                            y: foundationToken.unit[0],
                        },
                        gap: foundationToken.unit[16],
                    },
                },
                week: {
                    gap: foundationToken.unit[4],
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    boxShadow: `0 2px 4px -1px ${foundationToken.colors.gray[200]}`,
                    color: foundationToken.colors.gray[400],
                    padding: {
                        x: foundationToken.unit[8],
                        y: foundationToken.unit[10],
                    },
                    row: {
                        gap: foundationToken.unit[0],
                    },
                },
                day: {
                    cell: {
                        padding: {
                            x: foundationToken.unit[8],
                            y: foundationToken.unit[10],
                        },
                        fontWeight: foundationToken.font.weight[500],
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        lineHeight: foundationToken.unit[20],
                        outline: {
                            default: '1px solid transparent',
                            hover: `1px solid ${foundationToken.colors.primary[500]}`,
                            active: `1px solid ${foundationToken.colors.primary[500]}`,
                            disabled: '1px solid transparent',
                        },
                        borderRadius: foundationToken.border.radius[8],
                    },
                    states: {
                        startDate: {
                            backgroundColor:
                                foundationToken.colors.primary[500],
                            borderRadius: {
                                topLeft: foundationToken.border.radius[8],
                                bottomLeft: foundationToken.border.radius[8],
                            },
                        },
                        endDate: {
                            backgroundColor:
                                foundationToken.colors.primary[500],
                            borderRadius: {
                                topRight: foundationToken.border.radius[8],
                                bottomRight: foundationToken.border.radius[8],
                            },
                        },
                        singleDate: {
                            backgroundColor:
                                foundationToken.colors.primary[500],
                            borderRadius: foundationToken.border.radius[8],
                        },
                        rangeDay: {
                            backgroundColor: foundationToken.colors.primary[50],
                        },
                        todayDay: {
                            fontWeight: foundationToken.font.weight[500],
                        },
                        hoverState: {
                            boxShadow: `inset 0 0 0 1px ${foundationToken.colors.primary[500]}`,
                            borderRadius: foundationToken.border.radius[8],
                        },
                        disabledDay: {
                            opacity: 0.4,
                            cursor: 'not-allowed',
                            pointerEvents: 'none',
                        },
                    },
                    text: {
                        dayNumber: {
                            color: foundationToken.colors.gray[600],
                        },
                        selectedDay: {
                            color: foundationToken.colors.gray[0],
                        },
                        rangeDay: {
                            color: foundationToken.colors.gray[600],
                        },
                        todayDay: {
                            color: foundationToken.colors.primary[500],
                        },
                    },
                    todayIndicator: {
                        width: foundationToken.unit[4],
                        backgroundColor: foundationToken.colors.primary[500],
                    },
                },
            },
            footer: {
                padding: {
                    x: foundationToken.unit[12],
                    y: foundationToken.unit[12],
                },
                borderTop: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
                gap: foundationToken.unit[12],
            },
        },
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
