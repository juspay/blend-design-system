/**
 * Upload (V1) strings.
 *
 * Values are transcribed verbatim from `components/Upload/utils.ts`,
 * `components/Upload/Upload.tsx` and `components/Upload/components/*State.tsx`
 * so the migrated component renders byte-identical English.
 *
 * These keys are deliberately shared between `utils.ts`'s state-title and
 * state-description helpers and the `*State.tsx` components, which previously
 * held parallel copies of the same sentences. Three independent copies of one
 * string is how translations drift, so there is one key per sentence and every
 * site resolves it.
 *
 * Zero imports. Components import THIS fragment, never `catalog/index.ts`.
 */
export const UPLOAD_MESSAGES = {
    'upload.action.browse-files': 'Browse Files',
    'upload.action.replace-file': 'Replace file',

    'upload.label.drop-hint': 'Choose a file or drag & drop it here',
    'upload.label.drop-here': 'Drop files here',
    'upload.label.invalid-type': 'Invalid file type',

    'upload.status.uploading-named': "Uploading '{name}'...",
    'upload.status.uploading': 'Uploading files...',
    'upload.status.uploading-description':
        'Please wait while uploading your file',

    'upload.status.added.one': 'File successfully added',
    'upload.status.added.other': 'Files successfully added',
    'upload.status.uploaded-single': 'File uploaded successfully',
    'upload.status.uploaded-multiple':
        "We've successfully uploaded the following files",

    'upload.error.failed.one': 'File upload failed',
    'upload.error.failed.other': 'Failed to upload multiple files',
    'upload.error.retry': 'Upload failed. Please try again.',
    'upload.error.failed-short': 'Upload failed',
    'upload.error.files-failed': '{count} files failed',
    // Two explicit keys rather than the old "file(s)" parenthetical, which is
    // untranslatable in any language whose plural is not formed with "-s".
    'upload.error.failed-to-upload.one': '{count} file failed to upload',
    'upload.error.failed-to-upload.other': '{count} files failed to upload',
    'upload.error.rejected': 'File rejected',

    'upload.a11y.remove-file': 'Remove {name}',
    'upload.a11y.uploading-progress': 'Uploading {name}, {progress}% complete',
} as const
