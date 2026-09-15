import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '../../test-utils'
import ThemeProvider from '../../../lib/context/ThemeProvider'
import DropdownInput from '../../../lib/components/Inputs/DropdownInput/DropdownInput'
import { getDropdownInputTokens } from '../../../lib/components/Inputs/DropdownInput/dropdownInput.tokens'
import UnitInput from '../../../lib/components/Inputs/UnitInput/UnitInput'
import { getUnitInputTokens } from '../../../lib/components/Inputs/UnitInput/unitInput.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'

describe('legacy component token compatibility', () => {
    it('renders DropdownInput when a custom token override predates placeholder', () => {
        const tokens = getDropdownInputTokens(FOUNDATION_THEME)
        const withoutPlaceholder = (block: (typeof tokens)['sm']) => {
            const legacyBlock = { ...block }
            delete legacyBlock.placeholder
            return legacyBlock
        }

        expect(() =>
            render(
                <ThemeProvider
                    componentTokens={{
                        DROPDOWN_INPUT: {
                            sm: withoutPlaceholder(tokens.sm),
                            lg: withoutPlaceholder(tokens.lg),
                        },
                    }}
                >
                    <DropdownInput
                        value=""
                        onChange={() => {}}
                        dropDownValue=""
                        onDropDownChange={() => {}}
                        dropDownItems={[]}
                    />
                </ThemeProvider>
            )
        ).not.toThrow()
    })

    it('renders UnitInput when a custom token override predates placeholder', () => {
        const tokens = getUnitInputTokens(FOUNDATION_THEME)
        const withoutPlaceholder = (block: (typeof tokens)['sm']) => {
            const legacyBlock = { ...block }
            delete legacyBlock.placeholder
            return legacyBlock
        }

        expect(() =>
            render(
                <ThemeProvider
                    componentTokens={{
                        UNIT_INPUT: {
                            sm: withoutPlaceholder(tokens.sm),
                            lg: withoutPlaceholder(tokens.lg),
                        },
                    }}
                >
                    <UnitInput
                        value={undefined}
                        onChange={() => {}}
                        unit="USD"
                    />
                </ThemeProvider>
            )
        ).not.toThrow()
    })
})
