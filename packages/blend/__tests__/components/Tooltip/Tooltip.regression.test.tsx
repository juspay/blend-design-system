import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { Tooltip } from '../../../lib/components/Tooltip/Tooltip'
import { TooltipV2 } from '../../../lib/components/TooltipV2/TooltipV2'

const RowLabel = ({ text }: { text: string }) => (
    <div data-testid="row-label">{text}</div>
)

describe('Tooltip React 19 mount regression', () => {
    it('does not exceed update depth when many non-native Tooltip triggers mount', () => {
        expect(() => {
            render(
                <div>
                    {Array.from({ length: 40 }, (_, index) => (
                        <Tooltip
                            key={index}
                            content={`Full filter name ${index}`}
                        >
                            <RowLabel
                                text={`truncated-filter-label-${index}`}
                            />
                        </Tooltip>
                    ))}
                </div>
            )
        }).not.toThrow()

        expect(screen.getAllByTestId('row-label')).toHaveLength(40)
    })

    it('does not exceed update depth when many non-native TooltipV2 triggers mount', () => {
        expect(() => {
            render(
                <div>
                    {Array.from({ length: 40 }, (_, index) => (
                        <TooltipV2
                            key={index}
                            content={`Full filter name ${index}`}
                        >
                            <RowLabel
                                text={`truncated-filter-label-v2-${index}`}
                            />
                        </TooltipV2>
                    ))}
                </div>
            )
        }).not.toThrow()

        expect(screen.getAllByTestId('row-label')).toHaveLength(40)
    })
})
