#!/usr/bin/env node

import { execSync } from 'node:child_process'
import {
    cpSync,
    existsSync,
    mkdirSync,
    readFileSync,
    rmSync,
    writeFileSync,
} from 'node:fs'
import { join } from 'node:path'

const repoRoot = process.cwd()
const tmpRoot = join(repoRoot, '.tmp', 'token-studio-npm-smoke')
const tarballDir = join(tmpRoot, 'tarballs')

const run = (cmd, cwd = repoRoot, extraEnv = {}) => {
    execSync(cmd, {
        cwd,
        stdio: 'inherit',
        env: { ...process.env, CI: '1', ...extraEnv },
    })
}

const runCapture = (cmd, cwd = repoRoot, extraEnv = {}) =>
    execSync(cmd, {
        cwd,
        stdio: ['ignore', 'pipe', 'inherit'],
        env: { ...process.env, CI: '1', ...extraEnv },
    })
        .toString()
        .trim()

const assertFile = (path) => {
    if (!existsSync(path)) {
        throw new Error(`Expected file not found: ${path}`)
    }
}

const packPackage = (packageDir, patchPackageJson) => {
    const packDir = patchPackageJson
        ? join(tmpRoot, 'pack', packageDir.split('/').pop())
        : packageDir

    if (patchPackageJson) {
        rmSync(packDir, { recursive: true, force: true })
        mkdirSync(packDir, { recursive: true })
        cpSync(packageDir, packDir, { recursive: true })

        const pkgPath = join(packDir, 'package.json')
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
        const nextPkg = patchPackageJson(pkg)
        writeFileSync(pkgPath, JSON.stringify(nextPkg, null, 4) + '\n')
    }

    const output = runCapture(`npm pack --json`, packDir)
    const parsed = JSON.parse(output)
    const fileName = parsed?.[0]?.filename
    if (!fileName) {
        throw new Error(`Could not parse npm pack output for ${packageDir}`)
    }
    return join(packDir, fileName)
}

const setupConsumerWithNpm = (consumerDir, tarballs) => {
    run(`npm init -y`, consumerDir)
    run(
        `npm install react react-dom styled-components "${tarballs.blend}" "${tarballs.cli}"`,
        consumerDir
    )
}

const setupConsumerWithPnpm = (consumerDir, tarballs) => {
    const pnpmHome = join(tmpRoot, '.pnpm-home')
    const pnpmStoreDir = join(tmpRoot, '.pnpm-store')
    const pnpmEnv = {
        PNPM_HOME: pnpmHome,
        PNPM_STORE_DIR: pnpmStoreDir,
        XDG_CONFIG_HOME: join(tmpRoot, '.xdg-config'),
        XDG_DATA_HOME: join(tmpRoot, '.xdg-data'),
        XDG_CACHE_HOME: join(tmpRoot, '.xdg-cache'),
    }

    run(`pnpm init`, consumerDir, pnpmEnv)
    rmSync(join(consumerDir, 'node_modules'), { recursive: true, force: true })
    rmSync(join(consumerDir, 'pnpm-lock.yaml'), { force: true })
    run(
        `pnpm add react react-dom styled-components "${tarballs.blend}" "${tarballs.cli}"`,
        consumerDir,
        pnpmEnv
    )
}

const runCliFlow = (consumerDir) => {
    run(`npx blend-token-studio init --defaults --force`, consumerDir)
    run(`npx blend-token-studio brand --preset blend`, consumerDir)
    run(`npx blend-token-studio validate`, consumerDir)

    assertFile(join(consumerDir, 'blend.config.json'))
    assertFile(join(consumerDir, 'src', 'blend', 'provider.tsx'))
    assertFile(join(consumerDir, 'src', 'blend', 'tokens.ts'))
    assertFile(join(consumerDir, 'src', 'blend', 'brand.json'))
}

const main = () => {
    rmSync(tmpRoot, { recursive: true, force: true })
    mkdirSync(tarballDir, { recursive: true })

    console.log('\n[smoke] Building required packages...\n')
    run(`pnpm --filter @juspay/blend-design-system build`, repoRoot)
    run(`pnpm --filter blend-token-studio build`, repoRoot)

    console.log('\n[smoke] Packing tarballs...\n')
    const blendDir = join(repoRoot, 'packages', 'blend')
    const cliDir = join(repoRoot, 'packages', 'cli')

    const packed = {
        blend: packPackage(blendDir),
        cli: packPackage(cliDir, (pkg) => {
            const next = { ...pkg }
            next.dependencies = { ...(next.dependencies || {}) }
            next.dependencies['@juspay/blend-design-system'] = '^0.0.37-beta.1'
            return next
        }),
    }

    const tarballs = {
        blend: join(tarballDir, 'blend.tgz'),
        cli: join(tarballDir, 'cli.tgz'),
    }

    run(`cp "${packed.blend}" "${tarballs.blend}"`)
    run(`cp "${packed.cli}" "${tarballs.cli}"`)

    run(`rm -f "${packed.blend}" "${packed.cli}"`)

    console.log('\n[smoke] Running npm consumer test...\n')
    const npmConsumer = join(tmpRoot, 'consumer-npm')
    mkdirSync(npmConsumer, { recursive: true })
    setupConsumerWithNpm(npmConsumer, tarballs)
    runCliFlow(npmConsumer)

    const shouldRunPnpm = process.env.TOKEN_STUDIO_SMOKE_PNPM === '1'
    const pnpmConsumer = join(tmpRoot, 'consumer-pnpm')

    if (shouldRunPnpm) {
        console.log('\n[smoke] Running pnpm consumer test...\n')
        mkdirSync(pnpmConsumer, { recursive: true })
        setupConsumerWithPnpm(pnpmConsumer, tarballs)
        runCliFlow(pnpmConsumer)
    } else {
        console.log(
            '\n[smoke] Skipping pnpm consumer test (set TOKEN_STUDIO_SMOKE_PNPM=1 to enable).\n'
        )
    }

    const npmBrand = JSON.parse(
        readFileSync(join(npmConsumer, 'src', 'blend', 'brand.json'), 'utf-8')
    )
    const pnpmBrand = shouldRunPnpm
        ? JSON.parse(
              readFileSync(
                  join(pnpmConsumer, 'src', 'blend', 'brand.json'),
                  'utf-8'
              )
          )
        : { brandId: 'skipped' }

    if (!npmBrand.brandId || !pnpmBrand.brandId) {
        throw new Error('Generated brand.json is missing brandId')
    }

    console.log('\n[smoke] PASS: npm-like consumer flows succeeded.\n')
}

main()
