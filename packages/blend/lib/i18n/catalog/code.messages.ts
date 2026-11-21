/**
 * Strings for CodeBlock (including its diff view), CodeEditor and
 * CodeEditorV2.
 *
 * `{header}` is the consumer's header text and `{language}` the language
 * prop, both interpolated as given. The `-unnamed` sentences cover an empty
 * header; they are whole sentences rather than a fallback noun substituted
 * into the named form.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const CODE_MESSAGES = {
    'code-block.label.header': 'Header',
    'code-block.a11y.region': 'Code block: {header}',
    'code-block.a11y.region-unnamed': 'Code block',
    'code-block.a11y.region-language':
        'Code block: {header}, {language} language',
    'code-block.a11y.region-unnamed-language':
        'Code block, {language} language',
    'code-block.a11y.header': 'Code block header: {header}',
    'code-block.a11y.copy-from': 'Copy code from {header}',
    'code-block.a11y.copy-from-unnamed': 'Copy code from code block',
    'code-block.a11y.copied-from': 'Code from {header} copied to clipboard',
    'code-block.a11y.copied-from-unnamed':
        'Code from code block copied to clipboard',
    'code-block.a11y.copy': 'Copy code',
    'code-block.a11y.copied': 'Code copied to clipboard',
    'code-block.a11y.removed-code': 'Removed code',
    'code-block.a11y.added-code': 'Added code',
    'code-block.a11y.collapsed-lines':
        'Collapsed lines. Use controls to load more context.',
    'code-block.a11y.load-more-above': 'Load more lines from above',
    'code-block.a11y.load-more-below': 'Load more lines from below',
    'code-block.a11y.expand-collapsed': 'Expand full collapsed section',

    'code-editor.label.title': 'Editor',
    'code-editor.status.loading': 'Loading editor...',
    'code-editor.a11y.header': 'Code editor header',
    'code-editor.a11y.copy': 'Copy code',
    'code-editor.a11y.copied': 'Copied',
} as const
