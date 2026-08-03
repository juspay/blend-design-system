import React, { useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent } from '@testing-library/react'
import { render, screen } from '../../test-utils'
import SingleSelect from '../../../lib/components/SingleSelect/SingleSelect'
import MultiSelect from '../../../lib/components/MultiSelect/MultiSelect'
import SingleSelectV2 from '../../../lib/components/SingleSelectV2/SingleSelectV2'
import { MultiSelectV2 } from '../../../lib/components/MultiSelectV2'
import * as useBreakpointsModule from '../../../lib/hooks/useBreakPoints'

const items = [
    {
        items: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
        ],
    },
]

describe('Select mobile controlled search', () => {
    beforeEach(() => {
        vi.spyOn(useBreakpointsModule, 'useBreakpoints').mockReturnValue({
            breakPointLabel: 'sm',
            innerWidth: 480,
        } as ReturnType<typeof useBreakpointsModule.useBreakpoints>)
    })

    const assertControlledMobileSearch = async (
        renderSelect: (
            searchText: string,
            onSearchChange: (text: string) => void
        ) => React.ReactNode,
        triggerRole: 'button' | 'combobox'
    ) => {
        const onSearchChange = vi.fn()
        const Harness = () => {
            const [searchText, setSearchText] = useState('')
            return renderSelect(searchText, (text) => {
                onSearchChange(text)
                setSearchText(text)
            })
        }

        render(<Harness />)
        fireEvent.click(
            screen.getByRole(triggerRole, { name: /controlled mobile/i })
        )
        fireEvent.change(
            await screen.findByPlaceholderText('Search options...'),
            { target: { value: 'app' } }
        )

        expect(onSearchChange).toHaveBeenCalledWith('app')
        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.getByText('Banana')).toBeInTheDocument()
    }

    it('does not filter SingleSelect items', () =>
        assertControlledMobileSearch(
            (searchText, onSearchChange) => (
                <SingleSelect
                    placeholder="Controlled mobile"
                    items={items}
                    selected=""
                    onSelect={() => {}}
                    searchText={searchText}
                    onSearchChange={onSearchChange}
                />
            ),
            'button'
        ))

    it('does not filter MultiSelect items', () =>
        assertControlledMobileSearch(
            (searchText, onSearchChange) => (
                <MultiSelect
                    label="Controlled mobile"
                    placeholder="Controlled mobile"
                    items={items}
                    selectedValues={[]}
                    onChange={() => {}}
                    searchText={searchText}
                    onSearchChange={onSearchChange}
                />
            ),
            'button'
        ))

    it('does not filter SingleSelectV2 items', () =>
        assertControlledMobileSearch(
            (searchText, onSearchChange) => (
                <SingleSelectV2
                    placeholder="Controlled mobile"
                    items={items}
                    selected=""
                    onSelect={() => {}}
                    search={{ searchText, onSearchChange }}
                />
            ),
            'button'
        ))

    it('does not filter MultiSelectV2 items', () =>
        assertControlledMobileSearch(
            (searchText, onSearchChange) => (
                <MultiSelectV2
                    label="Controlled mobile"
                    placeholder="Controlled mobile"
                    items={items}
                    selectedValues={[]}
                    onChange={() => {}}
                    search={{ searchText, onSearchChange }}
                />
            ),
            'combobox'
        ))
})
