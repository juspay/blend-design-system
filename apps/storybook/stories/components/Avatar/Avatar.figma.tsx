import React from 'react'
import { figma } from '@figma/code-connect'
import { Avatar, AvatarSize, AvatarShape } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR AVATAR COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS (same in both):
 *    - size → size
 *
 * 2. RENAMED MAPPINGS:
 *    - type (Figma) → shape (Code)
 *    - notificationDot (Figma) → online (Code)
 *    - placeholder (Figma) → fallback (Code)
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - src: Image URL (not controlled by Figma)
 *    - alt: Alternative text (not controlled by Figma)
 *    - leadingSlot: Content before avatar (not in Figma)
 *    - trailingSlot: Content after avatar (not in Figma)
 *
 * 4. FIGMA-ONLY PROPERTIES (not in code):
 *    - None identified
 *
 * Note: The Avatar component uses src for images and fallback for placeholder content.
 * When no src is provided, the component shows the fallback or generates initials from alt.
 */

figma.connect(
    Avatar,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18797-212273&t=Igz9fmVsO5gD0NMR-4',
    {
        props: {
            // Renamed mappings - Figma prop name → Code prop name
            shape: figma.enum('type', {
                circular: AvatarShape.CIRCULAR,
                rounded: AvatarShape.ROUNDED,
            }),

            size: figma.enum('size', {
                sm: AvatarSize.SM,
                md: AvatarSize.MD,
                lg: AvatarSize.LG,
                xl: AvatarSize.XL,
            }),

            // Renamed mapping - notificationDot (Figma) → online (Code)
            online: figma.boolean('notificationDot'),

            // Renamed mapping - placeholder (Figma) → fallback (Code)
            fallback: figma.boolean('placeholder', {
                true: figma.string('placeholderText'),
                false: undefined,
            }),
        },

        example: ({ shape, size, online, fallback }) => {
            // Code-only props that are not controlled by Figma
            const avatarProps = {
                shape,
                size,
                online,
                fallback,
                // These props are not in Figma but exist in code:
                src: undefined, // Not controlled by Figma
                alt: 'User Name', // Not controlled by Figma - always provide for accessibility
                // leadingSlot: undefined, // Not in Figma
                // trailingSlot: undefined, // Not in Figma
            }

            return <Avatar {...avatarProps} />
        },

        imports: ["import { Avatar } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Avatar',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-avatar--docs',
            },
        ],
    }
)

/**
 * Example of Avatar with additional features not in Figma:
 *
 * // With custom fallback
 * <Avatar
 *   size={AvatarSize.LG}
 *   fallback={<Icon name="user" />}
 *   alt="User"
 * />
 *
 * // With slots (not available in Figma)
 * <Avatar
 *   src="/avatar.jpg"
 *   alt="User"
 *   leadingSlot={<Badge status="premium" />}
 *   trailingSlot={<Button size="xs" icon="edit" />}
 * />
 */
