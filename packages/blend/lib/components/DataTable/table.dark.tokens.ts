import type { FoundationTokenType } from '../../tokens/theme.token'
import { getTableLightTokens } from './table.light.tokens'

type ResponsiveTableTokens = ReturnType<typeof getTableLightTokens>

type ColorReplacement = readonly [string, string]

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const recolor = (
    value: unknown,
    replacements: readonly ColorReplacement[],
    colorPattern: RegExp
): unknown => {
    if (typeof value === 'string') {
        return value.replace(colorPattern, (color) => {
            return replacements.find(([light]) => light === color)?.[1] ?? color
        })
    }

    if (Array.isArray(value)) {
        return value.map((item) => recolor(item, replacements, colorPattern))
    }

    if (value !== null && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, child]) => [
                key,
                recolor(child, replacements, colorPattern),
            ])
        )
    }

    return value
}

export const getTableDarkTokens = (
    foundationToken: FoundationTokenType
): ResponsiveTableTokens => {
    const gray = foundationToken.colors.gray as Record<number, string>
    const primary = foundationToken.colors.primary as Record<number, string>
    const grayReplacements: ColorReplacement[] = [
        [gray[0], gray[900]],
        [gray[25], gray[800]],
        [gray[50], gray[700]],
        [gray[100], gray[600]],
        [gray[150], gray[700]],
        [gray[200], gray[700]],
        [gray[300], gray[500]],
        [gray[400], gray[400]],
        [gray[500], gray[300]],
        [gray[600], gray[200]],
        [gray[700], gray[100]],
        [gray[800], gray[50]],
        [gray[900], gray[0]],
        [primary[100], primary[800]],
        [primary[500], primary[400]],
    ]
    const replacements = grayReplacements.filter(
        ([light, dark], index) =>
            light !== dark &&
            grayReplacements.findIndex(([candidate]) => candidate === light) ===
                index
    )
    const colorPattern = new RegExp(
        replacements
            .map(([light]) => escapeRegExp(light))
            .sort((a, b) => b.length - a.length)
            .join('|'),
        'g'
    )

    return recolor(
        getTableLightTokens(foundationToken),
        replacements,
        colorPattern
    ) as ResponsiveTableTokens
}

export default getTableDarkTokens
