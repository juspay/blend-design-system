import { useState } from 'react'
import {
    ChatInput,
    AttachedFile,
} from '../../../../packages/blend/lib/components/ChatInput'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import {
    Camera,
    FileText,
    Upload,
    Mic,
    Send,
    Hash,
    Star,
    AudioLines,
} from 'lucide-react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import {
    ButtonType,
    ButtonSize,
    ButtonSubType,
    Button,
} from '../../../../packages/blend/lib/components/Button'

const ChatInputDemo = () => {
    // Playground state
    const [playgroundMessage, setPlaygroundMessage] = useState('')
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundAutoResize, setPlaygroundAutoResize] = useState(true)
    const [playgroundMaxLength, setPlaygroundMaxLength] = useState<
        number | undefined
    >(undefined)
    const [playgroundFiles, setPlaygroundFiles] = useState<AttachedFile[]>([])
    const [playgroundWidth, setPlaygroundWidth] = useState<string>('100%')

    // Demo state
    const [basicMessage, setBasicMessage] = useState('')
    const [basicFiles, setBasicFiles] = useState<AttachedFile[]>([])
    const [topQueriesMessage, setTopQueriesMessage] = useState('')

    // File type utilities
    const getFileType = (file: File): AttachedFile['type'] => {
        if (file.type.startsWith('image/')) return 'image'
        if (file.type === 'application/pdf') return 'pdf'
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) return 'csv'
        if (file.type.startsWith('text/')) return 'text'
        return 'other'
    }

    const createSampleFiles = (): AttachedFile[] => [
        {
            id: 'sample-1',
            name: 'profile-picture.jpg',
            type: 'image',
            size: 1024 * 50,
        },
        {
            id: 'sample-2',
            name: 'financial-report.pdf',
            type: 'pdf',
            size: 1024 * 200,
        },
        {
            id: 'sample-3',
            name: 'data-export.csv',
            type: 'csv',
            size: 1024 * 30,
        },
        {
            id: 'sample-4',
            name: 'meeting-notes.txt',
            type: 'text',
            size: 1024 * 5,
        },
        {
            id: 'sample-5',
            name: 'presentation.pptx',
            type: 'other',
            size: 1024 * 300,
        },
        {
            id: 'sample-6',
            name: 'contract.docx',
            type: 'other',
            size: 1024 * 150,
        },
    ]

    // Event handlers
    const handlePlaygroundSend = (message: string, files: AttachedFile[]) => {
        addSnackbar({
            header: 'Message Sent!',
            description: `"${message}" with ${files.length} files`,
        })
        setPlaygroundMessage('')
        setPlaygroundFiles([])
    }

    const handlePlaygroundAttachFiles = (newFiles: File[]) => {
        const attachedFiles: AttachedFile[] = newFiles.map((file, index) => ({
            id: `file-${Date.now()}-${index}`,
            name: file.name,
            type: getFileType(file),
            size: file.size,
        }))
        setPlaygroundFiles((prev) => [...prev, ...attachedFiles])
    }

    const handlePlaygroundFileRemove = (fileId: string) => {
        setPlaygroundFiles((prev) => prev.filter((f) => f.id !== fileId))
    }

    const handlePlaygroundFileClick = (file: AttachedFile) => {
        addSnackbar({
            header: 'File Clicked',
            description: `${file.name} (${file.type})`,
        })
    }

    const handlePlaygroundVoiceRecord = () => {
        addSnackbar({
            header: 'Voice Recording',
            description: 'Voice recording feature activated',
        })
    }

    const addSampleFiles = () => {
        setPlaygroundFiles(createSampleFiles())
    }

    const clearFiles = () => {
        setPlaygroundFiles([])
    }

    return (
        <div className="p-8 space-y-12">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">ChatInput Component</h1>
                <p className="text-gray-600 text-lg">
                    A comprehensive chat input component with file attachment,
                    voice recording, and overflow management capabilities,
                    similar to ChatGPT's interface.
                </p>
            </div>

            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Interactive Playground</h2>
                <div className="space-y-6">
                    {/* Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextInput
                            label="Width"
                            value={playgroundWidth}
                            onChange={(e) => setPlaygroundWidth(e.target.value)}
                            placeholder="Enter width (e.g., 100%, 400px)"
                        />

                        <TextInput
                            label="Max Length"
                            value={playgroundMaxLength?.toString() || ''}
                            onChange={(e) => {
                                const val = e.target.value
                                setPlaygroundMaxLength(
                                    val ? parseInt(val) : undefined
                                )
                            }}
                            placeholder="Enter max length"
                            type="number"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Switch
                            label="Disabled"
                            checked={playgroundDisabled}
                            onChange={() =>
                                setPlaygroundDisabled(!playgroundDisabled)
                            }
                        />
                        <Switch
                            label="Auto Resize"
                            checked={playgroundAutoResize}
                            onChange={() =>
                                setPlaygroundAutoResize(!playgroundAutoResize)
                            }
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={addSampleFiles}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Add Sample Files
                        </button>
                        <button
                            onClick={clearFiles}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Clear Files
                        </button>
                        <span className="text-sm text-gray-600">
                            Files: {playgroundFiles.length}
                        </span>
                    </div>

                    {/* Interactive Component */}
                    <div className="min-h-32 rounded-2xl w-full flex justify-center items-center bg-gray-50 p-8">
                        <div style={{ width: playgroundWidth }}>
                            <ChatInput
                                onKeyDown={(
                                    e: React.KeyboardEvent<HTMLTextAreaElement>
                                ) => {
                                    console.log('onKeyDown', e.key)
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handlePlaygroundSend(
                                            playgroundMessage,
                                            playgroundFiles
                                        )
                                    }
                                }}
                                slot1={
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        size={ButtonSize.SMALL}
                                        subType={ButtonSubType.ICON_ONLY}
                                        leadingIcon={<AudioLines size={14} />}
                                        onClick={handlePlaygroundVoiceRecord}
                                    />
                                }
                                value={playgroundMessage}
                                onChange={setPlaygroundMessage}
                                onSend={handlePlaygroundSend}
                                onAttachFiles={handlePlaygroundAttachFiles}
                                onVoiceRecord={handlePlaygroundVoiceRecord}
                                onFileRemove={handlePlaygroundFileRemove}
                                onFileClick={handlePlaygroundFileClick}
                                attachedFiles={playgroundFiles}
                                disabled={playgroundDisabled}
                                autoResize={playgroundAutoResize}
                                maxLength={playgroundMaxLength}
                                placeholder="Type your message here..."
                                onTopQuerySelect={(query) => {
                                    setPlaygroundMessage(query.text)
                                    addSnackbar({
                                        header: 'Query Selected',
                                        description: `Selected: "${query.text}"`,
                                    })
                                }}
                                topQueries={[
                                    {
                                        id: '1',
                                        text: 'Show me the trend of last month success rate for razorpay',
                                    },
                                    {
                                        id: '2',
                                        text: 'What are the latest sales figures?',
                                    },
                                    {
                                        id: '3',
                                        text: 'Generate a report for Q3 performance',
                                    },
                                    {
                                        id: '4',
                                        text: 'Show customer satisfaction metrics',
                                    },
                                    {
                                        id: '5',
                                        text: 'Display user engagement analytics for this quarter',
                                    },
                                    {
                                        id: '6',
                                        text: 'Show revenue breakdown by product category',
                                    },
                                    {
                                        id: '7',
                                        text: 'Generate monthly performance summary',
                                    },
                                    {
                                        id: '8',
                                        text: 'Display conversion rate trends',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Width Demo */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Width Examples</h2>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            Full Width (100%)
                        </h3>
                        <ChatInput
                            value=""
                            onChange={() => {}}
                            onSend={(message) =>
                                addSnackbar({
                                    header: 'Full width',
                                    description: `Message: "${message}"`,
                                })
                            }
                            onVoiceRecord={() =>
                                addSnackbar({
                                    header: 'Voice Recording',
                                    description: 'Full width voice recording',
                                })
                            }
                            placeholder="Full width chat input..."
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            Fixed Width (400px)
                        </h3>
                        <div style={{ width: '400px' }}>
                            <ChatInput
                                value=""
                                onChange={() => {}}
                                onSend={(message) =>
                                    addSnackbar({
                                        header: '400px width',
                                        description: `Message: "${message}"`,
                                    })
                                }
                                onVoiceRecord={() =>
                                    addSnackbar({
                                        header: 'Voice Recording',
                                        description:
                                            '400px width voice recording',
                                    })
                                }
                                placeholder="Fixed 400px width..."
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            Responsive Width (50%)
                        </h3>
                        <div style={{ width: '50%' }}>
                            <ChatInput
                                value=""
                                onChange={() => {}}
                                onSend={(message) =>
                                    addSnackbar({
                                        header: '50% width',
                                        description: `Message: "${message}"`,
                                    })
                                }
                                onVoiceRecord={() =>
                                    addSnackbar({
                                        header: 'Voice Recording',
                                        description:
                                            '50% width voice recording',
                                    })
                                }
                                placeholder="50% width chat input..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Icons Demo */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Custom Icons</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Camera Icons</h3>
                        <ChatInput
                            value=""
                            onChange={() => {}}
                            onSend={() => {}}
                            attachButtonIcon={<Camera size={20} />}
                            voiceButtonIcon={<Camera size={20} />}
                            sendButtonIcon={<Camera size={20} />}
                            placeholder="All camera icons..."
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">Mixed Icons</h3>
                        <ChatInput
                            value=""
                            onChange={() => {}}
                            onSend={() => {}}
                            attachButtonIcon={<Upload size={20} />}
                            voiceButtonIcon={<Star size={20} />}
                            sendButtonIcon={<FileText size={20} />}
                            placeholder="Custom mixed icons..."
                        />
                    </div>
                </div>
            </div>

            {/* File Attachment Demo */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">File Attachment Features</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Normal Files */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Standard File Display
                        </h3>
                        <ChatInput
                            value={basicMessage}
                            onChange={setBasicMessage}
                            onSend={(message, files) => {
                                addSnackbar({
                                    header: 'Message Sent',
                                    description: `"${message}" with ${files.length} files`,
                                })
                                setBasicMessage('')
                                setBasicFiles([])
                            }}
                            onAttachFiles={(newFiles) => {
                                const attachedFiles: AttachedFile[] =
                                    newFiles.map((file, index) => ({
                                        id: `basic-${Date.now()}-${index}`,
                                        name: file.name,
                                        type: getFileType(file),
                                        size: file.size,
                                    }))
                                setBasicFiles((prev) => [
                                    ...prev,
                                    ...attachedFiles,
                                ])
                            }}
                            onFileRemove={(fileId) => {
                                setBasicFiles((prev) =>
                                    prev.filter((f) => f.id !== fileId)
                                )
                            }}
                            onFileClick={(file) => {
                                addSnackbar({
                                    header: 'File Clicked',
                                    description: file.name,
                                })
                            }}
                            attachedFiles={basicFiles}
                            placeholder="Attach files to see them displayed..."
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setBasicFiles([
                                        {
                                            id: 'demo-1',
                                            name: 'image.jpg',
                                            type: 'image',
                                            size: 1024,
                                        },
                                        {
                                            id: 'demo-2',
                                            name: 'document.pdf',
                                            type: 'pdf',
                                            size: 2048,
                                        },
                                    ])
                                }}
                                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Add Sample Files
                            </button>
                            <button
                                onClick={() => setBasicFiles([])}
                                className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* Overflow Demo */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            File Overflow (Dynamic)
                        </h3>
                        <ChatInput
                            value=""
                            onChange={() => {}}
                            onSend={() => {}}
                            attachedFiles={createSampleFiles()}
                            onFileClick={(file) => {
                                addSnackbar({
                                    header: 'File from overflow menu',
                                    description: file.name,
                                })
                            }}
                            placeholder="Dynamically shows overflow menu..."
                        />
                        <p className="text-sm text-gray-600">
                            The component automatically calculates how many
                            files can fit based on the available width. A "+X
                            more" button appears that opens a menu with the
                            remaining files.
                        </p>
                    </div>
                </div>
            </div>

            {/* Top Queries Demo */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Top Queries Feature</h2>
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            With Top Queries
                        </h3>
                        <ChatInput
                            value={topQueriesMessage}
                            onChange={setTopQueriesMessage}
                            onSend={(message) => {
                                addSnackbar({
                                    header: 'Message Sent',
                                    description: `"${message}"`,
                                })
                                setTopQueriesMessage('')
                            }}
                            onTopQuerySelect={(query) => {
                                console.log('query', query)
                                setTopQueriesMessage(query.text)
                                addSnackbar({
                                    header: 'Query Selected',
                                    description: `Selected: "${query.text}"`,
                                })
                            }}
                            topQueries={[
                                {
                                    id: '1',
                                    text: 'Show me the trend of last month success rate for razorpay',
                                },
                                {
                                    id: '2',
                                    text: 'What are the latest sales figures?',
                                },
                                {
                                    id: '3',
                                    text: 'Generate a report for Q3 performance',
                                },
                                {
                                    id: '4',
                                    text: 'Show customer satisfaction metrics',
                                },
                                {
                                    id: '5',
                                    text: 'Display user engagement analytics for this quarter',
                                },
                                {
                                    id: '6',
                                    text: 'Show revenue breakdown by product category',
                                },
                                {
                                    id: '7',
                                    text: 'Generate monthly performance summary',
                                },
                                {
                                    id: '8',
                                    text: 'Display conversion rate trends',
                                },
                            ]}
                            topQueriesMaxHeight={150}
                            placeholder="Ask Genius about anything..."
                        />
                        <p className="text-sm text-gray-600">
                            Top queries appear below the input with a border
                            separator. Click any query to select it.
                        </p>
                    </div>
                </div>
            </div>

            {/* States Demo */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Component States</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            Disabled State
                        </h3>
                        <ChatInput
                            value="This input is disabled"
                            onChange={() => {}}
                            onSend={() => {}}
                            disabled={true}
                            placeholder="Disabled chat input..."
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">
                            With Max Length (50)
                        </h3>
                        <ChatInput
                            value=""
                            onChange={() => {}}
                            onSend={() => {}}
                            maxLength={50}
                            placeholder="Type up to 50 characters..."
                        />
                    </div>
                </div>
            </div>

            {/* Usage Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Usage Examples</h2>
                <div className="space-y-8">
                    {/* Customer Support */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Customer Support Chat
                        </h3>
                        <ChatInput
                            value=""
                            onChange={() => {}}
                            onSend={(files) =>
                                addSnackbar({
                                    header: 'Support ticket created',
                                    description: `Message sent with ${files.length} attachments`,
                                })
                            }
                            onVoiceRecord={() =>
                                addSnackbar({
                                    header: 'Voice message',
                                    description:
                                        'Recording started for support',
                                })
                            }
                            placeholder="Describe your issue or attach relevant files..."
                        />
                    </div>

                    {/* Team Collaboration */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Team Collaboration
                        </h3>
                        <ChatInput
                            value=""
                            onChange={() => {}}
                            onSend={(message, files) =>
                                addSnackbar({
                                    header: 'Message sent to team',
                                    description: `"${message}" with ${files.length} files`,
                                })
                            }
                            placeholder="Message your team..."
                            attachButtonIcon={<Hash size={20} />}
                            voiceButtonIcon={<Mic size={20} />}
                            sendButtonIcon={<Send size={20} />}
                        />
                    </div>

                    {/* Compact Chat */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Compact Chat</h3>
                        <div style={{ width: '300px' }}>
                            <ChatInput
                                value=""
                                onChange={() => {}}
                                onSend={() => {}}
                                placeholder="Quick message..."
                                autoResize={false}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Overview */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Features Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">
                            📎 File Attachments
                        </h4>
                        <p className="text-sm text-blue-700">
                            Attach multiple files with type-specific icons and
                            colors. Files display as removable tags.
                        </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2">
                            🎤 Voice Recording
                        </h4>
                        <p className="text-sm text-green-700">
                            Built-in voice recording button with customizable
                            icon and callback handling.
                        </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-900 mb-2">
                            📋 Overflow Management
                        </h4>
                        <p className="text-sm text-purple-700">
                            When files exceed the visible limit, show "+X more"
                            button with dropdown menu.
                        </p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-orange-900 mb-2">
                            ⌨️ Keyboard Shortcuts
                        </h4>
                        <p className="text-sm text-orange-700">
                            Enter to send, Shift+Enter for new line. Auto-resize
                            textarea as content grows.
                        </p>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <h4 className="font-semibold text-indigo-900 mb-2">
                            🎨 Customizable
                        </h4>
                        <p className="text-sm text-indigo-700">
                            Custom icons, sizes, max length, disabled states,
                            and overflow menu props.
                        </p>
                    </div>

                    <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                        <h4 className="font-semibold text-pink-900 mb-2">
                            ♿ Accessible
                        </h4>
                        <p className="text-sm text-pink-700">
                            ARIA labels, keyboard navigation, focus management,
                            and screen reader support.
                        </p>
                    </div>
                </div>
            </div>

            {/* API Reference */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Quick API Reference</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-3">Key Props</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <code className="bg-gray-200 px-2 py-1 rounded">
                                        value / onChange
                                    </code>{' '}
                                    - Message content
                                </li>
                                <li>
                                    <code className="bg-gray-200 px-2 py-1 rounded">
                                        onSend
                                    </code>{' '}
                                    - Send message callback
                                </li>
                                <li>
                                    <code className="bg-gray-200 px-2 py-1 rounded">
                                        onAttachFiles
                                    </code>{' '}
                                    - File attachment callback
                                </li>
                                <li>
                                    <code className="bg-gray-200 px-2 py-1 rounded">
                                        attachedFiles
                                    </code>{' '}
                                    - Array of attached files (overflow
                                    calculated dynamically)
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">
                                Customization
                            </h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <code className="bg-gray-200 px-2 py-1 rounded">
                                        width
                                    </code>{' '}
                                    - CSS width value (100%, 400px, etc.)
                                </li>
                                <li>
                                    <code className="bg-gray-200 px-2 py-1 rounded">
                                        disabled
                                    </code>{' '}
                                    - Disable the input
                                </li>
                                <li>
                                    <code className="bg-gray-200 px-2 py-1 rounded">
                                        maxLength
                                    </code>{' '}
                                    - Character limit
                                </li>
                                <li>
                                    <code className="bg-gray-200 px-2 py-1 rounded">
                                        autoResize
                                    </code>{' '}
                                    - Auto-grow textarea
                                </li>
                                <li>
                                    <code className="bg-gray-200 px-2 py-1 rounded">
                                        *ButtonIcon
                                    </code>{' '}
                                    - Custom button icons
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInputDemo
