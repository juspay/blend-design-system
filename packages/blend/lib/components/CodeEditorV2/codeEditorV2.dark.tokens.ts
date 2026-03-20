import { FoundationTokenType } from '../../tokens/theme.token'
import { ResponsiveCodeEditorV2Tokens } from './codeEditorV2.tokens'
import { DiffLineType, MonacoTheme } from './codeEditorV2.types'

export const darkCodeEditorV2Tokens = (
    foundationToken: FoundationTokenType
): ResponsiveCodeEditorV2Tokens => {
    return {
        sm: {
            theme: MonacoTheme.DARK,
            backgroundColor: foundationToken.colors.gray[25],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[8],
            boxShadow: '0px 2px 3px 0px rgba(5, 5, 6, 0.05)',
            header: {
                backgroundColor: foundationToken.colors.gray[900],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                paddingTop: foundationToken.unit[10],
                paddingBottom: foundationToken.unit[10],
                paddingLeft: foundationToken.unit[12],
                paddingRight: foundationToken.unit[12],
                gap: foundationToken.unit[8],
                icon: {
                    width: 16,
                },
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    lineHeight: '18px',
                    color: foundationToken.colors.gray[0],
                },
            },
            body: {
                paddingTop: foundationToken.unit[12],
                paddingBottom: foundationToken.unit[12],
                paddingLeft: foundationToken.unit[0],
                paddingRight: foundationToken.unit[0],
                backgroundColor: foundationToken.colors.gray[900],

                gutter: {
                    width: '40px',
                    color: foundationToken.colors.gray[0],
                    backgroundColor: {
                        [DiffLineType.UNCHANGED]:
                            foundationToken.colors.gray[200],
                        [DiffLineType.REMOVED]: foundationToken.colors.red[500],
                        [DiffLineType.ADDED]: foundationToken.colors.green[500],
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
                    paddingTop: foundationToken.unit[4],
                    paddingBottom: foundationToken.unit[4],
                    paddingLeft: foundationToken.unit[12],
                    paddingRight: foundationToken.unit[32],
                },
                highlightedLine: {
                    backgroundColor: {
                        [DiffLineType.UNCHANGED]: 'transparent',
                        [DiffLineType.REMOVED]: foundationToken.colors.red[700],
                        [DiffLineType.ADDED]: foundationToken.colors.green[700],
                    },
                },
                syntax: {
                    keyword: { color: foundationToken.colors.purple[600] },
                    function: { color: foundationToken.colors.primary[600] },
                    string: { color: foundationToken.colors.green[100] },
                    number: { color: foundationToken.colors.orange[500] },
                    operator: { color: foundationToken.colors.gray[0] },
                    variable: { color: foundationToken.colors.gray[0] },
                    comment: { color: foundationToken.colors.gray[400] },
                    text: { color: foundationToken.colors.gray[0] },
                },
            },
        },
        lg: {
            theme: MonacoTheme.DARK,
            backgroundColor: foundationToken.colors.gray[25],
            border: `1px solid ${foundationToken.colors.gray[200]}`,
            borderRadius: foundationToken.border.radius[8],
            boxShadow: '0px 2px 3px 0px rgba(5, 5, 6, 0.05)',
            header: {
                backgroundColor: foundationToken.colors.gray[900],
                borderBottom: `1px solid ${foundationToken.colors.gray[200]}`,
                paddingTop: foundationToken.unit[10],
                paddingBottom: foundationToken.unit[10],
                paddingLeft: foundationToken.unit[16],
                paddingRight: foundationToken.unit[16],
                gap: foundationToken.unit[12],
                icon: {
                    width: 20,
                },
                text: {
                    fontSize: foundationToken.font.size.body.md.fontSize,
                    fontWeight: foundationToken.font.weight[500],
                    lineHeight: '20px',
                    color: foundationToken.colors.gray[0],
                },
            },
            body: {
                paddingTop: foundationToken.unit[16],
                paddingBottom: foundationToken.unit[16],
                paddingLeft: foundationToken.unit[0],
                paddingRight: foundationToken.unit[0],
                backgroundColor: foundationToken.colors.gray[900],

                gutter: {
                    width: '44px',
                    color: foundationToken.colors.gray[0],
                    backgroundColor: {
                        [DiffLineType.UNCHANGED]:
                            foundationToken.colors.gray[200],
                        [DiffLineType.REMOVED]: foundationToken.colors.red[500],
                        [DiffLineType.ADDED]: foundationToken.colors.green[500],
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
                    paddingTop: foundationToken.unit[4],
                    paddingBottom: foundationToken.unit[4],
                    paddingLeft: foundationToken.unit[12],
                    paddingRight: foundationToken.unit[32],
                },
                highlightedLine: {
                    backgroundColor: {
                        [DiffLineType.UNCHANGED]: 'transparent',
                        [DiffLineType.REMOVED]: foundationToken.colors.red[700],
                        [DiffLineType.ADDED]: foundationToken.colors.green[700],
                    },
                },
                syntax: {
                    keyword: { color: foundationToken.colors.purple[600] },
                    function: { color: foundationToken.colors.primary[600] },
                    string: { color: foundationToken.colors.green[100] },
                    number: { color: foundationToken.colors.orange[500] },
                    operator: { color: foundationToken.colors.gray[0] },
                    variable: { color: foundationToken.colors.gray[0] },
                    comment: { color: foundationToken.colors.gray[400] },
                    text: { color: foundationToken.colors.gray[0] },
                },
            },
        },
    }
}
