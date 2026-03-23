#!/usr/bin/env node

/**
 * generateManifest.js
 *
 * Dev-only build script. NOT shipped in the npm package.
 *
 * Scans all V1 component directories under packages/blend/lib/components/,
 * uses ts-morph to parse types.ts files, extracts enums + props, deep-merges
 * meta-override JSON files, reads design token files, and writes manifest.json.
 *
 * Usage:
 *   node packages/mcp/generateManifest.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Project } from 'ts-morph'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const COMPONENTS_DIR = path.resolve(__dirname, '../blend/lib/components')
const TOKENS_DIR = path.resolve(__dirname, '../blend/lib/tokens')
const META_OVERRIDES_DIR = path.resolve(__dirname, 'meta-overrides')
const OUTPUT_PATH = path.resolve(__dirname, 'manifest.json')

// ---------------------------------------------------------------------------
// V1 top-level component directories to include
// ---------------------------------------------------------------------------

const V1_COMPONENTS = [
    'Accordion',
    'Alert',
    'Avatar',
    'AvatarGroup',
    'Breadcrumb',
    'Button',
    'ButtonGroup',
    'Card',
    'Charts',
    'ChatInput',
    'Checkbox',
    'CodeBlock',
    'CodeEditor',
    'DataTable',
    'DateRangePicker',
    'Directory',
    'Drawer',
    'KeyValuePair',
    'Menu',
    'Modal',
    'MultiSelect',
    'Popover',
    'ProgressBar',
    'Radio',
    'Select',
    'SingleSelect',
    'Skeleton',
    'Slider',
    'Snackbar',
    'StatCard',
    'Stepper',
    'Switch',
    'Tabs',
    'Tags',
    'Text',
    'Tooltip',
    'Topbar',
    'Upload',
    'VirtualList',
]

// Inputs namespace sub-directories
const INPUTS_SUBDIRS = [
    'TextInput',
    'NumberInput',
    'SearchInput',
    'OTPInput',
    'UnitInput',
    'DropdownInput',
    'MultiValueInput',
    'TextArea',
]

// ---------------------------------------------------------------------------
// Compound component definitions
// ---------------------------------------------------------------------------

const COMPOUND_COMPONENTS = {
    Accordion: { subComponents: ['AccordionItem'] },
    Radio: { subComponents: ['RadioGroup'] },
    Switch: { subComponents: ['SwitchGroup'] },
    ButtonGroup: { subComponents: ['Button'] },
}

// ---------------------------------------------------------------------------
// Component category mapping
// ---------------------------------------------------------------------------

const CATEGORY_MAP = {
    action: ['Button', 'ButtonGroup'],
    input: [
        'TextInput',
        'NumberInput',
        'SearchInput',
        'OTPInput',
        'UnitInput',
        'DropdownInput',
        'MultiValueInput',
        'TextArea',
        'Checkbox',
        'Switch',
        'Radio',
        'Select',
        'SingleSelect',
        'MultiSelect',
        'Slider',
        'DateRangePicker',
        'Upload',
        'ChatInput',
    ],
    'data-display': [
        'DataTable',
        'StatCard',
        'Charts',
        'Card',
        'KeyValuePair',
        'Avatar',
        'AvatarGroup',
        'Tags',
        'CodeBlock',
        'CodeEditor',
        'Directory',
        'Text',
        'VirtualList',
    ],
    feedback: ['Alert', 'Snackbar', 'ProgressBar', 'Skeleton'],
    navigation: [
        'Tabs',
        'Breadcrumb',
        'Stepper',
        'Sidebar',
        'Topbar',
        'Menu',
        'Accordion',
    ],
    overlay: ['Modal', 'Drawer', 'Popover', 'Tooltip'],
}

/** Return the category string for a component name. */
function getCategory(componentName) {
    for (const [cat, names] of Object.entries(CATEGORY_MAP)) {
        if (names.includes(componentName)) return cat
    }
    return 'general'
}

