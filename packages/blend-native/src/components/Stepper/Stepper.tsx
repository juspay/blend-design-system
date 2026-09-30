import { memo, useEffect, useState } from 'react'
import {
    AccessibilityInfo,
    View,
    type GestureResponderEvent,
} from 'react-native'
import { Check, Lock, ChevronRightChevronDown } from './stepper.icons'
import {
    StepperV2StepStatus,
    StepperV2Type,
    type StepperV2TokensType,
} from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import Block from '../../primitives/Block'
import Pressable from '../../primitives/Pressable'
import { Text } from '../../primitives/Text'
import { parseBorder, parseDimension } from '../../adapters/cssStringAdapter'
import type { StepperNativeProps, StepperStep } from './stepper.types'

/**
 * RN's `AccessibilityRole` has no standalone "group" — omitting the role
 * leaves the announcement to the label alone, which matches web's `role="group"`.
 */
const ROLE_GROUP = undefined
import {
    buildSubstepRowLabel,
    getStepAriaLabel,
    getStepState,
    getSubstepTextColor,
    hasVisibleSubsteps,
    resolveSubstepFlags,
} from './stepper.utils'

/**
 * Stepper — the native port of web's `StepperV2`.
 *
 * Renders a step-status indicator in horizontal or vertical mode, with
 * optional substep expansion (vertical only). Tokens resolve through
 * `useNativeTokens('STEPPERV2')`.
 *
 * **DOM hazards handled:**
 * - Web measures `clientHeight` via `requestAnimationFrame` to align
 *   substep rows with their rail dots. Native uses `onLayout`.
 * - Web's off-screen `aria-live` region is replaced by
 *   `AccessibilityInfo.announceForAccessibility` on step presses.
 * - `_hover` / `_focusVisible` pseudo-states are dropped (no hover or
 *   focus ring on touch).
 */
const StepperImpl = ({
    steps,
    onStepClick,
    onSubstepClick,
    clickable = false,
    stepperType = StepperV2Type.HORIZONTAL,
    testID,
    accessibilityLabel,
    style,
}: StepperNativeProps) => {
    const tokens = useNativeTokens<StepperV2TokensType>('STEPPERV2')

    const currentExplicitIndex = steps.findIndex(
        (s) => s.status === StepperV2StepStatus.CURRENT
    )
    const derivedIndex = currentExplicitIndex >= 0 ? currentExplicitIndex : 0

    const isHorizontal = stepperType === StepperV2Type.HORIZONTAL
    const gap = parseDimension(tokens.container.gap) ?? 6

    return (
        <Block
            accessibilityRole={ROLE_GROUP}
            accessibilityLabel={
                accessibilityLabel ??
                `Progress indicator: step ${derivedIndex + 1} of ${steps.length}`
            }
            testID={testID}
            // Vertical mode needs this gap to separate one step's block from
            // the next. Horizontal mode must NOT have it: each step already
            // draws its own half of the connector line via flex (left half
            // up to its circle, right half out from it), so an extra gap
            // between step boxes lands as a blank tick with nothing drawn
            // inside it — right where two connector halves should meet.
            gap={isHorizontal ? 0 : gap}
            flexDirection={isHorizontal ? 'row' : 'column'}
            justifyContent={isHorizontal ? 'space-between' : 'flex-start'}
            // Web's `width: 'auto'` on a block element fills its container
            // by default; RN's `'auto'` means the opposite (shrink to
            // content). Vertical mode needs an explicit '100%' to get the
            // same full-width layout web gets "for free".
            width="100%"
            style={style}
        >
            {steps.map((step, index) => (
                <StepRow
                    key={step.id}
                    step={step}
                    stepIndex={index}
                    stepsLength={steps.length}
                    isCompleted={index < derivedIndex}
                    isCurrent={index === derivedIndex}
                    isFirst={index === 0}
                    isLast={index === steps.length - 1}
                    isHorizontal={isHorizontal}
                    clickable={clickable}
                    onStepClick={onStepClick}
                    onSubstepClick={onSubstepClick}
                    tokens={tokens}
                    testID={testID ? `${testID}-step-${index}` : undefined}
                />
            ))}
        </Block>
    )
}

