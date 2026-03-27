import { StatCardV2Change, StatCardV2ChangeType } from './statcardV2.types'

export const buildStatCardV2AriaLabel = (params: {
    title?: string
    value?: string
    subtitle?: string
    change?: StatCardV2Change
}) => {
    const { title, value, subtitle, change } = params

    const parts: string[] = []

    if (title) parts.push(title)
    if (value) parts.push(value)
    if (subtitle) parts.push(subtitle)

    if (change?.value) {
        const directionText =
            change.changeType === StatCardV2ChangeType.INCREASE
                ? 'increased'
                : 'decreased'

        const formattedChange = `${change.leftSymbol ?? ''}${change.value}${change.rightSymbol ?? ''}`

        parts.push(`${directionText} by ${formattedChange}`.trim())
    }

    return parts.join(', ')
}
