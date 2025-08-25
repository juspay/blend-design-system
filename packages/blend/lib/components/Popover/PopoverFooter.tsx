import { useComponentToken } from '../../context/useComponentToken'
import { ButtonSubType, Button } from '../Button'
import Block from '../Primitives/Block/Block'
import { PopoverTokenType } from './popover.tokens'
import { PopoverProps } from './types'

const PopoverFooter = ({
    primaryAction,
    secondaryAction,
}: Pick<PopoverProps, 'primaryAction' | 'secondaryAction'>) => {
    const popoverTokens = useComponentToken('POPOVER') as PopoverTokenType

    if (!primaryAction && !secondaryAction) return null

    return (
        <Block
            data-design-system="true"
            display="flex"
            alignItems="center"
            gap={popoverTokens.footer.gap}
            justifyContent={popoverTokens.footer.justifyContent}
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
