import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { DateRange, DateRangePreset } from './types'
import { formatDate, getPresetLabel, getMonthName } from './utils'
import { FOUNDATION_THEME } from '../../tokens'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { ButtonType, ButtonSize, Button } from '../../main'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
} from '../Drawer'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsVariant,
    TabsSize,
} from '../Tabs'
import Text from '../Text/Text'

type MobileDrawerPresetsProps = {
    drawerOpen: boolean
    setDrawerOpen: (open: boolean) => void
    renderTrigger: () => React.ReactNode
    showPresets: boolean
    availablePresets: DateRangePreset[]
    activePreset: DateRangePreset
    selectedRange: DateRange
    startTime: string
    endTime: string
    dateFormat: string
    handlePresetSelect: (preset: DateRangePreset) => void
    handleStartTimeChange: (time: string) => void
    handleEndTimeChange: (time: string) => void
    setSelectedRange: (range: DateRange) => void
    setStartDate: (date: string) => void
    setEndDate: (date: string) => void
    handleCancel: () => void
    handleApply: () => void
    showCustomDropdownOnly?: boolean
}

const MobileDrawerPresets: React.FC<MobileDrawerPresetsProps> = ({
    drawerOpen,
    setDrawerOpen,
    renderTrigger,
    showPresets,
    availablePresets,
    activePreset,
    selectedRange,
    startTime,
    endTime,
    dateFormat,
    handlePresetSelect,
    handleStartTimeChange,
    handleEndTimeChange,
    setSelectedRange,
    setStartDate,
    setEndDate,
    handleCancel,
    handleApply,
    showCustomDropdownOnly = false,
}) => {
    const [isCustomExpanded, setIsCustomExpanded] = useState(
        showCustomDropdownOnly
    )
    const [_activeTab, setActiveTab] = useState('start')

    const renderTabContent = (tabType: 'start' | 'end') => {
        const targetDate =
            tabType === 'start'
                ? selectedRange.startDate
                : selectedRange.endDate
        const targetTime = tabType === 'start' ? startTime : endTime

        const selectedYear = targetDate.getFullYear()
        const selectedMonth = targetDate.getMonth()
        const selectedDate = targetDate.getDate()

        const currentYear = new Date().getFullYear()
        const allYears = Array.from(
            { length: currentYear + 5 - 2012 + 1 },
            (_, i) => 2012 + i
        )
        const allMonths = Array.from({ length: 12 }, (_, i) => i)
        const daysInCurrentMonth = new Date(
            selectedYear,
            selectedMonth + 1,
            0
        ).getDate()
        const allDates = Array.from(
            { length: daysInCurrentMonth },
            (_, i) => i + 1
        )

        const generateTimeOptions = () => {
            const times = []
            for (let h = 0; h < 24; h++) {
                for (let m = 0; m < 60; m += 15) {
                    const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
                    times.push(timeStr)
                }
            }
            return times
        }

        const allTimes = generateTimeOptions()

        const yearIndex = allYears.indexOf(selectedYear)
        const monthIndex = selectedMonth
        const dateIndex = allDates.indexOf(selectedDate)
        const timeIndex =
            allTimes.indexOf(targetTime) !== -1
                ? allTimes.indexOf(targetTime)
                : 0

        const getVisibleItems = (
            items: (string | number)[],
            currentIndex: number
        ) => {
            const prevIndex = Math.max(0, currentIndex - 1)
            const nextIndex = Math.min(items.length - 1, currentIndex + 1)
            return [items[prevIndex], items[currentIndex], items[nextIndex]]
        }

        const visibleYears = getVisibleItems(allYears, yearIndex)
        const visibleMonths = getVisibleItems(
            allMonths.map((m) => getMonthName(m).slice(0, 3)),
            monthIndex
        )
        const visibleDates = getVisibleItems(allDates, dateIndex)
        const visibleTimes = getVisibleItems(allTimes, timeIndex)

        const renderColumn = (
            items: (string | number)[],
            selectedItem: string | number,
            onSelect: (item: string | number) => void,
            isTimeColumn: boolean = false
        ) => (
            <Block
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={12}
            >
                {items.map((item, index) => {
                    const isSelected = index === 1
                    const isAdjacent = index === 0 || index === 2
                    const uniqueKey = `${tabType}-${isTimeColumn ? 'time' : 'item'}-${index}-${item}`

                    if (isTimeColumn && isSelected) {
                        return (
                            <PrimitiveText
                                key={uniqueKey}
                                fontSize={14}
                                fontWeight={600}
                                color={FOUNDATION_THEME.colors.gray[900]}
                                style={{
                                    cursor: 'text',
                                    textAlign: 'center',
                                    minHeight: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none',
                                    outline: 'none',
                                    background: 'transparent',
                                    width: '60px',
                                }}
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => {
                                    const newValue =
                                        e.currentTarget.textContent ||
                                        String(selectedItem)
                                    onSelect(newValue)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        e.currentTarget.blur()
                                    }
                                }}
                            >
                                {String(selectedItem)}
                            </PrimitiveText>
                        )
                    }

                    return (
                        <React.Fragment key={uniqueKey}>
                            <PrimitiveText
                                fontSize={14}
                                fontWeight={isSelected ? 600 : 300}
                                color={
                                    isSelected
                                        ? FOUNDATION_THEME.colors.gray[900]
                                        : FOUNDATION_THEME.colors.gray[400]
                                }
                                style={{
                                    opacity: isSelected
                                        ? 1
                                        : isAdjacent
                                          ? 0.6
                                          : 0.3,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textAlign: 'center',
                                    minHeight: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onClick={() => onSelect(item)}
                            >
                                {item}
                            </PrimitiveText>
                            {index < items.length - 1 && index === 0 && (
                                <Block
                                    width="100%"
                                    height="1px"
                                    backgroundColor={
                                        FOUNDATION_THEME.colors.gray[200]
                                    }
                                    margin="8px 0"
                                />
                            )}
                            {index === items.length - 2 && (
                                <Block
                                    width="100%"
                                    height="1px"
                                    backgroundColor={
                                        FOUNDATION_THEME.colors.gray[200]
                                    }
                                    margin="8px 0"
                                />
                            )}
                        </React.Fragment>
                    )
                })}
            </Block>
        )

        const handleYearSelect = (year: string | number) => {
            const newDate = new Date(targetDate)
            newDate.setFullYear(Number(year))

            if (tabType === 'start') {
                setSelectedRange({ ...selectedRange, startDate: newDate })
                setStartDate(formatDate(newDate, dateFormat))
            } else {
                setSelectedRange({ ...selectedRange, endDate: newDate })
                setEndDate(formatDate(newDate, dateFormat))
            }
        }

        const handleMonthSelect = (month: string | number) => {
            const monthNames = [
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
            const monthIndex = monthNames.indexOf(String(month))
            if (monthIndex !== -1) {
                const newDate = new Date(targetDate)
                newDate.setMonth(monthIndex)

                if (tabType === 'start') {
                    setSelectedRange({ ...selectedRange, startDate: newDate })
                    setStartDate(formatDate(newDate, dateFormat))
                } else {
                    setSelectedRange({ ...selectedRange, endDate: newDate })
                    setEndDate(formatDate(newDate, dateFormat))
                }
            }
        }

        const handleDateSelect = (date: string | number) => {
            const newDate = new Date(targetDate)
            newDate.setDate(Number(date))

            if (tabType === 'start') {
                setSelectedRange({ ...selectedRange, startDate: newDate })
                setStartDate(formatDate(newDate, dateFormat))
            } else {
                setSelectedRange({ ...selectedRange, endDate: newDate })
                setEndDate(formatDate(newDate, dateFormat))
            }
        }

        const handleTimeChange = (time: string) => {
            if (tabType === 'start') {
                handleStartTimeChange(time)
            } else {
                handleEndTimeChange(time)
            }
        }

        const handleTimeSelect = (item: string | number) => {
            handleTimeChange(String(item))
        }

        return (
            <Block marginTop={24}>
                <Block
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    padding="16px"
                    width="100%"
                >
                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        flexGrow={1}
                    >
                        <PrimitiveText
                            fontSize={14}
                            fontWeight={500}
                            color={FOUNDATION_THEME.colors.gray[600]}
                            margin="0 0 16px 0"
                        >
                            Year
                        </PrimitiveText>
                        {renderColumn(
                            visibleYears,
                            selectedYear,
                            handleYearSelect
                        )}
                    </Block>

                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        flexGrow={1}
                    >
                        <PrimitiveText
                            fontSize={14}
                            fontWeight={500}
                            color={FOUNDATION_THEME.colors.gray[600]}
                            margin="0 0 16px 0"
                        >
                            Month
                        </PrimitiveText>
                        {renderColumn(
                            visibleMonths,
                            getMonthName(selectedMonth).slice(0, 3),
                            handleMonthSelect
                        )}
                    </Block>

                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        flexGrow={1}
                    >
                        <PrimitiveText
                            fontSize={14}
                            fontWeight={500}
                            color={FOUNDATION_THEME.colors.gray[600]}
                            margin="0 0 16px 0"
                        >
                            Date
                        </PrimitiveText>
                        {renderColumn(
                            visibleDates,
                            selectedDate,
                            handleDateSelect
                        )}
                    </Block>

                    <Block
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        flexGrow={1}
                    >
                        <PrimitiveText
                            fontSize={14}
                            fontWeight={500}
                            color={FOUNDATION_THEME.colors.gray[600]}
                            margin="0 0 16px 0"
                        >
                            Time
                        </PrimitiveText>
                        {renderColumn(
                            visibleTimes,
                            targetTime,
                            handleTimeSelect,
                            true
                        )}
                    </Block>
                </Block>
            </Block>
        )
    }

    const renderCustomDateInputs = () => (
        <Block marginTop={16}>
            <Tabs
                defaultValue="start"
                onValueChange={setActiveTab}
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

                <TabsContent value="start">
                    {renderTabContent('start')}
                </TabsContent>

                <TabsContent value="end">{renderTabContent('end')}</TabsContent>
            </Tabs>
        </Block>
    )

    return (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger onClick={() => setDrawerOpen(true)}>
                {renderTrigger()}
            </DrawerTrigger>

            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody noPadding>
                        <Block display="flex" flexDirection="column" gap={0}>
                            {showCustomDropdownOnly ? (
                                <Block width={'100%'}>
                                    {renderCustomDateInputs()}
                                </Block>
                            ) : (
                                showPresets && (
                                    <Block>
                                        {availablePresets.map((preset) => (
                                            <Block
                                                key={preset}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                padding="16px 20px"
                                                borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
                                                cursor="pointer"
                                                backgroundColor="transparent"
                                                _hover={{
                                                    backgroundColor:
                                                        FOUNDATION_THEME.colors
                                                            .gray[50],
                                                }}
                                                onClick={() => {
                                                    if (
                                                        preset ===
                                                        DateRangePreset.CUSTOM
                                                    ) {
                                                        setIsCustomExpanded(
                                                            !isCustomExpanded
                                                        )
                                                        handlePresetSelect(
                                                            preset
                                                        )
                                                    } else {
                                                        handlePresetSelect(
                                                            preset
                                                        )
                                                        setDrawerOpen(false)
                                                    }
                                                }}
                                            >
                                                <Text
                                                    variant="body.md"
                                                    fontWeight={
                                                        activePreset === preset
                                                            ? 600
                                                            : 500
                                                    }
                                                    color={
                                                        activePreset === preset
                                                            ? FOUNDATION_THEME
                                                                  .colors
                                                                  .gray[700]
                                                            : FOUNDATION_THEME
                                                                  .colors
                                                                  .gray[600]
                                                    }
                                                >
                                                    {preset ===
                                                    DateRangePreset.LAST_1_HOUR
                                                        ? 'Last 6 hours'
                                                        : preset ===
                                                            DateRangePreset.LAST_6_HOURS
                                                          ? 'Last 6 hours'
                                                          : preset ===
                                                              DateRangePreset.LAST_7_DAYS
                                                            ? 'Last 2 Days'
                                                            : getPresetLabel(
                                                                  preset
                                                              )}
                                                </Text>
                                                {activePreset === preset &&
                                                    preset !==
                                                        DateRangePreset.CUSTOM && (
                                                        <Block
                                                            width="20px"
                                                            height="20px"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                        >
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M13.5 4.5L6 12L2.5 8.5"
                                                                    stroke={
                                                                        FOUNDATION_THEME
                                                                            .colors
                                                                            .gray[700]
                                                                    }
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </Block>
                                                    )}
                                                {preset ===
                                                    DateRangePreset.CUSTOM &&
                                                    isCustomExpanded && (
                                                        <Block
                                                            width="20px"
                                                            height="20px"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                        >
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M13.5 4.5L6 12L2.5 8.5"
                                                                    stroke={
                                                                        FOUNDATION_THEME
                                                                            .colors
                                                                            .gray[700]
                                                                    }
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </Block>
                                                    )}
                                                {preset ===
                                                    DateRangePreset.CUSTOM &&
                                                    !isCustomExpanded && (
                                                        <ChevronDown
                                                            size={16}
                                                            color={
                                                                FOUNDATION_THEME
                                                                    .colors
                                                                    .gray[500]
                                                            }
                                                        />
                                                    )}
                                            </Block>
                                        ))}

                                        {isCustomExpanded && (
                                            <Block padding="0 16px">
                                                {renderCustomDateInputs()}
                                            </Block>
                                        )}
                                    </Block>
                                )
                            )}

                            {isCustomExpanded && (
                                <Block
                                    display="flex"
                                    gap={16}
                                    padding="16px"
                                    marginTop={24}
                                    borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                >
                                    <Block flexGrow={1}>
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.MEDIUM}
                                            fullWidth={true}
                                            onClick={() => {
                                                handleCancel()
                                                setDrawerOpen(false)
                                            }}
                                            text="Cancel"
                                        />
                                    </Block>
                                    <Block flexGrow={1}>
                                        <Button
                                            buttonType={ButtonType.PRIMARY}
                                            size={ButtonSize.MEDIUM}
                                            fullWidth={true}
                                            onClick={handleApply}
                                            text="Apply Date"
                                        />
                                    </Block>
                                </Block>
                            )}

                            {showCustomDropdownOnly && (
                                <Block
                                    display="flex"
                                    gap={16}
                                    padding="16px"
                                    marginTop={24}
                                    borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                                >
                                    <Block flexGrow={1}>
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            size={ButtonSize.MEDIUM}
                                            fullWidth={true}
                                            onClick={() => {
                                                handleCancel()
                                                setDrawerOpen(false)
                                            }}
                                            text="Cancel"
                                        />
                                    </Block>
                                    <Block flexGrow={1}>
                                        <Button
                                            buttonType={ButtonType.PRIMARY}
                                            size={ButtonSize.MEDIUM}
                                            fullWidth={true}
                                            onClick={handleApply}
                                            text="Apply Date"
                                        />
                                    </Block>
                                </Block>
                            )}
                        </Block>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export default MobileDrawerPresets
