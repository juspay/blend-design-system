import { forwardRef } from 'react'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import type { PrimaryActionButtonProps } from './types'
import { parseUnitValue } from './utils'

const PrimaryActionIcon = ({
    size,
    color,
    strokeWidth,
}: {
    size: number
    color: string
    strokeWidth: number
}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
    >
        <path
            d="M12 1C12 1.01587 12 1.03172 12 1.04756C12.0044 8.90824 14.2177 12 23 12C14.2177 12 12.0044 15.0918 12 22.9524C11.9956 15.0918 9.78231 12 1 12C9.78231 12 11.9956 8.90824 12 1.04756C12 1.03172 12 1.01587 12 1Z"
            fill={color}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
        />
    </svg>
)

const PrimaryActionButton = forwardRef<
    HTMLButtonElement,
    PrimaryActionButtonProps
>(({ tokens, buttonProps }, ref) => {
    const iconSize = parseUnitValue(tokens.primaryAction.icon.width)
    const iconColor = String(tokens.primaryAction.color)
    const strokeWidth = tokens.primaryAction.icon.strokeWidth

    return (
        <PrimitiveButton
            ref={ref}
            key="sidebar-v2-mobile-primary-action"
            type="button"
            contentCentered
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={tokens.primaryAction.width}
            height={tokens.primaryAction.height}
            borderRadius={tokens.primaryAction.borderRadius}
            background={tokens.primaryAction.background}
            boxShadow={tokens.primaryAction.boxShadow}
            color={iconColor}
            flexShrink={0}
            aria-label="Primary action"
            {...buttonProps}
        >
            <PrimaryActionIcon
                size={iconSize}
                color={iconColor}
                strokeWidth={strokeWidth}
            />
        </PrimitiveButton>
    )
})

PrimaryActionButton.displayName = 'PrimaryActionButton'

export default PrimaryActionButton
