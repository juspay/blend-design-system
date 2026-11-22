/**
 * UploadV2 strings.
 *
 * Values are transcribed verbatim from `InputsV2/UploadV2/UploadContainerV2.tsx`
 * and `InputsV2/UploadV2/utils.ts` so the migrated component renders
 * byte-identical English.
 *
 * Zero imports. Components import THIS fragment, never `catalog/index.ts`.
 */
export const UPLOAD_V2_MESSAGES = {
    'upload-v2.action.browse-files': 'Browse Files',
    'upload-v2.action.replace-file': 'Replace File',

    'upload-v2.label.drop-hint': 'Choose a file or drag & drop it here',
    'upload-v2.label.files-added': 'Files successfully added',
    'upload-v2.label.files-uploaded': 'Files uploaded',
    'upload-v2.label.selected-file': 'Selected file: {name}',
    'upload-v2.label.upload-succeeded':
        "We've successfully uploaded the following files",
    'upload-v2.label.partial-result': '{succeeded} succeeded, {failed} failed',

    'upload-v2.status.uploading': 'Please wait while uploading',
    'upload-v2.status.failed': 'Failed',

    // Both forms of each validation message are kept, because the bounded
    // variant interpolates a limit the unbounded one does not have.
    'upload-v2.error.oversized': 'File is too large',
    'upload-v2.error.oversized-max': 'File is too large. Max size is {maxSize}',
    'upload-v2.error.max-files': 'File limit exceeded',
    'upload-v2.error.max-files-limit':
        'File limit exceeded. Maximum {maxFiles} files allowed',
    'upload-v2.error.invalid-type': 'Invalid file type',
    'upload-v2.error.invalid-file': 'Invalid file',

    // Fallback accessible name for the hidden file input when the consumer
    // passes no visible `label`.
    'upload-v2.a11y.file-input': 'File upload',
    'upload-v2.a11y.remove-file': 'Remove {name}',
    'upload-v2.a11y.show-more-files.one': 'Show {count} more file',
    'upload-v2.a11y.show-more-files.other': 'Show {count} more files',
} as const
