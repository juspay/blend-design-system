import { X } from 'lucide-react'
import { ButtonSubType, ButtonType, Button } from '../Button'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { PopoverV2TokenType } from './popoverV2.token'
import { PopoverV2Props, PopoverV2Size } from './popoverV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { type SkeletonVariant } from '../Skeleton'
import PopoverV2Skeleton from './PopoverV2Skeleton'

const PopoverV2Header = ({
    heading,
    description,
    showCloseButton,
    onClose,
    size = PopoverV2Size.MD,
    showSkeleton,
    skeletonVariant,
    headingId,
    descriptionId,
}: Pick<
    PopoverV2Props,
    'heading' | 'description' | 'showCloseButton' | 'size' | 'onClose'
> & {
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    headingId?: string
    descriptionId?: string
}) => {
    const popoverTokens = useResponsiveTokens<PopoverV2TokenType>('POPOVERV2')

    if (showSkeleton) {
        return (
            <PopoverV2Skeleton
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
                fontSize={popoverTokens.TopContainer.heading.fontSize[size]}
                fontWeight={popoverTokens.TopContainer.heading.fontWeight[size]}
                color={popoverTokens.TopContainer.heading.color}
                lineHeight={popoverTokens.TopContainer.heading.lineHeight[size]}
            >
                {heading}
            </PrimitiveText>
        )
    }

    const Description = () => {
        return (
            <PrimitiveText
                {...(descriptionId ? { id: descriptionId } : {})}
                data-element="popover-description"
                data-id={description || 'popover-description'}
                fontSize={popoverTokens.TopContainer.description.fontSize[size]}
                color={popoverTokens.TopContainer.description.color}
                fontWeight={
                    popoverTokens.TopContainer.description.fontWeight[size]
                }
                lineHeight={
                    popoverTokens.TopContainer.description.lineHeight[size]
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
            gap={popoverTokens.TopContainer.gap[size]}
        >
            <Block
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                {heading && <Header />}
                {showCloseButton && (
                    <Button
                        subType={ButtonSubType.INLINE}
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={
                            <X
                                size={
                                    popoverTokens.TopContainer.heading.IconSize[
                                        size
                                    ] as number
                                }
                                aria-hidden="true"
                                color={popoverTokens.TopContainer.heading.color}
                            />
                        }
                        onClick={onClose}
                        aria-label="Close popover"
                    ></Button>
                )}
            </Block>
            {description && <Description />}
        </Block>
    )
}

PopoverV2Header.displayName = 'PopoverV2Header'

export default PopoverV2Header
