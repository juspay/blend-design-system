#!/usr/bin/env node
/**
 * Changelog Sync Script
 * Fetches releases from juspay/blend-design-system and generates MDX files.
 */

// ============ CONFIGURATION ============
const CONFIG = {
    owner: 'juspay',
    repo: 'blend-design-system',
    outputDir: 'apps/ascent/app/changelog/content',
    groqModel: 'llama-3.3-70b-versatile',
    groqApiUrl: 'https://api.groq.com/openai/v1/chat/completions',
}

// Emoji to type mapping
const EMOJI_TYPE_MAP = {
    '🚀': { type: 'feat', summary: 'Features' },
    '🐛': { type: 'fix', summary: 'Bug Fixes' },
    '♻️': { type: 'refactor', summary: 'Refactoring' },
    '🔧': { type: 'chore', summary: 'Chores' },
    '📚': { type: 'docs', summary: 'Documentation' },
    '💥': { type: 'breaking', summary: 'Breaking Changes' },
    '⚡': { type: 'perf', summary: 'Performance' },
}

// Noise patterns to skip
const NOISE_PATTERNS = [
    /^dev to staging/i,
    /^release:/i,
    /^\*\*release\*\*:/i,
    /^chore\(release\)/i,
    /\[BETA/i,
    /^Update blend landing/i,
    /^launch video/i,
    /^added firebase/i,
    /^build fixes which came while deployment/i,
    /^updated the docs for new landing/i,
    /^Feat\/workflow/i,
    /^chore\/workflow/i,
    /^workflow/i,
]

// ============ UTILITIES ============

/**
 * Log with emoji prefixes
 */
function log(level, message) {
    const prefixes = {
        info: '📡',
        success: '✓',
        error: '❌',
        warning: '⚠️',
        skip: '⏭',
        processing: '🔄',
        robot: '🤖',
        done: '✅',
        dash: '  ',
    }
    console.log(`${prefixes[level] || ''} ${message}`)
}

/**
 * Check if text matches any noise pattern
 */
function isNoise(text) {
    return NOISE_PATTERNS.some((pattern) => pattern.test(text))
}

/**
 * Clean up commit message text
 */
function cleanMessage(text) {
    return text
        .replace(/\s*\(#\d+\)\s*$/, '') // Remove PR reference at end
        .replace(/^[-*•]\s*/, '') // Remove list marker
        .trim()
}

/**
 * Capitalize first letter
 */
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

// ============ PARSING ============

/**
 * Parse CHANGELOG.md content into structured entries
 */
function parseChangelog(content) {
    const lines = content.split('\n')
    const entries = []
    let currentSection = null

    for (const line of lines) {
        const trimmed = line.trim()

        // Check for section headers (## 🚀 Features, etc.)
        const sectionMatch = trimmed.match(/^##\s+(\S+)\s+(.+)$/)
        if (sectionMatch) {
            const emoji = sectionMatch[1]
            const sectionName = sectionMatch[2]
            const mapping = EMOJI_TYPE_MAP[emoji]
            if (mapping) {
                currentSection = {
                    type: mapping.type,
                    summary: mapping.summary,
                }
            }
            continue
        }

        // Parse list items
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            // Extract commit link
            const linkMatch = trimmed.match(/\[([a-f0-9]{7})\]\(([^)]+)\)/)
            const commitHash = linkMatch ? linkMatch[1] : null
            let commitUrl = linkMatch ? linkMatch[2] : null

            // Normalize relative URLs to absolute
            if (commitUrl && !commitUrl.startsWith('http')) {
                commitUrl = `https://github.com/juspay/blend-design-system/commit/${commitHash}`
            }

            // Extract PR ID before removing it
            const prMatch = trimmed.match(/\(#(\d+)\)/)
            const prId = prMatch ? prMatch[1] : null

            // Remove commit link [abc1234](url)
            let message = trimmed
                .replace(/\s*\[([a-f0-9]{7})\]\([^)]+\)\s*/g, '') // Remove ALL commit links
                .replace(/^[-*]\s*/, '') // Remove list marker
                .replace(/\s*\(#\d+\)\s*/g, '') // Remove ALL PR references (#123)
                .replace(/\(\s*\)/g, '') // Remove empty parentheses ()
                .trim()

            // Skip noise
            if (isNoise(message)) {
                continue
            }

            if (message && currentSection) {
                entries.push({
                    type: currentSection.type,
                    summary: currentSection.summary,
                    message: capitalize(cleanMessage(message)),
                    commitHash,
                    commitUrl,
                })
            }
        }
    }

    return entries
}

// ============ GROQ API ============

/**
 * Extract component names using Groq API (batched)
 */
async function extractComponentNames(entries, apiKey) {
    if (!apiKey) {
        throw new Error('GROQ_API_KEY environment variable is required')
    }

    // Prepare batch request
    const messages = entries
        .map((entry, idx) => `${idx + 1}. ${entry.message}`)
        .join('\n')

    // STRICT prompt - emphasize exact format requirement
    const prompt = `You must respond with ONLY a numbered list, nothing else. No explanations, no notes, no extra text before or after the list.

For each commit message below, extract the component name being changed. Write the component name (e.g., DataTable, Sidebar, Charts, Button) or write "null" if no specific component is mentioned.

Example response format:
1. DataTable
2. null
3. Sidebar
4. Button

Commit messages:
${messages}`

    try {
        const response = await fetch(CONFIG.groqApiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: CONFIG.groqModel,
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a precise extraction tool for a React design system called Blend. Return ONLY numbered lists with no extra text, explanations, or formatting.The design system has these exact components (use these exact PascalCase names): Button, ButtonGroup, Breadcrumb, Alert, Accordion, Tabs, DataTable, Avatar,AvatarGroup, Badge, SplitTag, Tag, Card, Charts, ChatInput, Checkbox, CodeBlock,DateRangePicker, Drawer, DropdownInput, KeyValuePair, Menu, Modal, MultiSelect,MultiValueInput, NumberInput, OTPInput, Popover, ProgressBar, Radio, SearchInput,Sidebar, SingleSelect, Slider, Snackbar, StatCard, Stepper, Switch, Textarea,TextInput, Tooltip, UnitInput, Upload, ColumnManager, Timeline Rules:- Always match to the closest component from the list above- Strip version suffixes: "Popover v2" → "Popover", "Radio-V2" → "Radio", "checkbox v2" → "Checkbox"- Handle branch-name format: "Refactor/popover-v2" → "Popover", "Refactor/key-value-pair" → "KeyValuePair"- Convert informal names: "key value pair" → "KeyValuePair", "chat input" → "ChatInput", "data table" → "DataTable"- Handle multi-component entries: "MultiSelect and SingleSelect" → "MultiSelect, SingleSelect"- If genuinely no component is mentioned return null',
                    },
                    { role: 'user', content: prompt },
                ],
                temperature: 0.0,
                max_tokens: 500,
            }),
        })

        if (!response.ok) {
            throw new Error(
                `Groq API error: ${response.status} ${await response.text()}`
            )
        }

        const data = await response.json()
        const content = data.choices?.[0]?.message?.content || ''

        // Parse numbered list response
        const results = []
        const lines = content.split('\n').filter((l) => l.trim())

        for (const line of lines) {
            // Match numbered response: "1. DataTable" or "1. null"
            // Skip lines that don't start with a number (extra text LLM might add)
            const match = line.match(/^\d+[.\)]\s*(.+)$/i)
            if (match) {
                const component = match[1].trim()
                results.push(
                    component.toLowerCase() === 'null' ? null : component
                )
            }
        }

        // VALIDATION: Check if we got the right number of results
        if (results.length !== entries.length) {
            log(
                'warning',
                `Groq returned ${results.length} results for ${entries.length} entries — using type-based grouping instead`
            )
            return entries.map((entry) => ({ ...entry, component: null }))
        }

        // Merge results back into entries
        return entries.map((entry, idx) => ({
            ...entry,
            component: results[idx],
        }))
    } catch (error) {
        log(
            'warning',
            `Groq API failed: ${error.message}. Proceeding without component extraction.`
        )
        return entries.map((entry) => ({ ...entry, component: null }))
    }
}

