'use client'
import { CodeEditorV2 } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const CodeEditorV2Preview = () => {
    const tsCode = `import { CodeEditorV2 } from '@juspay/blend-design-system'

function MyComponent() {
    const [code, setCode] = useState('const greeting = "Hello World";')

    return (
        <CodeEditorV2
            value={code}
            onChange={setCode}
            language="typescript"
            showLineNumbers={true}
            header={{
                showHeader: true,
                title: 'main.ts',
                showCopyButton: true,
            }}
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  let (code, setCode) = React.useState(() => "const greeting = \\"Hello World\\";")

  <CodeEditorV2Binding
    value={code}
    onChange={setCode}
    language="typescript"
    showLineNumbers={true}
    header={{showHeader: true, title: "main.ts", showCopyButton: true}}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: string => unit=?,
  ~variant: [#default | #"no-gutter" | #diff]=?,
  ~showLineNumbers: bool=?,
  ~language: string=?,
  ~placeholder: string=?,
  ~readOnly: bool=?,
  ~disabled: bool=?,
  ~header: {showHeader?: bool, title?: string, showCopyButton?: bool}=?,
) => React.element = "CodeEditorV2"`

    const [code, setCode] = useState('const greeting = "Hello World";')

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-md">
                <CodeEditorV2
                    value={code}
                    onChange={setCode}
                    language="typescript"
                    showLineNumbers={true}
                    header={{
                        showHeader: true,
                        title: 'main.ts',
                        showCopyButton: true,
                    }}
                />
            </div>
        </ComponentPreview>
    )
}

export default CodeEditorV2Preview
