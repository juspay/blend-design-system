import { useRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {
    ChartV2Options,
    ChartV2SeriesOptionsType,
    ChartV2BaseInstance as Highcharts,
    type ChartV2ReactRefObject,
} from '../../../../packages/blend/lib/components/ChartsV2/chartV2.types'
import '../../../../packages/blend/lib/components/Charts/BlendChart'
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
import ChartV2 from '../../../../packages/blend/lib/components/ChartsV2/ChartV2'
import ChartV2Container from '../../../../packages/blend/lib/components/ChartsV2/ChartContainerV2'
import ChartHeaderV2 from '../../../../packages/blend/lib/components/ChartsV2/ChartHeaderV2'

const data = [
    { x: 1766980800000, y: 9.3 },
    { x: 1766981100000, y: 6.45 },
    { x: 1766981400000, y: 6.32 },
    { x: 1766981700000, y: 6.25 },
    { x: 1766982000000, y: 7.19 },
    { x: 1766982300000, y: 8.65 },
    { x: 1766982600000, y: 9.01 },
    { x: 1766982900000, y: 8.17 },
    { x: 1766983200000, y: 8.66 },
    { x: 1766983500000, y: 8.45 },
    { x: 1766983800000, y: 7.41 },
    { x: 1766984100000, y: 6.26 },
    { x: 1766984400000, y: 6.75 },
]

const zones = [
    { value: 1766980800000, color: FOUNDATION_THEME.colors.red[500] },
    { value: 1766983387000, color: FOUNDATION_THEME.colors.red[500] },
    { value: 1766983387000, color: '#FFC560' },
    { value: 1766983828000, color: '#FFC560' },
    { value: 1766983828000, color: FOUNDATION_THEME.colors.purple[400] },
    { value: 1766984400000, color: FOUNDATION_THEME.colors.purple[400] },
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
    {
        x: 1766980800000,
        x2: 1766983387000,
        y: 1,
        color: FOUNDATION_THEME.colors.red[500],
        name: 'Bank of America',
    },
    {
        x: 1766983387000,
        x2: 1766983828000,
        y: 1,
        color: '#FFC560',
        name: 'Bank of America',
    },
    {
        x: 1766983828000,
        x2: 1766984400000,
        y: 1,
        color: FOUNDATION_THEME.colors.green[400],
        name: 'Bank of America',
    },
]

const categories = Array.from(new Set(xRangeData.map((item) => item.name)))

const updateLineChartOnHover = (
    lineChartRef: React.RefObject<ChartV2ReactRefObject | null>,
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
            color: Highcharts.color(color).setOpacity(0.15).get('rgba'),
            zIndex: 1,
        })

        const hoverStartZoneIndex = updatedZones.findIndex((zone, index) => {
            const nextZone = updatedZones[index + 1]
            return zone.value <= x && (nextZone?.value ?? Infinity) > x
        })

        if (hoverStartZoneIndex !== -1) {
            const hoverZone = { value: x, color }
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
    }

    series.update(
        {
            zones: updatedZones,
            data: updatedData,
            animation: false,
        } as ChartV2SeriesOptionsType,
        false
    )
    chart.redraw(false)
}

const formatUTCTime = (timestamp: number) => {
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
    const month = months[date.getUTCMonth()]
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    return `${month} ${day}, ${year} | ${hours}:${minutes}`
}

const OutageChartDemoV2 = () => {
    const lineChartRef = useRef<ChartV2ReactRefObject | null>(null)

    const handleRangeHover = (
        range: { x: number; x2: number; color: string } | null
    ) => {
        updateLineChartOnHover(lineChartRef, range, zones, data)
    }

    const lineChartOptions: ChartV2Options = {
        tooltip: { enabled: false },
        xAxis: { type: 'datetime' },
        legend: { enabled: false },
        series: [
            {
                type: 'line',
                data,
                color: FOUNDATION_THEME.colors.purple[400],
                zoneAxis: 'x',
                zones,
                marker: { enabled: false },
            },
        ],
    }

    const xRangeChartOptions: Highcharts.Options = {
        chart: {
            height: categories.length * 60 + 90,
            marginTop: 24,
        },
        tooltip: {
            useHTML: true,
            outside: true,
            formatter: function () {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const point = (this as any).point as Highcharts.Point & {
                    name?: string
                    downTime?: string
                    fluctuation?: string
                    x2?: number
                    color?: string
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
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            borderRadius: 0,
            borderWidth: 0,
            shadow: false,
            style: {
                fontSize: FOUNDATION_THEME.font.size.body.sm.fontSize,
                fontFamily: FOUNDATION_THEME.font.family.body,
                color: FOUNDATION_THEME.colors.gray[400],
                position: 'absolute',
                zIndex: 100000,
            },
        },
        yAxis: {
            categories,
            labels: {
                useHTML: true,
                align: 'left',
                x: 12,
                y: -30,
                formatter: function (
                    this: Highcharts.AxisLabelsFormatterContextObject
                ) {
                    const tagHTML = renderToStaticMarkup(
                        <Tag
                            text={String(this.value)}
                            variant={TagVariant.SUBTLE}
                            size={TagSize.SM}
                            color={TagColor.NEUTRAL}
                            shape={TagShape.SQUARICAL}
                        />
                    )
                    return tagHTML
                },
            },
            gridLineWidth: 0,
        },
        xAxis: {
            type: 'datetime',
            labels: { enabled: false },
        },
        legend: { enabled: false },
        series: [
            {
                type: 'xrange',
                name: 'Banks',
                data: xRangeData,
                pointWidth: 8,
                point: {
                    events: {
                        mouseOver: function (this: Highcharts.Point) {
                            const point = this as Highcharts.Point & {
                                x: number
                                x2?: number
                                color?: string
                            }
                            handleRangeHover({
                                x: point.x,
                                x2: point.x2 ?? point.x,
                                color: point.color ?? '#FFC560',
                            })
                        },
                        mouseOut: () => handleRangeHover(null),
                    },
                },
                dataLabels: { enabled: false },
            },
        ],
    }

    return (
        <div className="p-8 gap-12 flex flex-col">
            <ChartV2Container>
                <ChartHeaderV2>
                    <Block
                        display="flex"
                        width="100%"
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
                                size={SelectMenuSize.SMALL}
                                variant={SelectMenuVariant.NO_CONTAINER}
                            />
                            <SingleSelect
                                placeholder="Select a chart"
                                items={[]}
                                selected="Hourly"
                                onSelect={() => {}}
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
                </ChartHeaderV2>

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
                            position="relative"
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
                        <ChartV2
                            ref={lineChartRef}
                            options={lineChartOptions}
                        />
                    </Block>

                    <Block className="px-5">
                        <ChartV2 options={xRangeChartOptions} />
                    </Block>
                </Block>
            </ChartV2Container>
        </div>
    )
}

export default OutageChartDemoV2
