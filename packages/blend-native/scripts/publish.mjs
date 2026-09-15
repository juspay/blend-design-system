#!/usr/bin/env node
/**
 * Manual publish runbook for blend-native.
 *
 * The workflow (.github/workflows/publish-native-npm.yml) is the primary
 * release path, but it breaks in two ways this script covers:
 *
 *   1. Its NPM_TOKEN can be invalid or belong to an account without rights
 *      to the unscoped `blend-native` package — npm answers that with a
 *      confusing `404 Not Found - PUT` on publish.
 *   2. Its version gate refuses `-beta.N` versions under the `latest`
 *      dist-tag, which is occasionally exactly what you want to ship.
 *
 * This script replicates the workflow locally: auth + ownership check,
 * version/branch/format gates, the full pre-flight (web build first, then
 * lint, typecheck, tests, the peer floor check and bob build), and finally
 * `npm publish` with your own `npm login` credentials. 2FA is left to npm
 * itself: in an interactive terminal it opens the browser for web auth (or
 * prompts for a code) when the publish request needs it.
 *
 * Usage:
 *   node scripts/publish.mjs                            # interactive
 *   node scripts/publish.mjs --tag beta                 # publish under beta
 *   node scripts/publish.mjs --tag latest --force       # override the gates
 *   node scripts/publish.mjs --tag beta --otp 123456    # non-interactive OTP
 *   node scripts/publish.mjs --skip-install             # skip pnpm install
 *   node scripts/publish.mjs --skip-tests               # skip vitest + jest
 *   node scripts/publish.mjs --dry-run                  # gates + pre-flight only
 *   node scripts/publish.mjs --sync-other-tag           # move the other dist-tag too
 *   node scripts/publish.mjs --yes                      # skip the confirmation prompt
 *
 * It publishes whatever version is in packages/blend-native/package.json —
 * bump the version in a PR and merge it before running this.
 */

import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import readline from 'node:readline/promises'

const HERE = dirname(fileURLToPath(import.meta.url))
const PKG_ROOT = resolve(HERE, '..')
const REPO_ROOT = resolve(PKG_ROOT, '../..')

const pkg = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8'))
const NAME = pkg.name
const VERSION = pkg.version
const DEP = '@juspay/blend-design-system'

const USAGE = `Usage: node scripts/publish.mjs [options]

  --tag <beta|latest>   dist-tag to publish under (prompted if omitted)
  --otp <code>          npm 2FA one-time password — only needed when npm cannot
                        prompt itself (non-interactive terminal); normally npm
                        handles 2FA in-browser during publish
  --force               override the version-format and branch gates
  --sync-other-tag      also move the other dist-tag to this version
  --skip-install        skip \`pnpm install --frozen-lockfile\`
  --skip-tests          skip vitest + jest
  --dry-run             run gates + pre-flight, skip the actual publish
  --yes                 skip the confirmation prompt
  --help                show this help`

const fail = (message) => {
    console.error(`\n✖ ${message}`)
    process.exit(1)
}

const parseArgs = (argv) => {
    const opts = {}
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i]
        if (arg === '--tag' || arg === '--otp') {
            const value = argv[++i]
            if (!value || value.startsWith('--')) {
                fail(`${arg} expects a value\n\n${USAGE}`)
            }
            opts[arg.slice(2)] = value
        } else if (arg.startsWith('--')) {
            opts[arg.slice(2)] = true
        } else {
            fail(`Unknown argument: ${arg}\n\n${USAGE}`)
        }
    }
    return opts
}

const run = (label, cmd, cmdArgs, { cwd = REPO_ROOT, env = {} } = {}) => {
    console.log(`\n▸ ${label}`)
    const { status } = spawnSync(cmd, cmdArgs, {
        stdio: 'inherit',
        cwd,
        env: { ...process.env, ...env },
    })
    if (status !== 0) fail(`${label} failed — aborting`)
}

const capture = (cmd, cmdArgs, { cwd = REPO_ROOT } = {}) =>
    spawnSync(cmd, cmdArgs, { encoding: 'utf8', cwd })

const ask = async (question) => {
    if (!process.stdin.isTTY) {
        fail(
            `${question}\n  stdin is not interactive — pass --tag/--otp/--yes instead`
        )
    }
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    try {
        return (await rl.question(`${question} `)).trim()
    } finally {
        rl.close()
    }
}

const opts = parseArgs(process.argv.slice(2))
if (opts.help) {
    console.log(USAGE)
    process.exit(0)
}

// ── Gates ────────────────────────────────────────────────────────────────────

let tag = opts.tag
if (!tag) {
    tag = await ask('Publish under which dist-tag? (beta/latest)')
}
if (tag !== 'beta' && tag !== 'latest') {
    fail(`dist-tag must be "beta" or "latest" (got "${tag}")`)
}

const whoami = capture('npm', ['whoami'])
if (whoami.status !== 0) {
    fail(
        'Not logged in to npm — run `npm login` first. The account must own blend-native.'
    )
}
const user = whoami.stdout.trim()

