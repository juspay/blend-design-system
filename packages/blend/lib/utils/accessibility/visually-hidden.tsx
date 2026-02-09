import React from 'react'
import Block from '../../components/Primitives/Block/Block'

/**
 * VisuallyHidden component for screen reader only content
 *
 * This component hides content visually while keeping it accessible to screen readers.
 * Useful for providing additional context or labels that are not visible but important
 * for accessibility.
 *
 * @example
 * ```tsx
 * <VisuallyHidden>
 *   Additional context for screen readers
 * </VisuallyHidden>
 * ```
 */
export const VisuallyHidden = ({
    children,
    ...props
}: {
    children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) => {
    return (
        <Block
            as="span"
            position="absolute"
            width="1px"
            height="1px"
            padding={0}
            margin="-1px"
            overflow="hidden"
            style={{
                clip: 'rect(0, 0, 0, 0)',
                clipPath: 'inset(50%)',
                borderWidth: 0,
            }}
            whiteSpace="nowrap"
            aria-hidden="true"
            {...props}
        >
            {children}
        </Block>
    )
}
