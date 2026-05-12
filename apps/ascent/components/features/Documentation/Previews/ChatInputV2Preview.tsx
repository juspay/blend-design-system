import { ChatInputV2 } from '@juspay/blend-design-system'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ChatInputV2Preview = () => {
    const tsCode = `import { ChatInputV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [message, setMessage] = useState('')

    return (
        <ChatInputV2
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onSend={(value) => console.log('Sending:', value)}
            showAttachment={true}
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  let (message, setMessage) = React.useState(() => "")

  <ChatInputV2Binding
    placeholder="Type a message..."
    value={message}
    onChange={e => setMessage(ReactEvent.Form.target(e)["value"])}
    onSend={value => Console.log(value)}
    showAttachment={true}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: ReactEvent.Form.t => unit,
  ~onSend: string => unit=?,
  ~placeholder: string=?,
  ~showAttachment: bool=?,
  ~disabled: bool=?,
) => React.element = "ChatInputV2"`

    const message = 'hello'

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
                    onChange={() => console.log(message)}
                />
            </div>
        </ComponentPreview>
    )
}

export default ChatInputV2Preview
