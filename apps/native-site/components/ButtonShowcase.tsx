import { View, StyleSheet, Text as RNText } from 'react-native'
import { Plus, Trash2 } from 'lucide-react-native'
import {
    Button,
    ButtonGroup,
    IconButton,
    LinkButton,
    ButtonType,
    ButtonSize,
    ButtonSubType,
} from 'blend-native'

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
            <View style={styles.sectionContent}>{children}</View>
        </View>
    )
}

export default function ButtonShowcase() {
    return (
        <>
            {/* ---- Types ---- */}
            <Section title="Types (primary gradient, secondary flat, danger, success)">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Primary"
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Secondary"
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.DANGER}
                    text="Danger"
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.SUCCESS}
                    text="Success"
                    onPress={() => {}}
                />
            </Section>

            {/* ---- Sizes ---- */}
            <Section title="Sizes (sm, md, lg)">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.SMALL}
                    text="Small"
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Medium"
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.LARGE}
                    text="Large"
                    onPress={() => {}}
                />
            </Section>

            {/* ---- States ---- */}
            <Section title="States (disabled, loading)">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Disabled"
                    disabled
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Loading"
                    loading
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Disabled Secondary"
                    disabled
                    onPress={() => {}}
                />
            </Section>

            {/* ---- SubTypes ---- */}
            <Section title="SubTypes (default, inline)">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    subType={ButtonSubType.DEFAULT}
                    text="Default SubType"
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    subType={ButtonSubType.INLINE}
                    text="Inline SubType"
                    onPress={() => {}}
                />
            </Section>

            {/* ---- IconButton ---- */}
            <Section title="IconButton (icon-only, required label)">
                <View style={styles.row}>
                    <IconButton
                        icon={<Plus />}
                        accessibilityLabel="Add"
                        onPress={() => {}}
                    />
                    <IconButton
                        icon={<Plus />}
                        buttonType={ButtonType.SECONDARY}
                        accessibilityLabel="Add"
                        onPress={() => {}}
                    />
                    <IconButton
                        icon={<Trash2 />}
                        buttonType={ButtonType.DANGER}
                        accessibilityLabel="Delete"
                        onPress={() => {}}
                    />
                    <IconButton
                        icon={<Plus />}
                        size={ButtonSize.MEDIUM}
                        accessibilityLabel="Add"
                        onPress={() => {}}
                    />
                    <IconButton
                        icon={<Plus />}
                        size={ButtonSize.LARGE}
                        accessibilityLabel="Add"
                        onPress={() => {}}
                    />
                    <IconButton
                        icon={<Plus />}
                        accessibilityLabel="Add"
                        disabled
                        onPress={() => {}}
                    />
                </View>
            </Section>

            {/* ---- LinkButton ---- */}
            <Section title="LinkButton (link role, onPress navigation)">
                <View style={styles.row}>
                    <LinkButton text="Learn more" onPress={() => {}} />
                    <LinkButton
                        buttonType={ButtonType.SECONDARY}
                        text="View docs"
                        onPress={() => {}}
                    />
                    <LinkButton
                        subType={ButtonSubType.INLINE}
                        text="Inline link"
                        onPress={() => {}}
                    />
                </View>
            </Section>

            {/* ---- ButtonGroup ---- */}
            <Section title="ButtonGroup — stacked (joined edges)">
                <ButtonGroup stacked>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Day"
                        onPress={() => {}}
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Week"
                        onPress={() => {}}
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Month"
                        onPress={() => {}}
                    />
                    <IconButton
                        icon={<Plus />}
                        buttonType={ButtonType.SECONDARY}
                        accessibilityLabel="Add view"
                        onPress={() => {}}
                    />
                </ButtonGroup>
            </Section>

            <Section title="ButtonGroup — spaced (default gap)">
                <ButtonGroup>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Cancel"
                        onPress={() => {}}
                    />
                    <Button text="Confirm" onPress={() => {}} />
                </ButtonGroup>
            </Section>

            {/* ---- Width control ---- */}
            <Section title="Width — fixed (px)">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="80px"
                    width={80}
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="120px"
                    width={120}
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="200px"
                    width={200}
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="240px"
                    width={240}
                    onPress={() => {}}
                />
            </Section>

            <Section title="Width — percentage">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="50%"
                    width="50%"
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="75%"
                    width="75%"
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="100% Full Width"
                    width="100%"
                    onPress={() => {}}
                />
            </Section>

            <Section title="Width — auto / fit-content">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Auto"
                    width="auto"
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Fit Content"
                    width="fit-content"
                    onPress={() => {}}
                />
            </Section>

            <Section title="Width — min/max constraints">
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="minWidth 200"
                    minWidth={200}
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="maxWidth 160 (long text clamps)"
                    maxWidth={160}
                    onPress={() => {}}
                />
                <Button
                    buttonType={ButtonType.DANGER}
                    text="min 120 max 180"
                    minWidth={120}
                    maxWidth={180}
                    onPress={() => {}}
                />
            </Section>
        </>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 24,
        gap: 12,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#525B6D',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    sectionContent: {
        gap: 12,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
})
