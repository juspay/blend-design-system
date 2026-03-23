import { readFile } from 'fs/promises'
import { basename } from 'path'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VariantValue {
    /** ReScript constructor name e.g. "Primary" */
    rescriptName: string
    /** The actual JS string value from @as("...") e.g. "primary" */
    jsValue: string
}

export interface PropDefinition {
    /** ReScript labeled arg name e.g. "buttonType" */
    name: string
    /** ReScript type annotation e.g. "buttonVariant" */
    type: string
    /** Whether the prop is optional (=?) */
    optional: boolean
    /** If the prop has @as("...") rename attribute, the JS prop name */
    jsName: string | null
}

export interface ComponentBinding {
    /** The module name in the binding file e.g. "ButtonBinding" */
    bindingModuleName: string
    /** Non-null when inside a nested module e.g. "LineChart" for ChartComponentsBinding.LineChart */
    nestedModuleName: string | null
    /** The actual Blend component name from = "Button" */
    blendComponentName: string
    /** The @module(...) import path e.g. "@juspay/blend-design-system" */
    modulePath: string
    /** All declared props */
    props: PropDefinition[]
    /** All variant types defined in the same file, keyed by type name */
    variantTypes: Record<string, VariantValue[]>
    /** True if this binding declares a React component (@react.component) */
    isReactComponent: boolean
}

export interface FunctionBinding {
    bindingModuleName: string
    /** The ReScript binding name e.g. "addSnackbar" */
    functionName: string
    /** The JS export name e.g. "addSnackbar" */
    exportName: string
    modulePath: string
}

export interface BindingFileResult {
    filePath: string
    bindingModuleName: string
    components: ComponentBinding[]
    functions: FunctionBinding[]
    /** True if the file had parse issues but we recovered partially */
    hadParseErrors: boolean
}

export interface BindingRegistry {
    /** Map from binding module name → ComponentBinding[] */
    byModuleName: Map<string, ComponentBinding[]>
    /** Map from blend component name → ComponentBinding (first match) */
    byBlendName: Map<string, ComponentBinding>
    /** All parsed binding files */
    files: BindingFileResult[]
    /** All function-style bindings (non-component) */
    functions: FunctionBinding[]
}

// ─── Regex patterns ───────────────────────────────────────────────────────────

/**
 * Matches: @module("@juspay/blend-design-system") or @module("@juspay/blend-design-system/dist/...")
 * Capture group 1: the full module path inside the quotes
 */
const MODULE_PATH_RE = /@module\(["']([^"']+)["']\)/

/**
 * Matches: ) => React.element = "ComponentName"
 * Capture group 1: the component export name
 */
const COMPONENT_EXPORT_RE = /\)\s*=>\s*React\.element\s*=\s*["']([^"']+)["']/

/**
 * Matches the full props block inside external make: (...)
 * Capture group 1: everything between the outer parens
 */
const PROPS_BLOCK_RE =
    /external\s+make\s*:\s*\(([\s\S]*?)\)\s*=>\s*React\.element/

/**
 * Matches a single prop declaration inside the props block.
 * Handles:
 *   ~buttonType: buttonVariant=?,
 *   @as("type") ~type_: buttonType=?,
 *   ~children: React.element=?,
 */
const SINGLE_PROP_RE =
    /(?:@as\(["']([^"']+)["']\)\s*)?~(\w+)\s*:\s*([^,=\n)~@]+?)(\s*=\?)?(?=[,\n)~@])/g

/**
 * Matches a full variant type definition.
 * Handles multi-line variant bodies.
 * Capture group 1: type name
 * Capture group 2: variant body (everything after =)
 */
const VARIANT_TYPE_RE =
    /\btype\s+(\w+)\s*=\s*(?!.*=>)((?:\s*\|?\s*(?:@as\([^)]+\)\s*)?\w+\s*)+)/g

/**
 * Matches individual variant members: @as("primary") Primary
 * Capture group 1: JS value string
 * Capture group 2: ReScript constructor name
 */
const VARIANT_MEMBER_RE = /@as\(["']([^"']+)["']\)\s*(\w+)/g

/**
 * Matches a nested module block:
 *   module LineChart = { ... }
 */
const NESTED_MODULE_RE = /\bmodule\s+(\w+)\s*=\s*\{([\s\S]*?)\n\}/g

/**
 * Matches non-component external function bindings:
 *   external addSnackbar: addToastOptions => string = "addSnackbar"
 */
const EXTERNAL_FN_RE = /\bexternal\s+(\w+)\s*:\s*[\s\S]*?=\s*["']([^"']+)["']/g

// ─── Main parser ──────────────────────────────────────────────────────────────

