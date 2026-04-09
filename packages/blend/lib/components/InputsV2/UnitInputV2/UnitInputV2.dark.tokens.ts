import { FoundationTokenType } from '../../../tokens/theme.token'
import {
    type ResponsiveUnitInputV2Tokens,
    type UnitInputV2TokensType,
} from './UnitInputV2.token'

const darkFloatingLabelColors = (foundationTokens: FoundationTokenType) => ({
    placeholder: {
        color: {
            default: foundationTokens.colors.gray[100],
            hover: foundationTokens.colors.gray[100],
            focus: foundationTokens.colors.gray[100],
            disabled: foundationTokens.colors.gray[500],
            error: foundationTokens.colors.red[400],
        },
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
    },
    required: {
        color: foundationTokens.colors.red[400],
    },
})

const darkTopContainer = (foundationTokens: FoundationTokenType) => ({
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
            default: foundationTokens.colors.gray[100],
            hover: foundationTokens.colors.gray[100],
            focus: foundationTokens.colors.gray[100],
            disabled: foundationTokens.colors.gray[500],
            error: foundationTokens.colors.red[400],
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
            disabled: foundationTokens.colors.gray[600],
            error: foundationTokens.colors.red[400],
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
            hover: foundationTokens.colors.gray[300],
            focus: foundationTokens.colors.gray[300],
            disabled: foundationTokens.colors.gray[600],
            error: foundationTokens.colors.red[400],
        },
    },
    required: {
        color: foundationTokens.colors.red[400],
    },
})

const darkInputContainer = (
    foundationTokens: FoundationTokenType,
    paddingY: UnitInputV2TokensType['inputContainer']['padding']['y']
): UnitInputV2TokensType['inputContainer'] => ({
    placeholderColor: foundationTokens.colors.gray[500],
    lineHeight: foundationTokens.font.lineHeight[20],
    borderRadius: {
        sm: foundationTokens.unit[10],
        md: foundationTokens.unit[10],
        lg: foundationTokens.unit[10],
    },
    fontSize: {
        sm: foundationTokens.font.size.body.md.fontSize,
        md: foundationTokens.font.size.body.md.fontSize,
        lg: foundationTokens.font.size.body.md.fontSize,
    },
    fontWeight: {
        sm: foundationTokens.font.weight[500],
        md: foundationTokens.font.weight[500],
        lg: foundationTokens.font.weight[500],
    },
    color: {
        default: foundationTokens.colors.gray[100],
        hover: foundationTokens.colors.gray[100],
        focus: foundationTokens.colors.gray[100],
        error: foundationTokens.colors.red[400],
        disabled: foundationTokens.colors.gray[500],
    },
    padding: {
        x: {
            sm: foundationTokens.unit[10],
            md: foundationTokens.unit[12],
            lg: foundationTokens.unit[14],
        },
        y: paddingY,
    },
    border: {
        default: `1px solid ${foundationTokens.colors.gray[800]}`,
        hover: `1px solid ${foundationTokens.colors.gray[700]}`,
        focus: `1px solid ${foundationTokens.colors.primary[500]}`,
        error: `1px solid ${foundationTokens.colors.red[500]}`,
        disabled: `1px solid ${foundationTokens.colors.gray[800]}`,
    },
    backgroundColor: {
        default: foundationTokens.colors.gray[900],
        disabled: foundationTokens.colors.gray[800],
        hover: foundationTokens.colors.gray[900],
        focus: foundationTokens.colors.gray[900],
        error: foundationTokens.colors.gray[900],
    },
    boxShadow: foundationTokens.shadows.sm,
    unit: {
        fontSize: {
            sm: foundationTokens.font.size.body.md.fontSize,
            md: foundationTokens.font.size.body.md.fontSize,
            lg: foundationTokens.font.size.body.md.fontSize,
        },
        fontWeight: {
            sm: foundationTokens.font.weight[500],
            md: foundationTokens.font.weight[500],
            lg: foundationTokens.font.weight[500],
        },
        color: {
            default: foundationTokens.colors.gray[400],
            hover: foundationTokens.colors.gray[400],
            focus: foundationTokens.colors.gray[400],
            error: foundationTokens.colors.gray[400],
            disabled: foundationTokens.colors.gray[600],
        },
        padding: {
            sm: foundationTokens.unit[10],
            md: foundationTokens.unit[12],
            lg: foundationTokens.unit[14],
        },
        backgroundColor: {
            default: foundationTokens.colors.gray[800],
            disabled: foundationTokens.colors.gray[800],
            hover: foundationTokens.colors.gray[900],
            focus: foundationTokens.colors.gray[900],
            error: foundationTokens.colors.gray[900],
        },
    },
})

const darkBottomContainer = (foundationTokens: FoundationTokenType) => ({
    hintText: {
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
            default: foundationTokens.colors.gray[500],
            hover: foundationTokens.colors.gray[500],
            focus: foundationTokens.colors.gray[500],
            disabled: foundationTokens.colors.gray[600],
            error: foundationTokens.colors.red[400],
        },
    },
    errorMessage: {
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
        color: foundationTokens.colors.red[400],
    },
})

export const getUnitInputV2DarkTokens = (
    foundationTokens: FoundationTokenType
): ResponsiveUnitInputV2Tokens => {
    return {
        sm: {
            gap: foundationTokens.unit[8],
            floatingLabels: darkFloatingLabelColors(foundationTokens),
            topContainer: darkTopContainer(foundationTokens),
            inputContainer: darkInputContainer(foundationTokens, {
                sm: foundationTokens.unit[6],
                md: foundationTokens.unit[8],
                lg: foundationTokens.unit[14],
            }),
            bottomContainer: darkBottomContainer(foundationTokens),
        },
        lg: {
            gap: foundationTokens.unit[8],
            floatingLabels: darkFloatingLabelColors(foundationTokens),
            topContainer: darkTopContainer(foundationTokens),
            inputContainer: darkInputContainer(foundationTokens, {
                sm: foundationTokens.unit[4],
                md: foundationTokens.unit[6],
                lg: foundationTokens.unit[8],
            }),
            bottomContainer: darkBottomContainer(foundationTokens),
        },
    }
}
