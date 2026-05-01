#!/usr/bin/env node

/**
 * blend-studio CLI (npm package `blend-studio`; bin alias `blend-studio`)
 *
 * The developer-facing tool for Blend Token Studio.
 * Inspired by shadcn/ui CLI — one command to scaffold,
 * one command to brand.
 *
 * Usage:
 *   npx blend-studio init                    # scaffold project
 *   npx blend-studio init --env staging       # explicit Studio deployment URL preset
 *   npx blend-studio brand                   # interactive branding
 *   npx blend-studio brand --preset juspay   # use a preset
 *   npx blend-studio pull juspay/default     # pull from studio
 *   npx blend-studio push                    # push to studio
 *   npx blend-studio list                    # list branches
 *   npx blend-studio diff                    # see overrides
 *   npx blend-studio validate                # validate brand.json
 *   npx blend-studio generate ./brand.json   # offline generation (TypeScript)
 *   npx blend-studio generate ./brand.json --language rescript  # ReScript module
 *
 * From monorepo root (after pnpm install): use a real brand path or the sample fixture, e.g.
 *   pnpm exec blend-studio generate packages/cli/fixtures/sample-brand.json --language rescript -o ./out/blend
 */

import { Command, Option } from 'commander'
import { normalizeArgvForPullVersion } from './utils/normalize-pull-argv'

const program = new Command()

program
    .name('blend-studio')
    .description('Blend Token Studio — scaffold, brand, and sync design tokens')
    .version('0.1.0')

program
    .command('init')
    .description('Scaffold Blend Token Studio in your project')
    .option('-d, --defaults', 'Skip prompts, use defaults')
    .option('-f, --force', 'Overwrite existing files')
    .addOption(
        new Option(
            '--env <deployment>',
            'Studio deployment preset for blend.config.json (staging recommended until production is live)'
        ).choices(['staging', 'prod', 'production'])
    )
    .action(async (options) => {
        const { initCommand } = await import('./commands/init')
        await initCommand(options)
    })

program
    .command('brand')
    .description('Apply a brand to your project')
    .option(
        '-p, --preset <name>',
        'Use a built-in preset (blend, juspay, purple, green, orange)'
    )
    .option('--primary <hex>', 'Primary brand color (hex)')
    .option(
        '--radius <style>',
        'Border radius style (sharp, default, rounded, pill)'
    )
    .action(async (options) => {
        const { brandCommand } = await import('./commands/brand')
        await brandCommand(options)
    })

program
    .command('pull <branchId>')
    .description('Pull a brand config from Blend Token Studio')
    .option('--branch-version <version>', 'Specific published branch version')
    .option('-t, --theme <theme>', 'Theme to resolve (light or dark)', 'light')
    .option('-o, --output <dir>', 'Output directory')
    .option(
        '-l, --language <lang>',
        'Output language (typescript, rescript)',
        'typescript'
    )
    .option('--ci', 'CI mode (no prompts, non-zero exit on failure)')
    .option(
        '--skip-init',
        'Fail if blend.config.json is missing instead of creating a minimal default'
    )
    .option('--format <format>', 'Output format (pretty, json)', 'pretty')
    .action(async (branchId, options) => {
        const { pullCommand } = await import('./commands/pull')
        await pullCommand(branchId, {
            ...options,
            // Back-compat: if legacy --version was rewritten, map it.
            version: options.branchVersion ?? options.version,
        })
    })

program
    .command('push [branchId]')
    .description('Push local brand.json to Blend Token Studio')
    .option('-n, --new', 'Create branch if it does not exist')
    .option('-p, --publish', 'Publish a new version after pushing')
    .option('--major', 'Bump major version')
    .option('--minor', 'Bump minor version')
    .option('--patch', 'Bump patch version')
    .option('-c, --changelog <text>', 'Changelog for the version')
    .option('--ci', 'CI mode (no prompts; default patch bump when publishing)')
    .option('--format <format>', 'Output format (pretty, json)', 'pretty')
    .action(async (branchId, options) => {
        const { pushCommand } = await import('./commands/push')
        await pushCommand(branchId, options)
    })

program
    .command('list')
    .alias('ls')
    .description('List available branches from Blend Token Studio')
    .option(
        '--status <status>',
        'Filter by status (draft, published, archived)'
    )
    .option(
        '--visibility <visibility>',
        'Filter by visibility (private, team, public)'
    )
    .option('-s, --search <query>', 'Search by name')
    .option('--json', 'Output as JSON (same as --format json)')
    .option('--format <format>', 'Output format (pretty, json)', 'pretty')
    .option('--ci', 'CI mode (non-zero exit on failure)')
    .option('-l, --limit <number>', 'Limit number of results', '50')
    .action(async (options) => {
        const { listCommand } = await import('./commands/list')
        await listCommand({
            ...options,
            limit: options.limit ? parseInt(options.limit, 10) : 50,
        })
    })

program
    .command('login')
    .description('Authenticate with Blend Token Studio')
    .option('-t, --token <token>', 'Firebase ID token')
    .action(async (options) => {
        const { loginCommand } = await import('./commands/login')
        await loginCommand(options)
    })

program
    .command('logout')
    .description('Clear authentication')
    .action(async () => {
        const { logoutCommand } = await import('./commands/login')
        await logoutCommand()
    })

program
    .command('whoami')
    .description('Show current authenticated user')
    .action(async () => {
        const { whoamiCommand } = await import('./commands/login')
        await whoamiCommand()
    })

program
    .command('diff')
    .description('Show overrides from Blend defaults')
    .action(async () => {
        const { diffCommand } = await import('./commands/diff')
        await diffCommand()
    })

program
    .command('validate')
    .description('Validate your brand.json configuration')
    .option('--json', 'Output as JSON (same as --format json)')
    .option('--format <format>', 'Output format (pretty, json)', 'pretty')
    .option('--ci', 'CI mode (non-zero exit on validation failure)')
    .action(async (options) => {
        const { validateCommand } = await import('./commands/validate')
        await validateCommand(options)
    })

program
    .command('generate <input>')
    .description('Generate tokens from a local brand.json file')
    .option('-o, --output <dir>', 'Output directory', 'src/blend')
    .addOption(
        new Option(
            '-l, --language <lang>',
            'Output language (typescript, rescript)'
        )
            .choices(['typescript', 'ts', 'rescript', 're'])
            .default('typescript')
    )
    .action(async (input, options) => {
        const { generateCommand } = await import('./commands/generate')
        await generateCommand(input, options)
    })

program
    .command('preview')
    .description('Open a local preview server with live component showcase')
    .option('-p, --port <port>', 'Port number', '3456')
    .option('--no-open', 'Do not open browser automatically')
    .action(async (options) => {
        const { previewCommand } = await import('./commands/preview')
        await previewCommand({
            port: parseInt(options.port, 10),
            open: options.open,
        })
    })

// ---------------------------------------------------------------------------
// Global Error Handling
// ---------------------------------------------------------------------------

process.on('uncaughtException', (error) => {
    console.error('\n\x1b[31mUnexpected error:\x1b[0m', error.message)
    if (process.env.DEBUG) {
        console.error(error.stack)
    }
    process.exit(1)
})

process.on('unhandledRejection', (reason) => {
    const message = reason instanceof Error ? reason.message : String(reason)
    console.error('\n\x1b[31mUnhandled rejection:\x1b[0m', message)
    if (process.env.DEBUG && reason instanceof Error) {
        console.error(reason.stack)
    }
    process.exit(1)
})

program.parse(normalizeArgvForPullVersion(process.argv))
