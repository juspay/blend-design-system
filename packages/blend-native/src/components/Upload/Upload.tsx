import { forwardRef } from 'react'
import type { View as RNView } from 'react-native'
import {
    InputSizeV2,
    InputStateV2,
    UploadState,
    type UploadV2TokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { Block } from '../../primitives/Block'
import { FieldLabels } from '../shared/field/FieldLabels'
import { FieldFooter } from '../shared/field/FieldFooter'
import { UploadContainer } from './UploadContainer'
import { getUploadDisplayState } from './upload.utils'
import type { UploadNativeProps } from './upload.types'

/**
 * Upload — React Native implementation of web's `UploadV2`.
 *
 * A controlled file field: `files` + `onChange`, the caller owns state. The
 * app also owns picking — `onBrowse` fires when the drop zone or Browse /
 * Replace button is pressed, and the app produces `UploadFileNativeItem`s
 * (running the exported `validateUploadFiles` to mark them) before calling
 * `onChange`.
 *
 * State derivation is Upload-specific, not the shared `getFieldState`:
 * invalid files force ERROR even when `state` is IDLE, matching web's
 * `displayUploadState`.
 */
const Upload = forwardRef<RNView, UploadNativeProps>(function Upload(
    {
        label,
        subLabel,
        description = '',
        size = InputSizeV2.SM,
        required = false,
        multiple = true,
        disabled = false,
        slot,
        files = [],
        onChange,
        onBrowse,
        state = UploadState.IDLE,
        error = { show: false, message: '' },
        maxSize = 0,
        maxFiles,
        errorText = '',
        hintText,
        progressBarValue = 0,
        uploadHeaderText = 'Tap to upload files',
        testID,
        style,
    },
    ref
) {
    const tokens = useNativeTokens<UploadV2TokensType>('UPLOADV2')

    const isDisabled = disabled || state === UploadState.DISABLED
    const hasInvalidFiles = files.some((file) => !file.isValid)
    const displayState = getUploadDisplayState(state, disabled, hasInvalidFiles)

    // Labels/footer map the display state onto the InputStateV2 matrix the
    // shared field chrome consumes — exactly how TextInput does it.
    // `fieldState` below feeds the footer; the label uses `labelState`.

    // Web's `showLabelError`: single-file uploads surface the error on the
    // label as well; multi-file keeps the label neutral.
    const showLabelError = Boolean(
        error?.show || (!multiple && displayState === UploadState.ERROR)
    )
    const labelState = showLabelError
        ? InputStateV2.ERROR
        : displayState === UploadState.DISABLED
          ? InputStateV2.DISABLED
          : InputStateV2.DEFAULT

    const handleFileRemove = (fileId: string) => {
        const updatedFiles = files.filter(
            (file, index) =>
                (file.id ?? `${file.name}-${file.size}-${index}`) !== fileId
        )
        onChange?.(updatedFiles)
    }

    return (
        <Block
            ref={ref}
            flexDirection="column"
            gap={tokens.gap as string | number}
            width="100%"
            style={style}
            testID={testID}
        >
            <FieldLabels
                label={label}
                sublabel={subLabel}
                required={required}
                size={size}
                state={labelState}
                tokens={tokens.topContainer}
                testID={testID ? `${testID}-labels` : undefined}
            />

            <UploadContainer
                tokens={tokens}
                files={files}
                onFileRemove={handleFileRemove}
                onBrowse={onBrowse}
                multiple={multiple}
                state={displayState}
                disabled={isDisabled}
                description={description}
                slot={slot}
                errorText={error?.message ? '' : errorText}
                progressBarValue={progressBarValue}
                uploadHeaderText={uploadHeaderText}
                maxSize={maxSize}
                maxFiles={maxFiles ?? (multiple ? undefined : 1)}
                testID={testID ? `${testID}-container` : undefined}
            />

            <FieldFooter
                error={error}
                hintText={hintText}
                size={size}
                tokens={tokens.bottomContainer}
                testID={testID ? `${testID}-footer` : undefined}
            />
        </Block>
    )
})

Upload.displayName = 'Upload'

export default Upload
