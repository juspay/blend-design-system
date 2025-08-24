import React from 'react'
import { figma } from '@figma/code-connect'
import {
    Alert,
    AlertVariant,
    AlertStyle,
    AlertActionPlacement,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR ALERT COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - variant → variant
 *    - style → style
 *    - actionPlacement → actionPlacement
 *    - heading → heading
 *    - description → description
 *
 * 2. COMPLEX MAPPINGS:
 *    - actionButtons (Figma) → primaryAction/secondaryAction (Code)
 *      - actionButtons=0 → no actions
 *      - actionButtons=1 → primaryAction only
 *      - actionButtons=2 → both primaryAction and secondaryAction
 *
 *    - hasMainIcon (Figma) + mainIcon (Figma) → icon (Code)
 *      - hasMainIcon=true → icon prop gets mainIcon instance
 *      - hasMainIcon=false → icon prop is undefined
 *
 *    - hasAction (Figma) → derived from primaryAction/secondaryAction presence
 *      - hasAction=true when either primaryAction or secondaryAction exists
 *      - hasAction=false when no actions are provided
 *
 *    - hasHeading (Figma) → derived from heading prop value
 *      - hasHeading=true when heading has a value
 *      - hasHeading=false when heading is empty/undefined
 *
 * 3. FIGMA-ONLY PROPERTIES (handled automatically):
 *    - hasMainIcon: Controlled by icon prop presence
 *    - hasHeading: Controlled by heading prop presence
 *    - hasAction: Controlled by action props presence
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - primaryAction: Exists in code but not directly in Figma
 *    - secondaryAction: Exists in code but not directly in Figma
 *    - onClose: Derived from hasCloseIcon
 */

figma.connect(
    Alert,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18797-179268&t=EWj7fDD0TbtPTknX-4',
    {
        props: {
            // Direct enum mappings
            variant: figma.enum('variant', {
                primary: AlertVariant.PRIMARY,
                success: AlertVariant.SUCCESS,
                warning: AlertVariant.WARNING,
                error: AlertVariant.ERROR,
                purple: AlertVariant.PURPLE,
                orange: AlertVariant.ORANGE,
                neutral: AlertVariant.NEUTRAL,
            }),

            style: figma.enum('style', {
                subtle: AlertStyle.SUBTLE,
                noFill: AlertStyle.NO_FILL,
                'no-fill': AlertStyle.NO_FILL, // Alternative naming
            }),

            actionPlacement: figma.enum('actionPlacement', {
                bottom: AlertActionPlacement.BOTTOM,
                right: AlertActionPlacement.RIGHT,
            }),

            // Direct string mappings
            heading: figma.string('heading'),
            description: figma.string('description'),

            // Icon mapping - based on hasMainIcon boolean and mainIcon instance
            icon: figma.boolean('hasMainIcon', {
                true: figma.instance('mainIcon'),
                false: undefined,
            }),

            // Action buttons mapping - complex mapping from count to AlertAction objects
            primaryAction: figma.enum('actionButtons', {
                '0': undefined,
                '1': {
                    label: figma.string('primaryActionLabel'),
                    onClick: () => {},
                },
                '2': {
                    label: figma.string('primaryActionLabel'),
                    onClick: () => {},
                },
            }),

            secondaryAction: figma.enum('actionButtons', {
                '0': undefined,
                '1': undefined,
                '2': {
                    label: figma.string('secondaryActionLabel'),
                    onClick: () => {},
                },
            }),

            // Close icon mapping
            onClose: figma.boolean('hasCloseIcon', {
                true: () => {},
                false: undefined,
            }),

            // Note: The following Figma props are not mapped as they're handled automatically:
            // - hasIcon (determined by icon prop presence)
            // - hasHeading (determined by heading prop presence)
            // - hasAction (determined by actionButtons count)
        },

        example: ({
            variant,
            style,
            actionPlacement,
            heading,
            description,
            icon,
            primaryAction,
            secondaryAction,
            onClose,
        }) => (
            <Alert
                variant={variant}
                style={style}
                actionPlacement={actionPlacement}
                heading={heading}
                description={description}
                icon={icon}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
                onClose={onClose}
            />
        ),

        imports: ["import { Alert } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Alert',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-alert--docs',
            },
        ],
    }
)
