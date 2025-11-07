import { forwardRef } from 'react'
import Skeleton from './Skeleton'
import type { SkeletonButtonProps } from './types'
import type { ButtonTokensType } from '../Button/button.tokens'
import { ButtonType, ButtonSize, ButtonSubType } from '../Button/types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

const SkeletonButton = forwardRef<HTMLDivElement, SkeletonButtonProps>(
    (
        {
            variant = 'pulse',
            loading = true,
            buttonType = ButtonType.PRIMARY,
            size = ButtonSize.MEDIUM,
            subType = ButtonSubType.DEFAULT,
            width,
            fullWidth = false,
            buttonGroupPosition,
            text,
            hasLeadingIcon = false,
            hasTrailingIcon = false,
            ...rest
        },
        ref
    ) => {
        const buttonTokens = useResponsiveTokens<ButtonTokensType>('BUTTON')

        // If not loading, don't render anything
        if (!loading) {
            return null
        }

        // Perfect token mirroring - use exact button token values
        const getMirroredButtonStyles = () => {
            // Get exact padding from button tokens
            const padding = buttonTokens.padding[size][buttonType][subType]

            // Get exact border radius from button tokens
            const borderRadius =
                buttonTokens.borderRadius[size][buttonType][subType].default

            // Calculate border radius for button groups (mirror Button.tsx logic)
            const getBorderRadius = () => {
                if (buttonGroupPosition === undefined) return borderRadius
                if (buttonGroupPosition === 'left') {
                    return `${borderRadius} 0 0 ${borderRadius}`
                } else if (buttonGroupPosition === 'right') {
                    return `0 ${borderRadius} ${borderRadius} 0`
                }
                return '0px 0px 0px 0px'
            }

            return {
                padding,
                borderRadius: getBorderRadius(),
                // Use button gap for internal spacing
                gap: buttonTokens.gap,
            }
        }

        const buttonStyles = getMirroredButtonStyles()

        // Calculate dynamic width based on content (like real button)
        const calculateDynamicWidth = () => {
            if (fullWidth) return '100%'
            if (width) return width

            // If no text and icon-only, use fit-content (minimal size)
            if (subType === ButtonSubType.ICON_ONLY || !text) {
                return 'fit-content'
            }

            // Estimate width based on text length and button size
            const getCharacterWidth = () => {
                switch (size) {
                    case ButtonSize.SMALL:
                        return 7 // ~7px per character for small
                    case ButtonSize.MEDIUM:
                        return 8 // ~8px per character for medium
                    case ButtonSize.LARGE:
                        return 9 // ~9px per character for large
                    default:
                        return 8
                }
            }

            const iconWidth = 16 // Standard icon size
            const iconGap = hasLeadingIcon || hasTrailingIcon ? 8 : 0 // Gap between icon and text

            let estimatedWidth = text.length * getCharacterWidth()

            // Add icon widths
            if (hasLeadingIcon) estimatedWidth += iconWidth + iconGap
            if (hasTrailingIcon) estimatedWidth += iconWidth + iconGap

            // Add some buffer for font variations and ensure minimum width
            const minWidth = 60 // Minimum button width
            const bufferWidth = 16 // Buffer for font variations

            return Math.max(estimatedWidth + bufferWidth, minWidth) + 'px'
        }

        const buttonWidth = calculateDynamicWidth()

        // Calculate minimum height based on button content and tokens
        const getMinimumHeight = () => {
            if (subType === ButtonSubType.INLINE) {
                return 'fit-content' // Same as real button
            }

            // Calculate minimum height: padding + content + padding
            const paddingStr = String(buttonStyles.padding)
            const paddingValues = paddingStr.split(' ')
            const verticalPadding = paddingValues[0] // Top padding
            const verticalPaddingNum = parseInt(
                verticalPadding.replace('px', '')
            )

            // Content height based on what's inside the button
            let contentHeight = 0
            if (subType === ButtonSubType.ICON_ONLY) {
                contentHeight = 16 // Icon height
            } else {
                // Text content height (body.md variant typically has 14px font + ~6px for descenders/ascenders)
                contentHeight = 20 // Reasonable text content height
            }

            // Total minimum height = top padding + content + bottom padding
            const minHeight = verticalPaddingNum * 2 + contentHeight

            return `${minHeight}px`
        }

        const calculatedHeight = getMinimumHeight()

        return (
            <Skeleton
                ref={ref}
                variant={variant}
                loading={loading}
                width={buttonWidth}
                height={calculatedHeight}
                padding={`${buttonStyles.padding.x} ${buttonStyles.padding.y}`}
                borderRadius={buttonStyles.borderRadius}
                shape="rectangle"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                gap={buttonStyles.gap}
                data-testid="skeleton-button"
                {...rest}
            />
        )
    }
)

SkeletonButton.displayName = 'SkeletonButton'

export default SkeletonButton
