import { Children, Fragment, forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import type { View as RNView } from 'react-native'
import { AccordionV2Type } from '@juspay/blend-design-system/node'
import type { AccordionV2TokensType } from '@juspay/blend-design-system/node'
import { useNativeTokens } from '../../theme/useNativeTokens'
import { useControllableState } from '../../hooks/useControllableState'
import Separator from '../../primitives/Separator'
import { parseDimension } from '../../adapters/cssStringAdapter'
import { AccordionContext } from './accordion.context'
import type { AccordionNativeProps } from './accordion.types'

/**
 * Accordion root — the native port of web's `AccordionV2`.
 *
 * Single or multiple expansion (`isMultiple`), controlled and uncontrolled
 * — controlled-ness follows the current render, not web's mount-latched
 * ref. `collapsible` is always true, web parity. BORDER type interleaves
 * `Separator`s between items (web injects isFirst/isLast via cloneElement;
 * interleaving needs neither).
 */
const Accordion = forwardRef<RNView, AccordionNativeProps>(function Accordion(
    {
        children,
        accordionType = AccordionV2Type.NO_BORDER,
        defaultValue,
        value,
        isMultiple = false,
        onValueChange,
        testID,
        style,
    },
    ref
) {
    const tokens = useNativeTokens<AccordionV2TokensType>('ACCORDIONV2')

    const [current, setCurrent] = useControllableState<string | string[]>(
        value,
        defaultValue ?? (isMultiple ? [] : ''),
        onValueChange
    )

    const expandedValues = useMemo(
        () =>
            Array.isArray(current) ? current : current === '' ? [] : [current],
        [current]
    )

    const context = useMemo(
        () => ({
            expandedValues,
            toggle: (itemValue: string) => {
                if (isMultiple) {
                    const list = Array.isArray(current)
                        ? current
                        : current === ''
                          ? []
                          : [current]
                    setCurrent(
                        list.includes(itemValue)
                            ? list.filter((v) => v !== itemValue)
                            : [...list, itemValue]
                    )
                } else {
                    // collapsible is always true, web parity.
                    setCurrent(current === itemValue ? '' : itemValue)
                }
            },
            accordionType,
        }),
        [expandedValues, current, isMultiple, accordionType, setCurrent]
    )

    const items = Children.toArray(children)
    const bordered = accordionType === AccordionV2Type.BORDER

    return (
        <AccordionContext.Provider value={context}>
            <View
                ref={ref}
                testID={testID}
                style={[
                    {
                        gap:
                            parseDimension(
                                tokens.gap[accordionType] as string | number
                            ) ?? 0,
                        alignSelf: 'stretch',
                    },
                    style,
                ]}
            >
                {items.map((child, index) => (
                    <Fragment key={index}>
                        {child}
                        {bordered && index < items.length - 1 && (
                            <Separator
                                orientation="horizontal"
                                color={String(
                                    tokens.separator.color[accordionType]
                                )}
                                style={{ alignSelf: 'stretch', width: '100%' }}
                            />
                        )}
                    </Fragment>
                ))}
            </View>
        </AccordionContext.Provider>
    )
})

Accordion.displayName = 'Accordion'

export default Accordion
