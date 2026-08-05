import type { FoundationTokenType } from '../../tokens/theme.token'
import type {
    ResponsiveTimePickerTokens,
    TimePickerTokensType,
} from './timePicker.tokens.types'

/**
 * `optionHeight` is the only value that differs across breakpoints. The
 * options are the interactive targets of the dropdown and RFC 0003 requires
 * touch targets of at least 44x44px, so the touch breakpoint (`sm`) gets 44px
 * while the pointer breakpoint (`lg`) keeps the denser 32px row.
 */
const buildTimePickerLightTokens = (
    foundationToken: FoundationTokenType,
    optionHeight: string
): TimePickerTokensType => ({
    dropdown: {
        backgroundColor: foundationToken.colors.gray[0],
        border: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[200]}`,
        borderRadius: foundationToken.border.radius[8],
        boxShadow: foundationToken.shadows.sm,
        padding: foundationToken.unit[8],
        gap: foundationToken.unit[4],
        maxHeight: '240px',
        column: {
            width: foundationToken.unit[64],
            gap: foundationToken.unit[2],
            separator: `${foundationToken.border.width[1]} solid ${foundationToken.colors.gray[150]}`,
            header: {
                color: foundationToken.colors.gray[600],
                fontSize: foundationToken.font.size.body.sm.fontSize,
                fontWeight: foundationToken.font.weight[500],
                paddingY: foundationToken.unit[4],
            },
        },
        option: {
            height: optionHeight,
            paddingX: foundationToken.unit[8],
            borderRadius: foundationToken.border.radius[4],
            fontSize: {
                sm: foundationToken.font.size.body.sm.fontSize,
                md: foundationToken.font.size.body.md.fontSize,
                lg: foundationToken.font.size.body.md.fontSize,
            },
            fontWeight: foundationToken.font.weight[500],
            color: {
                default: foundationToken.colors.gray[700],
                selected: foundationToken.colors.gray[0],
                disabled: foundationToken.colors.gray[300],
            },
            backgroundColor: {
                default: 'transparent',
                hover: foundationToken.colors.gray[50],
                selected: foundationToken.colors.primary[500],
                disabled: 'transparent',
            },
            focusOutline: `${foundationToken.border.width[2]} solid ${foundationToken.colors.primary[500]}`,
        },
    },
    errorMessage: {
        color: foundationToken.colors.red[600],
        fontSize: foundationToken.font.size.body.sm.fontSize,
        fontWeight: foundationToken.font.weight[400],
        marginTop: foundationToken.unit[4],
    },
})

export const getTimePickerLightTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTimePickerTokens => ({
    sm: buildTimePickerLightTokens(
        foundationToken,
        foundationToken.unit[44] as string
    ),
    lg: buildTimePickerLightTokens(
        foundationToken,
        foundationToken.unit[32] as string
    ),
})
