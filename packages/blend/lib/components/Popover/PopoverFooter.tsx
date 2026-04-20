import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ButtonSubType, Button } from '../Button'
import Block from '../Primitives/Block/Block'
import { PopoverTokenType } from './popover.tokens'
import { PopoverProps, PopoverSize } from './types'
import { type SkeletonVariant } from '../Skeleton'
import PopoverSkeleton from './PopoverSkeleton'

const PopoverFooter = ({
    primaryAction,
    secondaryAction,
    size = PopoverSize.MEDIUM,
    showSkeleton,
    skeletonVariant,
}: Pick<PopoverProps, 'primaryAction' | 'secondaryAction' | 'size'> & {
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
}) => {
    const popoverTokens = useResponsiveTokens<PopoverTokenType>('POPOVER')

    if (showSkeleton) {
        return (
            <PopoverSkeleton
                popoverTokens={popoverTokens}
                size={size}
                footerSkeleton={{
                    show: showSkeleton || false,
                }}
                skeletonVariant={
                    skeletonVariant || ('pulse' as SkeletonVariant)
                }
            />
        )
    }

    if (!primaryAction && !secondaryAction) return null

    return (
        <Block
            data-design-system="true"
            display="flex"
            alignItems="center"
            gap={popoverTokens.footer.gap[size]}
            justifyContent={'flex-end'}
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

PopoverFooter.displayName = 'PopoverFooter'

export default PopoverFooter
