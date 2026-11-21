/**
 * Strings for ChatInput and ChatInputV2 (including their mobile variants and
 * attachment rows).
 *
 * `{name}` is the attached file's name and `{query}` a consumer-supplied
 * suggested query, interpolated as given.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const CHAT_INPUT_MESSAGES = {
    'chat-input.placeholder.message': 'Type a message...',
    'chat-input.a11y.message-input': 'Message input',
    'chat-input.a11y.attach-files': 'Attach files',
    'chat-input.a11y.actions': 'Chat input actions',
    'chat-input.a11y.secondary-action': 'Secondary action',
    'chat-input.a11y.suggested-queries': 'Suggested queries',
    'chat-input.label.top-queries': 'Top Queries',
    'chat-input.a11y.query': 'Query: {query}',
    'chat-input.a11y.files-attached.one': '{count} file attached',
    'chat-input.a11y.files-attached.other': '{count} files attached',
    'chat-input.a11y.file-item':
        '{name} file, press Delete to remove, click to view',
    'chat-input.a11y.remove-file': 'Remove {name} file',
    'chat-input.a11y.remove-attachment': 'Remove {name}',
    'chat-input.label.more-files.one': '{count} more',
    'chat-input.label.more-files.other': '{count} more',
    'chat-input.a11y.show-more-files.one': 'Show {count} more attached file',
    'chat-input.a11y.show-more-files.other': 'Show {count} more attached files',
    'chat-input.status.duplicate-header': 'Duplicate File',
    'chat-input.status.duplicate-single': 'File "{name}" is already attached',
    // Real plural forms rather than "file(s)". Only ever shown for two or
    // more files in practice (one file gets `duplicate-single`); `.one`
    // exists because the catalog requires plural pairs. Direct callers of
    // `notifyChatInputV2DuplicateFiles` keep the old English via its default.
    'chat-input.status.duplicates-not-added.one':
        '{count} duplicate file was not added',
    'chat-input.status.duplicates-not-added.other':
        '{count} duplicate files were not added',
} as const
