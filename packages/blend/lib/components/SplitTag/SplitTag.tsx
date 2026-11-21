import { useId, useMemo } from 'react'
import Block from '../Primitives/Block/Block'
import { Tag, TagVariant } from '../Tags'
import { SplitTagProps } from './types'
import { useMessages } from '../../i18n/useMessages'
import { DISPLAY_MESSAGES } from '../../i18n/catalog/display.messages'

const SplitTag = ({
    primaryTag,
    secondaryTag,
    size,
    shape,
    ...props
}: SplitTagProps) => {
    const { m } = useMessages(DISPLAY_MESSAGES)
    const baseId = useId()
    const splitTagId = `${baseId}-split-tag`
    const primaryTagId = `${baseId}-primary-tag`
    const secondaryTagId = `${baseId}-secondary-tag`

    // Extract aria-label from props if provided
    const ariaLabel = (props as { 'aria-label'?: string })['aria-label']
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { 'aria-label': _, ...restProps } = props as {
        'aria-label'?: string
        [key: string]: unknown
    }

    const splitTagLabel = useMemo(() => {
        // Use provided aria-label if available, otherwise generate from text
        if (ariaLabel) {
            return ariaLabel
        }
        const primary = primaryTag?.text
        const secondary = secondaryTag?.text
        if (primary && secondary) {
            return m('tag.a11y.split', { primary, secondary })
        }
        return primary || secondary || m('tag.a11y.split-unnamed')
    }, [primaryTag?.text, secondaryTag?.text, ariaLabel, m])

    return (
        <Block
            {...restProps}
            display="flex"
            width="fit-content"
            flexWrap="nowrap"
            role="group"
            aria-label={splitTagLabel}
            id={splitTagId}
            data-split-tag={primaryTag?.text ?? 'split-tag'}
        >
            {primaryTag ? (
                <Tag
                    {...primaryTag}
                    splitTagPosition="left"
                    data-element="primary-tag"
                    variant={primaryTag.variant ?? TagVariant.NO_FILL}
                    size={size}
                    shape={shape}
                    data-status={primaryTag.color ?? ''}
                    data-id={primaryTag.text ?? ''}
                    id={primaryTagId}
                />
            ) : null}
            {secondaryTag ? (
                <Tag
                    {...secondaryTag}
                    splitTagPosition="right"
                    data-element="secondary-tag"
                    variant={secondaryTag.variant ?? TagVariant.ATTENTIVE}
                    size={size}
                    shape={shape}
                    data-status={secondaryTag.color ?? ''}
                    data-id={secondaryTag.text ?? ''}
                    id={secondaryTagId}
                    // Preserve user-provided aria-label, otherwise Tag component will use text
                />
            ) : null}
        </Block>
    )
}

SplitTag.displayName = 'SplitTag'

export default SplitTag
