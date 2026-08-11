import type { FoundationTokenType } from '../../tokens/theme.token'
import type { ResponsiveCodeBlockTokens } from './codeBlock.tokens.types'
import { DiffLineType } from './types'

export const getCodeBlockDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveCodeBlockTokens => {
    return {
        sm: {
            backgroundColor: foundationToken.colors.gray[900],
            border: `1px solid ${foundationToken.colors.gray[700]}`,
            borderRadius: foundationToken.border.radius[8],
            boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.35)',
            header: {
                backgroundColor: foundationToken.colors.gray[950],
                borderBottom: `1px solid ${foundationToken.colors.gray[700]}`,
                padding: {
                    x: foundationToken.unit[12],
                    y: foundationToken.unit[8],
                },
                gap: foundationToken.unit[6],
                icon: {
                    width: 16,
                },
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    lineHeight: '18px',
                    color: foundationToken.colors.gray[100],
                },
            },
            body: {
                padding: {
                    x: foundationToken.unit[0],
                    y: foundationToken.unit[12],
                },
                backgroundColor: foundationToken.colors.gray[900],

                gutter: {
                    width: '40px',
                    color: foundationToken.colors.gray[500],
                    backgroundColor: {
                        [DiffLineType.UNCHANGED]: 'transparent',
                        [DiffLineType.REMOVED]: foundationToken.colors.red[900],
                        [DiffLineType.ADDED]: foundationToken.colors.green[900],
                    },
                    borderLeft: {
                        [DiffLineType.UNCHANGED]: 'none',
                        [DiffLineType.REMOVED]: `2px solid ${foundationToken.colors.red[500]}`,
                        [DiffLineType.ADDED]: `2px solid ${foundationToken.colors.green[500]}`,
                    },
                    borderColor: {
                        [DiffLineType.UNCHANGED]: 'transparent',
                        [DiffLineType.REMOVED]: foundationToken.colors.red[500],
                        [DiffLineType.ADDED]: foundationToken.colors.green[500],
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
                        [DiffLineType.REMOVED]: foundationToken.colors.red[950],
                        [DiffLineType.ADDED]: foundationToken.colors.green[950],
                    },
                },
                syntax: {
                    keyword: foundationToken.colors.purple[400],
                    function: foundationToken.colors.primary[400],
                    string: foundationToken.colors.green[400],
                    number: foundationToken.colors.orange[400],
                    operator: foundationToken.colors.gray[400],
                    variable: foundationToken.colors.gray[200],
                    comment: foundationToken.colors.gray[500],
                    text: foundationToken.colors.gray[100],
                },
                expandContext: {
                    backgroundColor: foundationToken.colors.primary[950],
                    borderTop: `1px solid ${foundationToken.colors.primary[700]}`,
                    borderBottom: `1px solid ${foundationToken.colors.primary[700]}`,
                    padding: `${foundationToken.unit[2]} ${foundationToken.unit[6]}`,
                    color: foundationToken.colors.primary[300],
                    fontSize: '11px',
                    letterSpacing: '3px',
                    button: {
                        padding: `${foundationToken.unit[2]} ${foundationToken.unit[6]}`,
                        dotsPadding: `${foundationToken.unit[2]} ${foundationToken.unit[10]}`,
                        opacity: 1,
                        disabledOpacity: 0.35,
                        hoverBackgroundColor:
                            foundationToken.colors.primary[900],
                        borderRadius: foundationToken.border.radius[4],
                        iconSize: 12,
                    },
                },
            },
        },
        lg: {
            backgroundColor: foundationToken.colors.gray[900],
            border: `1px solid ${foundationToken.colors.gray[700]}`,
            borderRadius: foundationToken.border.radius[8],
            boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.35)',
            header: {
                backgroundColor: foundationToken.colors.gray[950],
                borderBottom: `1px solid ${foundationToken.colors.gray[700]}`,
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[8],
                },
                gap: foundationToken.unit[8],
                icon: {
                    width: 16,
                },
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    lineHeight: '20px',
                    color: foundationToken.colors.gray[100],
                },
            },
            body: {
                padding: {
                    x: foundationToken.unit[0],
                    y: foundationToken.unit[16],
                },
                backgroundColor: foundationToken.colors.gray[900],

                gutter: {
                    width: '44px',
                    color: foundationToken.colors.gray[500],
                    backgroundColor: {
                        [DiffLineType.UNCHANGED]: 'transparent',
                        [DiffLineType.REMOVED]: foundationToken.colors.red[900],
                        [DiffLineType.ADDED]: foundationToken.colors.green[900],
                    },
                    borderLeft: {
                        [DiffLineType.UNCHANGED]: 'none',
                        [DiffLineType.REMOVED]: `2px solid ${foundationToken.colors.red[500]}`,
                        [DiffLineType.ADDED]: `2px solid ${foundationToken.colors.green[500]}`,
                    },
                    borderColor: {
                        [DiffLineType.UNCHANGED]: 'transparent',
                        [DiffLineType.REMOVED]: foundationToken.colors.red[500],
                        [DiffLineType.ADDED]: foundationToken.colors.green[500],
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
                        [DiffLineType.REMOVED]: foundationToken.colors.red[950],
                        [DiffLineType.ADDED]: foundationToken.colors.green[950],
                    },
                },
                syntax: {
                    keyword: foundationToken.colors.purple[400],
                    function: foundationToken.colors.primary[400],
                    string: foundationToken.colors.green[400],
                    number: foundationToken.colors.orange[400],
                    operator: foundationToken.colors.gray[400],
                    variable: foundationToken.colors.gray[200],
                    comment: foundationToken.colors.gray[500],
                    text: foundationToken.colors.gray[100],
                },
                expandContext: {
                    backgroundColor: foundationToken.colors.primary[950],
                    borderTop: `1px solid ${foundationToken.colors.primary[700]}`,
                    borderBottom: `1px solid ${foundationToken.colors.primary[700]}`,
                    padding: `${foundationToken.unit[2]} ${foundationToken.unit[6]}`,
                    color: foundationToken.colors.primary[300],
                    fontSize: '11px',
                    letterSpacing: '3px',
                    button: {
                        padding: `${foundationToken.unit[2]} ${foundationToken.unit[6]}`,
                        dotsPadding: `${foundationToken.unit[2]} ${foundationToken.unit[10]}`,
                        opacity: 1,
                        disabledOpacity: 0.35,
                        hoverBackgroundColor:
                            foundationToken.colors.primary[900],
                        borderRadius: foundationToken.border.radius[4],
                        iconSize: 12,
                    },
                },
            },
        },
    }
}
