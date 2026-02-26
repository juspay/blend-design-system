'use client'
import { CodeBlock } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const CodeBlockPreview = () => {
    const tsCode = `import { CodeBlock, CodeBlockVariant } from '@juspay/blend-design-system'

function MyComponent() {
    const code = \`function greet(name: string) {
    return \\\`Hello, \\\${name}!\\\`
}\`

    return (
        <CodeBlock
            code={code}
            variant={CodeBlockVariant.DEFAULT}
            showLineNumbers={true}
            showHeader={true}
            header="example.ts"
        />
    )
}`

    const exampleCode = `function greet(name: string) {
    return \`Hello, \${name}!\`
}

const message = greet('World')
console.log(message)`

    return (
        <ComponentPreview ts={tsCode}>
            <CodeBlock
                code={exampleCode}
                showLineNumbers={true}
                showHeader={true}
                header="example.ts"
            />
        </ComponentPreview>
    )
}

export default CodeBlockPreview
