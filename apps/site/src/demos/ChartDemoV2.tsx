import {
    BlendChart,
    BlendChartContainer,
    BlendChartHeader,
    FOUNDATION_THEME,
    SelectMenuSize,
    SelectMenuVariant,
    SingleSelect,
} from '../../../../packages/blend/lib/main'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import { EllipsisVerticalIcon } from 'lucide-react'
import { last7daysHourlyData, last7daysHourlyData2 } from './ChartV2Data'
import { useState } from 'react'

const ChartDemoV2 = () => {
    const chartType = ['column', 'line', 'area', 'pie']
    const [selectedChartType, setSelectedChartType] = useState('column')

    return (
        <div className="p-8 gap-8 flex flex-col">
            <div className="flex flex-col gap-4">
                <p className="text-2xl font-bold"> Last 7 days hourly data</p>
                <SingleSelect
                    placeholder="Select a chart type"
                    items={chartType.map((type) => ({
                        items: [{ label: type, value: type }],
                    }))}
                    selected={selectedChartType}
                    onSelect={(value) => {
                        setSelectedChartType(value)
                    }}
                    size={SelectMenuSize.SMALL}
                    variant={SelectMenuVariant.NO_CONTAINER}
                />
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
                                        color={
                                            FOUNDATION_THEME.colors.gray[400]
                                        }
                                    />
                                </Block>
                            </Block>
                        </Block>
                    </BlendChartHeader>

                    {/* Body */}
                    <BlendChart
                        options={{
                            xAxis: {
                                type: 'datetime',
                                title: {
                                    text: 'Time',
                                },
                            },
                            yAxis: {
                                title: {
                                    text: 'Value',
                                },
                            },
                            series: [
                                {
                                    name: 'Overall',
                                    type: selectedChartType,
                                    data: last7daysHourlyData,
                                    color: FOUNDATION_THEME.colors.primary[500],
                                    marker: {
                                        enabled: false,
                                    },
                                },
                                {
                                    name: 'goindigo',
                                    type: selectedChartType,
                                    data: last7daysHourlyData2,
                                    color: FOUNDATION_THEME.colors.red[500],
                                    marker: {
                                        enabled: false,
                                    },
                                },
                            ],
                        }}
                    />
                </BlendChartContainer>
            </div>
        </div>
    )
}

export default ChartDemoV2
