import { forwardRef } from 'react'
import type { ButtonV2Props } from './types'
import { ButtonSize, ButtonSubType, ButtonType } from './types'
import ButtonBase from './ButtonBase'

export interface IconButtonProps extends Omit<
    ButtonV2Props,
    'text' | 'leadingIcon' | 'trailingIcon' | 'subType'
> {
    /**
     * Icon to display in the button
     * Required for IconButton
     */
    icon: React.ReactNode
    /**
     * Accessible label for the icon button
     * Required for accessibility when no text is present
     */
    'aria-label': string
}

/**
 * IconButton Component
 *
 * A specialized button component for icon-only buttons.
 * Optimized for smaller bundle size by removing text-related props.
 *
 * @example
 * ```tsx
 * <IconButton
 *   icon={<PlusIcon />}
 *   aria-label="Add item"
 *   buttonType={ButtonType.PRIMARY}
 *   size={ButtonSize.MEDIUM}
 *   onClick={handleAdd}
 * />
 * ```
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (props, ref) => {
        const {
            icon,
            buttonType = ButtonType.PRIMARY,
            size = ButtonSize.SMALL,
            ...restProps
        } = props

        return (
            <ButtonBase
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
