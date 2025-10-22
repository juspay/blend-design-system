import type { CSSObject } from 'styled-components'
import type { FoundationTokenType } from '../../tokens/theme.token'
import type { BreakpointType } from '../../breakpoints/breakPoints'
import { DiffLineType } from './types'

/**
 * CodeBlock Tokens following the pattern: [target].CSSProp.[variant].[state]
 *
 * Structure:
 * - target: container | header | gutter | code | syntax (defines what element the token applies to)
 * - CSSProp: backgroundColor | border | borderRadius | padding | color | fontSize | fontFamily | lineHeight
 * - variant: default | removed | added (for diff-specific styles)
 * - state: default | hover | active (for interactive elements)
 * Need to check for this — Rust, Haskel, resript, python
 * Size-independent properties: all properties are size-independent for CodeBlock
 */
export type CodeBlockTokenType = {
    backgroundColor: CSSObject['backgroundColor']
    border: CSSObject['border']
    borderRadius: CSSObject['borderRadius']
    boxShadow: CSSObject['boxShadow']
    // Header tokens
    header: {
        backgroundColor: CSSObject['backgroundColor']
        borderBottom: CSSObject['borderBottom']
        padding: CSSObject['padding']
        gap: CSSObject['gap']
        icon: {
            color: CSSObject['color']
            size: number
        }
        text: {
            fontFamily: CSSObject['fontFamily']
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: CSSObject['color']
        }
        button: {
            backgroundColor: {
                default: CSSObject['backgroundColor']
                hover: CSSObject['backgroundColor']
                active: CSSObject['backgroundColor']
            }
            color: {
                default: CSSObject['color']
                active: CSSObject['color']
            }
            size: CSSObject['width']
            borderRadius: CSSObject['borderRadius']
        }
    }
    // Content area tokens
    content: {
        padding: CSSObject['padding']
        backgroundColor: CSSObject['backgroundColor']
        overflow: CSSObject['overflow']
    }
    // Gutter (line numbers) tokens
    gutter: {
        width: CSSObject['width']
        padding: CSSObject['padding']
        color: CSSObject['color']
        textAlign: CSSObject['textAlign']
        backgroundColor: {
            [key in DiffLineType]: CSSObject['backgroundColor']
        }
        borderLeft: {
            [key in DiffLineType]: CSSObject['borderLeft']
        }
        borderColor: {
            [key in DiffLineType]: CSSObject['color']
        }
    }
    // Code tokens
    code: {
        fontFamily: CSSObject['fontFamily']
        fontSize: CSSObject['fontSize']
        lineHeight: CSSObject['lineHeight']
        paddingLeft: CSSObject['paddingLeft']
        paddingLeftWithIcon: CSSObject['paddingLeft']
    }
    // Line tokens
    line: {
        paddingRight: CSSObject['paddingRight']
        paddingLeft: CSSObject['paddingLeft']
        backgroundColor: {
            [key in DiffLineType]: CSSObject['backgroundColor']
        }
    }
    // Diff layout tokens
    diff: {
        borderColor: CSSObject['borderColor']
        oldBackground: CSSObject['backgroundColor']
        newBackground: CSSObject['backgroundColor']
        padding: CSSObject['padding']
        icon: {
            size: number
            paddingTop: CSSObject['paddingTop']
            removed: {
                color: CSSObject['color']
            }
            added: {
                color: CSSObject['color']
            }
        }
    }
    // Syntax highlighting tokens
    syntax: {
        keyword: CSSObject['color']
        function: CSSObject['color']
        string: CSSObject['color']
        number: CSSObject['color']
        operator: CSSObject['color']
        variable: CSSObject['color']
        comment: CSSObject['color']
        text: CSSObject['color']
    }
}

export type ResponsiveCodeBlockTokens = {
    [key in keyof BreakpointType]: CodeBlockTokenType
}

