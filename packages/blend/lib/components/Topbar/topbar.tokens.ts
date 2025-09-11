import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import { BreakpointType } from '../../breakpoints/breakPoints'

export type TopbarState = 'default' | 'hover' | 'active'

export type TopbarTokensType = {
    height: CSSObject['height']
    position: CSSObject['position']
    top: CSSObject['top']
    zIndex: CSSObject['zIndex']
    borderBottom: CSSObject['borderBottom']
    backgroundColor: CSSObject['backgroundColor']
    backdropFilter: CSSObject['backdropFilter']
    padding: CSSObject['padding']
    gap: CSSObject['gap']

    toggleButton: {
        borderRadius: CSSObject['borderRadius']
        padding: CSSObject['padding']
        backgroundColor: {
            [key in TopbarState]: CSSObject['backgroundColor']
        }
        transition: CSSObject['transition']
        icon: {
            size: CSSObject['width']
            color: CSSObject['color']
        }
    }

    actionButton: {
        borderRadius: CSSObject['borderRadius']
        padding: CSSObject['padding']
        minWidth: CSSObject['minWidth']
        height: CSSObject['height']
        backgroundColor: {
            [key in TopbarState]: CSSObject['backgroundColor']
        }
        transition: CSSObject['transition']
        icon: {
            size: CSSObject['width']
            color: CSSObject['color']
        }
    }

    tenantIconButton: {
        borderRadius: CSSObject['borderRadius']
        minHeight: CSSObject['minHeight']
        backgroundColor: {
            [key in TopbarState]: CSSObject['backgroundColor']
        }
        transition: CSSObject['transition']
    }

    merchantSelectTrigger: {
        gap: CSSObject['gap']
        icon: {
            size: CSSObject['width']
            color: CSSObject['color']
        }
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
    }

    leftSection: {
        gap: CSSObject['gap']
        divider: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
    }

    centerSection: {
        title: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            color: CSSObject['color']
        }
    }

    rightSection: {
        gap: CSSObject['gap']
    }

    sidebarSection: {
        gap: CSSObject['gap']
    }
}

export type ResponsiveTopbarTokens = {
    [key in keyof BreakpointType]: TopbarTokensType
}

export const getTopbarTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTopbarTokens => {
    return {
        sm: {
            height: foundationToken.unit[56],
            position: 'sticky',
            top: '0',
            zIndex: '10',
            borderBottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
            backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: `${foundationToken.unit[12]} ${foundationToken.unit[16]}`,
            gap: foundationToken.unit[12],

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
                    size: foundationToken.unit[14],
                    color: foundationToken.colors.gray[600],
                },
            },

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

            merchantSelectTrigger: {
                gap: foundationToken.unit[6],
                icon: {
                    size: foundationToken.unit[14],
                    color: foundationToken.colors.gray[800],
                },
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: foundationToken.colors.gray[800],
                },
            },

            leftSection: {
                gap: foundationToken.unit[6],
                divider: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[400],
                },
            },

            centerSection: {
                title: {
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[800],
                },
            },

            rightSection: {
                gap: foundationToken.unit[8],
            },

            sidebarSection: {
                gap: foundationToken.unit[16],
            },
        },

        lg: {
            height: foundationToken.unit[68] || '68px',
            position: 'sticky',
            top: '0',
            zIndex: '10',
            borderBottom: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
            backgroundColor: 'hsla(0, 0%, 100%, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: `${foundationToken.unit[16]} ${foundationToken.unit[32]}`,
            gap: foundationToken.unit[16],

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
                    size: foundationToken.unit[14],
                    color: foundationToken.colors.gray[600],
                },
            },

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

            merchantSelectTrigger: {
                gap: foundationToken.unit[6],
                icon: {
                    size: foundationToken.unit[14],
                    color: foundationToken.colors.gray[800],
                },
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    color: foundationToken.colors.gray[800],
                },
            },

            leftSection: {
                gap: foundationToken.unit[6],
                divider: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[400],
                    color: foundationToken.colors.gray[400],
                },
            },

            centerSection: {
                title: {
                    fontSize: foundationToken.font.size.body.lg.fontSize,
                    fontWeight: foundationToken.font.weight[600],
                    color: foundationToken.colors.gray[800],
                },
            },

            rightSection: {
                gap: foundationToken.unit[8],
            },

            sidebarSection: {
                gap: foundationToken.unit[16],
            },
        },
    }
}
