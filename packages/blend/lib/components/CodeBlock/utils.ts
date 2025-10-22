import type { CodeBlockTokenType } from './codeBlock.token'
import { DiffLineType, type DiffLine } from './types'

/**
 * Token interface for syntax highlighting
 */
export interface SyntaxToken {
    type: string
    value: string
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
 * Tokenizes a line of code for syntax highlighting
 * Supports multiple languages: JavaScript/TypeScript, Python, Rust, Haskell
 */
export const tokenizeLine = (line: string): SyntaxToken[] => {
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
    const rustQualifiedPaths =
        /\b([A-Z][a-zA-Z0-9_]*)(::)([A-Z][a-zA-Z0-9_]*)/g

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
    const comments =
        /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$|--.*$|{-[\s\S]*?-})/g

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
export const getTokenColor = (type: string, syntaxTokens: CodeBlockTokenType['syntax']): string => {
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
    gutterTokens: CodeBlockTokenType['gutter']
) => {
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
 * Gets the line background styling for diff mode
 */
export const getDiffLineBackground = (
    lineType: DiffLineType | undefined,
    isDiffMode: boolean,
    lineTokens: CodeBlockTokenType['line']
) => {
    if (!isDiffMode || !lineType || lineType === DiffLineType.UNCHANGED) {
        return {}
    }

    return {
        background: lineTokens.backgroundColor[lineType],
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
export const processLines = (isDiffMode: boolean, diffLines: DiffLine[] | undefined, code: string) => {
    return isDiffMode ? diffLines?.map((d) => d.content) : code.split('\n')
}
