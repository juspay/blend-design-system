import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { DateRange, DateRangePreset } from './types'
import {
    MOBILE_PICKER_CONSTANTS,
    isValidTimeInput,
    formatTimeInput,
    generatePickerData,
    createSelectionHandler,
    getPresetDisplayLabel,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'
import { getCalendarToken } from './dateRangePicker.tokens'
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

const { ITEM_HEIGHT, VISIBLE_ITEMS, SCROLL_DEBOUNCE } = MOBILE_PICKER_CONSTANTS
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS

const tokens = getCalendarToken(FOUNDATION_THEME)

const ScrollablePicker = React.memo<{
    items: (string | number)[]
    selectedIndex: number
    onSelect: (index: number) => void
    isTimeColumn?: boolean
    columnId: string
}>(({ items, selectedIndex, onSelect, isTimeColumn = false, columnId }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const isScrollingRef = useRef(false)
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const lastSelectedIndexRef = useRef(selectedIndex)
    const [editingValue, setEditingValue] = useState<string>('')
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = selectedIndex * ITEM_HEIGHT
            lastSelectedIndexRef.current = selectedIndex
        }
    }, [selectedIndex])

    const handleScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            e.stopPropagation()

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
            }

            isScrollingRef.current = true
            const scrollTop = e.currentTarget.scrollTop
            const newIndex = Math.round(scrollTop / ITEM_HEIGHT)
            const clampedIndex = Math.max(
                0,
                Math.min(items.length - 1, newIndex)
            )

            if (clampedIndex !== selectedIndex) {
                lastSelectedIndexRef.current = clampedIndex
                onSelect(clampedIndex)
            }

            scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false
                if (scrollRef.current) {
                    const exactScrollTop = clampedIndex * ITEM_HEIGHT
                    scrollRef.current.scrollTo({
                        top: exactScrollTop,
                        behavior: 'smooth',
                    })
                }
            }, SCROLL_DEBOUNCE)
        },
        [selectedIndex, onSelect, items.length]
    )

    // Handle item click
    const handleItemClick = useCallback(
        (index: number, e: React.MouseEvent) => {
            e.stopPropagation()

            if (index !== selectedIndex && index >= 0 && index < items.length) {
                lastSelectedIndexRef.current = index
                onSelect(index)
                if (scrollRef.current) {
                    scrollRef.current.scrollTo({
                        top: index * ITEM_HEIGHT,
                        behavior: 'smooth',
                    })
                }
            }
        },
        [onSelect, selectedIndex, items.length]
    )

    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
            }
        }
    }, [])

    return (
        <Block
            position="relative"
            height={`${CONTAINER_HEIGHT}px`}
            width="100%"
            style={{ overflow: 'hidden', isolation: 'isolate' }}
        >
            <Block
                position="absolute"
                top="0"
                left="0"
                right="0"
                height={`${ITEM_HEIGHT}px`}
                style={{
                    background: tokens.mobileDrawer.picker.gradients.top,
                    pointerEvents: 'none',
                    zIndex: 3,
                }}
            />

            <Block
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                height={`${ITEM_HEIGHT}px`}
                style={{
                    background: tokens.mobileDrawer.picker.gradients.bottom,
                    pointerEvents: 'none',
                    zIndex: 3,
                }}
            />

            <Block
                position="absolute"
                top={`${ITEM_HEIGHT}px`}
                left="50%"
                style={{
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            >
                <svg
                    width="70"
                    height="2"
                    viewBox="0 0 70 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.125 1H69.875"
                        stroke="url(#paint0_radial_top)"
                        strokeWidth="1"
                    />
                    <defs>
                        <radialGradient
                            id="paint0_radial_top"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(35 1) rotate(90) scale(0.5 34.875)"
                        >
                            <stop stopColor="#777777" />
                            <stop offset="1" stopColor="white" />
                        </radialGradient>
                    </defs>
                </svg>
            </Block>

            <Block
                position="absolute"
                top={`${ITEM_HEIGHT * 2}px`}
                left="50%"
                style={{
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            >
                <svg
                    width="70"
                    height="2"
                    viewBox="0 0 70 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.125 1H69.875"
                        stroke="url(#paint0_radial_bottom)"
                        strokeWidth="1"
                    />
                    <defs>
                        <radialGradient
                            id="paint0_radial_bottom"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(35 1) rotate(90) scale(0.5 34.875)"
                        >
                            <stop stopColor="#777777" />
                            <stop offset="1" stopColor="white" />
                        </radialGradient>
                    </defs>
                </svg>
            </Block>
            <Block height={`${CONTAINER_HEIGHT}px`} position="relative">
                <Block
                    height={`${ITEM_HEIGHT}px`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={(e) => {
                        if (selectedIndex > 0) {
                            handleItemClick(selectedIndex - 1, e)
                        }
                    }}
                >
                    <PrimitiveText
                        fontSize={
                            tokens.mobileDrawer.picker.text.unselected.fontSize
                        }
                        fontWeight={
                            tokens.mobileDrawer.picker.text.unselected
                                .fontWeight
                        }
                        color={tokens.mobileDrawer.picker.text.unselected.color}
                        style={{
                            textAlign: 'center',
                            opacity:
                                tokens.mobileDrawer.picker.text.unselected
                                    .opacity,
                            userSelect: 'none',
                        }}
                    >
                        {selectedIndex > 0
                            ? String(items[selectedIndex - 1])
                            : ''}
                    </PrimitiveText>
                </Block>

                {/* Middle row (selected) */}
                <Block
                    height={`${ITEM_HEIGHT}px`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{
                        cursor: isTimeColumn ? 'text' : 'pointer',
                        userSelect: isTimeColumn ? 'text' : 'none',
                        zIndex: isTimeColumn ? 10 : 1,
                    }}
                >
                    {isTimeColumn ? (
                        <input
                            type="text"
                            value={
                                isEditing
                                    ? editingValue
                                    : String(items[selectedIndex])
                            }
                            style={{
                                cursor: 'text',
                                textAlign: 'center',
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                width: '60px',
                                height: 'auto',
                                borderRadius: '0',
                                padding: '0',
                                fontSize: '16px',
                                fontWeight: 600,
                                color: String(
                                    FOUNDATION_THEME.colors.gray[900]
                                ),
                                position: 'relative',
                                zIndex: 10,
                                fontFamily: 'inherit',
                            }}
                            onFocus={(e) => {
                                setIsEditing(true)
                                setEditingValue(e.currentTarget.value)
                                e.currentTarget.select()
                            }}
                            onChange={(e) => {
                                const input = e.target.value

                                if (isValidTimeInput(input)) {
                                    const formatted = formatTimeInput(input)
                                    setEditingValue(formatted)
                                    e.target.value = formatted
                                } else {
                                    e.target.value = editingValue
                                }
                            }}
                            onBlur={(e) => {
                                setIsEditing(false)
                                const newValue =
                                    e.target.value ||
                                    editingValue ||
                                    String(items[selectedIndex])
                                const newIndex = items.findIndex(
                                    (t) => t === newValue
                                )

                                if (newIndex !== -1) {
                                    onSelect(newIndex)
                                } else {
                                    e.target.value = String(
                                        items[selectedIndex]
                                    )
                                }
                                setEditingValue('')
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    e.currentTarget.blur()
                                }

                                const allowedKeys = [
                                    'Backspace',
                                    'Delete',
                                    'ArrowLeft',
                                    'ArrowRight',
                                    'Tab',
                                ]
                                const isNumber = /^[0-9]$/.test(e.key)
                                const isColon = e.key === ':'

                                if (
                                    !isNumber &&
                                    !isColon &&
                                    !allowedKeys.includes(e.key)
                                ) {
                                    e.preventDefault()
                                }

                                e.stopPropagation()
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                e.currentTarget.focus()
                                e.currentTarget.select()
                            }}
                        />
                    ) : (
                        <PrimitiveText
                            fontSize={
                                tokens.mobileDrawer.picker.text.selected
                                    .fontSize
                            }
                            fontWeight={
                                tokens.mobileDrawer.picker.text.selected
                                    .fontWeight
                            }
                            color={
                                tokens.mobileDrawer.picker.text.selected.color
                            }
                            style={{
                                textAlign: 'center',
                                opacity:
                                    tokens.mobileDrawer.picker.text.selected
                                        .opacity,
                                userSelect: 'none',
                            }}
                        >
                            {String(items[selectedIndex])}
                        </PrimitiveText>
                    )}
                </Block>

                {/* Bottom row */}
                <Block
                    height={`${ITEM_HEIGHT}px`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={(e) => {
                        if (selectedIndex < items.length - 1) {
                            handleItemClick(selectedIndex + 1, e)
                        }
                    }}
                >
                    <PrimitiveText
                        fontSize={
                            tokens.mobileDrawer.picker.text.unselected.fontSize
                        }
                        fontWeight={
                            tokens.mobileDrawer.picker.text.unselected
                                .fontWeight
                        }
                        color={tokens.mobileDrawer.picker.text.unselected.color}
                        style={{
                            textAlign: 'center',
                            opacity:
                                tokens.mobileDrawer.picker.text.unselected
                                    .opacity,
                            userSelect: 'none',
                        }}
                    >
                        {selectedIndex < items.length - 1
                            ? String(items[selectedIndex + 1])
                            : ''}
                    </PrimitiveText>
                </Block>
            </Block>

            <Block
                ref={scrollRef}
                height={`${CONTAINER_HEIGHT}px`}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    paddingTop: `${ITEM_HEIGHT}px`,
                    paddingBottom: `${ITEM_HEIGHT}px`,
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    opacity: 0,
                    pointerEvents: isTimeColumn && isEditing ? 'none' : 'auto',
                    zIndex: 1,
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-y',
                }}
                onScroll={handleScroll}
                className={`scrollable-picker-${columnId}`}
            >
                <style>
                    {`.scrollable-picker-${columnId}::-webkit-scrollbar { display: none; }
                     .scrollable-picker-${columnId} { -webkit-overflow-scrolling: touch; touch-action: pan-y; }`}
                </style>
                <Block
                    style={{
                        height: `${items.length * ITEM_HEIGHT}px`,
                        width: '100%',
                        minHeight: `${items.length * ITEM_HEIGHT}px`,
                    }}
                >
                    {items.map((_, index) => (
                        <Block
                            key={`${columnId}-scroll-${index}`}
                            height={`${ITEM_HEIGHT}px`}
                            style={{
                                scrollSnapAlign: 'start',
                                width: '100%',
                                minHeight: `${ITEM_HEIGHT}px`,
                            }}
                        />
                    ))}
                </Block>
            </Block>
        </Block>
    )
})

ScrollablePicker.displayName = 'ScrollablePicker'

const DatePickerComponent: React.FC<{
    selectedRange: DateRange
    startTime: string
    endTime: string
    dateFormat: string
    handleStartTimeChange: (time: string) => void
    handleEndTimeChange: (time: string) => void
    setSelectedRange: (range: DateRange) => void
    setStartDate: (date: string) => void
    setEndDate: (date: string) => void
}> = ({
    selectedRange,
    startTime,
    endTime,
    dateFormat,
    handleStartTimeChange,
    handleEndTimeChange,
    setSelectedRange,
    setStartDate,
    setEndDate,
}) => {
    const renderTabContent = (tabType: 'start' | 'end') => {
        const data = generatePickerData(
            tabType,
            selectedRange,
            startTime,
            endTime
        )

        return (
            <Block marginTop={tokens.mobileDrawer.datePicker.marginTop}>
                <Block
                    display="flex"
                    padding={tokens.mobileDrawer.datePicker.container.padding}
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
                        {/* Scrollable Picker */}
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
                        />
                    </Block>
                </Block>
            </Block>
        )
    }

    return (
        <Block marginTop={16}>
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

// Main Component
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
        />
    )

    const renderPresetItem = (preset: DateRangePreset) => {
        const isActive = activePreset === preset
        const isCustom = preset === DateRangePreset.CUSTOM

        return (
            <Block
                key={preset}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                padding="16px 20px"
                borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
                cursor="pointer"
                backgroundColor="transparent"
                onClick={() => {
                    if (isCustom) {
                        setIsCustomExpanded(!isCustomExpanded)
                        handlePresetSelect(preset)
                    } else {
                        handlePresetSelect(preset)
                        setDrawerOpen(false)
                    }
                }}
            >
                <Text
                    variant="body.md"
                    fontWeight={isActive ? 600 : 500}
                    color={
                        isActive
                            ? FOUNDATION_THEME.colors.gray[700]
                            : FOUNDATION_THEME.colors.gray[600]
                    }
                >
                    {getPresetDisplayLabel(preset)}
                </Text>

                {isActive && !isCustom && (
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
                        >
                            <path
                                d="M13.5 4.5L6 12L2.5 8.5"
                                stroke={FOUNDATION_THEME.colors.gray[700]}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Block>
                )}

                {isCustom && (
                    <ChevronDown
                        size={16}
                        color={FOUNDATION_THEME.colors.gray[500]}
                        style={{
                            transform: isCustomExpanded
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                        }}
                    />
                )}
            </Block>
        )
    }

    const renderActionButtons = () => (
        <Block
            display="flex"
            gap={FOUNDATION_THEME.unit[12]}
            padding={FOUNDATION_THEME.unit[16]}
            marginTop={FOUNDATION_THEME.unit[24]}
        >
            <Block flexGrow={1}>
                <Button
                    buttonType={ButtonType.SECONDARY}
                    size={ButtonSize.LARGE}
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
                    size={ButtonSize.LARGE}
                    fullWidth={true}
                    onClick={handleApply}
                    text="Apply Date"
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
                <DrawerContent
                    mobileOffset={
                        showCustomDropdownOnly || !showPresets
                            ? { top: '50%' }
                            : { top: '118px' }
                    }
                >
                    <DrawerBody noPadding>
                        <Block display="flex" flexDirection="column" gap={0}>
                            {showCustomDropdownOnly || !showPresets ? (
                                <Block
                                    width="100%"
                                    padding={FOUNDATION_THEME.unit[16]}
                                >
                                    {renderCustomDateInputs()}
                                </Block>
                            ) : (
                                showPresets && (
                                    <Block>
                                        {availablePresets.map(renderPresetItem)}
                                        {isCustomExpanded && (
                                            <Block padding="0 16px">
                                                {renderCustomDateInputs()}
                                            </Block>
                                        )}
                                    </Block>
                                )
                            )}

                            {(isCustomExpanded ||
                                showCustomDropdownOnly ||
                                !showPresets) &&
                                renderActionButtons()}
                        </Block>
                    </DrawerBody>
                </DrawerContent>
            </DrawerPortal>
        </Drawer>
    )
}

export default MobileDrawerPresets
