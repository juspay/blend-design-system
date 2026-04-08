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
 *   npx blend-token-studio brand --preset hdfc     # use a preset
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

const program = new Command()

program
    .name('blend-token-studio')
    .description('Blend Token Studio — scaffold, brand, and sync design tokens')
    .version('0.1.0')

// ---------------------------------------------------------------------------
// init — scaffold a new project
// ---------------------------------------------------------------------------

program
    .command('init')
    .description('Scaffold Blend Token Studio in your project')
    .option('-d, --defaults', 'Skip prompts, use defaults')
    .option('-f, --force', 'Overwrite existing files')
    .action(async (options) => {
        await initCommand(options)
    })

// ---------------------------------------------------------------------------
// brand — apply a brand
// ---------------------------------------------------------------------------

program
    .command('brand')
    .description('Apply a brand to your project')
    .option(
        '-p, --preset <name>',
        'Use a built-in preset (blend, hdfc, neobank, fintech)'
    )
    .option('--primary <hex>', 'Primary brand color (hex)')
    .option(
        '--radius <style>',
        'Border radius style (sharp, default, rounded, pill)'
    )
    .action(async (options) => {
        await brandCommand(options)
    })

// ---------------------------------------------------------------------------
// diff — compare overrides vs defaults
// ---------------------------------------------------------------------------

program
    .command('diff')
    .description('Show overrides from Blend defaults')
    .action(async () => {
        await diffCommand()
    })

// ---------------------------------------------------------------------------
// validate — check brand.json
// ---------------------------------------------------------------------------

program
    .command('validate')
    .description('Validate your brand.json configuration')
    .action(async () => {
        await validateCommand()
    })

// ---------------------------------------------------------------------------
// generate — offline token generation
// ---------------------------------------------------------------------------

program
    .command('generate <input>')
    .description('Generate tokens from a local brand.json file')
    .option('-o, --output <dir>', 'Output directory', 'src/blend')
    .action(async (input, options) => {
        await generateCommand(input, options)
    })

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

program.parse()
