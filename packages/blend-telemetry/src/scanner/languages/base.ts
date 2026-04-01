export type PropValueType =
    | 'string_literal'
    | 'variant'
    | 'expression'
    | 'bool_shorthand'
    | 'optional_passthrough'
    | 'member_expression'
    | 'unknown'

export interface PropUsage {
    /** Prop name as written in the source */
    name: string
    /** Extracted value (null if dynamic/expression) */
    value: string | null
    /** How the value was specified */
    valueType: PropValueType
}

export interface RawUsage {
    /** The Blend component name e.g. "Button" */
    blendName: string
    /** How it was referenced in source e.g. "ButtonBinding", "B", "BlendButton" */
    localName: string
    /** Props extracted from this usage site */
    props: PropUsage[]
    /** True if any spread attribute was present: {...p} */
    hasSpreadProps: boolean
    /** 1-based line number in the source file */
    lineNumber: number
    /** True when component was referenced dynamically (React.createElement etc.) */
    isDynamic: boolean
}

export type FileContextType = 'adapter' | 'wrapper' | 'direct' | 'unknown'

export interface FileContext {
    /** File uses adapter pattern (isBlendEnabled / BlendContext gate) */
    isAdapter: boolean
    /** File wraps a binding and re-exports it as a component */
    isWrapper: boolean
    /** File directly renders blend components with no gating */
    isDirect: boolean
}

export interface FileUsageResult {
    filePath: string
    language: 'rescript' | 'typescript' | 'javascript'
    usages: RawUsage[]
    context: FileContext
    /** True if the file had syntax errors that caused partial results */
    parseError: boolean
}
