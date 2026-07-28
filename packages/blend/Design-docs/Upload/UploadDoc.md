# UploadV2 Component Documentation

## Requirements

Create a scalable upload input component that supports:

- **Controlled files**: Single source of truth via `files` and `onChange`
- **Labels**: Primary label, optional subLabel, optional required indicator
- **States**: Idle, uploading, success, error, disabled
- **Upload modes**: Single-file and multi-file upload (`multiple`)
- **Validation**: Max size (`maxSize`) and max count (`maxFiles`) with per-file validity (`isValid`)
- **Error reasons**: Typed reasons via `UploadErrorReason` (`oversized`, `maxFiles`, `invalidType`)
- **Slots**: Optional icon/content slot in upload container
- **Drag and drop**: Visual drag states (`drag_enter`, `drag_leave`, `drag_over`, `drop`)
- **Progress**: Upload progress support (`progressBarValue`, `progressBarMaxWidth`) in uploading state
- **Accessibility**: Native hidden file input, `required`, `aria-required`, `aria-invalid`, and fallback aria-label when label is absent
- **Theme**: Light/dark responsive tokens via `useResponsiveTokens('UPLOADV2')`

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│ [Top container: Label, SubLabel, Required *, Help icon]    │
├─────────────────────────────────────────────────────────────┤
│ [Upload container]                                          │
│   [slot/icon]                                               │
│   [header text + description / selected-file / status text]│
│   [browse/replace button OR progress bar OR file tags]     │
│   [error text (if applicable)]                              │
├─────────────────────────────────────────────────────────────┤
│ [Hidden native <input type="file">]                        │
└─────────────────────────────────────────────────────────────┘
```

- **Top container**: `InputLabelsV2` renders label, subLabel, help tooltip, required marker
- **Upload container**: Handles visuals and interaction for click/drag/upload states
- **File tags**: In `multiple` mode, selected files render as removable tags
- **Hidden input**: Real file input handles browser file picker and file list changes

## Props & Types

```typescript
enum UploadState {
    IDLE = 'idle',
    UPLOADING = 'uploading',
    SUCCESS = 'success',
    ERROR = 'error',
    DISABLED = 'disabled',
}

enum UploadDragState {
    DRAG_ENTER = 'drag_enter',
    DRAG_LEAVE = 'drag_leave',
    DRAG_OVER = 'drag_over',
    DROP = 'drop',
}

const UploadErrorReason = {
    OVERSIZED: 'oversized',
    MAX_FILES: 'maxFiles',
    INVALID_TYPE: 'invalidType',
} as const

type UploadFileV2 = {
    id?: string
    file: File
    isValid: boolean
    errorReason?: 'oversized' | 'maxFiles' | 'invalidType'
}

type UploadV2Props = {
    label?: string
    subLabel?: string
    description?: string
    size?: InputSizeV2
    helpIconText?: string
    inputId?: string
    required?: boolean
    multiple?: boolean
    acceptedFileTypes?: string[]
    disabled?: boolean
    slot?: React.ReactNode
    files?: UploadFileV2[]
    onChange?: (files: UploadFileV2[]) => void
    state?: UploadState
    errorText?: string
    maxSize?: number
    maxFiles?: number
    progressBarValue?: number
    progressBarMaxWidth?: string
    uploadHeaderText?: string
} & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'style' | 'className' | 'multiple' | 'slot' | 'onChange'
>
```

### Notes

- Native input `onChange` is omitted intentionally to avoid conflict with component-level `onChange(files)`
- `files` is fully controlled by consumer; component computes next files and calls `onChange`
- `id` on `UploadFileV2` enables stable remove behavior for duplicate filenames

## Usage

```tsx
import { UploadV2, UploadState } from '@juspay/blend-design-system/...'
import { Upload } from 'lucide-react'

const [files, setFiles] = useState<UploadFileV2[]>([])

<UploadV2
  label="Upload Files"
  subLabel="Max 8MB"
  description=".csv only | Max size 8 MB"
  state={UploadState.IDLE}
  multiple
  maxSize={8 * 1024 * 1024}
  maxFiles={2}
  acceptedFileTypes={['.csv']}
  files={files}
  onChange={setFiles}
  slot={<Upload size={32} />}
/>
```

## Final Token Type

`UploadV2` uses responsive token bundles (`sm`/`md`/`lg` breakpoints) with component state keys (`idle`, `uploading`, `success`, `error`, `disabled`) and drag state keys.

At a high level, tokens cover:

- **Container layout**: `gap`, paddings, border radius
- **Header text**: title/description/error text typography and colors
- **Upload surface**: border/background by upload and drag states
- **File tags and spacing**: tag stack spacing, width constraints
- **Progress area**: max width and spacing alignment

## Design Decisions

### 1. Controlled file model with validation metadata

**Decision**: Keep file list controlled (`files`) and attach `isValid` + `errorReason` per file.

**Rationale**: Consumers can render mixed valid/invalid files and decide upload behavior without losing rejected file context.

### 2. Duplicate-filename safe removal

**Decision**: Remove files by stable item identity (`id` fallback strategy), not just file name.

**Rationale**: Two files can have the same `file.name`; name-based removal can accidentally remove multiple entries.

### 3. Internal state derivation with external override

**Decision**: Component tracks internal `uploadState`, synchronized from external `state`.

**Rationale**: Allows both controlled state usage and internal transitions (e.g., validation-triggered error visuals).

### 4. Graceful error reason normalization

**Decision**: Normalize error reasons before building messages.

**Rationale**: Protects UI from unknown/custom values and guarantees fallback messaging.

### 5. Dynamic error messages with limits

**Decision**: Include configured `maxSize`/`maxFiles` in validation messages.

**Rationale**: Error copy becomes actionable and contextual (`Max size is 8 MB`, `Maximum 2 files allowed`).

### 6. Interaction guard in blocked states

**Decision**: Block click/drag/remove interactions when `disabled`, `uploading`, or `success`.

**Rationale**: Prevents accidental mutations during non-editable phases and keeps behavior predictable.

### 7. Hidden native input + visible rich container

**Decision**: Use a hidden native file input and route user interactions through styled UI.

**Rationale**: Keeps browser file picker semantics while enabling custom visuals and drag-drop UX.
