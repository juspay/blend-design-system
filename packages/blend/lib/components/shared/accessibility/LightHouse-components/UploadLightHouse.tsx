import { Upload, UploadState } from '../../../Upload'

const UploadLightHouse = () => {
    // Create mock File objects for examples
    const createMockFile = (name: string, type: string): File => {
        const blob = new Blob([''], { type })
        return new File([blob], name, { type, lastModified: Date.now() })
    }

    const mockFile1 = createMockFile('document.pdf', 'application/pdf')
    const mockFile2 = createMockFile('image.jpg', 'image/jpeg')
    const mockFile3 = createMockFile(
        'spreadsheet.xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    return (
        <>
            {/* Basic Upload - Single */}
            <Upload label="Basic Upload" />

            {/* Basic Upload - Multiple */}
            <Upload label="Multiple Upload" multiple={true} />

            {/* With Label */}
            <Upload label="File Upload" />

            {/* With Sublabel */}
            <Upload label="Upload Files" subLabel="Optional" />

            {/* With Help Icon */}
            <Upload
                label="Upload with Help"
                helpIconHintText="Accepted file types: PDF, JPG, PNG"
            />

            {/* Required */}
            <Upload label="Required Upload" required={true} />

            {/* Disabled */}
            <Upload label="Disabled Upload" disabled={true} />

            {/* With Description */}
            <Upload
                label="Upload with Description"
                description="Drag and drop files here or click to browse"
            />

            {/* With Accept Types */}
            <Upload
                label="PDF Only"
                accept={['application/pdf']}
                description="Only PDF files are accepted"
            />

            {/* With Multiple Accept Types */}
            <Upload
                label="Images Only"
                accept={['image/jpeg', 'image/png', 'image/gif']}
                description="Only image files are accepted"
            />

            {/* With Max Size */}
            <Upload
                label="Max Size 5MB"
                maxSize={5 * 1024 * 1024}
                description="Maximum file size: 5MB"
            />

            {/* With Max Files */}
            <Upload
                label="Max 3 Files"
                multiple={true}
                maxFiles={3}
                description="You can upload up to 3 files"
            />

            {/* With Error Text */}
            <Upload
                label="Upload with Error"
                errorText="Please select a valid file"
            />

            {/* With Custom Children */}
            <Upload label="Custom Content">
                <div>
                    <p>Custom upload content</p>
                    <p>Click or drag files here</p>
                </div>
            </Upload>

            {/* Controlled Value - Single File */}
            <Upload
                label="Controlled Single File"
                value={mockFile1}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* Controlled Value - Multiple Files */}
            <Upload
                label="Controlled Multiple Files"
                multiple={true}
                value={[mockFile1, mockFile2]}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
            />

            {/* With State - Idle */}
            <Upload label="Idle State" state={UploadState.IDLE} />

            {/* With State - Uploading */}
            <Upload
                label="Uploading State"
                state={UploadState.UPLOADING}
                uploadingFiles={[
                    {
                        file: mockFile1,
                        progress: 50,
                        status: UploadState.UPLOADING,
                        id: '1',
                    },
                ]}
            />

            {/* With State - Success */}
            <Upload
                label="Success State"
                state={UploadState.SUCCESS}
                uploadedFiles={[
                    {
                        file: mockFile1,
                        id: '1',
                        status: 'success',
                    },
                ]}
            />

            {/* With State - Error */}
            <Upload
                label="Error State"
                state={UploadState.ERROR}
                failedFiles={[
                    {
                        file: mockFile1,
                        id: '1',
                        status: 'error',
                        error: 'File too large',
                    },
                ]}
            />

            {/* Multiple Files - Success */}
            <Upload
                label="Multiple Files Success"
                multiple={true}
                state={UploadState.SUCCESS}
                uploadedFiles={[
                    {
                        file: mockFile1,
                        id: '1',
                        status: 'success',
                    },
                    {
                        file: mockFile2,
                        id: '2',
                        status: 'success',
                    },
                    {
                        file: mockFile3,
                        id: '3',
                        status: 'success',
                    },
                ]}
            />

            {/* Multiple Files - Mixed State */}
            <Upload
                label="Mixed State"
                multiple={true}
                uploadedFiles={[
                    {
                        file: mockFile1,
                        id: '1',
                        status: 'success',
                    },
                    {
                        file: mockFile2,
                        id: '2',
                        status: 'success',
                    },
                ]}
                failedFiles={[
                    {
                        file: mockFile3,
                        id: '3',
                        status: 'error',
                        error: 'File type not supported',
                    },
                ]}
            />

            {/* With Handlers */}
            <Upload
                label="With Handlers"
                onDrop={(acceptedFiles, rejectedFiles) => {
                    console.log('Accepted:', acceptedFiles)
                    console.log('Rejected:', rejectedFiles)
                }}
                onDropAccepted={(files) => {
                    console.log('Accepted files:', files)
                }}
                onDropRejected={(rejections) => {
                    console.log('Rejected files:', rejections)
                }}
                onFileRemove={(fileId) => {
                    console.log('File removed:', fileId)
                }}
                onReplaceFile={() => {
                    console.log('File replaced')
                }}
            />

            {/* Complex Example */}
            <Upload
                label="Complex Upload"
                subLabel="Required"
                helpIconHintText="Upload documents in PDF or image format"
                description="Drag and drop files here or click to browse"
                multiple={true}
                accept={['application/pdf', 'image/jpeg', 'image/png']}
                maxSize={10 * 1024 * 1024}
                maxFiles={5}
                required={true}
                onChange={(value) => {
                    console.log('Value changed:', value)
                }}
                onDrop={(acceptedFiles, rejectedFiles) => {
                    console.log('Drop:', { acceptedFiles, rejectedFiles })
                }}
                onFileRemove={(fileId) => {
                    console.log('Remove:', fileId)
                }}
            />

            {/* With Controlled Drag State */}
            <Upload
                label="Controlled Drag State"
                isDragActive={true}
                isDragAccept={true}
            />

            {/* With Drag Reject */}
            <Upload label="Drag Reject State" isDragReject={true} />

            {/* Single File with Max Files */}
            <Upload
                label="Single File Upload"
                multiple={false}
                maxFiles={1}
                description="Upload a single file"
            />
        </>
    )
}

export default UploadLightHouse
