import type { CSSObject } from 'styled-components'
import { ChartLegendPosition } from './types'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type ChartState =
    | 'default'
    | 'hover'
    | 'active'
    | 'fullscreen'
    | 'collapsed'
export type ChartSize = 'sm' | 'md' | 'lg'
export type ChartVariant = 'container' | 'no-container'

export type ChartTokensType = {
    container: {
        backgroundColor: {
            [key in ChartState]: CSSObject['backgroundColor']
        }
        border: {
            [key in ChartVariant]: {
                [key in ChartState]: CSSObject['border']
            }
        }
        borderRadius: {
            [key in ChartState]: CSSObject['borderRadius']
        }
        padding: {
            [key in ChartSize]: CSSObject['padding']
        }
        gap: {
            [key in ChartSize]: CSSObject['gap']
        }
        shadow: {
            [key in ChartVariant]: CSSObject['boxShadow']
        }
    }
    header: {
        padding: {
            [key in ChartSize]: CSSObject['padding']
        }
        gap: CSSObject['gap']
        backgroundColor: CSSObject['backgroundColor']
        borderBottom: CSSObject['borderBottom']
        minHeight: CSSObject['minHeight']
    }
    content: {
        padding: {
            [key in ChartSize]: CSSObject['padding']
        }
        paddingX: {
            [key in ChartSize]: CSSObject['padding']
        }
        gap: {
            [key in ChartSize]: CSSObject['gap']
        }
        height: {
            default: CSSObject['height']
            fullscreen: CSSObject['height']
            small: CSSObject['height']
        }
    }
    legend: {
        gap: {
            [key in ChartSize]: CSSObject['gap']
        }
        padding: {
            [key in ChartSize]: CSSObject['padding']
        }
        width: {
            [key in ChartLegendPosition]: CSSObject['width']
        }
        item: {
            padding: CSSObject['padding']
            gap: CSSObject['gap']
            borderRadius: CSSObject['borderRadius']
            backgroundColor: {
                [key in ChartState]: CSSObject['backgroundColor']
            }
            color: {
                [key in ChartState]: CSSObject['color']
            }
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
        button: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
            borderRadius: CSSObject['borderRadius']
            padding: CSSObject['padding']
        }
    }
    fullscreen: {
        container: {
            position: CSSObject['position']
            top: CSSObject['top']
            left: CSSObject['left']
            width: CSSObject['width']
            height: CSSObject['height']
            zIndex: CSSObject['zIndex']
            backgroundColor: CSSObject['backgroundColor']
            transform: CSSObject['transform']
            transformOrigin: CSSObject['transformOrigin']
        }
        content: {
            height: CSSObject['height']
            padding: CSSObject['padding']
        }
    }
    responsive: {
        chart: {
            height: {
                [key in keyof BreakpointType]: CSSObject['height']
            }
        }
        legend: {
            display: {
                [key in keyof BreakpointType]: CSSObject['display']
            }
            flexDirection: {
                [key in keyof BreakpointType]: CSSObject['flexDirection']
            }
        }
    }
}

export type ResponsiveChartTokens = {
    [key in keyof BreakpointType]: ChartTokensType
}

