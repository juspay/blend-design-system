import { forwardRef } from 'react'
import ButtonV2 from './ButtonV2'
import { ButtonV2Size, ButtonV2SubType, ButtonV2Type } from './buttonV2.types'

export type IconButtonProps = Omit<
    React.ComponentProps<typeof ButtonV2>,
    'text' | 'leftSlot' | 'rightSlot' | 'subType'
> & {
    icon: React.ReactNode
    'aria-label': string
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (props, ref) => {
        const {
            icon,
            buttonType = ButtonV2Type.PRIMARY,
            size = ButtonV2Size.SMALL,
            ...restProps
        } = props

        return (
            <ButtonV2
                ref={ref}
                buttonType={buttonType}
                size={size}
                subType={ButtonV2SubType.ICON_ONLY}
                leftSlot={{ slot: icon }}
                {...restProps}
            />
        )
    }
)

IconButton.displayName = 'IconButton'

export default IconButton
