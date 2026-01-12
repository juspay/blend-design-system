import { forwardRef } from 'react'
import type { ButtonV2Props } from './types'
import { ButtonSize, ButtonState, ButtonSubType, ButtonType } from './types'
import type { ButtonTokensType } from './button.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { getSkeletonState } from '../Skeleton/utils'
import Skeleton from '../Skeleton/Skeleton'
import ButtonBase from './ButtonBase'
import { getSkeletonBorderRadius, getSkeletonWidth } from './utils'

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
    const { shouldShowSkeleton } = getSkeletonState(showSkeleton)

    const skeletonRadius = getSkeletonBorderRadius(
        size,
        buttonType,
        subType,
        buttonGroupPosition,
        buttonTokens
    )
    const skeletonWidth = getSkeletonWidth(fullWidth, width)

    if (shouldShowSkeleton) {
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
                <ButtonBase
                    ref={ref}
                    buttonType={buttonType}
                    size={size}
                    subType={subType}
                    text={text}
                    leadingIcon={leadingIcon}
                    trailingIcon={trailingIcon}
                    disabled={disabled}
                    onClick={onClick}
                    loading={loading}
                    buttonGroupPosition={buttonGroupPosition}
                    fullWidth={fullWidth}
                    width={skeletonWidth}
                    justifyContent={justifyContent}
                    state={state}
                    tokens={buttonTokens}
                    isSkeleton
                    {...restHtmlProps}
                />
            </Skeleton>
        )
    }

    return (
        <ButtonBase
            ref={ref}
            buttonType={buttonType}
            size={size}
            subType={subType}
            text={text}
            leadingIcon={leadingIcon}
            trailingIcon={trailingIcon}
            disabled={disabled}
            onClick={onClick}
            loading={loading}
            buttonGroupPosition={buttonGroupPosition}
            fullWidth={fullWidth}
            width={width}
            justifyContent={justifyContent}
            state={state}
            tokens={buttonTokens}
            {...restHtmlProps}
        />
    )
})

ButtonV2.displayName = 'ButtonV2'

export default ButtonV2
