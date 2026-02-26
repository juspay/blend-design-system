import { useRef, useState } from 'react'
import ChartV2Container from '../../../../packages/blend/lib/components/ChartsV2/ChartContainerV2'
import ChartV2 from '../../../../packages/blend/lib/components/ChartsV2/ChartV2'
import ChartV2Fullscreen from '../../../../packages/blend/lib/components/ChartsV2/ChartV2Fullscreen'
import ChartV2Legend from '../../../../packages/blend/lib/components/ChartsV2/ChartV2Legend'
import ChartHeaderV2 from '../../../../packages/blend/lib/components/ChartsV2/ChartHeaderV2'
import type { ChartV2ReactRefObject } from '../../../../packages/blend/lib/components/ChartsV2/chartV2.types'
import { ChevronsDownUp, Expand } from 'lucide-react'
import {
    areaChartOptions,
    columnChartOptions,
    DASHBOARD_CHART_TITLES,
    dashboardChartOptions,
    dashboardCustomLegendItems,
    lineChartOptions,
    lineColumnChartOptions,
    lineWithOutageMarkerOptions,
    noDataChartOptions,
    pieChartOptions,
    sankeyChartOptions,
    scatterChartOptions,
} from './ChartV2DemoConfigs'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'

const ColumnChartSection = () => {
    const [showChart, setShowChart] = useState(true)
    const chartRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">Column</h3>
            <ChartV2Fullscreen>
                {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
                    <ChartV2Container>
                        <ChartHeaderV2>
                            <div className="flex w-full items-center justify-between bg-gray-25 ">
                                <div className="text-sm font-medium text-gray-700">
                                    Column Chart
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronsDownUp
                                        size={20}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        onClick={() =>
                                            setShowChart((prev) => !prev)
                                        }
                                    />
                                    <button
                                        type="button"
                                        aria-label={
                                            isFullscreen
                                                ? 'Exit fullscreen view'
                                                : 'Enter fullscreen view'
                                        }
                                        onClick={
                                            isFullscreen
                                                ? exitFullscreen
                                                : enterFullscreen
                                        }
                                        className="flex h-8 w-8 items-center justify-center "
                                    >
                                        <Expand
                                            size={18}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </ChartHeaderV2>

                        {showChart && (
                            <div className="pt-5 p-4 flex flex-col gap-6">
                                <ChartV2
                                    ref={chartRef}
                                    options={columnChartOptions}
                                />
                            </div>
                        )}
                    </ChartV2Container>
                )}
            </ChartV2Fullscreen>
        </section>
    )
}

const LineChartSection = () => {
    const [showChart, setShowChart] = useState(true)
    const chartRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">Line</h3>
            <ChartV2Fullscreen>
                {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
                    <ChartV2Container>
                        <ChartHeaderV2>
                            <div className="flex w-full items-center justify-between bg-gray-25 ">
                                <div className="text-sm font-medium text-gray-700">
                                    Line Chart
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronsDownUp
                                        size={20}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        onClick={() =>
                                            setShowChart((prev) => !prev)
                                        }
                                    />
                                    <button
                                        type="button"
                                        aria-label={
                                            isFullscreen
                                                ? 'Exit fullscreen view'
                                                : 'Enter fullscreen view'
                                        }
                                        onClick={
                                            isFullscreen
                                                ? exitFullscreen
                                                : enterFullscreen
                                        }
                                        className="flex h-8 w-8 items-center justify-center "
                                    >
                                        <Expand
                                            size={18}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </ChartHeaderV2>

                        {showChart && (
                            <div className="pt-5 p-4 flex flex-col gap-6">
                                <ChartV2
                                    ref={chartRef}
                                    options={lineChartOptions}
                                />
                            </div>
                        )}
                    </ChartV2Container>
                )}
            </ChartV2Fullscreen>
        </section>
    )
}

