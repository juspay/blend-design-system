'use client'
import { TextInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TextInputV2Preview = () => {
    const tsCode = `import { TextInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('ab')

    return (
        <>
            <TextInputV2
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size={InputSizeV2.MD}
                hintText="We'll never share your email"
            />
            <TextInputV2
                label="Username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size={InputSizeV2.MD}
                error={{
                    show: username.length > 0 && username.length < 3,
                    message: 'Username must be at least 3 characters',
                }}
            />
        </>
    )
}`

    const reCode = `type inputSizeV2 = [#sm | #md | #lg]

@react.component
let make = () => {
  let (email, setEmail) = React.useState(() => "")
  let (username, setUsername) = React.useState(() => "ab")

  <>
    <TextInputV2Binding
      label="Email Address"
      placeholder="Enter your email"
      value={email}
      onChange={e => setEmail(ReactEvent.Form.target(e)["value"])}
      size=#md
      hintText="We'll never share your email"
    />
    <TextInputV2Binding
      label="Username"
      placeholder="Enter username"
      value={username}
      onChange={e => setUsername(ReactEvent.Form.target(e)["value"])}
      size=#md
      error={{
        show: String.length(username) > 0 && String.length(username) < 3,
        message: "Username must be at least 3 characters"
      }}
    />
  </>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: ReactEvent.Form.t => unit,
  ~placeholder: string=?,
  ~label: string=?,
  ~subLabel: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~hintText: string=?,
  ~disabled: bool=?,
  ~error: {show: bool, message?: string}=?,
) => React.element = "TextInputV2"`

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('ab')

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="flex flex-col gap-6 w-full max-w-sm">
                <TextInputV2
                    label="Email Address"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size={InputSizeV2.MD}
                    hintText="We'll never share your email"
                />
                <TextInputV2
                    label="Username"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    size={InputSizeV2.MD}
                    error={{
                        show: username.length > 0 && username.length < 3,
                        message: 'Username must be at least 3 characters',
                    }}
                />
            </div>
        </ComponentPreview>
    )
}

export default TextInputV2Preview
