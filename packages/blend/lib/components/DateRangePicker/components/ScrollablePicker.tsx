import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { HapticFeedbackType } from '../types'
import {
    MOBILE_PICKER_CONSTANTS,
    isValidTimeInput,
    formatTimeInput,
    triggerHapticFeedback,
    calendarHapticManager,
    MOBILE_CALENDAR_CONSTANTS,
    getPickerVisibleItems,
    clampPickerIndex,
    calculateScrollPosition,
    calculateIndexFromScroll,
} from '../utils'
import { FOUNDATION_THEME } from '../../../tokens'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import type { ScrollablePickerProps } from '../types'
import { getMobileToken } from './mobile.tokens'

const { ITEM_HEIGHT, VISIBLE_ITEMS } = MOBILE_PICKER_CONSTANTS
const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS

const ScrollablePicker = React.memo<ScrollablePickerProps>(
    ({
        items,
        selectedIndex,
        onSelect,
        isTimeColumn = false,
        columnId,
        isDisabled = false,
    }) => {
        const tokens = getMobileToken(FOUNDATION_THEME).sm
        const scrollRef = useRef<HTMLDivElement>(null)
        const isScrollingRef = useRef(false)
        const isProgrammaticScrollRef = useRef(false)
        const programmaticScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
        const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
        const lastSelectedIndexRef = useRef(selectedIndex)
        const lastScrollTopRef = useRef(0)
        const hapticManagerRef = useRef(new calendarHapticManager())
        const isInitializedRef = useRef(false)

        const [editingValue, setEditingValue] = useState<string>('')
        const [isEditing, setIsEditing] = useState(false)

        const validatedItems = useMemo(() => {
            if (!Array.isArray(items) || items.length === 0) {
                return ['']
            }
            return items.filter((item) => item !== null && item !== undefined)
        }, [items])

        const validSelectedIndex = useMemo(() => {
            return clampPickerIndex(selectedIndex, validatedItems.length)
        }, [selectedIndex, validatedItems.length])

        const setScrollPosition = useCallback(
            (top: number, options?: ScrollToOptions) => {
                if (!scrollRef.current) {
                    return
                }

                isProgrammaticScrollRef.current = true
                lastScrollTopRef.current = top

                if (options) {
                    scrollRef.current.scrollTo({ top, ...options })
                } else {
                    scrollRef.current.scrollTop = top
                }

                if (programmaticScrollTimeoutRef.current) {
                    clearTimeout(programmaticScrollTimeoutRef.current)
                }
                programmaticScrollTimeoutRef.current = setTimeout(() => {
                    isProgrammaticScrollRef.current = false
                }, 100)
            },
            []
        )

        useEffect(() => {
            if (!scrollRef.current || !validatedItems.length || isDisabled) {
                return
            }

            const initializeScroll = () => {
                if (isScrollingRef.current) {
                    return
                }

                const targetScrollTop = calculateScrollPosition(
                    validSelectedIndex,
                    ITEM_HEIGHT
                )

                // Check if we are already at the correct position (with small tolerance)
                const currentScrollTop = scrollRef.current?.scrollTop || 0
                if (Math.abs(currentScrollTop - targetScrollTop) > 2) {
                    setScrollPosition(targetScrollTop)
                }

                lastSelectedIndexRef.current = validSelectedIndex
                lastScrollTopRef.current = targetScrollTop
                isInitializedRef.current = true
            }

            if (!isInitializedRef.current) {
                requestAnimationFrame(() => {
                    requestAnimationFrame(initializeScroll)
                })
            } else {
                initializeScroll()
            }
        }, [
            validSelectedIndex,
            validatedItems.length,
            isDisabled,
            setScrollPosition,
        ])

        const handleScroll = useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                e.stopPropagation()

                const currentScrollTop = e.currentTarget.scrollTop
                lastScrollTopRef.current = currentScrollTop

                if (
                    isProgrammaticScrollRef.current ||
                    !validatedItems.length ||
                    isDisabled
                ) {
                    return
                }

                isScrollingRef.current = true
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current)
                }

                const newIndex = calculateIndexFromScroll(
                    currentScrollTop,
                    ITEM_HEIGHT
                )
                const clampedIndex = clampPickerIndex(
                    newIndex,
                    validatedItems.length
                )

                if (
                    clampedIndex !== lastSelectedIndexRef.current &&
                    clampedIndex >= 0
                ) {
                    hapticManagerRef.current.triggerScrollHaptic(clampedIndex)
                    lastSelectedIndexRef.current = clampedIndex
                    onSelect(clampedIndex)
                }

                scrollTimeoutRef.current = setTimeout(() => {
                    isScrollingRef.current = false
                }, 100)
            },
            [onSelect, validatedItems.length, isDisabled]
        )

        const handleItemClick = useCallback(
            (index: number, e: React.MouseEvent) => {
                e.stopPropagation()

                if (
                    !Number.isInteger(index) ||
                    index < 0 ||
                    index >= validatedItems.length ||
                    index === validSelectedIndex ||
                    isDisabled
                ) {
                    return
                }

                triggerHapticFeedback(HapticFeedbackType.IMPACT)

                lastSelectedIndexRef.current = index
                onSelect(index)

                const targetScrollTop = calculateScrollPosition(
                    index,
                    ITEM_HEIGHT
                )
                setScrollPosition(targetScrollTop, { behavior: 'smooth' })
            },
            [
                onSelect,
                validSelectedIndex,
                validatedItems.length,
                isDisabled,
                setScrollPosition,
            ]
        )

        useEffect(() => {
            return () => {
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current)
                }
                if (programmaticScrollTimeoutRef.current) {
                    clearTimeout(programmaticScrollTimeoutRef.current)
                }
                const hapticManager = hapticManagerRef.current
                if (hapticManager) {
                    hapticManager.destroy()
                }
            }
        }, [])

        const visibleItems = useMemo(() => {
            return getPickerVisibleItems(validatedItems, validSelectedIndex)
        }, [validatedItems, validSelectedIndex])

        return (
            <Block
                position="relative"
                height={`${CONTAINER_HEIGHT}px`}
                width="100%"
                style={{
                    overflow: 'hidden',
                    isolation: 'isolate',
                    opacity: isDisabled ? 0.5 : 1,
                    pointerEvents: isDisabled ? 'none' : 'auto',
                }}
            >
                <Block
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    height={`${ITEM_HEIGHT}px`}
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)',
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
                        background:
                            'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)',
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
                    <svg width="70" height="2" viewBox="0 0 70 2" fill="none">
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
                    <svg width="70" height="2" viewBox="0 0 70 2" fill="none">
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
                        style={{
                            cursor:
                                visibleItems.hasTopItem && !isDisabled
                                    ? 'pointer'
                                    : 'default',
                            userSelect: 'none',
                            transform: `scale(${MOBILE_CALENDAR_CONSTANTS.SCALE_UNSELECTED})`,
                            transition: `transform ${MOBILE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${MOBILE_CALENDAR_CONSTANTS.EASING}`,
                        }}
                        onClick={(e) => {
                            if (visibleItems.hasTopItem && !isDisabled) {
                                handleItemClick(validSelectedIndex - 1, e)
                            }
                        }}
                    >
                        <PrimitiveText
                            fontSize={tokens.picker.text.unselected.fontSize}
                            fontWeight={
                                tokens.picker.text.unselected.fontWeight
                            }
                            color={tokens.picker.text.unselected.color}
                            style={{
                                textAlign: 'center',
                                opacity: tokens.picker.text.unselected.opacity,
                                userSelect: 'none',
                                transition: `opacity ${MOBILE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${MOBILE_CALENDAR_CONSTANTS.EASING}`,
                            }}
                        >
                            {visibleItems.topItem || ''}
                        </PrimitiveText>
                    </Block>

                    <Block
                        height={`${ITEM_HEIGHT}px`}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            cursor: isTimeColumn
                                ? isDisabled
                                    ? 'default'
                                    : 'text'
                                : isDisabled
                                  ? 'default'
                                  : 'pointer',
                            userSelect: isTimeColumn ? 'text' : 'none',
                            zIndex: isTimeColumn ? 10 : 1,
                            transform: `scale(${MOBILE_CALENDAR_CONSTANTS.SCALE_SELECTED})`,
                            transition: `transform ${MOBILE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${MOBILE_CALENDAR_CONSTANTS.EASING}`,
                        }}
                    >
                        {isTimeColumn ? (
                            <input
                                type="text"
                                value={
                                    isEditing
                                        ? editingValue
                                        : visibleItems.centerItem || ''
                                }
                                disabled={isDisabled}
                                style={{
                                    cursor: isDisabled ? 'default' : 'text',
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
                                    transition: `opacity ${MOBILE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${MOBILE_CALENDAR_CONSTANTS.EASING}`,
                                }}
                                onFocus={(e) => {
                                    if (isDisabled) return
                                    const currentValue =
                                        e.currentTarget.value ||
                                        visibleItems.centerItem ||
                                        ''
                                    setIsEditing(true)
                                    setEditingValue(currentValue)
                                    e.currentTarget.select()
                                }}
                                onChange={(e) => {
                                    if (isDisabled) return
                                    const input = e.target.value
                                    if (isValidTimeInput(input)) {
                                        const formatted = formatTimeInput(input)
                                        setEditingValue(formatted)
                                        e.target.value = formatted
                                    } else {
                                        const fallbackValue =
                                            editingValue ||
                                            visibleItems.centerItem ||
                                            ''
                                        e.target.value = fallbackValue
                                        setEditingValue(fallbackValue)
                                    }
                                }}
                                onBlur={(e) => {
                                    if (isDisabled) return
                                    setIsEditing(false)
                                    const inputValue = e.target.value
                                    const fallbackValue =
                                        visibleItems.centerItem || ''
                                    const newValue =
                                        inputValue ||
                                        editingValue ||
                                        fallbackValue

                                    const newIndex = validatedItems.findIndex(
                                        (item) => String(item) === newValue
                                    )

                                    if (
                                        newIndex !== -1 &&
                                        newIndex < validatedItems.length
                                    ) {
                                        onSelect(newIndex)
                                    } else {
                                        e.target.value = fallbackValue
                                    }
                                    setEditingValue('')
                                }}
                                onKeyDown={(e) => {
                                    if (isDisabled) return
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        e.currentTarget.blur()
                                        return
                                    }

                                    const allowedKeys = [
                                        'Backspace',
                                        'Delete',
                                        'ArrowLeft',
                                        'ArrowRight',
                                        'Tab',
                                        'Home',
                                        'End',
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
                                    if (isDisabled) return
                                    e.stopPropagation()
                                    e.preventDefault()
                                    if (!isEditing) {
                                        e.currentTarget.focus()
                                        e.currentTarget.select()
                                    }
                                }}
                            />
                        ) : (
                            <PrimitiveText
                                fontSize={tokens.picker.text.selected.fontSize}
                                fontWeight={
                                    tokens.picker.text.selected.fontWeight
                                }
                                color={tokens.picker.text.selected.color}
                                style={{
                                    textAlign: 'center',
                                    opacity:
                                        tokens.picker.text.selected.opacity,
                                    userSelect: 'none',
                                    transition: `opacity ${MOBILE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${MOBILE_CALENDAR_CONSTANTS.EASING}`,
                                }}
                            >
                                {visibleItems.centerItem || ''}
                            </PrimitiveText>
                        )}
                    </Block>

                    <Block
                        height={`${ITEM_HEIGHT}px`}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            cursor:
                                visibleItems.hasBottomItem && !isDisabled
                                    ? 'pointer'
                                    : 'default',
                            userSelect: 'none',
                            transform: `scale(${MOBILE_CALENDAR_CONSTANTS.SCALE_UNSELECTED})`,
                            transition: `transform ${MOBILE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${MOBILE_CALENDAR_CONSTANTS.EASING}`,
                        }}
                        onClick={(e) => {
                            if (visibleItems.hasBottomItem && !isDisabled) {
                                handleItemClick(validSelectedIndex + 1, e)
                            }
                        }}
                    >
                        <PrimitiveText
                            fontSize={tokens.picker.text.unselected.fontSize}
                            fontWeight={
                                tokens.picker.text.unselected.fontWeight
                            }
                            color={tokens.picker.text.unselected.color}
                            style={{
                                textAlign: 'center',
                                opacity: tokens.picker.text.unselected.opacity,
                                userSelect: 'none',
                                transition: `opacity ${MOBILE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${MOBILE_CALENDAR_CONSTANTS.EASING}`,
                            }}
                        >
                            {visibleItems.bottomItem || ''}
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
                        scrollSnapType: 'y mandatory',
                        paddingTop: `${ITEM_HEIGHT}px`,
                        paddingBottom: `${ITEM_HEIGHT}px`,
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        opacity: 0,
                        pointerEvents:
                            (isTimeColumn && isEditing) || isDisabled
                                ? 'none'
                                : 'auto',
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
                            height: `${validatedItems.length * ITEM_HEIGHT}px`,
                            width: '100%',
                            minHeight: `${validatedItems.length * ITEM_HEIGHT}px`,
                        }}
                    >
                        {validatedItems.map((_, index) => (
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
    }
)

ScrollablePicker.displayName = 'ScrollablePicker'

export default ScrollablePicker
