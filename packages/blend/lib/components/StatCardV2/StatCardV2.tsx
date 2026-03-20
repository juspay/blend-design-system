import { useId, useMemo } from 'react'
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
import SingleSelect from '../SingleSelect/SingleSelect'
import { SelectMenuSize, SelectMenuVariant } from '../SingleSelect/types'
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
import { buildStatCardV2AriaLabel } from './utils'

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
    dropdownProps,
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

    const numberVariantAlignment =
        isNumberVariant && !isSmallScreen ? 'center' : 'flex-start'

    const { label, placeholder, items, selected, onSelect } =
        dropdownProps || {}

    const resolvedHeight = !isSmallScreen && height ? height : tokens.height

    const effectiveChangeType =
        change?.changeType ?? StatCardV2ChangeType.INCREASE
    const effectiveArrowDirection =
        change?.arrowDirection ?? StatCardV2ArrowDirection.UP

    const baseId = useId()
    const titleId = `${baseId}-title`
    const valueId = `${baseId}-value`
    const changeId = `${baseId}-change`
    const subtitleId = `${baseId}-subtitle`
    const chartId = `${baseId}-chart`

    const cardLabel = useMemo(
        () =>
            buildStatCardV2AriaLabel({
                title,
                value,
                subtitle,
                change,
            }),
        [title, value, subtitle, change]
    )

    type ChartOptions = {
        series?: { data?: unknown[] }[]
    }

    const chartOptions = options as ChartOptions | undefined

    const hasChartData =
        isChartVariant &&
        Array.isArray(chartOptions?.series) &&
        chartOptions.series?.some(
            (seriesItem) =>
                Array.isArray(seriesItem?.data) && seriesItem.data.length > 0
        )

    const hasValue = value !== undefined && value !== null && value !== ''
    const hasProgressValue =
        progressValue !== undefined && progressValue !== null

    if (
        !skeleton?.show &&
        !hasValue &&
        !change &&
        !hasProgressValue &&
        !hasChartData
    ) {
        return (
            <StatCardV2NoData
                title={title}
                titleIcon={titleIcon}
                helpIconText={helpIconText}
                subtitle={subtitle}
                dropdownProps={dropdownProps}
                maxWidth={maxWidth}
                minWidth={minWidth}
                width={width}
                height={resolvedHeight}
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
            height={resolvedHeight}
            role="region"
            aria-label={cardLabel || title}
            aria-describedby={subtitle ? subtitleId : undefined}
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
                        alignItems={numberVariantAlignment}
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
                            alignItems={numberVariantAlignment}
                        >
                            <StatCardV2Title
                                id={titleId}
                                title={title}
                                helpIconText={helpIconText}
                                tokens={tokens}
                            />
                            <Block
                                display="flex"
                                flexDirection="column"
                                alignItems={numberVariantAlignment}
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
                                        id={valueId}
                                        value={value}
                                        tokens={tokens}
                                        variant={variant}
                                    />
                                    <StatCardV2Change
                                        id={changeId}
                                        changeValueText={change?.value}
                                        leftSymbol={change?.leftSymbol}
                                        rightSymbol={change?.rightSymbol}
                                        arrowDirection={effectiveArrowDirection}
                                        changeType={effectiveChangeType}
                                        tokens={tokens}
                                    />
                                </Block>

                                {!isSmallScreen && (
                                    <StatCardV2Subtitle
                                        id={subtitleId}
                                        subtitle={subtitle}
                                        tokens={tokens}
                                    />
                                )}

                                {isSmallScreen && items && items.length > 0 && (
                                    <SingleSelect
                                        label={label || ''}
                                        placeholder={placeholder || ''}
                                        items={items || []}
                                        selected={selected || ''}
                                        onSelect={onSelect || (() => {})}
                                        variant={SelectMenuVariant.NO_CONTAINER}
                                        size={SelectMenuSize.SMALL}
                                        inline={true}
                                        minMenuWidth={100}
                                    />
                                )}
                            </Block>
                        </Block>
                    </Block>
                    {isChartVariant &&
                        (hasChartData ? (
                            <Block
                                id={chartId}
                                role="img"
                                aria-label={
                                    title ? `${title} chart` : 'Data chart'
                                }
                            >
                                <ChartV2
                                    options={buildStatCardV2ChartOptions(
                                        options
                                    )}
                                />
                            </Block>
                        ) : (
                            renderVariantFallbackValue(
                                tokens,
                                StatCardV2Variant.CHART
                            )
                        ))}
                    {isProgressBarVariant &&
                        (hasProgressValue ? (
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
