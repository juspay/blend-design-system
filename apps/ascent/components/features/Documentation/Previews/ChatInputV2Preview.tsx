'use client'
import { ChatInputV2 } from '@juspay/blend-design-system'
import { PaperPlaneRight } from '@phosphor-icons/react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ChatInputV2Preview = () => {
    const tsCode = `import { ChatInputV2 } from '@juspay/blend-design-system'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { useState } from 'react'

function MyComponent() {
    const [message, setMessage] = useState('')

    const handleSend = () => {
        console.log('Sending:', message)
        setMessage('')
    }

    return (
        <ChatInputV2
            placeholder="Type a message..."
            value={message}
            onChange={setMessage}
            onEnter={handleSend}
            secondaryAction={<PaperPlaneRight size={16} />}
            onSecondaryActionClick={handleSend}
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  let (message, setMessage) = React.useState(() => "")

  let handleSend = () => {
    Console.log(message)
    setMessage(_ => "")
  }

  <ChatInputV2Binding
    placeholder="Type a message..."
    value={message}
    onChange={setMessage}
    onEnter={handleSend}
    secondaryAction={<PaperPlaneRight size={16} />}
    onSecondaryActionClick={handleSend}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~value: string,
  ~onChange: string => unit,
  ~placeholder: string=?,
  ~onEnter: unit => unit=?,
  ~secondaryAction: React.element=?,
  ~onSecondaryActionClick: unit => unit=?,
  ~disabled: bool=?,
  ~topContent: React.element=?,
  ~topQueries: array<{id: string, text: string}>=?,
  ~onTopQuerySelect: {id: string, text: string} => unit=?,
  ~topQueriesMaxHeight: int=?,
  ~textareaMaxHeight: int=?,
  ~attachedFiles: array<{id: string, name: string, type: string}>=?,
  ~onAttachFiles: array<File.t> => unit=?,
  ~onFileRemove: string => unit=?,
  ~onFileClick: {id: string, name: string, type: string} => unit=?,
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
                    onChange={(value) => console.log('Changed:', value)}
                    onEnter={() => console.log('Sending:', message)}
                    secondaryAction={<PaperPlaneRight size={16} />}
                    onSecondaryActionClick={() =>
                        console.log('Sending:', message)
                    }
                />
            </div>
        </ComponentPreview>
    )
}

export default ChatInputV2Preview