export const Stepper = memo(StepperImpl)
Stepper.displayName = 'Stepper'
export default Stepper

// ---------------------------------------------------------------------------
// StepRow
// ---------------------------------------------------------------------------

type StepRowParams = {
    step: StepperStep
    stepIndex: number
    stepsLength: number
    isCompleted: boolean
    isCurrent: boolean
    isFirst: boolean
    isLast: boolean
    isHorizontal: boolean
    clickable: boolean
    onStepClick?: (stepIndex: number, event: GestureResponderEvent) => void
    onSubstepClick?: (stepId: number, substepIndex: number) => void
    tokens: StepperV2TokensType
    testID?: string
}

function StepRow({
    step,
    stepIndex,
    stepsLength,
    isCompleted,
    isCurrent,
    isLast,
    isHorizontal,
    clickable,
    onStepClick,
    onSubstepClick,
    tokens,
    testID,
}: StepRowParams) {
    const stepState = getStepState(step, isCompleted, isCurrent)
    const hasSubsteps = hasVisibleSubsteps(step)
    const isExpandable = step.isExpandable ?? hasSubsteps
    const [isExpanded, setIsExpanded] = useState<boolean>(
        step.isExpanded ?? hasSubsteps
    )

    // Controlled expanded state, web parity.
    useEffect(() => {
        if (step.isExpanded !== undefined) setIsExpanded(step.isExpanded)
    }, [step.isExpanded])

    const isClickable = Boolean(clickable && !step.disabled && onStepClick)

    const stepLabel = getStepAriaLabel(
        stepIndex,
        stepsLength,
        step.title,
        stepState
    )

    const toggleExpand = () => {
        if (!isExpandable) return
        setIsExpanded((v) => !v)
    }

    const announceStep = () => {
        AccessibilityInfo.announceForAccessibility(
            `Step ${stepIndex + 1}: ${step.title}`
        )
    }

    const handlePress = (event: GestureResponderEvent) => {
        if (!isClickable || !onStepClick) return
        onStepClick(stepIndex, event)
        announceStep()
    }

    const stepIcon = renderStepIcon(step, stepIndex, stepState, tokens)

    if (isHorizontal) {
        // The step is one accessible node: circle + connectors + title all
        // live inside the Pressable so the label and the press target are
        // the same element (web wraps the whole step in the button too).
        const isLabeled = Boolean(clickable && onStepClick)
        return (
            <Block
                // Web's `width: 100%` here relies on CSS's default
                // flex-shrink: 1 to squeeze four "100%-wide" siblings down
                // to fit the row. RN's default flex-shrink is 0 — nothing
                // shrinks, so each step claimed the whole row and pushed
                // every step after the first off-screen. flexBasis: 0 +
                // grow/shrink: 1 splits the row evenly instead, which is
                // safe here since the row's own width is bounded by the
                // screen (unlike the vertical ScrollView's height).
                style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }}
                flexDirection="column"
                gap={tokens.container.gap}
                testID={testID}
            >
                <Pressable
                    onPress={isClickable ? handlePress : undefined}
                    disabled={!isClickable}
                    minTouchTarget={0}
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    accessible
                    accessibilityRole={isLabeled ? 'button' : ROLE_GROUP}
                    accessibilityLabel={isLabeled ? stepLabel : undefined}
                    accessibilityState={{
                        disabled: !!step.disabled || undefined,
                        selected: isClickable && isCurrent ? true : undefined,
                    }}
                    paddingTop={String(
                        tokens.container.step.circle[stepState].default
                            .paddingTop
                    )}
                    paddingBottom={String(
                        tokens.container.step.circle[stepState].default
                            .paddingBottom
                    )}
                    rippleBorderless
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'stretch',
                        }}
                    >
                        {/* Left connector */}
                        <View
                            style={{
                                flex: 1,
                                height:
                                    parseDimension(
                                        tokens.container.connector.line.height
                                    ) ?? 1,
                                backgroundColor:
                                    stepIndex > 0
                                        ? String(
                                              tokens.container.connector.line
                                                  .color
                                          )
                                        : 'transparent',
                            }}
                        />
                        <StepCircle stepState={stepState} tokens={tokens}>
                            {stepIcon}
                        </StepCircle>
                        {/* Right connector */}
                        <View
                            style={{
                                flex: 1,
                                height:
                                    parseDimension(
                                        tokens.container.connector.line.height
                                    ) ?? 1,
                                backgroundColor:
                                    stepIndex < stepsLength - 1
                                        ? String(
                                              tokens.container.connector.line
                                                  .color
                                          )
                                        : 'transparent',
                            }}
                        />
                    </View>
                    <Text
                        numberOfLines={1}
                        textAlign="center"
                        fontSize={String(
                            tokens.container.title.text[stepState].default
                                .fontSize
                        )}
                        fontWeight={
                            tokens.container.title.text[stepState].default
                                .fontWeight
                        }
                        color={String(
                            tokens.container.title.text[stepState].default.color
                        )}
                    >
                        {step.title}
                    </Text>
                </Pressable>
            </Block>
        )
    }

    // ── Vertical ────────────────────────────────────────────────────────

    const circleV = tokens.container.step.circle[stepState].default
    const titleV = tokens.container.title.text[stepState].default
    const gapV = (parseDimension(tokens.container.gap) ?? 6) + 2
    // Both the circle's own column and each substep's dot column need the
    // same width so the dots land centered under the circle above them.
    const railWidth = parseDimension(circleV.size) ?? 28

    return (
        <Block
            // Same 'auto' ≠ 'auto' gap as the Stepper root above — this row
            // needs to actually span its parent's width for the substep
            // label's `flex: 1` (below) to have real space to grow into.
            width="100%"
            flexDirection="column"
            testID={testID}
            accessibilityRole={ROLE_GROUP}
        >
            <Block flexDirection="row" gap={gapV}>
                {/* Rail column: circle + connector down to the first
                    substep (or straight to the next step, if collapsed). */}
                <Block
                    flexDirection="column"
                    alignItems="center"
                    width={railWidth}
                >
                    <Block
                        paddingTop={String(circleV.paddingTop)}
                        paddingBottom={String(circleV.paddingBottom)}
                    >
                        <StepCircle stepState={stepState} tokens={tokens}>
                            {stepIcon}
                        </StepCircle>
                    </Block>
                    <VerticalLine
                        color={
                            isLast && (!hasSubsteps || !isExpanded)
                                ? 'transparent'
                                : String(tokens.container.connector.line.color)
                        }
                    />
                </Block>

                {/* Content column */}
                <Block
                    flexDirection="column"
                    paddingTop={String(titleV.paddingTop)}
                    paddingRight={String(titleV.paddingRight)}
                    paddingBottom={String(titleV.paddingBottom)}
                    paddingLeft={String(titleV.paddingLeft)}
                    style={{ flex: 1 }}
                >
                    <Block
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={titleV.gap}
                    >
                        <Pressable
                            flexDirection="column"
                            gap={2}
                            style={{ flex: 1 }}
                            onPress={isClickable ? handlePress : undefined}
                            disabled={!isClickable}
                            minTouchTarget={0}
                            accessible
                            accessibilityRole={
                                isClickable ? 'button' : ROLE_GROUP
                            }
                            accessibilityLabel={stepLabel}
                            accessibilityState={{
                                disabled: !!step.disabled || undefined,
                                selected:
                                    isClickable && isCurrent ? true : undefined,
                            }}
                            rippleBorderless
                        >
                            <Text
                                numberOfLines={1}
                                fontSize={String(titleV.fontSize)}
                                fontWeight={titleV.fontWeight}
                                color={String(titleV.color)}
                            >
                                {step.title}
                            </Text>
                            {step.description && (
                                <DescriptionText
                                    description={step.description}
                                    tokens={tokens}
                                />
                            )}
                        </Pressable>

                        {isExpandable && (
                            <Pressable
                                onPress={toggleExpand}
                                accessibilityRole="button"
                                accessibilityLabel={
                                    isExpanded
                                        ? `Collapse substeps for ${step.title}`
                                        : `Expand substeps for ${step.title}`
                                }
                                accessibilityState={{ expanded: isExpanded }}
                                flexShrink={0}
                                rippleBorderless
                            >
                                <ChevronExpander
                                    isExpanded={isExpanded}
                                    tokens={tokens}
                                />
                            </Pressable>
                        )}
                    </Block>
                </Block>
            </Block>

            {/* Substeps — each is its own row (dot + connector | text) so the
                dot and its label are siblings in one flex row instead of two
                independently-flowing columns kept in sync by measurement. */}
            {isExpanded && hasSubsteps && (
                <SubstepRows
                    step={step}
                    railWidth={railWidth}
                    isLastStep={isLast}
                    clickable={!!clickable}
                    onSubstepClick={onSubstepClick}
                    tokens={tokens}
                />
            )}
        </Block>
    )
}

// ---------------------------------------------------------------------------
// Step icon — Check for completed, Lock for disabled, number otherwise.
// ---------------------------------------------------------------------------

function renderStepIcon(
    step: StepperStep,
    stepIndex: number,
    stepState: StepperV2StepStatus,
    tokens: StepperV2TokensType
): React.ReactNode {
    if (step.icon) return step.icon

    const iconColor = String(
        tokens.container.step.icon[stepState].default.color
    )
    switch (stepState) {
        case StepperV2StepStatus.COMPLETED:
            return <Check size={14} color={iconColor} />
        case StepperV2StepStatus.DISABLED:
            return <Lock size={14} color={iconColor} />
        default:
            return (
                <Text fontSize={12} fontWeight={500} color={iconColor}>
                    {stepIndex + 1}
                </Text>
            )
    }
}

// ---------------------------------------------------------------------------
// StepCircle
// ---------------------------------------------------------------------------

function StepCircle({
    stepState,
    tokens,
    children,
}: {
    stepState: StepperV2StepStatus
    tokens: StepperV2TokensType
    children: React.ReactNode
}) {
    const circle = tokens.container.step.circle[stepState].default
    const size = parseDimension(circle.size) ?? 28

    // The token's borderRadius is '50%' — unparseable on native. Width and
    // height are equal, so a numeric half-size radius gives the same circle.
    return (
        <Block
            width={size}
            height={size}
            backgroundColor={String(circle.backgroundColor)}
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            style={{
                borderRadius: size / 2,
                ...parseBorder(
                    `${circle.borderWidth} solid ${circle.borderColor}`
                ),
            }}
        >
            {children}
        </Block>
    )
}

