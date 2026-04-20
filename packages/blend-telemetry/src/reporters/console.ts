import chalk from 'chalk'
import Table from 'cli-table3'
import type { BlendTelemetryReport } from '../metrics/definitions.js'
import type { BlendTelemetryConfig } from '../config/schema.js'

const BAR_FILLED = '█'
const BAR_EMPTY = '░'
const BAR_WIDTH = 20

function bar(percentage: number): string {
    const filled = Math.round((percentage / 100) * BAR_WIDTH)
    const empty = BAR_WIDTH - filled
    return (
        chalk.cyan(BAR_FILLED.repeat(filled)) +
        chalk.gray(BAR_EMPTY.repeat(empty))
    )
}

function pct(n: number): string {
    return chalk.yellow(`${n}%`)
}

function bold(s: string): string {
    return chalk.bold(s)
}

function divider(width = 60): string {
    return chalk.dim('─'.repeat(width))
}

export function printConsoleReport(
    report: BlendTelemetryReport,
    config: BlendTelemetryConfig
): void {
    const { meta, summary, fileMetrics, migrationMetrics, languageBreakdown } =
        report

    // ── Header ─────────────────────────────────────────────────────────────────
    console.log()
    console.log(
        chalk.bold.cyan('blend-telemetry') +
            chalk.dim(` v${meta.toolVersion}`) +
            chalk.dim('  ·  ') +
            chalk.dim(meta.packageName) +
            chalk.dim(`@${meta.packageVersion}`)
    )
    // Warn prominently when installed version differs from declared version
    if (meta.versionMismatch && meta.declaredVersion) {
        console.log(
            chalk.yellow('  ⚠ Version mismatch: ') +
                chalk.yellow(`package.json declares ${meta.declaredVersion} `) +
                chalk.yellow(
                    `but node_modules has ${meta.packageVersion} installed.`
                ) +
                chalk.dim(' Run yarn/npm install to sync.')
        )
    }
    console.log(
        chalk.dim(
            `Scanned ${meta.totalFilesScanned} files in ${(meta.scanDurationMs / 1000).toFixed(2)}s`
        ) +
            chalk.dim('  ·  ') +
            chalk.dim(meta.projectRoot)
    )
    console.log()

    // ── Summary box ────────────────────────────────────────────────────────────
    const isRescriptProject = languageBreakdown.rescript.files > 0
    console.log(divider())
    const rows = [
        [
            `${bold('Components Available')}   ${chalk.white(summary.totalComponentsAvailable)}`,
            `${bold('Adoption Rate')}   ${pct(summary.adoptionRate)}`,
        ],
        [
            `${bold('Components Used')}        ${chalk.white(summary.totalComponentsUsed)}`,
            `${bold('Total Usages')}   ${chalk.white(summary.totalUsageCount)}`,
        ],
        [
            `${bold('Files with Blend')}       ${chalk.white(summary.filesWithBlendUsage)}`,
            isRescriptProject
                ? `${bold('Migration')}      ${pct(migrationMetrics.migrationCompletionRate)}`
                : '',
        ],
    ]
    for (const [left, right] of rows) {
        console.log(`  ${left.padEnd(42)}${right}`)
    }
    console.log(divider())
    console.log()

    // ── Language breakdown ─────────────────────────────────────────────────────
    const langs = [
        { name: 'ReScript', data: languageBreakdown.rescript },
        { name: 'TypeScript', data: languageBreakdown.typescript },
        { name: 'JavaScript', data: languageBreakdown.javascript },
    ].filter((l) => l.data.files > 0)

    if (langs.length > 0) {
        console.log(bold('Language Breakdown'))
        for (const { name, data } of langs) {
            console.log(
                `  ${name.padEnd(12)} ${bar(data.percentage)} ` +
                    `${String(data.files).padStart(4)} files  ${String(data.usages).padStart(5)} usages`
            )
        }
        console.log()
    }

    // ── Top components ─────────────────────────────────────────────────────────
    console.log(bold('Top Components by Usage'))
    for (const comp of summary.topComponents) {
        console.log(
            `  ${comp.name.padEnd(20)} ${bar(comp.percentage)} ` +
                `${String(comp.count).padStart(5)}  ${pct(comp.percentage)}`
        )
    }
    console.log()

    // ── Unused components ──────────────────────────────────────────────────────
    if (summary.unusedComponents.length > 0) {
        const listed = summary.unusedComponents.slice(0, 12).join(', ')
        const more =
            summary.unusedComponents.length > 12
                ? chalk.dim(` +${summary.unusedComponents.length - 12} more`)
                : ''
        console.log(bold(`Never Used (${summary.unusedComponents.length})`))
        console.log(`  ${chalk.dim(listed)}${more}`)
        console.log()
    }

    // ── Migration status — only meaningful for ReScript projects ─────────────
    if (
        isRescriptProject &&
        (migrationMetrics.adapterPatternFiles > 0 ||
            migrationMetrics.directBlendFiles > 0)
    ) {
        console.log(bold('Migration Status'))
        const { componentsByMigrationStatus: s } = migrationMetrics
        if (s.fullyMigrated.length > 0) {
            console.log(
                `  ${chalk.green('✓ Fully migrated:')}  ${s.fullyMigrated.slice(0, 8).join(', ')}`
            )
        }
        if (s.partiallyMigrated.length > 0) {
            console.log(
                `  ${chalk.yellow('~ Partial:')}         ${s.partiallyMigrated.slice(0, 8).join(', ')}`
            )
        }
        if (s.adapterOnly.length > 0) {
            console.log(
                `  ${chalk.red('✗ Adapter-only:')}    ${s.adapterOnly.slice(0, 8).join(', ')}`
            )
        }
        console.log(
            `  Adapter files: ${migrationMetrics.adapterPatternFiles}  ` +
                `Direct files: ${migrationMetrics.directBlendFiles}  ` +
                `Wrappers: ${migrationMetrics.wrapperFiles}`
        )
        console.log()
    }

    // ── Verbose: per-file table ────────────────────────────────────────────────
    if (config.verbose && fileMetrics.length > 0) {
        console.log(bold('File Breakdown (top 20)'))
        const table = new Table({
            head: ['File', 'Lang', 'Components', 'Usages', 'Type'],
            style: { head: ['cyan'], border: ['dim'] },
            colWidths: [50, 6, 14, 8, 10],
        })

        for (const f of fileMetrics.slice(0, 20)) {
            const type = f.isAdapter
                ? 'adapter'
                : f.isWrapper
                  ? 'wrapper'
                  : 'direct'
            table.push([
                f.relativePath.length > 48
                    ? '…' + f.relativePath.slice(-47)
                    : f.relativePath,
                f.language.slice(0, 2).toUpperCase(),
                f.components.slice(0, 3).join(', ') +
                    (f.components.length > 3 ? '…' : ''),
                String(f.totalUsages),
                type,
            ])
        }

        console.log(table.toString())
        console.log()
    }

    // ── CI result ──────────────────────────────────────────────────────────────
    if (report.ci) {
        const { ci } = report
        if (ci.passed) {
            console.log(chalk.green.bold('✓ CI checks passed'))
        } else {
            console.log(chalk.red.bold('✗ CI checks FAILED'))
            for (const f of ci.failures) {
                console.log(chalk.red(`  • ${f}`))
            }
        }
        for (const w of ci.warnings) {
            console.log(chalk.yellow(`  ⚠ ${w}`))
        }
        console.log()
    }

    // ── Footer ─────────────────────────────────────────────────────────────────
    if (report.meta.filesWithParseErrors > 0) {
        console.log(
            chalk.dim(
                `  ⚠ ${report.meta.filesWithParseErrors} file(s) had parse errors and were skipped.`
            )
        )
    }

    console.log(chalk.dim(`  Generated ${report.meta.generatedAt}`))
    console.log()
}
