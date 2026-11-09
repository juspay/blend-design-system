const LINE_BREAKS = new RegExp(
    `[\\r\\n${String.fromCharCode(0x2028, 0x2029)}]+`,
    'g'
)

export function toCommentText(value: unknown): string {
    return String(value ?? '')
        .replace(LINE_BREAKS, ' ')
        .replace(/\*\//g, '* /')
}
