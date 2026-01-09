import { forwardRef, type MouseEvent } from 'react'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import Skeleton from '../../Skeleton/Skeleton'
import { LoaderCircle } from 'lucide-react'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../../tokens'
import {
    getLiveRegionAriaAttributes,
    visuallyHiddenStyles,
} from '../../../utils/accessibility'
import type { ButtonV2Props } from './ButtonV2.types'
import {
    ButtonV2Size,
    ButtonV2State,
    ButtonV2SubType,
    ButtonV2Type,
} from './ButtonV2.types'
import type { ButtonV2TokensType } from './ButtonV2.tokens'
import {
    calculateBorderRadius,
    calculateButtonHeight,
    calculateIconMaxHeight,
    calculateSkeletonWidth,
    createButtonClickHandler,
    getBorderRadiusFromTokens,
    getButtonStatus,
    getDefaultLineHeight,
    shouldShowSkeleton,
    validateButtonV2Props,
} from './ButtonV2.utils'

/**
 * ButtonV2 Component
 *
 * A refactored button component following RFC 0007 standards:
 * - UI rendering only (logic in utils)
 * - Uses Block/Primitives instead of styled-components
 * - Accessibility by default (uses shared utilities)
 * - Supports all HTML button props
 * - Token-based styling (no hardcoded values)
 *
 * @example
 * ```tsx
 * <ButtonV2
 *     buttonType={ButtonV2Type.PRIMARY}
 *     size={ButtonV2Size.MEDIUM}
 *     text="Click me"
 *     onClick={handleClick}
 * />
 * ```
 */
