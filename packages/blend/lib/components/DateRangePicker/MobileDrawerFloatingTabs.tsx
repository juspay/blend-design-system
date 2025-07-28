import React from 'react'
import { DateValidationResult, formatDate } from './utils'
import { SwitchSize } from '../Switch/types'
import { Switch } from '../Switch/Switch'
import { FOUNDATION_THEME } from '../../tokens'
import Block from '../Primitives/Block/Block'
import { TextInput } from '../Inputs/TextInput'
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

import { DateRange } from './types'

type MobileDrawerFloatingTabsProps = {
    drawerOpen: boolean
    setDrawerOpen: (open: boolean) => void
    renderTrigger: () => React.ReactNode
    selectedRange: DateRange
    startTime: string
    endTime: string
    dateFormat: string
    showTimePickerState: boolean
    setShowTimePickerState: (show: boolean) => void
    setActiveTab: (tab: string) => void
    startDateValidation: DateValidationResult
    endDateValidation: DateValidationResult
    handleStartTimeChangeCallback: (time: string) => void
    handleEndTimeChangeCallback: (time: string) => void
    setSelectedRange: (range: DateRange) => void
    setStartDate: (date: string) => void
    setEndDate: (date: string) => void
    handleCancel: () => void
    handleApply: () => void
}

