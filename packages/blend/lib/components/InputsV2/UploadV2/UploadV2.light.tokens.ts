import { FoundationTokenType } from '../../../tokens/theme.token'
import { ResponsiveUploadV2Tokens } from './UploadV2.tokens'
import { UploadDragState, UploadState } from './UploadV2.types'

export const getUploadV2LightTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveUploadV2Tokens => {
    return {
        sm: {
            gap: foundationTokens.unit[8],
            topContainer: {
                label: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    color: {
                        default: foundationTokens.colors.gray[700],
                        hover: foundationTokens.colors.gray[700],
                        focus: foundationTokens.colors.gray[700],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                },
                subLabel: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[400],
                        md: foundationTokens.font.weight[400],
                        lg: foundationTokens.font.weight[400],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[300],
                        error: foundationTokens.colors.red[600],
                    },
                },
                helpIcon: {
                    width: {
                        sm: foundationTokens.unit[14],
                        md: foundationTokens.unit[14],
                        lg: foundationTokens.unit[14],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                },
                required: {
                    color: foundationTokens.colors.red[600],
                },
            },
            uploadContainer: {
                gap: foundationTokens.unit[20],
                paddingTop: foundationTokens.unit[20],
                paddingBottom: foundationTokens.unit[20],
                paddingLeft: foundationTokens.unit[40],
                paddingRight: foundationTokens.unit[40],
                borderRadius: foundationTokens.border.radius[12],
                border: {
                    [UploadState.IDLE]: `1px dashed ${foundationTokens.colors.gray[200]}`,
                    [UploadDragState.DRAG_ENTER]: `1px dashed ${foundationTokens.colors.primary[500]}`,
                    [UploadDragState.DRAG_LEAVE]: `1px dashed ${foundationTokens.colors.gray[200]}`,
                    [UploadDragState.DRAG_OVER]: `1px dashed ${foundationTokens.colors.primary[500]}`,
                    [UploadDragState.DROP]: `1px dashed ${foundationTokens.colors.gray[200]}`,
                    [UploadState.UPLOADING]: `1px dashed ${foundationTokens.colors.gray[200]}`,
                    [UploadState.SUCCESS]: `1px dashed ${foundationTokens.colors.green[500]}`,
                    [UploadState.ERROR]: `1px dashed ${foundationTokens.colors.red[500]}`,
                    [UploadState.DISABLED]: `1px dashed ${foundationTokens.colors.gray[200]}`,
                },
                backgroundColor: {
                    [UploadState.IDLE]: foundationTokens.colors.gray[0],
                    [UploadDragState.DRAG_ENTER]:
                        foundationTokens.colors.primary[50],
                    [UploadDragState.DRAG_LEAVE]:
                        foundationTokens.colors.gray[0],
                    [UploadDragState.DRAG_OVER]:
                        foundationTokens.colors.primary[50],
                    [UploadDragState.DROP]: foundationTokens.colors.gray[0],
                    [UploadState.UPLOADING]: foundationTokens.colors.gray[0],
                    [UploadState.SUCCESS]: foundationTokens.colors.gray[0],
                    [UploadState.ERROR]: foundationTokens.colors.gray[0],
                    [UploadState.DISABLED]: foundationTokens.colors.gray[0],
                },
                header: {
                    gap: foundationTokens.unit[4],
                    title: {
                        fontSize: foundationTokens.font.fontSize[16],
                        fontWeight: foundationTokens.font.weight[600],
                        color: foundationTokens.colors.gray[700],
                    },
                    description: {
                        fontSize: foundationTokens.font.fontSize[14],
                        fontWeight: foundationTokens.font.weight[400],
                        color: foundationTokens.colors.gray[400],
                    },
                    errorText: {
                        fontSize: foundationTokens.font.fontSize[14],
                        fontWeight: foundationTokens.font.weight[400],
                        color: foundationTokens.colors.red[600],
                    },
                },
                fileTag: {
                    maxWidth: foundationTokens.unit[200],
                    gap: foundationTokens.unit[4],
                },
            },
        },
        lg: {
            gap: foundationTokens.unit[8],
            topContainer: {
                label: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[500],
                        md: foundationTokens.font.weight[500],
                        lg: foundationTokens.font.weight[500],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[700],
                        hover: foundationTokens.colors.gray[700],
                        focus: foundationTokens.colors.gray[700],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                },
                subLabel: {
                    fontSize: {
                        sm: foundationTokens.font.fontSize[14],
                        md: foundationTokens.font.fontSize[14],
                        lg: foundationTokens.font.fontSize[14],
                    },
                    fontWeight: {
                        sm: foundationTokens.font.weight[400],
                        md: foundationTokens.font.weight[400],
                        lg: foundationTokens.font.weight[400],
                    },
                    lineHeight: {
                        sm: foundationTokens.font.lineHeight[20],
                        md: foundationTokens.font.lineHeight[20],
                        lg: foundationTokens.font.lineHeight[20],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[300],
                        error: foundationTokens.colors.red[600],
                    },
                },
                helpIcon: {
                    width: {
                        sm: foundationTokens.unit[14],
                        md: foundationTokens.unit[14],
                        lg: foundationTokens.unit[14],
                    },
                    color: {
                        default: foundationTokens.colors.gray[400],
                        hover: foundationTokens.colors.gray[400],
                        focus: foundationTokens.colors.gray[400],
                        disabled: foundationTokens.colors.gray[400],
                        error: foundationTokens.colors.red[600],
                    },
                },
                required: {
                    color: foundationTokens.colors.red[600],
                },
            },
            uploadContainer: {
                gap: foundationTokens.unit[20],
                paddingTop: foundationTokens.unit[20],
                paddingBottom: foundationTokens.unit[20],
                paddingLeft: foundationTokens.unit[40],
                paddingRight: foundationTokens.unit[40],
                borderRadius: foundationTokens.border.radius[12],
                border: {
                    [UploadState.IDLE]: `1px dashed ${foundationTokens.colors.gray[200]}`,
                    [UploadDragState.DRAG_ENTER]: `1px dashed ${foundationTokens.colors.primary[500]}`,
                    [UploadDragState.DRAG_LEAVE]: `1px dashed ${foundationTokens.colors.gray[200]}`,
                    [UploadDragState.DRAG_OVER]: `1px dashed ${foundationTokens.colors.primary[500]}`,
                    [UploadDragState.DROP]: `1px dashed ${foundationTokens.colors.gray[200]}`,
                    [UploadState.UPLOADING]: `1px dashed ${foundationTokens.colors.gray[200]}`,
                    [UploadState.SUCCESS]: `1px dashed ${foundationTokens.colors.green[500]}`,
                    [UploadState.ERROR]: `1px dashed ${foundationTokens.colors.red[500]}`,
                    [UploadState.DISABLED]: `1px dashed ${foundationTokens.colors.gray[200]}`,
                },
                backgroundColor: {
                    [UploadState.IDLE]: foundationTokens.colors.gray[0],
                    [UploadDragState.DRAG_ENTER]:
                        foundationTokens.colors.primary[50],
                    [UploadDragState.DRAG_LEAVE]:
                        foundationTokens.colors.gray[0],
                    [UploadDragState.DRAG_OVER]:
                        foundationTokens.colors.primary[50],
                    [UploadDragState.DROP]: foundationTokens.colors.gray[0],
                    [UploadState.UPLOADING]: foundationTokens.colors.gray[0],
                    [UploadState.SUCCESS]: foundationTokens.colors.gray[0],
                    [UploadState.ERROR]: foundationTokens.colors.gray[0],
                    [UploadState.DISABLED]: foundationTokens.colors.gray[0],
                },
                header: {
                    gap: foundationTokens.unit[4],
                    title: {
                        fontSize: foundationTokens.font.fontSize[16],
                        fontWeight: foundationTokens.font.weight[600],
                        color: foundationTokens.colors.gray[700],
                    },
                    description: {
                        fontSize: foundationTokens.font.fontSize[14],
                        fontWeight: foundationTokens.font.weight[400],
                        color: foundationTokens.colors.gray[400],
                    },
                    errorText: {
                        fontSize: foundationTokens.font.fontSize[14],
                        fontWeight: foundationTokens.font.weight[400],
                        color: foundationTokens.colors.red[600],
                    },
                },
                fileTag: {
                    maxWidth: foundationTokens.unit[200],
                    gap: foundationTokens.unit[4],
                },
            },
        },
    }
}