// ============ MDX GENERATION ============

/**
 * Group entries by component (with fallback to type)
 */
function groupEntries(entries) {
    const groups = new Map()

    // First, group by component
    const componentGroups = new Map()
    const typeGroups = new Map()

    for (const entry of entries) {
        if (entry.component) {
            const existing = componentGroups.get(entry.component) || []
            componentGroups.set(entry.component, [...existing, entry])
        } else {
            const key = entry.summary // Features, Bug Fixes, etc.
            const existing = typeGroups.get(key) || []
            typeGroups.set(key, [...existing, entry])
        }
    }

    // Add component groups first (sorted alphabetically)
    const sortedComponents = Array.from(componentGroups.entries()).sort(
        ([a], [b]) => a.localeCompare(b)
    )
    for (const [component, items] of sortedComponents) {
        groups.set(component, { type: 'component', items })
    }

    // Then add type groups in priority order
    const typeOrder = [
        'Features',
        'Bug Fixes',
        'Breaking Changes',
        'Refactoring',
        'Performance',
        'Documentation',
        'Chores',
    ]
    for (const typeName of typeOrder) {
        if (typeGroups.has(typeName)) {
            groups.set(typeName, {
                type: 'category',
                items: typeGroups.get(typeName),
            })
        }
    }

    return groups
}

