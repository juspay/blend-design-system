import React from 'react'
import { figma } from '@figma/code-connect'
import { UploadV2, UploadV2State } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR UPLOADV2
 *
 * PROP MAPPING DOCUMENTATION
 *
 * 1. RENAMED MAPPINGS:
 *    - state (Figma VARIANT, 7 options) → state (Code UploadV2State enum)
 *      - default/drag → UploadV2State.IDLE
 *      - processing   → UploadV2State.UPLOADING
 *      - singleSuccess/multiSuccess → UploadV2State.SUCCESS
 *      - singleError/multiError     → UploadV2State.ERROR
 *    - isRequired (Figma) → required (Code)
 *    - hasLabel (Figma BOOLEAN) → label (Code, static sample "Your Label")
 *    - hasSubLabel (Figma BOOLEAN) → subLabel (Code, static sample " (optional)")
 *    - hasSubheading (Figma BOOLEAN) → description (Code, idle subheading)
 *    - helpIcon (Figma BOOLEAN) → helpIconText (Code, tooltip text)
 *
 * 2. DERIVED MAPPINGS:
 *    - multiple: derived from the state variant
 *      - singleSuccess/singleError → false (single-file mode)
 *      - default/drag/processing/multiSuccess/multiError → true
 *    - error: derived from the state variant
 *      - singleError/multiError → { show: true, message: '...' }
 *      - other states → { show: false, message: '' }
 *
 * 3. FIGMA-ONLY PROPERTIES (not mapped):
 *    - drag: A transient drag-over interaction state. In code, drag is
 *      handled internally via UploadDragState events (onDragEnter/Leave/Over/Drop).
 *      Maps to UploadV2State.IDLE — no separate code state exists.
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - onChange: File selection callback.
 *    - acceptedFileTypes, maxSize, progressBarValue: Static sample values
 *      matching the design's ".csv only | Max size 8 MB" copy.
 *    - files: Sample file array; in production, managed by parent state
 *      with per-file isValid / errorReason flags.
 */

figma.connect(
    UploadV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-635561',
    {
        props: {
            state: figma.enum('state', {
                default: UploadV2State.IDLE,
                drag: UploadV2State.IDLE,
                processing: UploadV2State.UPLOADING,
                singleSuccess: UploadV2State.SUCCESS,
                singleError: UploadV2State.ERROR,
                multiSuccess: UploadV2State.SUCCESS,
                multiError: UploadV2State.ERROR,
            }),

            multiple: figma.enum('state', {
                default: true,
                drag: true,
                processing: true,
                singleSuccess: false,
                singleError: false,
                multiSuccess: true,
                multiError: true,
            }),

            error: figma.enum('state', {
                singleError: {
                    show: true,
                    message:
                        'data_file.csv exceeds the maximum file size of 8 MB',
                },
                multiError: {
                    show: true,
                    message: '7 files failed to upload',
                },
                default: { show: false, message: '' },
                drag: { show: false, message: '' },
                processing: { show: false, message: '' },
                singleSuccess: { show: false, message: '' },
                multiSuccess: { show: false, message: '' },
            }),

            required: figma.boolean('isRequired'),

            label: figma.boolean('hasLabel', {
                true: 'Your Label',
                false: undefined,
            }),

            subLabel: figma.boolean('hasSubLabel', {
                true: ' (optional)',
                false: undefined,
            }),

            description: figma.boolean('hasSubheading', {
                true: '.csv only | Max size 8 MB',
                false: undefined,
            }),

            helpIconText: figma.boolean('helpIcon', {
                true: 'Accepted file types: .csv. Maximum size: 8 MB.',
                false: undefined,
            }),
        },

        example: ({
            state,
            multiple,
            error,
            required,
            label,
            subLabel,
            description,
            helpIconText,
        }) => (
            <UploadV2
                state={state}
                multiple={multiple}
                error={error}
                required={required}
                label={label}
                subLabel={subLabel}
                description={description}
                helpIconText={helpIconText}
                acceptedFileTypes={['.csv']}
                maxSize={8 * 1024 * 1024}
                progressBarValue={50}
                files={[
                    {
                        file: new File([''], 'data_file.csv', {
                            type: 'text/csv',
                        }),
                        isValid: true,
                    },
                ]}
                onChange={() => {}}
            />
        ),

        imports: [
            "import { UploadV2, UploadV2State } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/InputsV2/UploadV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-uploadv2--docs',
            },
        ],
    }
)
