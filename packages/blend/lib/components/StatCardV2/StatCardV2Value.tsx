import { addPxToValue } from '../../global-utils/GlobalUtils'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import type { StatCardV2Props, StatCardV2Variant } from './statcardV2.types'
import type { StatCardV2TokensType } from './statcardV2.tokens'

export const STATCARD_FALLBACK_DISPLAY = '--'

export const renderVariantFallbackValue = (
    tokens: StatCardV2TokensType,
    variant: StatCardV2Variant
) => {
    const valueTokens =
        tokens.topContainer.dataContainer.statsContainer.value[variant]

    return (
        <Block
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
        >
            <Text
                fontSize={valueTokens.fontSize}
                fontWeight={valueTokens.fontWeight}
                lineHeight={addPxToValue(valueTokens.lineHeight)}
                color={valueTokens.color}
            >
                {STATCARD_FALLBACK_DISPLAY}
            </Text>
        </Block>
    )
}

const StatCardV2Value = ({
    value,
    tokens,
    variant,
    id,
}: {
    value: StatCardV2Props['value']
    tokens: StatCardV2TokensType
    variant: StatCardV2Variant
    id?: string
}) => {
    const valueTokens = tokens.topContainer.dataContainer.statsContainer.value

    const displayValue =
        value !== undefined && value !== null && value !== ''
            ? value
            : STATCARD_FALLBACK_DISPLAY

    return (
        <Text
            id={id}
            fontSize={valueTokens[variant].fontSize}
            fontWeight={valueTokens[variant].fontWeight}
            lineHeight={addPxToValue(valueTokens[variant].lineHeight)}
            color={valueTokens[variant].color}
            data-element="statcard-data"
        >
            {displayValue}
        </Text>
    )
}

export default StatCardV2Value
