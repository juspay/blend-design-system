import { forwardRef, useId } from 'react'
import {
    KeyValuePairV2PropTypes,
    KeyValuePairV2Size,
    KeyValuePairV2StateType,
} from './keyValuePairV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { KeyValuePairV2TokensType } from './keyValuePairV2.tokens'
import { ResponsiveText } from './ResponsiveText'
import { KeyValuePairLayout } from './KeyValuePairLayout'
import { getContainerStyles, getLayoutStyles, getSlotStyles } from './utils'

/**
 * Orchestrator: composes tokens, layout, and ResponsiveText.
 * Computes styles and delegates structure to KeyValuePairLayout.
 */
const KeyValuePairV2 = forwardRef<HTMLDivElement, KeyValuePairV2PropTypes>(
    (
        {
            keyString,
            size = KeyValuePairV2Size.SM,
            value,
            slots = {
                key: null,
                value: {
                    left: null,
                    right: null,
                },
            },
            keyValuePairState = KeyValuePairV2StateType.vertical,
            maxWidth = '220px',
            textOverflow = 'truncate',
            maxLines = 2,
            showTooltipOnTruncate = true,
        },
        ref
    ) => {
        const keyValuePairTokens =
            useResponsiveTokens<KeyValuePairV2TokensType>('KEYVALUEPAIRV2')

        const containerStyles = {
            ...getLayoutStyles(keyValuePairState, keyValuePairTokens),
            ...getContainerStyles(textOverflow, maxWidth),
        } as React.CSSProperties

        const keyContainerStyles: React.CSSProperties = {
            display: 'flex',
            gap: keyValuePairTokens.key.gap,
            alignItems: textOverflow !== 'truncate' ? 'self-start' : 'center',
        }

        const valueContainerStyles: React.CSSProperties = {
            display: 'flex',
            gap: keyValuePairTokens.value.gap,
            alignItems: textOverflow !== 'truncate' ? 'self-start' : 'center',
            overflow: textOverflow === 'truncate' ? 'hidden' : 'visible',
        }

        const slotStyles = getSlotStyles(
            keyValuePairTokens
        ) as React.CSSProperties

        const baseId = useId()
        const keyId = `${baseId}-key`
        const valueId = `${baseId}-value`
        const keyFlexClass = slots.key ? '' : 'flex-1'
        const valueFlexClass = slots.value?.right ? '' : 'flex-1'

        const keyContent = (
            <ResponsiveText
                className={keyFlexClass}
                fontSize={keyValuePairTokens.key.fontSize}
                color={keyValuePairTokens.key.color}
                fontWeight={keyValuePairTokens.key.fontWeight}
                textOverflow="truncate"
                maxLines={maxLines}
                showTooltipOnTruncate={false}
                id={keyId}
                role="term"
                slotPresent={!!slots.key}
                aria-label={keyString}
            >
                {keyString}
            </ResponsiveText>
        )

        const valueContent = (
            <ResponsiveText
                className={`${valueFlexClass} min-w-0`}
                fontSize={
                    keyValuePairTokens.value.fontSize[
                        size as KeyValuePairV2Size
                    ]
                }
                color={keyValuePairTokens.value.color}
                fontWeight={keyValuePairTokens.value.fontWeight}
                textOverflow={textOverflow}
                maxLines={maxLines}
                showTooltipOnTruncate={showTooltipOnTruncate}
                id={valueId}
                role="definition"
                slotPresent={!!slots.value?.right}
                aria-labelledby={keyId}
            >
                {value || ''}
            </ResponsiveText>
        )

        return (
            <KeyValuePairLayout
                ref={ref}
                containerStyle={containerStyles}
                keyContainerStyle={keyContainerStyles}
                valueContainerStyle={valueContainerStyles}
                keySlotStyle={slotStyles}
                keyContent={keyContent}
                valueContent={valueContent}
                keySlot={slots.key}
                valueLeftSlot={slots.value?.left}
                valueRightSlot={slots.value?.right}
                dataKeyValuePair={keyString || 'keyvaluepair'}
                ariaLabel={`${keyString}: ${value || ''}`}
                keyDataId={keyString || 'key'}
                valueDataId={value || 'value'}
            />
        )
    }
)

KeyValuePairV2.displayName = 'KeyValuePairV2'

export default KeyValuePairV2
