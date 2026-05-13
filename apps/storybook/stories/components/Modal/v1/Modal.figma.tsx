import React from 'react'
import { figma } from '@figma/code-connect'
import { Modal } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR MODAL COMPONENT
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
 *    - headerSlot (Figma) → headerRightSlot (Code)
 *
 * 3. CONDITIONAL MAPPINGS:
 *    - showFooter (Figma) → primaryAction & secondaryAction (Code): When showFooter is true, both action props are available
 *    - hasHeaderSlot (Figma): Auto-calculated based on headerSlot content
 *    - hasHeading (Figma): Auto-calculated based on title content
 *    - hasSubHeading (Figma): Auto-calculated based on subtitle content
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - isOpen: Modal state control
 *    - className: Styling customization
 *    - closeOnBackdropClick: Behavior control
 *    - customHeader: Custom header component
 *    - customFooter: Custom footer component
 *    - showDivider: Visual divider control
 *
 * 5. FIGMA-ONLY PROPERTIES (not in Code):
 *    - type: Visual variant in Figma
 *    - hasHeading: Auto-calculated from title
 *    - hasSubHeading: Auto-calculated from subtitle
 */

figma.connect(
    Modal,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-635480&t=2L1Yl830ZKZjFcrt-11',
    {
        props: {
            // Direct string mappings
            title: figma.string('title'),
            subtitle: figma.string('subtitle'),

            // Direct boolean mappings
            showHeader: figma.boolean('showHeader'),
            showFooter: figma.boolean('showFooter'),

            // Renamed mappings
            showCloseButton: figma.boolean('hasCloseIcon'),

            // Header slot mapping
            headerRightSlot: figma.boolean('hasHeaderSlot', {
                true: figma.instance('headerSlot'),
                false: undefined,
            }),

            // Conditional action buttons based on showFooter
            primaryAction: figma.boolean('showFooter', {
                true: {
                    label: 'Confirm',
                    onClick: () => console.log('Primary action clicked'),
                },
                false: undefined,
            }),

            secondaryAction: figma.boolean('showFooter', {
                true: {
                    label: 'Cancel',
                    onClick: () => console.log('Secondary action clicked'),
                },
                false: undefined,
            }),

            // Fixed props for Code Connect
            isOpen: true, // Modal is always open in Figma
            onClose: () => console.log('Modal closed'), // Required callback
            children: <div>Modal content goes here</div>, // Required children

            // Note: The following props are not mapped as they don't exist in Figma:
            // - className (styling)
            // - closeOnBackdropClick (behavior)
            // - customHeader (custom component)
            // - customFooter (custom footer component)
            // - showDivider (visual option)
        },

        example: ({
            title,
            subtitle,
            showHeader,
            showFooter,
            showCloseButton,
            headerRightSlot,
            primaryAction,
            secondaryAction,
            isOpen,
            onClose,
            children,
        }) => (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                subtitle={subtitle}
                showHeader={showHeader}
                showFooter={showFooter}
                showCloseButton={showCloseButton}
                headerRightSlot={headerRightSlot}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
            >
                {children}
            </Modal>
        ),

        imports: ["import { Modal } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Modal',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-modal--docs',
            },
        ],
    }
)
