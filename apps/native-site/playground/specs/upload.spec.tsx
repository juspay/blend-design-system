import { useState } from 'react'
import * as ExpoDocumentPicker from 'expo-document-picker'
import { Upload, UploadState, validateUploadFiles } from 'blend-native'
import type { UploadFileNativeItem, UploadNativeProps } from 'blend-native'
import { addProps } from '../snippet'
import { enumOptions } from '../types'
import type { ComponentSpec } from '../types'

/**
 * Real file picking via `expo-document-picker` — this is exactly what the
 * `onBrowse` contract is for: the component fires the callback, the app
 * opens its picker of choice, marks the results with `validateUploadFiles`
 * (the API contract — the component trusts the app to validate), and hands
 * them back through `onChange`.
 *
 * Web `<input type="file">` parity: no accept filter, any file type picks.
 * Only the size cap is enforced, same as an unconstrained web field.
 */
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

/** `files` is controlled; the preview holds them and appends validated picks. */
function LiveUpload(props: UploadNativeProps) {
    const [files, setFiles] = useState<UploadFileNativeItem[]>([])

    const handleBrowse = async () => {
        const result = await ExpoDocumentPicker.getDocumentAsync({
            type: '*/*',
            multiple: props.multiple ?? true,
            copyToCacheDirectory: true,
        })
        if (result.canceled) return

        const picked: UploadFileNativeItem[] = result.assets.map((asset) => ({
            name: asset.name,
            size: asset.size ?? 0,
            isValid: true,
            uri: asset.uri,
            type: asset.mimeType,
        }))

        const marked = validateUploadFiles(picked, {
            maxSize: MAX_SIZE,
            multiple: props.multiple ?? true,
            existingCount: files.length,
        })
        const updated =
            props.multiple === false
                ? marked.slice(0, 1)
                : [...files, ...marked]
        setFiles(updated)
        props.onChange?.(updated)
    }

    return (
        <Upload
            {...props}
            files={files}
            onChange={(next) => {
                setFiles(next)
                props.onChange?.(next)
            }}
            onBrowse={handleBrowse}
            maxSize={MAX_SIZE}
        />
    )
}

const spec: ComponentSpec<UploadNativeProps> = {
    name: 'Upload',
    summary:
        'Controlled file field with a real system file picker (`expo-document-picker` behind `onBrowse` — the app owns picking). Any file type, like an unconstrained web field; a 5 MB cap is the only validation. The +N overflow becomes a bottom sheet on phones.',
    mode: 'inline',
    defaults: {
        label: 'Attachments',
        description: 'Any file type, up to 5 MB each',
        multiple: true,
        state: UploadState.IDLE,
    },
    controls: [
        {
            kind: 'select',
            key: 'state',
            label: 'State',
            options: enumOptions(UploadState, 'UploadState'),
        },
        {
            kind: 'text',
            key: 'label',
            label: 'Label',
            group: 'Content',
            always: true,
        },
        {
            kind: 'text',
            key: 'description',
            label: 'Description',
            group: 'Content',
        },
        {
            kind: 'text',
            key: 'uploadHeaderText',
            label: 'Header text',
            group: 'Content',
            placeholder: 'Tap to upload files',
        },
        {
            kind: 'text',
            key: 'hintText',
            label: 'Hint',
            group: 'Content',
            placeholder: 'Shown under the field',
        },
        {
            kind: 'toggle',
            key: 'multiple',
            label: 'Multiple',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'disabled',
            label: 'Disabled',
            group: 'State',
        },
        {
            kind: 'toggle',
            key: 'required',
            label: 'Required',
            group: 'State',
        },
    ],
    render: (props) => <LiveUpload {...props} style={{ width: '100%' }} />,
    wrapSnippet: (inner) =>
        addProps(inner, [
            'files={files}',
            'onChange={setFiles}',
            'onBrowse={openPicker}',
            'maxSize={5 * 1024 * 1024}',
        ]),
}

export default spec
