import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Upload, UploadState } from '@juspay/blend-design-system'
import { FileText } from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const createMockFile = (name: string, size: number = 1024): File => {
    if (typeof File !== 'undefined') {
        const content = ['test content']
        const file = new File(content, name, { type: 'text/plain' })
        Object.defineProperty(file, 'size', { value: size, writable: false })
        return file
    }
    const blob = new Blob(['test content'], { type: 'text/plain' })
    const file = Object.create(blob) as File
    Object.defineProperty(file, 'name', {
        value: name,
        writable: false,
        enumerable: true,
    })
    Object.defineProperty(file, 'size', {
        value: size,
        writable: false,
        enumerable: true,
    })
    Object.defineProperty(file, 'type', {
        value: 'text/plain',
        writable: false,
        enumerable: true,
    })
    Object.defineProperty(file, 'lastModified', {
        value: Date.now(),
        writable: false,
        enumerable: true,
    })
    return file
}

// ============================================================================
// Meta Configuration
// ============================================================================

const meta: Meta<typeof Upload> = {
    title: 'Components/Upload',
    component: Upload,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Upload component for file selection and upload with drag-and-drop support, multiple file handling, and comprehensive accessibility features.

## Features
- Single and multiple file uploads
- Drag-and-drop support
- File type validation
- File size limits
- Upload progress tracking
- Error handling and validation
- Custom file accept types
- Help text and descriptions
- Required field support
- Disabled state
- Custom children slots

## Accessibility

**WCAG Compliance**: 2.2 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Enter, Space on Browse Files button)
- Screen reader support (VoiceOver/NVDA)
- Proper label association via htmlFor/id
- Error state support with visual and programmatic indicators (aria-invalid, aria-describedby)
- Required state indicated with asterisk and required attribute
- Description and hint text support via aria-describedby
- Progress bar announces upload status via aria-valuenow, aria-valuemin, aria-valuemax
- File remove buttons are keyboard accessible
- Drag-and-drop area is keyboard accessible
- Touch targets meet Level AA requirement (24x24px minimum)

**Level AAA Compliance**: ⚠️ Partial (6 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 2.2.3 No Timing, 2.2.4 Interruptions, 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA)
- ⚠️ **Verification Required**: 2.5.5 Target Size - File remove buttons need 44x44px minimum for AAA
- ⚠️ **Application-Dependent**: 3.3.6 Error Prevention (All) - requires confirmation patterns for critical file operations

**Keyboard Navigation**:
- **Tab**: Navigate to Browse Files button
- **Enter/Space**: Open file dialog (when Browse Files button is focused)
- **Tab**: Navigate to file remove buttons (X icons)
- **Enter/Space**: Remove file (when remove button is focused)
- Drag-and-drop area is clickable but primary interaction is via Browse Files button

