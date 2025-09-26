import { forwardRef } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { styled } from 'styled-components'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DateRangePreset, DateRangePickerSize } from './types'
import { getPresetLabel } from './utils'
import { CalendarTokenType } from './dateRangePicker.tokens'
import Block from '../Primitives/Block/Block'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

type QuickRangeSelectorProps = {
    isOpen: boolean
    onToggle: () => void
    activePreset: DateRangePreset
    onPresetSelect: (preset: DateRangePreset) => void
    excludeCustom?: boolean
    className?: string
    disableFutureDates?: boolean
    disablePastDates?: boolean
    isDisabled?: boolean
    size?: DateRangePickerSize
}

const StyledItem = styled(DropdownMenu.Item)<{
    $isActive: boolean
    $calendarToken: CalendarTokenType
}>`
    ${(props) => props.$calendarToken.quickRange.item}
    ${(props) => props.$calendarToken.quickRange.item.text}
  ${(props) => props.$isActive && props.$calendarToken.quickRange.item.active}
`

const StyledContent = styled(DropdownMenu.Content)<{
    $calendarToken: CalendarTokenType
}>`
    ${(props) => props.$calendarToken.quickRange.content}
`

const QuickRangeSelector = forwardRef<HTMLDivElement, QuickRangeSelectorProps>(
    (
        {
            isOpen,
            onToggle,
            activePreset,
            onPresetSelect,
            excludeCustom = false,
            className,
            disableFutureDates = false,
            disablePastDates = false,
            isDisabled = false,
            size = DateRangePickerSize.MEDIUM,
        },
        ref
    ) => {
        const responsiveCalendarTokens =
            useResponsiveTokens<CalendarTokenType>('CALENDAR')
        const calendarToken = responsiveCalendarTokens
        const activePresetLabel = getPresetLabel(activePreset)

        const getFilteredPresets = () => {
            const pastPresets = [
                DateRangePreset.YESTERDAY,
                DateRangePreset.LAST_1_HOUR,
                DateRangePreset.LAST_6_HOURS,
                DateRangePreset.LAST_7_DAYS,
                DateRangePreset.LAST_30_DAYS,
                DateRangePreset.LAST_3_MONTHS,
                DateRangePreset.LAST_12_MONTHS,
            ]

            const futurePresets = [
                DateRangePreset.TOMORROW,
                DateRangePreset.NEXT_7_DAYS,
                DateRangePreset.NEXT_30_DAYS,
                DateRangePreset.NEXT_3_MONTHS,
                DateRangePreset.NEXT_12_MONTHS,
            ]

            const neutralPresets = [DateRangePreset.TODAY]

            let availablePresets = [...neutralPresets]

            if (!disablePastDates) {
                availablePresets = [...availablePresets, ...pastPresets]
            }

            if (!disableFutureDates) {
                availablePresets = [...availablePresets, ...futurePresets]
            }

            if (!excludeCustom) {
                availablePresets.push(DateRangePreset.CUSTOM)
            }

            return availablePresets
        }

        const filteredPresets = getFilteredPresets()

        const handlePresetSelect = (preset: DateRangePreset) => {
            if (!isDisabled) {
                onPresetSelect(preset)
            }
        }

        const handleToggle = () => {
            if (!isDisabled) {
                onToggle()
            }
        }

        return (
            <Block
                position="relative"
                // width={calendarToken.quickRange.width}
                ref={ref}
                className={className}
            >
                <DropdownMenu.Root
                    open={isDisabled ? false : isOpen}
                    onOpenChange={handleToggle}
                >
                    <DropdownMenu.Trigger asChild>
                        <PrimitiveButton
                            style={{
                                borderLeft:
                                    calendarToken.quickRange.trigger.borderLeft,
                                borderTop:
                                    calendarToken.quickRange.trigger.borderTop,
                                borderBottom:
                                    calendarToken.quickRange.trigger
                                        .borderBottom,
                                borderTopLeftRadius:
                                    calendarToken.quickRange.trigger
                                        .borderTopLeftRadius,
                                borderBottomLeftRadius:
                                    calendarToken.quickRange.trigger
                                        .borderBottomLeftRadius,
                                display:
                                    calendarToken.quickRange.trigger.display,
                                justifyContent:
                                    calendarToken.quickRange.trigger
                                        .justifyContent,
                                alignItems:
                                    calendarToken.quickRange.trigger.alignItems,
                                cursor: calendarToken.quickRange.trigger.cursor,
                                width: calendarToken.quickRange.trigger.width,
                                backgroundColor:
                                    calendarToken.quickRange.trigger
                                        .backgroundColor,
                                padding:
                                    calendarToken.quickRange.trigger.padding[
                                        size
                                    ],
                            }}
                            disabled={isDisabled}
                            gap={calendarToken.quickRange.trigger.gap}
                        >
                            <Block
                                as="span"
                                color={
                                    calendarToken.quickRange.trigger.text.color
                                }
                                fontSize={
                                    calendarToken.quickRange.trigger.fontSize[
                                        size
                                    ]
                                }
                                fontWeight={
                                    calendarToken.quickRange.trigger.text
                                        .fontWeight
                                }
                            >
                                {activePresetLabel}
                            </Block>
                            {isOpen ? (
                                <ChevronUp
                                    size={
                                        calendarToken.quickRange.trigger
                                            .iconSize as number
                                    }
                                    color={
                                        calendarToken.quickRange.trigger.text
                                            .color
                                    }
                                />
                            ) : (
                                <ChevronDown
                                    size={
                                        calendarToken.quickRange.trigger
                                            .iconSize as number
                                    }
                                    color={
                                        calendarToken.quickRange.trigger.text
                                            .color
                                    }
                                />
                            )}
                        </PrimitiveButton>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <StyledContent
                            align="start"
                            sideOffset={4}
                            $calendarToken={calendarToken}
                        >
                            {filteredPresets.map((preset) => (
                                <StyledItem
                                    key={preset}
                                    $isActive={preset === activePreset}
                                    $calendarToken={calendarToken}
                                    onSelect={() => handlePresetSelect(preset)}
                                >
                                    {getPresetLabel(preset)}
                                </StyledItem>
                            ))}
                        </StyledContent>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </Block>
        )
    }
)

QuickRangeSelector.displayName = 'QuickRangeSelector'

export default QuickRangeSelector