// ---------------------------------------------------------------------------
// Prop categorisation (mirrors generateMetaFiles.js logic)
// ---------------------------------------------------------------------------

function categorizeProperty(propName) {
    const name = propName.toLowerCase()

    if (
        name.includes('variant') ||
        name.includes('size') ||
        name.includes('color') ||
        name.includes('type')
    ) {
        return 'Appearance'
    }
    if (
        name.startsWith('on') ||
        name.includes('callback') ||
        name.includes('handler')
    ) {
        return 'Events'
    }
    if (
        name.includes('children') ||
        name.includes('content') ||
        name.includes('text') ||
        name.includes('label') ||
        name.includes('title') ||
        name.includes('description') ||
        name.includes('placeholder')
    ) {
        return 'Content'
    }
    if (
        name.includes('width') ||
        name.includes('height') ||
        name.includes('position') ||
        name.includes('placement') ||
        name.includes('align') ||
        name.includes('direction')
    ) {
        return 'Layout'
    }
    if (
        name.includes('disabled') ||
        name.includes('loading') ||
        name.includes('open') ||
        name.includes('visible') ||
        name.includes('active') ||
        name.includes('checked') ||
        name.includes('selected') ||
        name.includes('error') ||
        name.includes('required')
    ) {
        return 'State'
    }
    if (name.includes('class') || name.includes('style')) {
        return 'Styling'
    }

    return 'General'
}

// ---------------------------------------------------------------------------
// Auto-generate llmContext from prop name + type
// ---------------------------------------------------------------------------

function autoLlmContext(propName, propType, enumsMap) {
    if (enumsMap && enumsMap[propType]) {
        const members = Object.keys(enumsMap[propType])
            .map((m) => `${propType}.${m}`)
            .join(', ')
        return `Controls the ${propName}. Valid values: ${members}`
    }
    if (propType.includes('ReactNode') || propType.includes('ReactElement')) {
        return `React element to render as ${propName}`
    }
    if (propType === 'boolean') {
        return `Set to true to enable ${propName}`
    }
    if (propType === 'string') {
        return `Text value for ${propName}`
    }
    if (propType === 'number') {
        return `Numeric value for ${propName}`
    }
    if (propType.includes('=>') || propType.includes('() =>')) {
        return `Callback function for ${propName}`
    }
    return `Sets the ${propName} of the component`
}

// ---------------------------------------------------------------------------
// ts-morph extraction helpers
// ---------------------------------------------------------------------------

/**
 * Extract enums from a SourceFile.
 * Returns { enumName: { MEMBER: value } } map plus a list of raw enum
 * declaration strings keyed by name.
 */
function extractEnums(sourceFile) {
    const enumsMap = {}
    const enumDefinitions = {}

    for (const enumDecl of sourceFile.getEnums()) {
        if (!enumDecl.isExported()) continue

        const enumName = enumDecl.getName()
        const membersObj = {}
        const memberParts = []

        for (const member of enumDecl.getMembers()) {
            const memberName = member.getName()
            const memberValue = member.getValue()
            membersObj[memberName] =
                memberValue !== undefined ? memberValue : memberName
            memberParts.push(
                `${memberName} = '${memberValue !== undefined ? memberValue : memberName}'`
            )
        }

        enumsMap[enumName] = membersObj
        enumDefinitions[enumName] =
            `enum ${enumName} { ${memberParts.join(', ')} }`
    }

    return { enumsMap, enumDefinitions }
}

/**
 * Resolve properties from an interface or type alias node.
 * For type aliases that are object types or intersections, we dig into them.
 */
function resolveProperties(node) {
    if (!node) return []

    // Interface
    if (typeof node.getProperties === 'function') {
        try {
            return node.getProperties()
        } catch (_) {
            return []
        }
    }

    return []
}

/**
 * Find the main Props interface/type for a component.
 * Looks for ${ComponentName}Props or just Props.
 */