export async function parseBindingFile(
    filePath: string,
    packageName: string
): Promise<BindingFileResult> {
    const bindingModuleName = basename(filePath, '.res')
    let source: string

    try {
        source = await readFile(filePath, 'utf-8')
    } catch {
        return {
            filePath,
            bindingModuleName,
            components: [],
            functions: [],
            hadParseErrors: true,
        }
    }

    let hadParseErrors = false

    // Pre-extract all variant types from the full file (they're always at top-level)
    const variantTypes = extractVariantTypes(source)

    // Build blocks: top-level content + each nested module
    const blocks = extractBlocks(source, bindingModuleName)

    const components: ComponentBinding[] = []
    const functions: FunctionBinding[] = []

    for (const block of blocks) {
        const modulePathMatch = block.content.match(MODULE_PATH_RE)
        if (!modulePathMatch) continue

        const modulePath = modulePathMatch[1]

        // Skip non-blend modules (e.g. lucide-react, @rescript/react etc.)
        if (!modulePath.startsWith(packageName)) continue

        const isReactComponent = block.content.includes('@react.component')
        const exportNameMatch = block.content.match(COMPONENT_EXPORT_RE)

        if (isReactComponent && exportNameMatch) {
            // ── React component binding ──────────────────────────────────────────
            let blendComponentName = exportNameMatch[1]

            // Handle "default" export — derive name from module context
            if (blendComponentName === 'default') {
                blendComponentName =
                    block.nestedModuleName ??
                    deriveComponentName(bindingModuleName)
            }

            let props: PropDefinition[] = []
            try {
                props = extractProps(block.content)
            } catch {
                hadParseErrors = true
            }

            components.push({
                bindingModuleName,
                nestedModuleName: block.nestedModuleName,
                blendComponentName,
                modulePath,
                props,
                variantTypes,
                isReactComponent: true,
            })
        } else {
            // ── Non-component function binding (e.g. addSnackbar) ────────────────
            const fnRe = new RegExp(EXTERNAL_FN_RE.source, 'g')
            for (const m of block.content.matchAll(fnRe)) {
                // Skip make (it's a component binding) and type declarations
                if (m[1] === 'make') continue
                functions.push({
                    bindingModuleName,
                    functionName: m[1],
                    exportName: m[2],
                    modulePath,
                })
            }
        }
    }

    return {
        filePath,
        bindingModuleName,
        components,
        functions,
        hadParseErrors,
    }
}

// ─── Block extraction ────────────────────────────────────────────────────────

interface ContentBlock {
    /** Non-null if this block is inside a `module Name = { ... }` */
    nestedModuleName: string | null
    content: string
}

function extractBlocks(
    source: string,
    _bindingModuleName: string
): ContentBlock[] {
    const blocks: ContentBlock[] = []

    // Strip nested module contents from top-level to avoid double-matching
    let topLevel = source

    // Find nested modules first
    for (const [fullMatch, modName, modBody] of source.matchAll(
        NESTED_MODULE_RE
    )) {
        blocks.push({ nestedModuleName: modName, content: modBody })
        // Remove the nested module block from top-level view
        topLevel = topLevel.replace(fullMatch, '')
    }

    // Top-level block (what remains after nested modules are stripped)
    blocks.unshift({ nestedModuleName: null, content: topLevel })

    return blocks
}

// ─── Prop extraction ─────────────────────────────────────────────────────────

function extractProps(blockContent: string): PropDefinition[] {
    const propsBlockMatch = blockContent.match(PROPS_BLOCK_RE)
    if (!propsBlockMatch) return []

    const propsBlock = propsBlockMatch[1]
    const props: PropDefinition[] = []
    const seen = new Set<string>()

    for (const match of propsBlock.matchAll(SINGLE_PROP_RE)) {
        const jsNameOverride = match[1] ?? null // from @as("...")
        const propName = match[2] // the ~name part
        const propType = match[3].trim() // the type annotation
        const isOptional = Boolean(match[4]) // =? suffix

        if (seen.has(propName)) continue
        seen.add(propName)

        props.push({
            name: propName,
            type: propType,
            optional: isOptional,
            jsName: jsNameOverride,
        })
    }

    return props
}

// ─── Variant type extraction ──────────────────────────────────────────────────

function extractVariantTypes(source: string): Record<string, VariantValue[]> {
    const result: Record<string, VariantValue[]> = {}

    for (const [, typeName, typeBody] of source.matchAll(VARIANT_TYPE_RE)) {
        const members: VariantValue[] = []

        for (const [, jsValue, rescriptName] of typeBody.matchAll(
            VARIANT_MEMBER_RE
        )) {
            members.push({ jsValue, rescriptName })
        }

        if (members.length > 0) {
            result[typeName] = members
        }
    }

    return result
}

// ─── Name derivation ─────────────────────────────────────────────────────────

/** ButtonBinding → Button, ChartContainerV2Bindings → ChartContainerV2 */
function deriveComponentName(bindingModuleName: string): string {
    return bindingModuleName.replace(/Bindings?$/, '')
}

// ─── Registry builder ─────────────────────────────────────────────────────────

export async function buildBindingRegistry(
    bindingFiles: string[],
    packageName: string
): Promise<BindingRegistry> {
    const results = await Promise.all(
        bindingFiles.map((f) => parseBindingFile(f, packageName))
    )

    const byModuleName = new Map<string, ComponentBinding[]>()
    const byBlendName = new Map<string, ComponentBinding>()
    const allFunctions: FunctionBinding[] = []

    for (const result of results) {
        if (result.components.length > 0) {
            byModuleName.set(result.bindingModuleName, result.components)

            for (const comp of result.components) {
                // First binding for a given blend name wins
                if (!byBlendName.has(comp.blendComponentName)) {
                    byBlendName.set(comp.blendComponentName, comp)
                }
            }
        }
        allFunctions.push(...result.functions)
    }

    return {
        byModuleName,
        byBlendName,
        files: results,
        functions: allFunctions,
    }
}
