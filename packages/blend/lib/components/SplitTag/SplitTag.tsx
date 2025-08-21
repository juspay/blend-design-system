import Block from '../Primitives/Block/Block'
import { Tag, TagVariant } from '../Tags'
import { SplitTagProps } from './types'
import { useSplitTagTelemetry } from '../../telemetry/componentHooks'

const SplitTag = (props: SplitTagProps) => {
    const { primaryTag, secondaryTag, size, shape } = props

    useSplitTagTelemetry(props)

    return (
        <Block display="flex" width="fit-content" flexWrap="nowrap">
            {primaryTag ? (
                <Tag
                    {...primaryTag}
                    splitTagPosition="left"
                    variant={TagVariant.NO_FILL}
                    size={size}
                    shape={shape}
                />
            ) : null}
            {secondaryTag ? (
                <Tag
                    {...secondaryTag}
                    splitTagPosition="right"
                    variant={TagVariant.ATTENTIVE}
                    size={size}
                    shape={shape}
                />
            ) : null}
        </Block>
    )
}

SplitTag.displayName = 'SplitTag'

export default SplitTag
