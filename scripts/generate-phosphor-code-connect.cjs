/**
 * Generate Figma Code Connect files for all 1,512 Phosphor Icons.
 *
 * Each icon in the Phosphor Figma file is a COMPONENT_SET with two variant
 * properties:
 *   - Format: Stroke | Outline  (Figma rendering detail, no React equivalent)
 *   - Weight: Bold | Duotone | Fill | Light | Regular | Thin
 *
 * The Weight variant maps 1:1 (case-lowered) to the React `weight` prop
 * (IconWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone").
 *
 * Output: 8 files of ~200 icons each in packages/blend/lib/icons/
 */

const fs = require('fs')
const path = require('path')

const FIGMA_FILE = 'HZCDeFFrwEYEYgWiXm0Mbz'
const OUTPUT_DIR = path.resolve(__dirname, '../apps/storybook/stories/icons')
const BATCH_SIZE = 200
const INPUT_FILE = path.join(__dirname, 'phosphor-icons-sets.json')

const icons = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'))
const numFiles = Math.ceil(icons.length / BATCH_SIZE)

console.log(`Generating ${icons.length} connections across ${numFiles} files…`)

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// Clean up old files from the previous (variant-based) generation
const oldFiles = fs
    .readdirSync(OUTPUT_DIR)
    .filter(
        (f) => f.startsWith('phosphor-regular-') && f.endsWith('.figma.tsx')
    )
oldFiles.forEach((f) => {
    fs.unlinkSync(path.join(OUTPUT_DIR, f))
    console.log(`  🗑  removed old ${f}`)
})
// Also remove the test mini file
const testFile = path.join(OUTPUT_DIR, '_test-mini.figma.tsx')
if (fs.existsSync(testFile)) {
    fs.unlinkSync(testFile)
    console.log('  🗑  removed _test-mini.figma.tsx')
}

for (let f = 0; f < numFiles; f++) {
    const batch = icons.slice(f * BATCH_SIZE, (f + 1) * BATCH_SIZE)
    const fileNum = f + 1
    const fileName = `phosphor-${fileNum}.figma.tsx`
    const filePath = path.join(OUTPUT_DIR, fileName)

    const importNames = batch.map((i) => `${i.name}Icon`)

    const connects = batch
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
${importNames.map((n) => `    ${n},`).join('\n')}
} from '@phosphor-icons/react'

${connects}
`

    fs.writeFileSync(filePath, content, 'utf8')
    console.log(
        `  ✓ ${fileName} (${batch.length} icons: ${batch[0].name} → ${batch[batch.length - 1].name})`
    )
}

console.log(`\nDone. ${icons.length} connections written to ${OUTPUT_DIR}`)
