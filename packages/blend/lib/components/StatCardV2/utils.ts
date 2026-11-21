import { StatCardV2Change, StatCardV2ChangeType } from './statcardV2.types'

/**
 * Localized label copy. Omitted, the English text below is used, so direct
 * callers are unchanged.
 */
export type StatCardV2LabelMessages = {
    increased: (change: string) => string
    decreased: (change: string) => string
    join: (parts: string[]) => string
}

const ENGLISH_STAT_CARD_V2_LABELS: StatCardV2LabelMessages = {
    increased: (change) => `increased by ${change}`,
    decreased: (change) => `decreased by ${change}`,
    join: (parts) => parts.join(', '),
}

export const buildStatCardV2AriaLabel = (params: {
    title?: string
    value?: string
    subtitle?: string
    change?: StatCardV2Change
    messages?: StatCardV2LabelMessages
}) => {
    const {
        title,
        value,
        subtitle,
        change,
        messages = ENGLISH_STAT_CARD_V2_LABELS,
    } = params

    const parts: string[] = []

    if (title) parts.push(title)
    if (value) parts.push(value)
    if (subtitle) parts.push(subtitle)

    if (change?.value) {
        const formattedChange = `${change.leftSymbol ?? ''}${change.value}${change.rightSymbol ?? ''}`

        parts.push(
            (change.changeType === StatCardV2ChangeType.INCREASE
                ? messages.increased(formattedChange)
                : messages.decreased(formattedChange)
            ).trim()
        )
    }

    return messages.join(parts)
}
