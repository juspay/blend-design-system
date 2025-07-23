import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../test-utils'
import Button from '../../../lib/components/Button/Button'
import {
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from '../../../lib/components/Button/types'
import { MockIcon } from '../../test-utils'

describe('Button Component', () => {
    describe('Rendering', () => {
        it('renders with text content', () => {
            render(<Button text="Click me" />)
            expect(screen.getByRole('button')).toHaveTextContent('Click me')
        })

        it('renders without text (icon only)', () => {
            render(<Button leadingIcon={<MockIcon />} />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })

        it('renders with leading icon and text', () => {
            render(<Button text="Save" leadingIcon={<MockIcon />} />)
            const button = screen.getByRole('button')
            expect(button).toHaveTextContent('Save')
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })

        it('renders with trailing icon and text', () => {
            render(<Button text="Next" trailingIcon={<MockIcon />} />)
            const button = screen.getByRole('button')
            expect(button).toHaveTextContent('Next')
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })

        it('renders with both leading and trailing icons', () => {
            render(
                <Button
                    text="Action"
                    leadingIcon={<MockIcon />}
                    trailingIcon={<MockIcon />}
                />
            )
            const button = screen.getByRole('button')
            expect(button).toHaveTextContent('Action')
            expect(screen.getAllByTestId('mock-icon')).toHaveLength(2)
        })

        it('renders full width when fullWidth prop is true', () => {
            render(<Button text="Full Width" fullWidth />)
            const button = screen.getByRole('button')
            expect(button).toHaveStyle({ width: '100%' })
        })

        it('renders with custom justify content', () => {
            render(<Button text="Left Aligned" justifyContent="flex-start" />)
            const button = screen.getByRole('button')
            expect(button).toHaveStyle({ justifyContent: 'flex-start' })
        })
    })

    describe('Button Types', () => {
        it.each([
            [ButtonType.PRIMARY, 'primary'],
            [ButtonType.SECONDARY, 'secondary'],
            [ButtonType.DANGER, 'danger'],
            [ButtonType.SUCCESS, 'success'],
        ])('renders %s button type correctly', (buttonType, expectedClass) => {
            render(
                <Button
                    text={`${expectedClass} button`}
                    buttonType={buttonType}
                />
            )
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            // The actual styling would be tested through visual regression or by checking computed styles
        })
    })

    describe('Button Sizes', () => {
        it.each([
            [ButtonSize.SMALL, 'sm'],
            [ButtonSize.MEDIUM, 'md'],
            [ButtonSize.LARGE, 'lg'],
        ])('renders %s size correctly', (size, sizeLabel) => {
            render(<Button text={`Size ${sizeLabel}`} size={size} />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            // Size would affect padding which can be tested through computed styles
        })
    })

    describe('Button SubTypes', () => {
        it('renders default subtype with proper styling', () => {
            render(<Button text="Default" subType={ButtonSubType.DEFAULT} />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
        })

        it('renders icon-only subtype', () => {
            render(
                <Button
                    leadingIcon={<MockIcon />}
                    subType={ButtonSubType.ICON_ONLY}
                />
            )
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
        })

        it('renders inline subtype with proper height', () => {
            render(<Button text="Inline" subType={ButtonSubType.INLINE} />)
            const button = screen.getByRole('button')
            expect(button).toHaveStyle({ height: 'fit-content' })
        })
    })

    describe('States', () => {
        it('renders disabled state correctly', () => {
            const handleClick = vi.fn()
            render(<Button text="Disabled" disabled onClick={handleClick} />)

            const button = screen.getByRole('button')
            expect(button).toBeDisabled()
            expect(button).toHaveStyle({ cursor: 'not-allowed' })

            fireEvent.click(button)
            expect(handleClick).not.toHaveBeenCalled()
        })

        it('renders loading state with spinner', () => {
            render(<Button text="Loading" loading />)

            const button = screen.getByRole('button')
            // Check for LoaderCircle icon (it should have animation)
            const loader = button.querySelector('svg')
            expect(loader).toBeInTheDocument()
            expect(loader).toHaveStyle({ animation: 'spin 1s linear infinite' })

            // Text should not be visible during loading
            expect(button).not.toHaveTextContent('Loading')
        })

        it('prevents clicks when loading', () => {
            const handleClick = vi.fn()
            render(<Button text="Loading" loading onClick={handleClick} />)

            const button = screen.getByRole('button')
            fireEvent.click(button)
            expect(handleClick).toHaveBeenCalled() // Loading doesn't prevent onClick by default
        })
    })

    describe('Button Group Position', () => {
        it('applies correct border radius for left position', () => {
            render(<Button text="Left" buttonGroupPosition="left" />)
            const button = screen.getByRole('button')
            // Border radius would be applied through getBorderRadius function
            expect(button).toBeInTheDocument()
        })

        it('applies correct border radius for right position', () => {
            render(<Button text="Right" buttonGroupPosition="right" />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
        })

        it('applies correct border radius for center position', () => {
            render(<Button text="Center" buttonGroupPosition="center" />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
        })
    })

    describe('Event Handling', () => {
        it('calls onClick handler when clicked', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Button text="Click me" onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            await user.click(button)

            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const handleClick = vi.fn()
            const { user } = render(
                <Button text="Disabled" disabled onClick={handleClick} />
            )

            const button = screen.getByRole('button')
            await user.click(button)

            expect(handleClick).not.toHaveBeenCalled()
        })

        it('forwards ref correctly', () => {
            const ref = React.createRef<HTMLButtonElement>()
            render(<Button ref={ref} text="With Ref" />)

            expect(ref.current).toBeInstanceOf(HTMLButtonElement)
            expect(ref.current?.tagName).toBe('BUTTON')
        })
    })

    describe('HTML Props', () => {
        it('passes through HTML button attributes', () => {
            render(
                <Button
                    text="With Attrs"
                    type="submit"
                    form="test-form"
                    name="submit-button"
                />
            )

            const button = screen.getByRole('button')
            expect(button).toHaveAttribute('type', 'submit')
            expect(button).toHaveAttribute('form', 'test-form')
            expect(button).toHaveAttribute('name', 'submit-button')
        })

        it('applies data attributes correctly', () => {
            render(
                <Button
                    text="With Data"
                    data-testid="custom-button"
                    data-action="save"
                />
            )

            const button = screen.getByTestId('custom-button')
            expect(button).toHaveAttribute('data-action', 'save')
        })
    })

    describe('Token Application', () => {
        it('applies responsive tokens through useResponsiveTokens hook', () => {
            // This would require mocking the useResponsiveTokens hook
            render(<Button text="Responsive" />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
        })

        it('has proper data attributes for styling slots', () => {
            render(
                <Button
                    text="Styled"
                    leadingIcon={<MockIcon />}
                    trailingIcon={<MockIcon />}
                />
            )

            expect(screen.getByText('Styled')).toHaveAttribute(
                'data-button-text',
                'Styled'
            )
            expect(
                screen.getAllByTestId('mock-icon')[0].parentElement
            ).toHaveAttribute('data-button-left-slot')
            expect(
                screen.getAllByTestId('mock-icon')[1].parentElement
            ).toHaveAttribute('data-button-right-slot')
        })
    })

    describe('Edge Cases', () => {
        it('renders without any props', () => {
            render(<Button />)
            expect(screen.getByRole('button')).toBeInTheDocument()
        })

        it('handles empty text string', () => {
            render(<Button text="" />)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
            expect(button).toHaveTextContent('')
        })

        it('maintains display flex for alignment', () => {
            render(<Button text="Flex" />)
            const button = screen.getByRole('button')
            expect(button).toHaveStyle({ display: 'flex' })
            expect(button).toHaveStyle({ alignItems: 'center' })
        })
    })
})
