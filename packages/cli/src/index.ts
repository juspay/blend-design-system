#!/usr/bin/env node

/**
 * blend-token-studio CLI
 *
 * The developer-facing tool for Blend Token Studio.
 * Inspired by shadcn/ui CLI — one command to scaffold,
 * one command to brand.
 *
 * Usage:
 *   npx blend-token-studio init                    # scaffold project
 *   npx blend-token-studio brand                   # interactive branding
 *   npx blend-token-studio brand --preset juspay   # use a preset
 *   npx blend-token-studio pull juspay/default     # pull from studio
 *   npx blend-token-studio push                    # push to studio
 *   npx blend-token-studio list                    # list branches
 *   npx blend-token-studio diff                    # see overrides
 *   npx blend-token-studio validate                # validate brand.json
 *   npx blend-token-studio generate ./brand.json   # offline generation
 */

import { Command } from 'commander'
import { initCommand } from './commands/init'
import { brandCommand } from './commands/brand'
import { diffCommand } from './commands/diff'
import { validateCommand } from './commands/validate'
import { generateCommand } from './commands/generate'
import { pullCommand } from './commands/pull'
import { pushCommand } from './commands/push'
import { listCommand } from './commands/list'
import { loginCommand, logoutCommand, whoamiCommand } from './commands/login'

const program = new Command()

program
    .name('blend-token-studio')
    .description('Blend Token Studio — scaffold, brand, and sync design tokens')
    .version('0.1.0')

program
    .command('init')
    .description('Scaffold Blend Token Studio in your project')
    .option('-d, --defaults', 'Skip prompts, use defaults')
    .option('-f, --force', 'Overwrite existing files')
    .action(async (options) => {
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
        await brandCommand(options)
    })

program
    .command('pull <branchId>')
    .description('Pull a brand config from Blend Token Studio')
    .option('-v, --version <version>', 'Specific version to pull')
    .option('-t, --theme <theme>', 'Theme to resolve (light or dark)', 'light')
    .option('-o, --output <dir>', 'Output directory')
    .action(async (branchId, options) => {
        await pullCommand(branchId, options)
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
    .action(async (branchId, options) => {
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
    .option('--json', 'Output as JSON')
    .option('-l, --limit <number>', 'Limit number of results', '50')
    .action(async (options) => {
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
        await loginCommand(options)
    })

program
    .command('logout')
    .description('Clear authentication')
    .action(async () => {
        await logoutCommand()
    })

program
    .command('whoami')
    .description('Show current authenticated user')
    .action(async () => {
        await whoamiCommand()
    })

program
    .command('diff')
    .description('Show overrides from Blend defaults')
    .action(async () => {
        await diffCommand()
    })

program
    .command('validate')
    .description('Validate your brand.json configuration')
    .action(async () => {
        await validateCommand()
    })

program
    .command('generate <input>')
    .description('Generate tokens from a local brand.json file')
    .option('-o, --output <dir>', 'Output directory', 'src/blend')
    .action(async (input, options) => {
        await generateCommand(input, options)
    })

import { previewCommand } from './commands/preview'

program
    .command('preview')
    .description('Open a local preview server with live component showcase')
    .option('-p, --port <port>', 'Port number', '3456')
    .option('--no-open', 'Do not open browser automatically')
    .action(async (options) => {
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

program.parse()
