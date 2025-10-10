import { useMemo, useRef } from 'react'
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    type TooltipProps,
    Area,
    AreaChart,
} from 'recharts'
import { ArrowDown, ArrowUp, CircleHelp } from 'lucide-react'
import { Tooltip } from '../Tooltip'
import {
    ProgressBar,
    ProgressBarVariant,
    ProgressBarSize,
} from '../ProgressBar'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ChangeType, StatCardVariant, type StatCardProps } from './types'
import type { StatCardTokenType } from './statcard.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { BREAKPOINTS } from '../../breakpoints/breakPoints'
import { useBreakpoints } from '../../hooks/useBreakPoints'
import {
    SelectMenuSize,
    SelectMenuVariant,
    SingleSelect,
} from '../SingleSelect'
import { toPixels } from '../../global-utils/GlobalUtils'
import { getAxisFormatter, createDateTimeFormatter } from '../Charts/ChartUtils'
import { AxisType } from '../Charts/types'

const StatCard = ({
    title,
    value,
    valueTooltip,
    change,
    subtitle,
    variant,
    chartData,
    progressValue,
    titleIcon,
    actionIcon,
    helpIconText,
    dropdownProps,
    maxWidth = 'auto',
    xAxis,
    yAxis,
    valueFormatter,
    height = 'auto',
}: StatCardProps) => {
    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'
    const titleIconRef = useRef<HTMLDivElement>(null)
    const titleIconWidth = titleIconRef.current?.offsetWidth || 0

    const statCardToken = useResponsiveTokens<StatCardTokenType>('STAT_CARD')

    const formatTooltipLabel = (label: string | number): string => {
        if (!xAxis) return String(label)
        if (xAxis.tickFormatter) return xAxis.tickFormatter(label)
        if (xAxis.type === AxisType.DATE_TIME) {
            // For tooltips, always show full date/time with year
            const tooltipFormatter = createDateTimeFormatter({
                useUTC: true,
                smartDateTimeFormat: false,
                showYear: true,
            })
            return tooltipFormatter(label)
        }
        if (xAxis.type) {
            return getAxisFormatter(xAxis)(label)
        }
        return String(label)
    }

    const formatTooltipValue = (val: string | number): string => {
        if (!yAxis) {
            return typeof val === 'number' ? val.toLocaleString() : String(val)
        }
        if (yAxis.tickFormatter) return yAxis.tickFormatter(val)
        if (yAxis.type) {
            return getAxisFormatter(yAxis)(val)
        }
        return typeof val === 'number' ? val.toLocaleString() : String(val)
    }

    const formatMainValue = (val: string | number): string => {
        if (valueFormatter) {
            return getAxisFormatter({ type: valueFormatter })(val)
        }
        return String(val)
    }

    const { label, placeholder, items, selected, onSelect } =
        dropdownProps || {}

    const gradientId = useMemo(
        () => `colorGradient-${Math.random().toString(36).slice(2, 11)}`,
        []
    )

    const normalizedVariant =
        variant === StatCardVariant.PROGRESS_BAR ? 'progress' : variant

    const formattedChange = change ? (
        <Block
            display="flex"
            alignItems="center"
            color={
                change?.valueType === ChangeType.INCREASE
                    ? statCardToken.textContainer.stats.title.change.text.color
                          .increase
                    : statCardToken.textContainer.stats.title.change.text.color
                          .decrease
            }
        >
            {change.valueType === ChangeType.INCREASE ? (
                <ArrowUp
                    size={parseInt(
                        statCardToken.textContainer.stats.title.change.arrow.width?.toString() ||
                            '14'
                    )}
                />
            ) : (
                <ArrowDown
                    size={parseInt(
                        statCardToken.textContainer.stats.title.change.arrow.width?.toString() ||
                            '14'
                    )}
                />
            )}
            <Text
                as="span"
                fontSize={
                    statCardToken.textContainer.stats.title.change.text.fontSize
                }
                fontWeight={
                    statCardToken.textContainer.stats.title.change.text
                        .fontWeight
                }
            >
                {change.value >= 0 ? '+' : ''}
                {change.value.toFixed(2)}%
            </Text>
        </Block>
    ) : null

    const isTrendingDown = useMemo(() => {
        if (!chartData || chartData.length < 2) return false
        const firstItem = chartData[0]
        const lastItem = chartData[chartData.length - 1]
        return firstItem && lastItem && firstItem.value > lastItem.value
    }, [chartData])

    const lineColor = isTrendingDown
        ? statCardToken.chart.colors.line.decrease
        : statCardToken.chart.colors.line.increase

    const baseAreaColor = isTrendingDown
        ? statCardToken.chart.colors.area.decrease
        : statCardToken.chart.colors.area.increase

    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }

    const areaColor =
        typeof baseAreaColor === 'string'
            ? hexToRgba(
                  baseAreaColor,
                  statCardToken.chart.colors.gradient.startOpacity
              )
            : baseAreaColor

    const CustomTooltip = ({
        active,
        payload,
    }: TooltipProps<number, string>) => {
        if (!active || !payload || payload.length === 0) return null

        const payloadItem = payload[0]
        if (!payloadItem) return null

        const currentValue = payloadItem.value as number
        const name = payloadItem.payload?.name

        return (
            <Block
                backgroundColor={statCardToken.chart.tooltip.backgroundColor}
                padding={`${statCardToken.chart.tooltip.padding.y} ${statCardToken.chart.tooltip.padding.x}`}
                borderRadius={statCardToken.chart.tooltip.borderRadius}
            >
                <Block display="flex" gap={4}>
                    <Text
                        as="span"
                        color={statCardToken.chart.tooltip.color}
                        fontWeight={statCardToken.chart.tooltip.fontWeight}
                        fontSize={statCardToken.chart.tooltip.fontSize}
                    >
                        {`${formatTooltipLabel(name || '')},`}
                    </Text>

                    <Text
                        as="span"
                        color={statCardToken.chart.tooltip.color}
                        fontWeight={statCardToken.chart.tooltip.fontWeight}
                        fontSize={statCardToken.chart.tooltip.fontSize}
                    >
                        {formatTooltipValue(currentValue)}
                    </Text>
                </Block>
            </Block>
        )
    }

    const indexedChartData = useMemo(() => {
        return chartData?.map((point, index) => ({
            ...point,
            index,
        }))
    }, [chartData])

    if (!value && !change && !progressValue && !chartData?.length) {
        return (
            <Block
                height={
                    height && !isSmallScreen ? height : statCardToken.height
                }
                border={statCardToken.border}
                borderRadius={statCardToken.borderRadius}
                overflow="hidden"
                backgroundColor={statCardToken.backgroundColor}
                boxShadow={statCardToken.boxShadow}
                padding={`${statCardToken.padding.y} ${statCardToken.padding.x}`}
                display="flex"
                flexDirection="column"
                // gap={statCardToken.gap}
                justifyContent="space-between"
                data-statcard-variant={normalizedVariant}
                maxWidth={maxWidth}
            >
                <Block
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    alignItems={isSmallScreen ? 'flex-start' : 'center'}
                    justifyContent="center"
                    gap={statCardToken.textContainer.gap}
                >
                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems={'center'}
                        gap={16}
                    >
                        {titleIcon && !isSmallScreen && (
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexShrink={0}
                            >
                                {titleIcon}
                            </Block>
                        )}
                        <Block
                            width="100%"
                            display="flex"
                            alignItems="center"
                            flexGrow={1}
                            gap={statCardToken.textContainer.header.gap}
                        >
                            <Tooltip content={title}>
                                <Text
                                    as="span"
                                    fontSize={
                                        statCardToken.textContainer.header.title
                                            .fontSize
                                    }
                                    fontWeight={
                                        statCardToken.textContainer.header.title
                                            .fontWeight
                                    }
                                    color={
                                        statCardToken.textContainer.header.title
                                            .color
                                    }
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {title}
                                </Text>
                            </Tooltip>
                            {helpIconText && (
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Tooltip content={helpIconText}>
                                        <CircleHelp
                                            width={parseInt(
                                                statCardToken.textContainer.header.helpIcon.width?.toString() ||
                                                    '16'
                                            )}
                                            height={parseInt(
                                                statCardToken.textContainer.header.helpIcon.width?.toString() ||
                                                    '16'
                                            )}
                                            color={
                                                statCardToken.textContainer
                                                    .header.helpIcon.color
                                                    .default
                                            }
                                        />
                                    </Tooltip>
                                </Block>
                            )}
                        </Block>
                    </Block>

                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={8}
                    >
                        <Block
                            width="100%"
                            display="flex"
                            alignItems="center"
                            gap={statCardToken.textContainer.stats.gap}
                            justifyContent={
                                formattedChange || isSmallScreen
                                    ? 'flex-start'
                                    : 'center'
                            }
                        >
                            {
                                <Tooltip content={valueTooltip || ''}>
                                    <Text
                                        as="span"
                                        fontSize={
                                            statCardToken.textContainer.stats
                                                .title.value[variant].fontSize
                                        }
                                        fontWeight={
                                            statCardToken.textContainer.stats
                                                .title.value[variant].fontWeight
                                        }
                                        color={
                                            statCardToken.textContainer.stats
                                                .title.value[variant].color
                                        }
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {'--'}
                                    </Text>
                                </Tooltip>
                            }
                        </Block>
                        {!isSmallScreen && (
                            <Text
                                as="span"
                                variant="body.sm"
                                color={
                                    statCardToken.textContainer.stats.subtitle
                                        .color
                                }
                                fontWeight={
                                    statCardToken.textContainer.stats.subtitle
                                        .fontWeight
                                }
                            >
                                {subtitle}
                            </Text>
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
        )
    }

    return (
        <Block
            height={height && !isSmallScreen ? height : statCardToken.height}
            border={statCardToken.border}
            borderRadius={statCardToken.borderRadius}
            overflow="hidden"
            backgroundColor={statCardToken.backgroundColor}
            boxShadow={statCardToken.boxShadow}
            padding={`${statCardToken.padding.y} ${statCardToken.padding.x}`}
            display="flex"
            flexDirection="column"
            // gap={statCardToken.gap}
            justifyContent="space-between"
            data-statcard-variant={normalizedVariant}
            maxWidth={maxWidth}
        >
            {variant !== StatCardVariant.NUMBER && (
                <Block
                    display="flex"
                    gap={statCardToken.textContainer.header.gap}
                >
                    {titleIcon && !isSmallScreen && (
                        <Block
                            width={
                                statCardToken.textContainer.header.titleIcon
                                    .width
                            }
                            height={
                                statCardToken.textContainer.header.titleIcon
                                    .width
                            }
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                            ref={titleIconRef}
                        >
                            {titleIcon}
                        </Block>
                    )}

                    <Block
                        display="flex"
                        flexDirection="column"
                        width="100%"
                        gap={statCardToken.textContainer.gap}
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            width="100%"
                            gap={statCardToken.textContainer.header.gap}
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                gap={statCardToken.textContainer.header.gap}
                            >
                                <Tooltip content={title}>
                                    <Text
                                        as="span"
                                        fontSize={
                                            statCardToken.textContainer.header
                                                .title.fontSize
                                        }
                                        fontWeight={
                                            statCardToken.textContainer.header
                                                .title.fontWeight
                                        }
                                        color={
                                            statCardToken.textContainer.header
                                                .title.color
                                        }
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {title}
                                    </Text>
                                </Tooltip>
                                {helpIconText && (
                                    <Block
                                        flexShrink={0}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Tooltip content={helpIconText}>
                                            <CircleHelp
                                                width={parseInt(
                                                    statCardToken.textContainer.header.helpIcon.width?.toString() ||
                                                        '16'
                                                )}
                                                height={parseInt(
                                                    statCardToken.textContainer.header.helpIcon.width?.toString() ||
                                                        '16'
                                                )}
                                                color={
                                                    statCardToken.textContainer
                                                        .header.helpIcon.color
                                                        .default
                                                }
                                            />
                                        </Tooltip>
                                    </Block>
                                )}
                            </Block>
                            {actionIcon && !isSmallScreen && (
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexShrink={0}
                                >
                                    {actionIcon}
                                </Block>
                            )}
                        </Block>

                        <Block
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            gap={statCardToken.textContainer.stats.gap}
                        >
                            <Block
                                width="100%"
                                display="flex"
                                alignItems="center"
                                gap={4}
                            >
                                <Tooltip content={valueTooltip || ''}>
                                    <Text
                                        as="span"
                                        variant="heading.lg"
                                        fontWeight={
                                            statCardToken.textContainer.stats
                                                .title.value[variant].fontWeight
                                        }
                                        color={
                                            statCardToken.textContainer.stats
                                                .title.value[variant].color
                                        }
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {formatMainValue(value) || '--'}
                                    </Text>
                                </Tooltip>

                                {formattedChange && (
                                    <Tooltip content={change?.tooltip || ''}>
                                        <Block cursor="pointer">
                                            {formattedChange}
                                        </Block>
                                    </Tooltip>
                                )}
                            </Block>
                            {!isSmallScreen && (
                                <Text
                                    as="span"
                                    fontSize={
                                        statCardToken.textContainer.stats
                                            .subtitle.fontSize
                                    }
                                    color={
                                        statCardToken.textContainer.stats
                                            .subtitle.color
                                    }
                                    fontWeight={
                                        statCardToken.textContainer.stats
                                            .subtitle.fontWeight
                                    }
                                >
                                    {subtitle}
                                </Text>
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
            )}

            {variant === StatCardVariant.NUMBER && (
                <Block
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    alignItems={isSmallScreen ? 'flex-start' : 'center'}
                    justifyContent="center"
                    gap={statCardToken.textContainer.gap}
                >
                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems={'center'}
                        gap={16}
                    >
                        {titleIcon && !isSmallScreen && (
                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexShrink={0}
                            >
                                {titleIcon}
                            </Block>
                        )}
                        <Block
                            width="100%"
                            display="flex"
                            alignItems="center"
                            flexGrow={1}
                            gap={statCardToken.textContainer.header.gap}
                        >
                            <Tooltip content={title}>
                                <Text
                                    as="span"
                                    fontSize={
                                        statCardToken.textContainer.header.title
                                            .fontSize
                                    }
                                    fontWeight={
                                        statCardToken.textContainer.header.title
                                            .fontWeight
                                    }
                                    color={
                                        statCardToken.textContainer.header.title
                                            .color
                                    }
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {title}
                                </Text>
                            </Tooltip>
                            {helpIconText && (
                                <Block
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Tooltip content={helpIconText}>
                                        <CircleHelp
                                            width={parseInt(
                                                statCardToken.textContainer.header.helpIcon.width?.toString() ||
                                                    '16'
                                            )}
                                            height={parseInt(
                                                statCardToken.textContainer.header.helpIcon.width?.toString() ||
                                                    '16'
                                            )}
                                            color={
                                                statCardToken.textContainer
                                                    .header.helpIcon.color
                                                    .default
                                            }
                                        />
                                    </Tooltip>
                                </Block>
                            )}
                        </Block>
                    </Block>

                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={8}
                    >
                        <Block
                            width="100%"
                            display="flex"
                            alignItems="center"
                            gap={statCardToken.textContainer.stats.gap}
                            justifyContent={
                                formattedChange || isSmallScreen
                                    ? 'flex-start'
                                    : 'center'
                            }
                        >
                            {
                                <Tooltip content={valueTooltip || ''}>
                                    <Text
                                        as="span"
                                        fontSize={
                                            statCardToken.textContainer.stats
                                                .title.value[variant].fontSize
                                        }
                                        fontWeight={
                                            statCardToken.textContainer.stats
                                                .title.value[variant].fontWeight
                                        }
                                        color={
                                            statCardToken.textContainer.stats
                                                .title.value[variant].color
                                        }
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {formatMainValue(value || '--')}
                                    </Text>
                                </Tooltip>
                            }
                            {formattedChange && (
                                <Tooltip content={change?.tooltip || ''}>
                                    <Block cursor="pointer">
                                        <Text
                                            as="span"
                                            color={
                                                statCardToken.textContainer
                                                    .stats.title.change.text
                                                    .color[
                                                    change?.valueType ??
                                                        ChangeType.INCREASE
                                                ]
                                            }
                                            fontSize={
                                                statCardToken.textContainer
                                                    .stats.title.change.text
                                                    .fontSize
                                            }
                                            fontWeight={
                                                statCardToken.textContainer
                                                    .stats.title.change.text
                                                    .fontWeight
                                            }
                                        >
                                            {formattedChange}
                                        </Text>
                                    </Block>
                                </Tooltip>
                            )}
                        </Block>
                        {!isSmallScreen && (
                            <Text
                                as="span"
                                variant="body.sm"
                                color={
                                    statCardToken.textContainer.stats.subtitle
                                        .color
                                }
                                fontWeight={
                                    statCardToken.textContainer.stats.subtitle
                                        .fontWeight
                                }
                            >
                                {subtitle}
                            </Text>
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
            )}

            {variant !== StatCardVariant.NUMBER && (
                <Block height={statCardToken.chart.height}>
                    {variant === StatCardVariant.LINE &&
                        (indexedChartData && indexedChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={indexedChartData}
                                    margin={{
                                        top: 5,
                                        right: 0,
                                        left: 0,
                                        bottom: 5,
                                    }}
                                >
                                    <XAxis dataKey="name" hide />
                                    <YAxis hide />
                                    <RechartsTooltip
                                        content={<CustomTooltip />}
                                        // cursor={{
                                        //     strokeDasharray:
                                        //         statCardToken.chart.tooltip
                                        //             .cursor.strokeDasharray,
                                        //     stroke: statCardToken.chart.tooltip
                                        //         .cursor.stroke,
                                        // }}
                                        position={{ y: 0 }}
                                        isAnimationActive={false}
                                        animationDuration={350}
                                    />
                                    <defs>
                                        <linearGradient
                                            id={gradientId}
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor={areaColor}
                                                stopOpacity={
                                                    statCardToken.chart.colors
                                                        .gradient.startOpacity
                                                }
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor={
                                                    statCardToken.chart.colors
                                                        .gradient.end
                                                }
                                                stopOpacity={
                                                    statCardToken.chart.colors
                                                        .gradient.endOpacity
                                                }
                                            />
                                        </linearGradient>
                                    </defs>

                                    <Area
                                        animationDuration={350}
                                        type="monotone"
                                        dataKey="value"
                                        stroke={lineColor}
                                        strokeWidth={
                                            statCardToken.chart.line.strokeWidth
                                        }
                                        fill={`url(#${gradientId})`}
                                        activeDot={{
                                            r: toPixels(
                                                statCardToken.chart.line
                                                    .activeDot.width
                                            ),
                                            fill: statCardToken.chart.line
                                                .activeDot.fill,
                                            stroke: lineColor,
                                        }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <Text
                                as="span"
                                fontSize={
                                    statCardToken.textContainer.stats.title
                                        .value[variant].fontSize
                                }
                                fontWeight={
                                    statCardToken.textContainer.stats.title
                                        .value[variant].fontWeight
                                }
                                color={
                                    statCardToken.textContainer.stats.title
                                        .value[variant].color
                                }
                                style={{
                                    paddingLeft:
                                        titleIconWidth +
                                        toPixels(
                                            statCardToken.textContainer.header
                                                .gap
                                        ),
                                    width: '100%',
                                }}
                            >
                                --
                            </Text>
                        ))}

                    {variant === StatCardVariant.BAR &&
                        (indexedChartData && indexedChartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={indexedChartData}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <XAxis dataKey="date" hide />
                                    <YAxis hide />
                                    <RechartsTooltip
                                        content={<CustomTooltip />}
                                        cursor={{
                                            fill: 'transparent',
                                        }}
                                        position={{ y: 0 }}
                                        isAnimationActive={false}
                                    />
                                    <Bar
                                        dataKey="value"
                                        fill={
                                            statCardToken.chart.bar.fill.default
                                        }
                                        radius={[
                                            toPixels(
                                                statCardToken.chart.bar
                                                    .borderTopRightRadius
                                            ),
                                            toPixels(
                                                statCardToken.chart.bar
                                                    .borderTopLeftRadius
                                            ),
                                            toPixels(
                                                statCardToken.chart.bar
                                                    .borderBottomRightRadius
                                            ),
                                            toPixels(
                                                statCardToken.chart.bar
                                                    .borderBottomLeftRadius
                                            ),
                                        ]}
                                        isAnimationActive={false}
                                        activeBar={{
                                            fill: statCardToken.chart.bar.fill
                                                .hover,
                                        }}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <Text
                                as="span"
                                fontSize={
                                    statCardToken.textContainer.stats.title
                                        .value[variant].fontSize
                                }
                                fontWeight={
                                    statCardToken.textContainer.stats.title
                                        .value[variant].fontWeight
                                }
                                color={
                                    statCardToken.textContainer.stats.title
                                        .value[variant].color
                                }
                                style={{
                                    paddingLeft:
                                        titleIconWidth +
                                        toPixels(
                                            statCardToken.textContainer.header
                                                .gap
                                        ),
                                    width: '100%',
                                }}
                            >
                                --
                            </Text>
                        ))}

                    {variant === StatCardVariant.PROGRESS_BAR &&
                        (progressValue ? (
                            <ProgressBar
                                value={progressValue}
                                size={ProgressBarSize.SMALL}
                                variant={ProgressBarVariant.SEGMENTED}
                                showLabel={true}
                            />
                        ) : (
                            <Text
                                as="span"
                                fontSize={
                                    statCardToken.textContainer.stats.title
                                        .value[variant].fontSize
                                }
                                fontWeight={
                                    statCardToken.textContainer.stats.title
                                        .value[variant].fontWeight
                                }
                                color={
                                    statCardToken.textContainer.stats.title
                                        .value[variant].color
                                }
                                style={{
                                    paddingLeft:
                                        titleIconWidth +
                                        toPixels(
                                            statCardToken.textContainer.header
                                                .gap
                                        ),
                                    width: '100%',
                                }}
                            >
                                --
                            </Text>
                        ))}
                </Block>
            )}
        </Block>
    )
}

StatCard.displayName = 'StatCard'

export default StatCard
