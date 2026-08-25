import { View, Text as RNText, StyleSheet } from 'react-native'
import { Circle } from 'lucide-react-native'
import { Tag, TagColor, TagSize, TagSubType, TagType } from 'blend-native'

/**
 * Visual parity harness for the native `Tag`.
 *
 * Mirrors the sections in Storybook's `TagV2` stories so the two can be
 * compared side by side.
 */

const TYPES = [TagType.NO_FILL, TagType.SUBTLE, TagType.ATTENTIVE]
const COLORS = [
    TagColor.NEUTRAL,
    TagColor.PRIMARY,
    TagColor.SUCCESS,
    TagColor.ERROR,
    TagColor.WARNING,
    TagColor.PURPLE,
]
const SIZES = [TagSize.XS, TagSize.SM, TagSize.MD, TagSize.LG]

function Section({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <View style={styles.section}>
            <RNText style={styles.sectionTitle}>{title}</RNText>
            <View style={styles.row}>{children}</View>
        </View>
    )
}

/**
 * Real icon, to verify slot tinting end to end.
 *
 * Lucide is stroke-based with `fill="none"`, which is exactly the case that
 * broke when `tintSlot` used to set `fill` alongside `color` — the glyph
 * rendered as a solid block. If these render as outlines, the fix holds.
 */
function Dot({ color }: { color?: string }) {
    return <Circle size={12} color={color} />
}

export default function TagShowcase() {
    return (
        <View style={styles.container}>
            {TYPES.map((type) => (
                <Section key={type} title={`Type: ${type}`}>
                    {COLORS.map((color) => (
                        <Tag
                            key={`${type}-${color}`}
                            text={color}
                            type={type}
                            color={color}
                        />
                    ))}
                </Section>
            ))}

            <Section title="Sizes (squarical)">
                {SIZES.map((size) => (
                    <Tag key={size} text={size} size={size} />
                ))}
            </Section>

            <Section title="Sizes (rounded / pill)">
                {SIZES.map((size) => (
                    <Tag
                        key={size}
                        text={size}
                        size={size}
                        subType={TagSubType.ROUNDED}
                    />
                ))}
            </Section>

            <Section title="Slots — icons must be tinted, not boxed">
                <Tag
                    text="Left slot"
                    leftSlot={{ slot: <Dot /> }}
                    type={TagType.ATTENTIVE}
                />
                <Tag
                    text="Right slot"
                    rightSlot={{ slot: <Dot /> }}
                    type={TagType.ATTENTIVE}
                />
                <Tag
                    text="Both"
                    leftSlot={{ slot: <Dot /> }}
                    rightSlot={{ slot: <Dot /> }}
                    type={TagType.SUBTLE}
                />
                <Tag
                    text="maxHeight override"
                    leftSlot={{ slot: <Dot />, maxHeight: 24 }}
                    size={TagSize.LG}
                />
            </Section>

            <Section title="Interactive (press me)">
                <Tag
                    text="Pressable"
                    onPress={() => undefined}
                    type={TagType.ATTENTIVE}
                />
                <Tag
                    text="Toggled on"
                    onPress={() => undefined}
                    pressed
                    type={TagType.SUBTLE}
                />
                <Tag
                    text="Mixed"
                    onPress={() => undefined}
                    pressed="mixed"
                    type={TagType.NO_FILL}
                />
            </Section>

            <Section title="Tag group positions">
                <View style={styles.group}>
                    <Tag
                        text="Left"
                        tagGroupPosition="left"
                        type={TagType.SUBTLE}
                    />
                    <Tag
                        text="Center"
                        tagGroupPosition="center"
                        type={TagType.SUBTLE}
                    />
                    <Tag
                        text="Right"
                        tagGroupPosition="right"
                        type={TagType.SUBTLE}
                    />
                </View>
            </Section>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { gap: 20 },
    section: { gap: 8 },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#717784',
        textTransform: 'uppercase',
    },
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    group: { flexDirection: 'row' },
})
