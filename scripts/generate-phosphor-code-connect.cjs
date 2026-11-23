/**
 * Generate Figma Code Connect for all 1,512 Phosphor Icons.
 *
 * Each icon in the Phosphor Figma file is a COMPONENT_SET with two variant
 * properties:
 *   - Format: Stroke | Outline  (Figma rendering detail, no React equivalent)
 *   - Weight: Bold | Duotone | Fill | Light | Regular | Thin
 *
 * The Weight variant maps 1:1 (case-lowered) to the React `weight` prop
 * (IconWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone").
 */

const fs = require('fs')
const path = require('path')

const FIGMA_FILE = 'HZCDeFFrwEYEYgWiXm0Mbz'
const OUTPUT_DIR = path.resolve(__dirname, '../apps/storybook/stories/icons')
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'phosphor.figma.tsx')
const INPUT_FILE = path.join(__dirname, 'phosphor-icons-sets.json')

const icons = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'))

console.log(`Generating ${icons.length} connections in phosphor.figma.tsx…`)

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

const splitFiles = fs
    .readdirSync(OUTPUT_DIR)
    .filter((file) => /^phosphor(?:-regular)?-\d+\.figma\.tsx$/.test(file))
splitFiles.forEach((file) => {
    fs.unlinkSync(path.join(OUTPUT_DIR, file))
    console.log(`  removed split file ${file}`)
})

const importNames = icons.map((icon) => `${icon.name}Icon`)

const connects = icons
    .map((icon) => {
        const nodeUrl = `https://www.figma.com/design/${FIGMA_FILE}/Phosphor-Icons?node-id=${icon.nodeId.replace(':', '-')}`
        return `
figma.connect(
    ${icon.name}Icon,
    '${nodeUrl}',
    {
        props: {
            weight: figma.enum('Weight', {
                Bold: 'bold',
                Duotone: 'duotone',
                Fill: 'fill',
                Light: 'light',
                Regular: 'regular',
                Thin: 'thin',
            }),
        },
        example: ({ weight }) => (
            <${icon.name}Icon size={32} color="currentColor" weight={weight} />
        ),
        imports: [
            "import { ${icon.name}Icon } from '@phosphor-icons/react'",
        ],
    },
)`
    })
    .join('\n')

const content = `/**
 * Phosphor Icons — Code Connect (component sets).
 *
 * Each Figma component set has variants: Format (Stroke|Outline) and
 * Weight (Bold|Duotone|Fill|Light|Regular|Thin).  Weight maps to the
 * React \`weight\` prop; Format is a Figma rendering detail with no
 * React equivalent and is left unmapped.
 *
 * @see https://phosphoricons.com
 */

import React from 'react'
import { figma } from '@figma/code-connect'
import {
${importNames.map((name) => `    ${name},`).join('\n')}
} from '@phosphor-icons/react'

${connects}
`

fs.writeFileSync(OUTPUT_FILE, content, 'utf8')

console.log(
    `Done. ${icons.length} connections written to ${path.relative(process.cwd(), OUTPUT_FILE)}`
)
