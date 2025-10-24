import { memo, type ReactNode } from 'react'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'

/**
 * Props for the NodeContent component
 */
export interface NodeContentProps {
    /** Icon to display at the top of the node */
    icon?: ReactNode
    /** Primary label text */
    label?: string
    /** Secondary description text */
    description?: string
    /** Icon container background color */
    iconBackgroundColor?: string
    /** Icon container padding */
    iconPadding?: string | number
    /** Icon container border radius */
    iconBorderRadius?: string | number
    /** Label text color */
    labelColor?: string
    /** Label font weight */
    labelFontWeight?: number
    /** Description text color */
    descriptionColor?: string
    /** Description opacity */
    descriptionOpacity?: number
}

/**
 * Shared NodeContent component for rendering consistent node content
 *
 * @component
 * @param {NodeContentProps} props - Content configuration
 * @returns {JSX.Element} Rendered node content with icon, label, and description
 *
 * @example
 * ```tsx
 * <NodeContent
 *   icon={<PlayIcon />}
 *   label="Start Process"
 *   description="Initialize workflow"
 *   iconBackgroundColor="rgba(0, 128, 0, 0.1)"
 *   labelColor="#006400"
 * />
 * ```
 */
const NodeContent = ({
    icon,
    label,
    description,
    iconBackgroundColor = 'rgba(0, 0, 0, 0.04)',
    iconPadding = '8px',
    iconBorderRadius = '8px',
    labelColor,
    labelFontWeight = 600,
    descriptionColor,
    descriptionOpacity = 0.7,
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
