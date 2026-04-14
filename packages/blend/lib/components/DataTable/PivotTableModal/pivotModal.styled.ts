import styled from 'styled-components'
import Block from '../../Primitives/Block/Block'

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
