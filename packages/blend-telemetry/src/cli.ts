import { Command } from 'commander'
import { resolve } from 'path'
import chalk from 'chalk'
import { loadConfig } from './config/loader.js'
import { detectLanguages } from './detect/language-detector.js'
import { runScan } from './scanner/index.js'
import { collectMetrics } from './metrics/collector.js'
import { printConsoleReport } from './reporters/console.js'
import { writeJsonReport } from './reporters/json.js'
import { writeHtmlReport } from './reporters/html.js'
import {
    confirmDetection,
    promptForConfiguration,
} from './prompt/interactive.js'
import type { BlendTelemetryConfig, ReporterType } from './config/schema.js'
import type {
    DetectionResult,
    LanguageDetection,
} from './detect/language-detector.js'
import { findRescriptConfigs } from './detect/rescript/project-finder.js'
import { findTsConfigs } from './detect/typescript/project-finder.js'

const pkg = { version: '0.1.0' }

const program = new Command()

program
    .name('blend-telemetry')
    .description(
        'Telemetry CLI for @juspay/blend-design-system\n' +
            'Scans your project and reports component adoption, prop usage, and migration metrics.'
    )
    .version(pkg.version)
    // Target project
    .option('-d, --dir <path>', 'Project root directory to scan', process.cwd())
    .option(
        '-p, --package <name>',
        'Design system package name',
        '@juspay/blend-design-system'
    )
    // Output
    .option(
        '-r, --reporter <types...>',
        'Reporters to run: console, json, html, csv',
        ['console']
    )
    .option(
        '-o, --out <path>',
        'Output directory for file reporters',
        '.blend-telemetry'
    )
    // Filtering
    .option(
        '--components <names...>',
        'Filter report to specific component names'
    )
    .option('--exclude <patterns...>', 'Additional glob patterns to exclude')
    // Modes
    .option('--ci', 'Enable CI mode (exit 1 on threshold failures)')
    .option(
        '--fail-below <n>',
        'CI: fail if adoption rate is below N%',
        parseFloat
    )
    .option(
        '--require <components...>',
        'CI: fail if any of these components have zero usages'
    )
    .option('--interactive', 'Force interactive language/config selection')
    .option('--no-cache', 'Disable incremental scan cache')
    .option('-v, --verbose', 'Show per-file breakdown in console output')
    .option('-q, --quiet', 'Suppress all output except errors')
    .action(run)

program.parse(process.argv)

// ─── Main run function ────────────────────────────────────────────────────────

