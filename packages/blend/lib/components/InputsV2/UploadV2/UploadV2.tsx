import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import Block from '../../Primitives/Block/Block'
import {
    UploadDragState,
    UploadFileV2,
    UploadState,
    UploadV2Props,
} from './UploadV2.types'
import InputLabelsV2 from '../utils/InputLabels/InputLabelsV2'
import { InputLabelsV2Tokens } from '../inputV2.tokens'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { UploadV2TokensType } from './UploadV2.tokens'
import { InputSizeV2, InputStateV2 } from '../inputV2.types'
import { createClickHandler } from './utils'
import UploadContainerV2 from './UploadContainerV2'

const UploadV2 = forwardRef<HTMLDivElement, UploadV2Props>(
    (
        {
            label,
            subLabel,
            description = '',
            size = InputSizeV2.SM,
            helpIconText,
            inputId,
            required,
            multiple = true,
            acceptedFileTypes = [],
            disabled = false,
            slot,
            files = [],
            onChange,
            state = UploadState.IDLE,
            maxSize = 0,
            maxFiles = multiple ? undefined : 1,
            errorText = '',
            progressBarValue = 0,
            progressBarMaxWidth = '300px',
            uploadHeaderText = 'Choose a file or drag & drop it here',
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<UploadV2TokensType>('UPLOADV2')
        const fileInputRef = useRef<HTMLInputElement>(null)
        const uploadId = useId()
        const [uploadState, setUploadState] = useState<UploadState>(
            UploadState.IDLE
        )
        const [dragState, setDragState] = useState<UploadDragState>(
            UploadDragState.DRAG_LEAVE
        )
        const isUploading = state === UploadState.UPLOADING
        const isSuccess = state === UploadState.SUCCESS
        const isInteractionBlocked = disabled || isUploading || isSuccess

        // Validate files and mark with isValid flag instead of filtering
        const validateFiles = (newFiles: File[]): UploadFileV2[] => {
            const limit = maxFiles ?? (multiple ? undefined : 1)
            const remainingSlots = limit ? limit - files.length : Infinity
            let hasRejection = false

            const validatedFiles: UploadFileV2[] = newFiles.map(
                (file, index) => {
                    // Check maxFiles limit
                    if (limit && index >= remainingSlots) {
                        hasRejection = true
                        return { file, isValid: false, errorReason: 'maxFiles' }
                    }

                    // Check maxSize
                    if (maxSize && file.size > maxSize) {
                        hasRejection = true
                        return {
                            file,
                            isValid: false,
                            errorReason: 'oversized',
                        }
                    }

                    return { file, isValid: true }
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
            } else if (disabled) {
                setUploadState(UploadState.DISABLED)
            } else {
                setUploadState(UploadState.IDLE)
            }
        }, [state, disabled])
        return (
            <Block
                data-upload={label ?? ''}
                data-status={disabled ? 'disabled' : 'enabled'}
                ref={ref}
                display="flex"
                flexDirection="column"
                gap={tokens.gap}
            >
                <InputLabelsV2
                    tokens={tokens.topContainer as InputLabelsV2Tokens}
                    label={label}
                    sublabel={subLabel}
                    size={size}
                    state={
                        state === UploadState.ERROR
                            ? InputStateV2.ERROR
                            : state === UploadState.DISABLED
                              ? InputStateV2.DISABLED
                              : InputStateV2.DEFAULT
                    }
                    helpIconText={helpIconText}
                    inputId={inputId}
                    required={required}
                />
                {/* fake input file */}
                <Block
                    cursor={disabled ? 'not-allowed' : 'pointer'}
                    onClick={(e) => {
                        if (isInteractionBlocked) {
                            e.preventDefault()
                            return
                        }
                        createClickHandler(
                            disabled,
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
                        setDragState(UploadDragState.DROP)
                        const droppedFiles = Array.from(e.dataTransfer.files)
                        const validatedFiles = validateFiles(droppedFiles)
                        const updatedFiles = multiple
                            ? [...files, ...validatedFiles]
                            : validatedFiles[0]
                              ? [validatedFiles[0]]
                              : []
                        onChange?.(updatedFiles)
                    }}
                >
                    <UploadContainerV2
                        description={description}
                        slot={slot}
                        disabled={disabled}
                        onClick={() => {
                            fileInputRef.current?.click()
                        }}
                        tokens={tokens}
                        files={files}
                        multiple={multiple}
                        onFileRemove={(fileName) => {
                            const updatedFiles = files.filter(
                                (f) => f.file.name !== fileName
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
                        state={uploadState}
                        errorText={errorText}
                        progressBarValue={progressBarValue}
                        progressBarMaxWidth={progressBarMaxWidth}
                        uploadHeaderText={uploadHeaderText}
                        dragState={dragState}
                    />
                </Block>

                {/* real input file */}
                <input
                    ref={fileInputRef}
                    id={uploadId}
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
                    disabled={disabled}
                    required={required}
                    aria-required={required}
                    // aria-invalid={!!errorId}
                    // aria-describedby={
                    //     [descriptionId, errorId, hintId]
                    //         .filter(Boolean)
                    //         .join(' ') || undefined
                    // }
                    aria-label={label ? undefined : 'File upload'}
                    style={{ display: 'none' }}
                />
            </Block>
        )
    }
)

export default UploadV2
