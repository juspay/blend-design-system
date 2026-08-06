import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../test-utils'
import ThemeProvider from '../../../lib/context/ThemeProvider'
import Select from '../../../lib/components/Select/Select'
import { getSelectTokens } from '../../../lib/components/Select/select.tokens'
import { FOUNDATION_THEME } from '../../../lib/tokens'

const items = [
    {
        items: [{ label: 'Apple', value: 'apple' }],
    },
]

describe('Select: custom component tokens via ThemeProvider', () => {
    it('applies the trigger focus background token', () => {
        const tokens = getSelectTokens(FOUNDATION_THEME)
        const focusBackgroundColor = 'rgb(1, 2, 3)'
        const customTokens = {
            sm: {
                ...tokens.sm,
                triggerColors: {
                    ...tokens.sm.triggerColors,
                    focusBackgroundColor,
                },
            },
            lg: {
                ...tokens.lg,
                triggerColors: {
                    ...tokens.lg.triggerColors,
                    focusBackgroundColor,
                },
            },
        }

        render(
            <ThemeProvider componentTokens={{ SELECT: customTokens }}>
                <Select
                    label="Fruit"
                    placeholder="Choose a fruit"
                    items={items}
                    selected=""
                    onSelectChange={() => {}}
                />
            </ThemeProvider>
        )

        expect(
            screen.getByRole('button', { name: 'Choose a fruit' })
        ).toHaveStyleRule('background-color', focusBackgroundColor, {
            modifier: ':focus',
        })
    })
})
