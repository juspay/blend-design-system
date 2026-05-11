'use client'
import { ChatInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ChatInputV2Preview = () => {
    const tsCode = `import { ChatInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [message, setMessage] = useState('')

    return (
        <ChatInputV2
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onSend={(value) => console.log('Sending:', value)}
            size={InputSizeV2.MD}
            showAttachment={true}
        />
    )
}`

    const reCode = `type inputSizeV2 = [#sm | #md | #lg]

@react.component
let make = () => {
  let (message, setMessage) = React.useState(() => "")

  <ChatInputV2Binding
    placeholder="Type a message..."
    value={message}
    onChange={e => setMessage(ReactEvent.Form.target(e)["value"])}
    onSend={value => Console.log(value)}
    size=#md
    showAttachment={true}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: ReactEvent.Form.t => unit,
  ~onSend: string => unit=?,
  ~placeholder: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~showAttachment: bool=?,
  ~disabled: bool=?,
) => React.element = "ChatInputV2"`

    const [message, setMessage] = useState('')

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="w-full max-w-md">
                <ChatInputV2
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onSend={(value) => console.log('Sending:', value)}
                    size={InputSizeV2.MD}
                    showAttachment={true}
                />
            </div>
        </ComponentPreview>
    )
}

export default ChatInputV2Preview
