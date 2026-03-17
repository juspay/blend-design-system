import {
    forwardRef,
    useLayoutEffect,
    useRef,
    useState,
    Children,
    cloneElement,
    isValidElement,
} from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { filterBlockedProps } from '../../utils/prop-helpers'
import { TimelineTokensType } from './timeline.token'
import { getLineTop, getLineBottom, parsePx, clampLineHeight } from './utils'
import TimelineLabel from './TimelineLabel'
import TimelineHeader from './TimelineHeader'
import TimelineSubstep from './TimelineSubstep'
import TimelineNode from './TimelineNode'
import TimelineShowMore from './TimelineShowMore'
import type { LineLayout, TimelineRootProps } from './types'

const TimelineRoot = forwardRef<HTMLDivElement, TimelineRootProps>(
    (props, ref) => {
        const { children, className, ...rest } = props
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const filteredProps = filterBlockedProps(rest)
        const [lineLayout, setLineLayout] = useState<LineLayout | null>(null)
        const containerRef = useRef<HTMLDivElement>(null)

        useLayoutEffect(() => {
            const container = containerRef.current
            if (!container) return

            const indicatorHeightPx = parsePx(tokens.indicator.height)
            const indicatorTopPx = parsePx(tokens.subsection.rootIndicator.top)
            const labelCircleHeightPx = parsePx(tokens.label.circle.height)
            const options = {
                indicatorHeightPx,
                indicatorTopPx,
                labelCircleHeightPx,
            }

            const top = getLineTop(container, options)
            const bottom = getLineBottom(container, options)
            const clamped = clampLineHeight(top, bottom)
            setLineLayout(clamped)
        }, [
            children,
            tokens.indicator.height,
            tokens.subsection.rootIndicator.top,
            tokens.label.circle.height,
        ])

        const setRef = (el: HTMLDivElement | null) => {
            containerRef.current = el
            const refObj = ref as React.RefObject<HTMLDivElement | null> | null
            if (typeof ref === 'function') ref(el)
            else if (refObj) refObj.current = el
        }

        return (
            <Block
                ref={setRef}
                position="relative"
                className={className}
                data-timeline="true"
                {...filteredProps}
            >
                {lineLayout && (
                    <Block
                        position="absolute"
                        left={tokens.track.left}
                        top={lineLayout.top}
                        height={lineLayout.height}
                        width={tokens.track.width}
                        backgroundColor={tokens.track.backgroundColor}
                        data-timeline-line="true"
                    />
                )}
                {Children.map(children, (child) => {
                    if (
                        isValidElement(child) &&
                        child.type === TimelineSubstep
                    ) {
                        return cloneElement(child, {
                            showIndicator: false,
                        } as { showIndicator: boolean })
                    }
                    return child
                })}
            </Block>
        )
    }
)

TimelineRoot.displayName = 'Timeline'

const Timeline = Object.assign(TimelineRoot, {
    Label: TimelineLabel,
    Header: TimelineHeader,
    Substep: TimelineSubstep,
    Node: TimelineNode,
    ShowMore: TimelineShowMore,
})

export default Timeline
