import { addPxToValue, getTruncatedText } from '../../global-utils/GlobalUtils'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { Tooltip } from '../Tooltip'
import { SelectorsLabelProps } from './SelectorsContent.types'

const SelectorsLabel = ({
    id,
    uniqueId,
    disabled,
    error,
    required,
    size,
    label,
    tokens,
    maxLength,
}: SelectorsLabelProps) => {
    if (!label) return null

    const { truncatedValue, fullValue, isTruncated } = getTruncatedText(
        label,
        maxLength
    )

    const content = (
        <label
            id={id}
            htmlFor={uniqueId}
            style={{
                cursor: disabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                margin: 0,
                padding: 0,
                fontSize: tokens.content.label.fontSize[size],
                fontWeight: tokens.content.label.fontWeight[size],
                lineHeight: addPxToValue(tokens.content.label.lineHeight[size]),
                color: tokens.content.label.color[
                    disabled ? 'disabled' : error ? 'error' : 'default'
                ],
                userSelect: 'none',
            }}
            data-element="switch-label"
            data-id={label}
            data-status={disabled ? 'disabled' : 'enabled'}
        >
            {truncatedValue}
            {required && (
                <PrimitiveText
                    as="span"
                    color={tokens.content.required.color}
                    style={{ marginLeft: '4px' }}
                    userSelect="none"
                >
                    *
                </PrimitiveText>
            )}
        </label>
    )

    return isTruncated ? (
        <Tooltip content={fullValue}>{content}</Tooltip>
    ) : (
        content
    )
}

export default SelectorsLabel
