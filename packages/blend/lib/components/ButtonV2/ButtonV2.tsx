import { forwardRef, type MouseEvent } from 'react'
import { LoaderCircle } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { ButtonV2Props } from './buttonV2.types'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
} from './buttonV2.types'
import type { ButtonV2TokensType } from './buttonV2.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Skeleton from '../Skeleton/Skeleton'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { VisuallyHidden } from './VisuallyHidden'
import {
    getBorderRadius,
    getButtonHeight,
    getButtonStatus,
    getButtonTabIndex,
    getButtonStyles,
    getSkeletonBorderRadius,
    getSkeletonWidth,
    getIconMaxHeight,
    getIconColor,
    getTextColor,
    getButtonPadding,
    getButtonLineHeight,
} from './utils'
import {
    getButtonAriaAttributes,
    createButtonKeyboardHandler,
} from '../../utils/accessibility'

type RenderButtonContentProps = {
    isLoading: boolean
    isSkeleton: boolean
    disabled?: boolean
    state: ButtonV2State
    buttonType: ButtonV2Type
    subType: ButtonV2SubType
    size: ButtonV2Size
    text?: string
    leftSlot?: {
        slot: React.ReactNode
        maxHeight?: string | number
    }
    rightSlot?: {
        slot: React.ReactNode
        maxHeight?: string | number
    }
    tokens: ButtonV2TokensType
}

export function renderButtonContent({
    isLoading,
    isSkeleton,
    disabled,
    state,
    buttonType,
    subType,
    size,
    text,
    leftSlot,
    rightSlot,
    tokens,
}: RenderButtonContentProps) {
    const iconMaxHeight = getIconMaxHeight(
        subType,
        leftSlot?.maxHeight,
        rightSlot?.maxHeight,
        size
    )
    const iconColor = getIconColor(
        isSkeleton,
        disabled,
        buttonType,
        subType,
        tokens
    )
    const textColor = getTextColor(
        isSkeleton,
        disabled,
        state,
        buttonType,
        subType,
        tokens
    )

    if (isLoading) {
        // Default loader size based on button size
        const loaderSizeMap: Record<ButtonV2Size, number> = {
            [ButtonV2Size.SMALL]: 16,
            [ButtonV2Size.MEDIUM]: 18,
            [ButtonV2Size.LARGE]: 20,
        }
        const loaderSize = loaderSizeMap[size] || 16
        return (
            <>
                <LoaderCircle
                    size={loaderSize}
                    color={tokens.text.color[buttonType][subType].default}
                    data-status="loading"
                    aria-hidden="true"
                    style={{
                        animation: 'spin 1s linear infinite',
                    }}
                />
                <VisuallyHidden aria-live="polite">
                    Loading, please wait
                </VisuallyHidden>
            </>
        )
    }

    return (
        <>
            {leftSlot?.slot && (
                <Block
                    as="span"
                    contentCentered
                    data-element="leading-icon"
                    aria-hidden={text ? 'true' : undefined}
                    opacity={isSkeleton ? 0 : 1}
                    maxHeight={iconMaxHeight}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    color={iconColor}
                >
                    {leftSlot.slot}
                </Block>
            )}
            {text && (
                <Text
                    fontSize={tokens.text.fontSize[size]}
                    fontWeight={tokens.text.fontWeight[size]}
                    as="span"
                    color={textColor}
                    aria-hidden={isSkeleton ? true : undefined}
                    lineHeight={getButtonLineHeight(size, tokens)}
                    textAlign="center"
                    data-id={text}
                >
                    {text}
                </Text>
            )}
            {rightSlot?.slot && (
                <Block
                    as="span"
                    contentCentered
                    data-element="trailing-icon"
                    aria-hidden={text ? 'true' : undefined}
                    opacity={isSkeleton ? 0 : 1}
                    maxHeight={iconMaxHeight}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    color={iconColor}
                >
                    {rightSlot.slot}
                </Block>
            )}
        </>
    )
}

