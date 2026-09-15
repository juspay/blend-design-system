import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import type { View as RNView } from 'react-native'
import {
    StatCardV2ArrowDirection,
    StatCardV2ChangeType,
    StatCardV2Variant,
} from '@juspay/blend-design-system/node'
import type { StatCardV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useNativeBreakpoint } from '../../theme/useNativeBreakpoint'
import { parseDimension } from '../../adapters/cssStringAdapter'
import Block from '../../primitives/Block'
import Text from '../../primitives/Text'

import { Skeleton } from '../Skeleton'
import { ProgressBar } from '../ProgressBar'
import {
    ProgressBarV2Appearance,
    ProgressBarV2Size,
    ProgressBarV2Variant,
} from '@juspay/blend-design-system/node'
import { Sparkline } from '../Sparkline'
import type { SurfaceStyleProps } from '../../adapters/surfaceStyle'
import type { StatCardNativeProps, StatCardChange } from './statcard.types'
import { buildStatCardAriaLabel } from './statcard.utils'

const FALLBACK_DISPLAY = '--'
/** Web's StatCardV2Skeleton default — 106px block that approximates the card's real chrome. */
const SKELETON_CARD_HEIGHT = 106

/** RN's default for width/height is already `auto` — emitting the string
 * can stretch the view instead. Normalize to `undefined`. */
function noAuto(value: string | number | undefined) {
    return value === 'auto' ? undefined : value
}

/**
 * StatCard — the native port of web's `StatCardV2`.
 *
 * Renders a titled stat card with an optional value, change indicator,
 * subtitle, a progress bar (for the `PROGRESS_BAR` variant), or a sparkline
 * (for the `CHART` variant, via the sibling `Sparkline` component).
 */
