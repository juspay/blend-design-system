import { fireEvent, render } from '@testing-library/react-native'
import { Checkbox } from '../src/components/Checkbox'
import { Radio } from '../src/components/Radio'
import { Switch } from '../src/components/Switch'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from '../src/components/Tabs'
import { Accordion, AccordionItem } from '../src/components/Accordion'
import { Text as RNText } from 'react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import type { ReactElement } from 'react'

/**
 * Render tests for the Wave B selection controls and stateful layout —
 * roles, a11y state, toggling and label-tap parity as they reach the
 * screen.
 */

const wrap = (ui: ReactElement) =>
    render(<BlendNativeProvider>{ui}</BlendNativeProvider>)

describe('Accordion rendering', () => {
    const mountAccordion = (
        props: Partial<React.ComponentProps<typeof Accordion>> = {}
    ) =>
        wrap(
            <Accordion {...props}>
                <AccordionItem value="a" title="First" testID="ia">
                    <RNText>content a</RNText>
                </AccordionItem>
                <AccordionItem value="b" title="Second" testID="ib">
                    <RNText>content b</RNText>
                </AccordionItem>
            </Accordion>
        )

    it('uncontrolled single: toggles open and collapses (collapsible)', () => {
        const { getByTestId } = mountAccordion()
        const trigger = getByTestId('ia-trigger')
        expect(trigger.props.accessibilityRole).toBe('button')
        expect(trigger.props.accessibilityState.expanded).toBe(false)
        fireEvent.press(trigger)
        expect(
            getByTestId('ia-trigger').props.accessibilityState.expanded
        ).toBe(true)
        fireEvent.press(getByTestId('ia-trigger'))
        expect(
            getByTestId('ia-trigger').props.accessibilityState.expanded
        ).toBe(false)
    })

    it('single mode collapses the sibling', () => {
        const { getByTestId } = mountAccordion({ defaultValue: 'a' })
        fireEvent.press(getByTestId('ib-trigger'))
        expect(
            getByTestId('ia-trigger').props.accessibilityState.expanded
        ).toBe(false)
        expect(
            getByTestId('ib-trigger').props.accessibilityState.expanded
        ).toBe(true)
    })

    it('multiple mode keeps siblings open together', () => {
        // Fresh mount: defaultValue is mount-only, like every defaultX.
        const { getByTestId } = mountAccordion({
            isMultiple: true,
            defaultValue: ['a'],
        })
        fireEvent.press(getByTestId('ib-trigger'))
        expect(
            getByTestId('ia-trigger').props.accessibilityState.expanded
        ).toBe(true)
        expect(
            getByTestId('ib-trigger').props.accessibilityState.expanded
        ).toBe(true)
    })

    it('collapsed content is hidden from assistive tech', () => {
        const { getByTestId } = mountAccordion({ defaultValue: 'a' })
        expect(getByTestId('ia-panel').props.importantForAccessibility).toBe(
            'auto'
        )
        expect(
            getByTestId('ib-panel', { includeHiddenElements: true }).props
                .importantForAccessibility
        ).toBe('no-hide-descendants')
    })

    it('controlled: onValueChange fires, value wins', () => {
        const onValueChange = jest.fn()
        const { getByTestId } = mountAccordion({
            value: 'a',
            onValueChange,
        })
        fireEvent.press(getByTestId('ib-trigger'))
        expect(onValueChange).toHaveBeenCalledWith('b')
        expect(
            getByTestId('ia-trigger').props.accessibilityState.expanded
        ).toBe(true)
    })
})

describe('Tabs rendering', () => {
    const mountTabs = (
        props: Partial<React.ComponentProps<typeof Tabs>> = {}
    ) =>
        wrap(
            <Tabs defaultValue="one" {...props}>
                <TabsList testID="list">
                    <TabsTrigger value="one" testID="t1">
                        One
                    </TabsTrigger>
                    <TabsTrigger value="two" testID="t2">
                        Two
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="one">
                    <RNText>panel one</RNText>
                </TabsContent>
                <TabsContent value="two">
                    <RNText>panel two</RNText>
                </TabsContent>
            </Tabs>
        )

    it('uncontrolled: defaultValue selects, pressing a trigger switches', () => {
        const { getByTestId, getByText, queryByText } = mountTabs()
        expect(getByTestId('t1').props.accessibilityState.selected).toBe(true)
        expect(getByText('panel one')).toBeTruthy()
        expect(queryByText('panel two')).toBeNull()
        fireEvent.press(getByTestId('t2'))
        expect(getByText('panel two')).toBeTruthy()
        expect(queryByText('panel one')).toBeNull()
        expect(getByTestId('t2').props.accessibilityState.selected).toBe(true)
    })

    it('controlled: onValueChange fires and value wins', () => {
        const onValueChange = jest.fn()
        const { getByTestId, getByText, queryByText } = mountTabs({
            value: 'one',
            onValueChange,
        })
        fireEvent.press(getByTestId('t2'))
        expect(onValueChange).toHaveBeenCalledWith('two')
        // Still controlled to "one" until the owner re-renders.
        expect(getByText('panel one')).toBeTruthy()
        expect(queryByText('panel two')).toBeNull()
    })

    it('exposes tab roles and a disabled trigger blocks selection', () => {
        const onValueChange = jest.fn()
        const { getByTestId } = wrap(
            <Tabs defaultValue="a" onValueChange={onValueChange}>
                <TabsList>
                    <TabsTrigger value="a" testID="ta">
                        A
                    </TabsTrigger>
                    <TabsTrigger value="b" disabled testID="tb">
                        B
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        )
        expect(getByTestId('ta').props.accessibilityRole).toBe('tab')
        fireEvent.press(getByTestId('tb'))
        expect(onValueChange).not.toHaveBeenCalled()
    })
})

