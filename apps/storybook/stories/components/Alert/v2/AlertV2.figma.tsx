import React from 'react'
import { figma } from '@figma/code-connect'
import {
    AlertV2,
    AlertV2Type,
    AlertV2SubType,
    AlertV2ActionPosition,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR ALERTV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS (V1 → V2):
 *    - variant (Figma) → type (Code)
 *    - style (Figma) → subType (Code)
 *    - actionPlacement (Figma) → actions.position (Code)
 *      V1 exposed a flat actionPlacement prop; V2 groups the position and
 *      the action objects under a single `actions` prop.
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - heading → heading
 *    - description → description
 *
 * 3. COMPLEX MAPPINGS:
 *    - actionButtons (Figma) → actions (Code)
 *      - actionButtons=0 → no actions (actions=undefined)
 *      - actionButtons=1 → actions.primaryAction only
 *      - actionButtons=2 → both actions.primaryAction and actions.secondaryAction
 *      - Action objects use `text` (V2) instead of `label` (V1)
 *
 *    - hasMainIcon (Figma) + mainIcon (Figma) → slot (Code)
 *      - hasMainIcon=true → slot={ slot: mainIcon instance }
 *      - hasMainIcon=false → slot=undefined
 *
 *    - hasCloseIcon (Figma) → closeButton (Code)
 *      - hasCloseIcon=true → closeButton={ show: true, onClick: () => {} }
 *      - hasCloseIcon=false → closeButton={ show: false }
 *        NOTE: closeButton=undefined falls back to the component default
 *        (show: true), so the hidden state must be explicit.
 *
 * 4. FIGMA-ONLY PROPERTIES (handled automatically):
 *    - hasIcon: Controlled by slot prop presence
 *    - hasHeading: Controlled by heading prop presence
 *    - hasAction: Controlled by action props presence
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - width/maxWidth/minWidth: Dimension controls
 *    - ...rest: Standard HTMLAttributes forwarded to the alert container
 */

figma.connect(
    AlertV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18797-179268&t=Igz9fmVsO5gD0NMR-4',
    {
        props: {
            // Renamed mapping: variant (Figma) → type (Code)
            type: figma.enum('variant', {
                primary: AlertV2Type.PRIMARY,
                success: AlertV2Type.SUCCESS,
                warning: AlertV2Type.WARNING,
                error: AlertV2Type.ERROR,
                purple: AlertV2Type.PURPLE,
                orange: AlertV2Type.ORANGE,
                neutral: AlertV2Type.NEUTRAL,
            }),

            // Renamed mapping: style (Figma) → subType (Code)
            subType: figma.enum('style', {
                subtle: AlertV2SubType.SUBTLE,
                noFill: AlertV2SubType.NO_FILL,
            }),

            // Complex mapping: actionButtons + actionPlacement (Figma) → actions (Code)
            // The position and action objects are grouped under one `actions` prop,
            // and each action object uses `text` instead of V1's `label`
            actions: figma.enum('actionButtons', {
                '1': {
                    position: figma.enum('actionPlacement', {
                        bottom: AlertV2ActionPosition.BOTTOM,
                        right: AlertV2ActionPosition.RIGHT,
                    }),
                    primaryAction: {
                        text: 'Confirm',
                        onClick: () => {},
                    },
                },
                '2': {
                    position: figma.enum('actionPlacement', {
                        bottom: AlertV2ActionPosition.BOTTOM,
                        right: AlertV2ActionPosition.RIGHT,
                    }),
                    primaryAction: {
                        text: 'Confirm',
                        onClick: () => {},
                    },
                    secondaryAction: {
                        text: 'Cancel',
                        onClick: () => {},
                    },
                },
            }),

            // Direct string mappings
            heading: figma.string('heading'),
            description: figma.string('description'),

            // Icon mapping - based on hasMainIcon boolean, wrapped in a slot object
            slot: figma.boolean('hasMainIcon', {
                true: { slot: figma.instance('mainIcon') },
                false: undefined,
            }),

            // Close button mapping - explicit { show: false } because the
            // component default (undefined closeButton) shows the close button
            closeButton: figma.boolean('hasCloseIcon', {
                true: { show: true, onClick: () => {} },
                false: { show: false },
            }),

            // Note: The following Figma props are not mapped as they're handled automatically:
            // - hasIcon (determined by slot prop presence)
            // - hasHeading (determined by heading prop presence)
            // - hasAction (determined by actionButtons count)
        },

        example: ({
            type,
            subType,
            actions,
            heading,
            description,
            slot,
            closeButton,
        }) => (
            <AlertV2
                type={type}
                subType={subType}
                actions={actions}
                heading={heading}
                description={description}
                slot={slot}
                closeButton={closeButton}
            />
        ),

        imports: [
            "import { AlertV2, AlertV2Type, AlertV2SubType, AlertV2ActionPosition } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/AlertV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-alertv2--docs',
            },
        ],
    }
)
