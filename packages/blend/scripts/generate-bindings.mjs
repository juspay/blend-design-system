#!/usr/bin/env node

/**
 * AI ReScript Bindings Generator
 *
 * Scans a React component directory, reads the .tsx and types.ts files,
 * and uses NeuroLink to generate ReScript bindings.
 *
 * Usage: node generate-bindings.mjs --component Button
 */

import dotenv from 'dotenv'
import { NeuroLink } from '@juspay/neurolink'
import {
    readFileSync,
    existsSync,
    writeFileSync,
    mkdirSync,
    readdirSync,
} from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BLEND_ROOT = join(__dirname, '..')

// Explicitly load .env from the package root
dotenv.config({ path: join(BLEND_ROOT, '.env') })

console.log('\n')
console.log('kwebfkwf', process.env.TEST_KEY)
console.log('\n')

// Ensure paths are relative to the script location assuming it's in packages/blend/scripts
const COMPONENTS_DIR = join(BLEND_ROOT, 'lib', 'components')
const BINDINGS_DIR = join(BLEND_ROOT, 'bindings')

const CONFIG = {
    provider: 'litellm',
    model: 'kimi-latest',
}

const INSTRUCTIONS_FILE = join(__dirname, 'bindings-instructions.md')
const INSTRUCTIONS_CONTENT = readFileSync(INSTRUCTIONS_FILE, 'utf-8')

const SYSTEM_PROMPT = `You are an expert ReScript and React developer. Your task is to generate ReScript bindings for a given React component written in TypeScript/TSX.

Here is the source of truth for your rules and examples:
=========================================
${INSTRUCTIONS_CONTENT}
=========================================

- Do not output any explanation. Output ONLY the raw ReScript code inside a JSON response or markdown block so it can be extracted.
- Response format MUST be a JSON object:
{
  "success": true,
  "rescriptCode": "..."
}
`

class BindingsGenerator {
    constructor(options) {
        this.component = options.component
        this.all = options.all || false
        this.neurolink = null
    }

    log(level, message) {
        const prefix =
            {
                info: 'ℹ️ ',
                success: '✅',
                error: '❌',
                warn: '⚠️ ',
                phase: '🔄',
            }[level] || ''
        console.log(`${prefix} ${message}`)
    }

    async initialize() {
        this.log('phase', 'Initializing NeuroLink...')
        this.neurolink = new NeuroLink({
            provider: CONFIG.provider,
            model: CONFIG.model,
        })

        if (!existsSync(BINDINGS_DIR)) {
            mkdirSync(BINDINGS_DIR, { recursive: true })
        }
    }

    getComponentFiles(componentName) {
        const compDir = join(COMPONENTS_DIR, componentName)
        if (!existsSync(compDir)) {
            throw new Error(`Component directory not found: ${compDir}`)
        }

        const files = {}
        const mainTsxPath = join(compDir, `${componentName}.tsx`)
        const typesTsPath = join(compDir, 'types.ts')

        if (existsSync(mainTsxPath)) {
            files[`${componentName}.tsx`] = readFileSync(mainTsxPath, 'utf-8')
        } else {
            // Fallback: look for other .tsx files
            const dirFiles = readdirSync(compDir)
            for (const file of dirFiles) {
                if (file.endsWith('.tsx')) {
                    files[file] = readFileSync(join(compDir, file), 'utf-8')
                } else if (
                    file.endsWith('.ts') &&
                    file !== 'index.ts' &&
                    file !== 'types.ts'
                ) {
                    files[file] = readFileSync(join(compDir, file), 'utf-8')
                }
            }
        }

        if (existsSync(typesTsPath)) {
            files['types.ts'] = readFileSync(typesTsPath, 'utf-8')
        }

        if (Object.keys(files).length === 0) {
            throw new Error(
                `No relevant .tsx or types.ts found for component ${componentName}`
            )
        }

        return files
    }

    parseJSON(content) {
        try {
            const jsonMatch = content.match(/\{[\s\S]*\}/)
            if (jsonMatch) return JSON.parse(jsonMatch[0])

            const codeBlockMatch = content.match(
                /```(?:json)?\s*(\{[\s\S]*?\})\s*```/
            )
            if (codeBlockMatch) return JSON.parse(codeBlockMatch[1])

            return { success: false, error: 'No valid JSON found in response' }
        } catch (e) {
            return { success: false, error: e.message }
        }
    }

    async processComponent(componentName) {
        this.log('phase', `Generating bindings for ${componentName}...`)

        let files
        try {
            files = this.getComponentFiles(componentName)
        } catch (e) {
            this.log('error', e.message)
            return false
        }

        let fileContext = ''
        for (const [fileName, content] of Object.entries(files)) {
            fileContext += `\n### File: ${fileName}\n\`\`\`typescript\n${content}\n\`\`\`\n`
        }

        const prompt = `Generate a ReScript binding for the component "${componentName}".
Here are the relevant source files:
${fileContext}

Please return the output as a JSON object matching the requested format.
Ensure the binding module specifies \`@module("@juspay/blend-design-system")\` or whatever the accurate import path would be for the library consumer.
`

        try {
            const result = await this.neurolink.generate({
                input: { text: prompt },
                systemPrompt: SYSTEM_PROMPT,
                provider: CONFIG.provider,
                model: CONFIG.model,
            })

            const parsed = this.parseJSON(result.content)

            if (parsed.success && parsed.rescriptCode) {
                const destPath = join(BINDINGS_DIR, `${componentName}.res`)
                writeFileSync(destPath, parsed.rescriptCode.trim(), 'utf-8')
                this.log(
                    'success',
                    `Generated bindings for ${componentName} -> ${destPath}`
                )
                return true
            } else {
                this.log(
                    'error',
                    `Failed to parse generated bindings for ${componentName}: ${parsed.error || 'Missing rescriptCode'}`
                )
                return false
            }
        } catch (e) {
            this.log(
                'error',
                `AI generation failed for ${componentName}: ${e.message}`
            )
            return false
        }
    }

    async run() {
        await this.initialize()

        if (this.component) {
            await this.processComponent(this.component)
        } else if (this.all) {
            const components = readdirSync(COMPONENTS_DIR, {
                withFileTypes: true,
            })
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name)

            this.log(
                'info',
                `Found ${components.length} components. Generating bindings...`
            )
            for (const comp of components) {
                await this.processComponent(comp)
            }
        } else {
            this.log(
                'error',
                'No target specified. Use --component <Name> or --all'
            )
            process.exit(1)
        }
    }
}

function parseArgs() {
    const args = process.argv.slice(2)
    const options = {}

    for (let i = 0; i < args.length; i++) {
        const arg = args[i]
        if (arg === '--component' || arg === '-c') {
            options.component = args[i + 1]
            i++
        } else if (arg === '--all') {
            options.all = true
        }
    }
    return options
}

const options = parseArgs()
if (!options.component && !options.all) {
    console.log(
        'Usage: node generate-bindings.mjs --component <ComponentName> [or --all]'
    )
    process.exit(1)
}

const generator = new BindingsGenerator(options)
generator.run().catch(console.error)
