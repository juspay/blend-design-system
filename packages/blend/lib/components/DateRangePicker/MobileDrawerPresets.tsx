import React, { useState } from 'react'
import { DateRangePreset } from './types'
import Block from '../Primitives/Block/Block'
import {
    Drawer,
    DrawerTrigger,
    DrawerPortal,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
} from '../Drawer'
import DatePickerComponent from './components/DatePickerComponent'
import PresetItem from './components/PresetItem'
import ActionButtons from './components/ActionButtons'
import { MobileDrawerPresetsProps } from './types'

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
    isDisabled = false,
    isApplyDisabled = false,
    applyDisabledMessage,
    disableFutureDates = false,
    disablePastDates = false,
    maxYearOffset,
}) => {
    const [isCustomExpanded, setIsCustomExpanded] = useState(
        showCustomDropdownOnly
    )

    const renderCustomDateInputs = () => (
        <DatePickerComponent
            selectedRange={selectedRange}
            startTime={startTime}
            endTime={endTime}
            dateFormat={dateFormat}
            handleStartTimeChange={handleStartTimeChange}
            handleEndTimeChange={handleEndTimeChange}
            setSelectedRange={setSelectedRange}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            isDisabled={isDisabled}
            disableFutureDates={disableFutureDates}
            disablePastDates={disablePastDates}
            maxYearOffset={maxYearOffset}
        />
    )

    const renderPresetItem = (preset: DateRangePreset) => (
        <PresetItem
            key={preset}
            preset={preset}
            isActive={activePreset === preset}
            isCustomExpanded={isCustomExpanded}
            onPresetSelect={handlePresetSelect}
            onCustomToggle={() => setIsCustomExpanded(!isCustomExpanded)}
            setDrawerOpen={setDrawerOpen}
            isDisabled={isDisabled}
        />
    )

    const renderActionButtons = () => (
        <ActionButtons
            onCancel={() => {
                handleCancel()
                setDrawerOpen(false)
            }}
            onApply={handleApply}
            isDisabled={isDisabled}
            isApplyDisabled={isApplyDisabled}
            applyDisabledMessage={applyDisabledMessage}
        />
    )

    return (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger onClick={() => !isDisabled && setDrawerOpen(true)}>
                {renderTrigger()}
            </DrawerTrigger>

            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent
                    contentDriven={true}
                    mobileOffset={
                        showCustomDropdownOnly || !showPresets
                            ? undefined
                            : undefined
                    }
                >
                    <DrawerBody noPadding>
                        <Block
                            display="flex"
                            flexDirection="column"
                            height="100%"
                            maxHeight="80vh"
                            style={{
                                opacity: isDisabled ? 0.6 : 1,
                                pointerEvents: isDisabled ? 'none' : 'auto',
                            }}
                        >
                            {showCustomDropdownOnly || !showPresets ? (
                                <>
                                    <Block
                                        width="100%"
                                        flexGrow={1}
                                        style={{ overflowY: 'auto' }}
                                    >
                                        {renderCustomDateInputs()}
                                    </Block>
                                    {renderActionButtons()}
                                </>
                            ) : (
                                showPresets && (
                                    <>
                                        <Block
                                            flexGrow={1}
                                            style={{
                                                overflowY: 'auto',
                                                minHeight: 0,
                                            }}
                                        >
                                            {availablePresets.map(
                                                renderPresetItem
                                            )}

                                            <Block
                                                style={{
                                                    maxHeight: isCustomExpanded
                                                        ? '800px'
                                                        : '0px',
                                                    opacity: isCustomExpanded
                                                        ? 1
                                                        : 0,
                                                    overflow: 'hidden',
                                                    transition:
                                                        'max-height 0.4s ease-in-out, opacity 0.3s ease-in-out',
                                                }}
                                            >
                                                {renderCustomDateInputs()}
                                            </Block>
                                        </Block>

                                        {isCustomExpanded &&
                                            renderActionButtons()}
                                    </>
                                )
                            )}
                        </Block>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export default MobileDrawerPresets
