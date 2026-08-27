import { describe, expect, it } from 'vitest'
import { addProps, buildSnippet, indent, replaceProp } from './snippet'
import {
    enumOptions,
    humanize,
    numberOptions,
    toggleValues,
    unionOptions,
} from './types'
import type { Control } from './types'

enum Color {
    SUCCESS = 'success',
    NO_FILL = 'noFill',
}

type Props = {
    text?: string
    color?: Color
    count?: number
    disabled?: boolean
    leftSlot?: { slot: string }
}

const SLOT = { slot: 'star' }

const defaults: Props = { text: 'Blend', color: Color.SUCCESS }

const controls: readonly Control<Props>[] = [
    { kind: 'text', key: 'text', label: 'Text', always: true },
    {
        kind: 'select',
        key: 'color',
        label: 'Color',
        options: enumOptions(Color, 'Color'),
    },
    {
        kind: 'select',
        key: 'count',
        label: 'Count',
        options: numberOptions([1, 2]),
    },
    { kind: 'toggle', key: 'disabled', label: 'Disabled' },
    {
        kind: 'toggle',
        key: 'leftSlot',
        label: 'Left slot',
        on: SLOT,
        off: undefined,
        onCode: '{ slot: <Star /> }',
    },
]

const snippet = (props: Props) =>
    buildSnippet('Tag', { ...defaults, ...props }, defaults, controls)

describe('buildSnippet', () => {
    it('omits props still at their default', () => {
        expect(snippet({})).toBe('<Tag\n    text="Blend"\n/>')
    })

    it('keeps a prop marked `always`, so the snippet still renders something', () => {
        // `text` equals the default here and is printed anyway.
        expect(snippet({})).toContain('text="Blend"')
    })

    it('prints enum values by name rather than by string value', () => {
        expect(snippet({ color: Color.NO_FILL })).toContain(
            'color={Color.NO_FILL}'
        )
    })

    it('quotes strings and shorthands true booleans', () => {
        const out = snippet({ text: 'Hi', disabled: true })
        expect(out).toContain('text="Hi"')
        expect(out).toContain('\n    disabled\n')
        expect(out).not.toContain('disabled={true}')
    })

    it('prints false explicitly, since the default was undefined', () => {
        expect(snippet({ disabled: false })).toContain('disabled={false}')
    })

    it('wraps numbers in braces', () => {
        expect(snippet({ count: 2 })).toContain('count={2}')
    })

    it('drops a slot cleared back to undefined, rather than printing {false}', () => {
        // Regression: `off: undefined` used to collapse to `false`, which
        // put `leftSlot={false}` in the block — not valid for the prop type.
        expect(snippet({ leftSlot: undefined })).not.toContain('leftSlot')
    })

    it('uses the toggle code hint for non-scalar values', () => {
        expect(snippet({ leftSlot: SLOT })).toContain(
            'leftSlot={{ slot: <Star /> }}'
        )
    })

    it('falls back to a placeholder when a non-scalar has no code hint', () => {
        const out = buildSnippet('Tag', { leftSlot: { slot: 'x' } }, {}, [
            { kind: 'toggle', key: 'leftSlot', label: 'Slot', on: SLOT },
        ])
        expect(out).toContain('leftSlot={/* ... */}')
    })

    it('switches to an expression when a string contains a quote', () => {
        expect(snippet({ text: 'say "hi"' })).toContain('text={"say \\"hi\\""}')
    })

    it('self-closes on one line when nothing differs and nothing is forced', () => {
        expect(buildSnippet('Spinner', {}, {}, [])).toBe('<Spinner />')
    })

    it('leaves hidden controls out, so playground-only props never reach the JSX', () => {
        const out = buildSnippet('Tag', { count: 2, disabled: true }, {}, [
            {
                kind: 'select',
                key: 'count',
                label: 'Family',
                hidden: true,
                options: numberOptions([1, 2]),
            },
            { kind: 'toggle', key: 'disabled', label: 'Disabled' },
        ])
        expect(out).not.toContain('count')
        expect(out).toContain('disabled')
    })

    it('passes the rendered block through `wrapSnippet`', () => {
        const out = buildSnippet(
            'Tag',
            { text: 'Hi' },
            {},
            [{ kind: 'text', key: 'text', label: 'Text' }],
            (inner) => `<TagGroup>\n${indent(inner)}\n</TagGroup>`
        )
        expect(out).toBe(
            '<TagGroup>\n    <Tag\n        text="Hi"\n    />\n</TagGroup>'
        )
    })
})

