import { useState } from 'react'
import { Settings, Star } from 'lucide-react'
import { TextInput } from '../../../../packages/blend/lib/main'
import SingleSelect from '../../../../packages/blend/lib/components/SingleSelect/SingleSelect'
import Switch from '../../../../packages/blend/lib/components/Switch/Switch'
import { StatCardV2 } from '../../../../packages/blend/lib/components/StatCardV2'
import {
    StatCardV2ArrowDirection,
    StatCardV2ChangeType,
    StatCardV2Variant,
} from '../../../../packages/blend/lib/components/StatCardV2/statcardV2.types'

const statCardVariantOptions = [
    { value: StatCardV2Variant.NUMBER, label: 'Number' },
    { value: StatCardV2Variant.CHART, label: 'Chart' },
    { value: StatCardV2Variant.PROGRESS_BAR, label: 'Progress Bar' },
]

const StatCardV2Demo = () => {
    const [title, setTitle] = useState('Approval rate')
    const [subtitle, setSubtitle] = useState('Last 24 hours')
    const [helpText, setHelpText] = useState(
        'Overall approval rate across all products.'
    )
    const [value, setValue] = useState('83.24%')
    const [changeValue, setChangeValue] = useState('10.00')
    const [changeLeftSymbol, setChangeLeftSymbol] = useState('+')
    const [changeRightSymbol, setChangeRightSymbol] = useState('%')
    const [changeType, setChangeType] = useState<StatCardV2ChangeType>(
        StatCardV2ChangeType.INCREASE
    )
    const [arrowDirection, setArrowDirection] =
        useState<StatCardV2ArrowDirection>(StatCardV2ArrowDirection.UP)
    const [variant, setVariant] = useState<StatCardV2Variant>(
        StatCardV2Variant.NUMBER
    )
    const [showTitleIcon, setShowTitleIcon] = useState(true)
    const [showActionIcon, setShowActionIcon] = useState(true)
    const [showHelpText, setShowHelpText] = useState(true)
    const [showSkeleton, setShowSkeleton] = useState(false)
    const [chartType, setChartType] = useState<'column' | 'line' | 'area'>(
        'column'
    )

    return (
        <div
            style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            }}
        >
            <div
                style={{
                    marginBottom: '8px',
                    fontSize: '20px',
                    fontWeight: 600,
                }}
            >
                StatCardV2 Playground
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'flex-start',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        flex: '0 0 380px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '16px',
                        }}
                    >
                        <TextInput
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                        />
                        <TextInput
                            label="Subtitle"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            placeholder="Enter subtitle"
                        />
                        <TextInput
                            label="Help text"
                            value={helpText}
                            onChange={(e) => setHelpText(e.target.value)}
                            placeholder="Enter help text"
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '16px',
                        }}
                    >
                        <TextInput
                            label="Value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter value"
                        />
                        <TextInput
                            label="Change value"
                            value={changeValue}
                            onChange={(e) => setChangeValue(e.target.value)}
                            placeholder="10.00"
                        />
                        <TextInput
                            label="Left symbol"
                            value={changeLeftSymbol}
                            onChange={(e) =>
                                setChangeLeftSymbol(e.target.value)
                            }
                            placeholder="+"
                        />
                        <TextInput
                            label="Right symbol"
                            value={changeRightSymbol}
                            onChange={(e) =>
                                setChangeRightSymbol(e.target.value)
                            }
                            placeholder="%"
                        />
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '16px',
                        }}
                    >
                        <SingleSelect
                            label="Variant"
                            placeholder="Select Variant"
                            items={[{ items: statCardVariantOptions }]}
                            selected={variant}
                            onSelect={(val) =>
                                setVariant(val as StatCardV2Variant)
                            }
                        />
                        <SingleSelect
                            label="Change Type"
                            placeholder="Select change type"
                            items={[
                                {
                                    items: [
                                        {
                                            value: StatCardV2ChangeType.INCREASE,
                                            label: 'Increase',
                                        },
                                        {
                                            value: StatCardV2ChangeType.DECREASE,
                                            label: 'Decrease',
                                        },
                                    ],
                                },
                            ]}
                            selected={changeType}
                            onSelect={(val) =>
                                setChangeType(val as StatCardV2ChangeType)
                            }
                        />
                        <SingleSelect
                            label="Arrow Direction"
                            placeholder="Select arrow direction"
                            items={[
                                {
                                    items: [
                                        {
                                            value: StatCardV2ArrowDirection.UP,
                                            label: 'Up',
                                        },
                                        {
                                            value: StatCardV2ArrowDirection.DOWN,
                                            label: 'Down',
                                        },
                                    ],
                                },
                            ]}
                            selected={arrowDirection}
                            onSelect={(val) =>
                                setArrowDirection(
                                    val as StatCardV2ArrowDirection
                                )
                            }
                        />
                        {variant === StatCardV2Variant.CHART && (
                            <SingleSelect
                                label="Chart type"
                                placeholder="Select chart type"
                                items={[
                                    {
                                        items: [
                                            {
                                                value: 'column',
                                                label: 'Column',
                                            },
                                            { value: 'line', label: 'Line' },
                                            { value: 'area', label: 'Area' },
                                        ],
                                    },
                                ]}
                                selected={chartType}
                                onSelect={(val) =>
                                    setChartType(
                                        val as 'column' | 'line' | 'area'
                                    )
                                }
                            />
                        )}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '16px',
                        }}
                    >
                        <Switch
                            label="Show title icon"
                            checked={showTitleIcon}
                            onChange={() => setShowTitleIcon((prev) => !prev)}
                        />
                        <Switch
                            label="Show action icon"
                            checked={showActionIcon}
                            onChange={() => setShowActionIcon((prev) => !prev)}
                        />
                        <Switch
                            label="Show help text"
                            checked={showHelpText}
                            onChange={() => setShowHelpText((prev) => !prev)}
                        />
                        <Switch
                            label="Show skeleton"
                            checked={showSkeleton}
                            onChange={() => setShowSkeleton((prev) => !prev)}
                        />
                    </div>
                </div>

                <div
                    style={{
                        flex: 1,
                        padding: '24px',
                        border: '1px dashed #E5E7EB',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '350px',
                    }}
                >
                    <StatCardV2
                        title={title}
                        subtitle={subtitle}
                        titleIcon={
                            showTitleIcon ? <Star size={16} /> : undefined
                        }
                        actionIcon={
                            showActionIcon ? <Settings size={16} /> : undefined
                        }
                        helpIconText={showHelpText ? helpText : undefined}
                        value={value}
                        change={{
                            value: changeValue,
                            changeType,
                            arrowDirection,
                            leftSymbol: changeLeftSymbol,
                            rightSymbol: changeRightSymbol,
                            tooltip: 'Change tooltip',
                        }}
                        progressValue={
                            variant === StatCardV2Variant.PROGRESS_BAR
                                ? Number.parseFloat(value) || 0
                                : undefined
                        }
                        variant={variant}
                        skeleton={
                            showSkeleton
                                ? {
                                      show: true,
                                      variant: 'pulse',
                                  }
                                : undefined
                        }
                        options={
                            variant === StatCardV2Variant.CHART
                                ? {
                                      tooltip: {
                                          backgroundColor: '#181B25',
                                          borderColor: '#181B25',
                                          borderRadius: 8,
                                          shadow: false,
                                          useHTML: true,
                                          style: {
                                              color: '#FFFFFF',
                                              fontSize: '10px',
                                              fontWeight: '500',
                                              lineHeight: '14px',
                                          },
                                          pointFormat:
                                              'Value: <b>{point.y}%</b>',
                                      },
                                      series: [
                                          {
                                              data: [
                                                  9, 11, 13, 10, 12, 15, 18, 17,
                                                  19, 21, 22,
                                              ],
                                              type: chartType,
                                              color: '#00A63E',
                                          },
                                      ],
                                  }
                                : undefined
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default StatCardV2Demo
