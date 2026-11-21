import { beforeEach, describe, it, expect, vi } from 'vitest'
import type { HighchartsReactProps } from 'highcharts-react-official'
import { render } from '../../test-utils'
import ChartV2 from '../../../lib/components/ChartsV2/ChartV2'

const HighchartsReactSpy = vi.hoisted(() =>
    vi.fn((props: HighchartsReactProps) => {
        void props
        return null
    })
)
vi.mock('highcharts-react-official', () => ({
    __esModule: true,
    HighchartsReact: HighchartsReactSpy,
    default: HighchartsReactSpy,
}))

const OPTIONS = { series: [{ type: 'line' as const, data: [1, 2, 3] }] }

const lastLang = () =>
    (
        HighchartsReactSpy.mock.calls.at(-1)?.[0].options as {
            lang?: { locale?: string }
        }
    )?.lang

/**
 * Highcharts 12 picks its locale from `lang.locale`, then `<html lang>`, then
 * the browser. ChartV2 forwards the Blend locale only when the app set one,
 * so apps relying on `<html lang>` today are unaffected.
 */
describe('ChartV2 locale forwarding', () => {
    beforeEach(() => {
        HighchartsReactSpy.mockClear()
    })

    it('leaves lang untouched with no provider locale', () => {
        render(<ChartV2 options={OPTIONS} />)

        expect(lastLang()).toBeUndefined()
    })

    it('forwards a non-default provider locale to lang.locale', () => {
        render(<ChartV2 options={OPTIONS} />, {
            providerProps: { locale: 'fr-FR' },
        })

        expect(lastLang()?.locale).toBe('fr-FR')
    })

    it('keeps an explicit lang.locale from the consumer', () => {
        render(
            <ChartV2 options={{ ...OPTIONS, lang: { locale: 'de-DE' } }} />,
            { providerProps: { locale: 'fr-FR' } }
        )

        expect(lastLang()?.locale).toBe('de-DE')
    })
})