const MobileDrawerFloatingTabs: React.FC<MobileDrawerFloatingTabsProps> = ({
    drawerOpen,
    setDrawerOpen,
    renderTrigger,
    selectedRange,
    startTime,
    endTime,
    dateFormat,
    showTimePickerState,
    setShowTimePickerState,
    setActiveTab,
    handleStartTimeChangeCallback,
    handleEndTimeChangeCallback,
    setSelectedRange,
    setStartDate,
    setEndDate,
    handleCancel,
    handleApply,
}) => {
    const renderTabContent = (tabType: 'start' | 'end') => (
        <Block marginTop={24}>
            <Block
                display="flex"
                justifyContent="space-between"
                marginBottom={16}
                padding="12px 16px"
                backgroundColor={FOUNDATION_THEME.colors.gray[50]}
                borderRadius={FOUNDATION_THEME.border.radius[8]}
            >
                <PrimitiveText
                    fontSize={14}
                    fontWeight={600}
                    color={FOUNDATION_THEME.colors.gray[700]}
                >
                    {tabType === 'start'
                        ? 'Start Date & Time'
                        : 'End Date & Time'}
                </PrimitiveText>
            </Block>

            {/* Header Row */}
            <Block
                display="grid"
                gap={8}
                marginBottom={8}
                padding="0 8px"
                style={{
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                }}
            >
                <PrimitiveText
                    fontSize={12}
                    fontWeight={500}
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    Year
                </PrimitiveText>
                <PrimitiveText
                    fontSize={12}
                    fontWeight={500}
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    Month
                </PrimitiveText>
                <PrimitiveText
                    fontSize={12}
                    fontWeight={500}
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    Date
                </PrimitiveText>
                <PrimitiveText
                    fontSize={12}
                    fontWeight={500}
                    color={FOUNDATION_THEME.colors.gray[600]}
                >
                    Time
                </PrimitiveText>
            </Block>

            <Block
                display="grid"
                gap={8}
                padding="0 8px"
                style={{
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                }}
            >
                <TextInput
                    label=""
                    placeholder="2025"
                    value={
                        tabType === 'start'
                            ? selectedRange.startDate.getFullYear().toString()
                            : selectedRange.endDate.getFullYear().toString()
                    }
                    onChange={(e) => {
                        const year =
                            parseInt(e.target.value) ||
                            (tabType === 'start'
                                ? selectedRange.startDate.getFullYear()
                                : selectedRange.endDate.getFullYear())
                        const targetDate =
                            tabType === 'start'
                                ? selectedRange.startDate
                                : selectedRange.endDate
                        const newDate = new Date(targetDate)
                        newDate.setFullYear(year)

                        if (tabType === 'start') {
                            setSelectedRange({
                                ...selectedRange,
                                startDate: newDate,
                            })
                            setStartDate(formatDate(newDate, dateFormat))
                        } else {
                            setSelectedRange({
                                ...selectedRange,
                                endDate: newDate,
                            })
                            setEndDate(formatDate(newDate, dateFormat))
                        }
                    }}
                />
                <TextInput
                    label=""
                    placeholder="Jun"
                    value={
                        tabType === 'start'
                            ? selectedRange.startDate.toLocaleDateString(
                                  'en-US',
                                  { month: 'short' }
                              )
                            : selectedRange.endDate.toLocaleDateString(
                                  'en-US',
                                  { month: 'short' }
                              )
                    }
                    onChange={(e) => {
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
                        const monthIndex = monthNames.indexOf(e.target.value)
                        if (monthIndex !== -1) {
                            const targetDate =
                                tabType === 'start'
                                    ? selectedRange.startDate
                                    : selectedRange.endDate
                            const newDate = new Date(targetDate)
                            newDate.setMonth(monthIndex)

                            if (tabType === 'start') {
                                setSelectedRange({
                                    ...selectedRange,
                                    startDate: newDate,
                                })
                                setStartDate(formatDate(newDate, dateFormat))
                            } else {
                                setSelectedRange({
                                    ...selectedRange,
                                    endDate: newDate,
                                })
                                setEndDate(formatDate(newDate, dateFormat))
                            }
                        }
                    }}
                />
                <TextInput
                    label=""
                    placeholder="09"
                    value={
                        tabType === 'start'
                            ? selectedRange.startDate
                                  .getDate()
                                  .toString()
                                  .padStart(2, '0')
                            : selectedRange.endDate
                                  .getDate()
                                  .toString()
                                  .padStart(2, '0')
                    }
                    onChange={(e) => {
                        const day =
                            parseInt(e.target.value) ||
                            (tabType === 'start'
                                ? selectedRange.startDate.getDate()
                                : selectedRange.endDate.getDate())
                        const targetDate =
                            tabType === 'start'
                                ? selectedRange.startDate
                                : selectedRange.endDate
                        const newDate = new Date(targetDate)
                        newDate.setDate(day)

                        if (tabType === 'start') {
                            setSelectedRange({
                                ...selectedRange,
                                startDate: newDate,
                            })
                            setStartDate(formatDate(newDate, dateFormat))
                        } else {
                            setSelectedRange({
                                ...selectedRange,
                                endDate: newDate,
                            })
                            setEndDate(formatDate(newDate, dateFormat))
                        }
                    }}
                />
                <TextInput
                    label=""
                    placeholder="00:00"
                    value={tabType === 'start' ? startTime : endTime}
                    onChange={(e) => {
                        if (tabType === 'start') {
                            handleStartTimeChangeCallback(e.target.value)
                        } else {
                            handleEndTimeChangeCallback(e.target.value)
                        }
                    }}
                />
            </Block>
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
                    <DrawerBody>
                        <Block padding="16px">
                            <Tabs
                                defaultValue="start"
                                onValueChange={setActiveTab}
                                variant={TabsVariant.FLOATING}
                                size={TabsSize.MD}
                            >
                                <TabsList
                                    variant={TabsVariant.FLOATING}
                                    size={TabsSize.MD}
                                    fitContent
                                >
                                    <TabsTrigger
                                        value="start"
                                        variant={TabsVariant.FLOATING}
                                        size={TabsSize.MD}
                                    >
                                        Start Date
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="end"
                                        variant={TabsVariant.FLOATING}
                                        size={TabsSize.MD}
                                    >
                                        End Date
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="start">
                                    {renderTabContent('start')}
                                </TabsContent>

                                <TabsContent value="end">
                                    {renderTabContent('end')}
                                </TabsContent>
                            </Tabs>

                            <Block
                                display="flex"
                                alignItems="center"
                                gap={8}
                                marginTop={32}
                                padding="16px 0"
                                borderTop={`1px solid ${FOUNDATION_THEME.colors.gray[200]}`}
                            >
                                <Switch
                                    checked={showTimePickerState}
                                    onChange={setShowTimePickerState}
                                    size={SwitchSize.MEDIUM}
                                />
                                <PrimitiveText
                                    fontSize={14}
                                    fontWeight={500}
                                    color={FOUNDATION_THEME.colors.gray[600]}
                                >
                                    Time Ranges
                                </PrimitiveText>
                            </Block>

                            {/* Footer Controls */}
                            <Block
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                padding="24px 0"
                                marginTop={16}
                            >
                                <Button
                                    buttonType={ButtonType.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                    onClick={() => {
                                        handleCancel()
                                        setDrawerOpen(false)
                                    }}
                                    text="Cancel"
                                />
                                <Button
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    onClick={handleApply}
                                    text="Apply Date"
                                />
                            </Block>
                        </Block>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export default MobileDrawerFloatingTabs
