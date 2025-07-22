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
 * 1. SPECIAL MAPPINGS:
 *    - type (Figma) → Handled by maxCount logic
 *      - "stacked": Set maxCount to a high number (no counter shown)
 *      - "stacked with counter": Set maxCount based on avatar count
 *    - placeholder (Figma) → Not needed in code (handled by Avatar component)
 *
 * 2. DIRECT MAPPINGS:
 *    - size → size
 *
 * 3. CODE-ONLY PROPERTIES:
 *    - avatars: Array of avatar data (generated based on Figma instances)
 *    - maxCount: Determined by type prop and avatar count
 *    - shape: Not in Figma, will use default (circular)
 *    - selectedAvatarIds: Optional selection handling
 *    - onSelectionChange: Optional callback
 *
 * Note: The number of avatar instances in Figma determines the avatars array length.
 * The type prop controls whether overflow counter is shown.
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
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=15612-43070&t=syQLBedyuJq8TAlu-4',
    {
        props: {
            // Size mapping
            size: figma.enum('size', {
                sm: AvatarSize.SM,
                md: AvatarSize.MD,
                lg: AvatarSize.LG,
                xl: AvatarSize.XL,
            }),

            // Type mapping - controls whether counter is shown
            type: figma.enum('type', {
                stacked: 'stacked',
                'stacked with counter': 'stacked-with-counter',
            }),

            // Placeholder for avatar generation
            placeholder: figma.boolean('placeholder'),

            // Note: In a real implementation, we would need to count
            // the actual avatar instances in Figma. For now, using a default.
        },

        example: ({ size, type, placeholder }) => {
            // NOTE TO DEVELOPERS:
            // Replace this avatars array with your actual avatar data.
            // The number of avatars should match your Figma design.
            const avatars = [
                {
                    id: 1,
                    alt: 'User 1',
                    ...(placeholder ? {} : { src: '/path/to/avatar1.jpg' }),
                },
                {
                    id: 2,
                    alt: 'User 2',
                    ...(placeholder ? {} : { src: '/path/to/avatar2.jpg' }),
                },
                {
                    id: 3,
                    alt: 'User 3',
                    ...(placeholder ? {} : { src: '/path/to/avatar3.jpg' }),
                },
                // Add more avatars as needed to match your Figma design
            ]

            // Determine maxCount based on type
            // For "stacked": show all avatars (no counter)
            // For "stacked with counter": typically show 3-5 avatars
            const maxCount =
                type === 'stacked'
                    ? avatars.length
                    : Math.min(5, avatars.length - 1)

            return (
                <AvatarGroup
                    avatars={avatars}
                    maxCount={maxCount}
                    size={size}
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

// Variant for stacked type (no counter)
figma.connect(
    AvatarGroup,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=15612-43070&t=syQLBedyuJq8TAlu-4',
    {
        variant: { type: 'stacked' },
        props: {
            size: figma.enum('size', {
                sm: AvatarSize.SM,
                md: AvatarSize.MD,
                lg: AvatarSize.LG,
                xl: AvatarSize.XL,
            }),
            placeholder: figma.boolean('placeholder'),
        },
        example: ({ size, placeholder }) => (
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'User 1',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar1.jpg' }),
                    },
                    {
                        id: 2,
                        alt: 'User 2',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar2.jpg' }),
                    },
                    {
                        id: 3,
                        alt: 'User 3',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar3.jpg' }),
                    },
                    {
                        id: 4,
                        alt: 'User 4',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar4.jpg' }),
                    },
                    {
                        id: 5,
                        alt: 'User 5',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar5.jpg' }),
                    },
                    {
                        id: 6,
                        alt: 'User 6',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar6.jpg' }),
                    },
                ]}
                maxCount={6} // Show all avatars
                size={size}
            />
        ),
    }
)

// Variant for stacked with counter type
figma.connect(
    AvatarGroup,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=15612-43070&t=syQLBedyuJq8TAlu-4',
    {
        variant: { type: 'stacked with counter' },
        props: {
            size: figma.enum('size', {
                sm: AvatarSize.SM,
                md: AvatarSize.MD,
                lg: AvatarSize.LG,
                xl: AvatarSize.XL,
            }),
            placeholder: figma.boolean('placeholder'),
        },
        example: ({ size, placeholder }) => (
            <AvatarGroup
                avatars={[
                    {
                        id: 1,
                        alt: 'User 1',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar1.jpg' }),
                    },
                    {
                        id: 2,
                        alt: 'User 2',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar2.jpg' }),
                    },
                    {
                        id: 3,
                        alt: 'User 3',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar3.jpg' }),
                    },
                    {
                        id: 4,
                        alt: 'User 4',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar4.jpg' }),
                    },
                    {
                        id: 5,
                        alt: 'User 5',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar5.jpg' }),
                    },
                    {
                        id: 6,
                        alt: 'User 6',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar6.jpg' }),
                    },
                    {
                        id: 7,
                        alt: 'User 7',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar7.jpg' }),
                    },
                    {
                        id: 8,
                        alt: 'User 8',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar8.jpg' }),
                    },
                    {
                        id: 9,
                        alt: 'User 9',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar9.jpg' }),
                    },
                    {
                        id: 10,
                        alt: 'User 10',
                        ...(placeholder
                            ? {}
                            : { src: 'https://example.com/avatar10.jpg' }),
                    },
                ]}
                maxCount={5} // Show 5 avatars + "+5" counter
                size={size}
            />
        ),
    }
)

// Small size variant with counter
figma.connect(
    AvatarGroup,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=15612-43070&t=syQLBedyuJq8TAlu-4',
    {
        variant: { size: 'sm', type: 'stacked with counter' },
        props: {
            placeholder: figma.boolean('placeholder'),
        },
        example: ({ placeholder }) => {
            const avatars = [
                {
                    id: 1,
                    alt: 'Alice Johnson',
                    ...(placeholder
                        ? {}
                        : { src: 'https://example.com/alice.jpg' }),
                },
                {
                    id: 2,
                    alt: 'Bob Smith',
                    ...(placeholder
                        ? {}
                        : { src: 'https://example.com/bob.jpg' }),
                },
                {
                    id: 3,
                    alt: 'Carol White',
                    ...(placeholder
                        ? {}
                        : { src: 'https://example.com/carol.jpg' }),
                },
                {
                    id: 4,
                    alt: 'David Brown',
                    ...(placeholder
                        ? {}
                        : { src: 'https://example.com/david.jpg' }),
                },
                {
                    id: 5,
                    alt: 'Eve Davis',
                    ...(placeholder
                        ? {}
                        : { src: 'https://example.com/eve.jpg' }),
                },
                {
                    id: 6,
                    alt: 'Frank Miller',
                    ...(placeholder
                        ? {}
                        : { src: 'https://example.com/frank.jpg' }),
                },
                {
                    id: 7,
                    alt: 'Grace Wilson',
                    ...(placeholder
                        ? {}
                        : { src: 'https://example.com/grace.jpg' }),
                },
            ]

            return (
                <AvatarGroup
                    avatars={avatars}
                    maxCount={4} // Show 4 avatars + "+3" counter
                    size={AvatarSize.SM}
                />
            )
        },
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
