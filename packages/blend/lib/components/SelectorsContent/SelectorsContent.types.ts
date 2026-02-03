import { SwitchV2Size, SwitchV2State } from '../SwitchV2/switchV2.types'

export type SelectorsSize = SwitchV2Size

export type SelectorsLabelTokensType = {
    content: {
        label: {
            fontSize: Record<SelectorsSize, string | number>
            fontWeight: Record<SelectorsSize, string | number>
            lineHeight: Record<SelectorsSize, string | number>
            color: Record<SwitchV2State, string>
        }
        required: {
            color: string
        }
    }
}

export type SelectorsSubLabelTokensType = {
    content: {
        subLabel: {
            fontSize: Record<SelectorsSize, string | number>
            fontWeight: Record<SelectorsSize, string | number>
            lineHeight: Record<SelectorsSize, string | number>
            color: Record<SwitchV2State, string>
        }
    }
}

export type SelectorsLabelProps = {
    id?: string
    uniqueId: string
    disabled: boolean
    error: boolean
    required: boolean
    size: SelectorsSize
    label: string
    tokens: SelectorsLabelTokensType
    maxLength?: number
}

export type SelectorsSubLabelProps = {
    id?: string
    subLabel: string
    size: SelectorsSize
    disabled: boolean
    error: boolean
    tokens: SelectorsSubLabelTokensType
    maxLength?: number
}
