import Block from '../../../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../../../tokens'
import Text from '../../../Text/Text'
import type { CSSObject } from 'styled-components'

const FloatingLabels = ({
    label,
    required,
    name,
    isFocused = false,
    labelColor,
    requiredColor,
}: {
    label: string
    required: boolean
    name: string
    isFocused: boolean
    labelColor?: CSSObject['color']
    requiredColor?: CSSObject['color']
}) => {
    return (
        <Block
            display="flex"
            alignItems="center"
            gap={4}
            width={'100%'}
            data-form-label={label}
        >
            <Text
                as="label"
                htmlFor={name}
                variant={isFocused ? 'body.sm' : 'body.md'}
                fontWeight={500}
                color={labelColor ?? FOUNDATION_THEME.colors.gray[400]}
                style={{ margin: 0, padding: 0 }}
            >
                {label}
            </Text>
            {required && (
                <span
                    style={{
                        color:
                            requiredColor ?? FOUNDATION_THEME.colors.red[500],
                    }}
                >
                    *
                </span>
            )}
        </Block>
    )
}

export default FloatingLabels
