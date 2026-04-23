import { forwardRef, useMemo } from 'react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { filterBlockedProps } from '../../utils/prop-helpers'
import { FOUNDATION_THEME } from '../../tokens'
import { BadgeColor, BadgeProps, BadgeSize } from './Badge.types'
import { BadgeTokensType } from './badge.tokens'
import {
    formatCount,
    getAccessibleLabel,
    getPositionStyles,
} from './badge.utils'

const BadgeContent = forwardRef<
    HTMLSpanElement,
    Omit<BadgeProps, 'position' | 'offset'>
>(
    (
        {
            count,
            maxCount = 99,
            size = BadgeSize.MD,
            color = BadgeColor.ALERT,
            text,
            showBadge = true,
            showZero = false,
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<BadgeTokensType>('BADGE')
        const filteredRest = filterBlockedProps(rest)

        // Hide badge when count is 0 and showZero is false
        const effectiveShowBadge = useMemo(() => {
            if (!showBadge) return false
            if (count === 0 && !showZero) return false
            return true
        }, [showBadge, count, showZero])

        const displayText = useMemo(() => {
            if (text) return text
            if (count !== undefined) return formatCount(count, maxCount)
            return ''
        }, [count, maxCount, text])

        // Determine if this should be a dot (no content) or pill (has content)
        const hasContent = displayText !== ''

        if (!effectiveShowBadge) return null

        const ariaLabel = getAccessibleLabel(
            count,
            text,
            maxCount,
            effectiveShowBadge
        )

        if (!hasContent) {
            return (
                <Block
                    // Block is typed as HTMLDivElement but renders as span via `as` prop.
                    // Cast is intentional — ref still points to the correct DOM node at runtime.
                    ref={ref as React.Ref<HTMLDivElement>}
                    as="span"
                    role="status"
                    aria-label={ariaLabel}
                    display="inline-block"
                    width={tokens.dot.width[size]}
                    height={tokens.dot.height[size]}
                    backgroundColor={tokens.backgroundColor[color]}
                    borderRadius={FOUNDATION_THEME.border.radius.full}
                    {...filteredRest}
                />
            )
        }

        return (
            <Block
                // Block is typed as HTMLDivElement but renders as span via `as` prop.
                // Cast is intentional — ref still points to the correct DOM node at runtime.
                ref={ref as React.Ref<HTMLDivElement>}
                as="span"
                role="status"
                aria-label={ariaLabel}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                minWidth={tokens.pill.minWidth[size]}
                height={tokens.pill.height[size]}
                paddingX={tokens.pill.paddingX[size]}
                backgroundColor={tokens.backgroundColor[color]}
                borderRadius={tokens.pill.borderRadius[size]}
                {...filteredRest}
            >
                <Text
                    as="span"
                    color={tokens.text.color}
                    fontSize={tokens.text.fontSize[size]}
                    fontWeight={tokens.text.fontWeight}
                    lineHeight={tokens.text.lineHeight[size]}
                >
                    {displayText}
                </Text>
            </Block>
        )
    }
)

BadgeContent.displayName = 'BadgeContent'

const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
    const tokens = useResponsiveTokens<BadgeTokensType>('BADGE')

    // If no children, render standalone badge
    if (props.children === undefined) {
        const { size = BadgeSize.MD, ...rest } = props
        const filteredRest = filterBlockedProps(rest)
        return <BadgeContent ref={ref} size={size} {...filteredRest} />
    }

    // If children provided, wrap with relative positioning
    const {
        children,
        size = BadgeSize.MD,
        position = 'top-right',
        offset,
        isCircular = false,
        ...rest
    } = props
    const filteredRest = filterBlockedProps(rest)

    // Determine if this should be a dot (no content) or pill (has content) for positioning
    const hasContent =
        filteredRest.count !== undefined ||
        (filteredRest.text !== undefined && filteredRest.text !== '')
    const positionStyles = getPositionStyles(
        position,
        size,
        tokens,
        offset,
        hasContent,
        isCircular
    )

    return (
        <Block
            as="span"
            display="inline-flex"
            position="relative"
            data-badge-wrapper="true"
            data-circular={isCircular}
        >
            {children}
            <Block as="span" position="absolute" {...positionStyles}>
                <BadgeContent ref={ref} size={size} {...filteredRest} />
            </Block>
        </Block>
    )
})

Badge.displayName = 'Badge'

export default Badge
