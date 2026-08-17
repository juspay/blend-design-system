import React, { useState } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import Modal from '../../../lib/components/Modal/Modal'

describe('Modal', () => {
    const OpenModal = (props: Record<string, unknown> = {}) => {
        const Wrapper = () => {
            const [isOpen, setIsOpen] = useState(true)
            return (
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Modal Title"
                    {...props}
                >
                    <p>Modal body</p>
                </Modal>
            )
        }
        return render(<Wrapper />)
    }

    describe('rounded corners (regression: #1687)', () => {
        // Since #1642, the opaque, square-cornered header painted over the
        // container's rounded top corners. The container clips its children to
        // the border radius, so every corner stays rounded — the header's own
        // background can no longer leak past the dialog's rounded top.
        it('clips the dialog container so all four corners stay rounded', () => {
            OpenModal()
            expect(screen.getByRole('dialog')).toHaveStyle({
                overflow: 'hidden',
            })
        })

        it('still clips when a title (opaque header) is present', () => {
            OpenModal({ title: 'With Header', showCloseButton: true })
            expect(screen.getByRole('dialog')).toHaveStyle({
                overflow: 'hidden',
            })
        })
    })
})
