/**
 * CLI Logger
 *
 * Clean, minimal output utilities for the CLI.
 */

import pc from 'picocolors'

export const logger = {
    info(message: string) {
        console.log(pc.cyan('i'), message)
    },

    success(message: string) {
        console.log(pc.green('✓'), message)
    },

    warn(message: string) {
        console.log(pc.yellow('!'), message)
    },

    error(message: string) {
        console.log(pc.red('✗'), message)
    },

    /** Indented detail line */
    detail(message: string) {
        console.log(`  ${pc.dim(message)}`)
    },

    /** Blank line */
    newline() {
        console.log()
    },

    /** Section header */
    header(title: string) {
        console.log()
        console.log(pc.bold(title))
        console.log(pc.dim('─'.repeat(title.length)))
    },

    /** File written notification */
    fileWritten(path: string) {
        console.log(pc.green('  +'), pc.dim(path))
    },

    /** File unchanged */
    fileSkipped(path: string) {
        console.log(pc.dim('  ·'), pc.dim(path), pc.dim('(unchanged)'))
    },
}
