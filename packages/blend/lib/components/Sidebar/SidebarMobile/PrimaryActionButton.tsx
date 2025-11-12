import React, { forwardRef } from 'react'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import type { MobileNavigationTokenType } from './mobile.tokens'

const PrimaryActionIcon = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
    >
        <path
            d="M12 1C12 1.01587 12 1.03172 12 1.04756C12.0044 8.90824 14.2177 12 23 12C14.2177 12 12.0044 15.0918 12 22.9524C11.9956 15.0918 9.78231 12 1 12C9.78231 12 11.9956 8.90824 12 1.04756C12 1.03172 12 1.01587 12 1Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.83222"
            strokeLinejoin="round"
        />
    </svg>
)

type PrimaryActionButtonProps = {
    tokens: MobileNavigationTokenType
    buttonProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>
}

const PrimaryActionButton = forwardRef<
    HTMLButtonElement,
    PrimaryActionButtonProps
>(({ tokens, buttonProps }, ref) => {
    return (
        <PrimitiveButton
            ref={ref}
            key="sidebar-mobile-primary-action"
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
            color={String(tokens.primaryAction.color)}
            aria-label="Primary action"
            {...buttonProps}
        >
            <PrimaryActionIcon />
        </PrimitiveButton>
    )
})

PrimaryActionButton.displayName = 'PrimaryActionButton'

export default PrimaryActionButton
