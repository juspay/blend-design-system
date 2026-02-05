import * as React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import {
    ChevronAnimation,
    ChevronAnimationDirection,
    ChevronAnimationVariant,
    ChevronAnimationSize,
} from '../animations/ChevronAnimation'
import { AccordionV2ChevronPosition } from './accordionV2.types'
import { AccordionV2TokensType } from './accordionV2.tokens'

type AccordionV2ChevronProps = {
    isExpanded: boolean
    isDisabled: boolean
    position: AccordionV2ChevronPosition
    accordionTokens: AccordionV2TokensType
}

export const AccordionV2Chevron: React.FC<AccordionV2ChevronProps> = ({
    isExpanded,
    isDisabled,
    position,
    accordionTokens,
}) => {
    const iconColor = isDisabled
        ? accordionTokens.chevron.color.disabled
        : accordionTokens.chevron.color.default
    const iconSize = accordionTokens.chevron.height

    const isRight = position === AccordionV2ChevronPosition.RIGHT

    return (
        <ChevronAnimation
            data-element="accordion-item-chevron"
            isOpen={isExpanded}
            direction={
                isRight
                    ? ChevronAnimationDirection.DOWN
                    : ChevronAnimationDirection.RIGHT
            }
            variant={
                isRight
                    ? ChevronAnimationVariant.ROTATE_180
                    : ChevronAnimationVariant.ROTATE_90
            }
            size={ChevronAnimationSize.MEDIUM}
            disabled={isDisabled}
            color={iconColor}
        >
            {isRight ? (
                <ChevronDown
                    style={{
                        width: iconSize,
                        height: iconSize,
                    }}
                />
            ) : (
                <ChevronRight
                    style={{
                        width: iconSize,
                        height: iconSize,
                    }}
                />
            )}
        </ChevronAnimation>
    )
}