const AreaChartSection = () => {
    const [showChart, setShowChart] = useState(true)
    const chartRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">Area</h3>
            <ChartV2Fullscreen>
                {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
                    <ChartV2Container>
                        <ChartHeaderV2>
                            <div className="flex w-full items-center justify-between bg-gray-25 ">
                                <div className="text-sm font-medium text-gray-700">
                                    Area Chart
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronsDownUp
                                        size={20}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        onClick={() =>
                                            setShowChart((prev) => !prev)
                                        }
                                    />
                                    <button
                                        type="button"
                                        aria-label={
                                            isFullscreen
                                                ? 'Exit fullscreen view'
                                                : 'Enter fullscreen view'
                                        }
                                        onClick={
                                            isFullscreen
                                                ? exitFullscreen
                                                : enterFullscreen
                                        }
                                        className="flex h-8 w-8 items-center justify-center "
                                    >
                                        <Expand
                                            size={18}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </ChartHeaderV2>
                        {showChart && (
                            <div className="pt-5 p-4 flex flex-col gap-6">
                                <ChartV2
                                    ref={chartRef}
                                    options={areaChartOptions}
                                />
                            </div>
                        )}
                    </ChartV2Container>
                )}
            </ChartV2Fullscreen>
        </section>
    )
}

const PieChartSection = () => {
    const [showChart, setShowChart] = useState(true)
    const chartRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">Pie</h3>
            <ChartV2Fullscreen>
                {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
                    <ChartV2Container>
                        <ChartHeaderV2>
                            <div className="flex w-full items-center justify-between bg-gray-25 ">
                                <div className="text-sm font-medium text-gray-700">
                                    Pie Chart
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronsDownUp
                                        size={20}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        onClick={() =>
                                            setShowChart((prev) => !prev)
                                        }
                                    />
                                    <button
                                        type="button"
                                        aria-label={
                                            isFullscreen
                                                ? 'Exit fullscreen view'
                                                : 'Enter fullscreen view'
                                        }
                                        onClick={
                                            isFullscreen
                                                ? exitFullscreen
                                                : enterFullscreen
                                        }
                                        className="flex h-8 w-8 items-center justify-center "
                                    >
                                        <Expand
                                            size={18}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </ChartHeaderV2>
                        {showChart && (
                            <div className=" flex items-center pt-5 p-4 justify-center flex items-center ">
                                <ChartV2
                                    ref={chartRef}
                                    options={pieChartOptions}
                                />

                                <ChartV2Legend
                                    layout="vertical"
                                    chartRef={chartRef}
                                    customLegendItems={[
                                        {
                                            key: 'Overall',
                                            name: 'Overall',
                                            color: FOUNDATION_THEME.colors
                                                .primary[500],
                                            value: 54,
                                        },
                                        {
                                            key: 'goindigo',
                                            name: 'goindigo',
                                            color: FOUNDATION_THEME.colors
                                                .red[500],
                                            value: 10,
                                        },
                                    ]}
                                />
                            </div>
                        )}
                    </ChartV2Container>
                )}
            </ChartV2Fullscreen>
        </section>
    )
}

const ScatterChartSection = () => {
    const [showChart, setShowChart] = useState(true)
    const chartRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">Scatter</h3>
            <ChartV2Fullscreen>
                {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
                    <ChartV2Container>
                        <ChartHeaderV2>
                            <div className="flex w-full items-center justify-between bg-gray-25 ">
                                <div className="text-sm font-medium text-gray-700">
                                    Scatter Chart
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronsDownUp
                                        size={20}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        onClick={() =>
                                            setShowChart((prev) => !prev)
                                        }
                                    />
                                    <button
                                        type="button"
                                        aria-label={
                                            isFullscreen
                                                ? 'Exit fullscreen view'
                                                : 'Enter fullscreen view'
                                        }
                                        onClick={
                                            isFullscreen
                                                ? exitFullscreen
                                                : enterFullscreen
                                        }
                                        className="flex h-8 w-8 items-center justify-center "
                                    >
                                        <Expand
                                            size={18}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </ChartHeaderV2>
                        {showChart && (
                            <div className="pt-5 p-4 flex flex-col gap-6">
                                <ChartV2
                                    ref={chartRef}
                                    options={scatterChartOptions}
                                />
                            </div>
                        )}
                    </ChartV2Container>
                )}
            </ChartV2Fullscreen>
        </section>
    )
}

