import React, { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'

export type KeyValuePairLayoutProps = {
    containerStyle: React.CSSProperties
    keyContainerStyle: React.CSSProperties
    valueContainerStyle: React.CSSProperties
    keySlotStyle: React.CSSProperties
    keyContent: React.ReactNode
    valueContent: React.ReactNode
    keySlot?: React.ReactNode
    valueLeftSlot?: React.ReactNode
    valueRightSlot?: React.ReactNode
    dataKeyValuePair?: string
    ariaLabel?: string
    keyDataElement?: string
    keyDataId?: string
    valueDataElement?: string
    valueDataId?: string
}

/**
 * Layout-only presentational component for KeyValuePair.
 * Renders the structure: container > key block (content + slot) | value block (left slot + content + right slot).
 * No tokens or business logic; receives pre-computed styles and content.
 */
export const KeyValuePairLayout = forwardRef<
    HTMLDivElement,
    KeyValuePairLayoutProps
>(function KeyValuePairLayout(
    {
        containerStyle,
        keyContainerStyle,
        valueContainerStyle,
        keySlotStyle,
        keyContent,
        valueContent,
        keySlot,
        valueLeftSlot,
        valueRightSlot,
        dataKeyValuePair = 'keyvaluepair',
        ariaLabel,
        keyDataElement = 'key',
        keyDataId,
        valueDataElement = 'value',
        valueDataId,
    },
    ref
) {
    return (
        <Block
            ref={ref}
            data-keyvaluepair={dataKeyValuePair}
            style={containerStyle}
            aria-label={ariaLabel}
        >
            <Block
                data-element={keyDataElement}
                data-id={keyDataId}
                style={keyContainerStyle}
            >
                {keyContent}
                {keySlot != null && (
                    <Block data-element="key-slot" style={keySlotStyle}>
                        {keySlot}
                    </Block>
                )}
            </Block>

            <Block
                data-element={valueDataElement}
                data-id={valueDataId}
                style={valueContainerStyle}
            >
                {valueLeftSlot != null && (
                    <Block data-element="value-left-slot" style={keySlotStyle}>
                        {valueLeftSlot}
                    </Block>
                )}
                {valueContent}
                {valueRightSlot != null && (
                    <Block data-element="value-right-slot" style={keySlotStyle}>
                        {valueRightSlot}
                    </Block>
                )}
            </Block>
        </Block>
    )
})
