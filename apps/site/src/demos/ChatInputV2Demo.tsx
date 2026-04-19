import { useState } from 'react'
import { AttachedFile } from '../../../../packages/blend/lib/components/ChatInput'
import { ChatInputV2 } from '../../../../packages/blend/lib/components/InputsV2/ChatInputV2'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { AudioLines } from 'lucide-react'
import { addSnackbar } from '../../../../packages/blend/lib/components/Snackbar'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import { FOUNDATION_THEME } from '@juspay/blend-design-system'

const ChatInputV2Demo = () => {
    // Playground state
    const [playgroundMessage, setPlaygroundMessage] = useState('')
    const [playgroundDisabled, setPlaygroundDisabled] = useState(false)
    const [playgroundAutoResize, setPlaygroundAutoResize] = useState(true)
    const [playgroundMaxLength, setPlaygroundMaxLength] = useState<
        number | undefined
    >(undefined)
    const [playgroundFiles, setPlaygroundFiles] = useState<AttachedFile[]>([])
    const [playgroundWidth, setPlaygroundWidth] = useState<string>('100%')
    const [staticExampleMessage, setStaticExampleMessage] = useState('')

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
        <Block height={'100%'} display="flex" flexDirection="column">
            <div className="p-8 space-y-12">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">ChatInput Component</h1>
                    <p className="text-gray-600 text-lg">
                        A comprehensive chat input component with file
                        attachment, voice recording, and overflow management
                        capabilities, similar to ChatGPT's interface.
                    </p>
                </div>

                {/* Playground Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">
                        Interactive Playground
                    </h2>
                    <div className="space-y-6">
                        {/* Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextInput
                                label="Width"
                                value={playgroundWidth}
                                onChange={(e) =>
                                    setPlaygroundWidth(e.target.value)
                                }
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
                                    setPlaygroundAutoResize(
                                        !playgroundAutoResize
                                    )
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

                        <ChatInputV2
                            disabled={playgroundDisabled}
                            value={playgroundMessage}
                            placeholder="Enter your message"
                            onChange={(value) => {
                                setPlaygroundMessage(value)
                            }}
                            onEnter={() => {
                                handlePlaygroundSend(
                                    playgroundMessage,
                                    playgroundFiles
                                )
                            }}
                            slot1={
                                <Block
                                    backgroundColor={
                                        FOUNDATION_THEME.colors.gray[200]
                                    }
                                    padding={10}
                                    borderRadius={10}
                                >
                                    Slot 1
                                    <ul>
                                        <li>Item 1</li>
                                        <li>Item 2</li>
                                        <li>Item 3</li>
                                    </ul>
                                </Block>
                            }
                            slot2={<AudioLines size={16} />}
                            onSlot2Click={handlePlaygroundVoiceRecord}
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
                            onTopQuerySelect={(query) => {
                                setPlaygroundMessage(query.text)
                                addSnackbar({
                                    header: 'Query Selected',
                                    description: `Selected: "${query.text}"`,
                                })
                            }}
                            onAttachFiles={(files) => {
                                handlePlaygroundAttachFiles(files)
                            }}
                            onFileRemove={handlePlaygroundFileRemove}
                            onFileClick={handlePlaygroundFileClick}
                            attachedFiles={playgroundFiles}
                        />
                    </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-gray-200">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Static example</h2>
                        <p className="text-gray-600 text-sm max-w-3xl">
                            Fixed configuration: default slots, no top queries
                            or attachments. Use for a minimal compose bar.
                        </p>
                    </div>
                    <Block width="100%" maxWidth="720px">
                        <ChatInputV2
                            value={staticExampleMessage}
                            onChange={setStaticExampleMessage}
                            placeholder="Ask anything…"
                            slot2={<AudioLines size={16} />}
                            onSlot2Click={() =>
                                addSnackbar({
                                    header: 'Static example',
                                    description:
                                        'Secondary action slot clicked.',
                                })
                            }
                        />
                    </Block>
                </div>
            </div>
        </Block>
    )
}

export default ChatInputV2Demo
