import { describe, it, expect } from 'vitest'
import { FOUNDATION_THEME } from '../../lib/tokens'
import { Theme } from '../../lib/context/theme.enum'

import { getTagTokens } from '../../lib/components/Tags/tag.tokens'
import { getBadgeTokens } from '../../lib/components/Badge/badge.tokens'
import { getTimelineTokens } from '../../lib/components/Timeline/timeline.token'
import { getUnitInputTokens } from '../../lib/components/Inputs/UnitInput/unitInput.tokens'
import { getDropdownInputTokens } from '../../lib/components/Inputs/DropdownInput/dropdownInput.tokens'
import { getSelectTokens } from '../../lib/components/Select/select.tokens'
import { getSliderTokens } from '../../lib/components/Slider/slider.tokens'

describe('Token theme dispatch', () => {
    it('no-theme call returns the light tokens for every retrofitted getter', () => {
        expect(getTagTokens(FOUNDATION_THEME)).toEqual(
            getTagTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getBadgeTokens(FOUNDATION_THEME)).toEqual(
            getBadgeTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getTimelineTokens(FOUNDATION_THEME)).toEqual(
            getTimelineTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getUnitInputTokens(FOUNDATION_THEME)).toEqual(
            getUnitInputTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getDropdownInputTokens(FOUNDATION_THEME)).toEqual(
            getDropdownInputTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getSelectTokens(FOUNDATION_THEME)).toEqual(
            getSelectTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getSliderTokens(FOUNDATION_THEME)).toEqual(
            getSliderTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
    })

    it('no-theme call snapshot remains byte-identical to the pre-change values', () => {
        expect(getTagTokens(FOUNDATION_THEME)).toMatchSnapshot('tag.light')
        expect(getBadgeTokens(FOUNDATION_THEME)).toMatchSnapshot('badge.light')
        expect(getTimelineTokens(FOUNDATION_THEME)).toMatchSnapshot(
            'timeline.light'
        )
        expect(getUnitInputTokens(FOUNDATION_THEME)).toMatchSnapshot(
            'unitinput.light'
        )
        expect(getDropdownInputTokens(FOUNDATION_THEME)).toMatchSnapshot(
            'dropdowninput.light'
        )
        expect(getSelectTokens(FOUNDATION_THEME)).toMatchSnapshot(
            'select.light'
        )
        expect(getSliderTokens(FOUNDATION_THEME)).toMatchSnapshot(
            'slider.light'
        )
    })

    it('dark theme produces a different token object for every retrofitted getter', () => {
        expect(getTagTokens(FOUNDATION_THEME, Theme.DARK)).not.toBe(
            getTagTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getBadgeTokens(FOUNDATION_THEME, Theme.DARK)).not.toBe(
            getBadgeTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getTimelineTokens(FOUNDATION_THEME, Theme.DARK)).not.toBe(
            getTimelineTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getUnitInputTokens(FOUNDATION_THEME, Theme.DARK)).not.toBe(
            getUnitInputTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getDropdownInputTokens(FOUNDATION_THEME, Theme.DARK)).not.toBe(
            getDropdownInputTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getSelectTokens(FOUNDATION_THEME, Theme.DARK)).not.toBe(
            getSelectTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
        expect(getSliderTokens(FOUNDATION_THEME, Theme.DARK)).not.toBe(
            getSliderTokens(FOUNDATION_THEME, Theme.LIGHT)
        )
    })
})
