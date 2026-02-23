import { forwardRef, useState } from 'react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import type { TimelineShowMoreProps } from './types'

const TimelineShowMore = forwardRef<HTMLDivElement, TimelineShowMoreProps>(
    ({ count, label, onShowMore, isLoading = false }, ref) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const [internalLoading, setInternalLoading] = useState(false)

        const loading = isLoading || internalLoading
        const displayText = label ?? `Show more (${count}+)`
        const isClickable = Boolean(onShowMore) && !loading

        const handleClick = async () => {
            if (!isClickable || !onShowMore) return
            const result = onShowMore()
            if (result instanceof Promise) {
                setInternalLoading(true)
                try {
                    await result
                } finally {
                    setInternalLoading(false)
                }
            }
        }

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleClick()
            }
        }

        return (
            <Block
                ref={ref}
                paddingLeft={tokens.layout.gutter}
                marginTop={tokens.showMore.marginTop}
                data-timeline-show-more="true"
            >
                <Block
                    display="inline-flex"
                    alignItems="center"
                    gap="6px"
                    style={{
                        cursor: isClickable
                            ? tokens.showMore.cursor
                            : 'default',
                        opacity: loading ? 0.6 : 1,
                    }}
                    role={isClickable ? 'button' : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                >
                    {loading && (
                        <Block
                            width="12px"
                            height="12px"
                            borderRadius="50%"
                            style={{
                                border: `2px solid ${tokens.showMore.color}`,
                                borderTopColor: 'transparent',
                                animation: 'timeline-spin 0.7s linear infinite',
                            }}
                        />
                    )}
                    <PrimitiveText
                        fontSize={tokens.showMore.fontSize}
                        fontWeight={tokens.showMore.fontWeight}
                        color={tokens.showMore.color}
                    >
                        {loading ? 'Loading…' : displayText}
                    </PrimitiveText>
                </Block>
            </Block>
        )
    }
)

TimelineShowMore.displayName = 'Timeline.ShowMore'

export default TimelineShowMore
