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
                />
            ) : null}
        </Block>
    )
}

SplitTag.displayName = 'SplitTag'

export default SplitTag
