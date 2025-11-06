import { X } from 'lucide-react'
import { FOUNDATION_THEME } from '../../tokens'
import { ButtonSubType, ButtonType, Button } from '../Button'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { PopoverTokenType } from './popover.tokens'
import { PopoverProps, PopoverSize } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const PopoverHeader = ({
    heading,
    description,
    showCloseButton,
    onClose,
    size = PopoverSize.MEDIUM,
}: Pick<
    PopoverProps,
    'heading' | 'description' | 'showCloseButton' | 'size' | 'onClose'
>) => {
    const popoverTokens = useResponsiveTokens<PopoverTokenType>('POPOVER')

    if (!heading && !description) return null

    const Header = () => {
        return (
            <PrimitiveText
                data-popover-header={heading}
                fontSize={popoverTokens.headerContainer.heading.fontSize[size]}
                fontWeight={
                    popoverTokens.headerContainer.heading.fontWeight[size]
                }
                color={popoverTokens.headerContainer.heading.color}
            >
                {heading}
            </PrimitiveText>
        )
    }

    const Description = () => {
        return (
            <PrimitiveText
                data-popover-description={description}
                fontSize={
                    popoverTokens.headerContainer.description.fontSize[size]
                }
                color={popoverTokens.headerContainer.description.color}
                fontWeight={
                    popoverTokens.headerContainer.description.fontWeight[size]
                }
            >
                {description}
            </PrimitiveText>
        )
    }

    return (
        <Block
            display="flex"
            flexDirection="column"
            gap={FOUNDATION_THEME.unit[4]}
        >
            <Block
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                gap={FOUNDATION_THEME.unit[8]}
            >
                {heading ? <Header /> : description ? <Description /> : null}
                {showCloseButton && (
                    <Block size={18} contentCentered>
                        <Button
                            subType={ButtonSubType.INLINE}
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<X size={FOUNDATION_THEME.unit[12]} />}
                            onClick={onClose}
                        ></Button>
                    </Block>
                )}
            </Block>
            {description && heading && <Description />}
        </Block>
    )
}

PopoverHeader.displayName = 'PopoverHeader'

export default PopoverHeader
