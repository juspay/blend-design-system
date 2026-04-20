import { ChatInput } from '../../../ChatInput'
import { Send, Mic } from 'lucide-react'

const ChatInputLightHouse = () => {
    return (
        <>
            {/* Basic ChatInput */}
            <ChatInput
                value=""
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* With Value */}
            <ChatInput
                value="Hello, this is a message"
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* With Placeholder */}
            <ChatInput
                value=""
                placeholder="Type your message here..."
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* Disabled */}
            <ChatInput
                value=""
                disabled={true}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* With MaxLength */}
            <ChatInput
                value=""
                maxLength={100}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* Auto Resize Disabled */}
            <ChatInput
                value=""
                autoResize={false}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* With Attached Files */}
            <ChatInput
                value=""
                attachedFiles={[
                    {
                        id: '1',
                        name: 'document.pdf',
                        type: 'pdf',
                    },
                    {
                        id: '2',
                        name: 'image.jpg',
                        type: 'image',
                    },
                ]}
                onAttachFiles={(files) => {
                    console.log('Files attached:', files)
                }}
                onFileRemove={(fileId) => {
                    console.log('File removed:', fileId)
                }}
                onFileClick={(file) => {
                    console.log('File clicked:', file)
                }}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* With Many Attached Files (triggers overflow) */}
            <ChatInput
                value=""
                attachedFiles={[
                    { id: '1', name: 'file1.pdf', type: 'pdf' },
                    { id: '2', name: 'file2.csv', type: 'csv' },
                    { id: '3', name: 'file3.txt', type: 'text' },
                    { id: '4', name: 'file4.jpg', type: 'image' },
                    { id: '5', name: 'file5.pdf', type: 'pdf' },
                    { id: '6', name: 'file6.csv', type: 'csv' },
                ]}
                onAttachFiles={(files) => {
                    console.log('Files attached:', files)
                }}
                onFileRemove={(fileId) => {
                    console.log('File removed:', fileId)
                }}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* With Top Queries */}
            <ChatInput
                value=""
                topQueries={[
                    { id: '1', text: 'What is React?' },
                    { id: '2', text: 'How to use hooks?' },
                    { id: '3', text: 'Best practices for components' },
                ]}
                onTopQuerySelect={(query) => {
                    console.log('Query selected:', query)
                }}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* With Custom Attach Button Icon */}
            <ChatInput
                value=""
                attachButtonIcon={<Send size={14} />}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* With Slot1 */}
            <ChatInput
                value=""
                slot1={
                    <button
                        onClick={() => {
                            console.log('Custom button clicked')
                        }}
                    >
                        Custom Action
                    </button>
                }
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* With Multiple Slots */}
            <ChatInput
                value=""
                slot1={
                    <>
                        <button
                            onClick={() => {
                                console.log('Button 1 clicked')
                            }}
                        >
                            Action 1
                        </button>
                        <button
                            onClick={() => {
                                console.log('Button 2 clicked')
                            }}
                        >
                            Action 2
                        </button>
                    </>
                }
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* Complex Example */}
            <ChatInput
                value="Type your message"
                placeholder="Enter your message here..."
                maxLength={500}
                autoResize={true}
                attachedFiles={[
                    { id: '1', name: 'document.pdf', type: 'pdf' },
                    { id: '2', name: 'photo.jpg', type: 'image' },
                ]}
                topQueries={[
                    { id: '1', text: 'Quick question 1' },
                    { id: '2', text: 'Quick question 2' },
                ]}
                topQueriesMaxHeight={150}
                attachButtonIcon={<Mic size={14} />}
                slot1={
                    <button
                        onClick={() => {
                            console.log('Send clicked')
                        }}
                    >
                        Send
                    </button>
                }
                onAttachFiles={(files) => {
                    console.log('Files attached:', files)
                }}
                onFileRemove={(fileId) => {
                    console.log('File removed:', fileId)
                }}
                onFileClick={(file) => {
                    console.log('File clicked:', file)
                }}
                onTopQuerySelect={(query) => {
                    console.log('Query selected:', query)
                }}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* Long Value */}
            <ChatInput
                value="This is a very long message that demonstrates how the ChatInput component handles longer text content. It should wrap properly and maintain good readability while showing all the necessary information to the user."
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />
        </>
    )
}

export default ChatInputLightHouse