function findPropsNode(sourceFile, componentName) {
    const interfaces = sourceFile.getInterfaces()
    const typeAliases = sourceFile.getTypeAliases()

    const target = [
        `${componentName}Props`,
        'Props',
        // Also handle Inputs sub-components where componentName might be bare
    ]

    for (const t of target) {
        const iface = interfaces.find((i) => i.getName() === t)
        if (iface) return iface

        const alias = typeAliases.find((a) => a.getName() === t)
        if (alias) return alias
    }

    return null
}

/**
 * Find the sub-component Props node (e.g., AccordionItemProps).
 */
function findSubPropsNode(sourceFile, subName) {
    const interfaces = sourceFile.getInterfaces()
    const typeAliases = sourceFile.getTypeAliases()

    const target = `${subName}Props`

    const iface = interfaces.find((i) => i.getName() === target)
    if (iface) return iface

    const alias = typeAliases.find((a) => a.getName() === target)
    if (alias) return alias

    return null
}

/**
 * Build the props array from a props node (interface or type alias),
 * using enumsMap + enumDefinitions for type enrichment.
 *
 * Strategy:
 *  1. If the node is an InterfaceDeclaration, use getProperties() — returns
 *     PropertySignature AST nodes with full type-node and question-token info.
 *  2. If the node is a TypeAliasDeclaration, use getType().getProperties() —
 *     returns Symbol objects that resolve intersection / utility types correctly.
 *     We then reconstruct rawType + required from the symbol's declarations.
 */
function buildPropsArray(propsNode, enumsMap, enumDefinitions) {
    if (!propsNode) return []

    // Detect whether this is an interface (has AST-level getProperties that
    // returns PropertySignature nodes with getTypeNode / hasQuestionToken).
    const isInterface =
        propsNode.constructor &&
        (propsNode.constructor.name === 'InterfaceDeclaration' ||
            typeof propsNode.getBaseTypes === 'function')

    // --- Interface path: direct AST property signatures ---
    if (isInterface) {
        let astProps = []
        try {
            astProps = propsNode.getProperties()
        } catch (_) {
            return []
        }
        return astProps.map((prop) =>
            buildPropFromAstNode(prop, enumsMap, enumDefinitions)
        )
    }

    // --- TypeAlias path: resolve via getType().getProperties() ---
    // This correctly flattens intersections like `{ foo: T } & Omit<HTMLButtonElement, ...>`
    let symbols = []
    try {
        symbols = propsNode.getType().getProperties()
    } catch (_) {
        // Last resort: try getProperties() directly (may fail for complex aliases)
        try {
            const direct = propsNode.getProperties()
            return direct.map((p) =>
                buildPropFromAstNode(p, enumsMap, enumDefinitions)
            )
        } catch (__) {
            return []
        }
    }

    const filteredSymbols = symbols.filter((sym) => {
        try {
            const decls = sym.getDeclarations()
            if (!decls || decls.length === 0) return true
            return decls.some(
                (d) => !d.getSourceFile().getFilePath().includes('node_modules')
            )
        } catch (_) {
            return true
        }
    })

    return (
        filteredSymbols
            .map((sym) => {
                const symName = sym.getName()

                // Skip internal / inherited HTML attributes that add noise
                // (anything starting with 'aria-' or having camelCase from HTMLElement)
                // We keep them — LLMs can still benefit from knowing they're valid.

                // Try to get the declaration to extract type text and optionality
                let rawType = 'unknown'
                let required = false
                let jsDocComment = ''

                try {
                    const decls = sym.getDeclarations()
                    // Find a PropertySignature or PropertyDeclaration declaration
                    const propDecl = decls.find(
                        (d) =>
                            d.constructor &&
                            (d.constructor.name === 'PropertySignature' ||
                                d.constructor.name === 'PropertyDeclaration')
                    )

                    if (propDecl) {
                        const typeNode = propDecl.getTypeNode
                            ? propDecl.getTypeNode()
                            : null
                        rawType = typeNode
                            ? typeNode.getText()
                            : sym.getTypeAtLocation(propDecl)?.getText() ||
                              'unknown'
                        required = propDecl.hasQuestionToken
                            ? !propDecl.hasQuestionToken()
                            : false

                        // JSDoc on the declaration
                        try {
                            const jsDocs = propDecl.getJsDocs
                                ? propDecl.getJsDocs()
                                : []
                            jsDocComment = jsDocs
                                .map((d) => d.getDescription().trim())
                                .filter(Boolean)
                                .join(' ')
                        } catch (_) {
                            // ignore
                        }
                    } else {
                        // Symbol-only path: get type string from the symbol's type
                        try {
                            const symType = sym.getTypeAtLocation(
                                propsNode.getSourceFile()
                            )
                            rawType = symType ? symType.getText() : 'unknown'
                        } catch (_) {
                            rawType = 'unknown'
                        }
                        // Optionality from flags (optional flag = 16777216 in ts compiler)
                        try {
                            required = !sym.isOptional()
                        } catch (_) {
                            required = false
                        }
                    }
                } catch (_) {
                    // ignore — use defaults
                }

                const typeDefinition = enumDefinitions[rawType] || rawType
                const llmCtx = autoLlmContext(symName, rawType, enumsMap)

                return {
                    propName: symName,
                    propType: rawType,
                    typeDefinition,
                    propDescription: jsDocComment || llmCtx,
                    propDefault: required ? '-' : 'undefined',
                    category: categorizeProperty(symName),
                    required,
                    llmContext: llmCtx,
                }
            })
            // Filter out props with obviously broken/empty names
            .filter((p) => p.propName && p.propName !== '__index')
    )
}

