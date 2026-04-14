import styled from 'styled-components'
import Block from '../../Primitives/Block/Block'
import type { PivotModalStyleTokens } from './pivotModalStyleTokens'

/**
 * Scroll region without visible scrollbars (preview + config panels).
 */
export const NoScrollbar = styled(Block)`
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`

type FieldChipProps = { $pivot: PivotModalStyleTokens }

/**
 * Selected-field chip; hover elevation from pivot modal tokens.
 */
export const FieldChip = styled(Block)<FieldChipProps>`
    transition: ${({ $pivot }) => $pivot.chip.transition};
    &:hover {
        transform: translateY(${({ $pivot }) => $pivot.chip.hoverTranslateY});
        box-shadow: ${({ $pivot }) => $pivot.chip.hoverShadow};
    }
`
