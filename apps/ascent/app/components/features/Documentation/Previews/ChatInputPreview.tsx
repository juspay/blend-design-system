'use client'
import { ChatInput } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const ChatInputPreview = () => {
    const [message, setMessage] = useState('')

    const tsCode = `import { ChatInput } from 'blend-v1'
import { useState } from 'react'

function MyComponent() {
    const [message, setMessage] = useState('')

    const handleSend = (message: string, files: AttachedFile[]) => {
        console.log('Sending message:', message)
        console.log('Attached files:', files)
    }

    return (
        <ChatInput
            value={message}
            onChange={setMessage}
            onSend={handleSend}
            placeholder="Type a message..."
        />
    )
}`

    return (
        <ComponentPreview ts={tsCode}>
            <ChatInput
                value={message}
                onChange={setMessage}
                placeholder="Type a message..."
            />
        </ComponentPreview>
    )
}

export default ChatInputPreview
