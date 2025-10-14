import React from 'react'
import styled, { keyframes } from 'styled-components'
import Block from '../Primitives/Block/Block'
import type { RippleElement } from '../../hooks/useRipple'

const rippleAnimation = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`

const RippleSpan = styled.span<{ x: number; y: number; size: number }>`
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ${rippleAnimation} 600ms linear;
    background-color: rgba(255, 255, 255, 0.7);
    pointer-events: none;
    left: ${(props) => props.x}px;
    top: ${(props) => props.y}px;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
`

type RippleContainerProps = {
    ripples: RippleElement[]
}

const RippleContainer: React.FC<RippleContainerProps> = ({ ripples }) => {
    if (ripples.length === 0) return null

    return (
        <Block
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            overflow="hidden"
            borderRadius="inherit"
            pointerEvents="none"
        >
            {ripples.map((ripple) => (
                <RippleSpan
                    key={ripple.id}
                    x={ripple.x}
                    y={ripple.y}
                    size={ripple.size}
                />
            ))}
        </Block>
    )
}

export default RippleContainer
