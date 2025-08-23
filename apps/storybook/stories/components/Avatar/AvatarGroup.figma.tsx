import React from 'react'
import { figma } from '@figma/code-connect'
import { AvatarGroup, AvatarSize } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR AVATARGROUP COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - size → size
 *
 * 2. RENAMED MAPPINGS:
 *    - placeholder (Figma) → fallback (Code)
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - shape: Avatar shape (not controlled by Figma, defaults to circular)
 *    - avatars: Array of avatar data (generated based on Figma instances)
 *    - maxCount: Controls overflow behavior (not directly in Figma)
 *    - selectedAvatarIds: Optional selection handling
 *    - onSelectionChange: Optional callback
 *
 * 4. FIGMA-ONLY PROPERTIES (not in code):
 *    - None identified
 *
 * Note: The AvatarGroup component requires an avatars array and maxCount prop
 * to control how many avatars are visible before showing overflow counter.
 */

/**
 * IMPORTANT: Figma Code Connect Limitation
 *
 * Currently, Figma Code Connect cannot dynamically count the number of
 * avatar instances within the AvatarGroup component. Developers need to:
 *
 * 1. Count the avatars in their Figma design
 * 2. Create an avatars array with the same number of items
 * 3. Set maxCount based on the type:
 *    - "stacked": maxCount = total number of avatars
 *    - "stacked with counter": maxCount = desired visible count (usually 3-5)
 */

figma.connect(
    AvatarGroup,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=19568-45588&t=EWj7fDD0TbtPTknX-4',
    {
        props: {
            // Direct mapping - size is same in both Figma and code
            size: figma.enum('size', {
                sm: AvatarSize.SM,
                md: AvatarSize.MD,
                lg: AvatarSize.LG,
                xl: AvatarSize.XL,
            }),

            // Renamed mapping - placeholder (Figma) → fallback (Code)
            fallback: figma.boolean('placeholder', {
                true: figma.string('placeholderText'),
                false: undefined,
            }),
        },

        example: ({ size, fallback }) => {
            // NOTE TO DEVELOPERS:
            // Replace this avatars array with your actual avatar data.
            // The number of avatars should match your Figma design.
            const avatars = [
                {
                    id: 1,
                    alt: 'User 1',
                    fallback: fallback,
                    // src: undefined, // Not controlled by Figma
                },
                {
                    id: 2,
                    alt: 'User 2',
                    fallback: fallback,
                    // src: undefined, // Not controlled by Figma
                },
                {
                    id: 3,
                    alt: 'User 3',
                    fallback: fallback,
                    // src: undefined, // Not controlled by Figma
                },
                // Add more avatars as needed to match your Figma design
            ]

            return (
                <AvatarGroup
                    avatars={avatars}
                    maxCount={3} // Adjust based on your design needs
                    size={size}
                    // shape prop is not in Figma - defaults to circular
                />
            )
        },

        imports: ["import { AvatarGroup } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/AvatarGroup',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-avatargroup--docs',
            },
        ],
    }
)

/**
 * Example of AvatarGroup with selection handling (not in Figma):
 *
 * <AvatarGroup
 *   avatars={avatarData}
 *   maxCount={5}
 *   size={AvatarSize.MD}
 *   selectedAvatarIds={[1, 3, 5]}
 *   onSelectionChange={(ids) => console.log('Selected:', ids)}
 * />
 *
 * DEVELOPER NOTES:
 *
 * When using this component:
 * 1. Replace the example avatar data with your actual data
 * 2. Ensure the number of avatars matches your Figma design
 * 3. For "stacked" type: all avatars will be visible
 * 4. For "stacked with counter" type: adjust maxCount to control how many
 *    avatars are visible before showing the overflow counter
 *
 * Example for a design with 8 avatars:
 * - type="stacked" → maxCount=8 (shows all 8)
 * - type="stacked with counter" → maxCount=5 (shows 5 + "+3" counter)
 */
