import { forwardRef, type MouseEvent } from 'react'
import { LoaderCircle } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { ButtonV2Props } from './types'
import { ButtonSize, ButtonState, ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
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
    getDefaultLineHeight,
    getIconMaxHeight,
    getIconColor,
    getTextColor,
} from './utils'
import {
    getButtonAriaAttributes,
    createButtonKeyboardHandler,
} from '../../utils/accessibility'

type RenderButtonContentProps = {
    isLoading: boolean
    isSkeleton: boolean
    disabled?: boolean
    state: ButtonState
    buttonType: ButtonType
    subType: ButtonSubType
    size: ButtonSize
    text?: string
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    tokens: ButtonTokensType
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
    leadingIcon,
    trailingIcon,
    tokens,
}: RenderButtonContentProps) {
    const lineHeight = getDefaultLineHeight()
    const iconMaxHeight = getIconMaxHeight(subType, size, tokens)
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
        return (
            <>
                <LoaderCircle
                    size={16}
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
            {leadingIcon && (
                <Block
                    as="span"
                    contentCentered
                    data-element="leading-icon"
                    aria-hidden={text ? 'true' : undefined}
                    style={{
                        opacity: isSkeleton ? 0 : 1,
                        maxHeight: iconMaxHeight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: iconColor,
                    }}
                >
                    {leadingIcon}
                </Block>
            )}
            {text && (
                <Text
                    fontSize={tokens.text.fontSize[size]}
                    fontWeight={tokens.text.fontWeight[size]}
                    as="span"
                    color={textColor}
                    aria-hidden={isSkeleton ? true : undefined}
                    lineHeight={lineHeight}
                    textAlign="center"
                    data-id={text}
                >
                    {text}
                </Text>
            )}
            {trailingIcon && (
                <Block
                    as="span"
                    contentCentered
                    data-element="trailing-icon"
                    aria-hidden={text ? 'true' : undefined}
                    style={{
                        opacity: isSkeleton ? 0 : 1,
                        maxHeight: iconMaxHeight,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: iconColor,
                    }}
                >
                    {trailingIcon}
                </Block>
            )}
        </>
    )
}

const ButtonV2 = forwardRef<HTMLButtonElement, ButtonV2Props>((props, ref) => {
    const {
        showSkeleton = false,
        skeletonVariant = 'pulse',
        buttonType = ButtonType.PRIMARY,
        size = ButtonSize.SMALL,
        subType = ButtonSubType.DEFAULT,
        text,
        leadingIcon,
        trailingIcon,
        disabled,
        onClick,
        loading,
        buttonGroupPosition,
        fullWidth,
        width,
        justifyContent = 'center',
        state = ButtonState.DEFAULT,
        ...restHtmlProps
    } = props

    const buttonTokens = useResponsiveTokens<ButtonTokensType>('BUTTON')
    const isSkeleton = showSkeleton ?? false
    const isLoading = (loading ?? false) && !isSkeleton
    const isDisabled = isSkeleton ? true : (disabled ?? false)
    const paddingTokens = buttonTokens.padding[size][buttonType][subType]
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
        buttonTokens
    )

    const buttonElement = (
        <PrimitiveButton
            ref={ref}
            onClick={handleClick}
            {...keyboardHandler}
            display="flex"
            alignItems="center"
            justifyContent={justifyContent}
            width={fullWidth ? '100%' : (width ?? 'fit-content')}
            height={buttonHeight}
            gap={buttonTokens.gap}
            background={buttonStyles.background}
            disabled={isDisabled}
            tabIndex={getButtonTabIndex(isDisabled, restHtmlProps.tabIndex)}
            color={buttonStyles.color}
            borderRadius={borderRadius}
            border={buttonStyles.border}
            outline={buttonStyles.outline}
            transition="transform 0.15s ease-in-out"
            {...ariaAttrs}
            _active={buttonStyles._active}
            _hover={buttonStyles._hover}
            _focusVisible={buttonStyles._focusVisible}
            _disabled={buttonStyles._disabled}
            paddingX={paddingTokens.x}
            paddingY={paddingTokens.y}
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
                leadingIcon,
                trailingIcon,
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
        const skeletonWidth = getSkeletonWidth(fullWidth, width)

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
})

ButtonV2.displayName = 'ButtonV2'

export default ButtonV2
