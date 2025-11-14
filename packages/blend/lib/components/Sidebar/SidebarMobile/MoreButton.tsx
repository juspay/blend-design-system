import { forwardRef } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { Grip } from 'lucide-react'
import type { MobileNavigationTokenType } from './mobile.tokens'

const ICON_SIZE = 20

type MoreButtonProps = {
    tokens: MobileNavigationTokenType
    onClick: () => void
}

const MoreButton = forwardRef<HTMLButtonElement, MoreButtonProps>(
    ({ tokens, onClick }, ref) => {
        const moreButtonColor = String(tokens.row.item.color.default)

        return (
            <PrimitiveButton
                ref={ref}
                key="sidebar-mobile-more"
                type="button"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={tokens.row.item.gap}
                width={tokens.row.item.width}
                height={tokens.row.item.height}
                borderRadius={tokens.row.item.borderRadius}
                backgroundColor={tokens.row.item.backgroundColor.default}
                color={moreButtonColor}
                fontWeight={tokens.row.item.fontWeight}
                flexShrink={0}
                aria-label="More options"
                onClick={onClick}
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={tokens.row.item.gap}
                    color={moreButtonColor}
                >
                    <Block
                        as="span"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={tokens.row.item.icon.width}
                        height={tokens.row.item.icon.height}
                        borderRadius={tokens.row.item.icon.borderRadius}
                        color="currentColor"
                        aria-hidden="true"
                    >
                        <Grip size={ICON_SIZE} strokeWidth={1.5} />
                    </Block>
                    <PrimitiveText
                        as="span"
                        fontSize={tokens.row.item.text.fontSize}
                        fontWeight={tokens.row.item.fontWeight}
                        textAlign={tokens.row.item.text.textAlign}
                        truncate
                        color={moreButtonColor}
                    >
                        More
                    </PrimitiveText>
                </Block>
            </PrimitiveButton>
        )
    }
)

MoreButton.displayName = 'MoreButton'

export default MoreButton
