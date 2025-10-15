import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { ButtonSubType, Button } from '../Button'
import Block from '../Primitives/Block/Block'
import { PopoverTokenType } from './popover.tokens'
import { PopoverProps, PopoverSize } from './types'

const PopoverFooter = ({
    primaryAction,
    secondaryAction,
    size = PopoverSize.MEDIUM,
}: Pick<PopoverProps, 'primaryAction' | 'secondaryAction' | 'size'>) => {
    const popoverTokens = useResponsiveTokens<PopoverTokenType>('POPOVER')

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