/**
 * Build a prop entry from an AST PropertySignature node (interface members).
 */
function buildPropFromAstNode(prop, enumsMap, enumDefinitions) {
    const propName = prop.getName()
    const typeNode = prop.getTypeNode ? prop.getTypeNode() : null
    const rawType = typeNode ? typeNode.getText() : 'unknown'
    const required =
        typeof prop.hasQuestionToken === 'function'
            ? !prop.hasQuestionToken()
            : false

    const typeDefinition = enumDefinitions[rawType] || rawType
    const llmCtx = autoLlmContext(propName, rawType, enumsMap)

    let jsDocComment = ''
    try {
        const jsDocs = prop.getJsDocs ? prop.getJsDocs() : []
        jsDocComment = jsDocs
            .map((d) => d.getDescription().trim())
            .filter(Boolean)
            .join(' ')
    } catch (_) {
        // ignore
    }

    return {
        propName,
        propType: rawType,
        typeDefinition,
        propDescription: jsDocComment || llmCtx,
        propDefault: required ? '-' : 'undefined',
        category: categorizeProperty(propName),
        required,
        llmContext: llmCtx,
    }
}

/**
 * Parse a single component directory and extract all component data.
 *
 * @param {string} componentName  - e.g. "Button"
 * @param {string} componentDir   - absolute path to the dir
 * @returns {object} raw component data before meta-overrides
 */
