import { StatCardV2ChangeType } from '@juspay/blend-design-system/node'
import type { StatCardChange } from './statcard.types'

/**
 * Build an accessibility label from the card's data, mirroring web's
 * `buildStatCardV2AriaLabel`. Joins title, value, subtitle, and a
 * "increased/decreased by X" phrase for the change.
 */
export const buildStatCardAriaLabel = (params: {
    title?: string
    value?: string
    subtitle?: string
    change?: StatCardChange
}) => {
    const { title, value, subtitle, change } = params

    const parts: string[] = []

    if (title) parts.push(title)
    if (value) parts.push(value)
    if (subtitle) parts.push(subtitle)

    if (change?.value) {
        const directionText =
            (change.changeType ?? StatCardV2ChangeType.INCREASE) ===
            StatCardV2ChangeType.INCREASE
                ? 'increased'
                : 'decreased'

        const formattedChange = `${change.leftSymbol ?? ''}${change.value}${change.rightSymbol ?? ''}`

        parts.push(`${directionText} by ${formattedChange}`.trim())
    }

    return parts.join(', ')
}
