import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import type { MockInstance } from 'vitest'
import { act, render, waitFor } from '../../test-utils'
import KeyValuePairV2 from '../../../lib/components/KeyValuePairV2/KeyValuePairV2'

const TRUNCATION_CHECK_SETTLE_MS = 50

const dimensionSpies: MockInstance[] = []

const mockTruncated = () => {
    dimensionSpies.push(
        vi
            .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
            .mockReturnValue(200),
        vi
            .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
            .mockReturnValue(100)
    )
}

const settleTruncationChecks = async () => {
    await act(async () => {
        await new Promise((resolve) =>
            setTimeout(resolve, TRUNCATION_CHECK_SETTLE_MS)
        )
    })
}

const longKey = 'Enable Gateway Reference Id Based Routing Configuration'
const longValue = 'averylongconfigurationvaluethatdefinitelytruncates'

describe('KeyValuePairV2: tooltip on truncation (#1416)', () => {
    afterEach(() => {
        dimensionSpies.forEach((spy) => spy.mockRestore())
        dimensionSpies.length = 0
    })

    it('wraps a truncated key in a Tooltip trigger', async () => {
        mockTruncated()
        const { container } = render(
            <KeyValuePairV2 keyString={longKey} value={longValue} />
        )

        await waitFor(() => {
            expect(
                container.querySelector('[data-element="key"] [data-state]')
            ).not.toBeNull()
        })
    })

    it('keeps the tooltip on a truncated value', async () => {
        mockTruncated()
        const { container } = render(
            <KeyValuePairV2 keyString={longKey} value={longValue} />
        )

        await waitFor(() => {
            expect(
                container.querySelector('[data-element="value"] [data-state]')
            ).not.toBeNull()
        })
    })

    it('does not show tooltips on either slot when showTooltipOnTruncate is false', async () => {
        mockTruncated()
        const { container } = render(
            <KeyValuePairV2
                keyString={longKey}
                value={longValue}
                showTooltipOnTruncate={false}
            />
        )

        await settleTruncationChecks()
        expect(
            container.querySelector('[data-keyvaluepair] [data-state]')
        ).toBeNull()
    })

    it('does not show tooltips when text is not truncated', async () => {
        const { container } = render(
            <KeyValuePairV2 keyString="Status" value="Active" />
        )

        await settleTruncationChecks()
        expect(
            container.querySelector('[data-keyvaluepair] [data-state]')
        ).toBeNull()
    })
})