describe('Switch rendering', () => {
    it('exposes a switch role and toggles with the inverted value', () => {
        const onCheckedChange = jest.fn()
        const { getByTestId } = wrap(
            <Switch
                label="Notifications"
                checked
                onCheckedChange={onCheckedChange}
                testID="sw"
            />
        )
        const sw = getByTestId('sw')
        expect(sw.props.accessibilityRole).toBe('switch')
        expect(sw.props.accessibilityState.checked).toBe(true)
        fireEvent.press(sw)
        expect(onCheckedChange).toHaveBeenCalledWith(false)
    })

    it('disabled blocks toggling', () => {
        const onCheckedChange = jest.fn()
        const { getByTestId } = wrap(
            <Switch
                label="Frozen"
                checked={false}
                disabled
                onCheckedChange={onCheckedChange}
                testID="sw"
            />
        )
        fireEvent.press(getByTestId('sw'))
        expect(onCheckedChange).not.toHaveBeenCalled()
    })
})

describe('Radio rendering', () => {
    it('selects on press with radio semantics (no re-fire when selected)', () => {
        const onCheckedChange = jest.fn()
        const { getByTestId, rerender } = wrap(
            <Radio
                label="Option A"
                checked={false}
                onCheckedChange={onCheckedChange}
                testID="ra"
            />
        )
        const radio = getByTestId('ra')
        expect(radio.props.accessibilityRole).toBe('radio')
        expect(radio.props.accessibilityState.checked).toBe(false)
        fireEvent.press(radio)
        expect(onCheckedChange).toHaveBeenCalledWith(true)

        rerender(
            <BlendNativeProvider>
                <Radio
                    label="Option A"
                    checked
                    onCheckedChange={onCheckedChange}
                    testID="ra"
                />
            </BlendNativeProvider>
        )
        fireEvent.press(getByTestId('ra'))
        // Pressing a selected radio is a no-op.
        expect(onCheckedChange).toHaveBeenCalledTimes(1)
    })

    it('caller-owned selection works across siblings', () => {
        const select = jest.fn()
        const { getByText } = wrap(
            <>
                <Radio label="One" checked onCheckedChange={() => select(1)} />
                <Radio
                    label="Two"
                    checked={false}
                    onCheckedChange={() => select(2)}
                />
            </>
        )
        fireEvent.press(getByText('Two'))
        expect(select).toHaveBeenCalledWith(2)
    })
})

describe('Checkbox rendering', () => {
    it('exposes a checkbox role with checked state and toggles on press', () => {
        const onCheckedChange = jest.fn()
        const { getByTestId } = wrap(
            <Checkbox
                label="Accept terms"
                checked={false}
                onCheckedChange={onCheckedChange}
                testID="cb"
            />
        )
        const box = getByTestId('cb')
        expect(box.props.accessibilityRole).toBe('checkbox')
        expect(box.props.accessibilityState.checked).toBe(false)
        fireEvent.press(box)
        expect(onCheckedChange).toHaveBeenCalledWith(true)
    })

    it('label-tap toggles (the row is one pressable)', () => {
        const onCheckedChange = jest.fn()
        const { getByText } = wrap(
            <Checkbox
                label="Row toggles"
                checked
                onCheckedChange={onCheckedChange}
            />
        )
        fireEvent.press(getByText('Row toggles'))
        expect(onCheckedChange).toHaveBeenCalledWith(false)
    })

    it('indeterminate reports mixed and resolves to checked on press', () => {
        const onCheckedChange = jest.fn()
        const { getByTestId } = wrap(
            <Checkbox
                label="Some selected"
                checked="indeterminate"
                onCheckedChange={onCheckedChange}
                testID="cb"
            />
        )
        expect(getByTestId('cb').props.accessibilityState.checked).toBe('mixed')
        fireEvent.press(getByTestId('cb'))
        expect(onCheckedChange).toHaveBeenCalledWith(true)
    })

    it('disabled blocks toggling and reaches a11y state', () => {
        const onCheckedChange = jest.fn()
        const { getByTestId } = wrap(
            <Checkbox
                label="Frozen"
                checked
                disabled
                onCheckedChange={onCheckedChange}
                testID="cb"
            />
        )
        expect(getByTestId('cb').props.accessibilityState.disabled).toBe(true)
        fireEvent.press(getByTestId('cb'))
        expect(onCheckedChange).not.toHaveBeenCalled()
    })
})
