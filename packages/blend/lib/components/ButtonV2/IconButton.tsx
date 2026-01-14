import { forwardRef } from 'react'
import ButtonV2 from './ButtonV2'
import { ButtonSize, ButtonSubType, ButtonType } from './buttonV2.types'

export interface IconButtonProps extends Omit<
    React.ComponentProps<typeof ButtonV2>,
    'text' | 'leadingIcon' | 'trailingIcon' | 'subType'
> {
    icon: React.ReactNode
    'aria-label': string
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (props, ref) => {
        const {
            icon,
            buttonType = ButtonType.PRIMARY,
            size = ButtonSize.SMALL,
            ...restProps
        } = props

        return (
            <ButtonV2
                ref={ref}
                buttonType={buttonType}
                size={size}
                subType={ButtonSubType.ICON_ONLY}
                leadingIcon={icon}
                {...restProps}
            />
        )
    }
)

IconButton.displayName = 'IconButton'

export default IconButton
