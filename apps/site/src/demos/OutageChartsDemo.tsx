import { useRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { BlendChartBaseInstance } from '../../../../packages/blend/lib/components/Charts/BlendChart.types'
import type {
    BlendChartPoint,
    BlendChartReactRefObject,
    BlendChartSeriesLineOptions,
    BlendChartSeriesOptionsType,
} from '../../../../packages/blend/lib/components/Charts/BlendChart.types'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'
import Tag from '../../../../packages/blend/lib/components/Tags/Tag'
import {
    TagVariant,
    TagSize,
    TagColor,
    TagShape,
} from '../../../../packages/blend/lib/components/Tags/types'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import {
    SelectMenuSize,
    SelectMenuVariant,
} from '../../../../packages/blend/lib/components/Select'
import { ArrowLeft, EllipsisVerticalIcon } from 'lucide-react'
import BlendChart from '../../../../packages/blend/lib/components/Charts/BlendChart'
import BlendChartContainer from '../../../../packages/blend/lib/components/Charts/BlendChartContainer'
import BlendChartHeader from '../../../../packages/blend/lib/components/Charts/BlendChartHeader'

const data = [
    {
        x: 1766980800000,
        y: 9.3,
    },
    {
        x: 1766981100000,
        y: 6.45,
    },
    {
        x: 1766981400000,
        y: 6.32,
    },
    {
        x: 1766981700000,
        y: 6.25,
    },
    {
        x: 1766982000000,
        y: 7.19,
    },
    {
        x: 1766982300000,
        y: 8.65,
    },
    {
        x: 1766982600000,
        y: 9.01,
    },
    {
        x: 1766982900000,
        y: 8.17,
    },
    {
        x: 1766983200000,
        y: 8.66,
    },
    {
        x: 1766983500000,
        y: 8.45,
    },
    {
        x: 1766983800000,
        y: 7.41,
    },
    {
        x: 1766984100000,
        y: 6.26,
    },
    {
        x: 1766984400000,
        y: 6.75,
    },
]

const zones = [
    {
        value: 1766980800000,
        color: FOUNDATION_THEME.colors.red[500],
    },
    {
        value: 1766983387000,
        color: FOUNDATION_THEME.colors.red[500],
    },
    {
        value: 1766983387000,
        color: '#FFC560',
    },
    {
        value: 1766983828000,
        color: '#FFC560',
    },
    {
        value: 1766983828000,
        color: FOUNDATION_THEME.colors.purple[400],
    },
    {
        value: 1766984400000,
        color: FOUNDATION_THEME.colors.purple[400],
    },
]

const xRangeData = [
    {
        x: 1766980800000,
        x2: 1766983387000,
        y: 0,
        color: FOUNDATION_THEME.colors.red[500],
        name: 'Central Bank of India',
        downTime: '2m 3s',
    },

    {
        x: 1766983387000,
        x2: 1766983828000,
        y: 0,
        color: '#FFC560',
        name: 'Central Bank of India',
        fluctuation: '1.2%',
    },
    {
        x: 1766983828000,
        x2: 1766984400000,
        y: 0,
        color: FOUNDATION_THEME.colors.green[400],
        name: 'Central Bank of India',
    },
]

const categories = Array.from(new Set(xRangeData.map((item) => item.name)))

const updateLineChartOnHover = (
    lineChartRef: React.RefObject<BlendChartReactRefObject | null>,
    hoveredRange: { x: number; x2: number; color: string } | null,
    originalZones: typeof zones,
    originalData: typeof data
) => {
    if (!lineChartRef.current?.chart) return

    const chart = lineChartRef.current.chart
    const xAxis = chart.xAxis[0]
    const series = chart.series[0]

    if (!xAxis || !series) return

    xAxis.removePlotBand('hovered-outage')

    const updatedZones = [...originalZones]
    const updatedData = [...originalData]

    if (hoveredRange) {
        const { x, x2, color } = hoveredRange

        xAxis.addPlotBand({
            id: 'hovered-outage',
            from: x,
            to: x2,
            color: BlendChartBaseInstance.color(color)
                .setOpacity(0.15)
                .get('rgba'),
            zIndex: 1,
        })

        const hoverStartZoneIndex = updatedZones.findIndex((zone, index) => {
            const nextZone = updatedZones[index + 1]
            return zone.value <= x && (nextZone?.value ?? Infinity) > x
        })

        if (hoverStartZoneIndex !== -1) {
            const hoverZone = {
                value: x,
                color: color,
            }
            const hoverEndZone = {
                value: x2,
                color: updatedZones[hoverStartZoneIndex].color,
            }

            updatedZones.splice(
                hoverStartZoneIndex + 1,
                0,
                hoverZone,
                hoverEndZone
            )
        }

        const startPointIndex = updatedData.findIndex(
            (point) => point.x >= x && point.x <= x2
        )
        if (startPointIndex !== -1) {
            updatedData[startPointIndex] = {
                ...updatedData[startPointIndex],
            } as (typeof updatedData)[number]
        }
    }

    const updateOptions: Partial<BlendChartSeriesLineOptions> = {
        zones: updatedZones,
        data: updatedData,
        animation: false,
    }

    console.log({ updateOptions })

    series.update(updateOptions as BlendChartSeriesOptionsType, false)

    chart.redraw(false)
}

const OutageChartsDemo = () => {
    const lineChartRef = useRef<BlendChartReactRefObject | null>(null)

    const handleRangeHover = (
        range: { x: number; x2: number; color: string } | null
    ) => {
        updateLineChartOnHover(lineChartRef, range, zones, data)
    }

    return (
        <div className="p-8 gap-12 flex flex-col ">
            <BlendChartContainer>
                {/* header */}
                <BlendChartHeader>
                    <Block
                        display="flex"
                        width={'100% '}
                        alignItems="center"
                        justifyContent="space-between"
                        backgroundColor={FOUNDATION_THEME.colors.gray[25]}
                    >
                        <Block>
                            <SingleSelect
                                placeholder="Select a chart"
                                items={[]}
                                selected="Transaction Success Rate"
                                onSelect={() => {}}
                                // inline={true}
                                size={SelectMenuSize.SMALL}
                                variant={SelectMenuVariant.NO_CONTAINER}
                            />
                        </Block>
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={FOUNDATION_THEME.unit[20]}
                        >
                            <SingleSelect
                                placeholder="Select a chart"
                                items={[]}
                                selected="Top 5"
                                onSelect={() => {}}
                                // inline={true}
                                size={SelectMenuSize.SMALL}
                                variant={SelectMenuVariant.NO_CONTAINER}
                            />
                            <SingleSelect
                                placeholder="Select a chart"
                                items={[]}
                                selected="Hourly"
                                onSelect={() => {}}
                                // inline={true}
                                size={SelectMenuSize.SMALL}
                                variant={SelectMenuVariant.NO_CONTAINER}
                            />
                            <Block
                                height={FOUNDATION_THEME.unit[20]}
                                width={FOUNDATION_THEME.unit[20]}
                                contentCentered
                                onClick={() => {}}
                            >
                                <EllipsisVerticalIcon
                                    size={FOUNDATION_THEME.unit[20]}
                                    color={FOUNDATION_THEME.colors.gray[400]}
                                />
                            </Block>
                        </Block>
                    </Block>
                </BlendChartHeader>

                {/* Body */}
                <Block display="flex" flexDirection="column">
                    <Block
                        display="flex"
                        flexDirection="column"
                        gap={FOUNDATION_THEME.unit[24]}
                        padding={FOUNDATION_THEME.unit[20]}
                        paddingBottom={FOUNDATION_THEME.unit[16]}
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={FOUNDATION_THEME.unit[8]}
                        >
                            <ArrowLeft
                                size={FOUNDATION_THEME.unit[14]}
                                color={FOUNDATION_THEME.colors.gray[600]}
                            />
                            <p
                                style={{
                                    fontSize:
                                        FOUNDATION_THEME.font.size.body.md
                                            .fontSize,
                                    fontWeight:
                                        FOUNDATION_THEME.font.weight[500],
                                    color: FOUNDATION_THEME.colors.gray[600],
                                    fontFamily:
                                        FOUNDATION_THEME.font.family.body,
                                }}
                            >
                                UPI Outage Trend
                            </p>
                        </Block>
                        <BlendChart
                            ref={lineChartRef}
                            options={{
                                tooltip: {
                                    enabled: false,
                                },
                                xAxis: {
                                    type: 'datetime',
                                },
                                series: [
                                    {
                                        type: 'line',
                                        data: data,
                                        color: FOUNDATION_THEME.colors
                                            .purple[400],
                                        zoneAxis: 'x',
                                        zones: zones,
                                        marker: {
                                            enabled: false,
                                        },
                                    },
                                ],
                            }}
                        />
                    </Block>

                    <Block>
                        <BlendChart
                            options={{
                                chart: {
                                    height: categories.length * 60 + 40,
                                },
                                tooltip: {
                                    useHTML: true,
                                    // outside: true,
                                    formatter: function (this: {
                                        point: {
                                            name?: string
                                            downTime?: string
                                            fluctuation?: string
                                            x: number
                                            x2?: number
                                            color?: string
                                        }
                                    }) {
                                        const point = this.point

                                        // Format UTC time as "Jan 12, 2025 | 14:32"
                                        const formatUTCTime = (
                                            timestamp: number
                                        ) => {
                                            const date = new Date(timestamp)
                                            const months = [
                                                'Jan',
                                                'Feb',
                                                'Mar',
                                                'Apr',
                                                'May',
                                                'Jun',
                                                'Jul',
                                                'Aug',
                                                'Sep',
                                                'Oct',
                                                'Nov',
                                                'Dec',
                                            ]
                                            const month =
                                                months[date.getUTCMonth()]
                                            const day = date.getUTCDate()
                                            const year = date.getUTCFullYear()
                                            const hours = String(
                                                date.getUTCHours()
                                            ).padStart(2, '0')
                                            const minutes = String(
                                                date.getUTCMinutes()
                                            ).padStart(2, '0')
                                            return `${month} ${day}, ${year} | ${hours}:${minutes}`
                                        }

                                        const startTime = formatUTCTime(point.x)
                                        const endTime = point.x2
                                            ? formatUTCTime(point.x2)
                                            : formatUTCTime(point.x)

                                        return `
                                            <div style="display: flex; flex-direction: column; gap: 8px; padding: 12px; border-radius: 8px; border: 1px solid ${FOUNDATION_THEME.colors.gray[150]}; background: ${FOUNDATION_THEME.colors.gray[0]}; box-shadow: ${FOUNDATION_THEME.shadows.sm};">
                                                <div style="font-size: 13px; font-weight: 600; color: ${FOUNDATION_THEME.colors.gray[900]}">${point.name || 'Bank'}</div>
                                                <div style="display: flex; flex-direction: column; gap: 4px;">
                                                    <div style="font-size: 12px; font-weight: 400; color: ${FOUNDATION_THEME.colors.gray[500]}">${startTime} - ${endTime}</div>
                                                    <div style="display: flex; align-items: center; gap: 8px; width: 100%;">
                                                      ${point.downTime || point.fluctuation ? `<div style="width: 4px; height: 16px; border-radius: 8px; background-color: ${point.color || '#FFC560'}; flex-shrink: 0;"></div>` : ''}
                                                        <div style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
                                                            ${
                                                                point.downTime
                                                                    ? `<div style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
                                                                        <div style="font-size: 12px; font-weight: 400; color: ${FOUNDATION_THEME.colors.gray[500]}">Downtime:</div>
                                                                        <div style="font-size: 16px; font-weight: 600; color: ${FOUNDATION_THEME.colors.gray[900]}">${point.downTime}</div>
                                                                    </div>`
                                                                    : ''
                                                            }
                                                            ${
                                                                point.fluctuation
                                                                    ? `<div style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
                                                                        <div style="font-size: 12px; font-weight: 400; color: ${FOUNDATION_THEME.colors.gray[500]}">Fluctuation:</div>
                                                                        <div style="font-size: 16px; font-weight: 600; color: ${FOUNDATION_THEME.colors.gray[900]}">${point.fluctuation}</div>
                                                                    </div>`
                                                                    : ''
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `
                                    },
                                    position: {
                                        x: 10,
                                        y: 10,
                                    },
                                    backgroundColor: 'transparent',
                                    borderColor: 'transparent',
                                    borderRadius: 0,
                                    borderWidth: 0,
                                    shadow: false,
                                    style: {
                                        fontSize:
                                            FOUNDATION_THEME.font.size.body.sm
                                                .fontSize,
                                        fontFamily:
                                            FOUNDATION_THEME.font.family.body,
                                        color: FOUNDATION_THEME.colors
                                            .gray[400],
                                    },
                                },
                                yAxis: {
                                    categories: categories,
                                    labels: {
                                        useHTML: true,
                                        align: 'left',
                                        x: 12,
                                        y: -30,
                                        formatter: function (this: {
                                            value: string | number
                                        }) {
                                            const tagHTML =
                                                renderToStaticMarkup(
                                                    <Tag
                                                        text={String(
                                                            this.value
                                                        )}
                                                        variant={
                                                            TagVariant.SUBTLE
                                                        }
                                                        size={TagSize.SM}
                                                        color={TagColor.NEUTRAL}
                                                        shape={
                                                            TagShape.SQUARICAL
                                                        }
                                                    />
                                                )
                                            return tagHTML
                                        },
                                    },
                                },
                                xAxis: {
                                    type: 'datetime',
                                },
                                series: [
                                    {
                                        type: 'xrange',
                                        name: 'Banks',
                                        data: xRangeData,
                                        pointWidth: 8,
                                        point: {
                                            events: {
                                                mouseOver(
                                                    this: BlendChartPoint
                                                ) {
                                                    const point =
                                                        this as BlendChartPoint & {
                                                            x: number
                                                            x2?: number
                                                            color?: string
                                                        }
                                                    const range = {
                                                        x: point.x,
                                                        x2: point.x2 ?? point.x,
                                                        color:
                                                            point.color ??
                                                            '#FFC560',
                                                    }
                                                    handleRangeHover(range)
                                                },
                                                mouseOut() {
                                                    handleRangeHover(null)
                                                },
                                            },
                                        },
                                        dataLabels: {
                                            enabled: false,
                                        },
                                    },
                                ],
                            }}
                        />
                    </Block>
                </Block>
            </BlendChartContainer>
        </div>
    )
}

export default OutageChartsDemo
