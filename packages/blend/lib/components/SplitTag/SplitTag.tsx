import Block from '../Primitives/Block/Block'
import { Tag, TagVariant } from '../Tags'
import { SplitTagProps } from './types'

const SplitTag = ({ primaryTag, secondaryTag, size, shape }: SplitTagProps) => {
    return (
        <Block
            display="flex"
            width="fit-content"
            flexWrap="nowrap"
            data-split-tag={primaryTag.text ?? ''}
            data-split-tag-size={size}
            data-split-tag-shape={shape}
        >
            {primaryTag ? (
                <Tag
                    {...primaryTag}
                    splitTagPosition="left"
                    data-element="primary-tag"
                    variant={primaryTag.variant ?? TagVariant.NO_FILL}
                    size={size}
                    shape={shape}
                    data-split-tag-left="true"
                    data-split-tag-left-text={primaryTag.text}
                    data-status={primaryTag.color ?? ''}
                    data-id={primaryTag.text ?? ''}
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
                    data-split-tag-right="true"
                    data-split-tag-right-text={secondaryTag.text}
                    data-status={secondaryTag.color ?? ''}
                    data-id={secondaryTag.text ?? ''}
                />
            ) : null}
        </Block>
    )
}

SplitTag.displayName = 'SplitTag'

export default SplitTag