const owners = capture('npm', ['owner', 'ls', NAME])
if (owners.status === 0) {
    const list = owners.stdout
        .split('\n')
        .map((line) => line.split(' ')[0])
        .filter(Boolean)
    if (!list.includes(user)) {
        fail(
            `Logged in as ${user}, but ${NAME} is owned by: ${list.join(', ')}. ` +
                `Publishing would 404. Ask an owner to run: npm owner add ${user} ${NAME}`
        )
    }
} else {
    console.log(`⚠ could not read owners of ${NAME} — continuing anyway`)
}

const isBetaVersion = /^\d+\.\d+\.\d+-beta\.\d+$/.test(VERSION)
const isStableVersion = /^\d+\.\d+\.\d+$/.test(VERSION)
if (tag === 'beta' && !isBetaVersion) {
    fail(
        `Version ${VERSION} is not beta-formatted (expected X.Y.Z-beta.N). ` +
            `Use --force to override.`
    )
}
if (tag === 'latest' && !isStableVersion) {
    if (!opts.force) {
        fail(
            `Version ${VERSION} is not stable-formatted (expected plain X.Y.Z) — ` +
                `the workflow would refuse this under "latest". Use --force to override.`
        )
    }
    console.log(
        `⚠ publishing ${VERSION} (beta-formatted) under "latest" — forced`
    )
}

const branch = capture('git', [
    'rev-parse',
    '--abbrev-ref',
    'HEAD',
]).stdout.trim()
if (!opts.force) {
    if (tag === 'latest' && branch !== 'main') {
        fail(
            `Stable (latest) publishes should run from main (got "${branch}"). ` +
                `Use --force to override.`
        )
    }
    if (tag === 'beta' && !['dev', 'staging'].includes(branch)) {
        fail(
            `Beta publishes should run from dev or staging (got "${branch}"). ` +
                `Use --force to override.`
        )
    }
}

const dirty = capture('git', [
    'status',
    '--porcelain',
    '--',
    PKG_ROOT,
]).stdout.trim()
if (dirty && !opts.force) {
    fail(
        `packages/blend-native has uncommitted changes:\n${dirty}\n` +
            `Commit or stash them first, or use --force.`
    )
}

const published = capture('npm', ['view', `${NAME}@${VERSION}`, 'version'])
if (published.status === 0) {
    fail(
        `${NAME}@${VERSION} is already on npm — a version can never be republished. ` +
            `Bump the version in a PR, merge it, then run this again.`
    )
}

// ── Plan + confirm ───────────────────────────────────────────────────────────

const steps = [
    ...(opts['skip-install'] ? [] : ['pnpm install']),
    `${DEP} build`,
    'lint',
    'typecheck',
    ...(opts['skip-tests'] ? [] : ['tests']),
    'peer floor check',
    'bob build',
    ...(opts['dry-run'] ? ['(dry run — publish skipped)'] : ['npm publish']),
]

console.log(`
Release plan
  Package:    ${NAME}
  Version:    ${VERSION}
  Dist-tag:   ${tag}
  Branch:     ${branch}
  Account:    ${user}
  Steps:      ${steps.join(' → ')}`)

if (!opts.yes) {
    const answer = await ask('Proceed? (y/N)')
    if (!/^y(es)?$/i.test(answer)) fail('Aborted')
}

// ── Pre-flight ───────────────────────────────────────────────────────────────

if (!opts['skip-install']) {
    run('pnpm install (frozen lockfile)', 'pnpm', [
        'install',
        '--frozen-lockfile',
    ])
}
run(`Build ${DEP} (workspace /node feeds typecheck + bob)`, 'pnpm', [
    '--filter',
    DEP,
    'build',
])
run('lint', 'pnpm', ['--filter', NAME, 'lint'])
run('typecheck', 'pnpm', ['--filter', NAME, 'typecheck'])
if (!opts['skip-tests']) {
    run('tests (vitest + jest)', 'pnpm', ['--filter', NAME, 'test'], {
        env: { CI: 'true' },
    })
}
run('peer floor check', 'pnpm', ['--filter', NAME, 'check:peer'])
run('bob build', 'pnpm', ['--filter', NAME, 'build'])

// ── Publish ──────────────────────────────────────────────────────────────────

if (opts['dry-run']) {
    console.log(`\n✔ dry run complete — ${NAME}@${VERSION} was NOT published`)
    process.exit(0)
}

let otp = opts.otp
if (otp && !/^\d{6}$/.test(otp)) {
    fail(`"--otp ${otp}" does not look like a 6-digit OTP`)
}

// Without --otp, npm runs its own 2FA in this terminal (browser-based web
// auth or an OTP prompt). That only works with a TTY — from a non-interactive
// context npm fails with EOTP and the flag above becomes necessary.
run(
    `npm publish --tag ${tag}`,
    'npm',
    [
        'publish',
        '--access',
        'public',
        '--tag',
        tag,
        ...(otp ? [`--otp=${otp}`] : []),
    ],
    { cwd: PKG_ROOT }
)

if (opts['sync-other-tag']) {
    const other = tag === 'beta' ? 'latest' : 'beta'
    run(`Move "${other}" tag to ${VERSION} as well`, 'npm', [
        'dist-tag',
        'add',
        `${NAME}@${VERSION}`,
        other,
    ])
}

const tags = capture('npm', ['view', NAME, 'dist-tags', '--json'])
console.log(`\n✔ ${NAME}@${VERSION} published under "${tag}"`)
console.log(`  dist-tags now: ${tags.stdout.trim()}`)