const ButtonV2 = forwardRef<HTMLButtonElement, ButtonV2Props>((props, ref) => {
    const {
        showSkeleton = false,
        skeletonVariant = 'pulse',
        buttonType = ButtonV2Type.PRIMARY,
        size = ButtonV2Size.SMALL,
        subType = ButtonV2SubType.DEFAULT,
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
        state = ButtonV2State.DEFAULT,
        ...htmlProps
    } = props

    // Validate props in development
    validateButtonV2Props(props)

    // Get tokens
    const buttonTokens = useResponsiveTokens<ButtonV2TokensType>('BUTTON')

    // Skeleton state
    const { shouldShowSkeleton: isSkeleton } = shouldShowSkeleton(showSkeleton)

    // Calculate values using utils
    const baseRadius = getBorderRadiusFromTokens(
        buttonTokens,
        size,
        buttonType,
        subType
    )
    const borderRadius = calculateBorderRadius(baseRadius, buttonGroupPosition)
    const skeletonWidth = calculateSkeletonWidth(fullWidth, width)
    const lineHeight = getDefaultLineHeight()
    const isLoading = Boolean(loading && !isSkeleton)
    const isDisabled = isSkeleton ? true : Boolean(disabled)
    const buttonStatus = getButtonStatus(isLoading, isDisabled)
    const isInButtonGroup = buttonGroupPosition !== undefined
    const buttonHeight = calculateButtonHeight(subType, isInButtonGroup)
    const iconMaxHeight = calculateIconMaxHeight(subType, buttonTokens, size)

    // Padding tokens
    const paddingTokens = buttonTokens.padding[size][buttonType][subType]
    const safePaddingTokens = {
        x: String(paddingTokens?.x ?? '0px'),
        y: String(paddingTokens?.y ?? '0px'),
    }

    // Click handler
    const handleClick = createButtonClickHandler(
        onClick,
        isSkeleton,
        isDisabled,
        isLoading
    )

    // Accessibility - match ButtonBase behavior exactly
    // aria-busy for loading/skeleton state
    const ariaBusy = isLoading || isSkeleton ? true : undefined

    // aria-label logic matches ButtonBase: skeleton + text fallback, or provided aria-label
    const ariaLabel =
        isSkeleton && text && !htmlProps['aria-label']
            ? text
            : htmlProps['aria-label']
              ? htmlProps['aria-label']
              : undefined

    // Live region for loading state announcements
    const liveRegionAttrs = isLoading
        ? getLiveRegionAriaAttributes({
              live: 'polite',
              atomic: true,
          })
        : {}

    // Skeleton wrapper
    if (isSkeleton) {
        return (
            <Skeleton
                variant={skeletonVariant}
                loading
                padding="0"
                borderRadius={borderRadius}
                width={skeletonWidth}
                display="inline-flex"
                alignItems="stretch"
                justifyContent="center"
                pointerEvents="none"
            >
                <ButtonContent
                    ref={ref}
                    buttonType={buttonType}
                    size={size}
                    subType={subType}
                    text={text}
                    leadingIcon={leadingIcon}
                    trailingIcon={trailingIcon}
                    disabled={isDisabled}
                    onClick={handleClick}
                    loading={isLoading}
                    isSkeleton={isSkeleton}
                    buttonGroupPosition={buttonGroupPosition}
                    fullWidth={fullWidth}
                    width={skeletonWidth}
                    justifyContent={justifyContent}
                    state={state}
                    tokens={buttonTokens}
                    borderRadius={borderRadius}
                    paddingTokens={safePaddingTokens}
                    buttonHeight={buttonHeight}
                    iconMaxHeight={iconMaxHeight}
                    lineHeight={lineHeight}
                    buttonStatus={buttonStatus}
                    ariaBusy={ariaBusy}
                    ariaLabel={ariaLabel}
                    liveRegionAttrs={liveRegionAttrs}
                    htmlProps={htmlProps}
                />
            </Skeleton>
        )
    }

    // Normal button
    return (
        <ButtonContent
            ref={ref}
            buttonType={buttonType}
            size={size}
            subType={subType}
            text={text}
            leadingIcon={leadingIcon}
            trailingIcon={trailingIcon}
            disabled={isDisabled}
            onClick={handleClick}
            loading={isLoading}
            isSkeleton={isSkeleton}
            buttonGroupPosition={buttonGroupPosition}
            fullWidth={fullWidth}
            width={width}
            justifyContent={justifyContent}
            state={state}
            tokens={buttonTokens}
            borderRadius={borderRadius}
            paddingTokens={safePaddingTokens}
            buttonHeight={buttonHeight}
            iconMaxHeight={iconMaxHeight}
            lineHeight={lineHeight}
            buttonStatus={buttonStatus}
            ariaBusy={ariaBusy}
            ariaLabel={ariaLabel}
            liveRegionAttrs={liveRegionAttrs}
            htmlProps={htmlProps}
        />
    )
})

ButtonV2.displayName = 'ButtonV2'

/**
 * Button Content Component
 *
 * Internal component that renders the actual button content.
 * Separated for reusability between skeleton and normal states.
 */
type ButtonContentProps = {
    buttonType: ButtonV2Type
    size: ButtonV2Size
    subType: ButtonV2SubType
    text?: string
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    disabled: boolean
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
    loading: boolean
    isSkeleton: boolean
    buttonGroupPosition?: 'center' | 'left' | 'right'
    fullWidth?: boolean
    width?: string | number
    justifyContent: string
    state: ButtonV2State
    tokens: ButtonV2TokensType
    borderRadius: string
    paddingTokens: { x: string; y: string }
    buttonHeight?: string
    iconMaxHeight: string
    lineHeight?: string
    buttonStatus: 'loading' | 'disabled' | 'enabled'
    ariaBusy?: boolean | string
    ariaLabel?: string
    liveRegionAttrs: Record<string, unknown>
    htmlProps: Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        'style' | 'className' | 'onClick'
    >
}

