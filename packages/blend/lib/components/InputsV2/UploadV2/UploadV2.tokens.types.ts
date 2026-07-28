import { CSSObject } from 'styled-components'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import { BreakpointType } from '../../../breakpoints/breakPoints'
import { UploadDragState, UploadState } from './UploadV2.types'

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
            [key in UploadState | UploadDragState]: CSSObject['border']
        }
        backgroundColor: {
            [key in UploadState | UploadDragState]: CSSObject['backgroundColor']
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
    bottomContainer: {
        hintText: {
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
        errorMessage: {
            fontSize: {
                [key in InputSizeV2]: CSSObject['fontSize']
            }
            fontWeight: {
                [key in InputSizeV2]: CSSObject['fontWeight']
            }
            lineHeight: {
                [key in InputSizeV2]: CSSObject['lineHeight']
            }
            color: CSSObject['color']
        }
    }
}

export type ResponsiveUploadV2Tokens = {
    [key in keyof BreakpointType]: UploadV2TokensType
}
