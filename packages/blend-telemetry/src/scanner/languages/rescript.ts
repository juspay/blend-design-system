import { readFile } from 'fs/promises'
import type {
    BindingRegistry,
    ComponentBinding,
} from '../../registry/binding-registry.js'
import type {
    FileUsageResult,
    FileContext,
    RawUsage,
    PropUsage,
    PropValueType,
} from './base.js'

// ─── Module resolution map ────────────────────────────────────────────────────

/**
 * For a given .res file, maps every locally-visible name to a ComponentBinding.
 * Built in Pass 1 before any JSX scanning.
 */
type ModuleMap = Map<string, ComponentBinding>

// ─── Regex patterns ───────────────────────────────────────────────────────────

/** `open ButtonBinding` at any indentation level */
const OPEN_RE = /^\s*open\s+([A-Z]\w*)/gm

/** `module B = ButtonBinding` or `module Alert = AlertBinding` */
const MODULE_ALIAS_RE = /^\s*module\s+([A-Z]\w*)\s*=\s*([A-Z]\w*)/gm

/**
 * Matches the START of a JSX opening tag — just the `<ComponentName` part.
 * We find candidates here, then use scanToTagClose() to reliably find the
 * props block and closing delimiter regardless of how many lines the tag spans.
 *
 * Capture group 1: tag name (e.g. "ButtonBinding" or "ChartComponentsBinding.LineChart")
 */
const JSX_TAG_START_RE = /<([A-Z][a-zA-Z]*(?:\.[A-Z][a-zA-Z]*)*)/g

/**
 * Adapter pattern signals — any of these indicate blend is conditionally gated.
 * Matches: blendEnabledC, isBlendEnabled, BlendContext
 */
const ADAPTER_SIGNAL_RE = /blendEnabledC|isBlendEnabled|BlendContext/

/**
 * Wrapper signal — the file exports a `make` function (meaning it IS a component).
 * Combined with using blend, it's a wrapper/adapter component.
 */
const EXPORTS_MAKE_RE = /\blet\s+make\s*=/

// ─── Prop regex patterns ──────────────────────────────────────────────────────

/** text="hello world"  — string literal prop */
const STRING_PROP_RE = /(\w+)="([^"]*)"/g

/** buttonType=Primary or size=Md  — variant / bare value prop */
const VARIANT_PROP_RE = /(\w+)=([A-Z]\w*(?:\.[A-Z]\w*)*)\b/g

/** size={someExpr} — expression prop (any content in braces) */
const EXPR_PROP_RE = /(\w+)=\{([^}]*)\}/g

/** ?optionalProp  — optional passthrough (passes an option<t> directly) */
const OPTIONAL_PASS_RE = /\?(\w+)/g

