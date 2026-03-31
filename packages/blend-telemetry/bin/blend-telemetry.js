#!/usr/bin/env node
'use strict'

// Validate Node version before loading anything else
const [major] = process.versions.node.split('.').map(Number)
if (major < 18) {
    console.error(
        `\nblend-telemetry requires Node.js >= 18. You are running ${process.version}.\n`
    )
    process.exit(1)
}

require('../dist/cli.js')
