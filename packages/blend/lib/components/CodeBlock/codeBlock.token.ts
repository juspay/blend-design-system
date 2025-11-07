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
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        gap: CSSObject['gap']
        icon: {
            width: CSSObject['width']
        }
        text: {
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
            lineHeight: CSSObject['lineHeight']
            color: CSSObject['color']
        }
    }
    // Content area tokens
    body: {
        padding: {
            x: CSSObject['padding']
            y: CSSObject['padding']
        }
        backgroundColor: CSSObject['backgroundColor']

        // Gutter (line numbers) tokens
        gutter: {
            width: CSSObject['width']
            color: CSSObject['color']
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
            padding: {
                x: {
                    left: CSSObject['paddingLeft']
                    right: CSSObject['paddingRight']
                }
                y: CSSObject['padding']
            }
        }
        // Highlighted line tokens (for diff mode and code highlighting)
        highlightedLine: {
            backgroundColor: {
                [key in DiffLineType]: CSSObject['backgroundColor']
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
                padding: {
                    x: foundationToken.unit[12],
                    y: foundationToken.unit[12],
                },
                gap: foundationToken.unit[8],
                icon: {
                    width: 16,
                },
                text: {
                    fontSize: '14px',
                    fontWeight: foundationToken.font.weight[500],
                    lineHeight: '18px',
                    color: foundationToken.colors.gray[900],
                },
            },
            body: {
                padding: {
                    x: foundationToken.unit[0],
                    y: foundationToken.unit[12],
                },
                backgroundColor: foundationToken.colors.gray[25],

                gutter: {
                    width: '40px',
                    color: foundationToken.colors.gray[400],
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
                    fontFamily: "'JetBrains Mono'",
                    fontSize: '11px',
                    lineHeight: '1.5',
                    padding: {
                        x: {
                            left: foundationToken.unit[12],
                            right: foundationToken.unit[32],
                        },
                        y: foundationToken.unit[4],
                    },
                },
                highlightedLine: {
                    backgroundColor: {
                        [DiffLineType.UNCHANGED]: 'transparent',
                        [DiffLineType.REMOVED]: foundationToken.colors.red[100],
                        [DiffLineType.ADDED]: foundationToken.colors.green[100],
                    },
                },
                syntax: {
                    keyword: foundationToken.colors.purple[600],
                    function: foundationToken.colors.primary[600],
                    string: foundationToken.colors.green[600],
                    number: foundationToken.colors.orange[500],
                    operator: foundationToken.colors.gray[600],
                    variable: foundationToken.colors.gray[800],
                    comment: foundationToken.colors.gray[400],
                    text: foundationToken.colors.gray[900],
                },
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
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[12],
                },
                gap: foundationToken.unit[12],
                icon: {
                    width: 20,
                },
                text: {
                    fontSize: '16px',
                    fontWeight: foundationToken.font.weight[500],
                    lineHeight: '20px',
                    color: foundationToken.colors.gray[900],
                },
            },
            body: {
                padding: {
                    x: foundationToken.unit[0],
                    y: foundationToken.unit[16],
                },
                backgroundColor: foundationToken.colors.gray[25],

                gutter: {
                    width: '44px',
                    color: foundationToken.colors.gray[400],
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
                    fontFamily: "'JetBrains Mono'",
                    fontSize: '12px',
                    lineHeight: '1.6',
                    padding: {
                        x: {
                            left: foundationToken.unit[12],
                            right: foundationToken.unit[32],
                        },
                        y: foundationToken.unit[4],
                    },
                },
                highlightedLine: {
                    backgroundColor: {
                        [DiffLineType.UNCHANGED]: 'transparent',
                        [DiffLineType.REMOVED]: foundationToken.colors.red[100],
                        [DiffLineType.ADDED]: foundationToken.colors.green[100],
                    },
                },
                syntax: {
                    keyword: foundationToken.colors.purple[600],
                    function: foundationToken.colors.primary[600],
                    string: foundationToken.colors.green[600],
                    number: foundationToken.colors.orange[500],
                    operator: foundationToken.colors.gray[600],
                    variable: foundationToken.colors.gray[800],
                    comment: foundationToken.colors.gray[400],
                    text: foundationToken.colors.gray[900],
                },
            },
        },
    }
}