const StatCard = forwardRef<RNView, StatCardNativeProps>(function StatCard(
    {
        title,
        titleIcon,
        actionIcon,
        value,
        progressValue,
        chartData,
        chartType,
        change,
        subtitle,
        variant = StatCardV2Variant.NUMBER,
        showBorder = true,
        skeleton,
        width = '100%',
        minWidth,
        maxWidth,
        height,
        children,
        accessibilityLabel,
        testID,
        style,
    },
    ref
) {
    const tokens = useNativeTokens<StatCardV2TokensType>('STATCARDV2')
    const breakpoint = useNativeBreakpoint()
    const isSmallScreen = breakpoint === 'sm'

    const isChartVariant = variant === StatCardV2Variant.CHART
    const isProgressBarVariant = variant === StatCardV2Variant.PROGRESS_BAR
    const isNumberVariant = variant === StatCardV2Variant.NUMBER

    // Web parity: the NUMBER variant centres its content only on wide
    // viewports; small screens left-align.
    const contentAlignment =
        isNumberVariant && !isSmallScreen ? 'center' : 'flex-start'

    const effectiveChangeType =
        change?.changeType ?? StatCardV2ChangeType.INCREASE
    const effectiveArrowDirection =
        change?.arrowDirection ?? StatCardV2ArrowDirection.UP

    const hasValue = value !== undefined && value !== null && value !== ''
    const hasProgressValue =
        progressValue !== undefined && progressValue !== null

    const cardLabel = useMemo(
        () =>
            accessibilityLabel ??
            buildStatCardAriaLabel({ title, value, subtitle, change }),
        [accessibilityLabel, title, value, subtitle, change]
    )

    const t = tokens.topContainer.dataContainer
    const valueTokens = t.statsContainer.value[variant]

    const surface: SurfaceStyleProps = {
        paddingTop: showBorder
            ? parseDimension(tokens.paddingTop as string | number)
            : undefined,
        paddingBottom: showBorder
            ? parseDimension(tokens.paddingBottom as string | number)
            : undefined,
        paddingLeft: showBorder
            ? parseDimension(tokens.paddingLeft as string | number)
            : undefined,
        paddingRight: showBorder
            ? parseDimension(tokens.paddingRight as string | number)
            : undefined,
        border: showBorder ? String(tokens.border) : undefined,
        borderRadius: tokens.borderRadius as string | number,
        backgroundColor: String(tokens.backgroundColor),
        boxShadow: showBorder ? String(tokens.boxShadow) : undefined,
        // `auto` has no effect as an explicit Yoga style value and can
        // stretch the card in containers that centre their children —
        // omitting the key gives the true shrink-to-fit behaviour.
        width: noAuto(width ?? (tokens.width as string | number)),
        minWidth: minWidth ?? (tokens.minWidth as string | number),
        maxWidth: maxWidth ?? (tokens.maxWidth as string | number),
        height: noAuto(height ?? (tokens.height as string | number)),
    }

    // --- Skeleton -------------------------------------------------------
    if (skeleton?.show) {
        // Parity with web's StatCardV2Skeleton: a single placeholder block,
        // not a recoloured card. Use Skeleton's block mode (no children) so
        // the explicit width/height actually land — in wrap mode Skeleton
        // size-matches its child, which collapses to nothing here.
        const skeletonHeight = skeleton.height ?? SKELETON_CARD_HEIGHT
        const resolvedWidth =
            surface.width ?? surface.maxWidth ?? surface.minWidth ?? '100%'
        return (
            <Block
                ref={ref}
                width={resolvedWidth}
                maxWidth={surface.maxWidth}
                height={skeletonHeight}
                accessibilityLabel={cardLabel}
                testID={testID}
                style={style}
            >
                <Skeleton
                    variant={skeleton.variant}
                    shape="rounded"
                    width={resolvedWidth}
                    height={skeletonHeight}
                    testID={testID}
                />
            </Block>
        )
    }

    // --- No-data state --------------------------------------------------
    const hasChartData = chartData !== undefined && chartData.length > 0
    const hasNoData =
        !hasValue && !change && !hasProgressValue && !hasChartData && !children
    if (hasNoData) {
        return (
            <Block
                ref={ref}
                {...surface}
                accessibilityRole="summary"
                accessibilityLabel={cardLabel || title}
                testID={testID}
                style={style}
            >
                <StatCardTitle title={title} tokens={tokens} />
                <Text
                    fontSize={valueTokens.fontSize as string | number}
                    fontWeight={valueTokens.fontWeight as string | number}
                    color={String(valueTokens.color)}
                    lineHeight={valueTokens.lineHeight as string | number}
                >
                    {FALLBACK_DISPLAY}
                </Text>
                {subtitle ? (
                    <StatCardSubtitle subtitle={subtitle} tokens={tokens} />
                ) : null}
            </Block>
        )
    }

    // --- Main render ----------------------------------------------------
    return (
        <Block
            ref={ref}
            {...surface}
            flexDirection="column"
            justifyContent="space-between"
            gap={parseDimension(tokens.topContainer.gap as string | number)}
            accessibilityRole="summary"
            accessibilityLabel={cardLabel || title}
            testID={testID}
            style={style}
        >
            {/* topContainer */}
            <View
                style={{
                    flexDirection: isNumberVariant ? 'column' : 'row',
                    alignItems: contentAlignment,
                    gap: parseDimension(
                        tokens.topContainer.gap as string | number
                    ),
                }}
            >
                {actionIcon ? (
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            flexShrink: 0,
                        }}
                    >
                        {actionIcon}
                    </View>
                ) : null}
                {titleIcon ? (
                    <View style={{ flexShrink: 0 }}>{titleIcon}</View>
                ) : null}

                {/* dataContainer */}
                <View
                    style={{
                        flexShrink: 1,
                        flexGrow: 1,
                        flexDirection: 'column',
                        gap: parseDimension(t.gap as string | number),
                        alignItems: contentAlignment,
                    }}
                >
                    <StatCardTitle title={title} tokens={tokens} />

                    {/* stats wrapper */}
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: contentAlignment,
                        }}
                    >
                        {/* value + change row */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: parseDimension(
                                    t.statsContainer.gap as string | number
                                ),
                            }}
                        >
                            <Text
                                fontSize={
                                    valueTokens.fontSize as string | number
                                }
                                fontWeight={
                                    valueTokens.fontWeight as string | number
                                }
                                color={String(valueTokens.color)}
                                lineHeight={
                                    valueTokens.lineHeight as string | number
                                }
                                numberOfLines={1}
                                style={{ flexShrink: 1 }}
                            >
                                {hasValue ? value : FALLBACK_DISPLAY}
                            </Text>

                            {change ? (
                                <StatCardChange
                                    change={change}
                                    changeType={effectiveChangeType}
                                    arrowDirection={effectiveArrowDirection}
                                    tokens={tokens}
                                />
                            ) : null}
                        </View>

                        {subtitle ? (
                            <StatCardSubtitle
                                subtitle={subtitle}
                                tokens={tokens}
                            />
                        ) : null}
                    </View>
                </View>
            </View>

            {/* Variant-specific content */}
            {isProgressBarVariant &&
                (hasProgressValue ? (
                    <ProgressBar
                        value={progressValue as number}
                        size={ProgressBarV2Size.SM}
                        variant={ProgressBarV2Variant.LINEAR}
                        appearance={ProgressBarV2Appearance.SEGMENTED}
                        showLabel={true}
                    />
                ) : (
                    <Text
                        fontSize={valueTokens.fontSize as string | number}
                        fontWeight={valueTokens.fontWeight as string | number}
                        color={String(valueTokens.color)}
                        lineHeight={valueTokens.lineHeight as string | number}
                    >
                        {FALLBACK_DISPLAY}
                    </Text>
                ))}

            {isChartVariant &&
                (chartData?.length ? (
                    <View style={{ width: '100%' }}>
                        <Sparkline
                            data={chartData}
                            type={chartType ?? 'area'}
                            height={50}
                        />
                    </View>
                ) : (
                    <Text
                        fontSize={valueTokens.fontSize as string | number}
                        fontWeight={valueTokens.fontWeight as string | number}
                        color={String(valueTokens.color)}
                        lineHeight={valueTokens.lineHeight as string | number}
                    >
                        {FALLBACK_DISPLAY}
                    </Text>
                ))}

            {children}
        </Block>
    )
})
StatCard.displayName = 'StatCard'