/**
 * Generate MDX content
 */
function generateMDXContent(version, date, entries) {
    const groups = groupEntries(entries)

    let mdx = `---
version: '${version}'
date: '${date}'
status: 'stable'
---

`

    for (const [groupName, groupData] of groups) {
        const { items, type } = groupData

        // Collect all commit hashes and URLs for the card
        const commitHashes = items.map((e) => e.commitHash).filter(Boolean)

        // Build ChangelogCard props
        let cardProps = `summary="${groupName}"`
        if (commitHashes.length === 1) {
            cardProps += ` commitHash="${commitHashes[0]}"`
            if (items[0].commitUrl)
                cardProps += ` commitUrl="${items[0].commitUrl}"`
        } else if (commitHashes.length > 1) {
            cardProps += ` commitHash={[${commitHashes.map((h) => `"${h}"`).join(', ')}]}`
            const urls = items.map((e) => e.commitUrl).filter(Boolean)
            if (urls.length > 0)
                cardProps += ` commitUrl={[${urls.map((u) => `"${u}"`).join(', ')}]}`
        }

        mdx += `<ChangelogCard ${cardProps}>
`

        for (const entry of items) {
            // Build ChangelogEntry props
            let entryProps = `type="${entry.type}"`
            if (entry.commitHash)
                entryProps += ` commitHash="${entry.commitHash}"`
            if (entry.commitUrl) entryProps += ` commitUrl="${entry.commitUrl}"`

            // Format message with bold title
            const title = entry.message.split(' ')[0]
            const rest = entry.message.slice(title.length).trim()
            const formattedMessage = rest
                ? `**${title}** - ${rest}`
                : `**${entry.message}**`

            mdx += `<ChangelogEntry ${entryProps}>
    ${formattedMessage}
</ChangelogEntry>
`
        }

        mdx += `</ChangelogCard>

`
    }

    return mdx.trim() + '\n'
}

// ============ FILE OPERATIONS ============

import {
    writeFileSync,
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
} from 'fs'
import { join } from 'path'

/**
 * Ensure output directory exists
 */
function ensureOutputDir() {
    const dir = join(process.cwd(), CONFIG.outputDir)
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
    }
    return dir
}

/**
 * Check if MDX file already exists
 */
function fileExists(version) {
    const filepath = join(process.cwd(), CONFIG.outputDir, `${version}.mdx`)
    return existsSync(filepath)
}

/**
 * Write MDX file
 */
function writeMDXFile(version, content) {
    const filepath = join(process.cwd(), CONFIG.outputDir, `${version}.mdx`)
    writeFileSync(filepath, content, 'utf-8')
    return filepath
}

// ============ FETCHERS ============

/**
 * Fetch releases from GitHub API
 */
async function fetchReleases() {
    const url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/releases?per_page=100`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(
            `GitHub API error: ${response.status} ${await response.text()}`
        )
    }

    return response.json()
}

/**
 * Fetch archived changelog for a specific version
 */
async function fetchArchivedChangelog(version) {
    const url = `https://raw.githubusercontent.com/${CONFIG.owner}/${CONFIG.repo}/main/docs/changelogs/${version}.md`

    try {
        const response = await fetch(url)
        if (response.ok) {
            return { content: await response.text(), source: 'archive' }
        }
    } catch (e) {
        // Ignore fetch errors
    }

    return null
}

/**
 * Fetch CHANGELOG.md from main and verify version matches
 */
async function fetchChangelogFromMain(version) {
    const url = `https://raw.githubusercontent.com/juspay/blend-design-system/main/docs/CHANGELOG.md`
    try {
        const response = await fetch(url)
        if (!response.ok) return null
        const content = await response.text()
        if (content.trimStart().startsWith(`# Changelog for ${version}`)) {
            return { content, source: 'main' }
        }
        return null
    } catch (e) {
        return null
    }
}

/**
 * Fetch changelog from GitHub release body (for older releases)
 */
async function fetchChangelogFromReleaseBody(release) {
    const body = release.body || ''

    // Old releases had real content in body
    // New releases have boilerplate - detect and skip those
    if (
        !body ||
        body.includes('See the CHANGELOG') ||
        body.includes('This stable release is now published') ||
        body.length < 300
    ) {
        return null
    }

    return { content: body, source: 'release-body' }
}