const ButtonV2 = forwardRef<HTMLButtonElement, ButtonV2Props>(
    (
        {
            skeleton = {},
            buttonType = ButtonV2Type.PRIMARY,
            size = ButtonV2Size.SMALL,
            subType = ButtonV2SubType.DEFAULT,
            text,
            leftSlot,
            rightSlot,
            loading,
            buttonGroupPosition,
            width,
            minWidth,
            maxWidth,
            state = ButtonV2State.DEFAULT,
            disabled,
            onClick,
            ...restHtmlProps
        },
        ref
    ) => {
        const { showSkeleton = false, skeletonVariant = 'pulse' } = skeleton
        const buttonTokens = useResponsiveTokens<ButtonV2TokensType>('BUTTONV2')
        const isSkeleton = showSkeleton ?? false
        const isLoading = (loading ?? false) && !isSkeleton
        const isDisabled = isSkeleton ? true : (disabled ?? false)
        const paddingTokens = getButtonPadding(
            size,
            buttonType,
            subType,
            buttonTokens
        )
        const buttonStatus = getButtonStatus(isLoading, isDisabled)

        const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
            if (isSkeleton || isDisabled || isLoading) return
            onClick?.(event)
        }

        const borderRadius = getBorderRadius(
            size,
            buttonType,
            subType,
            buttonGroupPosition,
            buttonTokens
        )
        const buttonHeight = getButtonHeight(subType)

        const ariaLabel =
            isSkeleton && text && !restHtmlProps['aria-label']
                ? text
                : restHtmlProps['aria-label']

        const ariaAttrs = getButtonAriaAttributes({
            disabled: isDisabled,
            loading: isLoading,
            ariaLabel,
        })

        const keyboardHandler = createButtonKeyboardHandler(() => {
            if (!isDisabled && !isLoading && onClick) {
                const syntheticEvent = {
                    preventDefault: () => {},
                    stopPropagation: () => {},
                } as MouseEvent<HTMLButtonElement>
                onClick(syntheticEvent)
            }
        }, isDisabled)

        const buttonStyles = getButtonStyles(
            isSkeleton,
            isDisabled,
            buttonType,
            subType,
            buttonTokens,
            buttonGroupPosition
        )

        const buttonElement = (
            <PrimitiveButton
                ref={ref}
                onClick={handleClick}
                {...keyboardHandler}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={width ?? 'fit-content'}
                minWidth={minWidth}
                maxWidth={maxWidth}
                height={buttonHeight}
                gap={buttonTokens.gap}
                background={buttonStyles.background}
                disabled={isDisabled}
                tabIndex={getButtonTabIndex(isDisabled, restHtmlProps.tabIndex)}
                color={buttonStyles.color}
                borderRadius={borderRadius}
                border={buttonStyles.border}
                borderTop={buttonStyles.borderTop}
                borderRight={buttonStyles.borderRight}
                borderBottom={buttonStyles.borderBottom}
                borderLeft={buttonStyles.borderLeft}
                transition="transform 0.15s ease-in-out"
                {...ariaAttrs}
                _active={buttonStyles._active}
                _hover={buttonStyles._hover}
                _focusVisible={buttonStyles._focusVisible}
                _disabled={buttonStyles._disabled}
                paddingTop={paddingTokens.top}
                paddingX={paddingTokens.right}
                paddingBottom={paddingTokens.bottom}
                data-button={text}
                data-status={buttonStatus}
                {...restHtmlProps}
            >
                {renderButtonContent({
                    isLoading,
                    isSkeleton,
                    disabled,
                    state,
                    buttonType,
                    subType,
                    size,
                    text,
                    leftSlot,
                    rightSlot,
                    tokens: buttonTokens,
                })}
            </PrimitiveButton>
        )

        if (isSkeleton) {
            const skeletonRadius = getSkeletonBorderRadius(
                size,
                buttonType,
                subType,
                buttonGroupPosition,
                buttonTokens
            )
            const skeletonWidth = getSkeletonWidth(width)

            return (
                <Skeleton
                    variant={skeletonVariant}
                    loading
                    padding="0"
                    borderRadius={skeletonRadius}
                    width={skeletonWidth}
                    display="inline-flex"
                    alignItems="stretch"
                    justifyContent="center"
                    pointerEvents="none"
                >
                    {buttonElement}
                </Skeleton>
            )
        }

        return buttonElement
    }
)

ButtonV2.displayName = 'ButtonV2'

export default ButtonV2
