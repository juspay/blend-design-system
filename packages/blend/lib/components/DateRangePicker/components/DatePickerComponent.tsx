import React from 'react'
import { generatePickerData, createSelectionHandler } from '../utils'
import { FOUNDATION_THEME } from '../../../tokens'
import { CalendarTokenType } from '../dateRangePicker.tokens'
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
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import ScrollablePicker from './ScrollablePicker'
import type { DatePickerComponentProps } from '../types'

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
}) => {
    const responsiveTokens = useResponsiveTokens<CalendarTokenType>('CALENDAR')
    const tokens = responsiveTokens

    const renderTabContent = (tabType: 'start' | 'end') => {
        const data = generatePickerData(
            tabType,
            selectedRange,
            startTime,
            endTime
        )

        return (
            <Block>
                <Block
                    display="flex"
                    paddingX={tokens.mobileDrawer.datePicker.container.padding}
                    width="100%"
                    gap={tokens.mobileDrawer.datePicker.container.gap}
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
                            zIndex={tokens.mobileDrawer.header.zIndex}
                            backgroundColor={
                                tokens.mobileDrawer.header.backgroundColor
                            }
                            paddingBottom={tokens.mobileDrawer.header.padding}
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PrimitiveText
                                fontSize={
                                    tokens.mobileDrawer.header.text.fontSize
                                }
                                fontWeight={
                                    tokens.mobileDrawer.header.text.fontWeight
                                }
                                color={tokens.mobileDrawer.header.text.color}
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
                                selectedRange,
                                dateFormat,
                                handleStartTimeChange,
                                handleEndTimeChange,
                                setSelectedRange,
                                setStartDate,
                                setEndDate
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
                            backgroundColor="white"
                            paddingBottom="12px"
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PrimitiveText
                                fontSize={
                                    FOUNDATION_THEME.font.size.body.md.fontSize
                                }
                                fontWeight={400}
                                color={FOUNDATION_THEME.colors.gray[500]}
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
                                selectedRange,
                                dateFormat,
                                handleStartTimeChange,
                                handleEndTimeChange,
                                setSelectedRange,
                                setStartDate,
                                setEndDate
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
                            backgroundColor="white"
                            paddingBottom="12px"
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PrimitiveText
                                fontSize={
                                    FOUNDATION_THEME.font.size.body.md.fontSize
                                }
                                fontWeight={400}
                                color={FOUNDATION_THEME.colors.gray[500]}
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
                                selectedRange,
                                dateFormat,
                                handleStartTimeChange,
                                handleEndTimeChange,
                                setSelectedRange,
                                setStartDate,
                                setEndDate
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
                            backgroundColor="white"
                            paddingBottom="12px"
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <PrimitiveText
                                fontSize={
                                    FOUNDATION_THEME.font.size.body.md.fontSize
                                }
                                fontWeight={400}
                                color={FOUNDATION_THEME.colors.gray[500]}
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
                                selectedRange,
                                dateFormat,
                                handleStartTimeChange,
                                handleEndTimeChange,
                                setSelectedRange,
                                setStartDate,
                                setEndDate
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
