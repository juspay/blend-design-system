import { forwardRef } from 'react'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { ButtonProps } from './Button.types'
import type { ButtonV2TokensType } from './ButtonV2.tokens'

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        variant = 'primary',
        size = 'md',
        subType = 'default',
        children,
        leadingIcon,
        trailingIcon,
        loading = false,
        loadingText,
        spinner,
        spinnerPlacement = 'start',
        disabled = false,
        fullWidth = false,
        width,
        justifyContent = 'center',
        groupPosition,
        showSkeleton = false,
        type = 'button',
        onClick,
        ...rest
    } = props

    const tokens = useResponsiveTokens<ButtonV2TokensType>('BUTTON')
    const isDisabled = disabled || loading || showSkeleton
    const buttonWidth = fullWidth
        ? '100%'
        : width
          ? String(width)
          : 'fit-content'

    const baseRadius =
        tokens.borderRadius?.[size]?.[variant]?.[subType]?.default ?? '8px'
    let borderRadius = baseRadius
    if (groupPosition) {
        if (groupPosition === 'left')
            borderRadius = `${baseRadius} 0 0 ${baseRadius}`
        else if (groupPosition === 'right')
            borderRadius = `0 ${baseRadius} ${baseRadius} 0`
        else borderRadius = '0'
    }

    const padding = tokens.padding?.[size]?.[variant]?.[subType] ?? {
        x: '16px',
        y: '8px',
    }
    const bg =
        tokens.backgroundColor?.[variant]?.[subType]?.default ?? '#0066CC'
    const border =
        tokens.border?.[variant]?.[subType]?.default ?? '1px solid transparent'
    const color = tokens.text?.color?.[variant]?.[subType]?.default ?? 'white'
    const outline = tokens.outline?.[variant]?.[subType]?.default ?? 'none'

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!isDisabled && onClick) onClick(e)
    }

    if (showSkeleton) {
        return (
            <PrimitiveButton
                ref={ref}
                type={type}
                disabled={true}
                className="button-skeleton"
                style={{ opacity: 0.6, pointerEvents: 'none' }}
                display="flex"
                alignItems="center"
                justifyContent={justifyContent}
                width={buttonWidth}
                paddingX="0"
                paddingY="0"
                border="none"
            >
                {leadingIcon && (
                    <span className="button-icon leading">{leadingIcon}</span>
                )}
                {children}
                {trailingIcon && (
                    <span className="button-icon trailing">{trailingIcon}</span>
                )}
            </PrimitiveButton>
        )
    }

    const loader = loading && (
        <span className="button-loader" aria-live="polite" aria-atomic="true">
            {spinnerPlacement === 'start' &&
                (spinner || <div className="spinner" />)}
            {loadingText && (
                <span className="button-loading-text">{loadingText}</span>
            )}
            {spinnerPlacement === 'end' &&
                (spinner || <div className="spinner" />)}
        </span>
    )

    return (
        <PrimitiveButton
            ref={ref}
            type={type}
            disabled={isDisabled}
            onClick={handleClick}
            display="flex"
            alignItems="center"
            justifyContent={justifyContent}
            gap={tokens.gap}
            width={buttonWidth}
            paddingX={padding.x}
            paddingY={padding.y}
            background={bg}
            color={color}
            border={border}
            borderRadius={borderRadius}
            outline={outline}
            transition="transform 0.15s ease-in-out"
            data-loading={loading}
            data-disabled={disabled}
            tabIndex={isDisabled ? -1 : (rest.tabIndex ?? 0)}
            aria-disabled={isDisabled}
            aria-busy={loading}
            aria-label={rest['aria-label']}
            {...rest}
        >
            {leadingIcon && (
                <span className="button-icon leading">{leadingIcon}</span>
            )}
            {loading ? loader : children}
            {trailingIcon && (
                <span className="button-icon trailing">{trailingIcon}</span>
            )}
        </PrimitiveButton>
    )
})

Button.displayName = 'Button'
export default Button