/**
 * Fetch CHANGELOG.md from the specific git tag (last resort)
 */
async function fetchChangelogFromTag(version) {
    const url = `https://raw.githubusercontent.com/juspay/blend-design-system/${version}/docs/CHANGELOG.md`
    try {
        const response = await fetch(url)
        if (!response.ok) return null
        const content = await response.text()
        return { content, source: 'tag' }
    } catch (e) {
        return null
    }
}

// ============ MAIN ============

async function main() {
    const args = process.argv.slice(2)
    const isLatest = args.includes('--latest')
    const isForce = args.includes('--force')

    // Check for API key first
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
        log('error', 'GROQ_API_KEY is not set. Add it to your .env file.')
        process.exit(1)
    }

    log('info', 'Fetching releases from GitHub...')

    const releases = await fetchReleases()

    // Filter stable releases only
    const stableReleases = releases.filter(
        (r) =>
            !r.prerelease && !r.draft && !/beta|alpha|rc|pre/i.test(r.tag_name)
    )

    log(
        'info',
        `Found ${releases.length} total releases, ${stableReleases.length} stable.`
    )

    if (stableReleases.length === 0) {
        log('warning', 'No stable releases found.')
        process.exit(0)
    }

    // Determine which releases to process
    let releasesToProcess = stableReleases
    if (isLatest) {
        releasesToProcess = [stableReleases[0]] // Most recent
    }

    const outputDir = ensureOutputDir()
    let generatedCount = 0
    let skippedCount = 0

    for (const release of releasesToProcess) {
        const version = release.tag_name
        const date = release.published_at.split('T')[0]

        log('processing', `Processing ${version} (${date})...`)

        // Check if file exists (unless force mode)
        if (!isForce && fileExists(version)) {
            log(
                'skip',
                `Skipping ${version} — already exists (use --force to regenerate)`
            )
            skippedCount++
            continue
        }

        // Try to fetch changelog content
        // 1. Check for archived changelog (docs/changelogs/vX.X.X.md)
        let changelogData = await fetchArchivedChangelog(version)

        // 2. Fallback to CHANGELOG.md on main (only if version matches)
        if (!changelogData) {
            changelogData = await fetchChangelogFromMain(version)
        }

        // 3. Fallback to release body (for older releases with content in body)
        if (!changelogData) {
            changelogData = await fetchChangelogFromReleaseBody(release)
        }

        // 4. Last resort: Fetch from git tag
        if (!changelogData) {
            changelogData = await fetchChangelogFromTag(version)
        }

        if (!changelogData) {
            log('warning', `Could not find changelog for ${version}, skipping`)
            skippedCount++
            continue
        }

        log('success', `Found changelog (${changelogData.source})`)

        // Parse entries
        const entries = parseChangelog(changelogData.content)

        if (entries.length === 0) {
            log('warning', `No entries found in changelog for ${version}`)
            skippedCount++
            continue
        }

        // Count by type
        const typeCounts = {}
        let noiseSkipped = 0
        for (const entry of entries) {
            typeCounts[entry.type] = (typeCounts[entry.type] || 0) + 1
        }

        const typeSummary = Object.entries(typeCounts)
            .map(([t, c]) => `${c} ${t}`)
            .join(', ')

        log('success', `Parsed ${entries.length} entries (${typeSummary})`)

        // Extract component names via Groq
        log('robot', 'Extracting component names via Groq...')
        const entriesWithComponents = await extractComponentNames(
            entries,
            apiKey
        )

        // Count component extractions
        const componentCounts = new Map()
        let noComponentCount = 0
        for (const entry of entriesWithComponents) {
            if (entry.component) {
                componentCounts.set(
                    entry.component,
                    (componentCounts.get(entry.component) || 0) + 1
                )
            } else {
                noComponentCount++
            }
        }

        for (const [comp, count] of componentCounts) {
            log('dash', `${comp} (${count} entries)`)
        }
        if (noComponentCount > 0) {
            log(
                'dash',
                `No component (${noComponentCount} entries → grouped by type)`
            )
        }

        // Generate MDX
        const mdxContent = generateMDXContent(
            version,
            date,
            entriesWithComponents
        )
        const filepath = writeMDXFile(version, mdxContent)

        log('success', `Generated ${filepath.replace(process.cwd() + '/', '')}`)
        generatedCount++
    }

    log('done', `Done. ${generatedCount} generated, ${skippedCount} skipped.`)
}

main().catch((err) => {
    log('error', err.message)
    process.exit(1)
})
