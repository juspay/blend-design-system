import type { StyleProp, ViewStyle } from 'react-native'
import type {
    UploadBaseProps,
    UploadFileBase,
} from '@juspay/blend-design-system/node'

/**
 * A file in the native Upload — web's `UploadFileBase` with the two fields a
 * picker can supply that a DOM `File` cannot:
 *
 * - `uri` — opaque picker URI (content:// on Android, ph:// on iOS, file://
 *   from some pickers). The component never reads it; the app keeps it for
 *   its own upload call.
 * - `type` — the mime type, used by `validateUploadFiles` for
 *   `image/*`-style accept rules, mirroring web's `file.type`.
 */
export type UploadFileNativeItem = UploadFileBase & {
    uri?: string
    type?: string
}

/**
 * Props for the native `Upload` — the port of web's `UploadV2`.
 *
 * Derives from web's platform-neutral `UploadBaseProps` with the file list
 * re-typed to `UploadFileNativeItem`.
 *
 * Documented divergences (no drag-and-drop on RN):
 *
 * - No hidden `<input type="file">` and no drag handlers. The drop zone is a
 *   Pressable and "Browse Files" / "Replace File" fire `onBrowse` — the app
 *   owns file picking (the LinkButton "app owns navigation" precedent).
 * - `helpIconText` is omitted, matching every other native field until the
 *   cross-field FieldLabels+Tooltip follow-up lands.
 * - Web's `progressBarMaxWidth` has no native prop; the bar is clamped by a
 *   wrapping `Block` at 300.
 * - The `UploadDragState` token keys exist in the web tokens but are never
 *   indexed natively — there is no drag state to resolve.
 */
export type UploadNativeProps = Omit<UploadBaseProps, 'files' | 'onChange'> & {
    files?: UploadFileNativeItem[]
    onChange?: (files: UploadFileNativeItem[]) => void
    /** App-owned file picking: fired when Browse Files / the drop zone is pressed. */
    onBrowse?: () => void
    testID?: string
    style?: StyleProp<ViewStyle>
}
