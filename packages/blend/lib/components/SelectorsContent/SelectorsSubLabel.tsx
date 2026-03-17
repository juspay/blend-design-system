import { addPxToValue, getTruncatedText } from '../../global-utils/GlobalUtils'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip } from '../Tooltip'
import { SelectorsSubLabelProps } from './SelectorsContent.types'

const SelectorsSubLabel = ({
    id,
    subLabel,
    size,
    disabled,
    error,
    tokens,
    maxLength,
    elementType = 'subLabel',
}: SelectorsSubLabelProps) => {
    if (!subLabel) return null

    const { truncatedValue, fullValue, isTruncated } = getTruncatedText(
        subLabel,
        maxLength
    )

    const content = (
        <PrimitiveText
            data-element={elementType}
            data-id={subLabel}
            data-status={disabled ? 'disabled' : 'enabled'}
            id={id}
            data-description-text={subLabel}
            fontSize={tokens.content.subLabel.fontSize[size]}
            fontWeight={tokens.content.subLabel.fontWeight[size]}
            lineHeight={addPxToValue(tokens.content.subLabel.lineHeight[size])}
            color={
                tokens.content.subLabel.color[
                    disabled ? 'disabled' : error ? 'error' : 'default'
                ]
            }
            userSelect="none"
        >
            {isTruncated ? truncatedValue : subLabel}
        </PrimitiveText>
    )

    if (isTruncated) {
        return <Tooltip content={fullValue}>{content}</Tooltip>
    }

    return content
}

SelectorsSubLabel.displayName = 'SelectorsSubLabel'
export default SelectorsSubLabel