const SankeyChartSection = () => {
    const [showChart, setShowChart] = useState(true)
    const chartRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">Sankey</h3>
            <ChartV2Fullscreen>
                {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
                    <ChartV2Container>
                        <ChartHeaderV2>
                            <div className="flex w-full items-center justify-between bg-gray-25 ">
                                <div className="text-sm font-medium text-gray-700">
                                    Sankey Chart
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronsDownUp
                                        size={20}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        onClick={() =>
                                            setShowChart((prev) => !prev)
                                        }
                                    />
                                    <button
                                        type="button"
                                        aria-label={
                                            isFullscreen
                                                ? 'Exit fullscreen view'
                                                : 'Enter fullscreen view'
                                        }
                                        onClick={
                                            isFullscreen
                                                ? exitFullscreen
                                                : enterFullscreen
                                        }
                                        className="flex h-8 w-8 items-center justify-center "
                                    >
                                        <Expand
                                            size={18}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </ChartHeaderV2>
                        {showChart && (
                            <div className="pt-5 p-4 flex flex-col gap-6">
                                <ChartV2
                                    ref={chartRef}
                                    options={sankeyChartOptions}
                                />
                            </div>
                        )}
                    </ChartV2Container>
                )}
            </ChartV2Fullscreen>
        </section>
    )
}

const LineColumnChartSection = () => {
    const [showChart, setShowChart] = useState(true)
    const chartRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">Line &amp; Column</h3>
            <ChartV2Fullscreen>
                {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
                    <ChartV2Container>
                        <ChartHeaderV2>
                            <div className="flex w-full items-center justify-between bg-gray-25 ">
                                <div className="text-sm font-medium text-gray-700">
                                    Line &amp; Column Chart
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronsDownUp
                                        size={20}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        onClick={() =>
                                            setShowChart((prev) => !prev)
                                        }
                                    />
                                    <button
                                        type="button"
                                        aria-label={
                                            isFullscreen
                                                ? 'Exit fullscreen view'
                                                : 'Enter fullscreen view'
                                        }
                                        onClick={
                                            isFullscreen
                                                ? exitFullscreen
                                                : enterFullscreen
                                        }
                                        className="flex h-8 w-8 items-center justify-center "
                                    >
                                        <Expand
                                            size={18}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </ChartHeaderV2>
                        {showChart && (
                            <div className="pt-5 p-4 flex flex-col gap-6">
                                <ChartV2
                                    ref={chartRef}
                                    options={lineColumnChartOptions}
                                />
                            </div>
                        )}
                    </ChartV2Container>
                )}
            </ChartV2Fullscreen>
        </section>
    )
}

const LineWithOutageMarkerSection = () => {
    const [showChart, setShowChart] = useState(true)
    const chartRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">Line with outage marker</h3>
            <ChartV2Fullscreen>
                {({ isFullscreen, enterFullscreen, exitFullscreen }) => (
                    <ChartV2Container>
                        <ChartHeaderV2>
                            <div className="flex w-full items-center justify-between bg-gray-25 ">
                                <div className="text-sm font-medium text-gray-700">
                                    Line with outage marker
                                </div>
                                <div className="flex items-center gap-2">
                                    <ChevronsDownUp
                                        size={20}
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                        onClick={() =>
                                            setShowChart((prev) => !prev)
                                        }
                                    />
                                    <button
                                        type="button"
                                        aria-label={
                                            isFullscreen
                                                ? 'Exit fullscreen view'
                                                : 'Enter fullscreen view'
                                        }
                                        onClick={
                                            isFullscreen
                                                ? exitFullscreen
                                                : enterFullscreen
                                        }
                                        className="flex h-8 w-8 items-center justify-center "
                                    >
                                        <Expand
                                            size={18}
                                            color={
                                                FOUNDATION_THEME.colors
                                                    .gray[400]
                                            }
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        </ChartHeaderV2>
                        {showChart && (
                            <div className="pt-5 p-4 flex flex-col gap-6">
                                <ChartV2
                                    ref={chartRef}
                                    options={lineWithOutageMarkerOptions}
                                />
                            </div>
                        )}
                    </ChartV2Container>
                )}
            </ChartV2Fullscreen>
        </section>
    )
}