/** size  (bare lowercase name that isn't part of another pattern) — boolean shorthand */
const BOOL_SHORTHAND_RE =
    /(?<![=?."'`{])(?:^|\s)([a-z]\w*)(?![\s\S]*?=)(?=[>\s/])/g

// ─── Main scanner ─────────────────────────────────────────────────────────────

export async function scanReScriptFile(
    filePath: string,
    bindingRegistry: BindingRegistry
): Promise<FileUsageResult> {
    let source: string
    try {
        source = await readFile(filePath, 'utf-8')
    } catch {
        return makeEmptyResult(filePath, true)
    }

    // PASS 1 — Build module resolution map
    const moduleMap = buildModuleMap(source, bindingRegistry)
    if (moduleMap.size === 0) {
        return {
            ...makeEmptyResult(filePath, false),
            context: classifyFile(source, []),
        }
    }

    // PASS 2 — Find all JSX usages
    const rawUsages = extractJSXUsages(source, moduleMap)

    // PASS 3 — Extract props per usage
    const usages: RawUsage[] = rawUsages.map((u) => ({
        ...u,
        props: extractProps(u._propsBlock),
    }))

    // PASS 4 — Classify file
    const context = classifyFile(source, usages)

    return {
        filePath,
        language: 'rescript',
        usages,
        context,
        parseError: false,
    }
}

// ─── Pass 1: Module resolution ────────────────────────────────────────────────

function buildModuleMap(source: string, registry: BindingRegistry): ModuleMap {
    const map: ModuleMap = new Map()

    // Directly register all known binding modules
    // so <ButtonBinding /> is recognised without needing `open`
    for (const [modName, components] of registry.byModuleName) {
        for (const comp of components) {
            const key = comp.nestedModuleName
                ? `${modName}.${comp.nestedModuleName}`
                : modName
            map.set(key, comp)
        }
    }

    // `open ButtonBinding` — after this, `make` is directly accessible but in JSX
    // we write <ButtonBinding> anyway (v4 JSX shorthand), so opens mainly matter
    // for aliased usage patterns. We still track them for context.
    for (const [, modName] of source.matchAll(OPEN_RE)) {
        const components = registry.byModuleName.get(modName)
        if (components) {
            // `open` allows using the component as just `make` in function-call style,
            // but JSX consumers still write <ModuleName> — so we only need this
            // for detecting non-JSX usages like `ButtonBinding.make(~text="x", ())`
            for (const comp of components) {
                map.set('make', comp) // ambiguous but rare — last open wins
            }
        }
    }

    // `module B = ButtonBinding` — alias
    for (const [, alias, original] of source.matchAll(MODULE_ALIAS_RE)) {
        const components = registry.byModuleName.get(original)
        if (components) {
            for (const comp of components) {
                const key = comp.nestedModuleName
                    ? `${alias}.${comp.nestedModuleName}`
                    : alias
                map.set(key, comp)
            }
        }
    }

    return map
}

// ─── Pass 2: JSX usage extraction ────────────────────────────────────────────

interface RawUsageWithBlock extends Omit<RawUsage, 'props'> {
    _propsBlock: string
}

function extractJSXUsages(
    source: string,
    moduleMap: ModuleMap
): RawUsageWithBlock[] {
    const usages: RawUsageWithBlock[] = []

    for (const match of source.matchAll(JSX_TAG_START_RE)) {
        const tagName = match[1]
        const comp = moduleMap.get(tagName)
        if (!comp) continue

        // Position immediately after `<TagName`
        const afterTagName = match.index! + match[0].length
        const propsBlock = scanToTagClose(source, afterTagName)
        if (propsBlock === null) continue

        const lineNumber = getLineNumber(source, match.index!)
        const hasSpreadProps = /\.\.\.[a-zA-Z_]/.test(propsBlock)

        usages.push({
            blendName: comp.blendComponentName,
            localName: tagName,
            _propsBlock: propsBlock,
            hasSpreadProps,
            lineNumber,
            isDynamic: false,
        })
    }

    // Also detect function-call style: ButtonBinding.make(~text="x", ())
    const FN_CALL_RE =
        /([A-Z][a-zA-Z]*(?:\.[A-Z][a-zA-Z]*)*)\.make\s*\(([\s\S]*?)\)/g
    for (const [fullMatch, modPath, argsBlock] of source.matchAll(FN_CALL_RE)) {
        const comp = moduleMap.get(modPath)
        if (!comp) continue

        usages.push({
            blendName: comp.blendComponentName,
            localName: modPath,
            _propsBlock: argsBlock,
            hasSpreadProps: false,
            lineNumber: getLineNumber(source, source.indexOf(fullMatch, 0)),
            isDynamic: false,
        })
    }

    return usages
}

/**
 * Starting at `pos` (immediately after the tag name), scan forward through
 * the source to find the props block — everything up to the first unquoted
 * `/>` or bare `>` that closes this opening tag.
 *
 * Handles:
 *   - Multi-line tags spanning N lines
 *   - String props containing `>` or `/>` (e.g. text=">")
 *   - Expression props containing `>` inside braces (e.g. onChange={v => v > 0})
 *
 * Returns the props block string, or null if the tag is malformed.
 */
function scanToTagClose(source: string, pos: number): string | null {
    const len = source.length
    const start = pos
    let i = pos
    // Maximum look-ahead: 2000 chars is enough for any real JSX tag
    const limit = Math.min(len, pos + 2000)

    while (i < limit) {
        const ch = source[i]

        // Inside a double-quoted string: skip until closing quote
        if (ch === '"') {
            i++
            while (i < limit && source[i] !== '"') {
                if (source[i] === '\\') i++ // skip escape
                i++
            }
            i++ // skip closing "
            continue
        }

        // Inside a brace-expression: skip until matching }
        // Handles nested braces (e.g. onChange={v => { let x = 1; x }})
        if (ch === '{') {
            let depth = 1
            i++
            while (i < limit && depth > 0) {
                if (source[i] === '{') depth++
                else if (source[i] === '}') depth--
                else if (source[i] === '"') {
                    // skip string inside expression
                    i++
                    while (i < limit && source[i] !== '"') {
                        if (source[i] === '\\') i++
                        i++
                    }
                }
                i++
            }
            continue
        }

        // Self-closing: `/>` — end of tag
        if (ch === '/' && i + 1 < limit && source[i + 1] === '>') {
            return source.slice(start, i)
        }

        // Opening `>` that isn't part of `/>` — children follow, tag is open
        if (ch === '>') {
            return source.slice(start, i)
        }

        i++
    }

    return null // malformed / too long — skip
}

// ─── Pass 3: Prop extraction ──────────────────────────────────────────────────

function extractProps(propsBlock: string): PropUsage[] {
    const props: PropUsage[] = []
    const seen = new Set<string>()

    function add(name: string, value: string | null, valueType: PropValueType) {
        if (seen.has(name)) return
        seen.add(name)
        props.push({ name, value, valueType })
    }

    // Order matters: more specific patterns first to avoid double-matching

    // 1. Expression props: size={expr}
    for (const [, name, value] of propsBlock.matchAll(EXPR_PROP_RE)) {
        add(name, value.trim() || null, 'expression')
    }

    // 2. String literal: text="hello"
    for (const [, name, value] of propsBlock.matchAll(STRING_PROP_RE)) {
        add(name, value, 'string_literal')
    }

    // 3. Variant / bare value: buttonType=Primary
    for (const [, name, value] of propsBlock.matchAll(VARIANT_PROP_RE)) {
        add(name, value, 'variant')
    }

    // 4. Optional passthrough: ?someOpt
    for (const [, name] of propsBlock.matchAll(OPTIONAL_PASS_RE)) {
        add(name, null, 'optional_passthrough')
    }

    // 5. Boolean shorthand — very conservative to avoid false positives
    for (const [, name] of propsBlock.matchAll(BOOL_SHORTHAND_RE)) {
        if (
            /^(if|let|open|module|type|and|or|not|fun|match|when|with|for|while|do|in|to)$/.test(
                name
            )
        )
            continue
        add(name, 'true', 'bool_shorthand')
    }

    return props
}

// ─── Pass 4: File classification ──────────────────────────────────────────────

function classifyFile(source: string, usages: RawUsage[]): FileContext {
    const hasUsages = usages.length > 0
    const isAdapter = ADAPTER_SIGNAL_RE.test(source)
    const exportsMake = EXPORTS_MAKE_RE.test(source)

    return {
        isAdapter,
        // A wrapper both exports `make` AND uses a binding
        isWrapper: exportsMake && hasUsages && !isAdapter,
        isDirect: hasUsages && !isAdapter,
    }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLineNumber(source: string, index: number): number {
    if (index < 0) return 0
    return source.slice(0, index).split('\n').length
}

function makeEmptyResult(
    filePath: string,
    parseError: boolean
): FileUsageResult {
    return {
        filePath,
        language: 'rescript',
        usages: [],
        context: { isAdapter: false, isWrapper: false, isDirect: false },
        parseError,
    }
}
