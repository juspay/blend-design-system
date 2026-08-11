import type { FoundationTokenType } from '../../tokens/theme.token'
import type {
    CalendarTokenType,
    ResponsiveCalendarTokens,
} from './dateRangePicker.tokens.types'

export const getCalendarDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveCalendarTokens => {
    const baseTokens: CalendarTokenType = {
        trigger: {
            quickSelector: {
                borderRadius: {
                    topLeft: foundationToken.border.radius[10],
                    topRight: foundationToken.border.radius[0],
                    bottomLeft: foundationToken.border.radius[10],
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
                        left: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        top: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        bottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        right: 'none',
                    },
                    hover: {
                        left: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        top: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        bottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        right: 'none',
                    },
                    active: {
                        left: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        top: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        bottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                        right: 'none',
                    },
                    disabled: {
                        left: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[800]}`,
                        top: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[800]}`,
                        bottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[800]}`,
                        right: 'none',
                    },
                },
                text: {
                    color: foundationToken.colors.gray[200],
                    fontWeight: foundationToken.font.weight[500],
                    fontSize: {
                        sm: foundationToken.font.size.body.sm.fontSize,
                        md: foundationToken.font.size.body.md.fontSize,
                        lg: foundationToken.font.size.body.md.fontSize,
                    },
                },
                iconSize: foundationToken.unit[16],
            },

            dateInput: {
                borderRadius: {
                    withQuickSelector: `0 ${foundationToken.border.radius[10]} ${foundationToken.border.radius[10]} 0`,
                    withoutQuickSelector: foundationToken.border.radius[10],
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
                    color: foundationToken.colors.gray[200],
                    fontSize: {
                        sm: foundationToken.font.size.body.sm.fontSize,
                        md: foundationToken.font.size.body.md.fontSize,
                        lg: foundationToken.font.size.body.md.fontSize,
                    },
                    fontWeight: foundationToken.font.weight[500],
                },
                border: {
                    default: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                    hover: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                    active: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                    disabled: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[800]}`,
                    error: `${foundationToken.border.width[1]} solid ${foundationToken.colors.red[400]}`,
                },
                backgroundColor: foundationToken.colors.gray[900],
                iconSize: foundationToken.unit[16],
                gap: foundationToken.unit[8],
            },
        },
        calendar: {
            minWidth: '320px',
            width: '320px',
            backgroundColor: foundationToken.colors.gray[900],
            border: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
            borderRadius: foundationToken.border.radius[8],
            boxShadow: foundationToken.shadows.sm,
            header: {
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[16],
                },
                dateInput: {
                    gap: foundationToken.unit[12],
                    label: {
                        color: foundationToken.colors.gray[400],
                        fontSize: foundationToken.font.size.body.md.fontSize,
                        fontWeight: foundationToken.font.weight[500],
                    },
                },
            },
            calendarGrid: {
                month: {
                    header: {
                        fontSize: foundationToken.font.size.body.lg.fontSize,
                        fontWeight: foundationToken.font.weight[600],
                        color: foundationToken.colors.gray[200],
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
                    boxShadow: `0 2px 4px -1px ${foundationToken.colors.gray[800]}`,
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
                        border: {
                            default: '1px solid transparent',
                            hover: `1px solid ${foundationToken.colors.primary[400]}`,
                            active: `1px solid ${foundationToken.colors.primary[400]}`,
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
                            backgroundColor:
                                foundationToken.colors.primary[900],
                        },
                        todayDay: {
                            fontWeight: foundationToken.font.weight[500],
                        },
                        disabledDay: {
                            color: foundationToken.colors.gray[600],
                        },
                    },
                    text: {
                        dayNumber: {
                            color: foundationToken.colors.gray[200],
                        },
                        selectedDay: {
                            color: foundationToken.colors.gray[0],
                        },
                        rangeDay: {
                            color: foundationToken.colors.gray[100],
                        },
                        todayDay: {
                            color: foundationToken.colors.primary[400],
                        },
                        disabledDate: {
                            color: foundationToken.colors.gray[600],
                        },
                    },
                    todayIndicator: {
                        width: foundationToken.unit[4],
                        backgroundColor: foundationToken.colors.primary[400],
                    },
                },
            },
            footer: {
                padding: {
                    x: foundationToken.unit[12],
                    y: foundationToken.unit[12],
                },
                borderTop: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[700]}`,
                gap: foundationToken.unit[12],
            },
        },
    }

    return {
        sm: baseTokens,
        lg: baseTokens,
    }
}
