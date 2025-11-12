import { forwardRef } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { Grip } from 'lucide-react'
import { FOUNDATION_THEME } from '../../../tokens'
import type { MobileNavigationTokenType } from './mobile.tokens'

const ICON_SIZE = 20

type MoreButtonProps = {
    tokens: MobileNavigationTokenType
    onClick: () => void
}

const MoreButton = forwardRef<HTMLButtonElement, MoreButtonProps>(
    ({ tokens, onClick }, ref) => {
        // More button uses item tokens but with gray[500] color for text
        const moreButtonColor = String(FOUNDATION_THEME.colors.gray[500])

        return (
            <PrimitiveButton
                ref={ref}
                key="sidebar-mobile-more"
                type="button"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={tokens.item.gap}
                width={tokens.item.width}
                height={tokens.item.height}
                borderRadius={tokens.item.borderRadius}
                backgroundColor={tokens.item.backgroundColor.default}
                color={moreButtonColor}
                fontWeight={tokens.item.fontWeight}
                flexShrink={tokens.item.flexShrink}
                aria-label="More options"
                onClick={onClick}
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={tokens.item.gap}
                    color={moreButtonColor}
                >
                    <Block
                        as="span"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={tokens.item.icon.width}
                        height={tokens.item.icon.height}
                        borderRadius={tokens.item.icon.borderRadius}
                        color="currentColor"
                        aria-hidden="true"
                    >
                        <Grip size={ICON_SIZE} strokeWidth={1.5} />
                    </Block>
                    <PrimitiveText
                        as="span"
                        fontSize={tokens.item.text.fontSize}
                        fontWeight={tokens.item.fontWeight}
                        textAlign={tokens.item.text.textAlign}
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
