export function getSplitTagLabel(
    primaryText?: string,
    secondaryText?: string
): string {
    const parts = [primaryText, secondaryText].filter(Boolean)
    return parts.length > 0 ? parts.join(': ') : 'Split tag'
}
