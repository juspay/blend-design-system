import { X } from 'lucide-react'
import { FOUNDATION_THEME } from '../../tokens'
import { ButtonSubType, ButtonType, Button } from '../Button'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { PopoverTokenType } from './popover.tokens'
import { PopoverProps, PopoverSize } from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { type SkeletonVariant } from '../Skeleton'
import PopoverSkeleton from './PopoverSkeleton'

const PopoverHeader = ({
    heading,
    description,
    showCloseButton,
    onClose,
    size = PopoverSize.MEDIUM,
    showSkeleton,
    skeletonVariant,
    headingId,
    descriptionId,
}: Pick<
    PopoverProps,
    'heading' | 'description' | 'showCloseButton' | 'size' | 'onClose'
> & {
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    headingId?: string
    descriptionId?: string
}) => {
    const popoverTokens = useResponsiveTokens<PopoverTokenType>('POPOVER')

    if (showSkeleton) {
        return (
            <PopoverSkeleton
                popoverTokens={popoverTokens}
                size={size}
                headerSkeleton={{
                    show: showSkeleton || false,
                    showCloseButton: showCloseButton || false,
                }}
                skeletonVariant={
                    skeletonVariant || ('pulse' as SkeletonVariant)
                }
            />
        )
    }

    if (!heading && !description) return null

    const Header = () => {
        return (
            <PrimitiveText
                {...(headingId ? { id: headingId } : {})}
                as="span"
                data-element="popover-header"
                data-id={heading || 'popover-header'}
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
                {...(descriptionId ? { id: descriptionId } : {})}
                data-popover-description={description}
                data-element="popover-description"
                data-id={description || 'popover-description'}
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
                            leadingIcon={
                                <X
                                    size={FOUNDATION_THEME.unit[12]}
                                    aria-hidden="true"
                                />
                            }
                            onClick={onClose}
                            aria-label="Close popover"
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
