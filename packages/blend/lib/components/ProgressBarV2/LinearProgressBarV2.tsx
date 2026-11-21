import { useMemo } from 'react'
import { ProgressBarV2Appearance } from './progressBarV2.types'
import { LinearProgressBarV2Props } from './progressBarV2.types'
import { getProgressBarValueState } from './utils'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { useI18n } from '../../i18n/I18nContext'
import { DEFAULT_LOCALE } from '../../i18n/constants'
import { getNumberFormat } from '../../i18n/format/formatterCache'

/**
 * The visible percentage label. English keeps the original `${n}%`; other
 * locales get their own percent format (`50 %` in French, `%50` in
 * Turkish). The `data-id` beside it always stays the English form.
 */
const formatPercentLabel = (locale: string, rounded: number): string =>
    locale === DEFAULT_LOCALE
        ? `${rounded}%`
        : getNumberFormat(locale, 'percent').format(rounded / 100)

export const LinearProgressBarV2 = ({
    value,
    size,
    appearance,
    tokens,
    showLabel,
    ariaLabel,
    ariaLabelledby,
    min,
    max,
}: LinearProgressBarV2Props) => {
    const { locale } = useI18n()
    const { rangeMin, rangeMax, clampedValue, percentage } = useMemo(
        () => getProgressBarValueState(value, min, max),
        [value, min, max]
    )

    const containerHeight = tokens.linear.height[size]
    const fillBackgroundColor = tokens.linear.fill.backgroundColor[appearance]
    const fillBorderRadius = tokens.linear.fill.borderRadius[appearance]
    const emptyBackgroundColor = tokens.linear.empty.backgroundColor[appearance]
    const containerBorderRadius = tokens.linear.borderRadius[appearance]

    return (
        <Block
            display="flex"
            alignItems="center"
            gap={tokens.linear.gap}
            width="100%"
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={rangeMin}
            aria-valuemax={rangeMax}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
        >
            <Block
                width="100%"
                height={containerHeight}
                display="flex"
                flexGrow={1}
                borderRadius={containerBorderRadius}
                overflow="hidden"
                backgroundColor={
                    appearance === ProgressBarV2Appearance.SOLID
                        ? emptyBackgroundColor
                        : 'transparent'
                }
                aria-hidden="true"
            >
                <Block
                    data-id={fillBackgroundColor}
                    height="100%"
                    backgroundColor={fillBackgroundColor}
                    borderRadius={fillBorderRadius}
                    style={{
                        width: `${percentage}%`,
                        transition: tokens.transition,
                    }}
                />
                {appearance === ProgressBarV2Appearance.SEGMENTED && (
                    <Block
                        height="100%"
                        data-id={emptyBackgroundColor}
                        backgroundColor={emptyBackgroundColor}
                        backgroundImage={
                            tokens.linear.empty.backgroundImage[appearance]
                        }
                        backgroundSize={
                            tokens.linear.empty.backgroundSize[appearance]
                        }
                        style={{
                            width: `${100 - percentage}%`,
                        }}
                    />
                )}
            </Block>

            {showLabel && (
                <Block
                    flexShrink={0}
                    data-element="progress-bar-value-now"
                    data-id={`${Math.round(percentage)}%`}
                >
                    <Text
                        as="span"
                        fontWeight={tokens.label.fontWeight}
                        color={tokens.label.color}
                        fontSize={tokens.label.fontSize}
                        aria-hidden="true"
                    >
                        {formatPercentLabel(locale, Math.round(percentage))}
                    </Text>
                </Block>
            )}
        </Block>
    )
}
