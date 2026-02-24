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
import TimelineLabel from './TimelineLabel'
import TimelineHeader from './TimelineHeader'
import TimelineSubstep from './TimelineSubstep'
import TimelineNode from './TimelineNode'
import TimelineShowMore from './TimelineShowMore'
import type { TimelineRootProps } from './types'

const LINE_TOP_FALLBACK_SUBSTEP = 8

const TimelineRoot = forwardRef<HTMLDivElement, TimelineRootProps>(
    (props, ref) => {
        const { children, className, ...rest } = props
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const filteredProps = filterBlockedProps(rest)
        const [lineTop, setLineTop] = useState<number>(0)
        const [lineBottom, setLineBottom] = useState<number | null>(null)
        const containerRef = useRef<HTMLDivElement>(null)

        useLayoutEffect(() => {
            const container = containerRef.current
            if (!container) return
            const childrenArr = Array.from(container.children) as HTMLElement[]
            const first = childrenArr[0] ?? null
            const last = childrenArr[childrenArr.length - 1] ?? null

            if (!first) {
                setLineTop(0)
            } else if (first.getAttribute('data-timeline-label') === 'true') {
                setLineTop(first.offsetTop + first.offsetHeight)
            } else if (first.getAttribute('data-timeline-header') === 'true') {
                setLineTop(first.offsetTop + first.offsetHeight)
            } else if (first.getAttribute('data-timeline-substep') === 'true')
                setLineTop(LINE_TOP_FALLBACK_SUBSTEP)
            else setLineTop(0)

            if (last) {
                if (last.getAttribute('data-timeline-show-more') === 'true') {
                    setLineBottom(last.offsetTop)
                } else if (
                    last.getAttribute('data-timeline-header') === 'true'
                ) {
                    const childEls = Array.from(last.children) as HTMLElement[]
                    const bottomOfLastChild =
                        childEls.length > 0
                            ? Math.max(
                                  ...childEls.map(
                                      (el) => el.offsetTop + el.offsetHeight
                                  )
                              )
                            : 0
                    setLineBottom(last.offsetTop + bottomOfLastChild)
                } else {
                    setLineBottom(last.offsetTop + last.offsetHeight)
                }
            } else {
                setLineBottom(null)
            }
        }, [children])

        const setRef = (el: HTMLDivElement | null) => {
            containerRef.current = el
            const refObj =
                ref as React.MutableRefObject<HTMLDivElement | null> | null
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
                <Block
                    position="absolute"
                    left={tokens.track.left}
                    top={lineTop}
                    bottom={lineBottom != null ? 'auto' : 0}
                    height={
                        lineBottom != null ? lineBottom - lineTop : undefined
                    }
                    width={tokens.track.width}
                    backgroundColor={tokens.track.backgroundColor}
                    data-timeline-line="true"
                />
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
