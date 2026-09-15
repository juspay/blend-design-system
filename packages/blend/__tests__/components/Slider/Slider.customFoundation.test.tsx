import { describe, it, expect } from 'vitest'
import React from 'react'
import { render } from '../../test-utils'
import ThemeProvider from '../../../lib/context/ThemeProvider'
import { FOUNDATION_THEME } from '../../../lib/tokens'
import Slider from '../../../lib/components/Slider/Slider'
import { getSliderTokens } from '../../../lib/components/Slider/slider.tokens'
import {
    getSliderLabelStyles,
    getSliderTokenStyles,
} from '../../../lib/components/Slider/utils'
import { SliderSize, SliderVariant } from '../../../lib/components/Slider/types'
import type { ThemeType } from '../../../lib/tokens'

const renderSliderWithFoundation = (
    ui: React.ReactElement,
    foundation: ThemeType
) => {
    return render(
        <ThemeProvider foundationTokens={foundation}>{ui}</ThemeProvider>
    )
}

describe('Slider: custom foundation tokens via ThemeProvider', () => {
    it('reflects a custom primary color in the rendered range', () => {
        const customFoundation: ThemeType = {
            ...FOUNDATION_THEME,
            colors: {
                ...FOUNDATION_THEME.colors,
                primary: {
                    ...FOUNDATION_THEME.colors.primary,
                    500: 'rgb(1, 2, 3)',
                },
            },
        }

        // Sanity check on the token pipeline itself: under a custom foundation
        // the getter must now reflect the override — this was previously
        // impossible because Slider ignored foundationTokens entirely.
        const resolved = getSliderTokens(customFoundation).sm['primary']
            .rangeBackground as string
        expect(resolved).toBe('rgb(1, 2, 3)')

        const customStyles = getSliderTokenStyles(
            SliderVariant.PRIMARY,
            SliderSize.MEDIUM,
            getSliderTokens(customFoundation).sm
        )
        const focusShadow = customStyles.thumb['&:focus']?.boxShadow
        expect(focusShadow).toContain('color-mix')
        expect(focusShadow).not.toContain('rgb(1, 2, 3)20')
        expect(customStyles.thumb['&:focus']?.outline).toContain('rgb(1, 2, 3)')
        expect(customStyles.thumb['&:focus']?.outlineOffset).toBe('2px')

        // These helpers are part of the public Slider utility API. Their
        // original call signatures must continue to work without tokens.
        expect(
            getSliderTokenStyles(SliderVariant.PRIMARY, SliderSize.MEDIUM)
        ).toBeDefined()
        expect(getSliderLabelStyles()).toBeDefined()

        const { container } = renderSliderWithFoundation(
            <Slider defaultValue={[50]} />,
            customFoundation
        )

        // Radix Slider renders a thumb with role="slider"; styled-components fills in
        // the resolved range/thumb colors via the injected styles. We verify that:
        //  (a) a slider renders at all; and
        //  (b) its inline styled-component CSS includes our custom range color.
        const thumbs = container.querySelectorAll('[role="slider"]')
        expect(thumbs.length).toBeGreaterThan(0)

        // styled-components injects a <style> tag whose contents include the resolved
        // background color for the range. Searching the collected styles is more robust
        // than relying on a fixed attribute name.
        const allCss = Array.from(document.head.querySelectorAll('style'))
            .map((s) => s.textContent ?? '')
            .join('\n')

        expect(allCss).toContain('rgb(1, 2, 3)')
    })
})
