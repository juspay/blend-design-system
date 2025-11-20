import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import {
    ChatInput,
    Button,
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '@juspay/blend-design-system'
import {
    AttachedFile,
    TopQuery,
} from '@juspay/blend-design-system/components/ChatInput/types'
import { Send, Mic, Paperclip, Sparkles } from 'lucide-react'

const meta: Meta<typeof ChatInput> = {
    title: 'Components/ChatInput',
    component: ChatInput,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A feature-rich chat input component with file attachments, auto-resize, and suggestion support.

## Features
- Auto-resizing textarea
- File attachment support with overflow handling
- Top query suggestions
- Custom action buttons
- Character limit support
- Disabled state
- Token-based styling
- Full accessibility support
- Keyboard shortcuts

## File Types
- **image**: Image files (jpg, png, gif, etc.)
- **pdf**: PDF documents
- **csv**: CSV data files
- **text**: Text documents
- **other**: Other file types

## Usage

\`\`\`tsx
import { ChatInput } from '@juspay/blend-design-system';
import { Send } from 'lucide-react';

// Basic usage
<ChatInput
  value={message}
  onChange={setMessage}
  placeholder="Type a message..."
/>

// With file attachments
<ChatInput
  value={message}
  onChange={setMessage}
  attachedFiles={files}
  onAttachFiles={handleAttach}
  onFileRemove={handleRemove}
  slot1={
    <Button
      leadingIcon={<Send size={16} />}
      onClick={handleSend}
      disabled={!message}
    />
  }
/>

// With top queries
<ChatInput
  value={message}
  onChange={setMessage}
  topQueries={[
    { id: '1', text: 'How do I reset my password?' },
    { id: '2', text: 'What are your business hours?' }
  ]}
  onTopQuerySelect={handleQuerySelect}
/>
\`\`\`

## Accessibility
- ARIA labels for input and buttons
- Keyboard navigation
- Screen reader support
- Focus management
- Accessible file handling
        `,
            },
        },
    },
    argTypes: {
        value: {
            control: 'text',
            description: 'Current textarea value',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text for the textarea',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Type a message...' },
                category: 'Content',
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the input',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        maxLength: {
            control: 'number',
            description: 'Maximum character limit',
            table: {
                type: { summary: 'number' },
                category: 'Validation',
            },
        },
        autoResize: {
            control: 'boolean',
            description: 'Auto-resize textarea based on content',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Behavior',
            },
        },
        attachedFiles: {
            control: 'object',
            description: 'Array of attached files',
            table: {
                type: { summary: 'AttachedFile[]' },
                category: 'Content',
            },
        },
        topQueries: {
            control: 'object',
            description: 'Suggested queries to display',
            table: {
                type: { summary: 'TopQuery[]' },
                category: 'Content',
            },
        },
        topQueriesMaxHeight: {
            control: 'number',
            description: 'Maximum height for top queries dropdown',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '200' },
                category: 'Layout',
            },
        },
        onChange: {
            action: 'changed',
            description: 'Callback when textarea value changes',
            table: {
                type: { summary: '(value: string) => void' },
                category: 'Events',
            },
        },
        onAttachFiles: {
            action: 'filesAttached',
            description: 'Callback when files are attached',
            table: {
                type: { summary: '(files: File[]) => void' },
                category: 'Events',
            },
        },
        onFileRemove: {
            action: 'fileRemoved',
            description: 'Callback when a file is removed',
            table: {
                type: { summary: '(fileId: string) => void' },
                category: 'Events',
            },
        },
        onFileClick: {
            action: 'fileClicked',
            description: 'Callback when a file is clicked',
            table: {
                type: { summary: '(file: AttachedFile) => void' },
                category: 'Events',
            },
        },
        onTopQuerySelect: {
            action: 'querySelected',
            description: 'Callback when a top query is selected',
            table: {
                type: { summary: '(query: TopQuery) => void' },
                category: 'Events',
            },
        },
        slot1: {
            description: 'Custom action button slot (e.g., send button)',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Slots',
            },
        },
        attachButtonIcon: {
            description: 'Custom icon for attach button',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Customization',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChatInput>

// Default
export const Default: Story = {
    render: () => {
        const [message, setMessage] = useState('')

        return (
            <ChatInput
                value={message}
                onChange={setMessage}
                placeholder="Type a message..."
            />
        )
    },
    parameters: {
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With Send Button
export const WithSendButton: Story = {
    render: () => {
        const [message, setMessage] = useState('')

        const handleSend = () => {
            console.log('Sending message:', message)
            setMessage('')
        }

        return (
            <ChatInput
                value={message}
                onChange={setMessage}
                placeholder="Type a message..."
                slot1={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Send size={16} />}
                        onClick={handleSend}
                        disabled={!message.trim()}
                        aria-label="Send message"
                    />
                }
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Chat input with send button. Button is disabled when input is empty.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With File Attachments
export const WithFileAttachments: Story = {
    render: () => {
        const [message, setMessage] = useState('')
        const [files, setFiles] = useState<AttachedFile[]>([
            { id: '1', name: 'screenshot.png', type: 'image' },
            { id: '2', name: 'document.pdf', type: 'pdf' },
        ])

        const handleAttach = (newFiles: File[]) => {
            const attachedFiles: AttachedFile[] = newFiles.map(
                (file, index) => ({
                    id: `${Date.now()}-${index}`,
                    name: file.name,
                    type: file.type.startsWith('image/')
                        ? 'image'
                        : ('other' as AttachedFile['type']),
                    size: file.size,
                })
            )
            setFiles([...files, ...attachedFiles])
        }

        const handleRemove = (fileId: string) => {
            setFiles(files.filter((f) => f.id !== fileId))
        }

        const handleFileClick = (file: AttachedFile) => {
            console.log('File clicked:', file.name)
        }

        const handleSend = () => {
            console.log('Sending:', { message, files })
            setMessage('')
            setFiles([])
        }

        return (
            <ChatInput
                value={message}
                onChange={setMessage}
                placeholder="Type a message..."
                attachedFiles={files}
                onAttachFiles={handleAttach}
                onFileRemove={handleRemove}
                onFileClick={handleFileClick}
                slot1={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Send size={16} />}
                        onClick={handleSend}
                        disabled={!message.trim() && files.length === 0}
                        aria-label="Send message"
                    />
                }
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Chat input with file attachment support. Click the paperclip icon to attach files, and X to remove them.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With Many File Attachments (Overflow)
export const WithManyFileAttachments: Story = {
    render: () => {
        const [message, setMessage] = useState('')
        const [files, setFiles] = useState<AttachedFile[]>([
            { id: '1', name: 'image1.png', type: 'image' },
            { id: '2', name: 'image2.png', type: 'image' },
            { id: '3', name: 'document.pdf', type: 'pdf' },
            { id: '4', name: 'spreadsheet.csv', type: 'csv' },
            { id: '5', name: 'notes.txt', type: 'text' },
            { id: '6', name: 'report.pdf', type: 'pdf' },
            { id: '7', name: 'data.csv', type: 'csv' },
        ])

        const handleRemove = (fileId: string) => {
            setFiles(files.filter((f) => f.id !== fileId))
        }

        return (
            <div style={{ maxWidth: '600px' }}>
                <ChatInput
                    value={message}
                    onChange={setMessage}
                    placeholder="Type a message..."
                    attachedFiles={files}
                    onFileRemove={handleRemove}
                    slot1={
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.SMALL}
                            subType={ButtonSubType.ICON_ONLY}
                            leadingIcon={<Send size={16} />}
                            onClick={() => console.log('Send')}
                            aria-label="Send message"
                        />
                    }
                />
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginTop: '12px',
                    }}
                >
                    When many files are attached, overflow files are shown in a
                    "more" menu
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Chat input with many file attachments. Overflow files are shown in a dropdown menu to keep the UI clean.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// With Top Queries
export const WithTopQueries: Story = {
    render: () => {
        const [message, setMessage] = useState('')
        const [queries] = useState<TopQuery[]>([
            { id: '1', text: 'How do I reset my password?' },
            { id: '2', text: 'What are your business hours?' },
            { id: '3', text: 'How can I contact support?' },
            { id: '4', text: 'Where is my order?' },
            { id: '5', text: 'How do I cancel my subscription?' },
        ])

        const handleQuerySelect = (query: TopQuery) => {
            setMessage(query.text)
        }

        return (
            <div>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    Click in the input to see suggested queries
                </p>
                <ChatInput
                    value={message}
                    onChange={setMessage}
                    placeholder="Type a message or select a suggestion..."
                    topQueries={queries}
                    onTopQuerySelect={handleQuerySelect}
                    slot1={
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.SMALL}
                            subType={ButtonSubType.ICON_ONLY}
                            leadingIcon={<Send size={16} />}
                            onClick={() => console.log('Send:', message)}
                            disabled={!message.trim()}
                            aria-label="Send message"
                        />
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Chat input with suggested queries. Focus on the input to see suggestions appear below.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Character Limit
export const CharacterLimit: Story = {
    render: () => {
        const [message, setMessage] = useState('')
        const maxLength = 200

        return (
            <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
                <ChatInput
                    value={message}
                    onChange={setMessage}
                    placeholder="Type a message..."
                    maxLength={maxLength}
                    slot1={
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.SMALL}
                            subType={ButtonSubType.ICON_ONLY}
                            leadingIcon={<Send size={16} />}
                            onClick={() => console.log('Send')}
                            disabled={!message.trim()}
                            aria-label="Send message"
                        />
                    }
                />
                <div
                    style={{
                        textAlign: 'right',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    {message.length} / {maxLength}
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Chat input with 200 character limit. Character count is displayed below.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Auto Resize
export const AutoResize: Story = {
    render: () => {
        const [message, setMessage] = useState('')

        return (
            <div>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '12px',
                    }}
                >
                    Type multiple lines to see the textarea expand automatically
                </p>
                <ChatInput
                    value={message}
                    onChange={setMessage}
                    placeholder="Type a long message..."
                    autoResize={true}
                    slot1={
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.SMALL}
                            subType={ButtonSubType.ICON_ONLY}
                            leadingIcon={<Send size={16} />}
                            onClick={() => {
                                console.log('Send:', message)
                                setMessage('')
                            }}
                            disabled={!message.trim()}
                            aria-label="Send message"
                        />
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Chat input with auto-resize enabled. The textarea grows as you type more content.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Disabled State
export const DisabledState: Story = {
    render: () => {
        const [message] = useState('This input is disabled')

        return (
            <ChatInput
                value={message}
                onChange={() => {}}
                placeholder="Type a message..."
                disabled={true}
                slot1={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Send size={16} />}
                        disabled={true}
                        aria-label="Send message"
                    />
                }
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled chat input. All interactions are disabled.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Custom Icons
export const CustomIcons: Story = {
    render: () => {
        const [message, setMessage] = useState('')

        return (
            <ChatInput
                value={message}
                onChange={setMessage}
                placeholder="Ask me anything..."
                attachButtonIcon={<Sparkles size={14} />}
                slot1={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.SMALL}
                        subType={ButtonSubType.ICON_ONLY}
                        leadingIcon={<Mic size={16} />}
                        onClick={() => console.log('Voice input')}
                        aria-label="Voice input"
                    />
                }
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Chat input with custom icons. Sparkles icon for attach button and microphone for voice input.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Chat Interface Example
export const ChatInterfaceExample: Story = {
    render: () => {
        const [message, setMessage] = useState('')
        const [files, setFiles] = useState<AttachedFile[]>([])
        const [messages, setMessages] = useState([
            {
                id: '1',
                text: 'Hello! How can I help you today?',
                sender: 'bot',
            },
        ])

        const handleSend = () => {
            if (!message.trim() && files.length === 0) return

            setMessages([
                ...messages,
                {
                    id: Date.now().toString(),
                    text: message || `${files.length} file(s) attached`,
                    sender: 'user',
                },
            ])
            setMessage('')
            setFiles([])

            // Simulate bot response
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        text: 'Thanks for your message!',
                        sender: 'bot',
                    },
                ])
            }, 1000)
        }

        const handleAttach = (newFiles: File[]) => {
            const attachedFiles: AttachedFile[] = newFiles.map(
                (file, index) => ({
                    id: `${Date.now()}-${index}`,
                    name: file.name,
                    type: file.type.startsWith('image/')
                        ? 'image'
                        : ('other' as AttachedFile['type']),
                })
            )
            setFiles([...files, ...attachedFiles])
        }

        const handleKeyPress = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
            }
        }

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '500px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
            >
                {/* Messages */}
                <div
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '20px',
                        backgroundColor: '#f9fafb',
                    }}
                >
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            style={{
                                display: 'flex',
                                justifyContent:
                                    msg.sender === 'user'
                                        ? 'flex-end'
                                        : 'flex-start',
                                marginBottom: '12px',
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '70%',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    backgroundColor:
                                        msg.sender === 'user'
                                            ? '#3B82F6'
                                            : '#fff',
                                    color:
                                        msg.sender === 'user' ? '#fff' : '#000',
                                    border:
                                        msg.sender === 'bot'
                                            ? '1px solid #e5e7eb'
                                            : 'none',
                                }}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div
                    style={{
                        padding: '16px',
                        backgroundColor: '#fff',
                        borderTop: '1px solid #e5e7eb',
                    }}
                >
                    <ChatInput
                        value={message}
                        onChange={setMessage}
                        placeholder="Type a message... (Press Enter to send)"
                        attachedFiles={files}
                        onAttachFiles={handleAttach}
                        onFileRemove={(id) =>
                            setFiles(files.filter((f) => f.id !== id))
                        }
                        onKeyPress={handleKeyPress}
                        slot1={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.SMALL}
                                subType={ButtonSubType.ICON_ONLY}
                                leadingIcon={<Send size={16} />}
                                onClick={handleSend}
                                disabled={!message.trim() && files.length === 0}
                                aria-label="Send message"
                            />
                        }
                    />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Complete chat interface example with messages and input. Press Enter to send, Shift+Enter for new line.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}

// Accessibility
export const Accessibility: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Keyboard Navigation
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    - <strong>Tab:</strong> Navigate between input and action
                    buttons
                    <br />- <strong>Enter:</strong> Send message (customizable)
                    <br />- <strong>Shift + Enter:</strong> New line
                    <br />- <strong>Escape:</strong> Close top queries dropdown
                </p>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    ARIA Labels
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    All interactive elements include proper ARIA labels for
                    screen readers.
                </p>

                <ChatInput
                    value=""
                    onChange={() => {}}
                    placeholder="Type a message..."
                    aria-label="Chat message input"
                    aria-describedby="chat-input-description"
                    slot1={
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.SMALL}
                            subType={ButtonSubType.ICON_ONLY}
                            leadingIcon={<Send size={16} />}
                            aria-label="Send message"
                        />
                    }
                />
                <p
                    id="chat-input-description"
                    style={{
                        fontSize: '12px',
                        color: '#666',
                        marginTop: '8px',
                    }}
                >
                    Enter your message and press send or hit Enter
                </p>
            </div>

            <div>
                <h4
                    style={{
                        marginBottom: '12px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}
                >
                    Focus Management
                </h4>
                <p
                    style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px',
                    }}
                >
                    Focus states are clearly visible with appropriate styling
                    and focus remains managed when interacting with file
                    attachments and suggestions.
                </p>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive accessibility features including keyboard navigation, ARIA labels, and focus management. Complies with WCAG 2.1 Level AA standards.',
            },
        },
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                    { id: 'aria-allowed-attr', enabled: true },
                    { id: 'label', enabled: true },
                ],
            },
        },
    },
}

// Interactive Playground
export const Interactive: Story = {
    args: {
        value: '',
        placeholder: 'Type a message...',
        disabled: false,
        autoResize: true,
        maxLength: undefined,
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with ChatInput props using the controls panel.',
            },
        },
        a11y: {
            config: {
                rules: [{ id: 'color-contrast', enabled: true }],
            },
        },
    },
}
