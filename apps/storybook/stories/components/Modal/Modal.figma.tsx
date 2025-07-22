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
 * 2. SPECIAL MAPPINGS:
 *    - hasCloseIcon (Figma) → showCloseButton (Code)
 *    - hasHeaderSlot (Figma) → headerRightSlot (Code)
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - isOpen: Always true in Figma design
 *    - onClose: Functional prop
 *    - children: Content of the modal
 *    - primaryAction: Action button
 *    - secondaryAction: Action button
 *    - className: Styling prop
 *    - closeOnBackdropClick: Behavior prop
 *    - customHeader: Custom header component
 *    - customFooter: Custom footer component
 *    - showDivider: Visual prop
 */

figma.connect(
    Modal,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4891-5414&t=jEHPJiKmUT0XJ9QL-4',
    {
        props: {
            // Direct string mappings
            title: figma.string('title'),
            subtitle: figma.string('subtitle'),

            // Direct boolean mappings
            showHeader: figma.boolean('showHeader'),
            showFooter: figma.boolean('showFooter'),

            // Special mappings
            showCloseButton: figma.boolean('hasCloseIcon'),

            // Header slot mapping
            headerRightSlot: figma.boolean('hasHeaderSlot', {
                true: figma.instance('headerSlot'),
                false: undefined,
            }),

            // Fixed props for Code Connect
            isOpen: true, // Modal is always open in Figma
            onClose: () => {}, // Required callback
            children: <div>Modal content goes here</div>, // Required children

            // Note: The following props are not mapped as they don't exist in Figma:
            // - primaryAction (action buttons)
            // - secondaryAction (action buttons)
            // - className (styling)
            // - closeOnBackdropClick (behavior)
            // - customHeader (custom component)
            // - customFooter (custom component)
            // - showDivider (visual option)
        },

        example: ({
            title,
            subtitle,
            showHeader,
            showFooter,
            showCloseButton,
            headerRightSlot,
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
                url: 'https://juspay.design/storybook/?path=/docs/components-modal--docs',
            },
        ],
    }
)
