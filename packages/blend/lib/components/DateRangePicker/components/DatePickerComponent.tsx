import React from 'react'
import { generatePickerData, createSelectionHandler } from '../utils'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsVariant,
    TabsSize,
} from '../../Tabs'
import ScrollablePicker from './ScrollablePicker'
import type { DatePickerComponentProps } from '../types'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { getMobileToken } from './mobile.tokens'
import { FOUNDATION_THEME } from '../../../tokens'

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
    const tokens =
        getMobileToken(FOUNDATION_THEME)[innerWidth >= 1024 ? 'lg' : 'sm']

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
            <Tabs
                defaultValue="start"
                variant={TabsVariant.BOXED}
                size={TabsSize.MD}
            >
                <TabsList
                    variant={TabsVariant.BOXED}
                    size={TabsSize.MD}
                    expanded={true}
                >
                    <TabsTrigger
                        value="start"
                        variant={TabsVariant.BOXED}
                        size={TabsSize.MD}
                    >
                        Start Date
                    </TabsTrigger>
                    <TabsTrigger
                        value="end"
                        variant={TabsVariant.BOXED}
                        size={TabsSize.MD}
                    >
                        End Date
                    </TabsTrigger>
                </TabsList>

                <Block marginTop={32}>
                    <TabsContent value="start">
                        {renderTabContent('start')}
                    </TabsContent>
                    <TabsContent value="end">
                        {renderTabContent('end')}
                    </TabsContent>
                </Block>
            </Tabs>
        </Block>
    )
}

export default DatePickerComponent
