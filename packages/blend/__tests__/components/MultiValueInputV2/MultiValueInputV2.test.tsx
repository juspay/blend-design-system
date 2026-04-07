import React, { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act, MockIcon } from '../../test-utils'
import MultiValueInputV2 from '../../../lib/components/InputsV2/MultiValueInputV2/MultiValueInputV2'
import { InputSizeV2 } from '../../../lib/components/InputsV2/inputV2.types'
import { TagShape, TagSize, TagVariant } from '../../../lib/components/Tags'

function tagsConfig(
    value: string[] = [],
    handlers?: {
        onTagAdd?: (tag: string) => void
        onTagRemove?: (tag: string) => void
    }
) {
    return {
        value,
        size: TagSize.XS,
        shape: TagShape.ROUNDED,
        variant: TagVariant.SUBTLE,
        ...handlers,
    }
}

/** Controlled harness for interaction tests */
function ControlledMultiValueInput(
    props: Omit<
        React.ComponentProps<typeof MultiValueInputV2>,
        'value' | 'tags' | 'onChange'
    > & {
        initialValue?: string
        initialTags?: string[]
    }
) {
    const { initialValue = '', initialTags = [], ...rest } = props
    const [value, setValue] = useState(initialValue)
    const [tagValues, setTagValues] = useState(initialTags)
    return (
        <MultiValueInputV2
            {...rest}
            value={value}
            onChange={setValue}
            tags={tagsConfig(tagValues, {
                onTagAdd: (tag) => {
                    setTagValues((t) => [...t, tag])
                    setValue('')
                },
                onTagRemove: (tag) =>
                    setTagValues((t) => t.filter((x) => x !== tag)),
            })}
        />
    )
}

