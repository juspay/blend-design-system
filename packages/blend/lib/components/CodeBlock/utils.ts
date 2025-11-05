import type { CodeBlockTokenType } from './codeBlock.token'
import { DiffLineType, type DiffLine, type SupportedLanguage } from './types'

/**
 * Token interface for syntax highlighting
 */
export interface SyntaxToken {
    type: string
    value: string
}

/**
 * Formats code using Prettier (with fallback for unsupported languages)
 * This is a simplified formatter that handles basic indentation and spacing
 */
export const formatCode = (
    code: string,
    language?: SupportedLanguage
): string => {
    // If no language specified or formatting not possible, return original
    if (!language || !code.trim()) {
        return code
    }

    try {
        // Basic formatting logic based on language
        switch (language) {
            case 'javascript':
            case 'typescript':
            case 'jsx':
            case 'tsx':
                return formatJavaScriptLike(code)
            case 'json':
                return formatJSON(code)
            case 'css':
                return formatCSS(code)
            case 'html':
                return formatHTML(code)
            default:
                // For other languages, just normalize whitespace
                return code
        }
    } catch (error) {
        console.warn('Code formatting failed, returning original:', error)
        return code
    }
}

/**
 * Format JavaScript/TypeScript code with basic indentation
 */
const formatJavaScriptLike = (code: string): string => {
    const formatted = code
        // Add line break after opening braces
        .replace(/\{/g, '{\n')
        // Add line break before closing braces
        .replace(/}/g, '\n}')
        // Add line break after semicolons (but not inside strings or for loops)
        .replace(/;(?=(?:(?:[^"'`]*["'`]){2})*[^"'`]*$)/g, ';\n')
        // Add line break after opening brackets for arrays
        .replace(/\[(?=\s*\{)/g, '[\n')
        // Add line break before closing brackets
        .replace(/\](?=\s*[;,}])/g, '\n]')

    // Now format line by line
    const lines = formatted.split('\n')
    const result: string[] = []
    let indentLevel = 0
    const indentSize = 2

    for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue

        // Decrease indent for closing braces/brackets
        if (trimmed.startsWith('}') || trimmed.startsWith(']')) {
            indentLevel = Math.max(0, indentLevel - 1)
        }

        // Add indentation
        result.push(' '.repeat(indentLevel * indentSize) + trimmed)

        // Increase indent for opening braces/brackets
        if (trimmed.endsWith('{') || trimmed.endsWith('[')) {
            indentLevel++
        }

        // Adjust if closing brace is on same line as opening
        if (
            (trimmed.includes('{') && trimmed.includes('}')) ||
            (trimmed.includes('[') && trimmed.includes(']'))
        ) {
            // Keep same level
        }
    }

    return result.join('\n')
}

/**
 * Format JSON with proper indentation
 */
const formatJSON = (code: string): string => {
    try {
        const parsed = JSON.parse(code)
        return JSON.stringify(parsed, null, 2)
    } catch {
        return code
    }
}

/**
 * Format CSS with basic indentation
 */
const formatCSS = (code: string): string => {
    // First, add line breaks at appropriate places for minified CSS
    const formatted = code
        // Add line break after opening braces
        .replace(/\{/g, '{\n')
        // Add line break before closing braces
        .replace(/}/g, '\n}\n')
        // Add line break after semicolons
        .replace(/;/g, ';\n')

    // Now format line by line
    const lines = formatted.split('\n')
    const result: string[] = []
    let indentLevel = 0
    const indentSize = 2

    for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue

        // Decrease indent for closing braces
        if (trimmed === '}') {
            indentLevel = Math.max(0, indentLevel - 1)
        }

        // Add indentation
        result.push(' '.repeat(indentLevel * indentSize) + trimmed)

        // Increase indent for opening braces
        if (trimmed.endsWith('{')) {
            indentLevel++
        }
    }

    return result.join('\n')
}

/**
 * Format HTML with basic indentation
 */
const formatHTML = (code: string): string => {
    // First, add line breaks between tags for minified HTML
    const formatted = code
        // Add line break after opening tags (not self-closing)
        .replace(/>(?=<)/g, '>\n')
        // Add line break after self-closing tags
        .replace(/\/>(?=\s*<)/g, '/>\n')

    // Now format line by line
    const lines = formatted.split('\n')
    const result: string[] = []
    let indentLevel = 0
    const indentSize = 2

    for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue

        // Check if line has closing tag
        const isClosingTag = trimmed.startsWith('</')
        const isSelfClosing =
            trimmed.endsWith('/>') ||
            trimmed.startsWith('<!') ||
            trimmed.startsWith('<?')
        const hasOpeningTag = trimmed.includes('<') && !isClosingTag

        // Decrease indent for closing tags
        if (isClosingTag) {
            indentLevel = Math.max(0, indentLevel - 1)
        }

        // Add indentation
        result.push(' '.repeat(indentLevel * indentSize) + trimmed)

        // Increase indent for opening tags (but not self-closing)
        if (hasOpeningTag && !isSelfClosing) {
            // Check if the tag is closed on the same line
            const openTags = (trimmed.match(/<[^/][^>]*>/g) || []).length
            const closeTags = (trimmed.match(/<\/[^>]*>/g) || []).length
            indentLevel += openTags - closeTags
        }
    }

    return result.join('\n')
}

/**
 * Match interface for regex matching
 */
interface TokenMatch {
    start: number
    end: number
    type: string
    value: string
}

/**
 * Tokenizes a JSON line with special handling for keys and values
 */
const tokenizeJSONLine = (line: string): SyntaxToken[] => {
    const tokens: SyntaxToken[] = []
    let currentIndex = 0

    // JSON key pattern: "key":
    const jsonKeyPattern = /"([^"]*)"\s*:/g
    // JSON string values: "value" (not followed by colon)
    const jsonStringValuePattern = /"([^"]*)"/g
    // JSON numbers (including decimals and negatives)
    const jsonNumberPattern = /-?\d+(\.\d+)?([eE][+-]?\d+)?/g
    // JSON booleans
    const jsonBooleanPattern = /\b(true|false)\b/g
    // JSON null
    const jsonNullPattern = /\bnull\b/g
    // JSON structural characters
    const jsonStructuralPattern = /[{}[\],]/g

    const allMatches: TokenMatch[] = []

    // Find all JSON keys first (highest priority)
    let match: RegExpExecArray | null
    jsonKeyPattern.lastIndex = 0
    while ((match = jsonKeyPattern.exec(line)) !== null) {
        // Add the key part (including quotes)
        allMatches.push({
            start: match.index,
            end: match.index + match[0].length - 1, // Exclude the colon
            type: 'json-key',
            value: match[0].substring(0, match[0].length - 1),
        })
        // Add the colon
        allMatches.push({
            start: match.index + match[0].length - 1,
            end: match.index + match[0].length,
            type: 'operator',
            value: ':',
        })
    }

    // Find string values (not keys)
    jsonStringValuePattern.lastIndex = 0
    while ((match = jsonStringValuePattern.exec(line)) !== null) {
        // Check if this is already marked as a key
        const matchIndex = match.index
        const isKey = allMatches.some(
            (m) => m.start === matchIndex && m.type === 'json-key'
        )
        if (!isKey) {
            allMatches.push({
                start: match.index,
                end: match.index + match[0].length,
                type: 'json-value',
                value: match[0],
            })
        }
    }

    // Find numbers
    jsonNumberPattern.lastIndex = 0
    while ((match = jsonNumberPattern.exec(line)) !== null) {
        allMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            type: 'json-number',
            value: match[0],
        })
    }

    // Find booleans
    jsonBooleanPattern.lastIndex = 0
    while ((match = jsonBooleanPattern.exec(line)) !== null) {
        allMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            type: 'json-boolean',
            value: match[0],
        })
    }

    // Find null
    jsonNullPattern.lastIndex = 0
    while ((match = jsonNullPattern.exec(line)) !== null) {
        allMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            type: 'json-null',
            value: match[0],
        })
    }

    // Find structural characters
    jsonStructuralPattern.lastIndex = 0
    while ((match = jsonStructuralPattern.exec(line)) !== null) {
        allMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            type: 'operator',
            value: match[0],
        })
    }

    // Sort matches by start position
    allMatches.sort((a, b) => a.start - b.start)

    // Build token array, handling overlaps
    for (let i = 0; i < allMatches.length; i++) {
        const match = allMatches[i]!

        if (match.start < currentIndex) continue // Skip overlapping matches

        // Add any text before this match (whitespace)
        if (match.start > currentIndex) {
            const text = line.slice(currentIndex, match.start)
            tokens.push({ type: 'text', value: text })
        }

        // Add the matched token
        tokens.push({ type: match.type, value: match.value })
        currentIndex = match.end
    }

    // Add remaining text
    if (currentIndex < line.length) {
        const text = line.slice(currentIndex)
        tokens.push({ type: 'text', value: text })
    }

    return tokens
}

/**
 * Tokenizes a line of code for syntax highlighting
 * Supports multiple languages: JavaScript/TypeScript, Python, Rust, Haskell
 */
export const tokenizeLine = (
    line: string,
    language?: string
): SyntaxToken[] => {
    // Use JSON-specific tokenizer for JSON
    if (language === 'json') {
        return tokenizeJSONLine(line)
    }

    const tokens: SyntaxToken[] = []

    // Keywords - Multi-language support (JS/TS, Python, Rust, Haskell)
    const keywords =
        /\b(if|else|return|const|function|let|var|for|while|switch|case|break|continue|typeof|new|class|extends|import|export|default|async|await|try|catch|finally|throw|def|lambda|yield|with|as|from|pass|raise|assert|del|global|nonlocal|and|or|not|is|in|None|True|False|elif|fn|mut|pub|use|mod|struct|enum|trait|impl|where|match|loop|move|ref|self|Self|super|crate|type|unsafe|dyn|static|const|let|data|where|module|deriving|instance|newtype|type|do|case|of|then|otherwise|qualified|Ok|Err|Some|None)\b/g

    // Rust-specific: Return type arrow
    const rustArrow = /->/g

    // Rust-specific: Double colon for paths
    const rustDoubleColon = /::/g

    // Rust-specific: Primitive types
    const rustPrimitiveTypes =
        /\b(u8|u16|u32|u64|u128|usize|i8|i16|i32|i64|i128|isize|f32|f64|bool|char|str|String|Vec|Option|Result|Box|Rc|Arc|Cell|RefCell|HashMap|HashSet|BTreeMap|BTreeSet)\b/g

    // Rust-specific: Qualified paths and enum variants (Type::Variant, module::path::Item)
    const rustQualifiedPaths = /\b([A-Z][a-zA-Z0-9_]*)(::)([A-Z][a-zA-Z0-9_]*)/g

    // Python-specific: Built-in functions
    const pythonBuiltins =
        /\b(abs|all|any|ascii|bin|bool|bytearray|bytes|callable|chr|classmethod|compile|complex|delattr|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip|__import__)\b/g

    // Python-specific: Method calls (word.method())
    const pythonMethods = /\.([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g

    // Haskell-specific: Type annotations operator
    const haskellTypeAnnotation = /(?<!:):(?!:)/g

    // Haskell-specific: Built-in types (Int, Double, String, Bool, etc.)
    const haskellBuiltinTypes =
        /\b(Int|Integer|Double|Float|String|Char|Bool|Maybe|Either|IO|Map|Set|List|Ordering|Show|Eq|Ord|Read|Num|Functor|Applicative|Monad|Foldable|Traversable)\b/g

    // Haskell-specific: Module/qualified names (e.g., Data.Map, Map.insertWith)
    const haskellQualifiedNames =
        /\b([A-Z][a-zA-Z0-9_]*\.)+[a-zA-Z][a-zA-Z0-9_]*/g

    // Haskell-specific: Data constructors and type constructors (capitalized identifiers)
    const dataConstructors = /\b[A-Z][a-zA-Z0-9_]*/g

    // Strings (single or double quotes)
    const strings = /(['"`])(?:(?=(\\?))\2.)*?\1/g

    // Numbers
    const numbers = /\b\d+(\.\d+)?\b/g

    // Functions (word followed by parenthesis)
    const functions = /\b([a-zA-Z_$][\w$]*)\s*(?=\()/g

    // Operators and punctuation
    const operators = /[(){}[\],.%+\-=*/&|<>!?:;]/g

    // Comments - Multi-language support (JS/TS //, Python #, Haskell --, Rust //)
    const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$|--.*$|{-[\s\S]*?-})/g

    let currentIndex = 0
    const allMatches: TokenMatch[] = []

    // Find all matches
    const addMatches = (regex: RegExp, type: string) => {
        let match
        regex.lastIndex = 0
        while ((match = regex.exec(line)) !== null) {
            allMatches.push({
                start: match.index,
                end: match.index + match[0].length,
                type,
                value: match[0],
            })
        }
    }

    // Add matches in priority order (comments and strings first to avoid conflicts)
    addMatches(comments, 'comment')
    addMatches(strings, 'string')
    addMatches(keywords, 'keyword')
    addMatches(rustArrow, 'rust-arrow')
    addMatches(rustDoubleColon, 'rust-double-colon')
    addMatches(rustPrimitiveTypes, 'type')
    addMatches(rustQualifiedPaths, 'rust-qualified')
    addMatches(haskellTypeAnnotation, 'type-annotation')
    addMatches(haskellBuiltinTypes, 'type')
    addMatches(haskellQualifiedNames, 'qualified')
    addMatches(dataConstructors, 'constructor')
    addMatches(pythonBuiltins, 'python-builtin')
    addMatches(pythonMethods, 'python-method')
    addMatches(functions, 'function')
    addMatches(numbers, 'number')
    addMatches(operators, 'operator')

    // Sort matches by start position
    allMatches.sort((a, b) => a.start - b.start)

    // Build token array, handling overlaps
    for (let i = 0; i < allMatches.length; i++) {
        const match = allMatches[i]!

        if (match.start < currentIndex) continue // Skip overlapping matches

        // Add any text before this match
        if (match.start > currentIndex) {
            const text = line.slice(currentIndex, match.start)
            // Check if it's a variable/property or just whitespace
            if (text.trim()) {
                tokens.push({ type: 'variable', value: text })
            } else {
                tokens.push({ type: 'text', value: text })
            }
        }

        // Add the matched token
        tokens.push({ type: match.type, value: match.value })
        currentIndex = match.end
    }

    // Add remaining text
    if (currentIndex < line.length) {
        const text = line.slice(currentIndex)
        if (text.trim()) {
            tokens.push({ type: 'variable', value: text })
        } else {
            tokens.push({ type: 'text', value: text })
        }
    }

    return tokens
}

/**
 * Gets the color for a token type based on syntax highlighting rules
 */
export const getTokenColor = (
    type: string,
    syntaxTokens: CodeBlockTokenType['body']['syntax']
): string => {
    switch (type) {
        case 'keyword':
            return syntaxTokens.keyword ?? '#9810FA'
        case 'function':
            return syntaxTokens.function ?? '#0561E2'
        case 'string':
            return syntaxTokens.string ?? '#00C951'
        case 'number':
            return syntaxTokens.number ?? '#FF6900'
        case 'operator':
            return syntaxTokens.operator ?? '#525866'
        case 'variable':
            return syntaxTokens.variable ?? '#222530'
        case 'comment':
            return syntaxTokens.comment ?? '#99A0AE'
        case 'type':
        case 'type-annotation':
            return syntaxTokens.keyword ?? '#9810FA' // Use keyword color for types
        case 'constructor':
        case 'qualified':
            return syntaxTokens.function ?? '#0561E2' // Use function color for constructors
        case 'rust-arrow':
        case 'rust-double-colon':
            return syntaxTokens.operator ?? '#525866' // Use operator color for Rust symbols
        case 'rust-qualified':
            return syntaxTokens.function ?? '#0561E2' // Use function color for Rust qualified paths
        case 'python-builtin':
        case 'python-method':
            return syntaxTokens.function ?? '#0561E2' // Use function color for Python built-ins and methods
        // JSON-specific tokens
        case 'json-key':
            return '#0561E2' // Blue for JSON keys
        case 'json-value':
            return '#00C951' // Green for JSON string values
        case 'json-number':
            return '#FF6900' // Orange for JSON numbers
        case 'json-boolean':
            return '#9810FA' // Purple for JSON booleans
        case 'json-null':
            return '#99A0AE' // Gray for JSON null
        default:
            return syntaxTokens.text ?? '#181B25'
    }
}

/**
 * Gets the gutter (line number) styling for diff mode
 */
export const getDiffGutterStyle = (
    lineType: DiffLineType | undefined,
    isDiffMode: boolean,
    gutterTokens: CodeBlockTokenType['body']['gutter']
): React.CSSProperties => {
    if (!isDiffMode || !lineType || lineType === DiffLineType.UNCHANGED) {
        return {}
    }

    return {
        borderLeft: gutterTokens.borderLeft[lineType],
        background: gutterTokens.backgroundColor[lineType],
        color: gutterTokens.color,
    }
}

/**
 * Gets the highlighted line background styling for diff mode
 */
export const getDiffLineBackground = (
    lineType: DiffLineType | undefined,
    isDiffMode: boolean,
    highlightedLineTokens: CodeBlockTokenType['body']['highlightedLine']
): React.CSSProperties => {
    if (!isDiffMode || !lineType || lineType === DiffLineType.UNCHANGED) {
        return {}
    }

    return {
        background: highlightedLineTokens.backgroundColor[lineType],
    }
}

/**
 * Determines if line numbers should be shown based on variant and explicit prop
 */
export const shouldShowLineNumbers = (
    showLineNumbers: boolean | undefined,
    variant: string
): boolean => {
    return showLineNumbers ?? (variant === 'default' || variant === 'diff')
}

/**
 * Creates a copy to clipboard function with state management
 */
export const createCopyToClipboard = (
    code: string,
    setIsCopied: (copied: boolean) => void
) => {
    return () => {
        navigator.clipboard.writeText(code)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }
}

/**
 * Processes lines for diff or normal mode
 */
export const processLines = (
    isDiffMode: boolean,
    diffLines: DiffLine[] | undefined,
    code: string
) => {
    return isDiffMode ? diffLines?.map((d) => d.content) : code.split('\n')
}
