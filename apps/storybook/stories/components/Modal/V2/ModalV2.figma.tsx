import React from 'react'
import { figma } from '@figma/code-connect'
import { ModalV2, ButtonV2Type } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR MODALV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - title → title
 *    - subtitle → subtitle
 *    - showHeader → showHeader
 *    - showFooter → showFooter
 *
 * 2. RENAMED MAPPINGS:
 *    - hasCloseIcon (Figma) → showCloseButton (Code)
 *    - hasHeaderSlot (Figma) → headerSlot (Code)
 *      NOTE: V1 used `headerRightSlot`; V2 renamed it to `headerSlot`.
 *
 * 3. SPECIAL MAPPINGS:
 *    - showFooter (Figma) → primaryAction & secondaryAction (Code):
 *      When showFooter is true, both action props are provided as ButtonV2
 *      action objects of shape { text, onClick, buttonType }.
 *      (V2 actions use ButtonV2 props — the label field is `text`, and the
 *      variant is `buttonType: ButtonV2Type`.)
 *    - hasHeaderSlot (Figma): Auto-calculated based on headerSlot content.
 *    - hasHeading (Figma): Auto-calculated based on title content.
 *    - hasSubHeading (Figma): Auto-calculated based on subtitle content.
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - isOpen: Modal visibility state (always true in Figma previews).
 *    - onClose: Close callback.
 *    - closeOnBackdropClick: Whether clicking the backdrop closes the modal.
 *    - showDivider: Visual divider between header, body and footer.
 *    - children: Modal body content.
 *    - customHeader, customFooter: Custom ReactNode replacements.
 *    - dimensions: Width/height/min/max constraints.
 *    - useDrawerOnMobile: Switches to a drawer on small screens.
 *    - skeleton: Body skeleton configuration.
 *
 * 5. FIGMA-ONLY PROPERTIES (not in Code):
 *    - type: Visual variant in Figma.
 *    - hasHeading: Auto-calculated from title.
 *    - hasSubHeading: Auto-calculated from subtitle.
 */

figma.connect(
    ModalV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-635480&t=2L1Yl830ZKZjFcrt-11',
    {
        props: {
            // Direct string mappings
            title: figma.string('title'),
            subtitle: figma.string('subtitle'),

            // Direct boolean mappings
            showHeader: figma.boolean('showHeader'),
            showFooter: figma.boolean('showFooter'),

            // Renamed mapping: hasCloseIcon (Figma) → showCloseButton (Code)
            showCloseButton: figma.boolean('hasCloseIcon'),

            // Renamed mapping: hasHeaderSlot (Figma) → headerSlot (Code)
            // (V1 used `headerRightSlot`; V2 renamed it to `headerSlot`)
            headerSlot: figma.boolean('hasHeaderSlot', {
                true: figma.instance('headerSlot'),
                false: undefined,
            }),

            // Conditional action buttons based on showFooter.
            // V2 actions are ButtonV2 props: { text, onClick, buttonType }.
            primaryAction: figma.boolean('showFooter', {
                true: {
                    text: 'Confirm',
                    onClick: () => {},
                    buttonType: ButtonV2Type.PRIMARY,
                },
                false: undefined,
            }),

            secondaryAction: figma.boolean('showFooter', {
                true: {
                    text: 'Cancel',
                    onClick: () => {},
                    buttonType: ButtonV2Type.SECONDARY,
                },
                false: undefined,
            }),

            // Fixed code-only props for Code Connect previews
            isOpen: true, // Modal is always open in Figma
            onClose: () => {}, // Required callback
            children: <div>Modal content goes here</div>, // Required children
        },

        example: ({
            title,
            subtitle,
            showHeader,
            showFooter,
            showCloseButton,
            headerSlot,
            primaryAction,
            secondaryAction,
            isOpen,
            onClose,
            children,
        }) => (
            <ModalV2
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                subtitle={subtitle}
                showHeader={showHeader}
                showFooter={showFooter}
                showCloseButton={showCloseButton}
                headerSlot={headerSlot}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
            >
                {children}
            </ModalV2>
        ),

        imports: [
            "import { ModalV2, ButtonV2Type } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/ModalV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-modalv2--docs',
            },
        ],
    }
)
