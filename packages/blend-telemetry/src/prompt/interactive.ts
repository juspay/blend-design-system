import { select, checkbox, input, confirm } from '@inquirer/prompts'
import type { DetectionResult } from '../detect/language-detector.js'
import type { Language } from '../config/schema.js'

export interface PromptedLanguageConfig {
    languages: Language[]
    rescriptConfigPath: string | null
    bindingsDirs: string[]
    srcDirs: string[]
}

/**
 * Called when auto-detection has low/medium confidence.
 * Shows detected results and asks user to confirm or correct.
 */
export async function confirmDetection(
    detection: DetectionResult
): Promise<boolean> {
    if (detection.languages.length === 0) return false

    console.log('\nDetected project configuration:')
    for (const lang of detection.languages) {
        const icon =
            lang.confidence === 'high'
                ? '✓'
                : lang.confidence === 'medium'
                  ? '~'
                  : '?'
        console.log(
            `  [${icon}] ${lang.language} (${lang.confidence} confidence)`
        )
        for (const ev of lang.evidence) {
            console.log(`        ${ev}`)
        }
    }
    console.log()

    return confirm({
        message: 'Proceed with the above configuration?',
        default: true,
    })
}

/**
 * Full interactive prompt — shown when auto-detection completely fails
 * or the user explicitly passes --interactive.
 */
export async function promptForConfiguration(): Promise<PromptedLanguageConfig> {
    console.log(
        '\nblend-telemetry could not auto-detect the project language.\n'
    )

    const selectedLanguages = await checkbox<Language>({
        message: 'Which languages does this project use?',
        choices: [
            {
                name: 'ReScript  (.res files)',
                value: 'rescript',
                checked: false,
            },
            {
                name: 'TypeScript (.ts / .tsx files)',
                value: 'typescript',
                checked: false,
            },
            {
                name: 'JavaScript (.js / .jsx files)',
                value: 'javascript',
                checked: false,
            },
        ],
        validate: (val) =>
            val.length > 0 || 'Please select at least one language.',
    })

    const result: PromptedLanguageConfig = {
        languages: selectedLanguages,
        rescriptConfigPath: null,
        bindingsDirs: [],
        srcDirs: [],
    }

    // ── ReScript configuration ────────────────────────────────────────────────

    if (selectedLanguages.includes('rescript')) {
        const hasRescriptConfig = await confirm({
            message: 'Does the project have a rescript.json or bsconfig.json?',
            default: true,
        })

        if (hasRescriptConfig) {
            result.rescriptConfigPath = await input({
                message: 'Path to rescript.json (relative to project root):',
                default: './rescript.json',
                validate: (v) => v.trim().length > 0 || 'Please enter a path.',
            })
        } else {
            // No config file — ask manually
            const bindingsDir = await input({
                message:
                    'Where are your @juspay/blend-design-system binding .res files?',
                default: './src/bindings',
                validate: (v) =>
                    v.trim().length > 0 || 'Please enter a directory.',
            })
            result.bindingsDirs.push(bindingsDir.trim())

            const srcDirsInput = await input({
                message:
                    'Where is your ReScript source? (comma-separated, e.g. src,packages/common/src)',
                default: './src',
                validate: (v) =>
                    v.trim().length > 0 ||
                    'Please enter at least one directory.',
            })
            result.srcDirs.push(
                ...srcDirsInput
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
            )
        }
    }

    // ── TypeScript configuration ──────────────────────────────────────────────

    if (selectedLanguages.includes('typescript')) {
        const hasTsConfig = await confirm({
            message: 'Does the project have a tsconfig.json?',
            default: true,
        })

        if (!hasTsConfig) {
            const srcDirsInput = await input({
                message: 'Where is your TypeScript source? (comma-separated)',
                default: './src',
                validate: (v) =>
                    v.trim().length > 0 ||
                    'Please enter at least one directory.',
            })
            result.srcDirs.push(
                ...srcDirsInput
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
            )
        }
    }

    // ── JavaScript configuration ──────────────────────────────────────────────

    if (selectedLanguages.includes('javascript')) {
        const srcDirsInput = await input({
            message: 'Where is your JavaScript source? (comma-separated)',
            default: './src',
            validate: (v) =>
                v.trim().length > 0 || 'Please enter at least one directory.',
        })
        result.srcDirs.push(
            ...srcDirsInput
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
        )
    }

    return result
}

/**
 * When user is asked to pick a specific component to drill into.
 */
export async function promptComponentSelection(
    componentNames: string[]
): Promise<string> {
    return select({
        message: 'Select a component to inspect:',
        choices: componentNames.map((name) => ({ name, value: name })),
    })
}
