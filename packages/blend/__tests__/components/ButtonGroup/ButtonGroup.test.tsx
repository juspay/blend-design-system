import { describe, expect, it } from 'vitest'
import { render } from '../../test-utils'
import ButtonGroup from '../../../lib/components/ButtonGroup/ButtonGroup'
import Button from '../../../lib/components/Button/Button'
import { ButtonType } from '../../../lib/components/Button/types'
import ThemeProvider from '../../../lib/context/ThemeProvider'
import { Theme } from '../../../lib/context/theme.enum'
import FOUNDATION_THEME from '../../../lib/tokens/theme.token'

const renderButtonGroup = (theme: Theme) =>
    render(
        <ThemeProvider theme={theme}>
            <ButtonGroup stacked>
                <Button text="First" buttonType={ButtonType.SECONDARY} />
                <Button text="Second" buttonType={ButtonType.SECONDARY} />
                <Button text="Third" buttonType={ButtonType.SECONDARY} />
            </ButtonGroup>
        </ThemeProvider>
    )

describe('ButtonGroup separators', () => {
    it.each([
        [Theme.LIGHT, FOUNDATION_THEME.colors.gray[200]],
        [Theme.DARK, FOUNDATION_THEME.colors.gray[700]],
    ])('renders the %s separator token', (theme, color) => {
        const { container } = renderButtonGroup(theme)
        const separators = container.querySelectorAll(
            '[data-button-group-separator="true"]'
        )

        expect(separators).toHaveLength(2)
        separators.forEach((separator) => {
            expect(separator).toHaveStyleRule(
                'border-left',
                `${FOUNDATION_THEME.border.width[1]} solid ${color}`
            )
        })
    })

    it.each([Theme.LIGHT, Theme.DARK])(
        'uses the %s default gap without separators for non-stacked groups',
        (theme) => {
            const { container } = render(
                <ThemeProvider theme={theme}>
                    <ButtonGroup>
                        <Button
                            text="First"
                            buttonType={ButtonType.SECONDARY}
                        />
                        <Button
                            text="Second"
                            buttonType={ButtonType.SECONDARY}
                        />
                    </ButtonGroup>
                </ThemeProvider>
            )

            const group = container.querySelector('[data-button-group="true"]')

            expect(group).toHaveAttribute('data-button-group-stacked', 'false')
            expect(group).toHaveStyleRule('gap', FOUNDATION_THEME.unit[10])
            expect(
                container.querySelectorAll(
                    '[data-button-group-separator="true"]'
                )
            ).toHaveLength(0)
        }
    )
})