export const getCodeBlockTokens = (
    foundationToken: FoundationTokenType
): ResponsiveCodeBlockTokens => {
    return {
        sm: {
            backgroundColor: foundationToken.colors.gray[25],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[8],
            boxShadow: '0px 2px 3px 0px rgba(5, 5, 6, 0.05)',
            header: {
                backgroundColor: foundationToken.colors.gray[50],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                padding: '12px 16px',
                gap: foundationToken.unit[8],
                icon: {
                    color: foundationToken.colors.gray[400],
                    size: 16,
                },
                text: {
                    fontFamily: 'InterDisplay',
                    fontSize: '14px',
                    fontWeight: foundationToken.font.weight[500],
                    lineHeight: '18px',
                    color: foundationToken.colors.gray[900],
                },
                button: {
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[150],
                        active: foundationToken.colors.green[100],
                    },
                    color: {
                        default: foundationToken.colors.gray[400],
                        active: '#16a34a',
                    },
                    size: '24px',
                    borderRadius: foundationToken.border.radius[6],
                },
            },
            content: {
                padding: '12px 0',
                backgroundColor: foundationToken.colors.gray[25],
                overflow: 'auto',
            },
            gutter: {
                width: '40px',
                padding: '0 8px',
                color: foundationToken.colors.gray[400],
                textAlign: 'right',
                backgroundColor: {
                    [DiffLineType.UNCHANGED]: 'transparent',
                    [DiffLineType.REMOVED]: foundationToken.colors.red[200],
                    [DiffLineType.ADDED]: foundationToken.colors.green[200],
                },
                borderLeft: {
                    [DiffLineType.UNCHANGED]: 'none',
                    [DiffLineType.REMOVED]: `2px solid ${foundationToken.colors.red[600]}`,
                    [DiffLineType.ADDED]: `2px solid ${foundationToken.colors.green[600]}`,
                },
                borderColor: {
                    [DiffLineType.UNCHANGED]: 'transparent',
                    [DiffLineType.REMOVED]: foundationToken.colors.red[600],
                    [DiffLineType.ADDED]: foundationToken.colors.green[600],
                },
            },
            code: {
                fontFamily:
                    "'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                fontSize: '11px',
                lineHeight: '1.5',
                paddingLeft: '10px',
                paddingLeftWithIcon: '4px',
            },
            line: {
                paddingRight: '32px',
                paddingLeft: foundationToken.unit[12],
                backgroundColor: {
                    [DiffLineType.UNCHANGED]: 'transparent',
                    [DiffLineType.REMOVED]: foundationToken.colors.red[100],
                    [DiffLineType.ADDED]: foundationToken.colors.green[100],
                },
            },
            diff: {
                borderColor: foundationToken.colors.gray[200],
                oldBackground: foundationToken.colors.gray[25],
                newBackground: foundationToken.colors.gray[25],
                padding: '12px 0',
                icon: {
                    size: 10,
                    paddingTop: '1px',
                    removed: {
                        color: foundationToken.colors.red[600],
                    },
                    added: {
                        color: foundationToken.colors.green[600],
                    },
                },
            },
            syntax: {
                keyword: foundationToken.colors.purple[600],
                function: foundationToken.colors.primary[600],
                string: foundationToken.colors.green[500],
                number: foundationToken.colors.orange[500],
                operator: foundationToken.colors.gray[600],
                variable: foundationToken.colors.gray[800],
                comment: foundationToken.colors.gray[400],
                text: foundationToken.colors.gray[900],
            },
        },
        lg: {
            backgroundColor: foundationToken.colors.gray[25],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[8],
            boxShadow: '0px 2px 3px 0px rgba(5, 5, 6, 0.05)',
            header: {
                backgroundColor: foundationToken.colors.gray[50],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                padding: '16px 20px',
                gap: foundationToken.unit[12],
                icon: {
                    color: foundationToken.colors.gray[400],
                    size: 20,
                },
                text: {
                    fontFamily: 'InterDisplay',
                    fontSize: '16px',
                    fontWeight: foundationToken.font.weight[500],
                    lineHeight: '20px',
                    color: foundationToken.colors.gray[900],
                },
                button: {
                    backgroundColor: {
                        default: 'transparent',
                        hover: foundationToken.colors.gray[150],
                        active: foundationToken.colors.green[100],
                    },
                    color: {
                        default: foundationToken.colors.gray[400],
                        active: '#16a34a',
                    },
                    size: '28px',
                    borderRadius: foundationToken.border.radius[6],
                },
            },
            content: {
                padding: '16px 0',
                backgroundColor: foundationToken.colors.gray[25],
                overflow: 'auto',
            },
            gutter: {
                width: '44px',
                padding: '0 10px',
                color: foundationToken.colors.gray[400],
                textAlign: 'right',
                backgroundColor: {
                    [DiffLineType.UNCHANGED]: 'transparent',
                    [DiffLineType.REMOVED]: foundationToken.colors.red[200],
                    [DiffLineType.ADDED]: foundationToken.colors.green[200],
                },
                borderLeft: {
                    [DiffLineType.UNCHANGED]: 'none',
                    [DiffLineType.REMOVED]: `2px solid ${foundationToken.colors.red[600]}`,
                    [DiffLineType.ADDED]: `2px solid ${foundationToken.colors.green[600]}`,
                },
                borderColor: {
                    [DiffLineType.UNCHANGED]: 'transparent',
                    [DiffLineType.REMOVED]: foundationToken.colors.red[600],
                    [DiffLineType.ADDED]: foundationToken.colors.green[600],
                },
            },
            code: {
                fontFamily:
                    "'JetBrains Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
                fontSize: '12px',
                lineHeight: '1.6',
                paddingLeft: '12px',
                paddingLeftWithIcon: '4px',
            },
            line: {
                paddingRight: '40px',
                paddingLeft: foundationToken.unit[16],
                backgroundColor: {
                    [DiffLineType.UNCHANGED]: 'transparent',
                    [DiffLineType.REMOVED]: foundationToken.colors.red[100],
                    [DiffLineType.ADDED]: foundationToken.colors.green[100],
                },
            },
            diff: {
                borderColor: foundationToken.colors.gray[200],
                oldBackground: foundationToken.colors.gray[25],
                newBackground: foundationToken.colors.gray[25],
                padding: '16px 0',
                icon: {
                    size: 12,
                    paddingTop: '1px',
                    removed: {
                        color: foundationToken.colors.red[600],
                    },
                    added: {
                        color: foundationToken.colors.green[600],
                    },
                },
            },
            syntax: {
                keyword: foundationToken.colors.purple[600],
                function: foundationToken.colors.primary[600],
                string: foundationToken.colors.green[500],
                number: foundationToken.colors.orange[500],
                operator: foundationToken.colors.gray[600],
                variable: foundationToken.colors.gray[800],
                comment: foundationToken.colors.gray[400],
                text: foundationToken.colors.gray[900],
            },
        },
    }
}