describe('MultiValueInputV2 Component', () => {
    describe('Rendering', () => {
        it('renders with label and textbox', () => {
            render(
                <MultiValueInputV2 label="Tags" value="" onChange={() => {}} />
            )
            expect(screen.getByText('Tags')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('renders with sublabel', () => {
            render(
                <MultiValueInputV2
                    label="Skills"
                    sublabel="Comma-separated via Enter"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Skills')).toBeInTheDocument()
            expect(
                screen.getByText(/Comma-separated via Enter/)
            ).toBeInTheDocument()
        })

        it('renders without label', () => {
            render(<MultiValueInputV2 value="" onChange={() => {}} />)
            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('renders placeholder', () => {
            render(
                <MultiValueInputV2
                    label="Tags"
                    placeholder="Add a tag"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                'Add a tag'
            )
        })

        it('renders tag labels', () => {
            render(
                <MultiValueInputV2
                    label="Tags"
                    value=""
                    tags={tagsConfig(['Alpha', 'Beta'])}
                    onChange={() => {}}
                />
            )
            expect(screen.getByText('Alpha')).toBeInTheDocument()
            expect(screen.getByText('Beta')).toBeInTheDocument()
        })

        it('renders required indicator', () => {
            render(
                <MultiValueInputV2
                    label="Required"
                    value=""
                    onChange={() => {}}
                    required
                />
            )
            expect(screen.getByText('*')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-required',
                'true'
            )
        })

        it('renders hint text when not in error', () => {
            render(
                <MultiValueInputV2
                    label="Field"
                    value=""
                    onChange={() => {}}
                    hintText="Press Enter to add"
                />
            )
            expect(screen.getByText('Press Enter to add')).toBeInTheDocument()
        })

        it('renders left and right slots', () => {
            render(
                <MultiValueInputV2
                    label="With slots"
                    value=""
                    onChange={() => {}}
                    leftSlot={<MockIcon />}
                    rightSlot={<MockIcon />}
                />
            )
            expect(screen.getAllByTestId('mock-icon')).toHaveLength(2)
            expect(
                document.querySelector('[data-element="left-slot"]')
            ).toBeInTheDocument()
            expect(
                document.querySelector('[data-element="right-slot"]')
            ).toBeInTheDocument()
        })
    })

    describe('Input states', () => {
        it('renders disabled input', () => {
            render(
                <MultiValueInputV2
                    label="Disabled"
                    value=""
                    tags={tagsConfig(['x'])}
                    onChange={() => {}}
                    disabled
                />
            )
            expect(screen.getByRole('textbox')).toBeDisabled()
        })

        it('disables tag remove buttons when disabled', () => {
            const onTagRemove = vi.fn()
            render(
                <MultiValueInputV2
                    label="Disabled"
                    value=""
                    tags={tagsConfig(['alpha'], { onTagRemove })}
                    onChange={() => {}}
                    disabled
                />
            )
            expect(
                screen.getByRole('button', { name: 'Remove alpha' })
            ).toBeDisabled()
        })

        it('does not call onTagRemove when clicking disabled remove control', async () => {
            const onTagRemove = vi.fn()
            const { user } = render(
                <MultiValueInputV2
                    label="Disabled"
                    value=""
                    tags={tagsConfig(['alpha'], { onTagRemove })}
                    onChange={() => {}}
                    disabled
                />
            )
            await user.click(
                screen.getByRole('button', { name: 'Remove alpha' })
            )
            expect(onTagRemove).not.toHaveBeenCalled()
        })

        it('renders error message and aria-invalid', () => {
            render(
                <MultiValueInputV2
                    label="Emails"
                    value=""
                    onChange={() => {}}
                    error
                    errorMessage="Invalid value"
                />
            )
            expect(screen.getByText('Invalid value')).toBeInTheDocument()
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'true'
            )
        })

        it('renders aria-invalid false when no error', () => {
            render(
                <MultiValueInputV2 label="Ok" value="" onChange={() => {}} />
            )
            expect(screen.getByRole('textbox')).toHaveAttribute(
                'aria-invalid',
                'false'
            )
        })
    })

    describe('Size variants', () => {
        it.each([InputSizeV2.SM, InputSizeV2.MD, InputSizeV2.LG])(
            'renders for size %s',
            (size) => {
                const { unmount } = render(
                    <MultiValueInputV2
                        label={size}
                        value=""
                        onChange={() => {}}
                        size={size}
                    />
                )
                expect(screen.getByRole('textbox')).toBeInTheDocument()
                unmount()
            }
        )
    })

    describe('Controlled behavior', () => {
        it('displays controlled value', () => {
            render(
                <MultiValueInputV2
                    label="Controlled"
                    value="typing"
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('textbox')).toHaveValue('typing')
        })

        it('calls onChange when user types', async () => {
            const handleChange = vi.fn()
            const { user } = render(
                <MultiValueInputV2
                    label="Type"
                    value=""
                    onChange={handleChange}
                />
            )
            const input = screen.getByRole('textbox')
            await user.type(input, 'hi')
            expect(handleChange).toHaveBeenCalled()
        })

        it('updates when value prop changes', () => {
            const { rerender } = render(
                <MultiValueInputV2
                    label="Rerender"
                    value=""
                    onChange={() => {}}
                />
            )
            rerender(
                <MultiValueInputV2
                    label="Rerender"
                    value="next"
                    onChange={() => {}}
                />
            )
            expect(screen.getByRole('textbox')).toHaveValue('next')
        })
    })

    describe('Tags: keyboard', () => {
        it('calls onTagAdd when Enter commits non-empty value', async () => {
            const onTagAdd = vi.fn()
            const { user } = render(
                <MultiValueInputV2
                    label="Tags"
                    value="new-tag"
                    tags={tagsConfig([], { onTagAdd })}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            await user.click(input)
            await user.keyboard('{Enter}')
            expect(onTagAdd).toHaveBeenCalledTimes(1)
            expect(onTagAdd).toHaveBeenCalledWith('new-tag')
        })

        it('does not add duplicate tags', async () => {
            const onTagAdd = vi.fn()
            const { user } = render(
                <MultiValueInputV2
                    label="Tags"
                    value="dup"
                    tags={tagsConfig(['dup'], { onTagAdd })}
                    onChange={() => {}}
                />
            )
            await user.keyboard('{Enter}')
            expect(onTagAdd).not.toHaveBeenCalled()
        })

        it('trims whitespace before add on Enter', async () => {
            const onTagAdd = vi.fn()
            const { user } = render(
                <MultiValueInputV2
                    label="Tags"
                    value="  trimmed  "
                    tags={tagsConfig([], { onTagAdd })}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            await user.click(input)
            await user.keyboard('{Enter}')
            expect(onTagAdd).toHaveBeenCalledWith('trimmed')
        })

        it('removes last tag on Backspace when value is empty', async () => {
            const onTagRemove = vi.fn()
            const { user } = render(
                <MultiValueInputV2
                    label="Tags"
                    value=""
                    tags={tagsConfig(['a', 'b'], { onTagRemove })}
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            await user.click(input)
            await user.keyboard('{Backspace}')
            expect(onTagRemove).toHaveBeenCalledTimes(1)
            expect(onTagRemove).toHaveBeenCalledWith('b')
        })
    })

    describe('Tags: remove button', () => {
        it('calls onTagRemove when remove is activated', async () => {
            const onTagRemove = vi.fn()
            const { user } = render(
                <MultiValueInputV2
                    label="Tags"
                    value=""
                    tags={tagsConfig(['remove-me'], { onTagRemove })}
                    onChange={() => {}}
                />
            )
            await user.click(
                screen.getByRole('button', { name: 'Remove remove-me' })
            )
            expect(onTagRemove).toHaveBeenCalledWith('remove-me')
        })
    })

    describe('Integrated controlled flow', () => {
        it('adds tag and clears draft value via harness', async () => {
            const { user } = render(
                <ControlledMultiValueInput
                    label="Tags"
                    placeholder="Add"
                    initialTags={['one']}
                />
            )
            const input = screen.getByRole('textbox')
            await user.type(input, 'two{Enter}')
            expect(screen.getByText('two')).toBeInTheDocument()
            expect(input).toHaveValue('')
        })
    })

    describe('Event handling', () => {
        it('calls onFocus and onBlur on the input', () => {
            const onFocus = vi.fn()
            const onBlur = vi.fn()
            render(
                <MultiValueInputV2
                    label="Focus"
                    value=""
                    onChange={() => {}}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            )
            const input = screen.getByRole('textbox')
            act(() => {
                input.focus()
            })
            expect(onFocus).toHaveBeenCalledTimes(1)
            act(() => {
                input.blur()
            })
            expect(onBlur).toHaveBeenCalledTimes(1)
        })
    })

    describe('Form attributes', () => {
        it('applies name and custom id', () => {
            render(
                <MultiValueInputV2
                    id="mv-id"
                    name="mv-name"
                    label="MV"
                    value=""
                    onChange={() => {}}
                />
            )
            const input = screen.getByRole('textbox')
            expect(input).toHaveAttribute('id', 'mv-id')
            expect(input).toHaveAttribute('name', 'mv-name')
        })
    })

    describe('Data attributes', () => {
        it('sets data-multi-value-input from label', () => {
            render(
                <MultiValueInputV2
                    label="My field"
                    value=""
                    onChange={() => {}}
                />
            )
            expect(
                document.querySelector('[data-multi-value-input="My field"]')
            ).toBeInTheDocument()
        })

        it('sets data-status for enabled and disabled', () => {
            const { rerender } = render(
                <MultiValueInputV2 label="S" value="" onChange={() => {}} />
            )
            expect(
                document.querySelector('[data-status="enabled"]')
            ).toBeInTheDocument()

            rerender(
                <MultiValueInputV2
                    label="S"
                    value=""
                    onChange={() => {}}
                    disabled
                />
            )
            expect(
                document.querySelector('[data-status="disabled"]')
            ).toBeInTheDocument()
        })
    })

    describe('Accessibility: aria-describedby', () => {
        it('links hint when no error', () => {
            render(
                <MultiValueInputV2
                    label="L"
                    value=""
                    onChange={() => {}}
                    hintText="Hint here"
                />
            )
            const input = screen.getByRole('textbox')
            const id = input.getAttribute('id')
            expect(id).toBeTruthy()
            expect(input.getAttribute('aria-describedby')).toContain(
                `${id}-hint`
            )
        })

        it('links error when error and message', () => {
            render(
                <MultiValueInputV2
                    label="L"
                    value=""
                    onChange={() => {}}
                    error
                    errorMessage="Bad"
                />
            )
            const input = screen.getByRole('textbox')
            const id = input.getAttribute('id')
            expect(input.getAttribute('aria-describedby')).toContain(
                `${id}-error`
            )
        })
    })
})