function parseComponentDir(componentName, componentDir) {
    const possibleFiles = [
        path.join(componentDir, 'types.ts'),
        path.join(componentDir, 'Types.ts'),
        path.join(componentDir, `${componentName}.tsx`),
        path.join(componentDir, 'index.ts'),
    ]

    let foundFilePath = null
    for (const fp of possibleFiles) {
        if (fs.existsSync(fp)) {
            foundFilePath = fp
            break
        }
    }

    if (!foundFilePath) {
        console.warn(
            `  [WARN] No types file found for ${componentName} in ${componentDir}`
        )
        return null
    }

    let sourceFile
    try {
        const project = new Project({
            skipAddingFilesFromTsConfig: true,
            compilerOptions: { allowJs: true },
        })
        sourceFile = project.addSourceFileAtPath(foundFilePath)
    } catch (err) {
        console.warn(
            `  [WARN] ts-morph failed to parse ${foundFilePath}: ${err.message}`
        )
        return null
    }

    const { enumsMap, enumDefinitions } = extractEnums(sourceFile)

    // Main props
    const propsNode = findPropsNode(sourceFile, componentName)
    const props = buildPropsArray(propsNode, enumsMap, enumDefinitions)

    // Sub-component props (for compound components)
    const compoundDef = COMPOUND_COMPONENTS[componentName]
    const subComponentsData = {}

    if (compoundDef) {
        for (const subName of compoundDef.subComponents) {
            const subPropsNode = findSubPropsNode(sourceFile, subName)
            if (subPropsNode) {
                subComponentsData[subName] = buildPropsArray(
                    subPropsNode,
                    enumsMap,
                    enumDefinitions
                )
            } else {
                // Try a separate file in the same dir
                const subFile = [
                    path.join(componentDir, `${subName}.tsx`),
                    path.join(componentDir, `${subName}.ts`),
                ].find((f) => fs.existsSync(f))

                if (subFile) {
                    try {
                        const subProject = new Project({
                            skipAddingFilesFromTsConfig: true,
                        })
                        const subSF = subProject.addSourceFileAtPath(subFile)
                        const { enumsMap: subEnums, enumDefinitions: subDefs } =
                            extractEnums(subSF)

                        // Merge parent enums so cross-references resolve
                        const mergedEnums = { ...enumsMap, ...subEnums }
                        const mergedDefs = {
                            ...enumDefinitions,
                            ...subDefs,
                        }

                        const subPropsNode2 = findSubPropsNode(subSF, subName)
                        subComponentsData[subName] = buildPropsArray(
                            subPropsNode2,
                            mergedEnums,
                            mergedDefs
                        )
                    } catch (err) {
                        console.warn(
                            `  [WARN] Failed to parse sub-component file ${subFile}: ${err.message}`
                        )
                        subComponentsData[subName] = []
                    }
                } else {
                    subComponentsData[subName] = []
                }
            }
        }
    }

    return {
        enumsMap,
        enumDefinitions,
        props,
        subComponentsData,
        foundFilePath,
    }
}

// ---------------------------------------------------------------------------
// Build a single component manifest entry
// ---------------------------------------------------------------------------

function buildComponentEntry(componentName, componentDir) {
    const isCompound = Object.prototype.hasOwnProperty.call(
        COMPOUND_COMPONENTS,
        componentName
    )
    const subComponentNames = isCompound
        ? COMPOUND_COMPONENTS[componentName].subComponents
        : []

    const parsed = parseComponentDir(componentName, componentDir)

    // Collect all enum names found for the imports section
    const enumNames = parsed ? Object.keys(parsed.enumsMap) : []

    // Build imports
    const importComponents = [componentName, ...subComponentNames]

    const entry = {
        componentName,
        componentDescription: `A ${componentName} component for the Blend design system.`,
        category: getCategory(componentName),
        features: ['Customizable appearance and behavior', 'Accessible design'],
        isCompound,
        subComponents: subComponentNames,
        compositionPattern: null,
        imports: {
            components: importComponents,
            enums: enumNames,
            types: [`${componentName}Props`],
        },
        enums: parsed ? parsed.enumsMap : {},
        props: parsed ? parsed.props : [],
        usageExamples: [
            {
                title: `Basic ${componentName}`,
                description: `Basic usage of ${componentName}`,
                code: `<${componentName} />`,
            },
        ],
    }

    // Attach sub-component props as separate entries accessible via key
    if (isCompound && parsed) {
        for (const subName of subComponentNames) {
            entry[`_subProps_${subName}`] =
                parsed.subComponentsData[subName] || []
        }
    }

    return entry
}

// ---------------------------------------------------------------------------
// Meta-overrides merge
// ---------------------------------------------------------------------------