describe('multiselect', () => {
    type Multi = { sizes?: readonly string[] }
    const control = {
        kind: 'multiselect' as const,
        key: 'sizes' as const,
        label: 'Sizes',
        options: [
            { label: 'Sm', value: 'sm', code: 'Size.SM' },
            { label: 'Md', value: 'md', code: 'Size.MD' },
            { label: 'Lg', value: 'lg' },
        ],
    }
    const build = (sizes: readonly string[]) =>
        buildSnippet<Multi>('Tag', { sizes }, {}, [control])

    it('prints an array, using each option code where there is one', () => {
        expect(build(['sm', 'md'])).toContain('sizes={[Size.SM, Size.MD]}')
    })

    it('falls back to the literal for an option with no code', () => {
        expect(build(['lg'])).toContain("sizes={['lg']}")
    })

    it('prints an empty selection as an empty array, not a placeholder', () => {
        expect(build([])).toContain('sizes={[]}')
    })
})

describe('replaceProp', () => {
    const block = '<Tag\n    text="Blend"\n    size={2}\n/>'

    it('rewrites the matching line and keeps its indentation', () => {
        expect(replaceProp(block, 'text', '"First"')).toBe(
            '<Tag\n    text="First"\n    size={2}\n/>'
        )
    })

    it('leaves the block alone when the prop is absent', () => {
        expect(replaceProp(block, 'color', '"red"')).toBe(block)
    })
})

describe('addProps', () => {
    it('appends to a multi-line block', () => {
        expect(addProps('<Sheet\n    topRadius={0}\n/>', ['open={open}'])).toBe(
            '<Sheet\n    topRadius={0}\n    open={open}\n/>'
        )
    })

    it('expands a self-closed one-liner, which has no line to append after', () => {
        expect(addProps('<Sheet />', ['open={open}'])).toBe(
            '<Sheet\n    open={open}\n/>'
        )
    })
})

describe('indent', () => {
    it('shifts every non-empty line and leaves blank lines alone', () => {
        expect(indent('a\n\nb')).toBe('    a\n\n    b')
    })
})

describe('toggleValues', () => {
    it('defaults to true / false when the spec says nothing', () => {
        expect(toggleValues({})).toEqual({ on: true, off: false })
    })

    it('treats an explicit `off: undefined` as "clear the prop"', () => {
        // Regression: this used to collapse to `false`, so switching a slot
        // toggle on and off wrote `leftSlot={false}` — into the component's
        // props and into the generated JSX, where it does not type-check.
        expect(toggleValues({ on: SLOT, off: undefined })).toEqual({
            on: SLOT,
            off: undefined,
        })
    })

    it('still honours an explicit `off: false`', () => {
        expect(toggleValues({ on: 'yes', off: false })).toEqual({
            on: 'yes',
            off: false,
        })
    })
})

describe('option builders', () => {
    it('humanizes enum keys', () => {
        expect(humanize('NO_FILL')).toBe('No fill')
        expect(humanize('SUCCESS')).toBe('Success')
        expect(humanize('MD')).toBe('Md')
        expect(humanize('wrap-clamp')).toBe('Wrap clamp')
        expect(humanize('sm')).toBe('Sm')
    })

    it('leaves component names alone rather than flattening their case', () => {
        // Regression: these used to render as "Taggroup" / "Iconbutton".
        expect(humanize('TagGroup')).toBe('TagGroup')
        expect(humanize('IconButton')).toBe('IconButton')
    })

    it('derives options from the enum object, not a hardcoded list', () => {
        expect(enumOptions(Color, 'Color')).toEqual([
            { label: 'Success', value: 'success', code: 'Color.SUCCESS' },
            { label: 'No fill', value: 'noFill', code: 'Color.NO_FILL' },
        ])
    })

    it('builds union options without a code hint', () => {
        type Shape = 'circle' | 'square'
        expect(unionOptions<Shape>()(['circle', 'square'])).toEqual([
            { label: 'Circle', value: 'circle' },
            { label: 'Square', value: 'square' },
        ])
    })
})
