import { memo, type ReactNode } from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { FOUNDATION_THEME } from '../../../tokens'

export type NodeContentProps = {
    icon?: ReactNode
    label?: string
    description?: string
    iconBackgroundColor?: string
    iconPadding?: string | number
    iconBorderRadius?: string | number
    labelColor?: string
    labelFontWeight?: number
    descriptionColor?: string
    descriptionOpacity?: number
}

const NodeContent = ({
    icon,
    label,
    description,
    iconBackgroundColor = FOUNDATION_THEME.colors.gray[100],
    iconPadding = FOUNDATION_THEME.unit[8],
    iconBorderRadius = FOUNDATION_THEME.border.radius[8],
    labelColor,
    labelFontWeight = Number(FOUNDATION_THEME.font.weight[600]),
    descriptionColor,
    descriptionOpacity = Number(FOUNDATION_THEME.opacity[70]),
}: NodeContentProps) => {
    return (
        <>
            {icon && (
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding={iconPadding}
                    borderRadius={iconBorderRadius}
                    backgroundColor={iconBackgroundColor}
                >
                    {icon}
                </Block>
            )}

            {label && (
                <Text
                    variant="body.md"
                    fontWeight={labelFontWeight}
                    color={labelColor}
                    textAlign="center"
                >
                    {label}
                </Text>
            )}

            {description && (
                <Text
                    variant="body.sm"
                    color={descriptionColor || labelColor}
                    textAlign="center"
                    opacity={descriptionOpacity}
                >
                    {description}
                </Text>
            )}
        </>
    )
}

export default memo(NodeContent)
