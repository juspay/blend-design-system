import { forwardRef } from 'react'
import { styled } from 'styled-components'
import { getChevronTransform, getChevronSize } from './utils'
import {
    ChevronAnimationProps,
    ChevronAnimationDirection,
    ChevronAnimationVariant,
    ChevronAnimationSize,
} from './types'

const StyledChevronContainer = styled.div<{
    $isOpen: boolean
    $direction: ChevronAnimationDirection
    $variant: ChevronAnimationVariant
    $size: ChevronAnimationSize
    $disabled: boolean
    $animationDuration: number
    $color?: string
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform ${(props) => props.$animationDuration}ms
        cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform-origin: center;
    color: ${(props) => props.$color || 'inherit'};
    width: ${(props) => getChevronSize(props.$size)};
    height: ${(props) => getChevronSize(props.$size)};

    /* Initial state - closed */
    transform: ${(props) =>
        getChevronTransform(props.$direction, props.$variant, false)};

    /* Radix UI data-state support with smooth transitions */
    [data-state='open'] & {
        transform: ${(props) =>
            getChevronTransform(props.$direction, props.$variant, true)};
    }

    [data-state='closed'] & {
        transform: ${(props) =>
            getChevronTransform(props.$direction, props.$variant, false)};
    }

    /* Disabled state */
    ${(props) =>
        props.$disabled &&
        `
        opacity: 0.5;
        cursor: not-allowed;
    `}

    /* Subtle hover effect */
    &:hover:not([data-disabled="true"]) {
        transform: ${(props) =>
                getChevronTransform(
                    props.$direction,
                    props.$variant,
                    props.$isOpen
                )}
            scale(1.05);
        transition: transform ${(props) => props.$animationDuration}ms
            cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Focus styles for accessibility */
    &:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
        border-radius: 2px;
    }

    /* Respect reduced motion preferences */
    @media (prefers-reduced-motion: reduce) {
        transition: none;
        &:hover:not([data-disabled='true']) {
            transform: ${(props) =>
                getChevronTransform(
                    props.$direction,
                    props.$variant,
                    props.$isOpen
                )};
        }
    }
`

const ChevronAnimation = forwardRef<HTMLDivElement, ChevronAnimationProps>(
    (
        {
            children,
            isOpen = false,
            direction = ChevronAnimationDirection.DOWN,
            variant = ChevronAnimationVariant.ROTATE_180,
            size = ChevronAnimationSize.MEDIUM,
            color,
            className,
            animationDuration = 300,
            disabled = false,
        },
        ref
    ) => {
        return (
            <StyledChevronContainer
                ref={ref}
                $isOpen={isOpen}
                $direction={direction}
                $variant={variant}
                $size={size}
                $disabled={disabled}
                $animationDuration={animationDuration}
                $color={color}
                className={className}
                data-state={isOpen ? 'open' : 'closed'}
                data-disabled={disabled || undefined}
                role="img"
                aria-hidden="true"
            >
                {children}
            </StyledChevronContainer>
        )
    }
)

ChevronAnimation.displayName = 'ChevronAnimation'

export default ChevronAnimation
