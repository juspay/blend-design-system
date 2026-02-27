import { SelectorV2Size } from '../SelectorV2/selectorV2.types'

import { SwitchV2State } from '../SelectorV2/SwitchV2/switchV2.types'
import { RadioV2Size } from '../SelectorV2/RadioV2/radioV2.types'

export type SelectorsSize = SelectorV2Size | RadioV2Size

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
    elementType?: string
}

export type SelectorsSubLabelProps = {
    id?: string
    subLabel: string
    size: SelectorsSize
    disabled: boolean
    error: boolean
    tokens: SelectorsSubLabelTokensType
    maxLength?: number
    elementType?: string
}
