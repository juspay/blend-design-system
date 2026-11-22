import React from 'react'
import { figma } from '@figma/code-connect'
import { StyledToast, SnackbarV2Variant } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR SNACKBARV2 COMPONENT
 *
 * The Snackbar page has a main component set at 18805:684467 (the "Snack Bar"
 * frame). The symbols placed on the canvas (e.g. 18805:684468) are INSTANCES
 * of that set, so the connection targets the main set, not the instances.
 *
 * Connected component: StyledToast (the visual toast body). SnackbarV2 itself
 * is an imperative container (use addSnackbarV2 in app code); StyledToast is
 * the renderable unit that mirrors the Figma design one-to-one.
 *
 * PROP MAPPING DOCUMENTATION
 *
 * 1. RENAMED / RE-TYPED MAPPINGS:
 *    - type (Figma VARIANT) → variant (Code), SnackbarV2Variant:
 *      info → SUCCESS-free INFO, success → SUCCESS, warning → WARNING,
 *      error → ERROR (one-to-one).
 *    - heading (Figma TEXT) → header (Code).
 *    - message (Figma TEXT) → description (Code).
 *
 * 2. GATED MAPPINGS (boolean → object/function):
 *    - hasAction (boolean) → actionButton (object): when true, an action
 *      button is shown with a label and onClick; when false, undefined.
 *    - hasCloseIcon (boolean) → onClose (function): when true, the close
 *      button is wired with an empty handler; when false, undefined.
 *
 * 3. FIGMA-ONLY PROPERTIES (design helpers, no code counterpart):
 *    - display (web/mobile): design-surface toggle; single StyledToast unit
 *      is platform-agnostic.
 *    - style (single/stacked): stacked is a multi-toast composition shown in
 *      design; each individual toast body is identical, so single StyledToast
 *      covers it.
 *    - hasMainIcon: the variant icon is always rendered in code; to swap it
 *      use the `slot` prop (there is no hide toggle).
 *    - hasHeading: `header` is required in code, so this is implied.
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - slot: custom leading icon (ReactElement).
 *    - toastId, width, maxWidth, minWidth.
 *    - Imperative usage: <SnackbarV2 /> container + addSnackbarV2({...}),
 *      with duration, position, visibleToasts, etc. on the container/options.
 */

figma.connect(
    StyledToast,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18805-684467',
    {
        props: {
            // Variant mapping: Figma type → SnackbarV2Variant
            variant: figma.enum('type', {
                info: SnackbarV2Variant.INFO,
                success: SnackbarV2Variant.SUCCESS,
                warning: SnackbarV2Variant.WARNING,
                error: SnackbarV2Variant.ERROR,
            }),

            // Direct string mappings (heading and message are Figma TEXT props)
            header: figma.string('heading'),
            description: figma.string('message'),

            // Gated: hasAction (boolean) → actionButton (object)
            actionButton: figma.boolean('hasAction', {
                true: { label: 'Alert Message', onClick: () => {} },
                false: undefined,
            }),

            // Gated: hasCloseIcon (boolean) → onClose (function)
            onClose: figma.boolean('hasCloseIcon', {
                true: () => {},
                false: undefined,
            }),
        },

        example: ({ variant, header, description, actionButton, onClose }) => (
            <StyledToast
                variant={variant}
                header={header}
                description={description}
                actionButton={actionButton}
                onClose={onClose}
            />
        ),

        imports: [
            "import { StyledToast, SnackbarV2Variant } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/SnackbarV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-snackbarv2--docs',
            },
        ],
    }
)

/**
 * Imperative usage in application code (primary consumer path):
 *
 * <SnackbarV2 position={SnackbarV2Position.BOTTOM_RIGHT} />
 * addSnackbarV2({
 *   header: 'Data synced successfully',
 *   description: 'Your dashboard now shows the latest data.',
 *   variant: SnackbarV2Variant.SUCCESS,
 *   actionButton: { label: 'Undo', onClick: () => {} },
 * })
 */
