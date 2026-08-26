import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useChrome } from '../chrome'
import { CONTROL_GROUPS } from '../types'
import type { Control, ControlGroup, Option } from '../types'
import SegmentedControl from './SegmentedControl'
import SelectControl from './SelectControl'
import TextControl from './TextControl'
import ToggleControl from './ToggleControl'

/**
 * Past this many values an inline row wraps into an unreadable block, so the
 * panel promotes the control to a picker regardless of what the spec asked
 * for. That keeps specs honest when an enum grows: nobody has to remember to
 * change `segmented` to `select`.
 */
const MAX_INLINE_OPTIONS = 4

const DEFAULT_GROUP: ControlGroup = 'Appearance'

export default function ControlPanel<P extends object>({
    controls,
    props,
    onChange,
}: {
    controls: readonly Control<P>[]
    props: P
    onChange: (key: string, value: unknown) => void
}) {
    const chrome = useChrome()

    return (
        <View style={styles.panel}>
            {CONTROL_GROUPS.map((group) => {
                const inGroup = controls.filter(
                    (control) => (control.group ?? DEFAULT_GROUP) === group
                )
                if (inGroup.length === 0) return null

                return (
                    <View key={group} style={styles.group}>
                        <Text
                            style={[
                                styles.groupTitle,
                                { color: chrome.fgMuted },
                            ]}
                        >
                            {group}
                        </Text>
                        {inGroup.map((control) => (
                            <ControlRow
                                key={control.key}
                                control={control}
                                props={props}
                                onChange={onChange}
                            />
                        ))}
                    </View>
                )
            })}
        </View>
    )
}

function ControlRow<P extends object>({
    control,
    props,
    onChange,
}: {
    control: Control<P>
    props: P
    onChange: (key: string, value: unknown) => void
}) {
    const chrome = useChrome()
    const value = (props as Record<string, unknown>)[control.key]
    const set = (next: unknown) => onChange(control.key, next)

    if (control.kind === 'toggle') {
        const on = control.on === undefined ? true : control.on
        const off = control.off === undefined ? false : control.off
        return (
            <ToggleControl
                label={control.label}
                value={Object.is(value, on)}
                onChange={(isOn) => set(isOn ? on : off)}
            />
        )
    }

    const labelled = (child: ReactNode) => (
        <View style={styles.field}>
            <Text style={[styles.fieldLabel, { color: chrome.fgMuted }]}>
                {control.label}
            </Text>
            {child}
        </View>
    )

    if (control.kind === 'text') {
        return labelled(
            <TextControl
                label={control.label}
                value={typeof value === 'string' ? value : ''}
                placeholder={control.placeholder}
                onChange={set}
            />
        )
    }

    const options = control.options as readonly Option<unknown>[]
    const inline =
        control.kind === 'segmented' && options.length <= MAX_INLINE_OPTIONS

    return labelled(
        inline ? (
            <SegmentedControl options={options} value={value} onChange={set} />
        ) : (
            <SelectControl
                label={control.label}
                options={options}
                value={value}
                onChange={set}
            />
        )
    )
}

const styles = StyleSheet.create({
    panel: { gap: 20 },
    group: { gap: 12 },
    groupTitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.6,
        textTransform: 'uppercase',
    },
    field: { gap: 6 },
    fieldLabel: { fontSize: 12, fontWeight: '500' },
})
