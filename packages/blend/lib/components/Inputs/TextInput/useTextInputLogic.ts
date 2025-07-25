import { useRef, useState, useEffect } from 'react'
import { useBreakpoints } from '../../../hooks/useBreakPoints'
import { BREAKPOINTS } from '../../../breakpoints/breakPoints'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { TextInputSize, type TextInputProps } from './types'
import type { TextInputTokensType } from './textInput.tokens'
import { toPixels } from '../../../global-utils/GlobalUtils'

export const useTextInputLogic = ({
    size = TextInputSize.MEDIUM,
    leftSlot,
    rightSlot,
    value,
}: Pick<TextInputProps, 'size' | 'leftSlot' | 'rightSlot' | 'value'>) => {
    const textInputTokens =
        useResponsiveTokens<TextInputTokensType>('TEXT_INPUT')
    const leftSlotRef = useRef<HTMLDivElement>(null)
    const rightSlotRef = useRef<HTMLDivElement>(null)
    const labelRef = useRef<HTMLDivElement>(null)
    const [leftSlotWidth, setLeftSlotWidth] = useState(0)
    const [rightSlotWidth, setRightSlotWidth] = useState(0)
    const [labelHeight, setLabelHeight] = useState(0)
    const [fontSize, setFontSize] = useState('14px')
    const [isFocused, setIsFocused] = useState(false)
    const [paddingTop, setPaddingTop] = useState(0)

    const { breakPointLabel } = useBreakpoints(BREAKPOINTS)
    const isSmallScreen = breakPointLabel === 'sm'

    const paddingX = toPixels(textInputTokens.input.paddingX[size])
    const paddingY = toPixels(textInputTokens.input.paddingY[size])
    const GAP = toPixels(textInputTokens.input.gap)

    const paddingInlineStart = leftSlot
        ? paddingX + leftSlotWidth + GAP
        : paddingX
    const paddingInlineEnd = rightSlot
        ? paddingX + rightSlotWidth + GAP
        : paddingX

    const getSmallScreenLargeInputProps = () => {
        if (isSmallScreen && size === TextInputSize.LARGE) {
            return {
                onFocus: () => {
                    setIsFocused(true)
                    setFontSize('14px')
                },
                onBlur: () => {
                    if (!value) {
                        setIsFocused(false)
                        setFontSize('0px')
                    }
                },
            }
        }
        return {}
    }

    useEffect(() => {
        if (isSmallScreen && size === TextInputSize.LARGE) {
            setPaddingTop(paddingY + labelHeight)
        } else {
            setPaddingTop(paddingY)
        }
    }, [isSmallScreen, size, labelHeight, paddingY])

    useEffect(() => {
        if (leftSlotRef.current) {
            setLeftSlotWidth(leftSlotRef.current.offsetWidth)
        } else {
            setLeftSlotWidth(0)
        }
        if (rightSlotRef.current) {
            setRightSlotWidth(rightSlotRef.current.offsetWidth)
        } else {
            setRightSlotWidth(0)
        }
        if (labelRef.current) {
            setLabelHeight(labelRef.current.offsetHeight)
        } else {
            setLabelHeight(0)
        }
    }, [leftSlot, rightSlot, size, isSmallScreen])

    useEffect(() => {
        if (isSmallScreen && size === TextInputSize.LARGE && !value) {
            setFontSize('0px')
        } else {
            setFontSize('14px')
        }
    }, [isSmallScreen, size, value])

    return {
        textInputTokens,
        leftSlotRef,
        rightSlotRef,
        labelRef,
        isSmallScreen,
        paddingX,
        paddingY,
        GAP,
        paddingInlineStart,
        paddingInlineEnd,
        paddingTop,
        fontSize,
        isFocused,
        labelHeight,
        leftSlotWidth,
        getSmallScreenLargeInputProps,
    }
}
