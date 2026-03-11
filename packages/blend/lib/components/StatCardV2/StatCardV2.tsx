import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import { StatCardV2TokensType } from './statcardV2.tokens'
import {
    StatCardV2ArrowDirection,
    StatCardV2ChangeType,
    StatCardV2Props,
    StatCardV2Variant,
} from './statcardV2.types'
import { filterBlockedProps } from '../../utils/prop-helpers'
import { ChartV2 } from '../ChartsV2'
import {
    ProgressBar,
    ProgressBarSize,
    ProgressBarVariant,
} from '../ProgressBar'
import StatCardV2Skeleton from './StatCardV2Skeleton'
import StatCardV2Title from './StatCardV2Title'
import StatCardV2Change from './StatCardV2Change'
import StatCardV2Subtitle from './StatCardV2Subtitle'
import StatCardV2Value, { renderVariantFallbackValue } from './StatCardV2Value'
import { buildStatCardV2ChartOptions } from './StatCardV2.chartConfig'
import StatCardV2NoData from './StatCardV2NoData'

const StatCardV2 = ({
    title,
    titleIcon,
    helpIconText,
    variant = StatCardV2Variant.NUMBER,
    actionIcon,
    value,
    progressValue,
    change,
    subtitle,
    maxWidth,
    minWidth,
    width = '100%',
    height,
    options,
    skeleton,
    ...props
}: StatCardV2Props) => {
    const tokens = useResponsiveTokens<StatCardV2TokensType>('STATCARDV2')
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const filteredProps = filterBlockedProps(props)
    const isChartVariant = variant === StatCardV2Variant.CHART
    const isProgressBarVariant = variant === StatCardV2Variant.PROGRESS_BAR
    const isNumberVariant = variant === StatCardV2Variant.NUMBER

    const effectiveChangeType =
        change?.changeType ?? StatCardV2ChangeType.INCREASE
    const effectiveArrowDirection =
        change?.arrowDirection ?? StatCardV2ArrowDirection.UP

    const hasChartData =
        isChartVariant &&
        Array.isArray(
            (options as { series?: { data?: unknown[] }[] } | undefined)?.series
        ) &&
        (
            options as { series?: { data?: unknown[] }[] } | undefined
        )?.series?.some(
            (seriesItem) =>
                Array.isArray(seriesItem?.data) && seriesItem.data.length > 0
        )

    if (
        !skeleton?.show &&
        !value &&
        !change &&
        !progressValue &&
        !hasChartData
    ) {
        return (
            <StatCardV2NoData
                title={title}
                titleIcon={titleIcon}
                helpIconText={helpIconText}
                subtitle={subtitle}
                maxWidth={maxWidth}
                minWidth={minWidth}
                width={width}
                height={height}
                tokens={tokens}
                isSmallScreen={isSmallScreen}
                filteredProps={filteredProps}
            />
        )
    }

    return (
        <Block
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            paddingTop={tokens.paddingTop}
            paddingBottom={tokens.paddingBottom}
            paddingLeft={tokens.paddingLeft}
            paddingRight={tokens.paddingRight}
            border={tokens.border}
            borderRadius={tokens.borderRadius}
            backgroundColor={tokens.backgroundColor}
            boxShadow={tokens.boxShadow}
            maxWidth={maxWidth ?? tokens.maxWidth}
            minWidth={minWidth ?? tokens.minWidth}
            width={width ?? tokens.width}
            height={height ?? tokens.height}
            {...filteredProps}
        >
            {skeleton?.show ? (
                <StatCardV2Skeleton
                    skeleton={skeleton}
                    maxWidth={(maxWidth ?? tokens.maxWidth) || '100%'}
                    minWidth={(minWidth ?? tokens.minWidth) || 'auto'}
                />
            ) : (
                <>
                    <Block
                        position="relative"
                        display="flex"
                        flexDirection={isNumberVariant ? 'column' : 'row'}
                        alignItems={isNumberVariant ? 'center' : 'flex-start'}
                        gap={tokens.topContainer.gap}
                    >
                        {actionIcon && !isSmallScreen && (
                            <Block
                                data-element="action-icon"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexShrink={0}
                                position="absolute"
                                right={0}
                                top={0}
                            >
                                {actionIcon}
                            </Block>
                        )}
                        {titleIcon && !isSmallScreen && titleIcon}
                        <Block
                            display="flex"
                            flexDirection="column"
                            gap={tokens.topContainer.dataContainer.gap}
                            alignItems={
                                isNumberVariant ? 'center' : 'flex-start'
                            }
                        >
                            <StatCardV2Title
                                title={title}
                                helpIconText={helpIconText}
                                tokens={tokens}
                            />
                            <Block
                                display="flex"
                                flexDirection="column"
                                alignItems={
                                    isNumberVariant ? 'center' : 'flex-start'
                                }
                            >
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    gap={
                                        tokens.topContainer.dataContainer
                                            .statsContainer.gap
                                    }
                                >
                                    <StatCardV2Value
                                        value={value}
                                        tokens={tokens}
                                        variant={variant}
                                    />
                                    <StatCardV2Change
                                        changeValueText={change?.value}
                                        leftSymbol={change?.leftSymbol}
                                        rightSymbol={change?.rightSymbol}
                                        arrowDirection={effectiveArrowDirection}
                                        changeType={effectiveChangeType}
                                        tokens={tokens}
                                    />
                                </Block>

                                <StatCardV2Subtitle
                                    subtitle={subtitle}
                                    tokens={tokens}
                                />
                            </Block>
                        </Block>
                    </Block>
                    {isChartVariant &&
                        (hasChartData ? (
                            <ChartV2
                                options={buildStatCardV2ChartOptions(options)}
                            />
                        ) : (
                            renderVariantFallbackValue(
                                tokens,
                                StatCardV2Variant.CHART
                            )
                        ))}
                    {isProgressBarVariant &&
                        (progressValue ? (
                            <ProgressBar
                                value={progressValue}
                                size={ProgressBarSize.SMALL}
                                variant={ProgressBarVariant.SEGMENTED}
                                showLabel={true}
                                data-single-stat-progress={title}
                            />
                        ) : (
                            renderVariantFallbackValue(
                                tokens,
                                StatCardV2Variant.PROGRESS_BAR
                            )
                        ))}
                </>
            )}
        </Block>
    )
}

export default StatCardV2

StatCardV2.displayName = 'StatCardV2'
