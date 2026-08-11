import React from 'react'
import { generatePickerData, createSelectionHandler } from '../utils'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import {
    TabsV2,
    TabsV2List,
    TabsV2Trigger,
    TabsV2Content,
    TabsV2Variant,
    TabsV2Size,
} from '../../TabsV2'
import ScrollablePicker from './ScrollablePicker'
import type { DatePickerComponentProps } from '../types'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { getMobileToken } from './mobile.tokens'
import { useTheme } from '../../../context'

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
    selectedRange,
    startTime,
    endTime,
    dateFormat,
    handleStartTimeChange,
    handleEndTimeChange,
    setSelectedRange,
    setStartDate,
    setEndDate,
    isDisabled = false,
    maxYearOffset,
}) => {
    const { innerWidth } = useBreakpoints()
    const { foundationTokens, theme } = useTheme()
    const tokens = getMobileToken(foundationTokens, theme)[
        innerWidth >= 1024 ? 'lg' : 'sm'
    ]

    const renderTabContent = (tabType: 'start' | 'end') => {
        const data = generatePickerData(
            tabType,
            selectedRange,
            startTime,
            endTime,
            maxYearOffset
        )

        return (
            <Block>
                <Block
                    display="flex"
                    paddingX={tokens.padding.x}
                    paddingY={tokens.padding.y}
                    gap={tokens.gap}
                >
                    <Block
                        flexGrow={1}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Block
                            position="sticky"
                            top="0"
                            zIndex={5}
                            backgroundColor={tokens.header.backgroundColor}
                            paddingX={tokens.header.padding.x}
                            paddingY={tokens.header.padding.y}
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PrimitiveText
                                fontSize={tokens.header.text.fontSize}
                                fontWeight={tokens.header.text.fontWeight}
                                color={tokens.header.text.color}
                            >
                                Year
                            </PrimitiveText>
                        </Block>
                        <ScrollablePicker
                            items={data.years.items}
                            selectedIndex={data.years.selectedIndex}
                            onSelect={createSelectionHandler(
                                tabType,
                                'year',
                                dateFormat,
                                handleStartTimeChange,
                                handleEndTimeChange,
                                setSelectedRange,
                                setStartDate,
                                setEndDate,
                                selectedRange,
                                maxYearOffset
                            )}
                            columnId={`${tabType}-year`}
                            isDisabled={isDisabled}
                        />
                    </Block>

                    <Block
                        flexGrow={1}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Block
                            position="sticky"
                            top="0"
                            zIndex={5}
                            backgroundColor={tokens.header.backgroundColor}
                            paddingX={tokens.header.padding.x}
                            paddingY={tokens.header.padding.y}
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PrimitiveText
                                fontSize={tokens.header.text.fontSize}
                                fontWeight={tokens.header.text.fontWeight}
                                color={tokens.header.text.color}
                            >
                                Month
                            </PrimitiveText>
                        </Block>
                        <ScrollablePicker
                            items={data.months.items}
                            selectedIndex={data.months.selectedIndex}
                            onSelect={createSelectionHandler(
                                tabType,
                                'month',
                                dateFormat,
                                handleStartTimeChange,
                                handleEndTimeChange,
                                setSelectedRange,
                                setStartDate,
                                setEndDate,
                                selectedRange,
                                maxYearOffset
                            )}
                            columnId={`${tabType}-month`}
                            isDisabled={isDisabled}
                        />
                    </Block>

                    <Block
                        flexGrow={1}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Block
                            position="sticky"
                            top="0"
                            zIndex={5}
                            backgroundColor={tokens.header.backgroundColor}
                            paddingX={tokens.header.padding.x}
                            paddingY={tokens.header.padding.y}
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PrimitiveText
                                fontSize={tokens.header.text.fontSize}
                                fontWeight={tokens.header.text.fontWeight}
                                color={tokens.header.text.color}
                            >
                                Date
                            </PrimitiveText>
                        </Block>
                        <ScrollablePicker
                            items={data.dates.items}
                            selectedIndex={data.dates.selectedIndex}
                            onSelect={createSelectionHandler(
                                tabType,
                                'date',
                                dateFormat,
                                handleStartTimeChange,
                                handleEndTimeChange,
                                setSelectedRange,
                                setStartDate,
                                setEndDate,
                                selectedRange,
                                maxYearOffset
                            )}
                            columnId={`${tabType}-date`}
                            isDisabled={isDisabled}
                        />
                    </Block>

                    <Block
                        flexGrow={1}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Block
                            position="sticky"
                            top="0"
                            zIndex={5}
                            backgroundColor={tokens.header.backgroundColor}
                            paddingX={tokens.header.padding.x}
                            paddingY={tokens.header.padding.y}
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PrimitiveText
                                fontSize={tokens.header.text.fontSize}
                                fontWeight={tokens.header.text.fontWeight}
                                color={tokens.header.text.color}
                            >
                                Time
                            </PrimitiveText>
                        </Block>
                        <ScrollablePicker
                            items={data.times.items}
                            selectedIndex={data.times.selectedIndex}
                            onSelect={createSelectionHandler(
                                tabType,
                                'time',
                                dateFormat,
                                handleStartTimeChange,
                                handleEndTimeChange,
                                setSelectedRange,
                                setStartDate,
                                setEndDate,
                                selectedRange,
                                maxYearOffset
                            )}
                            isTimeColumn={true}
                            columnId={`${tabType}-time`}
                            isDisabled={isDisabled}
                        />
                    </Block>
                </Block>
            </Block>
        )
    }

    return (
        <Block
            marginTop={16}
            paddingX={20}
            paddingBottom={24}
            style={{
                opacity: isDisabled ? 0.5 : 1,
                pointerEvents: isDisabled ? 'none' : 'auto',
            }}
        >
            <TabsV2
                defaultValue="start"
                variant={TabsV2Variant.BOXED}
                size={TabsV2Size.MD}
            >
                <TabsV2List
                    variant={TabsV2Variant.BOXED}
                    size={TabsV2Size.MD}
                    expanded={true}
                >
                    <TabsV2Trigger
                        value="start"
                        variant={TabsV2Variant.BOXED}
                        size={TabsV2Size.MD}
                    >
                        Start Date
                    </TabsV2Trigger>
                    <TabsV2Trigger
                        value="end"
                        variant={TabsV2Variant.BOXED}
                        size={TabsV2Size.MD}
                    >
                        End Date
                    </TabsV2Trigger>
                </TabsV2List>

                <Block marginTop={32}>
                    <TabsV2Content value="start">
                        {renderTabContent('start')}
                    </TabsV2Content>
                    <TabsV2Content value="end">
                        {renderTabContent('end')}
                    </TabsV2Content>
                </Block>
            </TabsV2>
        </Block>
    )
}

export default DatePickerComponent