async function run(options: Record<string, unknown>): Promise<void> {
    const projectRoot = resolve((options['dir'] as string) ?? process.cwd())

    // ── Load config ────────────────────────────────────────────────────────────
    const cliOverrides: Partial<BlendTelemetryConfig> = {}

    if (options['package'])
        cliOverrides.packageName = options['package'] as string
    if (options['reporter'])
        cliOverrides.reporters = options['reporter'] as ReporterType[]
    if (options['out']) cliOverrides.outputDir = options['out'] as string
    if (options['exclude'])
        cliOverrides.exclude = options['exclude'] as string[]
    if (options['verbose']) cliOverrides.verbose = true
    if (options['quiet']) cliOverrides.quiet = true
    if (options['cache'] === false) cliOverrides.incrementalCache = false

    if (options['ci'] || options['failBelow'] || options['require']) {
        cliOverrides.ci = {
            enabled: true,
            failIfAdoptionBelow: (options['failBelow'] as number) ?? 0,
            failIfComponentUnused: (options['require'] as string[]) ?? [],
            warnIfPropCoverageBelow: 0,
        }
    }

    const config = await loadConfig(projectRoot, cliOverrides)

    // ── Language detection ──────────────────────────────────────────────────────
    if (!config.quiet) {
        process.stdout.write(chalk.dim('Detecting project language…'))
    }

    let detection: DetectionResult = await detectLanguages(
        projectRoot,
        config.packageName
    )

    if (!config.quiet) {
        process.stdout.write('\r' + ' '.repeat(40) + '\r') // clear line
    }

    // Handle interactive mode
    if (options['interactive'] || detection.overallConfidence === 'manual') {
        if (detection.overallConfidence === 'manual' && !config.quiet) {
            console.log(
                chalk.yellow('\n  Auto-detection found no language signals.\n')
            )
        }
        const prompted = await promptForConfiguration()
        detection = await buildDetectionFromPrompt(prompted, projectRoot)
    } else if (
        detection.overallConfidence === 'low' ||
        detection.overallConfidence === 'medium'
    ) {
        if (!config.quiet) {
            const confirmed = await confirmDetection(detection)
            if (!confirmed) {
                const prompted = await promptForConfiguration()
                detection = await buildDetectionFromPrompt(
                    prompted,
                    projectRoot
                )
            }
        }
    } else if (!config.quiet) {
        // High confidence — just show what we found
        for (const lang of detection.languages) {
            console.log(
                chalk.dim(`  ✓ Detected ${lang.language}`) +
                    chalk.dim(` (${lang.projectConfigs.length} config file(s))`)
            )
        }
    }

    if (detection.languages.length === 0) {
        console.error(
            chalk.red('\n  No supported languages detected. Exiting.\n')
        )
        process.exit(1)
    }

    // ── Scan ───────────────────────────────────────────────────────────────────
    if (!config.quiet) {
        process.stdout.write(chalk.dim('  Scanning files…'))
    }

    const scanResult = await runScan(config, detection)

    if (!config.quiet) {
        process.stdout.write('\r' + ' '.repeat(40) + '\r')
    }

    // ── Collect metrics ─────────────────────────────────────────────────────────
    let report = collectMetrics(
        scanResult.fileResults,
        scanResult.bindingRegistry,
        scanResult.packageRegistry,
        config,
        scanResult.scanStats
    )

    // Apply component filter if specified
    if (options['components']) {
        const filter = new Set(options['components'] as string[])
        report = {
            ...report,
            componentMetrics: report.componentMetrics.filter((c) =>
                filter.has(c.componentName)
            ),
        }
    }

    // ── Report ─────────────────────────────────────────────────────────────────
    const reporters = config.reporters

    if (reporters.includes('console') && !config.quiet) {
        printConsoleReport(report, config)
    }

    if (reporters.includes('json')) {
        const path = await writeJsonReport(
            report,
            config.outputDir,
            projectRoot
        )
        if (!config.quiet) console.log(chalk.dim(`  Wrote: ${path}`))
    }

    // HTML report is always generated
    const htmlPath = await writeHtmlReport(
        report,
        config.outputDir,
        projectRoot
    )

    if (!config.quiet) {
        const fileUrl = `file://${htmlPath}`
        // OSC 8 hyperlink — clickable in iTerm2, VS Code terminal, Warp, etc.
        const link = `\x1b]8;;${fileUrl}\x07${chalk.cyan.underline('Open HTML Report')}\x1b]8;;\x07`
        console.log(`  ${chalk.bold('📊')} ${link}  ${chalk.dim(htmlPath)}`)
        console.log()
    }

    // ── CI exit code ────────────────────────────────────────────────────────────
    if (report.ci && !report.ci.passed) {
        process.exit(1)
    }
}

// ─── Build detection result from interactive prompt output ────────────────────

async function buildDetectionFromPrompt(
    prompted: Awaited<ReturnType<typeof promptForConfiguration>>,
    projectRoot: string
): Promise<DetectionResult> {
    const languages: LanguageDetection[] = []

    for (const lang of prompted.languages) {
        if (lang === 'rescript') {
            const configPath = prompted.rescriptConfigPath
                ? resolve(projectRoot, prompted.rescriptConfigPath)
                : null

            const projectConfigs = configPath
                ? await findRescriptConfigs(resolve(projectRoot, configPath))
                : []

            languages.push({
                language: 'rescript',
                confidence: 'manual' as const,
                evidence: ['Manually selected by user'],
                projectConfigs,
            })
        }

        if (lang === 'typescript') {
            const projectConfigs = await findTsConfigs(projectRoot)
            languages.push({
                language: 'typescript',
                confidence: 'manual' as const,
                evidence: ['Manually selected by user'],
                projectConfigs,
            })
        }

        if (lang === 'javascript') {
            languages.push({
                language: 'javascript',
                confidence: 'manual' as const,
                evidence: ['Manually selected by user'],
                projectConfigs: [],
            })
        }
    }

    return {
        languages,
        overallConfidence: 'manual',
        projectType: 'single-package',
        hasBlendDependency: false,
        blendVersion: null,
    }
}
