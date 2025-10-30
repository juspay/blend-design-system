import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'

export type NodeState = 'default' | 'hover' | 'selected'

export type WorkflowTokensType = {
    canvas: {
        backgroundColor: CSSObject['backgroundColor']
        dotColor: CSSObject['color']
        dotGap: CSSObject['gap']
        dotSize: number
    }
    node: {
        default: {
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
            borderRadius: CSSObject['borderRadius']
            color: CSSObject['color']
            padding: CSSObject['padding']
            boxShadow: CSSObject['boxShadow']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            minWidth: CSSObject['minWidth']
            minHeight: CSSObject['minHeight']
        }
        hover: {
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
            boxShadow: CSSObject['boxShadow']
        }
        selected: {
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
            boxShadow: CSSObject['boxShadow']
        }
        content: {
            gap: CSSObject['gap']
            padding: CSSObject['padding']
        }
        icon: {
            paddingSm: CSSObject['padding']
            paddingMd: CSSObject['padding']
            borderRadiusSm: CSSObject['borderRadius']
            borderRadiusMd: CSSObject['borderRadius']
            size: {
                small: number
                medium: number
                large: number
            }
        }
    }
    handle: {
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
        width: CSSObject['width']
        height: CSSObject['height']
        hover: {
            backgroundColor: CSSObject['backgroundColor']
            border: CSSObject['border']
        }
    }
    edge: {
        stroke: CSSObject['stroke']
        strokeWidth: CSSObject['strokeWidth']
        selected: {
            stroke: CSSObject['stroke']
            strokeWidth: CSSObject['strokeWidth']
        }
        animated: {
            stroke: CSSObject['stroke']
        }
    }
    controls: {
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        boxShadow: CSSObject['boxShadow']
        padding: CSSObject['padding']
        gap: CSSObject['gap']
        offset:
            | CSSObject['top']
            | CSSObject['right']
            | CSSObject['bottom']
            | CSSObject['left']
        button: {
            color: CSSObject['color']
            hover: {
                backgroundColor: CSSObject['backgroundColor']
            }
        }
    }
    minimap: {
        backgroundColor: CSSObject['backgroundColor']
        border: CSSObject['border']
        borderRadius: CSSObject['borderRadius']
        maskColor: CSSObject['backgroundColor']
        nodeColor: CSSObject['color']
        nodeStrokeColor: CSSObject['color']
        nodeBorderRadius: CSSObject['borderRadius']
    }
}

export type ResponsiveWorkflowTokens = {
    [key in keyof BreakpointType]: WorkflowTokensType
}