// ---------------------------------------------------------------------------
// VerticalLine — 1px rail between step circles, fixed at 32.
// ---------------------------------------------------------------------------

/**
 * Web's `VerticalLineV2` uses `flex: 1` to stretch the connector to match
 * its row's height — safe there because the row sits in normal document
 * flow. Native's equivalent row lives inside a `ScrollView`'s content,
 * which Yoga measures with effectively unbounded available height; a
 * `flexGrow` child in that pass consumes all of it, so the "short connector
 * between circles" rendered full-screen tall (and, through the same
 * measurement, pushed every later step off-screen). A fixed height sidesteps
 * that measurement pass entirely — the tick reads the same either way, and
 * `SubstepRows` below pairs each dot with its label in one row instead of
 * relying on matched column heights for alignment.
 *
 * Shared with `SubstepRow`'s own trailing segment (`RAIL_GAP`) so the gap
 * from a step's circle down to its first substep matches the gap from its
 * last substep down to the next step — one rail, one rhythm.
 */
const RAIL_GAP = 28

function VerticalLine({ color }: { color: string }) {
    return (
        <View
            accessible={false}
            style={{
                width: 1,
                height: RAIL_GAP,
                backgroundColor: color,
            }}
        />
    )
}

// ---------------------------------------------------------------------------
// SubstepRows — one flex row per substep: dot + connector beside its label,
// so the two can never drift out of alignment the way separately-flowing
// dot and text columns did.
// ---------------------------------------------------------------------------

