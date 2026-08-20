/**
 * Generates dark-mode component token overrides for the Blend components whose
 * library tokens are light-only.
 *
 * Blend implements dark mode at the component-token layer: a `getXTokens`
 * factory dispatches to a light or dark leaf. 30 V1 factories never got a dark
 * leaf and are single-arity, so under `theme="dark"` they still return light
 * values. ThemeProvider deep-merges `componentTokens` on top of the resolved
 * defaults, so supplying dark values for exactly those slots fills the gap
 * without touching the library.
 *
 * The recolor mapping is ported from the library's own approach in
 * packages/blend/lib/components/DataTable/table.dark.tokens.ts, which derives
 * dark tokens from light by swapping foundation gray rungs.
 *
 * Run: pnpm --filter ascent gen:dark-tokens
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createJiti } from 'jiti'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const jiti = createJiti(__filename)

const LIB = '@juspay/blend-design-system/lib'

/**
 * Slots that `initComponentTokens.ts` resolves WITHOUT a theme argument.
 * `export: null` means the factory is the module's default export.
 */
const SLOTS = [
    [
        'SEARCH_INPUT',
        'components/Inputs/SearchInput/searchInput.tokens',
        'getSearchInputTokens',
    ],
    [
        'TEXT_AREA',
        'components/Inputs/TextArea/textarea.token',
        'getTextAreaTokens',
    ],
    ['RADIO', 'components/Radio/radio.token', 'getRadioTokens'],
    ['SWITCH', 'components/Switch/switch.token', 'getSwitchTokens'],
    [
        'TEXT_INPUT',
        'components/Inputs/TextInput/textInput.tokens',
        'getTextInputTokens',
    ],
    [
        'NUMBER_INPUT',
        'components/Inputs/NumberInput/numberInput.tokens',
        'getNumberInputTokens',
    ],
    ['ALERT', 'components/Alert/alert.tokens', 'getAlertTokens'],
    [
        'OTP_INPUT',
        'components/Inputs/OTPInput/otpInput.tokens',
        'getOTPInputTokens',
    ],
    ['TOOLTIP', 'components/Tooltip/tooltip.tokens', 'getTooltipTokens'],
    [
        'MULTI_VALUE_INPUT',
        'components/Inputs/MultiValueInput/multiValueInput.tokens',
        'getMultiValueInputTokens',
    ],
    ['CHECKBOX', 'components/Checkbox/checkbox.token', 'getCheckboxTokens'],
    ['TABS', 'components/Tabs/tabs.token', 'getTabsTokens'],
    ['BUTTON', 'components/Button/button.tokens', 'getButtonTokens'],
    [
        'KEYVALUEPAIR',
        'components/KeyValuePair/KeyValuePair.tokens',
        'getKeyValuePairTokens',
    ],
    [
        'BREADCRUMB',
        'components/Breadcrumb/breadcrumb.tokens',
        'getBreadcrumbTokens',
    ],
    ['POPOVER', 'components/Popover/popover.tokens', 'getPopoverTokens'],
    ['MENU', 'components/Menu/menu.tokens', 'getMenuTokens'],
    [
        'MULTI_SELECT',
        'components/MultiSelect/multiSelect.tokens',
        'getMultiSelectTokens',
    ],
    [
        'SINGLE_SELECT',
        'components/SingleSelect/singleSelect.tokens',
        'getSingleSelectTokens',
    ],
    ['ACCORDION', 'components/Accordion/accordion.tokens', 'getAccordionToken'],
    ['STAT_CARD', 'components/StatCard/statcard.tokens', 'getStatCardToken'],
    [
        'PROGRESS_BAR',
        'components/ProgressBar/progressbar.tokens',
        'getProgressBarTokens',
    ],
    ['DRAWER', 'components/Drawer/drawer.tokens', 'getDrawerComponentTokens'],
    ['CHARTS', 'components/Charts/chart.tokens', 'getChartTokens'],
    ['SNACKBAR', 'components/Snackbar/snackbar.tokens', 'getSnackbarTokens'],
    ['STEPPER', 'components/Stepper/stepper.tokens', 'getStepperTokens'],
    ['TOPBAR', 'components/Topbar/topbar.tokens', 'getTopbarTokens'],
    ['AVATAR', 'components/Avatar/avatar.tokens', 'getAvatarTokens'],
    ['SIDEBAR', 'components/Sidebar/sidebar.tokens', 'getSidebarTokens'],
    ['CHAT_INPUT', 'components/ChatInput/chatInput.tokens', null],
]