const DashboardSection = () => {
    const dashboardChartRef1 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef2 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef3 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef4 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef5 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef6 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef7 = useRef<ChartV2ReactRefObject>(null)
    const dashboardChartRef8 = useRef<ChartV2ReactRefObject>(null)

    const dashboardChartRefs = [
        dashboardChartRef1,
        dashboardChartRef2,
        dashboardChartRef3,
        dashboardChartRef4,
        dashboardChartRef5,
        dashboardChartRef6,
        dashboardChartRef7,
        dashboardChartRef8,
    ]

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">
                Dashboard (8 charts, shared legend)
            </h3>
            <ChartV2Container>
                <ChartHeaderV2>
                    <div className="flex w-full items-center justify-between bg-gray-25 p-4">
                        <div className="text-sm font-medium text-gray-700">
                            Chart Header Slot
                        </div>
                        <div className="flex gap-2">
                            <div className="text-sm font-medium text-gray-700">
                                Slot 1
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                                Slot 2
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                                Slot 3
                            </div>
                        </div>
                    </div>
                </ChartHeaderV2>
                <div className="p-4">
                    <ChartV2Legend
                        chartRefs={dashboardChartRefs}
                        customLegendItems={dashboardCustomLegendItems}
                        layout="horizontal"
                    />
                    <div
                        className="mt-4 grid grid-cols-4 gap-4"
                        style={{ minHeight: 280 }}
                    >
                        {DASHBOARD_CHART_TITLES.map((title, index) => (
                            <div key={title} className="space-y-2">
                                <div className="text-sm font-medium text-gray-700">
                                    {title}
                                </div>
                                <div style={{ height: 220 }}>
                                    <ChartV2
                                        ref={dashboardChartRefs[index]}
                                        options={dashboardChartOptions}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ChartV2Container>
        </section>
    )
}

const SkeletonSection = () => {
    const skeletonRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">Skeleton state</h3>
            <ChartV2Container>
                <ChartHeaderV2>
                    <div className="flex w-full items-center justify-between bg-gray-25 p-4">
                        <div className="text-sm font-medium text-gray-700">
                            Loading chart (skeleton)
                        </div>
                    </div>
                </ChartHeaderV2>
                <div className="p-4">
                    <ChartV2
                        ref={skeletonRef}
                        options={columnChartOptions}
                        skeleton={{
                            show: true,
                            variant: 'pulse',
                            height: 300,
                        }}
                    />
                </div>
            </ChartV2Container>
        </section>
    )
}

const NoDataSection = () => {
    const noDataRef = useRef<ChartV2ReactRefObject>(null)

    return (
        <section className="space-y-4">
            <h3 className="text-lg font-semibold">No data state</h3>
            <ChartV2Container>
                <ChartHeaderV2>
                    <div className="flex w-full items-center justify-between bg-gray-25 p-4">
                        <div className="text-sm font-medium text-gray-700">
                            Empty chart (no data)
                        </div>
                    </div>
                </ChartHeaderV2>
                <div className="p-4">
                    <ChartV2 ref={noDataRef} options={noDataChartOptions} />
                </div>
            </ChartV2Container>
        </section>
    )
}

const ChartV2Demo = () => {
    return (
        <div className="space-y-12 p-8">
            <h2 className="text-2xl font-bold">📊 ChartV2 Playground</h2>

            <ColumnChartSection />
            <LineChartSection />
            <AreaChartSection />
            <PieChartSection />
            <ScatterChartSection />
            <SankeyChartSection />
            <LineColumnChartSection />
            <LineWithOutageMarkerSection />
            <DashboardSection />
            <SkeletonSection />
            <NoDataSection />
        </div>
    )
}

export default ChartV2Demo
