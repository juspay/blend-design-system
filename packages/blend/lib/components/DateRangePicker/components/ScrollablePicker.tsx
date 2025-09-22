import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { HapticFeedbackType } from '../types'
import {
    MOBILE_PICKER_CONSTANTS,
    isValidTimeInput,
    formatTimeInput,
    triggerHapticFeedback,
    AppleCalendarHapticManager,
    APPLE_CALENDAR_CONSTANTS,
    getPickerVisibleItems,
    clampPickerIndex,
    calculateScrollPosition,
    calculateIndexFromScroll,
} from '../utils'
import { FOUNDATION_THEME } from '../../../tokens'
import { CalendarTokenType } from '../dateRangePicker.tokens'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { ScrollablePickerProps } from '../types'

const { ITEM_HEIGHT, VISIBLE_ITEMS, SCROLL_DEBOUNCE } = MOBILE_PICKER_CONSTANTS
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
        const responsiveTokens =
            useResponsiveTokens<CalendarTokenType>('CALENDAR')
        const tokens = responsiveTokens

        const scrollRef = useRef<HTMLDivElement>(null)
        const isScrollingRef = useRef(false)
        const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
        const lastSelectedIndexRef = useRef(selectedIndex)
        const velocityRef = useRef(0)
        const smoothedVelocityRef = useRef(0)
        const velocityHistoryRef = useRef<number[]>([])
        const lastScrollTimeRef = useRef(0)
        const lastScrollTopRef = useRef(0)
        const momentumAnimationRef = useRef<number | null>(null)
        const hapticManagerRef = useRef(new AppleCalendarHapticManager())
        const isInitializedRef = useRef(false)
        const frameCountRef = useRef(0)

        const [editingValue, setEditingValue] = useState<string>('')
        const [isEditing, setIsEditing] = useState(false)
        const [isSnapping, setIsSnapping] = useState(false)

        const validatedItems = useMemo(() => {
            if (!Array.isArray(items) || items.length === 0) {
                return ['']
            }
            return items.filter((item) => item !== null && item !== undefined)
        }, [items])

        const validSelectedIndex = useMemo(() => {
            return clampPickerIndex(selectedIndex, validatedItems.length)
        }, [selectedIndex, validatedItems.length])

        useEffect(() => {
            if (
                !scrollRef.current ||
                isScrollingRef.current ||
                !validatedItems.length ||
                isDisabled
            ) {
                return
            }

            const initializeScroll = () => {
                const targetScrollTop = calculateScrollPosition(
                    validSelectedIndex,
                    ITEM_HEIGHT
                )
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = targetScrollTop
                    lastSelectedIndexRef.current = validSelectedIndex
                    lastScrollTopRef.current = targetScrollTop
                    isInitializedRef.current = true
                }
            }

            if (!isInitializedRef.current) {
                requestAnimationFrame(initializeScroll)
            }
        }, [validSelectedIndex, validatedItems.length, isDisabled])

        const snapToNearestItem = useCallback(
            (currentScrollTop: number) => {
                if (
                    !scrollRef.current ||
                    isSnapping ||
                    !validatedItems.length ||
                    isDisabled
                ) {
                    return
                }

                setIsSnapping(true)
                const targetIndex = calculateIndexFromScroll(
                    currentScrollTop,
                    ITEM_HEIGHT
                )
                const clampedIndex = clampPickerIndex(
                    targetIndex,
                    validatedItems.length
                )
                const targetScrollTop = calculateScrollPosition(
                    clampedIndex,
                    ITEM_HEIGHT
                )

                if (clampedIndex !== lastSelectedIndexRef.current) {
                    hapticManagerRef.current.triggerSelectionHaptic()
                    lastSelectedIndexRef.current = clampedIndex
                    onSelect(clampedIndex)
                }

                const startScrollTop = currentScrollTop
                const distance = targetScrollTop - startScrollTop

                if (Math.abs(distance) < 2) {
                    if (scrollRef.current) {
                        scrollRef.current.scrollTop = targetScrollTop
                    }
                    setIsSnapping(false)
                    return
                }

                const duration = Math.min(
                    APPLE_CALENDAR_CONSTANTS.SNAP_DURATION,
                    Math.abs(distance) * 1.5
                )
                const startTime = performance.now()
                frameCountRef.current = 0

                const animateSnap = (currentTime: number) => {
                    frameCountRef.current++

                    if (
                        frameCountRef.current >
                        APPLE_CALENDAR_CONSTANTS.ANIMATION_FRAME_LIMIT
                    ) {
                        if (scrollRef.current) {
                            scrollRef.current.scrollTop = targetScrollTop
                        }
                        setIsSnapping(false)
                        momentumAnimationRef.current = null
                        return
                    }

                    const elapsed = currentTime - startTime
                    const progress = Math.min(elapsed / duration, 1)

                    const easeOut = 1 - Math.pow(1 - progress, 3)
                    const newScrollTop = startScrollTop + distance * easeOut

                    if (scrollRef.current && Number.isFinite(newScrollTop)) {
                        scrollRef.current.scrollTop = newScrollTop
                    }

                    if (progress < 1) {
                        momentumAnimationRef.current =
                            requestAnimationFrame(animateSnap)
                    } else {
                        setIsSnapping(false)
                        momentumAnimationRef.current = null
                        frameCountRef.current = 0
                    }
                }

                momentumAnimationRef.current =
                    requestAnimationFrame(animateSnap)
            },
            [validatedItems.length, onSelect, isSnapping, isDisabled]
        )

        const handleScroll = useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                e.stopPropagation()

                if (isSnapping || !validatedItems.length || isDisabled) {
                    return
                }

                const currentTime = performance.now()
                const currentScrollTop = e.currentTarget.scrollTop

                if (
                    !Number.isFinite(currentScrollTop) ||
                    currentScrollTop < 0
                ) {
                    return
                }

                const timeDelta = currentTime - lastScrollTimeRef.current
                const scrollDelta = currentScrollTop - lastScrollTopRef.current

                if (timeDelta > 0 && timeDelta < 100) {
                    const rawVelocity = scrollDelta / timeDelta
                    const resistedVelocity =
                        rawVelocity * APPLE_CALENDAR_CONSTANTS.SCROLL_RESISTANCE

                    velocityHistoryRef.current.push(resistedVelocity)
                    if (
                        velocityHistoryRef.current.length >
                        APPLE_CALENDAR_CONSTANTS.VELOCITY_HISTORY_SIZE
                    ) {
                        velocityHistoryRef.current.shift()
                    }

                    const avgVelocity =
                        velocityHistoryRef.current.reduce(
                            (sum, vel) => sum + vel,
                            0
                        ) / velocityHistoryRef.current.length
                    smoothedVelocityRef.current =
                        smoothedVelocityRef.current *
                            APPLE_CALENDAR_CONSTANTS.VELOCITY_SMOOTHING +
                        avgVelocity *
                            (1 - APPLE_CALENDAR_CONSTANTS.VELOCITY_SMOOTHING)
                    velocityRef.current = smoothedVelocityRef.current
                }

                lastScrollTimeRef.current = currentTime
                lastScrollTopRef.current = currentScrollTop

                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current)
                }
                if (momentumAnimationRef.current) {
                    cancelAnimationFrame(momentumAnimationRef.current)
                    momentumAnimationRef.current = null
                }

                isScrollingRef.current = true

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
                    const finalVelocity = Math.abs(velocityRef.current)

                    if (
                        finalVelocity >
                        APPLE_CALENDAR_CONSTANTS.MOMENTUM_THRESHOLD
                    ) {
                        const currentScrollTop =
                            scrollRef.current?.scrollTop || 0
                        const currentIndex = calculateIndexFromScroll(
                            currentScrollTop,
                            ITEM_HEIGHT
                        )

                        const velocityDirection =
                            velocityRef.current > 0 ? 1 : -1
                        const momentumDistance = Math.min(
                            APPLE_CALENDAR_CONSTANTS.MAX_MOMENTUM_DISTANCE,
                            Math.ceil(
                                finalVelocity *
                                    APPLE_CALENDAR_CONSTANTS.VELOCITY_MULTIPLIER
                            )
                        )

                        const targetIndex = clampPickerIndex(
                            currentIndex + momentumDistance * velocityDirection,
                            validatedItems.length
                        )

                        const targetScrollTop = calculateScrollPosition(
                            targetIndex,
                            ITEM_HEIGHT
                        )

                        const startScrollTop = currentScrollTop
                        const distance = targetScrollTop - startScrollTop
                        const duration = Math.min(
                            APPLE_CALENDAR_CONSTANTS.SNAP_DURATION * 1.2,
                            Math.abs(distance) * 2
                        )
                        const startTime = performance.now()
                        frameCountRef.current = 0

                        const animateMomentum = (currentTime: number) => {
                            frameCountRef.current++

                            if (
                                frameCountRef.current >
                                APPLE_CALENDAR_CONSTANTS.ANIMATION_FRAME_LIMIT
                            ) {
                                snapToNearestItem(targetScrollTop)
                                return
                            }

                            const elapsed = currentTime - startTime
                            const progress = Math.min(elapsed / duration, 1)

                            const easeOut = 1 - Math.pow(1 - progress, 4)
                            const newScrollTop =
                                startScrollTop + distance * easeOut

                            if (
                                scrollRef.current &&
                                Number.isFinite(newScrollTop)
                            ) {
                                scrollRef.current.scrollTop = newScrollTop
                            }

                            const newIndex = calculateIndexFromScroll(
                                newScrollTop,
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
                                hapticManagerRef.current.triggerScrollHaptic(
                                    clampedIndex
                                )
                                lastSelectedIndexRef.current = clampedIndex
                                onSelect(clampedIndex)
                            }

                            if (progress < 1) {
                                momentumAnimationRef.current =
                                    requestAnimationFrame(animateMomentum)
                            } else {
                                snapToNearestItem(targetScrollTop)
                                frameCountRef.current = 0
                            }
                        }

                        momentumAnimationRef.current =
                            requestAnimationFrame(animateMomentum)
                    } else {
                        snapToNearestItem(currentScrollTop)
                    }
                }, SCROLL_DEBOUNCE)
            },
            [
                onSelect,
                validatedItems.length,
                snapToNearestItem,
                isSnapping,
                isDisabled,
            ]
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

                if (scrollRef.current) {
                    const targetScrollTop = calculateScrollPosition(
                        index,
                        ITEM_HEIGHT
                    )
                    scrollRef.current.scrollTo({
                        top: targetScrollTop,
                        behavior: 'smooth',
                    })
                }
            },
            [onSelect, validSelectedIndex, validatedItems.length, isDisabled]
        )

        useEffect(() => {
            return () => {
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current)
                }
                if (momentumAnimationRef.current) {
                    cancelAnimationFrame(momentumAnimationRef.current)
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
                            transform: `scale(${APPLE_CALENDAR_CONSTANTS.SCALE_UNSELECTED})`,
                            transition: `transform ${APPLE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${APPLE_CALENDAR_CONSTANTS.EASING}`,
                        }}
                        onClick={(e) => {
                            if (visibleItems.hasTopItem && !isDisabled) {
                                handleItemClick(validSelectedIndex - 1, e)
                            }
                        }}
                    >
                        <PrimitiveText
                            fontSize={
                                tokens.mobileDrawer.picker.text.unselected
                                    .fontSize
                            }
                            fontWeight={
                                tokens.mobileDrawer.picker.text.unselected
                                    .fontWeight
                            }
                            color={
                                tokens.mobileDrawer.picker.text.unselected.color
                            }
                            style={{
                                textAlign: 'center',
                                opacity:
                                    APPLE_CALENDAR_CONSTANTS.OPACITY_UNSELECTED,
                                userSelect: 'none',
                                transition: `opacity ${APPLE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${APPLE_CALENDAR_CONSTANTS.EASING}`,
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
                            transform: `scale(${APPLE_CALENDAR_CONSTANTS.SCALE_SELECTED})`,
                            transition: `transform ${APPLE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${APPLE_CALENDAR_CONSTANTS.EASING}`,
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
                                    transition: `opacity ${APPLE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${APPLE_CALENDAR_CONSTANTS.EASING}`,
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
                                fontSize={
                                    tokens.mobileDrawer.picker.text.selected
                                        .fontSize
                                }
                                fontWeight={
                                    tokens.mobileDrawer.picker.text.selected
                                        .fontWeight
                                }
                                color={
                                    tokens.mobileDrawer.picker.text.selected
                                        .color
                                }
                                style={{
                                    textAlign: 'center',
                                    opacity:
                                        APPLE_CALENDAR_CONSTANTS.OPACITY_SELECTED,
                                    userSelect: 'none',
                                    transition: `opacity ${APPLE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${APPLE_CALENDAR_CONSTANTS.EASING}`,
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
                            transform: `scale(${APPLE_CALENDAR_CONSTANTS.SCALE_UNSELECTED})`,
                            transition: `transform ${APPLE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${APPLE_CALENDAR_CONSTANTS.EASING}`,
                        }}
                        onClick={(e) => {
                            if (visibleItems.hasBottomItem && !isDisabled) {
                                handleItemClick(validSelectedIndex + 1, e)
                            }
                        }}
                    >
                        <PrimitiveText
                            fontSize={
                                tokens.mobileDrawer.picker.text.unselected
                                    .fontSize
                            }
                            fontWeight={
                                tokens.mobileDrawer.picker.text.unselected
                                    .fontWeight
                            }
                            color={
                                tokens.mobileDrawer.picker.text.unselected.color
                            }
                            style={{
                                textAlign: 'center',
                                opacity:
                                    APPLE_CALENDAR_CONSTANTS.OPACITY_UNSELECTED,
                                userSelect: 'none',
                                transition: `opacity ${APPLE_CALENDAR_CONSTANTS.TRANSITION_DURATION} ${APPLE_CALENDAR_CONSTANTS.EASING}`,
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
