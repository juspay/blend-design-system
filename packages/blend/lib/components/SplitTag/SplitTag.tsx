import Block from '../Primitives/Block/Block'
import { Tag, TagVariant } from '../Tags'
import { SplitTagProps } from './types'

const SplitTag = ({ primaryTag, secondaryTag, size, shape }: SplitTagProps) => {
    return (
        <Block
            display="flex"
            width="fit-content"
            flexWrap="nowrap"
            data-split-tag="true"
            data-split-tag-size={size}
            data-split-tag-shape={shape}
        >
            {primaryTag ? (
                <Tag
                    {...primaryTag}
                    splitTagPosition="left"
                    variant={primaryTag.variant ?? TagVariant.NO_FILL}
                    size={size}
                    shape={shape}
                    data-split-tag-left="true"
                    data-split-tag-left-text={primaryTag.text}
                />
            ) : null}
            {secondaryTag ? (
                <Tag
                    {...secondaryTag}
                    splitTagPosition="right"
                    variant={secondaryTag.variant ?? TagVariant.ATTENTIVE}
                    size={size}
                    shape={shape}
                    data-split-tag-right="true"
                    data-split-tag-right-text={secondaryTag.text}
                />
            ) : null}
        </Block>
    )
}

SplitTag.displayName = 'SplitTag'

export default SplitTag
