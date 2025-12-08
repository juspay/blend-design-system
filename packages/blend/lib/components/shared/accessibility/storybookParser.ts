/**
 * Storybook Parser
 * Parses Storybook files to extract accessibility information
 */

export interface StorybookAccessibilityInfo {
    totalStories: number
    accessibilityStories: string[]
    a11yConfig: {
        rules: string[]
        enabled: boolean
    }
    wcagVersion?: string
    accessibilityNotes?: string
}

/**
 * Parse Storybook file to extract accessibility information
 */
export function parseStorybookFile(
    storybookFileContent: string
): StorybookAccessibilityInfo {
    const accessibilityStories: string[] = []
    const rules: string[] = []

    // Extract story names
    const storyMatches = storybookFileContent.matchAll(
        /export const (\w+): Story =/g
    )
    for (const match of storyMatches) {
        if (match[1]) {
            accessibilityStories.push(match[1])
        }
    }

    // Extract a11y rules
    const ruleMatches = storybookFileContent.matchAll(/id: ['"]([^'"]+)['"]/g)
    for (const match of ruleMatches) {
        if (match[1] && !rules.includes(match[1])) {
            rules.push(match[1])
        }
    }

    // Extract WCAG version mentions
    const wcagVersionMatch = storybookFileContent.match(/WCAG\s+(\d+\.\d+)/i)
    const wcagVersion = wcagVersionMatch ? wcagVersionMatch[1] : undefined

    // Extract accessibility notes
    const accessibilityNotesMatch = storybookFileContent.match(
        /## Accessibility[\s\S]*?```[\s\S]*?```/i
    )
    const accessibilityNotes = accessibilityNotesMatch
        ? accessibilityNotesMatch[0]
        : undefined

    return {
        totalStories: accessibilityStories.length,
        accessibilityStories,
        a11yConfig: {
            rules,
            enabled: rules.length > 0,
        },
        wcagVersion,
        accessibilityNotes,
    }
}

/**
 * Get Storybook accessibility summary
 */
export function getStorybookSummary(
    storybookInfo: StorybookAccessibilityInfo
): {
    summary: string
    details: string[]
} {
    const details: string[] = []

    details.push(`Total Stories: ${storybookInfo.totalStories}`)
    if (storybookInfo.wcagVersion) {
        details.push(`WCAG Version: ${storybookInfo.wcagVersion}`)
    }
    if (storybookInfo.a11yConfig.rules.length > 0) {
        details.push(
            `A11y Rules: ${storybookInfo.a11yConfig.rules.length} (${storybookInfo.a11yConfig.rules.join(', ')})`
        )
    }

    return {
        summary: `${storybookInfo.totalStories} stories with accessibility testing configured`,
        details,
    }
}
