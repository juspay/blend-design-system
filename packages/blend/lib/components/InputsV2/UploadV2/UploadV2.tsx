import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react'
import Block from '../../Primitives/Block/Block'
import {
    UploadDragState,
    UploadErrorReason,
    UploadFileV2,
    UploadState,
    UploadV2Props,
} from './UploadV2.types'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import { InputLabelsV2Tokens } from '../inputV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { UploadV2TokensType } from './UploadV2.tokens.types'
import { InputSizeV2, InputStateV2, type AnyRef } from '../inputV2.types'
import { createClickHandler, getFileId, isFileTypeAccepted } from './utils'
import UploadContainerV2 from './UploadContainerV2'
import { generateAccessibilityIds, setExternalRef } from '../utils/utils'
import InputFooterV2 from '../utils/InputFooter/InputFooterV2'
import { filterBlockedProps } from '../../../utils/prop-helpers'

const UploadV2 = forwardRef<HTMLInputElement, UploadV2Props>(
    (
        {
            id: providedId,
            name = 'upload',
            label,
            subLabel,
            description = '',
            size = InputSizeV2.SM,
            helpIconText,
            required,
            multiple = true,
            acceptedFileTypes = [],
            disabled = false,
            slot,
            files = [],
            onChange,
            state = UploadState.IDLE,
            error = { show: false, message: '' },
            maxSize = 0,
            maxFiles = multiple ? undefined : 1,
            errorText = '',
            hintText,
            progressBarValue = 0,
            progressBarMaxWidth = '300px',
            uploadHeaderText = 'Choose a file or drag & drop it here',
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<UploadV2TokensType>('UPLOADV2')
        const fileInputRef = useRef<HTMLInputElement>(null)
        const generatedUploadId = useId()
        const uploadId = providedId ?? generatedUploadId
        const { errorId, hintId } = generateAccessibilityIds(uploadId)
        const filteredRest = filterBlockedProps(rest)
        const [uploadState, setUploadState] = useState<UploadState>(
            UploadState.IDLE
        )
        const [dragState, setDragState] = useState<UploadDragState>(
            UploadDragState.DRAG_LEAVE
        )
        const isDisabled = disabled || state === UploadState.DISABLED
        const isUploading = state === UploadState.UPLOADING
        const isSuccess = state === UploadState.SUCCESS
        const isInteractionBlocked = isDisabled || isUploading || isSuccess
        const hasInvalidFiles = files.some((file) => !file.isValid)
        const displayUploadState = isDisabled
            ? UploadState.DISABLED
            : hasInvalidFiles
              ? UploadState.ERROR
              : uploadState
        const descriptionId =
            description && files.length === 0 && !isUploading
                ? `${uploadId}-description`
                : undefined
        const hasError = Boolean(
            error?.show || displayUploadState === UploadState.ERROR
        )
        const showLabelError = Boolean(error?.show || (!multiple && hasError))
        const effectiveErrorText = error?.message || errorText
        const shouldDescribeError = Boolean(
            hasError && (effectiveErrorText || (!multiple && hasInvalidFiles))
        )
        const ariaDescribedBy = useMemo(() => {
            const ids = [
                descriptionId,
                hintText && !hasError ? hintId : undefined,
                shouldDescribeError ? errorId : undefined,
            ].filter(Boolean) as string[]
            return ids.length > 0 ? ids.join(' ') : undefined
        }, [
            descriptionId,
            errorId,
            hasError,
            hintId,
            hintText,
            shouldDescribeError,
        ])
        const setInputRef = (node: HTMLInputElement | null) => {
            fileInputRef.current = node
            setExternalRef(ref as AnyRef<HTMLInputElement>, node)
        }

        // Validate files and mark with isValid flag instead of filtering
        const validateFiles = (newFiles: File[]): UploadFileV2[] => {
            const limit = maxFiles ?? (multiple ? undefined : 1)
            const remainingSlots =
                limit && multiple ? limit - files.length : Infinity
            let hasRejection = false

            const validatedFiles: UploadFileV2[] = newFiles.map(
                (file, index) => {
                    // Check maxFiles limit
                    if (limit && index >= remainingSlots) {
                        hasRejection = true
                        return {
                            id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
                            file,
                            isValid: false,
                            errorReason: UploadErrorReason.MAX_FILES,
                        }
                    }

                    // Check accepted file types for drag/drop and direct file input.
                    if (!isFileTypeAccepted(file, acceptedFileTypes)) {
                        hasRejection = true
                        return {
                            id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
                            file,
                            isValid: false,
                            errorReason: UploadErrorReason.INVALID_TYPE,
                        }
                    }

                    // Check maxSize
                    if (maxSize && file.size > maxSize) {
                        hasRejection = true
                        return {
                            id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
                            file,
                            isValid: false,
                            errorReason: UploadErrorReason.OVERSIZED,
                        }
                    }

                    return {
                        id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}-${index}`,
                        file,
                        isValid: true,
                    }
                }
            )

            // Set state based on validation results
            if (hasRejection) {
                setUploadState(UploadState.ERROR)
            } else if (validatedFiles.length > 0) {
                setUploadState(UploadState.IDLE)
            }

            return validatedFiles
        }
        useEffect(() => {
            if (state === UploadState.UPLOADING) {
                setUploadState(UploadState.UPLOADING)
            } else if (state === UploadState.SUCCESS) {
                setUploadState(UploadState.SUCCESS)
            } else if (state === UploadState.ERROR) {
                setUploadState(UploadState.ERROR)
            } else if (isDisabled) {
                setUploadState(UploadState.DISABLED)
            } else {
                setUploadState(UploadState.IDLE)
            }
        }, [state, isDisabled])
        return (
            <Block
                data-upload={label ?? ''}
                data-status={isDisabled ? 'disabled' : 'enabled'}
                display="flex"
                flexDirection="column"
                gap={tokens.gap}
                width="100%"
            >
                <InputLabelsV2
                    tokens={tokens.topContainer as InputLabelsV2Tokens}
                    label={label}
                    sublabel={subLabel}
                    size={size}
                    state={
                        showLabelError
                            ? InputStateV2.ERROR
                            : displayUploadState === UploadState.DISABLED
                              ? InputStateV2.DISABLED
                              : InputStateV2.DEFAULT
                    }
                    helpIconText={helpIconText}
                    inputId={uploadId}
                    required={required}
                />
                {/* fake input file */}
                <Block
                    cursor={isDisabled ? 'not-allowed' : 'pointer'}
                    onClick={(e) => {
                        if (isInteractionBlocked) {
                            e.preventDefault()
                            return
                        }
                        createClickHandler(
                            isDisabled,
                            fileInputRef as React.RefObject<HTMLInputElement>
                        )()
                    }}
                    onDragEnter={(e) => {
                        if (isInteractionBlocked) {
                            e.preventDefault()
                            return
                        }
                        setDragState(UploadDragState.DRAG_ENTER)
                    }}
                    onDragLeave={(e) => {
                        if (isInteractionBlocked) {
                            e.preventDefault()
                            return
                        }
                        setDragState(UploadDragState.DRAG_LEAVE)
                    }}
                    onDragOver={(e) => {
                        if (isInteractionBlocked) {
                            e.preventDefault()
                            return
                        }
                        e.preventDefault()
                        setDragState(UploadDragState.DRAG_OVER)
                    }}
                    onDrop={(e) => {
                        if (isInteractionBlocked) {
                            e.preventDefault()
                            return
                        }
                        e.preventDefault()
                        e.stopPropagation()
                        const droppedFiles = Array.from(e.dataTransfer.files)
                        const validatedFiles = validateFiles(droppedFiles)
                        const updatedFiles = multiple
                            ? [...files, ...validatedFiles]
                            : validatedFiles[0]
                              ? [validatedFiles[0]]
                              : []
                        onChange?.(updatedFiles)
                        setDragState(UploadDragState.DRAG_LEAVE)
                    }}
                >
                    <UploadContainerV2
                        description={description}
                        descriptionId={descriptionId}
                        slot={slot}
                        disabled={isDisabled}
                        onClick={() => {
                            fileInputRef.current?.click()
                        }}
                        tokens={tokens}
                        files={files}
                        multiple={multiple}
                        onFileRemove={(fileId) => {
                            const updatedFiles = files.filter(
                                (f, index) => getFileId(f, index) !== fileId
                            )
                            // Check if any invalid files remain
                            const hasInvalidFiles = updatedFiles.some(
                                (f) => !f.isValid
                            )
                            setUploadState(
                                hasInvalidFiles
                                    ? UploadState.ERROR
                                    : UploadState.IDLE
                            )
                            onChange?.(updatedFiles)
                        }}
                        state={displayUploadState}
                        errorText={error?.message ? '' : errorText}
                        errorId={error?.message ? undefined : errorId}
                        progressBarValue={progressBarValue}
                        progressBarMaxWidth={progressBarMaxWidth}
                        uploadHeaderText={uploadHeaderText}
                        dragState={dragState}
                        maxSize={maxSize}
                        maxFiles={maxFiles}
                    />
                </Block>

                {/* real input file */}
                <input
                    {...filteredRest}
                    ref={setInputRef}
                    id={uploadId}
                    name={name}
                    type="file"
                    multiple={multiple}
                    accept={acceptedFileTypes.join(',')}
                    onChange={(e) => {
                        const newFiles = Array.from(e.target.files || [])
                        const validatedFiles = validateFiles(newFiles)
                        const updatedFiles = multiple
                            ? [...files, ...validatedFiles]
                            : validatedFiles[0]
                              ? [validatedFiles[0]]
                              : []
                        onChange?.(updatedFiles)
                        e.target.value = ''
                    }}
                    disabled={isDisabled}
                    required={required}
                    aria-required={required}
                    aria-invalid={hasError}
                    aria-describedby={ariaDescribedBy}
                    aria-label={label ? undefined : 'File upload'}
                    style={{ display: 'none' }}
                />
                <InputFooterV2
                    tokens={tokens.bottomContainer}
                    error={Boolean(error?.show && error?.message)}
                    errorMessage={error?.message}
                    hintText={hintText}
                    errorId={errorId}
                    hintId={hintId}
                    size={size}
                />
            </Block>
        )
    }
)

UploadV2.displayName = 'UploadV2'
export default UploadV2