// Recolor helpers, ported from DataTable/table.dark.tokens.ts
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const recolor = (value, replacements, colorPattern) => {
    if (typeof value === 'string') {
        return value.replace(
            colorPattern,
            (color) =>
                replacements.find(([light]) => light === color)?.[1] ?? color
        )
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

/**
 * Dark values are derived by inverting each foundation colour scale.
 *
 * Gray is a full inversion (light surfaces become dark, dark text becomes
 * light). The library's own DataTable recolor covers only gray 0-900; gray 950
 * and 1000 are added here because several components (Breadcrumb, Menu) use
 * them for primary text, which would otherwise stay near-black on a dark page.
 *
 * Semantic families (primary/red/green/yellow/orange/purple) invert their tint
 * rungs so pastel backgrounds become deep ones, while the mid rungs stay near
 * the brand accent. These are MECHANICAL and want a design review -- correct
 * individual values in darkOverrides.manual.ts rather than editing this map.
 */
const GRAY_MAP = {
    0: 900,
    25: 800,
    50: 700,
    100: 600,
    150: 700,
    200: 700,
    300: 500,
    400: 400,
    500: 300,
    600: 200,
    700: 100,
    800: 50,
    900: 0,
    950: 25,
    1000: 0,
}

const SEMANTIC_MAP = {
    50: 950,
    100: 900,
    200: 800,
    300: 700,
    400: 400,
    500: 400,
    600: 500,
    700: 300,
    800: 200,
    900: 100,
    950: 50,
}

const SEMANTIC_FAMILIES = [
    'primary',
    'red',
    'green',
    'yellow',
    'orange',
    'purple',
]

const buildReplacements = (foundation) => {
    const pairs = []
    const addFamily = (family, map) => {
        const scale = foundation.colors[family]
        if (!scale) return
        for (const [from, to] of Object.entries(map)) {
            const light = scale[from]
            const dark = scale[to]
            if (typeof light === 'string' && typeof dark === 'string') {
                pairs.push([light, dark])
            }
        }
    }
    addFamily('gray', GRAY_MAP)
    SEMANTIC_FAMILIES.forEach((family) => addFamily(family, SEMANTIC_MAP))

    const replacements = pairs.filter(
        ([light, dark], index) =>
            light !== dark &&
            pairs.findIndex(([candidate]) => candidate === light) === index
    )
    const colorPattern = new RegExp(
        replacements
            .map(([light]) => escapeRegExp(light))
            .sort((a, b) => b.length - a.length)
            .join('|'),
        'g'
    )
    return { replacements, colorPattern }
}

/**
 * Keeps only the leaves that recoloring actually changed, so the committed
 * output is a reviewable diff rather than a full copy of every token tree.
 */
const pruneUnchanged = (dark, light) => {
    if (dark === light) return undefined
    if (
        dark === null ||
        typeof dark !== 'object' ||
        light === null ||
        typeof light !== 'object' ||
        Array.isArray(dark)
    ) {
        return JSON.stringify(dark) === JSON.stringify(light) ? undefined : dark
    }
    const out = {}
    for (const [key, darkChild] of Object.entries(dark)) {
        const pruned = pruneUnchanged(darkChild, light[key])
        if (pruned !== undefined) out[key] = pruned
    }
    return Object.keys(out).length ? out : undefined
}

const countLeaves = (node) => {
    if (node === null || typeof node !== 'object') return 1
    return Object.values(node).reduce((n, child) => n + countLeaves(child), 0)
}

async function main() {
    const themeMod = await jiti.import(`${LIB}/tokens/theme.token`)
    const FOUNDATION = themeMod.default ?? themeMod.FOUNDATION_THEME
    const { replacements, colorPattern } = buildReplacements(FOUNDATION)

    const overrides = {}
    const failures = []
    let totalLeaves = 0

    for (const [slot, modulePath, exportName] of SLOTS) {
        try {
            const mod = await jiti.import(`${LIB}/${modulePath}`)
            const factory = exportName ? mod[exportName] : mod.default
            if (typeof factory !== 'function') {
                failures.push(
                    `${slot}: ${exportName ?? 'default'} is not a function`
                )
                continue
            }
            const light = factory(FOUNDATION)
            const dark = recolor(light, replacements, colorPattern)
            const pruned = pruneUnchanged(dark, light)
            if (!pruned) {
                failures.push(`${slot}: recolor produced no changes`)
                continue
            }
            overrides[slot] = pruned
            const leaves = countLeaves(pruned)
            totalLeaves += leaves
            console.log(`  ${slot.padEnd(20)} ${leaves} value(s)`)
        } catch (error) {
            failures.push(`${slot}: ${error.message}`)
        }
    }

    const outPath = path.join(
        __dirname,
        '../lib/blend-theme/darkOverrides.generated.ts'
    )
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(
        outPath,
        `// GENERATED by scripts/gen-dark-tokens.mjs -- do not edit by hand.\n` +
            `// Regenerate with: pnpm --filter ascent gen:dark-tokens\n` +
            `//\n` +
            `// Dark values for the Blend slots whose library tokens are light-only.\n` +
            `// Derived from each slot's light tokens by inverting foundation colour scales,\n` +
            `// then pruned to only the values that changed. Hand-tuned corrections belong\n` +
            `// in darkOverrides.manual.ts, which is merged over this file.\n` +
            `import type { BlendTokenOverrides } from './types'\n\n` +
            `export const generatedDarkOverrides = ${JSON.stringify(overrides, null, 4)} as unknown as BlendTokenOverrides\n`
    )

    console.log(
        `\n${Object.keys(overrides).length}/${SLOTS.length} slots, ${totalLeaves} values`
    )
    console.log(`written: ${path.relative(process.cwd(), outPath)}`)
    if (failures.length) {
        console.log(
            `\n${failures.length} failure(s) -- hand-author these in darkOverrides.manual.ts:`
        )
        failures.forEach((f) => console.log(`  ${f}`))
    }
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
