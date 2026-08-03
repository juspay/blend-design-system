import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Upload as UploadIcon, AlertCircle, CheckCircle } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import {
    UploadErrorReason,
    UploadFileV2,
    UploadState,
    UploadV2,
} from '../../../../../../packages/blend/lib/components/InputsV2/UploadV2'
import { InputSizeV2 } from '../../../../../../packages/blend/lib/components/InputsV2/inputV2.types'

const baseFile = new File(['dummy content'], 'sample_file.csv', {
    type: 'text/csv',
})

const successFiles: UploadFileV2[] = [
    {
        file: baseFile,
        isValid: true,
    },
]

const errorFilesSingle: UploadFileV2[] = [
    {
        file: baseFile,
        isValid: false,
        errorReason: UploadErrorReason.OVERSIZED,
    },
]

const errorFilesMultiple: UploadFileV2[] = [
    {
        file: new File(['dummy content'], 'sample_1.csv', { type: 'text/csv' }),
        isValid: true,
    },
    {
        file: new File(['dummy content'], 'sample_2.csv', { type: 'text/csv' }),
        isValid: false,
        errorReason: UploadErrorReason.MAX_FILES,
    },
]

const ACCEPTED_TYPES = [
    '.csv',
    '.txt',
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.mp4',
    '.avi',
    '.mov',
    '.mp3',
    '.wav',
]

const meta: Meta<typeof UploadV2> = {
    title: 'Components/Inputs/UploadV2',
    component: UploadV2,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
An upload input component (V2) with drag-and-drop support, validation, upload states, progress, and file list management.

## Features
- Idle, error, uploading, success, and disabled states
- Single or multiple file uploads
- Max file size and max file count validation
- Upload icon slot support
- File tags with remove action for multiple mode

## Accessibility
- Uses native file input semantics internally
- Label/help text support via InputLabels V2
- Required state via \`required\` and \`aria-required\`
- Error state reflected with \`aria-invalid\`

## Usage
\`\`\`tsx
import { UploadV2, UploadState } from '@juspay/blend-design-system/...'

<UploadV2
  label="Upload Files"
  subLabel="Max 8MB"
  multiple
  maxSize={8 * 1024 * 1024}
  maxFiles={2}
  state={UploadState.IDLE}
  files={files}
  onChange={setFiles}
/>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        label: { control: 'text', table: { category: 'Content' } },
        subLabel: { control: 'text', table: { category: 'Content' } },
        description: { control: 'text', table: { category: 'Content' } },
        uploadHeaderText: { control: 'text', table: { category: 'Content' } },
        helpIconText: { control: 'text', table: { category: 'Content' } },
        size: {
            control: 'select',
            options: Object.values(InputSizeV2),
            table: { category: 'Appearance' },
        },
        state: {
            control: 'select',
            options: Object.values(UploadState),
            table: { category: 'State' },
        },
        required: { control: 'boolean', table: { category: 'Validation' } },
        disabled: { control: 'boolean', table: { category: 'State' } },
        multiple: { control: 'boolean', table: { category: 'Core' } },
        maxSize: { control: 'number', table: { category: 'Validation' } },
        maxFiles: { control: 'number', table: { category: 'Validation' } },
        progressBarValue: {
            control: 'number',
            table: { category: 'State' },
        },
        progressBarMaxWidth: {
            control: 'text',
            table: { category: 'Appearance' },
        },
        acceptedFileTypes: {
            control: false,
            table: { category: 'Validation' },
        },
        slot: { control: false, table: { category: 'Slots' } },
        files: { control: false, table: { category: 'Core' } },
        onChange: { action: 'change', table: { category: 'Events' } },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof UploadV2>

export const Default: Story = {
    args: {
        label: 'Upload Files',
        subLabel: 'Max 8MB',
        description: '.csv only | Max size 8 MB',
        uploadHeaderText: 'Choose a file or drag & drop it here',
        helpIconText:
            'Upload your files here. Supported formats include CSV files up to 8MB in size.',
        size: InputSizeV2.SM,
        multiple: true,
        disabled: false,
        required: false,
        maxSize: 8 * 1024 * 1024,
        maxFiles: 2,
        acceptedFileTypes: ACCEPTED_TYPES,
        progressBarValue: 50,
        progressBarMaxWidth: '300px',
        state: UploadState.IDLE,
        slot: <UploadIcon size={32} color="#6366f1" />,
    },
    render: function DefaultUploadStory(args) {
        const [files, setFiles] = useState<UploadFileV2[]>([])
        return (
            <UploadV2
                {...args}
                files={files}
                onChange={(nextFiles) => {
                    setFiles(nextFiles)
                    args.onChange?.(nextFiles)
                }}
            />
        )
    },
}

export const ErrorSingleFile: Story = {
    args: {
        ...Default.args,
        multiple: false,
        state: UploadState.ERROR,
        uploadHeaderText: 'Uploading sample_file.csv...',
        files: errorFilesSingle,
        slot: <AlertCircle size={32} color="#ef4444" />,
    },
}

export const ErrorMultipleFiles: Story = {
    args: {
        ...Default.args,
        multiple: true,
        state: UploadState.ERROR,
        files: errorFilesMultiple,
        slot: <AlertCircle size={32} color="#ef4444" />,
    },
}

export const Success: Story = {
    args: {
        ...Default.args,
        state: UploadState.SUCCESS,
        files: successFiles,
        uploadHeaderText: 'File uploaded successfully',
        description: 'Test files uploaded successfully',
        slot: <CheckCircle size={32} color="#10b981" />,
    },
}

export const Uploading: Story = {
    args: {
        ...Default.args,
        state: UploadState.UPLOADING,
        files: successFiles,
        uploadHeaderText: 'Uploading sample_file.csv...',
        slot: <UploadIcon size={32} color="#6366f1" />,
    },
}

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
        state: UploadState.DISABLED,
    },
}
