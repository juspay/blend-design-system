/**
 * Generates the docs site's message catalog page from the real catalog.
 *
 * The page is a file snapshot, so it cannot drift from the code: when a key is
 * added, removed or reworded, this test fails until the page is regenerated
 * with `pnpm vitest run __tests__/i18n/catalogDocs.test.ts -u`.
 *
 * "Used by" comes from scanning component sources for the literal keys (and
 * template-literal key prefixes) they resolve, the same way a reader would
 * grep for them.
 */
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { format, resolveConfig } from 'prettier'
import { BLEND_MESSAGES } from '../../lib/i18n/catalog'

const PAGE = path.resolve(
    __dirname,
    '../../../../apps/ascent/app/docs/content/internationalization/message-catalog.mdx'
)
const COMPONENTS = path.resolve(__dirname, '../../lib/components')

/** Directories that hold several separately documented components. */
const UMBRELLA_DIRS = new Set(['Inputs', 'InputsV2', 'ButtonV2', 'SelectorV2'])
/** Not part of the package's public exports, so not named on the page. */
const NOT_EXPORTED = new Set([
    'Select',
    'TextInputGroup',
    'MultiSelectGroup',
    'SingleSelectGroup',
])
const SKIP_DIRS = new Set(['shared', 'common', 'Primitives', 'animations'])

const baseKey = (key: string) => key.replace(/\.(one|other)$/, '')

const sourceFiles = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            return entry.name === 'accessibility' ? [] : sourceFiles(full)
        }
        return /\.tsx?$/.test(entry.name) ? [full] : []
    })

const componentUnits = (): Array<[string, string[]]> =>
    fs
        .readdirSync(COMPONENTS, { withFileTypes: true })
        .filter((d) => d.isDirectory() && !SKIP_DIRS.has(d.name))
        .flatMap((d): Array<[string, string[]]> => {
            const dir = path.join(COMPONENTS, d.name)
            if (!UMBRELLA_DIRS.has(d.name)) return [[d.name, sourceFiles(dir)]]
            const entries = fs.readdirSync(dir, { withFileTypes: true })
            // Files directly in an umbrella dir belong to the component it is
            // named after (ButtonV2/ButtonV2.tsx); subdirectories are their own.
            const ownFiles = entries
                .filter((e) => e.isFile() && /\.tsx?$/.test(e.name))
                .map((e) => path.join(dir, e.name))
            return [
                [d.name, ownFiles] as [string, string[]],
                ...entries
                    .filter((s) => s.isDirectory())
                    .map((s): [string, string[]] => [
                        s.name,
                        sourceFiles(path.join(dir, s.name)),
                    ]),
            ]
        })

/** prefix → sorted component names that resolve at least one of its keys. */
const usedBy = (): Map<string, string[]> => {
    const bases = [...new Set(Object.keys(BLEND_MESSAGES).map(baseKey))]
    const users = new Map<string, Set<string>>()
    for (const [name, files] of componentUnits()) {
        if (NOT_EXPORTED.has(name)) continue
        const used = new Set<string>()
        for (const file of files) {
            const src = fs.readFileSync(file, 'utf8')
            for (const [, lit] of src.matchAll(
                /['"]([a-z0-9-]+\.[a-z0-9-]+\.[a-z0-9.-]+)['"]/g
            )) {
                if (bases.includes(baseKey(lit))) used.add(baseKey(lit))
            }
            for (const [, prefix] of src.matchAll(
                /`([a-z0-9-]+\.[a-z0-9-]+\.[a-z0-9-]*)\$\{/g
            )) {
                bases
                    .filter((b) => b.startsWith(prefix))
                    .forEach((b) => used.add(b))
            }
        }
        for (const key of used) {
            const prefix = key.split('.')[0]
            if (!users.has(prefix)) users.set(prefix, new Set())
            users.get(prefix)!.add(name)
        }
    }
    return new Map(
        [...users].map(([prefix, names]) => [prefix, [...names].sort()])
    )
}

/** An inline code span that survives MDX and a GFM table cell. */
const code = (text: string) => {
    const escaped = text.replace(/\|/g, '\\|')
    return escaped.includes('`') ? `\`\` ${escaped} \`\`` : `\`${escaped}\``
}

const placeholders = (value: string) =>
    [...new Set([...value.matchAll(/\{(\w+)\}/g)].map((m) => m[1]))]
        .map((name) => code(`{${name}}`))
        .join(', ') || '—'

const renderPage = (): string => {
    const byPrefix = new Map<string, Array<[string, string]>>()
    for (const [key, value] of Object.entries(BLEND_MESSAGES)) {
        const prefix = key.split('.')[0]
        if (!byPrefix.has(prefix)) byPrefix.set(prefix, [])
        byPrefix.get(prefix)!.push([key, value])
    }
    const users = usedBy()
    const prefixes = [...byPrefix.keys()].sort()

    const sections = prefixes.map((prefix) => {
        const rows = byPrefix
            .get(prefix)!
            .sort(([a], [b]) => a.localeCompare(b))
            .map(
                ([key, value]) =>
                    `| ${code(key)} | ${code(value)} | ${placeholders(value)} |`
            )
        const names = users.get(prefix) ?? []
        const usedLine = names.length
            ? `Used by ${names.join(', ')}.`
            : 'Used by shared helpers rather than one component.'
        return [
            `## ${prefix}.*`,
            '',
            usedLine,
            '',
            '| Key | English default | Placeholders |',
            '| --- | --- | --- |',
            ...rows,
        ].join('\n')
    })

    return [
        '---',
        'title: Message catalog',
        'description: Every key Blend resolves through the translate function, with its English default and placeholders.',
        'category: documentation',
        'tags:',
        '    - i18n',
        '    - localization',
        '    - translation',
        '---',
        '',
        '{/* Generated by packages/blend/__tests__/i18n/catalogDocs.test.ts. Do not edit by hand: run `pnpm vitest run __tests__/i18n/catalogDocs.test.ts -u` in packages/blend. */}',
        '',
        '# Message catalog',
        '',
        `Every string Blend renders through your \`t\` function: ${Object.keys(BLEND_MESSAGES).length} keys under ${prefixes.length} prefixes, with the English default Blend falls back to. Setup and precedence are covered in [Internationalization](/docs/internationalization/overview).`,
        '',
        'Placeholders in a value are filled by Blend, so keep them in your translation: `{name}` must stay `{name}`, though you can move it. Keys ending in `.one` and `.other` are plural forms; add the categories your language needs (`.few`, `.many`, …) beside them.',
        '',
        'A prefix shared by several components is translated once for all of them: `select.*` covers every select, `input.*` every input. `common.*` holds strings several families share, such as Cancel and Apply.',
        '',
        ...sections.flatMap((s) => [s, '']),
    ].join('\n')
}

describe('message catalog docs page', () => {
    it('matches the catalog', async () => {
        const raw = renderPage()
        const config = (await resolveConfig(PAGE)) ?? {}
        const page = await format(raw, { ...config, filepath: PAGE })
        await expect(page).toMatchFileSnapshot(PAGE)
    })
})
