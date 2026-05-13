import { forwardRef } from 'react'
import Block from '../../Primitives/Block/Block'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { Grip } from 'lucide-react'
import type { MoreButtonProps } from './types'
import { parseUnitValue } from './utils'

const MoreButton = forwardRef<HTMLButtonElement, MoreButtonProps>(
    ({ tokens, onClick, isExpanded, secondaryNavigationRegionId }, ref) => {
        const moreButtonColor = String(tokens.item.color.default)
        const iconSize = parseUnitValue(tokens.item.icon.width)

        return (
            <PrimitiveButton
                ref={ref}
                key="sidebar-v2-mobile-more"
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
                flexShrink={0}
                aria-label="More options"
                aria-expanded={isExpanded}
                aria-controls={secondaryNavigationRegionId}
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
                        <Grip size={iconSize} strokeWidth={1.5} />
                    </Block>
                    <PrimitiveText
                        as="span"
                        fontSize={tokens.item.text.fontSize}
                        fontWeight={tokens.item.text.fontWeight}
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
