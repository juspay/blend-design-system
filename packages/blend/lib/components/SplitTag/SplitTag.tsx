import { useId, useMemo } from 'react'
import Block from '../Primitives/Block/Block'
import { Tag, TagVariant } from '../Tags'
import { SplitTagProps } from './types'

const SplitTag = ({
    primaryTag,
    secondaryTag,
    size,
    shape,
    ...props
}: SplitTagProps) => {
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
        const parts: string[] = []
        if (primaryTag?.text) {
            parts.push(primaryTag.text)
        }
        if (secondaryTag?.text) {
            parts.push(secondaryTag.text)
        }
        return parts.length > 0 ? parts.join(': ') : 'Split tag'
    }, [primaryTag?.text, secondaryTag?.text, ariaLabel])

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
