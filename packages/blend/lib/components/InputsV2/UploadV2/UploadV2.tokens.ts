import { CSSObject } from 'styled-components'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { FoundationTokenType } from '../../../tokens/theme.token'
import { Theme } from '../../../context/theme.enum'
import { getUploadV2DarkTokens } from './UploadV2.dark.tokens'
import { getUploadV2LightTokens } from './UploadV2.light.tokens'
import { UploadState } from './UploadV2.types'

export type UploadV2TokensType = {
    gap: CSSObject['gap']
    topContainer: {
        label: {
            fontSize: {
                [key in InputSizeV2]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in InputSizeV2]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in InputSizeV2]: CSSObject['lineHeight']
            }
            color: {
                [key in InputStateV2]: CSSObject['color']
            }
        }
        subLabel: {
            fontSize: {
                [key in InputSizeV2]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in InputSizeV2]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in InputSizeV2]: CSSObject['lineHeight']
            }
            color: {
                [key in InputStateV2]: CSSObject['color']
            }
        }
        required: {
            color: CSSObject['color']
        }
        helpIcon: {
            width: {
                [key in InputSizeV2]: CSSObject['width']
            }
            color: {
                [key in InputStateV2]: CSSObject['color']
            }
        }
    }
    uploadContainer: {
        gap: CSSObject['gap']
        paddingTop: CSSObject['paddingTop']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        paddingRight: CSSObject['paddingRight']
        borderRadius: CSSObject['borderRadius']
        border: {
            [key in UploadState]: CSSObject['border']
        }
        backgroundColor: {
            [key in UploadState]: CSSObject['backgroundColor']
        }
        header: {
            gap: CSSObject['gap']
            title: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
            description: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
            errorText: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: CSSObject['color']
            }
        }
        fileTag: {
            maxWidth: CSSObject['maxWidth']
            gap: CSSObject['gap']
        }
    }
}

export type ResponsiveUploadV2Tokens = {
    [key in keyof BreakpointType]: UploadV2TokensType
}

export const getUploadV2Tokens = (
    foundationToken: FoundationTokenType,
    theme: Theme | string = Theme.LIGHT
): ResponsiveUploadV2Tokens => {
    if (theme === Theme.DARK || theme === 'dark') {
        return getUploadV2DarkTokens(foundationToken)
    }
    return getUploadV2LightTokens(foundationToken)
}
