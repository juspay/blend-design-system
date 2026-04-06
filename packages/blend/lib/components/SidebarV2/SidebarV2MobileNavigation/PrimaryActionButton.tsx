import type { ButtonHTMLAttributes } from 'react'
import { Plus } from 'lucide-react'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import type { MobileNavigationV2TokenType } from './mobile.tokens'
import { parseUnitValue } from './utils'

const PrimaryActionButton = ({
    tokens,
    buttonProps,
}: {
    tokens: MobileNavigationV2TokenType
    buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>
}) => {
    return (
        <PrimitiveButton
            type="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={tokens.rowPrimaryAction.width}
            height={tokens.rowPrimaryAction.height}
            border="none"
            borderRadius={tokens.rowPrimaryAction.borderRadius}
            cursor="pointer"
            style={{
                background: String(tokens.rowPrimaryAction.background),
                boxShadow: String(tokens.rowPrimaryAction.boxShadow),
                color: String(tokens.rowPrimaryAction.color),
            }}
            aria-label={buttonProps?.['aria-label'] ?? 'Primary action'}
            {...buttonProps}
        >
            <Plus
                aria-hidden="true"
                width={parseUnitValue(tokens.rowPrimaryAction.icon.width)}
                height={parseUnitValue(tokens.rowPrimaryAction.icon.height)}
            />
        </PrimitiveButton>
    )
}

export default PrimaryActionButton