function SubstepRows({
    step,
    railWidth,
    isLastStep,
    clickable,
    onSubstepClick,
    tokens,
}: {
    step: StepperStep
    railWidth: number
    isLastStep: boolean
    clickable: boolean
    onSubstepClick?: (stepId: number, substepIndex: number) => void
    tokens: StepperV2TokensType
}) {
    if (!step.substeps?.length) return null

    const lineColor = String(tokens.container.subConnector.line.color)
    const dotTokens = tokens.container.subConnector.dot
    const dotSize = parseDimension(dotTokens.width) ?? 8
    const dotRadius = Math.round(dotSize / 2)
    const dotBorder = parseBorder(String(dotTokens.border))
    const textStyle = tokens.container.subConnector.text.default
    const substeps = step.substeps

    return (
        <Block
            flexDirection="column"
            accessibilityRole={ROLE_GROUP}
            accessibilityLabel={`Substeps for ${step.title}`}
        >
            {substeps.map((subStep, index) => {
                const isLastSubstep = index === substeps.length - 1
                const flags = resolveSubstepFlags(subStep)
                const isSubstepDisabled = !!step.disabled || !!subStep.disabled
                const textColor = getSubstepTextColor(tokens, {
                    isSubstepDisabled,
                    ...flags,
                })
                const rowLabel = buildSubstepRowLabel(
                    index,
                    subStep.title,
                    flags.isSubstepCompleted,
                    flags.isSubstepCurrent,
                    isSubstepDisabled,
                    flags.isSubstepSkipped
                )
                const canPress =
                    clickable && !!onSubstepClick && !isSubstepDisabled

                return (
                    <SubstepRow
                        key={subStep.id}
                        title={subStep.title}
                        railWidth={railWidth}
                        // The rail continues past this dot unless there is
                        // nothing left to connect to (the very last dot of
                        // the last step).
                        showTrailingLine={!(isLastSubstep && isLastStep)}
                        lineColor={lineColor}
                        dotSize={dotSize}
                        dotRadius={dotRadius}
                        dotBorder={dotBorder}
                        textFontSize={String(textStyle.fontSize)}
                        textFontWeight={textStyle.fontWeight}
                        textColor={textColor}
                        rowLabel={rowLabel}
                        isSubstepDisabled={isSubstepDisabled}
                        isSubstepCurrent={flags.isSubstepCurrent}
                        canPress={canPress}
                        onPress={
                            canPress && onSubstepClick
                                ? () => onSubstepClick(step.id, index + 1)
                                : undefined
                        }
                    />
                )
            })}
        </Block>
    )
}

/**
 * One substep: a dot (+ connecting rail) beside its label.
 *
 * The dot centers against the label's *measured* height rather than a
 * guessed fixed one — the substep text isn't a fixed size (it comes from a
 * token and can run through a wildly different font stack on device, e.g.
 * falling back to a serif system font at 2x the expected size), so a static
 * offset that looks right in one build looks wrong the moment the font
 * metrics change. `onLayout` reports what actually rendered.
 *
 * Both ticks around the dot are computed as plain `(textHeight - dotSize) /
 * 2` rather than `flex: 1` inside an explicitly-sized parent (which would
 * also have worked, and is safe once the parent has a real number — the
 * hazard is only ever a flex-grow child whose *ancestor's* height is itself
 * indefinite, which inside a `ScrollView` resolves against the screen and is
 * exactly what caused the original full-screen-tall connector bug). Plain
 * arithmetic instead of trusting a flex engine's split guarantees this row's
 * top tick and the row above's bottom tick — two independent components —
 * come out to the *same* number for the same measured text height, so the
 * rail reads as continuous and evenly spaced rather than merely "close".
 *
 * The `RAIL_GAP` segment below the ticks is separate from that split — a
 * fixed height so it draws the line straight through the space before the
 * next row instead of leaving a gap there (an actual `margin`, tried first,
 * left a visible break: nothing draws inside a margin). The label sits at
 * the row's top with nothing appended, so this same `RAIL_GAP` becomes the
 * blank space beneath it — matching gap, continuous line, one number.
 */
