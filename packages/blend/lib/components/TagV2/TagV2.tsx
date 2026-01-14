import { forwardRef, useMemo } from 'react'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { TagV2TokensType } from './tagV2.tokens'
import {
    TagV2Color,
    TagV2Props,
    TagV2Size,
    TagV2SubType,
    TagV2Type,
} from './TagV2.types'
import TagSkeleton from './TagSkeleton'
import { addPxToValue } from '../../global-utils/GlobalUtils'
import { addAccessibleAriaAttributes } from '../../utils/accessibility/icon-helpers'
import { filterBlockedProps } from '../../utils/prop-helpers'
import { createKeyboardHandler, getAccessibleName } from './utils'
import PrimitiveButton from '../Primitives/PrimitiveButton/PrimitiveButton'

const FOCUS_VISIBLE_STYLES = {
    outline: '2px solid #0561E2',
    outlineOffset: '2px',
    boxShadow: '0 0 0 3px rgba(5, 97, 226, 0.1)',
} as const

const SLOT_VISIBLE_STYLE = { opacity: 1 } as const
const SLOT_HIDDEN_STYLE = { opacity: 0 } as const

const TagV2 = forwardRef<HTMLButtonElement | HTMLDivElement, TagV2Props>(
    (
        {
            text,
            size = TagV2Size.SM,
            type = TagV2Type.SUBTLE,
            subType = TagV2SubType.SQUARICAL,
            color = TagV2Color.PRIMARY,
            leftSlot,
            rightSlot,
            showSkeleton,
            skeletonVariant,
            onClick,
            ...rest
        },
        ref
    ) => {
        const tagTokens = useResponsiveTokens<TagV2TokensType>('TAGV2')
        const TagElement = onClick ? PrimitiveButton : Block
        const filteredRest = filterBlockedProps(rest)
        const hasClickHandler = typeof onClick === 'function'
        const isInteractive = hasClickHandler && !showSkeleton
        const cursor = isInteractive ? 'pointer' : 'default'
        const ariaPressed = useMemo(
            () =>
                'aria-pressed' in rest
                    ? (rest['aria-pressed'] as boolean | 'mixed' | undefined)
                    : undefined,
            [rest]
        )
        const accessibleName = getAccessibleName(
            text,
            isInteractive,
            ariaPressed
        )

        const handleKeyDown = createKeyboardHandler(isInteractive, onClick)
        const focusVisibleStyles =
            isInteractive && !showSkeleton ? FOCUS_VISIBLE_STYLES : undefined

        const slotStyle = showSkeleton ? SLOT_HIDDEN_STYLE : SLOT_VISIBLE_STYLE

        if (showSkeleton) {
            return (
                <TagSkeleton
                    showSkeleton={showSkeleton}
                    skeletonVariant={skeletonVariant}
                    text={text}
                    size={size}
                    type={type}
                    subType={subType}
                    color={color}
                    leftSlot={leftSlot}
                    rightSlot={rightSlot}
                />
            )
        }

        return (
            <TagElement
                // @ts-expect-error - TypeScript cannot infer correct ref type for conditional component selection
                // The ref is correctly typed at runtime based on which component is rendered
                ref={
                    onClick
                        ? (ref as unknown as React.Ref<HTMLButtonElement>)
                        : (ref as unknown as React.Ref<HTMLDivElement>)
                }
                data-tag={text}
                role={isInteractive ? 'button' : undefined}
                tabIndex={isInteractive ? 0 : undefined}
                aria-label={accessibleName}
                aria-disabled={onClick ? false : undefined}
                aria-pressed={ariaPressed}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                width="fit-content"
                gap={tagTokens.gap}
                border={tagTokens.border[type][color]}
                borderRadius={tagTokens.borderRadius[size][subType]}
                backgroundColor={tagTokens.backgroundColor[type][color]}
                height={tagTokens.height[size]}
                paddingTop={tagTokens.padding.top[size]}
                paddingBottom={tagTokens.padding.bottom[size]}
                paddingLeft={tagTokens.padding.left[size]}
                paddingRight={tagTokens.padding.right[size]}
                pointerEvents={onClick ? 'none' : undefined}
                cursor={cursor}
                // For clickable tags (rendered as buttons), rely on default text selection behavior.
                // For non-clickable tags (rendered as blocks), allow text selection.
                userSelect={onClick ? undefined : 'text'}
                {...(onClick
                    ? {
                          onClick,
                          onKeyDown: handleKeyDown,
                      }
                    : {})}
                _focusVisible={focusVisibleStyles}
                {...filteredRest}
            >
                {leftSlot && (
                    <Block
                        style={slotStyle}
                        data-element="left-slot"
                        contentCentered
                    >
                        {addAccessibleAriaAttributes(leftSlot)}
                    </Block>
                )}
                <Text
                    data-id={text}
                    fontSize={tagTokens.text.fontSize[size]}
                    fontWeight={tagTokens.text.fontWeight[size]}
                    lineHeight={addPxToValue(tagTokens.text.lineHeight[size])}
                    color={tagTokens.text.color[type][color]}
                >
                    {text}
                </Text>
                {rightSlot && (
                    <Block
                        data-element="right-slot"
                        contentCentered
                        style={slotStyle}
                    >
                        {addAccessibleAriaAttributes(rightSlot)}
                    </Block>
                )}
            </TagElement>
        )
    }
)

TagV2.displayName = 'TagV2'
export default TagV2