export default StatCard

// --- Sub-components --------------------------------------------------------

type SubProps = {
    tokens: StatCardV2TokensType
}

function StatCardTitle({ title, tokens }: SubProps & { title: string }) {
    const tc = tokens.topContainer.dataContainer.titleContainer
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: parseDimension(tc.gap as string | number),
                flexShrink: 1,
            }}
        >
            <Text
                fontSize={tc.title.fontSize as string | number}
                fontWeight={tc.title.fontWeight as string | number}
                color={String(tc.title.color)}
                lineHeight={tc.title.lineHeight as string | number}
                numberOfLines={1}
            >
                {title}
            </Text>
        </View>
    )
}

function StatCardSubtitle({
    subtitle,
    tokens,
}: SubProps & { subtitle: string }) {
    const st = tokens.topContainer.dataContainer.subtitle
    return (
        <Text
            fontSize={st.fontSize as string | number}
            fontWeight={st.fontWeight as string | number}
            color={String(st.color)}
            lineHeight={st.lineHeight as string | number}
        >
            {subtitle}
        </Text>
    )
}

function StatCardChange({
    change,
    changeType,
    arrowDirection,
    tokens,
}: SubProps & {
    change: StatCardChange
    changeType: StatCardV2ChangeType
    arrowDirection: StatCardV2ArrowDirection
}) {
    const ct = tokens.topContainer.dataContainer.statsContainer.changeContainer
    const arrowColor = String(ct.arrow.color[changeType])
    const arrowSize = parseDimension(ct.arrow.width as string | number) ?? 12

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: parseDimension(ct.gap as string | number),
                flexShrink: 0,
            }}
        >
            <View
                style={{
                    width: arrowSize,
                    height: arrowSize,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    fontSize={arrowSize}
                    color={arrowColor}
                    style={{ includeFontPadding: false }}
                >
                    {arrowDirection === StatCardV2ArrowDirection.UP ? '↑' : '↓'}
                </Text>
            </View>
            <Text
                fontSize={ct.change.fontSize as string | number}
                fontWeight={ct.change.fontWeight as string | number}
                color={String(ct.change.color[changeType])}
                lineHeight={ct.change.lineHeight as string | number}
            >
                {`${change.leftSymbol ?? ''}${change.value}${change.rightSymbol ?? ''}`}
            </Text>
        </View>
    )
}
