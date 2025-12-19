import React, {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react'
import { type SwitchProps, SwitchSize } from './types'
import {
    getSwitchDataState,
    getSwitchTextProps,
    getSwitchSubtextProps,
    getSwitchLabelStyles,
    getSubtextId,
    mergeAriaDescribedBy,
    isControlledSwitch,
    createSwitchToggleHandler,
} from './utils'
import {
    StyledSwitchRoot,
    StyledSwitchThumb,
    StyledSwitchSlot,
} from './StyledSwitch'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip } from '../Tooltip/Tooltip'
import type { SwitchTokensType } from './switch.token'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useErrorShake } from '../common/useErrorShake'
import { getErrorShakeStyle } from '../common/error.animations'
import { getTruncatedText } from '../../global-utils/GlobalUtils'
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    (
        {
            id,
            checked,
            defaultChecked = false,
            onChange,
            disabled = false,
            required = false,
            error = false,
            size = SwitchSize.MEDIUM,
            label,
            subtext,
            slot,
            name,
            value,
            maxLength,
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<SwitchTokensType>('SWITCH')
        const generatedId = useId()
        const uniqueId = id || generatedId
        const shouldShake = useErrorShake(error)
        const switchRootElRef = useRef<HTMLButtonElement | null>(null)
        const [switchRootWidth, setSwitchRootWidth] = useState<number>(0)
        const labelMaxLength = maxLength?.label
        const subtextMaxLength = maxLength?.subtext
        const subtextId = getSubtextId(uniqueId, !!subtext)
        const { 'aria-describedby': customAriaDescribedBy, ...restProps } =
            rest as { 'aria-describedby'?: string; [key: string]: unknown }

        // Handle controlled vs uncontrolled state
        const isControlled = isControlledSwitch(checked)
        const [internalChecked, setInternalChecked] =
            useState<boolean>(defaultChecked)
        const currentChecked = isControlled
            ? (checked ?? false)
            : internalChecked

        const handleToggle = createSwitchToggleHandler(
            currentChecked,
            disabled,
            isControlled,
            setInternalChecked,
            onChange
        )

        const ariaAttributes = {
            'aria-required': required ? true : undefined,
            'aria-invalid': error ? true : undefined,
            'aria-disabled': disabled ? true : undefined,
            'aria-describedby': mergeAriaDescribedBy(
                subtextId,
                customAriaDescribedBy
            ),
        }

        const setSwitchRootRef = useCallback(
            (node: HTMLButtonElement | null) => {
                switchRootElRef.current = node

                if (!ref) return
                if (typeof ref === 'function') {
                    ref(node)
                } else {
                    ;(
                        ref as React.MutableRefObject<HTMLButtonElement | null>
                    ).current = node
                }
            },
            [ref]
        )

        useEffect(() => {
            const el = switchRootElRef.current
            if (!el) return

            const update = () => {
                setSwitchRootWidth(el.getBoundingClientRect().width)
            }

            update()

            // Prefer ResizeObserver, but guard for environments where it doesn't exist (e.g. some test runners)
            if (typeof ResizeObserver === 'undefined') {
                window.addEventListener('resize', update)
                return () => window.removeEventListener('resize', update)
            }

            const ro = new ResizeObserver(() => update())
            ro.observe(el)
            return () => ro.disconnect()
        }, [size, tokens.gap])

        const subtextIndent =
            switchRootWidth > 0
                ? `calc(${switchRootWidth}px + ${tokens.gap})`
                : tokens.gap
        return (
            <Block>
                <Block
                    data-switch={label ?? 'switch'}
                    data-status={disabled ? 'disabled' : 'enabled'}
                    display="flex"
                    gap={tokens.gap}
                    alignItems="center"
                >
                    <StyledSwitchRoot
                        ref={setSwitchRootRef}
                        type="button"
                        role="switch"
                        id={uniqueId}
                        disabled={disabled}
                        defaultChecked={defaultChecked}
                        onClick={handleToggle}
                        aria-checked={currentChecked}
                        data-state={getSwitchDataState(currentChecked)}
                        size={size}
                        $isDisabled={disabled}
                        $isChecked={currentChecked}
                        $error={error}
                        $tokens={tokens}
                        value={value}
                        name={name}
                        style={getErrorShakeStyle(shouldShake)}
                        {...restProps}
                        {...ariaAttributes}
                    >
                        <StyledSwitchThumb
                            size={size}
                            $isChecked={currentChecked}
                            $tokens={tokens}
                        />
                    </StyledSwitchRoot>

                    <Block display="flex" alignItems="center">
                        <SwitchContent
                            uniqueId={uniqueId}
                            disabled={disabled}
                            error={error}
                            required={required}
                            size={size}
                            label={label}
                            tokens={tokens}
                            maxLength={labelMaxLength}
                        />
                        {slot && (
                            <StyledSwitchSlot
                                data-element="icon"
                                size={size}
                                tokens={tokens}
                                style={{ marginLeft: tokens.content.label.gap }}
                            >
                                {slot}
                            </StyledSwitchSlot>
                        )}
                    </Block>
                </Block>
                <Block paddingLeft={subtextIndent}>
                    {subtext && (
                        <SwitchSubtext
                            id={subtextId}
                            size={size}
                            disabled={disabled}
                            error={error}
                            tokens={tokens}
                            maxLength={subtextMaxLength}
                        >
                            {subtext}
                        </SwitchSubtext>
                    )}
                </Block>
            </Block>
        )
    }
)
Switch.displayName = 'Switch'
export default Switch
const SwitchContent: React.FC<{
    uniqueId: string
    disabled: boolean
    error: boolean
    required: boolean
    size: SwitchSize
    label?: string
    tokens: SwitchTokensType
    maxLength?: number
}> = ({
    uniqueId,
    disabled,
    error,
    required,
    size,
    label,
    tokens,
    maxLength,
}) => {
    if (!label) return null
    const labelStyles = getSwitchLabelStyles(disabled)
    const textProps = getSwitchTextProps(tokens, size, disabled, error)
    const { truncatedValue, fullValue, isTruncated } = getTruncatedText(
        label,
        maxLength
    )
    const content = (
        <label htmlFor={uniqueId} style={labelStyles}>
            <PrimitiveText
                data-element="switch-label"
                data-id={label ?? ''}
                data-status={disabled ? 'disabled' : 'enabled'}
                as="span"
                fontSize={textProps.fontSize}
                fontWeight={textProps.fontWeight}
                color={textProps.color}
            >
                {truncatedValue}
                {required && (
                    <PrimitiveText
                        as="span"
                        color={tokens.required.color}
                        style={{ marginLeft: '4px' }}
                    >
                        *
                    </PrimitiveText>
                )}
            </PrimitiveText>
        </label>
    )
    return isTruncated ? (
        <Tooltip content={fullValue}>{content}</Tooltip>
    ) : (
        content
    )
}
const SwitchSubtext: React.FC<{
    id?: string
    size: SwitchSize
    disabled: boolean
    error: boolean
    tokens: SwitchTokensType
    children: React.ReactNode
    maxLength?: number
}> = ({ id, size, disabled, error, tokens, children, maxLength }) => {
    const subtextProps = getSwitchSubtextProps(tokens, size, disabled, error)
    const isStringLike =
        typeof children === 'string' || typeof children === 'number'
    const stringValue = isStringLike ? String(children) : ''
    const truncation = isStringLike
        ? getTruncatedText(stringValue, maxLength)
        : null
    const content = (
        <PrimitiveText
            data-element="switch-description"
            data-id={children ?? ''}
            data-status={disabled ? 'disabled' : 'enabled'}
            id={id}
            data-description-text={children}
            as="span"
            color={subtextProps.color}
            fontSize={subtextProps.fontSize}
        >
            {truncation?.isTruncated ? truncation.truncatedValue : children}
        </PrimitiveText>
    )
    if (truncation?.isTruncated) {
        return <Tooltip content={truncation.fullValue}>{content}</Tooltip>
    }
    return content
}