const ButtonContent = forwardRef<HTMLButtonElement, ButtonContentProps>(
    (
        {
            buttonType,
            size,
            subType,
            text,
            leadingIcon,
            trailingIcon,
            disabled,
            onClick,
            loading,
            fullWidth,
            width,
            justifyContent,
            state,
            tokens,
            isSkeleton,
            borderRadius,
            paddingTokens,
            buttonHeight,
            iconMaxHeight,
            lineHeight,
            buttonStatus,
            ariaBusy,
            ariaLabel,
            liveRegionAttrs,
            htmlProps,
        },
        ref
    ) => {
        // Button props for PrimitiveButton - match ButtonBase exactly
        const buttonProps = {
            ref,
            onClick,
            display: 'flex' as const,
            alignItems: 'center' as const,
            justifyContent: justifyContent as
                | 'flex-start'
                | 'flex-end'
                | 'center'
                | 'space-between'
                | 'space-around'
                | 'space-evenly',
            width: fullWidth ? '100%' : (width ?? 'fit-content'),
            height: buttonHeight,
            gap: tokens.gap,
            disabled,
            tabIndex: disabled
                ? -1
                : htmlProps.tabIndex !== undefined
                  ? Math.max(-1, Math.min(0, htmlProps.tabIndex))
                  : 0,
            background: isSkeleton
                ? 'transparent'
                : tokens.backgroundColor[buttonType][subType].default,
            color: isSkeleton
                ? 'transparent'
                : tokens.text.color[buttonType][subType].default,
            borderRadius,
            border: isSkeleton
                ? 'transparent'
                : tokens.border[buttonType][subType].default,
            outline: isSkeleton
                ? 'transparent'
                : tokens.outline[buttonType][subType].default,
            transition: 'transform 0.15s ease-in-out',
            paddingX: paddingTokens.x,
            paddingY: paddingTokens.y,
            'data-button': text,
            'data-status': buttonStatus,
            'aria-busy':
                typeof ariaBusy === 'boolean'
                    ? ariaBusy
                    : ariaBusy === 'true'
                      ? true
                      : undefined,
            'aria-label': ariaLabel,
            ...htmlProps,
            _active:
                isSkeleton || disabled
                    ? undefined
                    : {
                          background:
                              tokens.backgroundColor[buttonType][subType]
                                  .active,
                          border: tokens.border[buttonType][subType].active,
                          boxShadow: tokens.shadow[buttonType][subType].active,
                          transform: 'scale(0.99)',
                      },
            _hover: isSkeleton
                ? undefined
                : {
                      background:
                          tokens.backgroundColor[buttonType][subType].hover,
                      color: tokens.text.color[buttonType][subType].hover,
                      border: tokens.border[buttonType][subType].hover,
                  },
            _focusVisible: isSkeleton
                ? undefined
                : {
                      border: tokens.border[buttonType][subType].default,
                      outline: tokens.outline[buttonType][subType].active,
                      outlineOffset: FOUNDATION_THEME.unit[2],
                  },
            _disabled: isSkeleton
                ? {
                      background: 'transparent',
                      border: 'transparent',
                      cursor: 'default',
                  }
                : {
                      background:
                          tokens.backgroundColor[buttonType][subType].disabled,
                      border: tokens.border[buttonType][subType].disabled,
                      cursor: 'not-allowed',
                  },
        }

        return (
            <PrimitiveButton {...buttonProps}>
                {loading ? (
                    <>
                        <LoaderCircle
                            size={16}
                            color={
                                tokens.text.color[buttonType][subType].default
                            }
                            data-status="loading"
                            aria-hidden="true"
                            style={{
                                animation: 'spin 1s linear infinite',
                            }}
                        />
                        <Block
                            as="span"
                            style={visuallyHiddenStyles}
                            {...liveRegionAttrs}
                        >
                            Loading, please wait
                        </Block>
                    </>
                ) : (
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
                                    color: tokens.text.color[buttonType][
                                        subType
                                    ][disabled ? 'disabled' : 'default'],
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
                                color={
                                    isSkeleton
                                        ? 'transparent'
                                        : tokens.text.color[buttonType][
                                              subType
                                          ][state]
                                }
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
                                    color: tokens.text.color[buttonType][
                                        subType
                                    ][disabled ? 'disabled' : 'default'],
                                }}
                            >
                                {trailingIcon}
                            </Block>
                        )}
                    </>
                )}
            </PrimitiveButton>
        )
    }
)

ButtonContent.displayName = 'ButtonContent'

export default ButtonV2
