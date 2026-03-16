import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveCodeEditorV2Tokens } from './codeEditorV2.tokens'
import { DiffLineType, MonacoTheme } from './codeEditorV2.types'

export const lightCodeEditorV2Tokens = (
    foundationToken: FoundationTokenType
): ResponsiveCodeEditorV2Tokens => {
    return {
        sm: {
            backgroundColor: foundationToken.colors.gray[25],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[8],
            boxShadow: '0px 2px 3px 0px rgba(5, 5, 6, 0.05)',
            theme: MonacoTheme.LIGHT,
            header: {
                backgroundColor: foundationToken.colors.gray[50],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                padding: {
                    x: foundationToken.unit[12],
                    y: foundationToken.unit[10],
                },
                gap: foundationToken.unit[8],
                icon: {
                    width: 16,
                },
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
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
            theme: MonacoTheme.LIGHT,
            header: {
                backgroundColor: foundationToken.colors.gray[50],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                padding: {
                    x: foundationToken.unit[16],
                    y: foundationToken.unit[10],
                },
                gap: foundationToken.unit[12],
                icon: {
                    width: 20,
                },
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
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