function loadMetaOverride(componentName) {
    const overridePath = path.join(
        META_OVERRIDES_DIR,
        `${componentName.toLowerCase()}.json`
    )

    if (!fs.existsSync(overridePath)) return null

    try {
        const raw = fs.readFileSync(overridePath, 'utf8')
        return JSON.parse(raw)
    } catch (err) {
        console.warn(
            `  [WARN] Failed to parse meta-override ${overridePath}: ${err.message}`
        )
        return null
    }
}

function applyMetaOverride(entry, override) {
    if (!override) return entry

    if (override.componentDescription != null) {
        entry.componentDescription = override.componentDescription
    }
    if (Array.isArray(override.features)) {
        entry.features = override.features
    }
    if (override.compositionPattern !== undefined) {
        entry.compositionPattern = override.compositionPattern
    }
    if (Array.isArray(override.usageExamples)) {
        entry.usageExamples = override.usageExamples
    }

    if (override.propOverrides && typeof override.propOverrides === 'object') {
        entry.props = entry.props.map((prop) => {
            const propOvr = override.propOverrides[prop.propName]
            if (!propOvr) return prop
            return {
                ...prop,
                ...(propOvr.llmContext !== undefined
                    ? { llmContext: propOvr.llmContext }
                    : {}),
                ...(propOvr.propDescription !== undefined
                    ? { propDescription: propOvr.propDescription }
                    : {}),
                ...(propOvr.propDefault !== undefined
                    ? { propDefault: propOvr.propDefault }
                    : {}),
            }
        })
    }

    return entry
}

// ---------------------------------------------------------------------------
// Token extraction
// ---------------------------------------------------------------------------

/**
 * Extract the exported default object from a token file using ts-morph.
 * Falls back to a best-effort regex parse if ts-morph can't resolve initializer.
 */
function extractTokenObject(filePath) {
    if (!fs.existsSync(filePath)) {
        console.warn(`  [WARN] Token file not found: ${filePath}`)
        return {}
    }

    try {
        const project = new Project({
            skipAddingFilesFromTsConfig: true,
        })
        const sourceFile = project.addSourceFileAtPath(filePath)

        // Look for the exported default const declaration
        // e.g. export default colorTokens  → find the variable declaration
        const varDecls = sourceFile.getVariableDeclarations()

        for (const varDecl of varDecls) {
            const initializer = varDecl.getInitializer()
            if (!initializer) continue

            const initText = initializer.getText()
            // Must start with an object literal
            if (!initText.trim().startsWith('{')) continue

            // Parse with Function constructor (safe for plain data objects)
            try {
                // Strip TypeScript type assertions / satisfies syntax
                const cleaned = initText
                    .replace(/\s+as\s+\w[\w.<>[\], |&]*?(?=[,}\n])/g, '')
                    .replace(/\s+satisfies\s+\w[\w.<>[\], |&]*?(?=[,}\n])/g, '')

                // eslint-disable-next-line no-new-func
                const obj = new Function(`return (${cleaned})`)()
                if (obj && typeof obj === 'object') return obj
            } catch (_) {
                // Fall through to regex-based approach
            }
        }

        // Fallback: naive regex scan for simple key: 'value' patterns in the file
        return extractTokensViaRegex(filePath)
    } catch (err) {
        console.warn(
            `  [WARN] Token extraction error for ${filePath}: ${err.message}`
        )
        return extractTokensViaRegex(filePath)
    }
}

/**
 * Very simple regex fallback to pull out token values from files like
 * shadowTokens, borderTokens etc. Only handles flat key: 'value' pairs.
 */
