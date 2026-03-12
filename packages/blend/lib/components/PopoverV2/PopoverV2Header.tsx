import { X } from 'lucide-react'
import { ButtonSubType, ButtonType, Button } from '../Button'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { PopoverV2TokenType } from './popoverV2.token'
import { PopoverV2Props, PopoverV2Size } from './popoverV2.types'
import { type SkeletonVariant } from '../Skeleton'
import PopoverV2Skeleton from './PopoverV2Skeleton'

const PopoverV2Header = ({
    popoverTokens,
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
    popoverTokens: PopoverV2TokenType
}) => {
    if (showSkeleton) {
        return (
            <PopoverV2Skeleton
                popoverTokens={popoverTokens}
                size={size}
                headerSkeleton={{
                    show: showSkeleton,
                    showCloseButton,
                }}
                skeletonVariant={skeletonVariant ?? 'pulse'}
            />
        )
    }

    const hasHeading = Boolean(
        heading != null &&
        (typeof heading !== 'string' || heading.trim() !== '')
    )
    const hasDescription = Boolean(
        description != null &&
        (typeof description !== 'string' || description.trim() !== '')
    )
    if (showSkeleton) return null
    if (!hasHeading && !hasDescription) return null

    return (
        <Block
            data-element="popover-header"
            display="flex"
            flexDirection="column"
            gap={popoverTokens.TopContainer.gap[size]}
        >
            <Block
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                {hasHeading && (
                    <PrimitiveText
                        {...(headingId ? { id: headingId } : {})}
                        as="h2"
                        data-element="popover-header"
                        data-id={heading || 'popover-header'}
                        fontSize={
                            popoverTokens.TopContainer.heading.fontSize[size]
                        }
                        fontWeight={
                            popoverTokens.TopContainer.heading.fontWeight[size]
                        }
                        color={popoverTokens.TopContainer.heading.color}
                        lineHeight={
                            popoverTokens.TopContainer.heading.lineHeight[size]
                        }
                    >
                        {heading}
                    </PrimitiveText>
                )}
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
            {hasDescription && (
                <PrimitiveText
                    {...(descriptionId ? { id: descriptionId } : {})}
                    data-element="popover-description"
                    data-id={description || 'popover-description'}
                    fontSize={
                        popoverTokens.TopContainer.description.fontSize[size]
                    }
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
            )}
        </Block>
    )
}

PopoverV2Header.displayName = 'PopoverV2Header'

export default PopoverV2Header
