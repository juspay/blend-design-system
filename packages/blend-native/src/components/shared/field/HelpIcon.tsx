import { HelpCircle } from 'lucide-react-native'
import { TooltipV2Size } from '@juspay/blend-design-system/node'
import { Block } from '../../../primitives/Block'
import { Tooltip } from '../../Tooltip'

/**
 * The help icon after a field's label, its text in a small `Tooltip` —
 * web's `InputLabelsV2` / select label `helpIconText` (`HelpCircleIcon` in
 * a 16px box).
 */
export function HelpIcon({
    text,
    size,
    color,
    testID,
}: {
    text: string
    size: number
    color: string
    testID?: string
}) {
    return (
        <Block
            width={16}
            height={16}
            alignItems="center"
            justifyContent="center"
            testID={testID}
        >
            <Tooltip content={text} size={TooltipV2Size.SM}>
                <HelpCircle size={size} color={color} />
            </Tooltip>
        </Block>
    )
}

HelpIcon.displayName = 'HelpIcon'