function extractTokensViaRegex(filePath) {
    const result = {}
    try {
        const content = fs.readFileSync(filePath, 'utf8')
        // Match:  key: 'value'  or  key: "value"  or  key: 123
        const kvRegex = /(\w+)\s*:\s*(['"`])(.*?)\2/g
        let m
        while ((m = kvRegex.exec(content)) !== null) {
            const key = m[1]
            const value = m[3]
            // Skip TypeScript type keywords
            if (['import', 'from', 'type', 'const', 'export'].includes(key))
                continue
            result[key] = value
        }
    } catch (_) {
        // ignore
    }
    return result
}

function extractTokens() {
    const tokenFiles = {
        colors: path.join(TOKENS_DIR, 'color.tokens.ts'),
        spacing: path.join(TOKENS_DIR, 'unit.tokens.ts'),
        borders: path.join(TOKENS_DIR, 'border.tokens.ts'),
        shadows: path.join(TOKENS_DIR, 'shadows.tokens.ts'),
        typography: path.join(TOKENS_DIR, 'font.tokens.ts'),
    }

    const tokens = {}
    for (const [key, filePath] of Object.entries(tokenFiles)) {
        console.log(`  Extracting token: ${key}`)
        tokens[key] = extractTokenObject(filePath)
    }
    return tokens
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

async function generateManifest() {
    console.log('=== generateManifest.js ===')
    console.log(`Components dir : ${COMPONENTS_DIR}`)
    console.log(`Tokens dir     : ${TOKENS_DIR}`)
    console.log(`Meta overrides : ${META_OVERRIDES_DIR}`)
    console.log(`Output         : ${OUTPUT_PATH}`)
    console.log()

    if (!fs.existsSync(COMPONENTS_DIR)) {
        throw new Error(`Components directory not found: ${COMPONENTS_DIR}`)
    }

    const components = {}

    // -----------------------------------------------------------------------
    // Process top-level V1 components
    // -----------------------------------------------------------------------

    for (const componentName of V1_COMPONENTS) {
        console.log(`Processing ${componentName}...`)

        const componentDir = path.join(COMPONENTS_DIR, componentName)

        if (!fs.existsSync(componentDir)) {
            console.warn(
                `  [WARN] Directory not found, skipping: ${componentDir}`
            )
            continue
        }

        try {
            const entry = buildComponentEntry(componentName, componentDir)
            const override = loadMetaOverride(componentName)
            const finalEntry = applyMetaOverride(entry, override)

            // Clean up internal sub-props keys before storing
            const cleanEntry = cleanEntry_(finalEntry)
            components[componentName] = cleanEntry

            // Also register sub-components as top-level manifest entries
            if (COMPOUND_COMPONENTS[componentName]) {
                for (const subName of COMPOUND_COMPONENTS[componentName]
                    .subComponents) {
                    const subPropsKey = `_subProps_${subName}`
                    const subProps = finalEntry[subPropsKey] || []
                    // Only register the sub-component entry if it is not already
                    // registered as a standalone component (e.g. Button is both
                    // a V1_COMPONENT and a ButtonGroup sub-component — don't
                    // overwrite the richer standalone entry).
                    if (!components[subName]) {
                        const subEntry = buildSubComponentEntry(
                            subName,
                            componentName,
                            subProps,
                            entry.enums || {}
                        )
                        const subOverride = loadMetaOverride(subName)
                        components[subName] = applyMetaOverride(
                            subEntry,
                            subOverride
                        )
                    }
                }
            }
        } catch (err) {
            console.error(
                `  [ERROR] Failed to process ${componentName}: ${err.message}`
            )
            // Still produce a minimal entry so manifest is always valid
            components[componentName] = buildEmptyEntry(componentName)
        }
    }

    // -----------------------------------------------------------------------
    // Process Inputs namespace
    // -----------------------------------------------------------------------

    for (const inputName of INPUTS_SUBDIRS) {
        console.log(`Processing Inputs/${inputName}...`)

        const componentDir = path.join(COMPONENTS_DIR, 'Inputs', inputName)

        if (!fs.existsSync(componentDir)) {
            console.warn(
                `  [WARN] Directory not found, skipping: ${componentDir}`
            )
            continue
        }

        try {
            const entry = buildComponentEntry(inputName, componentDir)
            const override = loadMetaOverride(inputName)
            const finalEntry = applyMetaOverride(entry, override)
            components[inputName] = cleanEntry_(finalEntry)
        } catch (err) {
            console.error(
                `  [ERROR] Failed to process Inputs/${inputName}: ${err.message}`
            )
            components[inputName] = buildEmptyEntry(inputName)
        }
    }

    // -----------------------------------------------------------------------
    // Extract tokens
    // -----------------------------------------------------------------------

    console.log('\nExtracting design tokens...')
    let tokens = {
        colors: {},
        spacing: {},
        borders: {},
        shadows: {},
        typography: {},
    }
    try {
        tokens = extractTokens()
    } catch (err) {
        console.error(`  [ERROR] Token extraction failed: ${err.message}`)
    }

    // -----------------------------------------------------------------------
    // Build final manifest
    // -----------------------------------------------------------------------

    // Read the blend package version from its package.json
    let blendPackageVersion = null
    try {
        const blendPkgPath = path.resolve(__dirname, '../blend/package.json')
        const blendPkg = JSON.parse(fs.readFileSync(blendPkgPath, 'utf-8'))
        blendPackageVersion = blendPkg.version || null
    } catch (_) {}

    const manifest = {
        version: '2.0.0',
        generatedAt: new Date().toISOString(),
        packageName: '@juspay/blend-design-system',
        blendPackageVersion,
        components,
        tokens,
    }

    try {
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2), 'utf8')
    } catch (err) {
        throw new Error(`Failed to write manifest.json: ${err.message}`)
    }

    const count = Object.keys(components).length
    console.log(`\n✅ manifest.json generated with ${count} components`)
    console.log(`   Written to: ${OUTPUT_PATH}`)
    const subComponentCount = Object.values(components).filter(
        (c) =>
            c.componentDescription &&
            c.componentDescription.includes('sub-component')
    ).length
    console.log(`   Sub-component entries: ${subComponentCount}`)
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build a minimal manifest entry for a sub-component so it can be looked up
 * independently via get_component_composition.
 */
function buildSubComponentEntry(subName, parentName, subProps, parentEnums) {
    return {
        componentName: subName,
        componentDescription: `${subName} is a sub-component of ${parentName}. Always use it as a child of <${parentName}>.`,
        category: getCategory(parentName),
        features: [`Must be used as a child of ${parentName}`],
        isCompound: false,
        subComponents: [],
        compositionPattern: null,
        imports: {
            components: [parentName, subName],
            enums: Object.keys(parentEnums || {}),
            types: [`${subName}Props`],
        },
        enums: parentEnums || {},
        props: subProps || [],
        usageExamples: [
            {
                title: `${subName} usage`,
                description: `${subName} must be used inside <${parentName}>`,
                code: `<${parentName}>\n  <${subName} />\n</${parentName}>`,
            },
        ],
    }
}

/** Remove internal bookkeeping keys (_subProps_*) from an entry. */
function cleanEntry_(entry) {
    const cleaned = { ...entry }
    for (const key of Object.keys(cleaned)) {
        if (key.startsWith('_subProps_')) {
            delete cleaned[key]
        }
    }
    return cleaned
}

/** Build a minimal empty entry so manifest is always structurally valid. */
function buildEmptyEntry(componentName) {
    return {
        componentName,
        componentDescription: `A ${componentName} component for the Blend design system.`,
        category: getCategory(componentName),
        features: [],
        isCompound: Object.prototype.hasOwnProperty.call(
            COMPOUND_COMPONENTS,
            componentName
        ),
        subComponents: COMPOUND_COMPONENTS[componentName]?.subComponents ?? [],
        compositionPattern: null,
        imports: {
            components: [componentName],
            enums: [],
            types: [`${componentName}Props`],
        },
        enums: {},
        props: [],
        usageExamples: [
            {
                title: `Basic ${componentName}`,
                description: `Basic usage of ${componentName}`,
                code: `<${componentName} />`,
            },
        ],
    }
}

// ---------------------------------------------------------------------------
// Run guard
// ---------------------------------------------------------------------------

if (import.meta.url === `file://${process.argv[1]}`) {
    generateManifest().catch(console.error)
}

export { generateManifest }
