import { StyleSheet, Text as RNText, View } from 'react-native'
import {
    ProgressBar,
    ProgressBarAppearance,
    ProgressBarSize,
    ProgressBarVariant,
    Spinner,
    Button,
    ButtonType,
    dismissToast,
    Skeleton,
    showToast,
    Tag,
    TagColor,
    TagType,
} from 'blend-native'

/**
 * Skeleton + toast verification. On device, check:
 *
 * - pulse breathes; wave sweeps left→right (needs expo-linear-gradient,
 *   otherwise it degrades to pulse)
 * - OS reduce-motion freezes skeletons to the static base colour
 * - wrapped content sizes its skeleton exactly, nothing peeks through
 * - toasts stack bottom-up, cap at three, and clear the home indicator
 */
export default function LoadingShowcase() {
    return (
        <View style={styles.column}>
            <RNText style={styles.heading}>
                Spinner (sizes, colors, overlay-free)
            </RNText>
            <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}
            >
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="md" color="primary" />
            </View>

            <RNText style={styles.heading}>
                ProgressBar (linear, segmented, circular)
            </RNText>
            <ProgressBar value={65} showLabel />
            <ProgressBar
                value={40}
                appearance={ProgressBarAppearance.SEGMENTED}
            />
            <View style={{ flexDirection: 'row', gap: 24 }}>
                <ProgressBar
                    value={65}
                    variant={ProgressBarVariant.CIRCULAR}
                    showLabel
                />
                <ProgressBar
                    value={40}
                    variant={ProgressBarVariant.CIRCULAR}
                    appearance={ProgressBarAppearance.SEGMENTED}
                    size={ProgressBarSize.LG}
                />
            </View>

            <RNText style={styles.heading}>Skeleton blocks</RNText>
            <Skeleton width={220} height={16} />
            <Skeleton width={160} height={16} variant="wave" />
            <Skeleton width={48} height={48} shape="circle" />
            <Skeleton width={120} height={32} shape="rounded" />

            <RNText style={styles.heading}>Wrapping live content</RNText>
            <Skeleton>
                <Button buttonType={ButtonType.PRIMARY} text="Hidden button" />
            </Skeleton>
            <Skeleton>
                <Tag
                    text="Hidden tag"
                    type={TagType.SUBTLE}
                    color={TagColor.PRIMARY}
                />
            </Skeleton>

            <RNText style={styles.heading}>Toasts</RNText>
            <Button
                buttonType={ButtonType.PRIMARY}
                text="Show toast"
                onPress={() =>
                    showToast({
                        content: (
                            <View style={styles.toast}>
                                <RNText style={styles.toastText}>
                                    Payment link copied
                                </RNText>
                            </View>
                        ),
                        announcement: 'Payment link copied',
                    })
                }
            />
            <Button
                buttonType={ButtonType.SECONDARY}
                text="Sticky toast with undo"
                onPress={() =>
                    showToast({
                        duration: null,
                        content: (dismiss) => (
                            <View style={styles.toast}>
                                <RNText style={styles.toastText}>
                                    Message archived
                                </RNText>
                                <RNText
                                    style={styles.toastAction}
                                    onPress={dismiss}
                                >
                                    Undo
                                </RNText>
                            </View>
                        ),
                    })
                }
            />
            <Button
                buttonType={ButtonType.DANGER}
                text="Dismiss all"
                onPress={() => dismissToast()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    column: { gap: 12 },
    heading: {
        fontSize: 15,
        fontWeight: '600',
        color: '#717784',
        marginTop: 8,
    },
    // Toast chrome is the caller's job until SnackbarV2 lands — the host
    // only stacks, times and animates.
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#1A1C23',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    toastText: { color: '#F5F6F7', fontSize: 14 },
    toastAction: { color: '#8DB2FA', fontSize: 14, fontWeight: '600' },
})