function SubstepRow({
    title,
    railWidth,
    showTrailingLine,
    lineColor,
    dotSize,
    dotRadius,
    dotBorder,
    textFontSize,
    textFontWeight,
    textColor,
    rowLabel,
    isSubstepDisabled,
    isSubstepCurrent,
    canPress,
    onPress,
}: {
    title: string
    railWidth: number
    showTrailingLine: boolean
    lineColor: string
    dotSize: number
    dotRadius: number
    dotBorder: ReturnType<typeof parseBorder>
    textFontSize: string
    textFontWeight: number | string | undefined
    textColor: string
    rowLabel: string
    isSubstepDisabled: boolean
    isSubstepCurrent: boolean
    canPress: boolean
    onPress?: () => void
}) {
    const [textHeight, setTextHeight] = useState(0)
    // Plain arithmetic, not flex-grow: the two ticks must come out to
    // *exactly* the same number on both this row's top and the row above's
    // bottom for the rail to look continuous and evenly spaced, and a flex
    // engine (RN's or RN-web's, which don't always resolve identical splits
    // for identical inputs) is the wrong place to trust for that.
    const tickHeight = Math.max(0, (textHeight - dotSize) / 2)

    return (
        <Block flexDirection="row" alignItems="flex-start">
            <Block flexDirection="column" alignItems="center" width={railWidth}>
                <View
                    style={{
                        width: 1,
                        height: tickHeight,
                        backgroundColor: lineColor,
                    }}
                />
                <View
                    style={{
                        width: dotSize,
                        height: dotSize,
                        borderRadius: dotRadius,
                        ...dotBorder,
                    }}
                />
                <View
                    style={{
                        width: 1,
                        height: tickHeight,
                        backgroundColor: lineColor,
                    }}
                />
                <View
                    style={{
                        width: 1,
                        height: RAIL_GAP,
                        backgroundColor: showTrailingLine
                            ? lineColor
                            : 'transparent',
                    }}
                />
            </Block>
            <Pressable
                onPress={onPress}
                disabled={!canPress}
                minTouchTarget={0}
                style={{ flex: 1 }}
                accessibilityRole="button"
                accessibilityLabel={rowLabel}
                accessibilityState={{
                    disabled: isSubstepDisabled || undefined,
                    selected: isSubstepCurrent || undefined,
                }}
            >
                <Text
                    numberOfLines={1}
                    fontSize={textFontSize}
                    fontWeight={textFontWeight}
                    color={textColor}
                    onLayout={(e) => setTextHeight(e.nativeEvent.layout.height)}
                >
                    {title}
                </Text>
            </Pressable>
        </Block>
    )
}

// ---------------------------------------------------------------------------
// DescriptionText
// ---------------------------------------------------------------------------

function DescriptionText({
    description,
    tokens,
}: {
    description: string
    tokens: StepperV2TokensType
}) {
    const d = tokens.container.description.text
    return (
        <Text
            numberOfLines={1}
            fontSize={String(d.fontSize)}
            fontWeight={d.fontWeight}
            color={String(d.color)}
        >
            {description}
        </Text>
    )
}

// ---------------------------------------------------------------------------
// ChevronExpander — chevron rotating 180° when expanded.
// ---------------------------------------------------------------------------

function ChevronExpander({
    isExpanded,
    tokens,
}: {
    isExpanded: boolean
    tokens: StepperV2TokensType
}) {
    const expander = tokens.container.subConnector.expander
    const size = parseDimension(expander.width) ?? 16
    return (
        <View
            style={{
                transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
            }}
            accessible={false}
        >
            <ChevronRightChevronDown
                size={size}
                color={String(expander.icon.color)}
            />
        </View>
    )
}
