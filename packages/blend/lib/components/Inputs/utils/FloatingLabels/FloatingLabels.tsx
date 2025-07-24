import Block from '../../../Primitives/Block/Block'
import { FOUNDATION_THEME } from '../../../../tokens'
import Text from '../../../Text/Text'

const FloatingLabels = ({
    label,
    required,
    name,
    isFocused = false,
}: {
    label: string
    required: boolean
    name: string
    isFocused: boolean
}) => {
    return (
        <Block display="flex" alignItems="center" gap={4} width={'100%'}>
            <Text
                as="label"
                htmlFor={name}
                variant={isFocused ? 'body.sm' : 'body.md'}
                fontWeight={500}
                color={FOUNDATION_THEME.colors.gray[400]}
                style={{ margin: 0, padding: 0 }}
            >
                {label}
            </Text>
            {required && (
                <span
                    style={{
                        color: FOUNDATION_THEME.colors.red[500],
                    }}
                >
                    *
                </span>
            )}
        </Block>
    )
}

export default FloatingLabels
