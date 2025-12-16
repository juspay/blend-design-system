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

    /* Initial state based on isOpen prop */
    transform: ${(props) =>
        getChevronTransform(props.$direction, props.$variant, props.$isOpen)};

    /* Radix UI data-state support - check parent trigger's data-state */
    /* When parent trigger has data-state="open" */
    button[data-state='open'] &,
    [role='button'][data-state='open'] & {
        transform: ${(props) =>
            getChevronTransform(props.$direction, props.$variant, true)};
    }

    /* When parent trigger has data-state="closed" */
    button[data-state='closed'] &,
    [role='button'][data-state='closed'] & {
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

    /* Hover effect - only scale, maintain rotation from parent trigger's data-state */
    /* When chevron is hovered AND parent trigger has data-state="open" - keep open rotation, add scale */
    button[data-state='open'] &:hover:not([data-disabled="true"]),
    [role='button'][data-state='open'] &:hover:not([data-disabled="true"]) {
        transform: ${(props) =>
                getChevronTransform(props.$direction, props.$variant, true)}
            scale(1.05);
    }

    /* When chevron is hovered AND parent trigger has data-state="closed" - keep closed rotation, add scale */
    button[data-state='closed'] &:hover:not([data-disabled='true']),
    [role='button'][data-state='closed'] &:hover:not([data-disabled='true']) {
        transform: ${(props) =>
                getChevronTransform(props.$direction, props.$variant, false)}
            scale(1.05);
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
            transform: inherit;
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
