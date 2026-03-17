#!/usr/bin/env node
/**
 * test.js — MCP server test harness (dev-only, not shipped)
 * Run: node test.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { validateComponentUsage } from './validators.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let passed = 0
let failed = 0

function assert(condition, description, reason = '') {
    if (condition) {
        console.log(`✅ PASS: ${description}`)
        passed++
    } else {
        console.log(`❌ FAIL: ${description}${reason ? ` — ${reason}` : ''}`)
        failed++
    }
}

// ---------------------------------------------------------------------------
// Section 1: Manifest integrity
// ---------------------------------------------------------------------------
console.log('\n--- Section 1: Manifest integrity ---')

const manifestPath = path.join(__dirname, 'manifest.json')
let manifest = null

try {
    const raw = fs.readFileSync(manifestPath, 'utf-8')
    manifest = JSON.parse(raw)
    assert(true, 'manifest.json exists and is valid JSON')
} catch (err) {
    assert(false, 'manifest.json exists and is valid JSON', err.message)
    console.log('\n=== Results: 0 passed, 1 failed ===')
    console.log('Cannot continue without manifest.json')
    process.exit(1)
}

assert(
    manifest.version === '2.0.0',
    'manifest.version === "2.0.0"',
    `got "${manifest.version}"`
)

const componentKeys = Object.keys(manifest.components || {})
assert(
    componentKeys.length >= 47,
    `manifest has >= 47 components`,
    `got ${componentKeys.length}`
)

const tokenKeys = Object.keys(manifest.tokens || {})
const requiredTokenKeys = [
    'colors',
    'spacing',
    'borders',
    'shadows',
    'typography',
]
for (const key of requiredTokenKeys) {
    assert(
        tokenKeys.includes(key),
        `manifest.tokens has key "${key}"`,
        `found keys: ${tokenKeys.join(', ')}`
    )
}

let allComponentsValid = true
let invalidComponents = []
for (const [name, comp] of Object.entries(manifest.components || {})) {
    const valid =
        typeof comp.componentName === 'string' &&
        typeof comp.category === 'string' &&
        Array.isArray(comp.props) &&
        comp.enums !== null &&
        typeof comp.enums === 'object'
    if (!valid) {
        allComponentsValid = false
        invalidComponents.push(name)
    }
}
assert(
    allComponentsValid,
    'Every component has componentName, category, props (array), enums (object)',
    invalidComponents.length > 0
        ? `Invalid: ${invalidComponents.join(', ')}`
        : ''
)

const requiredComponents = [
    'Button',
    'Alert',
    'Modal',
    'Tabs',
    'Checkbox',
    'Switch',
    'Radio',
    'TextInput',
    'SingleSelect',
    'MultiSelect',
    'Accordion',
    'DataTable',
    'Avatar',
    'Breadcrumb',
    'Card',
    'Tags',
    'Tooltip',
    'Popover',
    'Drawer',
    'Snackbar',
]
for (const name of requiredComponents) {
    assert(
        name in (manifest.components || {}),
        `Component "${name}" exists in manifest`,
        `not found; available: ${componentKeys.slice(0, 5).join(', ')}...`
    )
}

// ---------------------------------------------------------------------------
// Section 2: Compound components
// ---------------------------------------------------------------------------
console.log('\n--- Section 2: Compound components ---')

const accordion = manifest.components['Accordion']
assert(
    accordion?.isCompound === true,
    'Accordion.isCompound === true',
    `got ${accordion?.isCompound}`
)
assert(
    Array.isArray(accordion?.subComponents) &&
        accordion.subComponents.includes('AccordionItem'),
    'Accordion.subComponents includes "AccordionItem"',
    `got ${JSON.stringify(accordion?.subComponents)}`
)

const radio = manifest.components['Radio']
assert(
    radio?.isCompound === true,
    'Radio.isCompound === true',
    `got ${radio?.isCompound}`
)
assert(
    Array.isArray(radio?.subComponents) &&
        radio.subComponents.includes('RadioGroup'),
    'Radio.subComponents includes "RadioGroup"',
    `got ${JSON.stringify(radio?.subComponents)}`
)

const sw = manifest.components['Switch']
assert(
    sw?.isCompound === true,
    'Switch.isCompound === true',
    `got ${sw?.isCompound}`
)
assert(
    Array.isArray(sw?.subComponents) &&
        sw.subComponents.includes('SwitchGroup'),
    'Switch.subComponents includes "SwitchGroup"',
    `got ${JSON.stringify(sw?.subComponents)}`
)

assert(
    'AccordionItem' in (manifest.components || {}),
    'AccordionItem exists as a top-level component in manifest'
)
assert(
    'RadioGroup' in (manifest.components || {}),
    'RadioGroup exists as a top-level component in manifest'
)
assert(
    'SwitchGroup' in (manifest.components || {}),
    'SwitchGroup exists as a top-level component in manifest'
)

// ---------------------------------------------------------------------------
// Section 3: Enum extraction
// ---------------------------------------------------------------------------
console.log('\n--- Section 3: Enum extraction ---')

const button = manifest.components['Button']
const buttonEnums = button?.enums || {}

assert(
    'ButtonType' in buttonEnums,
    'Button has enum ButtonType',
    `found enums: ${Object.keys(buttonEnums).join(', ')}`
)
assert(
    'ButtonSize' in buttonEnums,
    'Button has enum ButtonSize',
    `found enums: ${Object.keys(buttonEnums).join(', ')}`
)
assert(
    'ButtonSubType' in buttonEnums,
    'Button has enum ButtonSubType',
    `found enums: ${Object.keys(buttonEnums).join(', ')}`
)

const buttonTypeMembers = Object.keys(buttonEnums['ButtonType'] || {})
for (const member of ['PRIMARY', 'SECONDARY', 'DANGER', 'SUCCESS']) {
    assert(
        buttonTypeMembers.includes(member),
        `ButtonType has member "${member}"`,
        `found: ${buttonTypeMembers.join(', ')}`
    )
}

const alert = manifest.components['Alert']
const alertEnums = alert?.enums || {}
assert(
    'AlertVariant' in alertEnums,
    'Alert has enum AlertVariant',
    `found enums: ${Object.keys(alertEnums).join(', ')}`
)
assert(
    'AlertStyle' in alertEnums,
    'Alert has enum AlertStyle',
    `found enums: ${Object.keys(alertEnums).join(', ')}`
)

const tabs = manifest.components['Tabs']
const tabsEnums = tabs?.enums || {}
assert(
    'TabsVariant' in tabsEnums,
    'Tabs has enum TabsVariant',
    `found enums: ${Object.keys(tabsEnums).join(', ')}`
)
assert(
    'TabsSize' in tabsEnums,
    'Tabs has enum TabsSize',
    `found enums: ${Object.keys(tabsEnums).join(', ')}`
)

// ---------------------------------------------------------------------------
// Section 4: Meta-overrides applied
// ---------------------------------------------------------------------------
console.log('\n--- Section 4: Meta-overrides applied ---')

assert(
    typeof button?.componentDescription === 'string' &&
        button.componentDescription.length > 50,
    'Button.componentDescription contains meaningful text (>50 chars)',
    `got: "${button?.componentDescription?.slice(0, 60)}..."`
)

const buttonPropsWithContext = (button?.props || []).filter(
    (p) => typeof p.llmContext === 'string' && p.llmContext.length > 0
)
assert(
    buttonPropsWithContext.length >= 1,
    'Button props have at least one with a non-empty llmContext',
    `found ${buttonPropsWithContext.length} props with llmContext`
)

assert(
    accordion?.compositionPattern !== null &&
        accordion?.compositionPattern !== undefined &&
        typeof accordion?.compositionPattern === 'string' &&
        accordion.compositionPattern.length > 0,
    'Accordion.compositionPattern is a non-null, non-empty string',
    `got: ${JSON.stringify(accordion?.compositionPattern)}`
)

// ---------------------------------------------------------------------------
// Section 5: Validator logic
// ---------------------------------------------------------------------------
console.log('\n--- Section 5: Validator logic ---')

// Valid props → { valid: true }
const validResult = validateComponentUsage(manifest, 'Button', {
    text: 'Submit',
})
assert(
    validResult.valid === true,
    'validateComponentUsage: valid props → { valid: true }',
    `errors: ${validResult.errors.join('; ')}`
)

// Unknown prop → errors mention the unknown prop
const unknownResult = validateComponentUsage(manifest, 'Button', {
    colour: 'red',
})
assert(
    unknownResult.valid === false &&
        unknownResult.errors.some(
            (e) =>
                e.toLowerCase().includes('colour') ||
                e.toLowerCase().includes('unknown')
        ),
    'validateComponentUsage: unknown prop → errors include mention of unknown prop',
    `errors: ${unknownResult.errors.join('; ')}`
)

// Typo → "Did you mean" suggestion
const typoResult = validateComponentUsage(manifest, 'Button', {
    typ: 'primary',
})
assert(
    typoResult.valid === false &&
        typoResult.errors.some((e) => e.includes('Did you mean')),
    'validateComponentUsage: typo prop "typ" → error has "Did you mean" suggestion',
    `errors: ${typoResult.errors.join('; ')}`
)

// Unknown component → errors mention component not found
const unknownCompResult = validateComponentUsage(
    manifest,
    'NonExistentComp',
    {}
)
assert(
    unknownCompResult.valid === false &&
        unknownCompResult.errors.some(
            (e) =>
                e.toLowerCase().includes('not found') ||
                e.toLowerCase().includes('nonexistentcomp')
        ),
    'validateComponentUsage: unknown component → errors mention component not found',
    `errors: ${unknownCompResult.errors.join('; ')}`
)

// ---------------------------------------------------------------------------
// Section 6: Tabs prop count sanity check
// ---------------------------------------------------------------------------
console.log('\n--- Section 6: Tabs prop count sanity check ---')

const tabsProps = tabs?.props || []
assert(
    tabsProps.length < 50,
    `Tabs.props.length < 50 (got ${tabsProps.length}) — should be ~15 Blend-specific props, not inherited HTML props`,
    `got ${tabsProps.length}`
)

// ---------------------------------------------------------------------------
// Final results
// ---------------------------------------------------------------------------
console.log(`\n=== Results: ${passed} passed, ${failed} failed ===`)
process.exit(failed > 0 ? 1 : 0)
