import { ButtonSubType, Button } from '../Button'
import Block from '../Primitives/Block/Block'
import { PopoverV2TokenType } from './popoverV2.token'
import { PopoverV2Props, PopoverV2Size } from './popoverV2.types'
import { type SkeletonVariant } from '../Skeleton'
import PopoverV2Skeleton from './PopoverV2Skeleton'

const PopoverV2Footer = ({
    popoverTokens,
    primaryAction,
    secondaryAction,
    size = PopoverV2Size.MD,
    showSkeleton,
    skeletonVariant,
}: Pick<PopoverV2Props, 'primaryAction' | 'secondaryAction' | 'size'> & {
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    popoverTokens: PopoverV2TokenType
}) => {
    if (showSkeleton) {
        return (
            <PopoverV2Skeleton
                popoverTokens={popoverTokens}
                size={size}
                footerSkeleton={{
                    show: showSkeleton,
                }}
                skeletonVariant={skeletonVariant ?? 'pulse'}
            />
        )
    }
    if (showSkeleton) return null
    if (!primaryAction && !secondaryAction) return null

    return (
        <Block
            data-element="popover-footer"
            display="flex"
            alignItems="center"
            gap={popoverTokens.bottomContainer.gap[size]}
            justifyContent={'flex-start'}
        >
            {primaryAction && (
                <Button {...primaryAction} subType={ButtonSubType.INLINE} />
            )}
            {secondaryAction && (
                <Button {...secondaryAction} subType={ButtonSubType.INLINE} />
            )}
        </Block>
    )
}

PopoverV2Footer.displayName = 'PopoverV2Footer'

export default PopoverV2Footer
