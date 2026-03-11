import { addPxToValue } from '../../global-utils/GlobalUtils'
import Text from '../Text/Text'
import type { StatCardV2SubtitleProps } from './statcardV2.types'

const StatCardV2Subtitle = ({ subtitle, tokens }: StatCardV2SubtitleProps) => {
    if (!subtitle) return null

    const subtitleTokens = tokens.topContainer.dataContainer.subtitle
    return (
        <Text
            fontSize={subtitleTokens.fontSize}
            fontWeight={subtitleTokens.fontWeight}
            lineHeight={addPxToValue(subtitleTokens.lineHeight)}
            color={subtitleTokens.color}
            style={{ width: 'fit-content' }}
        >
            {subtitle}
        </Text>
    )
}

export default StatCardV2Subtitle
