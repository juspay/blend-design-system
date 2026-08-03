import { useEffect, useRef, useState, type ReactNode } from 'react'
import { addPxToValue } from '../../global-utils/GlobalUtils'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { Tooltip } from '../Tooltip'
import type { StatCardV2Props, StatCardV2Variant } from './statcardV2.types'
import type { StatCardV2TokensType } from './statcardV2.tokens'

export const STATCARD_FALLBACK_DISPLAY = '--'

export const renderVariantFallbackValue = (
    tokens: StatCardV2TokensType,
    variant: StatCardV2Variant
) => {
    const valueTokens =
        tokens.topContainer.dataContainer.statsContainer.value[variant]

    return (
        <Block
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
        >
            <Text
                fontSize={valueTokens.fontSize}
                fontWeight={valueTokens.fontWeight}
                lineHeight={addPxToValue(valueTokens.lineHeight)}
                color={valueTokens.color}
            >
                {STATCARD_FALLBACK_DISPLAY}
            </Text>
        </Block>
    )
}

type StatCardV2ValueTooltipProps = {
    content: ReactNode
    isSmallScreen: boolean
    children: ReactNode
}

const StatCardV2ValueTooltip = ({
    content,
    isSmallScreen,
    children,
}: StatCardV2ValueTooltipProps) => {
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (!isSmallScreen || !open || !content) return

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node
            if (triggerRef.current?.contains(target)) return

            const tooltipEl = document.querySelector('[data-tooltip="tooltip"]')
            if (tooltipEl?.contains(target)) return

            setOpen(false)
        }

        document.addEventListener('pointerdown', handlePointerDown)
        return () =>
            document.removeEventListener('pointerdown', handlePointerDown)
    }, [isSmallScreen, open, content])

    if (content === undefined || content === null || content === '') {
        return <>{children}</>
    }

    if (!isSmallScreen) {
        return <Tooltip content={content}>{children}</Tooltip>
    }

    return (
        <Tooltip content={content} open={open}>
            <span
                ref={triggerRef}
                style={{ display: 'inline-flex', cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation()
                    setOpen(true)
                }}
            >
                {children}
            </span>
        </Tooltip>
    )
}

const StatCardV2Value = ({
    value,
    valueTooltip,
    tokens,
    variant,
    id,
    isSmallScreen = false,
}: {
    value: StatCardV2Props['value']
    valueTooltip?: ReactNode
    tokens: StatCardV2TokensType
    variant: StatCardV2Variant
    id?: string
    isSmallScreen?: boolean
}) => {
    const valueTokens = tokens.topContainer.dataContainer.statsContainer.value

    const displayValue =
        value !== undefined && value !== null && value !== ''
            ? value
            : STATCARD_FALLBACK_DISPLAY

    return (
        <StatCardV2ValueTooltip
            content={valueTooltip}
            isSmallScreen={isSmallScreen}
        >
            <Text
                id={id}
                fontSize={valueTokens[variant].fontSize}
                fontWeight={valueTokens[variant].fontWeight}
                lineHeight={addPxToValue(valueTokens[variant].lineHeight)}
                color={valueTokens[variant].color}
                style={valueTooltip ? { cursor: 'pointer' } : undefined}
                data-element="statcard-data"
            >
                {displayValue}
            </Text>
        </StatCardV2ValueTooltip>
    )
}

export default StatCardV2Value
