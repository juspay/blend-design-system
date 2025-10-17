import { forwardRef, useState } from 'react'
import { Check, Copy, FileCode, Minus, Plus } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Button from '../Button/Button'
import { ButtonSize, ButtonSubType, ButtonType } from '../Button/types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import type { CodeBlockTokenType } from './codeBlock.token'
import { CodeBlockVariant, DiffLineType, type CodeBlockProps } from './types'

const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
    (
        {
            code,
            variant = CodeBlockVariant.DEFAULT,
            showLineNumbers,
            showHeader = true,
            header = 'Header',
            headerLeftSlot,
            headerRightSlot,
            diffLines,
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<CodeBlockTokenType>('CODE_BLOCK')
        const [isCopied, setIsCopied] = useState(false)

        // Determine if line numbers should be shown based on variant or explicit prop
        const shouldShowLineNumbers =
            showLineNumbers ??
            (variant === CodeBlockVariant.DEFAULT ||
                variant === CodeBlockVariant.DIFF)

        // Use diffLines if variant is diff, otherwise use code
        const isDiffMode = variant === CodeBlockVariant.DIFF && diffLines
        const lines = isDiffMode
            ? diffLines.map((d) => d.content)
            : code.split('\n')

        const copyToClipboard = () => {
            navigator.clipboard.writeText(code)
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, 2000)
        }

        // Token types based on color hierarchy
        const tokenize = (line: string): { type: string; value: string }[] => {
            const tokens: { type: string; value: string }[] = []

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
            const allMatches: {
                start: number
                end: number
                type: string
                value: string
            }[] = []

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

        const getTokenColor = (type: string): string => {
            switch (type) {
                case 'keyword':
                    return tokens.syntax.keyword ?? '#9810FA'
                case 'function':
                    return tokens.syntax.function ?? '#0561E2'
                case 'string':
                    return tokens.syntax.string ?? '#00C951'
                case 'number':
                    return tokens.syntax.number ?? '#FF6900'
                case 'operator':
                    return tokens.syntax.operator ?? '#525866'
                case 'variable':
                    return tokens.syntax.variable ?? '#222530'
                case 'comment':
                    return tokens.syntax.comment ?? '#99A0AE'
                case 'type':
                case 'type-annotation':
                    return tokens.syntax.keyword ?? '#9810FA' // Use keyword color for types
                case 'constructor':
                case 'qualified':
                    return tokens.syntax.function ?? '#0561E2' // Use function color for constructors
                case 'rust-arrow':
                case 'rust-double-colon':
                    return tokens.syntax.operator ?? '#525866' // Use operator color for Rust symbols
                case 'rust-qualified':
                    return tokens.syntax.function ?? '#0561E2' // Use function color for Rust qualified paths
                case 'python-builtin':
                case 'python-method':
                    return tokens.syntax.function ?? '#0561E2' // Use function color for Python built-ins and methods
                default:
                    return tokens.syntax.text ?? '#181B25'
            }
        }

        const getDiffGutterStyle = (lineType?: DiffLineType) => {
            if (!isDiffMode || !lineType || lineType === DiffLineType.UNCHANGED)
                return {}

            return {
                borderLeft: tokens.gutter.borderLeft[lineType],
                background: tokens.gutter.backgroundColor[lineType],
                color: tokens.gutter.color,
            }
        }

        const getDiffLineBackground = (lineType?: DiffLineType) => {
            if (!isDiffMode || !lineType || lineType === DiffLineType.UNCHANGED)
                return {}

            return {
                background: tokens.line.backgroundColor[lineType],
            }
        }

        return (
            <Block
                ref={ref}
                position="relative"
                width="100%"
                borderRadius={tokens.container.borderRadius}
                border={tokens.container.border}
                overflow={tokens.container.overflow}
                backgroundColor={tokens.container.backgroundColor}
                boxShadow={tokens.container.boxShadow}
            >
                {/* Header */}
                {showHeader && (
                    <Block
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        padding={tokens.header.padding}
                        backgroundColor={tokens.header.backgroundColor}
                        borderBottom={tokens.header.borderBottom}
                        gap={tokens.header.gap}
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={tokens.header.gap}
                            flex="1"
                        >
                            {headerLeftSlot || (
                                <FileCode
                                    size={tokens.header.icon.size}
                                    color={tokens.header.icon.color}
                                    style={{ flexShrink: 0 }}
                                />
                            )}
                            <Block
                                as="span"
                                fontFamily={tokens.header.text.fontFamily}
                                fontSize={tokens.header.text.fontSize}
                                fontWeight={tokens.header.text.fontWeight}
                                lineHeight={tokens.header.text.lineHeight}
                                color={tokens.header.text.color}
                            >
                                {header}
                            </Block>
                            {headerRightSlot && (
                                <Block
                                    flexShrink="0"
                                    display="flex"
                                    alignItems="center"
                                >
                                    {headerRightSlot}
                                </Block>
                            )}
                        </Block>
                        <Button
                            onClick={copyToClipboard}
                            buttonType={ButtonType.SECONDARY}
                            subType={ButtonSubType.ICON_ONLY}
                            size={ButtonSize.SMALL}
                            leadingIcon={
                                isCopied ? (
                                    <Check size={16} />
                                ) : (
                                    <Copy size={16} />
                                )
                            }
                        />
                    </Block>
                )}

                {/* Code content */}
                <Block
                    padding={isDiffMode ? '0' : tokens.content.padding}
                    backgroundColor={tokens.content.backgroundColor}
                    overflow={isDiffMode ? 'hidden' : tokens.content.overflow}
                >
                    {isDiffMode ? (
                        // Side-by-side diff layout
                        <Block
                            display="flex"
                            gap="0"
                            width="100%"
                            height="100%"
                        >
                            {/* Left side - Old code (removed) */}
                            <Block
                                flex="1"
                                minWidth="0"
                                borderRight={`1px solid ${tokens.diff.borderColor}`}
                                padding={tokens.diff.padding}
                                alignSelf="stretch"
                                backgroundColor={tokens.diff.oldBackground}
                            >
                                <Block
                                    as="pre"
                                    margin="0"
                                    fontFamily={tokens.code.fontFamily}
                                    fontSize={tokens.code.fontSize}
                                    lineHeight={tokens.code.lineHeight}
                                >
                                    {diffLines
                                        ?.filter(
                                            (line) =>
                                                line.type ===
                                                    DiffLineType.REMOVED ||
                                                line.type ===
                                                    DiffLineType.UNCHANGED
                                        )
                                        .map((line, lineIndex) => (
                                            <Block
                                                key={lineIndex}
                                                display="flex"
                                                alignItems="flex-start"
                                                paddingRight={
                                                    tokens.line.paddingRight
                                                }
                                                paddingLeft={
                                                    shouldShowLineNumbers
                                                        ? '0'
                                                        : tokens.line
                                                              .paddingLeft
                                                }
                                                style={getDiffLineBackground(
                                                    line.type
                                                )}
                                            >
                                                {shouldShowLineNumbers && (
                                                    <Block
                                                        width={
                                                            tokens.gutter.width
                                                        }
                                                        padding={
                                                            tokens.gutter
                                                                .padding
                                                        }
                                                        color={
                                                            tokens.gutter.color
                                                        }
                                                        style={{
                                                            userSelect: 'none',
                                                            ...getDiffGutterStyle(
                                                                line.type
                                                            ),
                                                        }}
                                                        flexShrink="0"
                                                        textAlign={
                                                            tokens.gutter
                                                                .textAlign
                                                        }
                                                        alignSelf="stretch"
                                                    >
                                                        {lineIndex + 1}
                                                    </Block>
                                                )}
                                                {line.type ===
                                                    DiffLineType.REMOVED && (
                                                    <Block
                                                        flexShrink="0"
                                                        display="flex"
                                                        alignItems="flex-start"
                                                        paddingTop={
                                                            tokens.diff.icon
                                                                .paddingTop
                                                        }
                                                    >
                                                        <Minus
                                                            size={
                                                                tokens.diff.icon
                                                                    .size
                                                            }
                                                            color={
                                                                tokens.diff.icon
                                                                    .removed
                                                                    .color
                                                            }
                                                        />
                                                    </Block>
                                                )}
                                                <Block
                                                    as="code"
                                                    flex="1"
                                                    whiteSpace={
                                                        tokens.code.whiteSpace
                                                    }
                                                    wordBreak={
                                                        tokens.code.wordBreak
                                                    }
                                                    paddingLeft={
                                                        line.type ===
                                                        DiffLineType.REMOVED
                                                            ? tokens.code
                                                                  .paddingLeftWithIcon
                                                            : tokens.code
                                                                  .paddingLeft
                                                    }
                                                >
                                                    {tokenize(line.content).map(
                                                        (token, tokenIndex) => (
                                                            <Block
                                                                key={tokenIndex}
                                                                as="span"
                                                                color={getTokenColor(
                                                                    token.type
                                                                )}
                                                            >
                                                                {token.value}
                                                            </Block>
                                                        )
                                                    )}
                                                </Block>
                                            </Block>
                                        ))}
                                </Block>
                            </Block>

                            {/* Right side - New code (added) */}
                            <Block
                                flex="1"
                                minWidth="0"
                                padding={tokens.diff.padding}
                                alignSelf="stretch"
                                backgroundColor={tokens.diff.newBackground}
                            >
                                <Block
                                    as="pre"
                                    margin="0"
                                    fontFamily={tokens.code.fontFamily}
                                    fontSize={tokens.code.fontSize}
                                    lineHeight={tokens.code.lineHeight}
                                >
                                    {diffLines
                                        ?.filter(
                                            (line) =>
                                                line.type ===
                                                    DiffLineType.ADDED ||
                                                line.type ===
                                                    DiffLineType.UNCHANGED
                                        )
                                        .map((line, lineIndex) => (
                                            <Block
                                                key={lineIndex}
                                                display="flex"
                                                alignItems="flex-start"
                                                paddingRight={
                                                    tokens.line.paddingRight
                                                }
                                                paddingLeft={
                                                    shouldShowLineNumbers
                                                        ? '0'
                                                        : tokens.line
                                                              .paddingLeft
                                                }
                                                style={getDiffLineBackground(
                                                    line.type
                                                )}
                                            >
                                                {shouldShowLineNumbers && (
                                                    <Block
                                                        width={
                                                            tokens.gutter.width
                                                        }
                                                        padding={
                                                            tokens.gutter
                                                                .padding
                                                        }
                                                        color={
                                                            tokens.gutter.color
                                                        }
                                                        style={{
                                                            userSelect: 'none',
                                                            ...getDiffGutterStyle(
                                                                line.type
                                                            ),
                                                        }}
                                                        flexShrink="0"
                                                        textAlign={
                                                            tokens.gutter
                                                                .textAlign
                                                        }
                                                        alignSelf="stretch"
                                                    >
                                                        {lineIndex + 1}
                                                    </Block>
                                                )}
                                                {line.type ===
                                                    DiffLineType.ADDED && (
                                                    <Block
                                                        flexShrink="0"
                                                        display="flex"
                                                        alignItems="flex-start"
                                                        paddingTop={
                                                            tokens.diff.icon
                                                                .paddingTop
                                                        }
                                                    >
                                                        <Plus
                                                            size={
                                                                tokens.diff.icon
                                                                    .size
                                                            }
                                                            color={
                                                                tokens.diff.icon
                                                                    .added.color
                                                            }
                                                        />
                                                    </Block>
                                                )}
                                                <Block
                                                    as="code"
                                                    flex="1"
                                                    whiteSpace={
                                                        tokens.code.whiteSpace
                                                    }
                                                    wordBreak={
                                                        tokens.code.wordBreak
                                                    }
                                                    paddingLeft={
                                                        line.type ===
                                                        DiffLineType.ADDED
                                                            ? tokens.code
                                                                  .paddingLeftWithIcon
                                                            : tokens.code
                                                                  .paddingLeft
                                                    }
                                                >
                                                    {tokenize(line.content).map(
                                                        (token, tokenIndex) => (
                                                            <Block
                                                                key={tokenIndex}
                                                                as="span"
                                                                color={getTokenColor(
                                                                    token.type
                                                                )}
                                                            >
                                                                {token.value}
                                                            </Block>
                                                        )
                                                    )}
                                                </Block>
                                            </Block>
                                        ))}
                                </Block>
                            </Block>
                        </Block>
                    ) : (
                        // Standard single column layout
                        <Block
                            as="pre"
                            margin="0"
                            fontFamily={tokens.code.fontFamily}
                            fontSize={tokens.code.fontSize}
                            lineHeight={tokens.code.lineHeight}
                        >
                            {lines.map((line, lineIndex) => {
                                const lineType =
                                    isDiffMode && diffLines
                                        ? diffLines[lineIndex]?.type
                                        : undefined

                                return (
                                    <Block
                                        key={lineIndex}
                                        display="flex"
                                        alignItems="flex-start"
                                        paddingRight={tokens.line.paddingRight}
                                        paddingLeft={
                                            shouldShowLineNumbers
                                                ? '0'
                                                : tokens.line.paddingLeft
                                        }
                                        style={getDiffLineBackground(lineType)}
                                    >
                                        {shouldShowLineNumbers && (
                                            <Block
                                                width={tokens.gutter.width}
                                                padding={tokens.gutter.padding}
                                                color={tokens.gutter.color}
                                                style={{
                                                    userSelect: 'none',
                                                    ...getDiffGutterStyle(
                                                        lineType
                                                    ),
                                                }}
                                                flexShrink="0"
                                                textAlign={
                                                    tokens.gutter.textAlign
                                                }
                                                alignSelf="stretch"
                                            >
                                                {lineIndex + 1}
                                            </Block>
                                        )}
                                        <Block
                                            as="code"
                                            flex="1"
                                            whiteSpace={tokens.code.whiteSpace}
                                            wordBreak={tokens.code.wordBreak}
                                            paddingLeft={
                                                tokens.code.paddingLeft
                                            }
                                        >
                                            {tokenize(line).map(
                                                (token, tokenIndex) => (
                                                    <Block
                                                        key={tokenIndex}
                                                        as="span"
                                                        color={getTokenColor(
                                                            token.type
                                                        )}
                                                    >
                                                        {token.value}
                                                    </Block>
                                                )
                                            )}
                                        </Block>
                                    </Block>
                                )
                            })}
                        </Block>
                    )}
                </Block>
            </Block>
        )
    }
)

CodeBlock.displayName = 'CodeBlock'

export default CodeBlock
