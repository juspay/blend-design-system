import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import ButtonV2 from '../ButtonV2/ButtonV2'
import { ButtonV2SubType, ButtonV2Type } from '../ButtonV2/buttonV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import type { TimelineShowMoreProps } from './types'
import { useMessages } from '../../i18n/useMessages'
import { DISPLAY_MESSAGES } from '../../i18n/catalog/display.messages'

const TimelineShowMore = forwardRef<HTMLDivElement, TimelineShowMoreProps>(
    ({ count, label, onShowMore, buttonProps }, ref) => {
        const { m } = useMessages(DISPLAY_MESSAGES)
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const displayText =
            label ?? m('timeline.action.show-more', { count: String(count) })

        return (
            <Block
                ref={ref}
                paddingLeft={tokens.showMore.paddingLeft}
                marginTop={tokens.showMore.marginTop}
                data-timeline-show-more="true"
            >
                <ButtonV2
                    subType={ButtonV2SubType.INLINE}
                    buttonType={ButtonV2Type.SECONDARY}
                    text={displayText}
                    onClick={onShowMore}
                    disabled={!onShowMore}
                    {...buttonProps}
                />
            </Block>
        )
    }
)

TimelineShowMore.displayName = 'Timeline.ShowMore'

export default TimelineShowMore
