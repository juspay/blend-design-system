/**
 * Shared CLI output for human-friendly vs CI / JSON pipelines.
 *
 * Convention:
 * - `--format json` or legacy `--json` → single JSON object on stdout (envelope).
 * - `--ci` → no prompts where applicable; failures throw after optional JSON so exit code is non-zero.
 */

export type CliOutputFormat = 'pretty' | 'json'

export interface CliJsonEnvelope<T = unknown> {
    success: boolean
    command: string
    data?: T
    error?: {
        message: string
    }
}

/** Resolve format from Commander options (supports `--json` alias on some commands). */
export function parseCliFormat(options: {
    format?: string
    json?: boolean
}): CliOutputFormat {
    if (options.json === true) return 'json'
    if (options.format === 'json') return 'json'
    return 'pretty'
}

export function isCiMode(ci?: boolean): boolean {
    return ci === true
}

export function printJsonEnvelope<T>(envelope: CliJsonEnvelope<T>): void {
    console.log(JSON.stringify(envelope, null, 2))
}

export function reportCommandSuccess<T>(
    format: CliOutputFormat,
    command: string,
    data: T
): void {
    if (format === 'json') {
        printJsonEnvelope<T>({
            success: true,
            command,
            data,
        })
    }
}

/**
 * Log failure for humans, emit JSON envelope when needed, then throw in CI so the process exits non-zero.
 * When not CI, returns normally so the caller can `return` after optional pretty logging.
 */
export function reportCommandFailure(options: {
    format: CliOutputFormat
    command: string
    message: string
    ci?: boolean
    logPretty?: (message: string) => void
}): void {
    const { format, command, message, ci, logPretty } = options
    if (format === 'pretty' && logPretty) {
        logPretty(message)
    }
    if (format === 'json') {
        printJsonEnvelope({
            success: false,
            command,
            error: { message },
        })
    }
    if (isCiMode(ci)) {
        throw new Error(message)
    }
}
