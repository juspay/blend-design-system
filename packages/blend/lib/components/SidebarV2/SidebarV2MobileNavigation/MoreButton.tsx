import { ChevronUp } from 'lucide-react'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import type { MobileNavigationV2TokenType } from './mobile.tokens'

const MoreButton = ({
    tokens,
    onClick,
}: {
    tokens: MobileNavigationV2TokenType
    onClick: () => void
}) => {
    return (
        <PrimitiveButton
            type="button"
            onClick={onClick}
            display="flex"
            style={{ flexDirection: 'column' }}
            alignItems="center"
            justifyContent="center"
            width={tokens.item.width}
            height={tokens.item.height}
            border="none"
            backgroundColor={tokens.item.backgroundColor.default}
            borderRadius={tokens.item.borderRadius}
            cursor="pointer"
            aria-label="More"
        >
            <ChevronUp
                aria-hidden="true"
                width={tokens.item.icon.width as unknown as number}
                height={tokens.item.icon.height as unknown as number}
            />
        </PrimitiveButton>
    )
}

export default MoreButton