export const getWorkflowTokens = (
    foundationToken: FoundationTokenType
): ResponsiveWorkflowTokens => {
    return {
        sm: {
            canvas: {
                backgroundColor: foundationToken.colors.gray[0],
                dotColor: foundationToken.colors.gray[300],
                dotGap: foundationToken.unit[16],
                dotSize: 1,
            },
            node: {
                default: {
                    backgroundColor: foundationToken.colors.gray[0],
                    border: `1px solid ${foundationToken.colors.gray[200]}`,
                    borderRadius: foundationToken.border.radius[8],
                    color: foundationToken.colors.gray[700],
                    padding: `${foundationToken.unit[12]} ${foundationToken.unit[16]}`,
                    boxShadow: foundationToken.shadows.sm,
                    fontSize: foundationToken.font.size.body.sm.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    minWidth: '120px',
                    minHeight: '40px',
                },
                hover: {
                    backgroundColor: foundationToken.colors.gray[25],
                    border: `1px solid ${foundationToken.colors.gray[300]}`,
                    boxShadow: foundationToken.shadows.md,
                },
                selected: {
                    backgroundColor: foundationToken.colors.gray[0],
                    border: `2px solid ${foundationToken.colors.primary[500]}`,
                    boxShadow: foundationToken.shadows.lg,
                },
                content: {
                    gap: foundationToken.unit[12],
                    padding: foundationToken.unit[16],
                },
                icon: {
                    paddingSm: foundationToken.unit[8],
                    paddingMd: foundationToken.unit[10],
                    borderRadiusSm: foundationToken.border.radius[8],
                    borderRadiusMd: foundationToken.border.radius[12],
                    size: {
                        small: 16,
                        medium: 20,
                        large: 24,
                    },
                },
            },
            handle: {
                backgroundColor: foundationToken.colors.gray[0],
                border: `2px solid ${foundationToken.colors.gray[400]}`,
                width: '8px',
                height: '8px',
                hover: {
                    backgroundColor: foundationToken.colors.primary[500],
                    border: `2px solid ${foundationToken.colors.primary[600]}`,
                },
            },
            edge: {
                stroke: foundationToken.colors.gray[300],
                strokeWidth: '2px',
                selected: {
                    stroke: foundationToken.colors.primary[500],
                    strokeWidth: '2px',
                },
                animated: {
                    stroke: foundationToken.colors.primary[400],
                },
            },
            controls: {
                backgroundColor: foundationToken.colors.gray[0],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.border.radius[8],
                boxShadow: foundationToken.shadows.md,
                padding: foundationToken.unit[8],
                gap: foundationToken.unit[4],
                offset: foundationToken.unit[16],
                button: {
                    color: foundationToken.colors.gray[600],
                    hover: {
                        backgroundColor: foundationToken.colors.gray[100],
                    },
                },
            },
            minimap: {
                backgroundColor: foundationToken.colors.gray[0],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.border.radius[4],
                maskColor: foundationToken.colors.gray[100],
                nodeColor: foundationToken.colors.primary[300],
                nodeStrokeColor: foundationToken.colors.primary[500],
                nodeBorderRadius: foundationToken.border.radius[2],
            },
        },
        lg: {
            canvas: {
                backgroundColor: foundationToken.colors.gray[0],
                dotColor: foundationToken.colors.gray[300],
                dotGap: foundationToken.unit[20],
                dotSize: 2,
            },
            node: {
                default: {
                    backgroundColor: foundationToken.colors.gray[0],
                    border: `1px solid ${foundationToken.colors.gray[200]}`,
                    borderRadius: foundationToken.border.radius[8],
                    color: foundationToken.colors.gray[700],
                    padding: `${foundationToken.unit[16]} ${foundationToken.unit[20]}`,
                    boxShadow: foundationToken.shadows.sm,
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    minWidth: '160px',
                    minHeight: '48px',
                },
                hover: {
                    backgroundColor: foundationToken.colors.gray[25],
                    border: `1px solid ${foundationToken.colors.gray[300]}`,
                    boxShadow: foundationToken.shadows.md,
                },
                selected: {
                    backgroundColor: foundationToken.colors.gray[0],
                    border: `2px solid ${foundationToken.colors.primary[500]}`,
                    boxShadow: foundationToken.shadows.lg,
                },
                content: {
                    gap: foundationToken.unit[12],
                    padding: foundationToken.unit[16],
                },
                icon: {
                    paddingSm: foundationToken.unit[8],
                    paddingMd: foundationToken.unit[10],
                    borderRadiusSm: foundationToken.border.radius[8],
                    borderRadiusMd: foundationToken.border.radius[12],
                    size: {
                        small: 16,
                        medium: 20,
                        large: 24,
                    },
                },
            },
            handle: {
                backgroundColor: foundationToken.colors.gray[0],
                border: `2px solid ${foundationToken.colors.gray[400]}`,
                width: '10px',
                height: '10px',
                hover: {
                    backgroundColor: foundationToken.colors.primary[500],
                    border: `2px solid ${foundationToken.colors.primary[600]}`,
                },
            },
            edge: {
                stroke: foundationToken.colors.gray[300],
                strokeWidth: '2px',
                selected: {
                    stroke: foundationToken.colors.primary[500],
                    strokeWidth: '2.5px',
                },
                animated: {
                    stroke: foundationToken.colors.primary[400],
                },
            },
            controls: {
                backgroundColor: foundationToken.colors.gray[0],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.border.radius[8],
                boxShadow: foundationToken.shadows.md,
                padding: foundationToken.unit[8],
                gap: foundationToken.unit[4],
                offset: foundationToken.unit[16],
                button: {
                    color: foundationToken.colors.gray[600],
                    hover: {
                        backgroundColor: foundationToken.colors.gray[100],
                    },
                },
            },
            minimap: {
                backgroundColor: foundationToken.colors.gray[0],
                border: `1px solid ${foundationToken.colors.gray[200]}`,
                borderRadius: foundationToken.border.radius[4],
                maskColor: foundationToken.colors.gray[100],
                nodeColor: foundationToken.colors.primary[300],
                nodeStrokeColor: foundationToken.colors.primary[500],
                nodeBorderRadius: foundationToken.border.radius[2],
            },
        },
    }
}