export const getChartTokens = (
    foundationToken: FoundationTokenType
): ResponsiveChartTokens => {
    return {
        sm: {
            container: {
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[0],
                    active: foundationToken.colors.gray[0],
                    fullscreen: foundationToken.colors.gray[0],
                    collapsed: foundationToken.colors.gray[0],
                },
                border: {
                    container: {
                        default: `1px solid ${foundationToken.colors.gray[300]}`,
                        hover: `1px solid ${foundationToken.colors.gray[300]}`,
                        active: `1px solid ${foundationToken.colors.gray[300]}`,
                        fullscreen: `1px solid ${foundationToken.colors.gray[300]}`,
                        collapsed: `1px solid ${foundationToken.colors.gray[300]}`,
                    },
                    'no-container': {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        fullscreen: 'none',
                        collapsed: 'none',
                    },
                },
                borderRadius: {
                    default: foundationToken.border.radius[8],
                    hover: foundationToken.border.radius[8],
                    active: foundationToken.border.radius[8],
                    fullscreen: foundationToken.border.radius[8],
                    collapsed: foundationToken.border.radius[8],
                },
                padding: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[20],
                },
                gap: {
                    sm: foundationToken.unit[16],
                    md: foundationToken.unit[20],
                    lg: foundationToken.unit[24],
                },
                shadow: {
                    container: foundationToken.shadows.xs,
                    'no-container': 'none',
                },
            },
            header: {
                padding: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[20],
                },
                gap: foundationToken.unit[12],
                backgroundColor: 'transparent',
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                minHeight: foundationToken.unit[48],
            },
            content: {
                padding: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[20],
                },
                paddingX: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[16],
                },
                gap: {
                    sm: foundationToken.unit[16],
                    md: foundationToken.unit[20],
                    lg: foundationToken.unit[24],
                },
                height: {
                    default: 300,
                    fullscreen: 250,
                    small: 250,
                },
            },
            legend: {
                gap: {
                    sm: foundationToken.unit[8],
                    md: foundationToken.unit[12],
                    lg: foundationToken.unit[16],
                },
                padding: {
                    sm: foundationToken.unit[8],
                    md: foundationToken.unit[12],
                    lg: foundationToken.unit[16],
                },
                width: {
                    [ChartLegendPosition.TOP]: '100%',
                    [ChartLegendPosition.RIGHT]: '25%',
                },
                item: {
                    padding: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
                    gap: foundationToken.unit[8],
                    borderRadius: foundationToken.border.radius[6],
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[100],
                        fullscreen: 'transparent',
                        collapsed: 'transparent',
                    },
                    color: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[800],
                        fullscreen: foundationToken.colors.gray[600],
                        collapsed: foundationToken.colors.gray[400],
                    },
                    fontSize: 12,
                    fontWeight: 500,
                },
                button: {
                    fontSize: 12,
                    fontWeight: 500,
                    color: foundationToken.colors.gray[600],
                    backgroundColor: 'transparent',
                    border: `1px solid ${foundationToken.colors.gray[300]}`,
                    borderRadius: foundationToken.border.radius[6],
                    padding: `${foundationToken.unit[6]} ${foundationToken.unit[10]}`,
                },
            },
            fullscreen: {
                container: {
                    position: 'fixed',
                    top: '50vh',
                    left: '50vw',
                    width: '100vh',
                    height: '100vw',
                    zIndex: 9999,
                    backgroundColor: foundationToken.colors.gray[0],
                    transform: 'rotate(90deg) translate(-50%, -50%)',
                    transformOrigin: '0 0',
                },
                content: {
                    height: 250,
                    padding: foundationToken.unit[12],
                },
            },
            responsive: {
                chart: {
                    height: {
                        sm: 250,
                        lg: 300,
                    },
                },
                legend: {
                    display: {
                        sm: 'flex',
                        lg: 'flex',
                    },
                    flexDirection: {
                        sm: 'column',
                        lg: 'column',
                    },
                },
            },
        },
        lg: {
            container: {
                backgroundColor: {
                    default: foundationToken.colors.gray[0],
                    hover: foundationToken.colors.gray[0],
                    active: foundationToken.colors.gray[0],
                    fullscreen: foundationToken.colors.gray[0],
                    collapsed: foundationToken.colors.gray[0],
                },
                border: {
                    container: {
                        default: `1px solid ${foundationToken.colors.gray[300]}`,
                        hover: `1px solid ${foundationToken.colors.gray[300]}`,
                        active: `1px solid ${foundationToken.colors.gray[300]}`,
                        fullscreen: `1px solid ${foundationToken.colors.gray[300]}`,
                        collapsed: `1px solid ${foundationToken.colors.gray[300]}`,
                    },
                    'no-container': {
                        default: 'none',
                        hover: 'none',
                        active: 'none',
                        fullscreen: 'none',
                        collapsed: 'none',
                    },
                },
                borderRadius: {
                    default: foundationToken.border.radius[8],
                    hover: foundationToken.border.radius[8],
                    active: foundationToken.border.radius[8],
                    fullscreen: foundationToken.border.radius[8],
                    collapsed: foundationToken.border.radius[8],
                },
                padding: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[20],
                },
                gap: {
                    sm: foundationToken.unit[16],
                    md: foundationToken.unit[20],
                    lg: foundationToken.unit[24],
                },
                shadow: {
                    container: foundationToken.shadows.sm,
                    'no-container': 'none',
                },
            },
            header: {
                padding: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[20],
                },
                gap: foundationToken.unit[12],
                backgroundColor: 'transparent',
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                minHeight: foundationToken.unit[48],
            },
            content: {
                padding: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[20],
                },
                paddingX: {
                    sm: foundationToken.unit[12],
                    md: foundationToken.unit[16],
                    lg: foundationToken.unit[16],
                },
                gap: {
                    sm: foundationToken.unit[16],
                    md: foundationToken.unit[20],
                    lg: foundationToken.unit[24],
                },
                height: {
                    default: 400,
                    fullscreen: 250,
                    small: 300,
                },
            },
            legend: {
                gap: {
                    sm: foundationToken.unit[8],
                    md: foundationToken.unit[12],
                    lg: foundationToken.unit[16],
                },
                padding: {
                    sm: foundationToken.unit[8],
                    md: foundationToken.unit[12],
                    lg: foundationToken.unit[16],
                },
                width: {
                    [ChartLegendPosition.TOP]: '100%',
                    [ChartLegendPosition.RIGHT]: '25%',
                },
                item: {
                    padding: `${foundationToken.unit[6]} ${foundationToken.unit[12]}`,
                    gap: foundationToken.unit[8],
                    borderRadius: foundationToken.border.radius[6],
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[50],
                        active: foundationToken.colors.gray[100],
                        fullscreen: 'transparent',
                        collapsed: 'transparent',
                    },
                    color: {
                        default: foundationToken.colors.gray[600],
                        hover: foundationToken.colors.gray[700],
                        active: foundationToken.colors.gray[800],
                        fullscreen: foundationToken.colors.gray[600],
                        collapsed: foundationToken.colors.gray[400],
                    },
                    fontSize: 14,
                    fontWeight: 500,
                },
                button: {
                    fontSize: 14,
                    fontWeight: 500,
                    color: foundationToken.colors.gray[600],
                    backgroundColor: 'transparent',
                    border: `1px solid ${foundationToken.colors.gray[300]}`,
                    borderRadius: foundationToken.border.radius[6],
                    padding: `${foundationToken.unit[8]} ${foundationToken.unit[12]}`,
                },
            },
            fullscreen: {
                container: {
                    position: 'fixed',
                    top: '50vh',
                    left: '50vw',
                    width: '100vh',
                    height: '100vw',
                    zIndex: 9999,
                    backgroundColor: foundationToken.colors.gray[0],
                    transform: 'rotate(90deg) translate(-50%, -50%)',
                    transformOrigin: '0 0',
                },
                content: {
                    height: 250,
                    padding: foundationToken.unit[16],
                },
            },
            responsive: {
                chart: {
                    height: {
                        sm: 300,
                        lg: 400,
                    },
                },
                legend: {
                    display: {
                        sm: 'none',
                        lg: 'flex',
                    },
                    flexDirection: {
                        sm: 'column',
                        lg: 'row',
                    },
                },
            },
        },
    }
}