**Screen Reader Support**:
- Upload container has \`role="region"\` with \`aria-label\`
- File input has proper label association
- Description text associated via \`aria-describedby\`
- Error messages announced via \`role="alert"\` and \`aria-live="polite"\`
- Progress bar announces upload percentage
- Help icon has \`aria-label\` attribute
- File remove buttons have descriptive \`aria-label\` attributes

**Touch Target Sizes**:
- Browse Files button: ~36px height (meets AA 24px, does not meet AAA 44px)
- File remove buttons (X icons): ~12px visible size (meets AA via padding, verification needed for AAA 44px)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Upload.accessibility\` (automated tests covering WCAG 2.0, 2.1, 2.2 criteria)
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { Upload } from '@juspay/blend-design-system';

<Upload
  label="Upload Document"
  description="PDF files only, max 5MB"
  accept={['.pdf']}
  maxSize={5 * 1024 * 1024}
  onDrop={(acceptedFiles, rejectedFiles) => {
    console.log('Accepted:', acceptedFiles);
    console.log('Rejected:', rejectedFiles);
  }}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Label text for the upload field',
        },
        subLabel: {
            control: 'text',
            description: 'Sub-label text displayed next to the label',
        },
        description: {
            control: 'text',
            description: 'Description text displayed below the label',
        },
        helpIconHintText: {
            control: 'text',
            description:
                'Help text shown in tooltip when hovering over help icon',
        },
        multiple: {
            control: 'boolean',
            description: 'Allow multiple file selection',
        },
        accept: {
            control: 'object',
            description:
                'Array of accepted file types (e.g., [".pdf", ".docx"])',
        },
        maxSize: {
            control: 'number',
            description: 'Maximum file size in bytes',
        },
        maxFiles: {
            control: 'number',
            description:
                'Maximum number of files (only applies when multiple=true)',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the upload component',
        },
        required: {
            control: 'boolean',
            description: 'Mark the upload field as required',
        },
        errorText: {
            control: 'text',
            description: 'Error message to display',
        },
        state: {
            control: 'select',
            options: Object.values(UploadState),
            description: 'Current upload state',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Upload>

// ============================================================================
// Stories
// ============================================================================

export const Default: Story = {
    render: (args) => {
        const [uploadedFiles, setUploadedFiles] = useState<
            Array<{ file: File; id: string; status: 'success' | 'error' }>
        >([])
        const [state, setState] = useState<UploadState>(UploadState.IDLE)

        const handleDrop = (
            acceptedFiles: File[],
            rejectedFiles: Array<{
                file: File
                errors: Array<{ code: string; message: string }>
            }>
        ) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)

            if (acceptedFiles.length > 0) {
                // Set uploaded files
                const newFiles = acceptedFiles.map((file, index) => ({
                    file,
                    id: `file-${Date.now()}-${index}`,
                    status: 'success' as const,
                }))
                setUploadedFiles(newFiles)
                setState(UploadState.SUCCESS)
            } else if (rejectedFiles.length > 0) {
                // Set failed files
                const failedFiles = rejectedFiles.map((rejection, index) => ({
                    file: rejection.file,
                    id: `file-${Date.now()}-${index}`,
                    status: 'error' as const,
                    error: rejection.errors[0]?.message || 'File rejected',
                }))
                setUploadedFiles(failedFiles)
                setState(UploadState.ERROR)
            }
        }

        const handleFileRemove = (fileId: string) => {
            setUploadedFiles((prev) => {
                const updated = prev.filter((f) => f.id !== fileId)
                if (updated.length === 0) {
                    setState(UploadState.IDLE)
                }
                return updated
            })
        }

        return (
            <Upload
                {...args}
                state={state}
                uploadedFiles={uploadedFiles.filter(
                    (f) => f.status === 'success'
                )}
                failedFiles={uploadedFiles.filter((f) => f.status === 'error')}
                onDrop={handleDrop}
                onFileRemove={handleFileRemove}
            />
        )
    },
    args: {
        label: 'Upload File',
        description: 'Choose a file or drag & drop it here',
        onDrop: () => {},
    },
}

export const WithLabel: Story = {
    args: {
        label: 'Upload Document',
        subLabel: 'PDF, DOCX only',
        description: 'Maximum file size: 5MB',
        helpIconHintText: 'Supported formats: PDF, DOCX. Maximum size: 5MB.',
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
    },
}

export const Required: Story = {
    args: {
        label: 'Upload Document',
        description: 'Required field',
        required: true,
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
    },
}

export const MultipleFiles: Story = {
    args: {
        label: 'Upload Files',
        description: 'You can upload multiple files',
        multiple: true,
        maxFiles: 5,
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
    },
}

export const WithFileTypeRestriction: Story = {
    args: {
        label: 'Upload Image',
        description: 'PNG, JPG, GIF only',
        accept: ['.png', '.jpg', '.jpeg', '.gif'],
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
    },
}

export const WithSizeLimit: Story = {
    args: {
        label: 'Upload Document',
        description: 'Maximum file size: 2MB',
        maxSize: 2 * 1024 * 1024, // 2MB
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
    },
}

export const Disabled: Story = {
    args: {
        label: 'Upload File',
        description: 'This upload is disabled',
        disabled: true,
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
    },
}

export const WithError: Story = {
    args: {
        label: 'Upload File',
        description: 'Please upload a valid file',
        errorText: 'File upload failed. Please try again.',
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
    },
}

export const WithCustomChildren: Story = {
    args: {
        label: 'Upload File',
        description: 'Custom upload area',
        children: <FileText size={48} color="#6b7280" />,
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
    },
}

export const UploadingState: Story = {
    args: {
        label: 'Upload File',
        description: 'Upload in progress',
        state: UploadState.UPLOADING,
        uploadingFiles: [
            {
                file: createMockFile('document.pdf'),
                progress: 45,
                status: UploadState.UPLOADING,
                id: '1',
            },
        ],
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
    },
}

export const SuccessState: Story = {
    args: {
        label: 'Upload File',
        description: 'File uploaded successfully',
        state: UploadState.SUCCESS,
        uploadedFiles: [
            {
                file: createMockFile('document.pdf'),
                id: '1',
                status: 'success',
            },
        ],
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
        onFileRemove: (fileId) => {
            console.log('Remove file:', fileId)
        },
    },
}

export const SuccessStateMultiple: Story = {
    args: {
        label: 'Upload Files',
        description: 'Files uploaded successfully',
        multiple: true,
        state: UploadState.SUCCESS,
        uploadedFiles: [
            {
                file: createMockFile('document1.pdf'),
                id: '1',
                status: 'success',
            },
            {
                file: createMockFile('image1.png'),
                id: '2',
                status: 'success',
            },
            {
                file: createMockFile('document2.docx'),
                id: '3',
                status: 'success',
            },
        ],
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
        onFileRemove: (fileId) => {
            console.log('Remove file:', fileId)
        },
    },
}

export const ErrorState: Story = {
    args: {
        label: 'Upload File',
        description: 'Upload failed',
        state: UploadState.ERROR,
        errorText: 'File upload failed. Please try again.',
        failedFiles: [
            {
                file: createMockFile('invalid.zip'),
                id: '1',
                status: 'error',
                error: 'File type not supported',
            },
        ],
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
        onFileRemove: (fileId) => {
            console.log('Remove file:', fileId)
        },
    },
}

export const MixedState: Story = {
    args: {
        label: 'Upload Files',
        description: 'Some files uploaded successfully, some failed',
        multiple: true,
        uploadedFiles: [
            {
                file: createMockFile('document.pdf'),
                id: '1',
                status: 'success',
            },
            {
                file: createMockFile('image.png'),
                id: '2',
                status: 'success',
            },
        ],
        failedFiles: [
            {
                file: createMockFile('invalid.zip'),
                id: '3',
                status: 'error',
                error: 'File type not supported',
            },
        ],
        onDrop: (acceptedFiles, rejectedFiles) => {
            console.log('Accepted files:', acceptedFiles)
            console.log('Rejected files:', rejectedFiles)
        },
        onFileRemove: (fileId) => {
            console.log('Remove file:', fileId)
        },
    },
}

// Interactive example with state management
export const Interactive: Story = {
    render: (args) => {
        const [uploadedFiles, setUploadedFiles] = useState<
            Array<{ file: File; id: string; status: 'success' | 'error' }>
        >([])
        const [uploadingFiles, setUploadingFiles] = useState<
            Array<{
                file: File
                progress: number
                status: UploadState
                id: string
            }>
        >([])
        const [state, setState] = useState<UploadState>(UploadState.IDLE)

        const handleDrop = (
            acceptedFiles: File[],
            rejectedFiles: Array<{
                file: File
                errors: Array<{ code: string; message: string }>
            }>
        ) => {
            if (acceptedFiles.length > 0) {
                // Simulate upload progress
                const file = acceptedFiles[0]
                const fileId = `file-${Date.now()}`
                setState(UploadState.UPLOADING)
                setUploadingFiles([
                    {
                        file,
                        progress: 0,
                        status: UploadState.UPLOADING,
                        id: fileId,
                    },
                ])

                // Simulate progress
                let progress = 0
                const interval = setInterval(() => {
                    progress += 10
                    setUploadingFiles([
                        {
                            file,
                            progress,
                            status: UploadState.UPLOADING,
                            id: fileId,
                        },
                    ])

                    if (progress >= 100) {
                        clearInterval(interval)
                        setUploadingFiles([])
                        setUploadedFiles([
                            {
                                file,
                                id: fileId,
                                status: 'success',
                            },
                        ])
                        setState(UploadState.SUCCESS)
                    }
                }, 200)
            }

            if (rejectedFiles.length > 0) {
                setState(UploadState.ERROR)
            }
        }

        const handleFileRemove = (fileId: string) => {
            setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
            if (uploadedFiles.length === 1) {
                setState(UploadState.IDLE)
            }
        }

        return (
            <Upload
                {...args}
                state={state}
                uploadingFiles={uploadingFiles}
                uploadedFiles={uploadedFiles}
                onDrop={handleDrop}
                onFileRemove={handleFileRemove}
            />
        )
    },
    args: {
        label: 'Upload File',
        description: 'Try uploading a file to see the upload progress',
        multiple: false,
        onDrop: () => {},
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating keyboard navigation, ARIA attributes, screen reader support, and WCAG compliance
 */
export const Accessibility: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                padding: '24px',
                maxWidth: '800px',
            }}
        >
            <section>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    Keyboard Navigation
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    Use Tab to navigate to the Browse Files button, then press
                    Enter or Space to open the file dialog.
                </p>
                <Upload
                    label="Upload File"
                    description="Tab to focus, then press Enter or Space"
                    onDrop={(acceptedFiles, rejectedFiles) => {
                        console.log('Accepted files:', acceptedFiles)
                        console.log('Rejected files:', rejectedFiles)
                    }}
                />
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    Label Association
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    File input is properly associated with label via htmlFor/id.
                    Screen readers announce the label when focusing the input.
                </p>
                <Upload
                    label="Upload Document"
                    description="Label is associated with file input"
                    required={true}
                    onDrop={(acceptedFiles, rejectedFiles) => {
                        console.log('Accepted files:', acceptedFiles)
                        console.log('Rejected files:', rejectedFiles)
                    }}
                />
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    Help Text & Descriptions
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    Description and help icon hint text are associated via
                    aria-describedby. Screen readers announce these when
                    focusing the upload area.
                </p>
                <Upload
                    label="Upload File"
                    description="Maximum file size: 5MB"
                    helpIconHintText="Supported formats: PDF, DOCX. Maximum size: 5MB."
                    onDrop={(acceptedFiles, rejectedFiles) => {
                        console.log('Accepted files:', acceptedFiles)
                        console.log('Rejected files:', rejectedFiles)
                    }}
                />
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    Error State
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    Error messages are announced via role="alert" and
                    aria-live="polite". File input has aria-invalid="true" and
                    aria-describedby links to error message.
                </p>
                <Upload
                    label="Upload File"
                    description="Please upload a valid file"
                    errorText="File upload failed. Please try again."
                    onDrop={(acceptedFiles, rejectedFiles) => {
                        console.log('Accepted files:', acceptedFiles)
                        console.log('Rejected files:', rejectedFiles)
                    }}
                />
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    Upload Progress
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    Progress bar announces upload percentage via aria-valuenow,
                    aria-valuemin, aria-valuemax, and aria-label.
                </p>
                <Upload
                    label="Upload File"
                    description="Upload in progress"
                    state={UploadState.UPLOADING}
                    uploadingFiles={[
                        {
                            file: createMockFile('document.pdf'),
                            progress: 65,
                            status: UploadState.UPLOADING,
                            id: '1',
                        },
                    ]}
                    onDrop={(acceptedFiles, rejectedFiles) => {
                        console.log('Accepted files:', acceptedFiles)
                        console.log('Rejected files:', rejectedFiles)
                    }}
                />
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    File Remove Buttons
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    File remove buttons (X icons) are keyboard accessible. Tab
                    to focus, then press Enter or Space to remove. Each button
                    has aria-label="Remove [filename]".
                </p>
                <Upload
                    label="Upload Files"
                    description="Files uploaded successfully"
                    multiple={true}
                    state={UploadState.SUCCESS}
                    uploadedFiles={[
                        {
                            file: createMockFile('document1.pdf'),
                            id: '1',
                            status: 'success',
                        },
                        {
                            file: createMockFile('image1.png'),
                            id: '2',
                            status: 'success',
                        },
                    ]}
                    onDrop={(acceptedFiles, rejectedFiles) => {
                        console.log('Accepted files:', acceptedFiles)
                        console.log('Rejected files:', rejectedFiles)
                    }}
                    onFileRemove={(fileId) => {
                        console.log('Remove file:', fileId)
                    }}
                />
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    Disabled State
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    Disabled upload is removed from tab order. Browse Files
                    button is disabled and not keyboard accessible.
                </p>
                <Upload
                    label="Upload File"
                    description="This upload is disabled"
                    disabled={true}
                    onDrop={(acceptedFiles, rejectedFiles) => {
                        console.log('Accepted files:', acceptedFiles)
                        console.log('Rejected files:', rejectedFiles)
                    }}
                />
            </section>

            <section>
                <h3
                    style={{
                        marginBottom: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                    }}
                >
                    Focus Indicators
                </h3>
                <p
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    Browse Files button shows visible focus indicator when
                    focused via keyboard navigation.
                </p>
                <Upload
                    label="Upload File"
                    description="Tab to focus the Browse Files button"
                    onDrop={(acceptedFiles, rejectedFiles) => {
                        console.log('Accepted files:', acceptedFiles)
                        console.log('Rejected files:', rejectedFiles)
                    }}
                />
            </section>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating keyboard navigation, ARIA attributes, screen reader support, error handling, and WCAG compliance.

## Accessibility Verification

**How to verify accessibility:**

1. **Storybook a11y addon** (Accessibility panel - bottom):
   - Check for violations (should be 0 for AA compliance)
   - Review passing tests
   - See real-time accessibility status

2. **jest-axe unit tests**:
   \`\`\`bash
   pnpm test Upload.accessibility
   \`\`\`
   - Automated tests covering WCAG 2.0, 2.1, 2.2 criteria
   - ARIA attribute validation
   - Keyboard navigation testing

3. **Chromatic visual tests**:
   \`\`\`bash
   pnpm chromatic
   \`\`\`
   - Focus ring visibility
   - State changes
   - Responsive behavior

4. **Manual testing**:
   - VoiceOver (macOS) or NVDA (Windows)
   - Keyboard navigation (Tab, Enter, Space)
   - Color contrast verification using WebAIM Contrast Checker

## Accessibility Report

**Current Status**: 
- ✅ **WCAG 2.2 Level AA**: Fully Compliant (0 violations expected)
- ⚠️ **WCAG 2.2 Level AAA**: Partial Compliance (6/9 applicable criteria compliant)

**AAA Compliance Details**:
- ✅ Compliant: Visual Presentation (1.4.8), Images of Text (1.4.9), Keyboard No Exception (2.1.3), No Timing (2.2.3), Interruptions (2.2.4), Change on Request (3.2.5)
- ❌ Needs Improvement: Contrast Enhanced (1.4.6) - requires 7:1 ratio (currently 4.5:1 for AA)
- ⚠️ Verification Required: Target Size (2.5.5) - File remove buttons need 44x44px minimum for AAA
- 📋 See full accessibility report in Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 analysis

## Keyboard Navigation

- **Tab**: Navigate to Browse Files button
- **Enter/Space**: Open file dialog (when Browse Files button is focused)
- **Tab**: Navigate to file remove buttons (X icons) when files are uploaded
- **Enter/Space**: Remove file (when remove button is focused)
- **Escape**: Close file dialog (browser default)

## Screen Reader Support

- Upload container has \`role="region"\` with \`aria-label\`
- File input has proper label association via htmlFor/id
- Description text associated via \`aria-describedby\`
- Error messages announced via \`role="alert"\` and \`aria-live="polite"\`
- Progress bar announces upload percentage via \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\`, and \`aria-label\`
- Help icon has \`aria-label\` attribute
- File remove buttons have descriptive \`aria-label\` attributes
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('interactive'),
        // Extended delay for Chromatic to capture focus states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
